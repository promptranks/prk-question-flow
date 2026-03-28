---
name: prk-question-submit
description: Create PR to community repo
user-invocable: true
disable-model-invocation: true
---

# prk-question-submit

Create PR to community repo.

## Workflow

1. Validate export exists
2. Create branch: `questions/{work-folder-name}`
3. Commit `export/questions.json`
4. Push to fork
5. Open PR to `promptranks/prk-question-flow`
