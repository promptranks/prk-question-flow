# PRK Question Generation & QA Workflow

**Version:** 2.0.0
**Date:** 2026-03-28
**Status:** Final Specification

---

## Overview

Complete lifecycle management for PromptRanks question generation and QA inspection. Designed for team collaboration and open-source community contributions.

**Objective:** Enable anyone to install this workflow, generate industry/role-specific questions, and contribute to promptranks.org community version.

---

## Workflow Lifecycle

```
1. Init → 2. Plan → 3. Create → 4. QA → 5. Revise →
6. Validate → 7. Export → 8. Manual Import → 9. Submit PR
```

---

## Directory Structure

```
.prk-question/
├── state.yaml                      # Current working folder pointer
├── work-2026-03-28-001/            # Timestamped working folder
│   ├── industry.yaml               # Industries to generate
│   ├── roles.yaml                  # Roles per industry
│   ├── create-status.yaml          # Generation progress
│   ├── qa-status.yaml              # QA progress
│   ├── questions-core.yaml         # Core industry questions (all roles)
│   ├── questions-tech.yaml         # Tech industry questions (all roles)
│   ├── questions-finance.yaml      # Finance industry questions
│   ├── export/                     # DB-ready exports
│   │   ├── questions.sql
│   │   └── questions.json
│   └── logs/                       # Execution logs
│       ├── create.log
│       └── qa.log
├── work-2026-03-29-001/            # Next generation batch
└── cache/                          # Existing questions cache
    └── core_questions.yaml
```

---

## Command Reference

### Initialization

#### `prk-question-init --industry=core,tech,finance`
Creates new timestamped working folder and initializes industry.yaml

**Behavior:**
- Creates `.prk-question/work-YYYY-MM-DD-NNN/`
- Updates `state.yaml` to point to new folder
- Creates `industry.yaml` with specified industries
- Fetches existing questions from database to `cache/`
- Locks `industry.yaml` during generation

**Default:** If no `--industry` parameter, creates only `core`

**Output:**
```yaml
# .prk-question/state.yaml
current_work_folder: work-2026-03-28-001
created_at: 2026-03-28T10:00:00Z
locked: false

# .prk-question/work-2026-03-28-001/industry.yaml
industries:
  - id: a0000001-0000-0000-0000-000000000001
    name: Technology
    slug: core
    description: Core general questions applicable to all industries

  - id: a0000001-0000-0000-0000-000000000001
    name: Technology
    slug: tech
    description: Software, hardware, IT services

  - id: a0000001-0000-0000-0000-000000000002
    name: Finance & Banking
    slug: finance
    description: Financial services, banking, investment
```

#### `prk-question-init --role`
Creates roles.yaml based on industries in industry.yaml

**Behavior:**
- Reads `industry.yaml` from current working folder
- For each industry, creates relevant roles
- Saves to `roles.yaml`

**Output:**
```yaml
# .prk-question/work-2026-03-28-001/roles.yaml
roles:
  - id: b0000001-0000-0000-0000-000000000002
    name: Data Scientist
    slug: data-scientist
    industry_id: a0000001-0000-0000-0000-000000000001
    industry_slug: tech
    responsibilities:
      - Build predictive models
      - Analyze large datasets

  - id: b0000001-0000-0000-0000-000000000101
    name: ML Engineer
    slug: ml-engineer
    industry_id: a0000001-0000-0000-0000-000000000001
    industry_slug: tech
    responsibilities:
      - Deploy ML models
      - Build ML pipelines
```

---

### Display Commands

#### `prk-question-help`
Display all available commands with usage examples

#### `prk-industry`
Display industries from current working folder

**Output:**
```
Current working folder: work-2026-03-28-001

Industries:
1. core - Core general questions
2. tech - Technology
3. finance - Finance & Banking
```

#### `prk-role`
Display roles grouped by industry

**Output:**
```
Current working folder: work-2026-03-28-001

tech (Technology):
  - data-scientist (Data Scientist)
  - ml-engineer (ML Engineer)

finance (Finance & Banking):
  - financial-analyst (Financial Analyst)
  - fraud-aml-analyst (Fraud / AML Analyst)
```

#### `prk-question-status`
Display generation and QA progress

**Output:**
```
Working Folder: work-2026-03-28-001
Status: In Progress

Generation Progress:
  core: ✓ Complete (50 questions)
  tech: ⏳ In Progress (30/50 questions)
  finance: ⏸ Pending

QA Progress:
  core: ✓ Complete (48 PASSED, 2 REVISED)
  tech: ⏸ Pending
  finance: ⏸ Pending

Total Questions: 80
  PASSED: 48
  REVISED: 2
  TBI: 30
```

#### `prk-question-plan`
Preview generation plan without executing

**Output:**
```
Generation Plan for work-2026-03-28-001

Industry: core
  Roles: 5
  Questions per role: 10
  Total: 50 questions
  Distribution:
    - P pillar: 10 (4 easy, 4 medium, 2 hard)
    - E pillar: 10 (4 easy, 4 medium, 2 hard)
    - C pillar: 10 (4 easy, 4 medium, 2 hard)
    - M pillar: 10 (4 easy, 4 medium, 2 hard)
    - A pillar: 10 (4 easy, 4 medium, 2 hard)

Industry: tech
  Roles: 5
  Questions per role: 10
  Total: 50 questions
  ...

Grand Total: 150 questions
Estimated time: 2-3 hours
```

---

---

### Generation Commands

#### `prk-question-create [number]`
Generate questions for all industries and roles

**Parameters:**
- `number`: Questions per role (default: 10)

**Behavior:**
- Reads current working folder from `state.yaml`
- Locks `industry.yaml` to prevent modifications
- Iterates through each industry in `industry.yaml`
- For each industry, iterates through all roles
- For each role, generates `number` questions with distribution:
  - **Pillars:** 2 questions per pillar (P, E, C, M, A)
  - **Difficulty:** 4 easy, 4 medium, 2 hard
- Saves to `questions-{industry_slug}.yaml` (one file per industry, all roles)
- Updates `create-status.yaml` after each industry
- Stops after each industry completion
- Auto-calls `prk-question-status` at end

**Example:**
```bash
prk-question-create 10
```

**Output File Format:**
```yaml
# questions-tech.yaml
industry: Technology
industry_slug: tech
industry_id: a0000001-0000-0000-0000-000000000001
generated_at: 2026-03-28T10:30:00Z

questions:
  # Data Scientist role - 10 questions
  - id: tech-data-scientist-P-D1-001
    role: Data Scientist
    role_slug: data-scientist
    role_id: b0000001-0000-0000-0000-000000000002
    pillar: P
    difficulty: 1
    question_text: |
      As a data scientist, you're prompting an LLM to generate...
    options:
      - "Option A"
      - "Option B (correct)"
      - "Option C"
      - "Option D"
    correct_answer: 1
    explanation: |
      Option B is correct because...
    tags:
      - data-science
      - prompt-design
    qa_status: TBI

  - id: tech-data-scientist-P-D1-002
    ...

  # ML Engineer role - 10 questions
  - id: tech-ml-engineer-P-D1-001
    ...
```

**Status File:**
```yaml
# create-status.yaml
current_industry: tech
current_role: ml-engineer
completed_industries:
  - core
in_progress: tech
pending:
  - finance
total_questions_generated: 80
last_updated: 2026-03-28T11:00:00Z
```

#### `prk-question-revise`
Regenerate questions with qa_status=REVISED

**Behavior:**
- Scans all `questions-*.yaml` files
- Finds questions with `qa_status: REVISED`
- Regenerates using QA feedback
- Updates same YAML file with new questions
- Sets `qa_status: TBI` for regenerated questions

---

### QA Commands

#### `prk-question-qa`
Validate generated questions

**Behavior:**
- Reads current working folder from `state.yaml`
- **Processes only questions with `qa_status: TBI` or `REVISED`**
- **Skips questions with `qa_status: PASSED`**
- Follows same iteration order as creation (industry → roles)
- For each question:
  - Validates format, content, quality
  - **Semantic duplicate check via MCP embeddings** (cosine similarity > 0.85)
  - Scores: clarity, relevance, difficulty (1-10)
  - Sets `qa_status`:
    - `PASSED` if score ≥ 7.0 and no duplicates
    - `REVISED` if score < 7.0 or duplicate found (adds feedback)
- Updates `qa-status.yaml` after each industry
- Stops after each industry completion
- **Reports completion:** "All questions PASSED" or "X questions need revision"

**Output:**
```yaml
# questions-tech.yaml (updated)
questions:
  - id: tech-data-scientist-P-D1-001
    ...
    qa_status: PASSED
    qa_score: 8.5
    qa_timestamp: 2026-03-28T12:00:00Z

  - id: tech-data-scientist-E-D2-003
    ...
    qa_status: REVISED
    qa_score: 6.2
    qa_feedback: |
      - Question lacks industry-specific context
      - Option C is too similar to option B
      - Explanation should reference data science workflows
    qa_timestamp: 2026-03-28T12:01:00Z
```

---

### Export & Validation

#### `prk-question-validate`
Final validation before export

**Behavior:**
- Checks all questions have `qa_status: PASSED`
- Validates DB schema compliance
- Checks for missing fields
- Reports any issues

**Output:**
```
Validation Report for work-2026-03-28-001

✓ All questions have qa_status: PASSED
✓ Schema compliance: 100%
✓ No missing fields
✓ No duplicate IDs

Ready for export: 148 questions
```

#### `prk-question-export`
Generate DB-ready SQL and JSON

**Behavior:**
- Exports only `qa_status: PASSED` questions
- Generates `export/questions.sql` for PostgreSQL
- Generates `export/questions.json` for API import
- Includes industry/role linkages

**Output:**
```sql
-- export/questions.sql
INSERT INTO questions (id, external_id, pillar, difficulty, ...) VALUES
('uuid', 'tech-data-scientist-P-D1-001', 'P', 1, ...),
...

INSERT INTO question_roles (question_id, role_id) VALUES
('uuid', 'role-uuid'),
...
```

---

### Management Commands

