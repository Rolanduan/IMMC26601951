"""
Model 0: GIS preprocessing and digital-twin feature engineering.

This module represents the geospatial layer that sits upstream of the three
core models in the paper. It converts cartographic and network information
into planning-cell features that can be passed into Model I.
"""

from dataclasses import dataclass
from typing import Dict

import numpy as np


@dataclass(frozen=True)
class GISInputs:
    """Minimal GIS-style inputs for competition-grade preprocessing."""

    wildlife_raster: np.ndarray
    sensitivity_raster: np.ndarray
    water_raster: np.ndarray
    access_raster: np.ndarray
    cell_ids: np.ndarray
    station_travel_hours: np.ndarray  # shape (n_stations, n_cells)
    patrol_pressure: np.ndarray  # shape (n_cells,)


def normalize(x: np.ndarray, eps: float = 1e-9) -> np.ndarray:
    """Scale array to [0, 1]."""
    x_min = float(np.min(x))
    x_max = float(np.max(x))
    return (x - x_min) / (x_max - x_min + eps)


def zonal_mean(layer: np.ndarray, cell_ids: np.ndarray, n_cells: int) -> np.ndarray:
    """Compute mean layer value for each planning cell."""
    out = np.zeros(n_cells, dtype=float)
    for cell in range(n_cells):
        mask = cell_ids == cell
        if np.any(mask):
            out[cell] = float(np.mean(layer[mask]))
    return out


def response_difficulty(station_travel_hours: np.ndarray) -> np.ndarray:
    """Convert station-to-cell travel-time matrix into difficulty scores."""
    best_time = np.min(station_travel_hours, axis=0)
    return normalize(best_time)


def build_planning_cell_features(inp: GISInputs) -> Dict[str, np.ndarray]:
    """
    Aggregate raster and network data into Model I features.

    Returns arrays for wildlife density, species sensitivity, water dependence,
    accessibility, response difficulty, and protection pressure.
    """
    n_cells = int(np.max(inp.cell_ids)) + 1

    wildlife = normalize(zonal_mean(inp.wildlife_raster, inp.cell_ids, n_cells))
    sensitivity = normalize(zonal_mean(inp.sensitivity_raster, inp.cell_ids, n_cells))
    water = normalize(zonal_mean(inp.water_raster, inp.cell_ids, n_cells))
    access = normalize(zonal_mean(inp.access_raster, inp.cell_ids, n_cells))
    response = response_difficulty(inp.station_travel_hours)
    pressure = normalize(inp.patrol_pressure)

    return {
        "wildlife_density": wildlife,
        "species_sensitivity": sensitivity,
        "water_dependence": water,
        "accessibility": access,
        "response_difficulty": response,
        "protection_pressure": pressure,
    }


if __name__ == "__main__":
    rng = np.random.default_rng(19)
    side = 80
    n_cells = 64

    cell_ids = np.zeros((side, side), dtype=int)
    rows = np.array_split(np.arange(side), 8)
    cols = np.array_split(np.arange(side), 8)
    cell = 0
    for rr in rows:
        for cc in cols:
            cell_ids[np.ix_(rr, cc)] = cell
            cell += 1

    inputs = GISInputs(
        wildlife_raster=rng.uniform(0.1, 1.0, size=(side, side)),
        sensitivity_raster=rng.uniform(0.1, 1.0, size=(side, side)),
        water_raster=rng.uniform(0.0, 1.0, size=(side, side)),
        access_raster=rng.uniform(0.0, 1.0, size=(side, side)),
        cell_ids=cell_ids,
        station_travel_hours=rng.uniform(0.5, 6.0, size=(5, n_cells)),
        patrol_pressure=rng.uniform(0.0, 1.0, size=n_cells),
    )

    features = build_planning_cell_features(inputs)
    for key, value in features.items():
        print(key, round(float(np.mean(value)), 4))
