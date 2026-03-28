---
name: prk-question-help
description: Display all available commands with usage examples
user-invocable: true
disable-model-invocation: true
---

# prk-question-help

Display all available PRK question workflow commands.

## Commands

**Initialization:**
- `/prk-question-init --industry=core,tech` - Initialize workspace with industries
- `/prk-question-init --role` - Generate roles for industries

**Display:**
- `/prk-industry` - Show industries
- `/prk-role` - Show roles by industry
- `/prk-question-status` - Show generation/QA progress
- `/prk-question-plan` - Preview generation plan

**Generation:**
- `/prk-question-create [number]` - Generate questions (default: 10 per role)
- `/prk-question-revise` - Regenerate REVISED questions

**QA:**
- `/prk-question-qa` - Validate questions

**Export:**
- `/prk-question-validate` - Final validation
- `/prk-question-export` - Export to SQL/JSON

**Management:**
- `/prk-question-reset` - Reset status files
- `/prk-question-submit` - Create PR to community repo