#### `prk-question-reset`
Reset current working folder state

**Behavior:**
- Clears `create-status.yaml` and `qa-status.yaml`
- Deletes all `questions-*.yaml` files
- Unlocks `industry.yaml`
- Keeps `industry.yaml` and `roles.yaml` intact

#### `prk-question-submit`
Create PR to community repo

**Behavior:**
- Validates export exists
- Creates branch: `questions/{work-folder-name}`
- Commits `export/questions.json`
- Pushes to fork
- Opens PR to `promptranks/prk-question-flow`

---

---

## Agent Context & Requirements

### Project Background

**PromptRanks** is an open-source AI prompt engineering assessment platform that measures prompting skills using the PECAM framework.

**PECAM Framework:**
- **P** - Prompt Design: Clarity, structure, format control
- **E** - Evaluation: Testing, debugging, output quality assessment
- **C** - Context Management: RAG, memory, token optimization
- **M** - Meta-Cognition: Model understanding, capability limits
- **A** - Agentic Prompting: Multi-step workflows, tool use, agents

**Assessment Modes:**
- Quick (15 min): 10 KBA questions + 1 PPA task
- Full (60 min): 20 KBA questions + 3-5 PPA tasks + PSV portfolio

**Proficiency Levels:**
- L1 (0-49): Foundational
- L2 (50-69): Practitioner
- L3 (70-84): Proficient
- L4 (85-94): Advanced
- L5 (95-100): Master

### Question Distribution Rules

**Per Role:** 10 questions (default)
- 2 questions per pillar (P, E, C, M, A)
- Difficulty: 4 easy (D1), 4 medium (D2), 2 hard (D3)

**Example for 1 role:**
```
P pillar: 2 questions (1 D1, 1 D2)
E pillar: 2 questions (1 D1, 1 D2)
C pillar: 2 questions (1 D1, 1 D2)
M pillar: 2 questions (1 D2, 1 D3)
A pillar: 2 questions (1 D2, 1 D3)
Total: 10 questions (4 D1, 4 D2, 2 D3)
```

### Quality Requirements

**Industry Specificity:**
- Use industry-specific terminology
- Reference real workflows
- Realistic scenarios
- Not generic (can't apply to all industries)

**Role Specificity:**
- Use role responsibilities
- Frame from role perspective
- Appropriate complexity for role

**Question Quality:**
- Clear, unambiguous question text
- 4 plausible options
- Only 1 correct answer
- Detailed explanation teaching the concept
- No typos or grammar errors

**Scoring Threshold:**
- Overall score ≥ 7.0 required
- Clarity ≥ 7.0
- Industry relevance ≥ 7.0
- Pillar alignment ≥ 7.0

---

---

## MCP Server Integration

### Overview

Contributors run their own MCP server to access PromptRanks database for duplicate detection.

### Installation

```bash
npm install -g @promptranks/questions-mcp-server
```

### Configuration

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

### Endpoints

- `get_questions(industry_id, role_id)` - Existing questions
- `get_embeddings(industry_id, role_id)` - Question embeddings
- `check_duplicate(question_text, industry_id, role_id)` - Semantic check (similarity > 0.85)

---

## Implementation Details

### State Management

**state.yaml:**
```yaml
current_work_folder: work-2026-03-28-001
created_at: 2026-03-28T10:00:00Z
locked: false
```

**create-status.yaml:**
```yaml
current_industry: tech
current_role: ml-engineer
completed_industries:
  - core
in_progress: tech
pending:
  - finance
total_questions_generated: 80
last_updated: 2026-03-28T11:00:00Z
```

**qa-status.yaml:**
```yaml
current_industry: core
completed_industries: []
in_progress: core
pending:
  - tech
  - finance
questions_inspected: 50
questions_passed: 48
questions_revised: 2
last_updated: 2026-03-28T12:00:00Z
```

### Database Schema Compliance

Questions must match PostgreSQL schema:
```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY,
  external_id VARCHAR(100) UNIQUE,
  pillar CHAR(1),
  difficulty INT,
  question_type VARCHAR(20),
  question_text TEXT,
  options JSONB,
  correct_answer JSONB,
  explanation TEXT,
  tags JSONB,
  content_tier VARCHAR(20),
  source VARCHAR(20)
);
```

### Duplicate Detection

QA agent checks against cached core questions:
- Fetch from database on init
- Compare question_text similarity (>80% = duplicate)
- Check external_id uniqueness

---

## Installation & Usage

```bash
# Install plugin
claude-code plugin install promptranks/prk-question-flow

# Initialize
prk-question-init --industry=core,tech,finance
prk-question-init --role

# Preview
prk-question-plan

# Generate
prk-question-create 10

# QA
prk-question-qa

# Revise if needed
prk-question-revise

# Validate & Export
prk-question-validate
prk-question-export

# Submit
prk-question-submit
```

---

## Success Criteria

- ✅ Stateful execution (pause/resume)
- ✅ High-quality questions (score ≥ 7.0)
- ✅ Industry/role specific
- ✅ No duplicates
- ✅ DB-ready export
- ✅ Community contribution ready

---

**End of Specification**

