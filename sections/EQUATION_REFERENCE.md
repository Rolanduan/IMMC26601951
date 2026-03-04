# Equation Reference Guide
## IMMC Problem C: Conservation Resource Allocation

**File:** Quick reference for all new equations added to sections 03-06

---

## Section 03: Solution Method

### 1. Core Integer Programming (MILP)
**Equation (1):** \ref{eq:core_ip}
```
max 𝒫_system = ω_s Σ w_s 𝒫_s + ω_a Σ (A_z/A_total) 𝒫_z
```
**Purpose:** Main optimization objective for system protection

**Equation (2-3):** Decision Variables
```
x_{z,m,t} ∈ {0,1,2,...}  Integer allocation
y_{z,s} ∈ {0,1}          Binary protection status
```

**Equation (4-7):** Constraints
```
Budget:     Σ c_m x_{z,m,t} ≤ B_t
Personnel:  Σ r_m x_{z,m,t} ≤ R_t
Min cover:  Σ x_{z,m,t} ≥ x_{z,m}^{min}
Species:    𝒫_s ≥ 𝒫_s^{target}
```

### 2. Dynamic Programming
**Equation (8):** Bellman Equation \ref{eq:dp_bellman}
```
V_t(z_t) = max_{x_t} { R_t(z_t, x_t) + β Σ P(z_{t+1}|z_t, x_t) V_{t+1}(z_{t+1}) }
```
**Parameters:**
- β = 0.95 (discount factor)
- z_t = {N_t, T_t, B_t} (state space)

### 3. Genetic Algorithm
**Equation:** Fitness Function \ref{eq:fitness}
```
Fitness(x) = 𝒫_system(x) - λ · Penalty(x)
```
**Parameters:**
- λ = 1000 (Lagrange multiplier)

---

## Section 04: Results

### 4. Queueing Model (M/M/c)
**Equation (1):** Queue Length \ref{eq:queue_length}
```
L_q = (cρ)^c ρ / [c!(1-ρ)²] · P_0
```

**Equation (2):** Waiting Time \ref{eq:waiting_time}
```
W_q = L_q / λ
```

**Parameters:**
- λ = 0.096 incidents/hour (arrival rate)
- μ = 0.125 incidents/hour (service rate)
- c = 42 teams (servers)
- ρ = λ/(cμ) = 0.182 (utilization)

**Equation (3):** Minimum Staffing \ref{eq:min_staffing}
```
c_min = ⌈λ / (μ · ρ_target)⌉ = 1 team per shift
```

**Equation (4):** Actual Staffing \ref{eq:actual_staffing}
```
c_actual = 42 teams ≫ c_min = 1 team
```
**Interpretation:** Over-staffing for deterrence

**Equation (5):** Efficiency \ref{eq:efficiency}
```
Efficiency = Protected Area / (Ranger × Shift) = 40 km²/ranger-hour
```

### 5. Budget Allocation
**Equation:** \ref{eq:budget}
```
B_total = B_ranger + B_UAV + B_camera
```
**Distribution:**
- Ranger: 68%
- UAV: 24%
- Camera: 8%

### 6. Cost Effectiveness
**Equation:** \ref{eq:cost_effectiveness}
```
Cost-Effectiveness = Budget / (Protected Species × Protected Area)
                   = $15.60/unit
```

---

## Section 05: Robustness

### 7. Monte Carlo Sampling
**Equation (1):** Parameter Sampling \ref{eq:monte_carlo_sampling}
```
θ_i^(k) ~ N(θ_i, σ_i²), k = 1, 2, ..., 10,000
```

**Probability Distributions:**
- Budget: N($1.2M, $180K²)
- Threat: Log-normal
- Species vulnerability: Beta(α=2, β=3)
- Detection probability: Beta(α=8, β=2)
- Response time: Exponential

### 8. Robustness Measure
**Equation:** \ref{eq:robustness}
```
Robustness(δ) = 𝒫_system(B(1+δ), R(1+δ)) / 𝒫_system(B, R)
```
**Tested:** δ ∈ {-30%, -15%, +15%, +30%}

### 9. Sensitivity Analysis
**Equation:** \ref{eq:sensitivity}
```
S_i = (∂𝒫_system/∂θ_i) · (θ_i/𝒫_system)
```
**Rankings:**
1. Threat weights (ρ_s): 0.152
2. Species priorities (w_s): 0.118
3. Budget (B): 0.094
4. Ranger effectiveness (λ): 0.087

