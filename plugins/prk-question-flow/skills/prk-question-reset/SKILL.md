---
name: prk-question-reset
description: Reset status files while keeping industry/roles
user-invocable: true
disable-model-invocation: true
---

# prk-question-reset

Reset current working folder state.

## Workflow

1. Read `state.yaml` to get current working folder
2. Delete `create-status.yaml` and `qa-status.yaml`
3. Delete all `questions-*.yaml` files
4. Keep `industry.yaml`, `roles.yaml`, `question_plan.md`
5. Unlock state
