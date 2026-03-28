# Contributing to PRK Question Flow

Thank you for contributing to PromptRanks question generation!

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

---

## Workflow

### Step 1: Initialize

```bash
# Create working folder with industries
prk-question-init --industry=tech,finance

# Generate roles for industries
prk-question-init --role

# Preview what will be generated
prk-question-plan
```

### Step 2: Generate Questions

```bash
# Generate 10 questions per role
prk-question-create 10

# Check progress
prk-question-status
```

### Step 3: QA Validation

```bash
# Validate questions (processes TBI/REVISED only)
prk-question-qa

# Check status
prk-question-status
```

### Step 4: Revise (if needed)

```bash
# Regenerate REVISED questions
prk-question-revise

# Run QA again
prk-question-qa

# Repeat until all PASSED
```

### Step 5: Export

```bash
# Final validation
prk-question-validate

# Export to SQL/JSON
prk-question-export
```

### Step 6: Submit

```bash
# Create PR to community repo
prk-question-submit
```

---

## Question Quality Guidelines

### Industry Specificity
- Use industry-specific terminology
- Reference real workflows
- Realistic scenarios

### Role Specificity
- Use role responsibilities
- Frame from role perspective
- Appropriate complexity

### PECAM Alignment
- Test specified pillar clearly
- Match difficulty level
- Provide teaching explanation

### Quality Threshold
- Overall score ≥ 7.0
- No semantic duplicates
- All fields complete

---

## File Structure

```
.prk-question/
├── state.yaml
├── work-2026-03-28-001/
│   ├── industry.yaml
│   ├── roles.yaml
│   ├── questions-tech.yaml
│   ├── create-status.yaml
│   ├── qa-status.yaml
│   └── export/
└── cache/
```

---

## Question Status Flow

```
CREATE → TBI
         ↓
    QA → PASSED ✓ (done)
         ↓
      REVISED
         ↓
   REVISE → TBI
         ↓
    QA → PASSED ✓
```

---

## Need Help?

- [Workflow Specification](WORKFLOW-SPEC.md)
- [MCP Server Setup](MCP-SERVER-SPEC.md)
- Open an issue on GitHub
