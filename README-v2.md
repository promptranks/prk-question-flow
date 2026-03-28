# PRK Question Flow v2.0

**Automated question generation workflow for PromptRanks**

Generate high-quality, industry/role-specific questions with built-in QA validation. Designed for team collaboration and open-source contributions.

---

## Quick Start

```bash
# Install plugin
claude-code plugin install promptranks/prk-question-flow

# Initialize with industries
prk-question-init --industry=core,tech,finance
prk-question-init --role

# Preview generation plan
prk-question-plan

# Generate 10 questions per role
prk-question-create 10

# Run QA validation
prk-question-qa

# Revise failed questions
prk-question-revise

# Validate and export
prk-question-validate
prk-question-export

# Submit to community
prk-question-submit
```

---

## Features

✅ **Stateful Execution** - Pause/resume anytime
✅ **Timestamped Batches** - Keep history of all generations
✅ **Automated QA** - Built-in validation with scoring
✅ **DB-Ready Export** - SQL/JSON for direct import
✅ **Community Ready** - Easy PR submission

---

## Commands

| Command | Description |
|---------|-------------|
| `prk-question-init --industry=...` | Initialize industries |
| `prk-question-init --role` | Generate roles |
| `prk-industry` | Display industries |
| `prk-role` | Display roles |
| `prk-question-plan` | Preview generation plan |
| `prk-question-create [N]` | Generate N questions per role |
| `prk-question-qa` | Validate questions |
| `prk-question-revise` | Regenerate failed questions |
| `prk-question-status` | Show progress |
| `prk-question-validate` | Pre-export validation |
| `prk-question-export` | Generate SQL/JSON |
| `prk-question-reset` | Reset current batch |
| `prk-question-submit` | Create PR |
| `prk-question-help` | Show all commands |

---

## Directory Structure

```
.prk-question/
├── state.yaml                  # Current working folder
├── work-2026-03-28-001/        # Timestamped batch
│   ├── industry.yaml
│   ├── roles.yaml
│   ├── questions-core.yaml
│   ├── questions-tech.yaml
│   ├── create-status.yaml
│   ├── qa-status.yaml
│   └── export/
│       ├── questions.sql
│       └── questions.json
└── cache/
    └── core_questions.yaml
```

---

## Documentation

- [Complete Workflow Specification](WORKFLOW-SPEC.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Agent Specifications](agents/)

---

## License

MIT
