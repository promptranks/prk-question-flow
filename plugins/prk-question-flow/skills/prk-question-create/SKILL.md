---
name: prk-question-create
description: Generate questions for industries and roles
user-invocable: true
disable-model-invocation: true
---

# prk-question-create

Generate questions for all industries and roles with PECAM distribution.

## Usage

```bash
prk-question-create [number]
```

## Parameters

- `number`: Questions per role (default: 10)

## Workflow

1. Read current working folder from `state.yaml`
2. Lock `industry.yaml` to prevent modifications
3. For each industry and role:
   - Generate questions with distribution: 2 per pillar (P,E,C,M,A)
   - Difficulty: 4 easy, 4 medium, 2 hard
   - Call `question-generator` agent
4. Save to `questions-{industry_slug}.yaml`
5. Update `create-status.yaml`
6. Auto-call `prk-question-status`
