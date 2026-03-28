# PRK Question Flow v2.2

**Automated question generation workflow for PromptRanks with MCP integration**

Generate high-quality, industry/role-specific questions with built-in QA validation, semantic duplicate detection, and real database IDs via MCP.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/@promptranks/questions-mcp-server)](https://www.npmjs.com/package/@promptranks/questions-mcp-server)

---

## Features

✅ **Real Database IDs** - MCP integration for industry/role management
✅ **Stateful Execution** - Pause/resume with timestamped batches
✅ **Semantic Duplicate Detection** - Embedding-based similarity check
✅ **Automated QA** - Only processes TBI/REVISED questions
✅ **DB-Ready Export** - SQL/JSON with real database relationships
✅ **Community Ready** - Published MCP server on npm

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

Get your API key from https://promptranks.org/mcp-api-key

Create `~/.promptranks/mcp_api_key.json`:

```json
{
  "key": "mcp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

Add to `~/.claude.json`:

```json
{
  "mcpServers": {
    "prk-questions": {
      "command": "npx",
      "args": ["@promptranks/questions-mcp-server"]
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

The MCP server provides two tools:
- `get_or_create_industry` - Creates/retrieves industries with real database IDs
- `get_or_create_role` - Creates/retrieves roles with real database IDs

All generated questions use real database IDs for proper relationships.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT
