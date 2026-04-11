# PRK Question Flow v2.2

**Automated question generation workflow for PromptRanks with auto-QA validation**

Generate high-quality, database-ready questions with automatic QA validation, semantic duplicate detection, and direct database import.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/@promptranks/questions-mcp-server)](https://www.npmjs.com/package/@promptranks/questions-mcp-server)

---

## 🎉 What's New in v2.2

✅ **Auto-QA Integration** - Questions are automatically validated after generation  
✅ **Single Command Workflow** - No need to run separate QA command  
✅ **Guaranteed Quality** - All questions are validated before export  
✅ **Faster Iteration** - Immediate feedback on question quality  
✅ **Backward Compatible** - Can skip auto-QA with `--skip-qa` flag if needed  

## What's New in v2.1

✅ **Required Pillar Field** - All questions now include PECAM pillar (P, E, C, A, M)  
✅ **Numeric Difficulty** - Standardized difficulty levels (1=easy, 2=medium, 3=hard)  
✅ **Enhanced Validation** - Question validator checks all required fields including pillar  
✅ **Backoffice Compatible** - Questions ready for direct import to backoffice API  

## What's New in v2.0

✅ **Database-Ready Format** - Questions ready for direct SQL import (no transformation needed)  
✅ **Interactive Selection** - Choose industries/roles from live taxonomy via MCP  
✅ **Semantic Tagging** - Auto-tag existing questions for multi-role applicability  
✅ **Authoritative Taxonomy** - 10 industries, 70 roles with correct database UUIDs  
✅ **Offline Capable** - Taxonomy embedded in MCP server (no API dependency)  
✅ **Cross-Role Questions** - Generate universal questions applicable to multiple roles  

---

## Features

✅ **Real Database IDs** - MCP integration with authoritative NAICS + LinkedIn taxonomy  
✅ **Interactive Workflow** - Select industries/roles from list, not manual entry  
✅ **Database-Ready Export** - SQL with correct format, no transformation needed  
✅ **Semantic Tagging** - Auto-tag existing questions for broader applicability  
✅ **Stateful Execution** - Pause/resume with timestamped batches  
✅ **Automated QA** - Only processes TBI/REVISED questions  
✅ **Community Ready** - Published MCP server on npm  

---

## Quick Start

### 1. Install MCP Server

```bash
npm install -g @promptranks/questions-mcp-server@2.0.0
```

### 2. Configure MCP

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

### 3. Run Workflow

```bash
# Initialize - interactive selection
prk-question-init --industry
prk-question-init --role

# Or use CLI mode
prk-question-init --industry=technology-software,financial-services
prk-question-init --role=software-engineer,data-scientist

# Preview generation plan
prk-question-plan

# Generate AND validate questions (auto-QA enabled in v2.2)
prk-question-create 10
# ✓ Questions generated
# ✓ Auto-QA validation complete
# ✓ Results: 48 PASSED, 2 REVISED

# Revise failed questions (if any)
prk-question-revise

# Re-run to validate revised questions
prk-question-create 0  # Skips generation, runs QA only
# OR
prk-question-qa  # Manual QA command still available

# Export SQL (only PASSED questions)
prk-question-export

# Import to database
docker exec -i saas-webapp-postgres psql -U promptranks -d promptranks < export/questions.sql
```

### 4. Tag Existing Questions

```bash
# Tag existing questions with semantic analysis
prk-question-tag --industry=technology-software --min-score=80

# Review suggestions
prk-question-tag-review

# Approve and export
prk-question-tag-approve --min-score=85
prk-question-tag-export

# Import tags to database
docker exec -i saas-webapp-postgres psql -U promptranks -d promptranks < tagging/question-tags-import.sql
```

---

## Commands

| Command | Description |
|---------|-------------|
| `prk-question-init --industry` | Interactive industry selection |
| `prk-question-init --role` | Interactive role selection |
| `prk-industry` | Display selected industries |
| `prk-role` | Display selected roles |
| `prk-question-plan` | Preview generation plan |
| `prk-question-create [N]` | Generate and auto-validate N questions per role |
| `prk-question-create [N] --skip-qa` | Generate questions without auto-QA |
| `prk-question-create [N] --cross-role` | Generate universal questions |
| `prk-question-qa` | Validate questions manually (TBI/REVISED only) |
| `prk-question-revise` | Regenerate failed questions |
| `prk-question-status` | Show progress |
| `prk-question-validate` | Pre-export validation |
| `prk-question-export` | Generate SQL for database import |
| `prk-question-tag` | Semantic tagging of existing questions |
| `prk-question-tag-review` | Review tagging suggestions |
| `prk-question-tag-approve` | Approve tags |
| `prk-question-tag-export` | Generate SQL for tag import |
| `prk-question-reset` | Reset current batch |
| `prk-question-help` | Show all commands |

---

## Workflow Lifecycle

```
Init → Plan → Create+QA → Revise → Create+QA (loop) → Validate → Export → Import
                                                                              ↓
                                                                         Tag (optional)
```

### Question Status Flow

```
CREATE → TBI
         ↓
    AUTO-QA → PASSED ✓
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
├── work-2026-04-06-001/        # Timestamped batch
│   ├── industry.yaml           # Selected industries
│   ├── roles.yaml              # Selected roles
│   ├── questions-tech.yaml     # Generated questions (database-ready)
│   ├── questions-finance.yaml
│   ├── create-status.yaml
│   ├── qa-status.yaml
│   ├── export/
│   │   ├── questions.sql       # Direct database import
│   │   └── questions.json
│   └── tagging/
│       ├── question-tags-TIMESTAMP.yaml
│       ├── question-tags-import.sql
│       └── question-tags-rollback.sql
└── cache/
    └── existing_questions.yaml
```

---

## Database-Ready Format (v2.0)

Questions are generated in the exact format needed for database import:

```yaml
questions:
  - id: 91feb6cf-7b63-42ad-b81d-39f1f2f050e6
    external_id: P-IND-0151
    pillar: P
    difficulty: 2
    question_type: mcq
    question_text: "As a Software Engineer, you're using an LLM to..."
    options:
      - "Correct answer"
      - "Wrong answer 1"
      - "Wrong answer 2"
      - "Wrong answer 3"
    correct_answer: 0
    explanation: "The first option is correct because..."
    tags:
      - prompt-design
      - software-engineering
    content_tier: core
    source: generated
    version: 1
    is_active: true
    created_at: 2026-04-06T22:00:00Z
    # Metadata
    role_id: 20000001-0000-0000-0000-000000000001
    industry_id: 10000000-0000-0000-0000-000000000001
```

**Key Changes from v1.0**:
- ✅ `options` array (4 items) instead of `correct_answer` + `wrong_answers`
- ✅ `correct_answer` as integer index (0-3) instead of string
- ✅ Sequential `external_id` format (`P-IND-0151`) instead of role-based
- ✅ All required database fields included
- ✅ Correct UUIDs from authoritative taxonomy

---

## Authoritative Taxonomy

**10 Industries** (NAICS + LinkedIn Hybrid):
1. Technology & Software
2. Financial Services
3. Healthcare & Life Sciences
4. Manufacturing & Engineering
5. Professional Services
6. Retail & E-Commerce
7. Energy & Utilities
8. Education & Research
9. Media, Entertainment & Creative
10. Government & Public Sector

**70 Roles** (7 per industry):
- Software Engineer, DevOps Engineer, Data Scientist, ML Engineer, Security Engineer, Solutions Architect, Product Manager (Technical)
- Financial Analyst, Quantitative Analyst, Risk Manager, Investment Banker, Compliance Officer, Fraud Analyst, Accountant
- ... (63 more roles)

See [DATABASE_IDS_REFERENCE.md](../Server/.prk-question/DATABASE_IDS_REFERENCE.md) for complete list with UUIDs.

---

## Semantic Tagging

Tag existing questions for broader applicability:

```bash
# Analyze and suggest tags
prk-question-tag --industry=technology-software --min-score=75

# Review suggestions interactively
prk-question-tag-review

# Auto-approve high-confidence suggestions
prk-question-tag-approve --min-score=85

# Generate SQL import
prk-question-tag-export

# Import to database
docker exec -i saas-webapp-postgres psql -U promptranks -d promptranks \
  < tagging/question-tags-import.sql
```

**Example**: A question for "Software Engineer" might also apply to "DevOps Engineer" and "ML Engineer". The tagger analyzes semantically and suggests these additional tags.

---

## Migration from v1.0

**Breaking Changes**: v2.0 uses a different question format.

**Migration Path**:
1. Keep existing v1.0 workflows in `work-*` folders
2. Use the transformation script to convert old format to new:
   ```bash
   python3 transform_questions.py
   ```
3. New workflows automatically use v2.0 format

---

## Documentation

- [Complete Workflow Specification](WORKFLOW-SPEC.md)
- [MCP Server Specification](MCP-SERVER-SPEC.md)
- [v2.0 Update Plan](PRK_WORKFLOW_UPDATE_PLAN.md)
- [Contributing Guidelines](CONTRIBUTING.md)

---

## How It Works

### 1. Interactive Selection via MCP

MCP server provides 4 tools:
- `list_industries` - Get all 10 industries
- `list_roles` - Get roles (optionally filtered by industry)
- `get_industry` - Get specific industry by ID/slug
- `get_role` - Get specific role by ID/slug

User selects from list → workflow generates YAML with correct UUIDs.

### 2. Database-Ready Generation

Questions are generated in the exact format needed for database import. No transformation required.

### 3. Semantic Tagging

Uses LLM analysis to determine if a question applies to multiple roles/industries. Generates reviewable YAML + SQL for batch import.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT

---

## Changelog

### v2.2.0 (2026-04-11)

**New Features**:
- Auto-QA integration - Questions automatically validated after generation
- Single command workflow - No need to run separate QA command
- Immediate feedback - See validation results right after generation
- Optional skip flag - Use `--skip-qa` to disable auto-QA if needed

**Improvements**:
- Guaranteed quality - All questions validated before export
- Faster iteration - Immediate feedback on question quality
- Better UX - Combined generation + QA status in single output
- Backward compatible - Manual `prk-question-qa` still available

### v2.1.0 (2026-04-07)

**New Features**:
- Required pillar field in all questions
- Numeric difficulty levels (1=easy, 2=medium, 3=hard)
- Enhanced validation for all required fields
- Backoffice API compatibility

### v2.0.0 (2026-04-06)

**Breaking Changes**:
- Question format changed to database-ready (options array + correct_answer index)
- External ID format changed to sequential (P-IND-0151)
- MCP tools changed (removed get_or_create_*, added list_* and get_*)

**New Features**:
- Interactive industry/role selection
- Semantic tagging of existing questions
- Cross-role question generation
- Authoritative taxonomy embedded in MCP server
- Direct SQL import (no transformation needed)

**Improvements**:
- Offline capable (no API dependency)
- Correct UUIDs guaranteed
- Faster workflow (skip transformation step)
- Better error handling and validation

### v1.0.1 (2026-03-28)

- Initial release with MCP integration
- Dynamic industry/role creation via API
- Workflow format questions
- QA validation and revision workflow
