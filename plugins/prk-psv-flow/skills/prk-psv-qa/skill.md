---
name: prk-psv-qa
description: Validate PSV samples with quality checks
user-invocable: true
disable-model-invocation: false
---

# prk-psv-qa

Validate PSV samples for quality, ground truth accuracy, and realism.

## Usage

```bash
prk-psv-qa
prk-psv-qa --file=psv_samples_batch2.yaml
```

## Parameters

- `--file`: Specific YAML file to validate (optional, defaults to most recent)

## Workflow

1. Read PSV samples from YAML file
2. Call `psv-validator` agent
3. Validate format, content quality, ground truth calibration
4. Check for technique hints and realism
5. Update YAML with qa_status, qa_score, qa_feedback
6. Generate validation report
7. Display summary

## Validation Checks

**Format Validation:**
- All required fields present
- Valid data types and ranges
- Proper external_id format

**Content Quality:**
- Task context clarity (20%)
- Prompt authenticity (30%)
- Output consistency (25%)
- Ground truth accuracy (25%)

**Ground Truth Calibration:**
- Level rating is justified
- Rationale is clear and educational
- Matches PECAM level definitions

**Technique Hint Detection:**
- No evaluation guidance in task_context
- No technique names mentioned
- Neutral, factual descriptions only

**Realism Check:**
- Authentic prompts for each level
- Realistic LLM outputs
- Natural language and phrasing

## Output Format

```
========================================
PSV Sample Validation Report
========================================
Total Samples: 10
✓ PASSED: 8 (80%)
✗ REVISED: 2 (20%)

Average Score: 8.2/10

Quality Breakdown:
- Task Context: 8.5/10
- Prompt Authenticity: 8.0/10
- Output Consistency: 8.3/10
- Ground Truth Accuracy: 8.0/10

Distribution:
- Pillars: P(2), E(2), C(2), A(2), M(2)
- Levels: L1(2), L2(2), L3(2), L4(2), L5(2)
- Difficulties: Easy(3), Medium(4), Hard(3)

Issues Found:
- PSV-CORE-0003 (6.5): Ground truth too high
- PSV-CORE-0007 (6.8): Technique hint detected

Next Steps:
→ Run 'prk-psv-revise' to fix REVISED samples
========================================
```

## Output Files

- Updated YAML with validation results
- `validation_report.txt`: Human-readable summary
- `validation_details.yaml`: Per-sample analysis

## Notes

- Validation is strict on ground truth calibration
- Educational rationales are critical
- Realism is prioritized over perfection
- Samples scoring < 7.0 need revision
