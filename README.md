# PRK Question Flow v2.1

**Automated question generation workflow for PromptRanks**

Generate high-quality, industry/role-specific questions with built-in QA validation and semantic duplicate detection.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Features

✅ **Stateful Execution** - Pause/resume with timestamped batches
✅ **Semantic Duplicate Detection** - Embedding-based similarity check
✅ **Automated QA** - Only processes TBI/REVISED questions
✅ **MCP Integration** - Database access for validation
✅ **DB-Ready Export** - SQL/JSON for direct import
✅ **Community Ready** - Easy PR submission

---

## Quick Start

### 1. Install Plugin

```bash
claude-code plugin install promptranks/prk-question-flow
```

### 2. Install MCP Server

```bash
npm install -g @promptranks/questions-mcp-server
```

### 3. Configure MCP

Add to `~/.claude/mcp.json`:

```json
{
  "mcpServers": {
    "promptranks-questions": {
      "command": "npx",
      "args": ["@promptranks/questions-mcp-server"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@host:5432/promptranks",
        "EMBEDDING_PROVIDER": "openai",
        "OPENAI_API_KEY": "your-key"
      }
    }
  }
}
```

### 4. Run Workflow

```bash
# Initialize
prk-question-init --industry=core,tech,finance
prk-question-init --role

# Preview
prk-question-plan

# Generate
prk-question-create 10

# QA validation
prk-question-qa

# Revise failed questions
prk-question-revise

# Repeat QA until all PASSED
prk-question-qa

# Export
prk-question-validate
prk-question-export

# Submit
prk-question-submit
```

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
| `prk-question-qa` | Validate questions (TBI/REVISED only) |
| `prk-question-revise` | Regenerate failed questions |
| `prk-question-status` | Show progress |
| `prk-question-validate` | Pre-export validation |
| `prk-question-export` | Generate SQL/JSON |
| `prk-question-reset` | Reset current batch |
| `prk-question-submit` | Create PR |
| `prk-question-help` | Show all commands |

---

## Workflow Lifecycle

```
Init → Plan → Create → QA → Revise → QA (loop) → Validate → Export → Submit
```

### Question Status Flow

```
CREATE → TBI
         ↓
    QA (TBI) → PASSED ✓
         ↓
      REVISED
         ↓
    REVISE → TBI
         ↓
    QA (TBI) → PASSED ✓
```

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
- [MCP Server Specification](MCP-SERVER-SPEC.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Agent Specifications](agents/)

---

## How It Works

### 1. Semantic Duplicate Detection

Uses embedding-based similarity (cosine > 0.85) to detect semantic duplicates:
- "What's the best way to structure a prompt?"
- "How should you organize prompt instructions?"

### 2. QA Optimization

QA agent only processes:
- `TBI` (To Be Inspected) - newly created
- `REVISED` - failed previous QA

Skips `PASSED` questions for efficiency.

### 3. MCP Integration

Contributors run their own MCP server with:
- Read-only database access
- Embedding generation (OpenAI/Anthropic)
- Rate limiting (100 req/hour)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT
