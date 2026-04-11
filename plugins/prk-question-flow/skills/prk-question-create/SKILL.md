---
name: prk-question-create
description: Generate questions for industries and roles with automatic QA validation
user-invocable: true
disable-model-invocation: true
---

# prk-question-create

Generate questions for all industries and roles with PECAM distribution, then automatically validate them.

## Usage

```bash
prk-question-create [number]
prk-question-create [number] --skip-qa
```

## Parameters

- `number`: Questions per role (default: 10)
- `--skip-qa`: Skip automatic QA validation (optional, for debugging)

## Workflow

1. Read `state.yaml` and `question_plan.md`
2. Read `create-status.yaml` to find next industry
3. If no status file, start with first industry
4. For current industry only:
   - Generate questions for all roles
   - Distribution: 2 per pillar (P,E,C,M,A), 4 easy/4 medium/2 hard
   - Call `question-generator` agent
5. Save to `questions-{industry_slug}.yaml`
6. Update `create-status.yaml` with completed industry
7. **[AUTO-QA]** Automatically invoke QA validation workflow (unless `--skip-qa` specified):
   - Process only TBI questions (newly generated)
   - Validate format, content, quality
   - Semantic duplicate check via MCP (similarity > 0.85)
   - Score: clarity, relevance, difficulty (1-10)
   - Update qa_status: PASSED (≥7.0) or REVISED (<7.0)
   - Update `qa-status.yaml` with validation results
8. Display combined status:
   - Generation summary (X questions created)
   - QA summary (Y PASSED, Z REVISED)
   - Next steps: If questions need revision, run `prk-question-revise`
9. User must run command again for next industry

## Output Format

```
========================================
Question Generation Complete
========================================
Industry: Technology & Software
Questions Generated: 50

========================================
Auto-QA Validation Complete
========================================
Total Validated: 50
✓ PASSED: 48 questions
✗ REVISED: 2 questions

Questions requiring revision:
  - P-IND-0151 (score: 6.5) - Lacks industry context
  - E-IND-0152 (score: 6.8) - Option C too similar to B

Next Steps:
→ Run 'prk-question-revise' to regenerate REVISED questions
→ Or run 'prk-question-create' again to continue to next industry
========================================
```

## Notes

- Auto-QA is enabled by default in v2.2+
- Use `--skip-qa` only for debugging or testing
- `prk-question-qa` command still available for manual QA
- QA only processes TBI questions, skips already PASSED questions
