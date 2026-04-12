---
name: prk-psv-revise
description: Regenerate PSV samples that failed validation
user-invocable: true
disable-model-invocation: false
---

# prk-psv-revise

Regenerate PSV samples that failed validation using QA feedback.

## Usage

```bash
prk-psv-revise
prk-psv-revise --file=psv_samples_batch2.yaml
```

## Parameters

- `--file`: Specific YAML file to revise (optional, defaults to most recent)

## Workflow

1. Read YAML file to find samples with `qa_status: REVISED`
2. For each revised sample:
   - Extract QA feedback and issues
   - Call `psv-generator` with revision guidance
   - Incorporate feedback to fix issues
3. Replace revised samples in original YAML file
4. **[AUTO-QA]** Re-validate revised samples
5. Display revision summary

## Revision Guidance

**Common issues and fixes:**

**Ground truth level too high/low:**
- Re-evaluate prompt characteristics
- Adjust level to match actual quality
- Update rationale to justify new level

**Technique hints in task_context:**
- Remove evaluation guidance
- Make description neutral and factual
- Focus on what user was asked to do

**Unrealistic prompt:**
- Make language more natural
- Match authentic user behavior for that level
- Avoid artificial construction

**Weak rationale:**
- Add specific prompt characteristics
- Explain why this level (not adjacent)
- Reference PECAM definitions
- Be educational and clear

## Output Format

```
========================================
PSV Sample Revision Complete
========================================
Samples Revised: 2
- PSV-CORE-0003: Adjusted level L4→L3, improved rationale
- PSV-CORE-0007: Removed technique hints from task_context

========================================
Re-Validation Results
========================================
✓ PASSED: 2/2 samples (100%)

All revised samples now pass validation!

Next Steps:
→ Run 'prk-psv-export' to export samples to database
========================================
```

## Notes

- Uses QA feedback to guide regeneration
- Automatically re-validates after revision
- May require multiple iterations for complex issues
- Preserves external_id and other metadata
- Updates version number on revision
