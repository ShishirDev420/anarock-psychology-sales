# Matthew's Loop: Sales Psychology Intelligence Optimizer

## The Loop

Improve Anarock's sales psychology engine. After each change, measure conversion lift, stage velocity, and agent compliance. Keep only statistically significant improvements (p < 0.05). Stop when 12/12 psychological vectors reach benchmark, or 3 consecutive rounds show no progress. Ask before changing live CRM configurations or agent-facing scripts.

---

## The Six-Step Cycle

### 1. Observe
**Action:** Read CRM state — lead profiles, interaction logs, conversion rates, sentiment data, and stage velocity per psychological vector.

**Data Sources:**
- Astra Platinum lead database (12 psychological vectors)
- Call recording sentiment analysis pipeline
- WhatsApp CRM interaction logs
- Stage-by-stage conversion funnel metrics
- Agent compliance scoring dashboard

**Evidence Recorded:**
- Current conversion rate per funnel stage
- Agent script adherence rate
- Lead satisfaction score (post-interaction survey)
- Time-in-stage for each psychological cohort

### 2. Choose
**Action:** Score each psychological lever by impact delta. Prioritize the one with the largest gap between current and benchmark conversion.

**Scoring Algorithm:**
```
priority_score = (benchmark_rate - current_rate) × lead_volume × expected_effect_size
```

**Benchmark Targets (initial):**
| Lever | Benchmark | Current (Est.) | Gap |
|-------|-----------|---------------|-----|
| Attachment-aligned cadence | 47% nurture efficiency | ~28% | 19pp |
| Primacy-recency sequencing | +34% close | ~22% | 12pp |
| Cultural NRI routing | 2.8x conversion | ~1.0x | 1.8x |
| Variable-ratio scheduling | +67% re-engagement | ~35% | 32pp |
| Stress-aware routing | 38% faster close | ~15% | 23pp |
| Status quo bias breaker | 41% recovery | ~20% | 21pp |
| Social proof injection | +33% close | ~18% | 15pp |
| Life stage segmenter | 3.1x engagement | ~1.5x | 1.6x |
| Maslow-tier matched scripts | 2.4x conversion | ~1.3x | 1.1x |
| Pygmalion agent dashboard | +22% performance | ~8% | 14pp |
| Anchoring control system | 28% concession reduction | ~12% | 16pp |
| Situational state detection | 41% friction reduction | ~15% | 26pp |

Sorted by gap size to prioritize highest-impact interventions.

### 3. Act
**Action:** Deploy one bounded change — adjust CRM nurture cadence, update a sales script for one psychological vector, or retrain an Astra module on one dimension.

**Change Types (in priority order):**
1. **CRM Configuration Change** (non-breaking) — e.g., adjust nurture timing algorithm
2. **Script Update** — modify agent script templates for one vector
3. **Astra Module Fine-Tune** — retrain ML model on additional labeled data
4. **Dashboard Enhancement** — add new psychological metric to agent/manager view

**Rules:**
- One change per cycle
- Must have rollback plan
- Must target exactly one psychological vector
- Must be measurable within 7 days

### 4. Verify
**Action:** Run the same acceptance checks — compare test vs control cohort on conversion, velocity, and satisfaction.

**Acceptance Criteria:**
- **Primary:** Statistically significant improvement (p < 0.05, one-tailed) on target metric
- **Secondary:** No statistically significant regression on any other psychological vector's metric
- **Tertiary:** Agent compliance rate >80% (for agent-facing changes)

**Verification Protocol:**
1. Split leads into test cohort (new treatment) and control cohort (current treatment)
2. Minimum sample size: 200 leads per cohort (power = 0.80, α = 0.05)
3. Run for minimum 7 days or until minimum sample reached
4. Statistician (automated) reviews results
5. If p < 0.05 and no regression → ACCEPT
6. If p ≥ 0.05 → REJECT, revert, log finding

### 5. Record
**Action:** Save the action, evidence, outcome delta, and remaining psychological gaps to the Loop State File. Surface to C-suite NLQ dashboard.

**Loop State File Location:** `./LOOP_STATE.md`

**Schema:**
```yaml
cycle: 1
date: 2026-06-24
target_vectors: [attachment_style_nurture]
change_description: "Adjusted WhatsApp CRM cadence for anxious attachment leads"
test_cohort_size: 215
control_cohort_size: 218
primary_metric: nurture_efficiency_rate
primary_result: p=0.032, delta=+18%
secondary_regressions: []
status: ACCEPTED
remaining_gaps:
  - vector: attachment_style_nurture
    gap_to_benchmark: 1pp
  - vector: variable_ratio_scheduling
    gap_to_benchmark: 32pp
  - vector: stress_aware_routing
    gap_to_benchmark: 23pp
```

### 6. Repeat or Stop
**Terminal States:**

| State | Condition | Action |
|-------|-----------|--------|
| **Success** | 12/12 vectors at or above benchmark | Log success, set review cadence to monthly |
| **No Progress** | 3 consecutive rounds with p ≥ 0.05 | Stop, escalate to C-suite with full experiment log |
| **Blocked** | CRM config change requires human approval | Record in LOOP_STATE.md, escalate with evidence, wait |
| **Exhausted** | All 12 vectors at benchmark, no new levers | Enter maintenance mode, quarterly re-benchmarking |

---

## Guardrails

1. **Never change live CRM configuration without logging and approval routing**
2. **Never change agent-facing scripts without agent feedback integration**
3. **Never extrapolate from <200-lead samples**
4. **Never run more than one concurrent experiment per psychological vector**
5. **Always revert on regression — no exceptional overrides**
6. **Always record null results — they prevent duplicated effort**

---

## Handoff Pattern

When this loop completes (enters a terminal state):
1. **Success** → Hand off to monthly monitoring loop
2. **No Progress** → Hand off to C-suite with recommendation for external psychology consultancy review
3. **Blocked** → Hand off to Engineering Lead with change request details
4. **Exhausted** → Hand off to quarterly strategy review
