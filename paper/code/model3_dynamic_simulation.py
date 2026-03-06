"""
Model III: Dynamic protection simulation with Monte Carlo replication.

Core equations implemented:
    N_i^t ~ Poisson(lambda_0 * R_i * Psi_t)
    q_i^t = 1 - prod_a (1 - q_a)
    g_i^t = 1 / (1 + exp(kappa * (tau_i^t - tau_star)))
    u_i^t = q_i^t * g_i^t
    PI = 1 - weighted_loss / weighted_event
"""

from dataclasses import dataclass
from typing import Dict

import numpy as np


@dataclass(frozen=True)
class SimulationConfig:
    days: int = 30
    runs: int = 1000
    lambda0: float = 1.15
    kappa: float = 1.3
    tau_star: float = 4.5
    eps: float = 1e-9
    # Single-asset detection probabilities
    q_patrol: float = 0.22
    q_fixed: float = 0.38
    q_drone: float = 0.44


def detection_probability(
    n_patrol: np.ndarray,
    n_fixed: np.ndarray,
    n_drone: np.ndarray,
    cfg: SimulationConfig,
) -> np.ndarray:
    """Compute q_i^t from active asset counts."""
    miss_prob = (
        (1.0 - cfg.q_patrol) ** n_patrol
        * (1.0 - cfg.q_fixed) ** n_fixed
        * (1.0 - cfg.q_drone) ** n_drone
    )
    return 1.0 - miss_prob


def interception_probability(response_time: np.ndarray, cfg: SimulationConfig) -> np.ndarray:
    """Logistic interception model as a function of delay."""
    return 1.0 / (1.0 + np.exp(cfg.kappa * (response_time - cfg.tau_star)))


def run_single_replication(
    risk: np.ndarray,
    pressure: np.ndarray,
    patrol_count: np.ndarray,
    fixed_count: np.ndarray,
    drone_count: np.ndarray,
    response_time: np.ndarray,
    cfg: SimulationConfig,
    rng: np.random.Generator,
) -> Dict[str, np.ndarray]:
    """
    Run one T-day simulation.

    Shapes:
        risk: (n_zones,)
        pressure: (days,)
        patrol_count, fixed_count, drone_count: (n_zones, days)
        response_time: (n_zones, days)
    """
    n_zones = risk.shape[0]
    q = np.zeros((n_zones, cfg.days), dtype=float)
    g = np.zeros((n_zones, cfg.days), dtype=float)
    events = np.zeros((n_zones, cfg.days), dtype=float)
    losses = np.zeros((n_zones, cfg.days), dtype=float)

    for t in range(cfg.days):
        lam = cfg.lambda0 * risk * pressure[t]
        events[:, t] = rng.poisson(lam)

        q[:, t] = detection_probability(
            patrol_count[:, t], fixed_count[:, t], drone_count[:, t], cfg
        )
        g[:, t] = interception_probability(response_time[:, t], cfg)
        neutralize_prob = q[:, t] * g[:, t]

        intercepted = rng.binomial(events[:, t].astype(int), neutralize_prob)
        losses[:, t] = events[:, t] - intercepted

    weighted_loss = float(np.sum(risk[:, None] * losses))
    weighted_events = float(np.sum(risk[:, None] * events))
    pi_value = 1.0 - weighted_loss / (weighted_events + cfg.eps)

    return {
        "PI": np.array([pi_value]),
        "q_mean": np.array([np.mean(q)]),
        "resp_mean": np.array([np.mean(response_time)]),
    }


def run_monte_carlo(
    risk: np.ndarray,
    pressure: np.ndarray,
    patrol_count: np.ndarray,
    fixed_count: np.ndarray,
    drone_count: np.ndarray,
    response_time: np.ndarray,
    cfg: SimulationConfig = SimulationConfig(),
    seed: int = 123,
) -> Dict[str, float]:
    """Run Monte Carlo simulation and return summary statistics."""
    rng = np.random.default_rng(seed)

    pi_values = np.zeros(cfg.runs, dtype=float)
    q_values = np.zeros(cfg.runs, dtype=float)
    resp_values = np.zeros(cfg.runs, dtype=float)

    for k in range(cfg.runs):
        out = run_single_replication(
            risk=risk,
            pressure=pressure,
            patrol_count=patrol_count,
            fixed_count=fixed_count,
            drone_count=drone_count,
            response_time=response_time,
            cfg=cfg,
            rng=rng,
        )
        pi_values[k] = out["PI"][0]
        q_values[k] = out["q_mean"][0]
        resp_values[k] = out["resp_mean"][0]

    return {
        "PI_mean": float(np.mean(pi_values)),
        "PI_p05": float(np.quantile(pi_values, 0.05)),
        "PI_p95": float(np.quantile(pi_values, 0.95)),
        "Detection_mean": float(np.mean(q_values)),
        "Response_mean_hours": float(np.mean(resp_values)),
    }


if __name__ == "__main__":
    rng = np.random.default_rng(21)
    n_zones = 64
    cfg = SimulationConfig(days=30, runs=300)

    risk = rng.uniform(0.25, 1.0, size=n_zones)
    pressure = 1.0 + 0.12 * np.sin(np.linspace(0.0, 2.0 * np.pi, cfg.days))
    patrol_count = rng.integers(0, 2, size=(n_zones, cfg.days))
    fixed_count = rng.integers(0, 2, size=(n_zones, cfg.days))
    drone_count = rng.integers(0, 2, size=(n_zones, cfg.days))
    response_time = rng.uniform(2.8, 6.2, size=(n_zones, cfg.days))

    summary = run_monte_carlo(
        risk=risk,
        pressure=pressure,
        patrol_count=patrol_count,
        fixed_count=fixed_count,
        drone_count=drone_count,
        response_time=response_time,
        cfg=cfg,
        seed=2026,
    )
    print(summary)
