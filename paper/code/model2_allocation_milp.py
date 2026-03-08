"""
Model II: Mixed-integer allocation of patrols, fixed devices, and drone sorties.

This is a linearized implementation of the allocation layer in Section 5.
It uses a capped linear protection utility e_i in [0, 1] to approximate
the nonlinear gain E_i = 1 - exp(-intensity_i). Patrol routes appear here as
pre-generated columns of a path-flow master problem: each column in
`route_cover` is one graph-feasible tour produced upstream.
"""

from dataclasses import dataclass
from typing import Dict, List

import numpy as np
import pulp as pl


@dataclass
class AllocationInputs:
    # Dimensions
    n_zones: int
    n_routes: int
    n_sectors: int

    # Core data
    risk: np.ndarray  # shape (n_zones,)
    route_hours: np.ndarray  # shape (n_routes,)
    route_cover: np.ndarray  # shape (n_zones, n_routes), binary
    sector_cover: np.ndarray  # shape (n_zones, n_sectors), binary
    station_id: np.ndarray  # shape (n_routes,), integer station label

    # Capacities
    ranger_hours: float
    n_devices: int
    n_sorties: int
    station_caps: Dict[int, int]  # station -> max route activations

    # Coefficients
    alpha: float = 0.20  # patrol intensity coefficient
    beta: float = 0.35  # fixed-device coefficient
    gamma: float = 0.25  # drone coefficient
    lambda_hours: float = 0.03  # route-hour penalty in objective
    hotspot_floor: int = 1  # minimum combined attention in hotspot zones


def build_allocation_model(inp: AllocationInputs) -> tuple[pl.LpProblem, Dict[str, List]]:
    """Build MILP with linearized utility."""
    prob = pl.LpProblem("wildlife_protection_allocation", pl.LpMaximize)

    x = [pl.LpVariable(f"x_{r}", lowBound=0, cat="Integer") for r in range(inp.n_routes)]
    y = [
        pl.LpVariable(f"y_{i}", lowBound=0, upBound=2, cat="Integer")
        for i in range(inp.n_zones)
    ]
    z = [pl.LpVariable(f"z_{j}", lowBound=0, cat="Integer") for j in range(inp.n_sectors)]
    e = [pl.LpVariable(f"e_{i}", lowBound=0.0, upBound=1.0) for i in range(inp.n_zones)]

    route_cover = inp.route_cover
    sector_cover = inp.sector_cover

    patrol_intensity = []
    drone_intensity = []
    total_attention = []

    for i in range(inp.n_zones):
        f_i = pl.lpSum(route_cover[i, r] * x[r] for r in range(inp.n_routes))
        d_i = pl.lpSum(sector_cover[i, j] * z[j] for j in range(inp.n_sectors))
        patrol_intensity.append(f_i)
        drone_intensity.append(d_i)
        total_attention.append(f_i + y[i] + d_i)

        # Linearized utility cap:
        # e_i <= alpha*F_i + beta*y_i + gamma*D_i
        prob += e[i] <= inp.alpha * f_i + inp.beta * y[i] + inp.gamma * d_i
        prob += e[i] <= 1.0

    # Objective: maximize weighted utility minus route-hour burden.
    prob += (
        pl.lpSum(inp.risk[i] * e[i] for i in range(inp.n_zones))
        - inp.lambda_hours * pl.lpSum(inp.route_hours[r] * x[r] for r in range(inp.n_routes))
    )

    # Resource constraints
    prob += 2.0 * pl.lpSum(inp.route_hours[r] * x[r] for r in range(inp.n_routes)) <= inp.ranger_hours
    prob += pl.lpSum(y) <= inp.n_devices
    prob += pl.lpSum(z) <= inp.n_sorties

    # Station-level route activation limits
    for station, cap in inp.station_caps.items():
        station_routes = [r for r in range(inp.n_routes) if int(inp.station_id[r]) == int(station)]
        prob += pl.lpSum(x[r] for r in station_routes) <= cap

    # Hotspot recurrent-attention floor (top risk quartile)
    q75 = float(np.quantile(inp.risk, 0.75))
    hotspot_indices = [i for i in range(inp.n_zones) if inp.risk[i] >= q75]
    for i in hotspot_indices:
        prob += total_attention[i] >= inp.hotspot_floor

    vars_out = {"x": x, "y": y, "z": z, "e": e}
    return prob, vars_out


def solve_allocation(inp: AllocationInputs, msg: bool = False) -> Dict[str, np.ndarray]:
    """Solve MILP and return decision vectors."""
    prob, var = build_allocation_model(inp)
    prob.solve(pl.PULP_CBC_CMD(msg=msg))

    x = np.array([v.value() for v in var["x"]], dtype=float)
    y = np.array([v.value() for v in var["y"]], dtype=float)
    z = np.array([v.value() for v in var["z"]], dtype=float)
    e = np.array([v.value() for v in var["e"]], dtype=float)

    return {
        "status": pl.LpStatus[prob.status],
        "objective": float(pl.value(prob.objective)),
        "x_routes": x,
        "y_devices": y,
        "z_sorties": z,
        "e_utility": e,
    }


if __name__ == "__main__":
    rng = np.random.default_rng(7)
    n_zones, n_routes, n_sectors = 64, 24, 6

    inputs = AllocationInputs(
        n_zones=n_zones,
        n_routes=n_routes,
        n_sectors=n_sectors,
        risk=rng.uniform(0.25, 1.0, size=n_zones),
        route_hours=rng.uniform(1.8, 5.2, size=n_routes),
        route_cover=(rng.uniform(size=(n_zones, n_routes)) < 0.18).astype(int),
        sector_cover=(rng.uniform(size=(n_zones, n_sectors)) < 0.32).astype(int),
        station_id=np.array([0] * 8 + [1] * 8 + [2] * 8),
        ranger_hours=272.0,
        n_devices=12,
        n_sorties=4,
        station_caps={0: 8, 1: 8, 2: 8},
    )

    result = solve_allocation(inputs, msg=False)
    print("Solver status:", result["status"])
    print("Objective:", result["objective"])
    print("Total route activations:", np.sum(result["x_routes"]))
