---
name: prk-psv-create
description: Generate PSV samples with automatic validation
user-invocable: true
disable-model-invocation: false
---

# prk-psv-create

Generate PSV (Peer Sample Validation) samples for PromptRanks assessments with automatic quality validation.

## Usage

```bash
prk-psv-create [number]
prk-psv-create [number] --skip-qa
```

## Parameters

- `number`: Number of samples to generate (default: 10)
- `--skip-qa`: Skip automatic validation (for debugging only)

## Workflow

1. Determine sample distribution (pillars, levels, difficulties)
2. Call `psv-generator` agent with parameters
3. Save samples to YAML file
4. **[AUTO-QA]** Automatically invoke `psv-validator` agent (unless `--skip-qa`)
5. Display generation + validation summary
6. If samples need revision, prompt user to run `prk-psv-revise`

## Distribution Strategy

For balanced variety across samples:

**Pillar Distribution (for 10 samples):**
- P: 2 samples
- E: 2 samples
- C: 2 samples
- A: 2 samples
- M: 2 samples

**Level Distribution (for 10 samples):**
- L1 (Novice): 2 samples
- L2 (Practitioner): 2 samples
- L3 (Proficient): 2 samples
- L4 (Expert): 2 samples
- L5 (Master): 2 samples

**Difficulty Distribution (for 10 samples):**
- Easy (1): 3 samples
- Medium (2): 4 samples
- Hard (3): 3 samples

**Note:** Difficulty refers to task complexity, not user skill level. A hard task can have a L1 prompt (novice attempt at hard task).

## Output Format

```
========================================
PSV Sample Generation Complete
========================================
Samples Generated: 10
File: psv_samples_core_batch1.yaml

Distribution:
- Pillars: P(2), E(2), C(2), A(2), M(2)
- Levels: L1(2), L2(2), L3(2), L4(2), L5(2)
- Difficulties: Easy(3), Medium(4), Hard(3)

========================================
Auto-Validation Complete
========================================
Total Validated: 10
✓ PASSED: 8 samples (80%)
✗ REVISED: 2 samples (20%)

Average Score: 8.2/10

Samples requiring revision:
  - PSV-CORE-0003 (score: 6.5) - Ground truth level too high
  - PSV-CORE-0007 (score: 6.8) - Technique hint in task_context

Next Steps:
→ Run 'prk-psv-revise' to regenerate REVISED samples
→ Or run 'prk-psv-create' again to generate more samples
========================================
```

## Notes

- Auto-validation is enabled by default
- Use `--skip-qa` only for debugging
- PSV samples are selected randomly (no distribution filtering)
- Focus on variety and realism over volume
- Target: 50-100 total samples for production

## External ID Format

Samples use format: `PSV-CORE-XXXX` (e.g., PSV-CORE-0001, PSV-CORE-0002)

For industry-specific samples: `PSV-{INDUSTRY}-XXXX` (e.g., PSV-TECH-0001)
