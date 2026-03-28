---
name: prk-role
description: Display roles grouped by industry
user-invocable: true
disable-model-invocation: true
---

# prk-role

Display roles grouped by industry.

## Workflow

1. Read `state.yaml` to get current working folder
2. Read `roles.yaml` from working folder
3. Group roles by industry_slug
4. Display with industry name and role details
