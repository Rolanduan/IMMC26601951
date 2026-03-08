"""
Model I: Spatial risk inference for wildlife protection planning.

This module implements the core equations in Section 4:
    B_i = 0.45 W_i + 0.35 H_i + 0.20 S_i
    T_i = 0.40 A_i + 0.30 D_i + 0.30 P_i
    R_i = 0.55 B_i + 0.45 T_i

The latent pressure prior can be computed either as an independent logistic
field or as a graph-diffused logistic field satisfying
    (I + lambda L) Omega = u,  P_i = sigmoid(Omega_i).
"""

from dataclasses import dataclass
from typing import Dict, Optional, Tuple

import numpy as np


@dataclass(frozen=True)
class RiskWeights:
    """Weights used by the spatial risk model."""

    wildlife: float = 0.45
    water: float = 0.35
    sensitivity: float = 0.20
    access: float = 0.40
    delay: float = 0.30
    prior: float = 0.30
    blend_value: float = 0.55
    blend_threat: float = 0.45


def min_max_scale(x: np.ndarray, eps: float = 1e-9) -> np.ndarray:
    """Scale a vector to [0, 1]."""
    x_min = float(np.min(x))
    x_max = float(np.max(x))
    return (x - x_min) / (x_max - x_min + eps)


def sigmoid(x: np.ndarray) -> np.ndarray:
    """Numerically stable logistic function."""
    return 1.0 / (1.0 + np.exp(-x))


def graph_diffused_logit(
    base_logit: np.ndarray,
    adjacency: np.ndarray,
    diffusion_weight: float = 0.35,
    ridge: float = 1e-9,
) -> np.ndarray:
    """Smooth zone log-odds on a graph via (I + lambda L)^(-1) u."""
    degree = np.sum(adjacency, axis=1)
    laplacian = np.diag(degree) - adjacency
    identity = np.eye(adjacency.shape[0])
    system = identity + diffusion_weight * laplacian + ridge * identity
    return np.linalg.solve(system, base_logit)


def compute_zone_risk(
    wildlife_density: np.ndarray,
    species_sensitivity: np.ndarray,
    water_dependence: np.ndarray,
    accessibility: np.ndarray,
    response_difficulty: np.ndarray,
    protection_pressure: np.ndarray,
    theta: Tuple[float, float, float, float] = (-1.2, 1.4, 1.0, 0.9),
    weights: RiskWeights = RiskWeights(),
    adjacency: Optional[np.ndarray] = None,
    diffusion_weight: float = 0.35,
) -> Dict[str, np.ndarray]:
    """
    Compute B_i, P_i, T_i, R_i for all zones.

    Parameters
    ----------
    wildlife_density, species_sensitivity, water_dependence, accessibility,
    response_difficulty, protection_pressure : np.ndarray
        Zone-level raw inputs with the same shape, typically (64,).
    theta : tuple
        Coefficients (theta_0, theta_1, theta_2, theta_3) for the prior model.
    weights : RiskWeights
        Structural coefficients for Model I.
    adjacency : np.ndarray | None
        Optional zone-graph adjacency matrix. If supplied, the prior is smoothed
        by the graph Laplacian before applying the logistic link.
    diffusion_weight : float
        Strength of graph diffusion in the prior.
    """
    w = min_max_scale(wildlife_density)
    s = min_max_scale(species_sensitivity)
    h = min_max_scale(water_dependence)
    a = min_max_scale(accessibility)
    d = min_max_scale(response_difficulty)
    c = min_max_scale(protection_pressure)

    b = weights.wildlife * w + weights.water * h + weights.sensitivity * s
    base_logit = theta[0] + theta[1] * a + theta[2] * b - theta[3] * c
    omega = (
        graph_diffused_logit(base_logit, adjacency, diffusion_weight)
        if adjacency is not None
        else base_logit
    )
    prior = sigmoid(omega)
    t = weights.access * a + weights.delay * d + weights.prior * prior
    r = weights.blend_value * b + weights.blend_threat * t

    return {"B": b, "Omega": omega, "P": prior, "T": t, "R": r}


def hotspot_quartiles(risk: np.ndarray) -> Dict[str, np.ndarray]:
    """Return zone indices by risk quartile."""
    q25, q50, q75 = np.quantile(risk, [0.25, 0.50, 0.75])
    return {
        "Q1_low": np.where(risk <= q25)[0],
        "Q2_mid_low": np.where((risk > q25) & (risk <= q50))[0],
        "Q3_mid_high": np.where((risk > q50) & (risk <= q75))[0],
        "Q4_hotspot": np.where(risk > q75)[0],
    }


if __name__ == "__main__":
    rng = np.random.default_rng(42)
    n_zones = 64

    outputs = compute_zone_risk(
        wildlife_density=rng.uniform(0.2, 1.0, size=n_zones),
        species_sensitivity=rng.uniform(0.1, 1.0, size=n_zones),
        water_dependence=rng.uniform(0.0, 1.0, size=n_zones),
        accessibility=rng.uniform(0.0, 1.0, size=n_zones),
        response_difficulty=rng.uniform(0.0, 1.0, size=n_zones),
        protection_pressure=rng.uniform(0.0, 1.0, size=n_zones),
    )
    quartiles = hotspot_quartiles(outputs["R"])

    print("Mean risk:", float(np.mean(outputs["R"])))
    print("Hotspot zones (Q4):", quartiles["Q4_hotspot"])
