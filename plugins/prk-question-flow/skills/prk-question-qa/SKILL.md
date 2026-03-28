---
name: prk-question-qa
description: Validate generated questions with QA agent
user-invocable: true
disable-model-invocation: true
---

# prk-question-qa

Validate questions, skip PASSED questions.

## Usage

```bash
prk-question-qa
```

## Workflow

1. Read `state.yaml` and `question_plan.md`
2. Read `qa-status.yaml` to find next industry
3. If no status file, start with first industry
4. For current industry only:
   - Process only TBI and REVISED questions
   - Skip PASSED questions
   - Validate format, content, quality
   - Semantic duplicate check via MCP (similarity > 0.85)
   - Score: clarity, relevance, difficulty (1-10)
   - Update qa_status: PASSED (≥7.0) or REVISED (<7.0)
5. Update `qa-status.yaml` with completed industry
6. Stop and display status
7. User must run command again for next industry
