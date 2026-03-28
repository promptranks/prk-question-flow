---
name: prk-question-revise
description: Regenerate REVISED questions using QA feedback
user-invocable: true
disable-model-invocation: true
---

# prk-question-revise

Regenerate questions with qa_status=REVISED.

## Usage

```bash
prk-question-revise
```

## Workflow

1. Scan all `questions-*.yaml` files
2. Find questions with `qa_status: REVISED`
3. Call `question-reviser` agent for each
4. Update same YAML file
5. Set `qa_status: TBI`