---

## Section 06: Validation

### 10. Game Theory: Stackelberg Game
**Equation (1):** Leader-Follower \ref{eq:stackelberg}
```
max_{x_d} min_{x_a} U_d(x_d, x_a)
```
**Players:**
- Defender (leader): x_d (ranger strategy)
- Attacker (follower): x_a (poacher strategy)

**Equation (2):** Defender Utility \ref{eq:defender_utility}
```
U_d(x_d, x_a) = Σ [V_z - C_z(x_d)] · (1 - P_poach(z|x_d))
```

**Equation (3):** Attacker Utility \ref{eq:attacker_utility}
```
U_a(x_d, x_a) = Σ R_z(x_a) · P_poach(z|x_d) - P_catch(z|x_d) · P_penalty
```

### 11. Deterrence Effect
**Equation:** \ref{eq:deterrence}
```
Deterrence(z) = 1 - λ(z|x_d) / λ_0(z)
```
**Results:**
- High priority: 88.0%
- Medium priority: 65.0%
- Low priority: 30.0%

### 12. Best Response Dynamics
**Equation:** \ref{eq:best_response}
```
x_a^(t+1) = argmax_{x_a} U_a(x_d^(t), x_a)
```
**Interpretation:** Poachers adapt to ranger deployment

### 13. Model Parameters
**Equation:** \ref{eq:parameters}
```
θ_location = {A, 𝒮, 𝒵, T, B, R}
```
**Transferability:** Only these parameters need adjustment

### 14. Computational Complexity
**Equation:** \ref{eq:complexity}
```
t_compute ∝ |𝒵| × |𝒮| × log(|𝒵| × |𝒮|)
```

### 15. Predictive Accuracy
**Equation:** \ref{eq:accuracy}
```
Accuracy = 1 - |Predicted - Observed| / Observed
```
**Results:**
- Species protection: 89.4%
- Poaching prediction: 76.8%
- Ranger efficiency: 91.2%
- Budget allocation: 87.3%
- **Overall: 86.2%**

### 16. Cross-Validation
**Equation:** \ref{eq:cross_validation}
```
CV = (1/k) Σ MSE_i, k = 5
```
**Results:**
- Protection: 90.4% ± 1.4%
- Species: 86.0% ± 1.2%
- Cost: 93.2% ± 1.2%
- Response: 88.2% ± 0.9%

---

## Key Constants and Parameters

### Dynamic Programming
- Discount factor: β = 0.95
- Planning horizon: T stages

### Queueing Model
- Arrival rate: λ = 0.096 incidents/hour
- Service rate: μ = 0.125 incidents/hour
- Servers: c = 42 teams
- Target utilization: ρ_target = 0.80

### Genetic Algorithm
- Population: 200
- Generations: 150
- Crossover rate: 0.85
- Mutation rate: 0.12
- Lagrange multiplier: λ = 1000

### Monte Carlo
- Trials: 10,000
- Confidence level: 95%
- Parameter variance: 15-25%

### Game Theory
- Penalty severity: P_penalty (high)
- Nash equilibrium: Poacher avoids high-priority zones

---

## Equation Dependencies

### Core Model Hierarchy
```
Integer Programming (MILP)
    ↓
Dynamic Programming (temporal)
    ↓
Genetic Algorithm (solver)
```

### Validation Hierarchy
```
Game Theory (adversarial)
    ↓
Queueing Model (operational)
    ↓
Monte Carlo (uncertainty)
    ↓
Cross-Validation (generalizability)
```

---

## Variable Glossary

### Decision Variables
- x_{z,m,t}: Allocation of method m to zone z at time t
- y_{z,s}: Binary protection status for species s in zone z

### State Variables (DP)
- N_t: Species population vector
- T_t: Threat level vector
- B_t: Budget availability

### Performance Metrics
- 𝒫_system: System-level protection
- 𝒫_s: Species-specific protection
- 𝒫_z: Zone-specific coverage

### Queueing Parameters
- L_q: Expected queue length
- W_q: Expected waiting time
- ρ: System utilization

### Game Theory Payoffs
- U_d: Defender utility
- U_a: Attacker utility
- P_poach: Poaching probability

---

**Note:** All equations are properly numbered and referenced in the LaTeX files.
