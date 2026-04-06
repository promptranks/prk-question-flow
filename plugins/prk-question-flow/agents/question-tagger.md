---
name: question-tagger
version: 2.0.0
description: Semantic analysis and tagging of existing questions for multi-industry/role applicability
type: analyzer
---

# Question Tagger Agent v2.0

Analyze existing questions and suggest industry/role tags based on semantic similarity and domain relevance.

## Objective

Automatically tag existing questions with additional industries/roles where they are applicable, generating a reviewable YAML file and SQL import script.

## Input Variables

- `source`: Where to query questions from
  - `industry_id`: Tag questions from specific industry
  - `role_id`: Tag questions from specific role
  - `question_ids`: Specific question IDs to tag
  - `untagged`: Tag questions with no industry/role links
  - `all_core`: Tag all core (neutral) questions
- `min_score`: Minimum applicability score (0-100, default: 75)
- `auto_approve`: Skip review, auto-approve all suggestions >= min_score

## MCP Tools Available

- `list_industries` - Get all industries for tagging suggestions
- `list_roles` - Get all roles for tagging suggestions

## Workflow

### Step 1: Query Questions

Based on `source` parameter, retrieve questions to analyze:

```sql
-- Example: Questions from Technology & Software industry
SELECT q.id, q.external_id, q.question_text, q.options, q.explanation, q.tags
FROM questions q
JOIN question_industries qi ON q.id = qi.question_id
WHERE qi.industry_id = '10000000-0000-0000-0000-000000000001'
LIMIT 50;
```

### Step 2: Query Current Tags

For each question, get existing industry/role tags:

```sql
-- Current role tags
SELECT r.id, r.name, r.slug
FROM roles r
JOIN question_roles qr ON r.id = qr.role_id
WHERE qr.question_id = '{question_id}';

-- Current industry tags
SELECT i.id, i.name, i.slug
FROM industries i
JOIN question_industries qi ON i.id = qi.industry_id
WHERE qi.question_id = '{question_id}';
```

### Step 3: Semantic Analysis

For each question, analyze applicability to other roles/industries:

**Analysis Criteria:**

1. **Terminology Match**: Does the question use domain-specific terms?
2. **Scenario Relevance**: Is the scenario common in the role/industry?
3. **Skill Transferability**: Are the tested skills applicable?
4. **Abstraction Level**: Is the question generic enough to apply broadly?

**Scoring (0-100)**:
- **90-100**: Highly applicable, core concept for this role
- **75-89**: Applicable, relevant scenario
- **60-74**: Somewhat applicable, transferable skills
- **0-59**: Not applicable, too specific to original role

**Example Analysis**:

```
Question: "As a Software Engineer, how do you structure a prompt for code generation?"

Current tags:
- Role: Software Engineer
- Industry: Technology & Software

Analysis for other roles:
- DevOps Engineer (score: 95)
  Reason: DevOps engineers frequently use LLMs for infrastructure-as-code generation
  
- ML Engineer (score: 90)
  Reason: ML engineers use code generation for data pipelines and model training scripts
  
- Data Scientist (score: 85)
  Reason: Data scientists use code generation for analysis scripts and visualizations
  
- Financial Analyst (score: 40)
  Reason: Code generation is not a core skill for financial analysts
```

### Step 4: Generate Tagging YAML

Output file: `.prk-question/work-YYYY-MM-DD-NNN/tagging/question-tags-TIMESTAMP.yaml`

```yaml
# Question Tagging Suggestions
# Generated: 2026-04-06T22:30:00Z
# Source: Semantic analysis
# Min score: 75
# Total questions analyzed: 10
# Total new tag suggestions: 25

tagging_batch:
  id: tag-batch-001
  created_at: 2026-04-06T22:30:00Z
  source: industry_id=10000000-0000-0000-0000-000000000001
  min_score: 75
  total_questions: 10
  total_suggestions: 25
  approved_count: 0
  rejected_count: 0

questions:
  - question_id: 91feb6cf-7b63-42ad-b81d-39f1f2f050e6
    external_id: P-IND-0001
    question_text: "As a Software Engineer, how do you structure a prompt for code generation?"
    
    current_tags:
      roles:
        - id: 20000001-0000-0000-0000-000000000001
          name: Software Engineer
          slug: software-engineer
      industries:
        - id: 10000000-0000-0000-0000-000000000001
          name: Technology & Software
          slug: technology-software
    
    suggested_new_tags:
      roles:
        - id: 20000001-0000-0000-0000-000000000002
          name: DevOps Engineer / SRE
          slug: devops-sre
          score: 95
          reason: "DevOps engineers frequently use LLMs for infrastructure-as-code generation, CI/CD script creation, and automation tasks"
          approved: null  # User will review
        
        - id: 20000001-0000-0000-0000-000000000004
          name: ML Engineer
          slug: ml-engineer
          score: 90
          reason: "ML engineers use code generation for data pipelines, model training scripts, and ML infrastructure code"
          approved: null
        
        - id: 20000001-0000-0000-0000-000000000003
          name: Data Scientist
          slug: data-scientist
          score: 85
          reason: "Data scientists use code generation for analysis scripts, data visualizations, and statistical modeling code"
          approved: null
      
      industries: []  # No cross-industry suggestions for this question

  - question_id: a900614e-7d82-4cfc-92cb-165b34bbeac7
    external_id: P-IND-0002
    question_text: "You're prompting an LLM to refactor legacy code..."
    # ... similar structure
```

### Step 5: Interactive Review

**Command**: `prk-question-tag-review`

Display each question with suggestions:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Question P-IND-0001 (1 of 10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"As a Software Engineer, how do you structure a prompt for code generation?"

Current tags:
  • Software Engineer (Technology & Software)

Suggested new tags:

  1. ✓ DevOps Engineer / SRE (score: 95)
     → DevOps engineers frequently use LLMs for infrastructure-as-code generation
     Status: PENDING

  2. ✓ ML Engineer (score: 90)
     → ML engineers use code generation for data pipelines and model training
     Status: PENDING

  3. ✓ Data Scientist (score: 85)
     → Data scientists use code generation for analysis scripts
     Status: PENDING

Actions:
  [A]pprove all  [R]eject all  [1-3] Toggle individual  [N]ext  [Q]uit
  
> 
```

**User actions**:
- `A` - Approve all suggestions for this question
- `R` - Reject all suggestions for this question
- `1`, `2`, `3` - Toggle individual suggestions
- `N` - Next question
- `Q` - Quit and save progress

### Step 6: Bulk Approval

**Command**: `prk-question-tag-approve --min-score=85`

Auto-approve all suggestions with score >= 85:

```yaml
# Updated approved status
suggested_new_tags:
  roles:
    - id: 20000001-0000-0000-0000-000000000002
      name: DevOps Engineer / SRE
      score: 95
      approved: true  # Auto-approved (score >= 85)
    
    - id: 20000001-0000-0000-0000-000000000004
      name: ML Engineer
      score: 90
      approved: true  # Auto-approved (score >= 85)
    
    - id: 20000001-0000-0000-0000-000000000003
      name: Data Scientist
      score: 85
      approved: true  # Auto-approved (score >= 85)
```

### Step 7: Generate SQL Import Script

**Command**: `prk-question-tag-export`

Output file: `.prk-question/work-YYYY-MM-DD-NNN/tagging/question-tags-import.sql`

```sql
-- Question Tagging Import Script
-- Generated: 2026-04-06T22:45:00Z
-- Batch: tag-batch-001
-- Questions: 10
-- New role tags: 20 (approved)
-- New industry tags: 5 (approved)
-- Rejected: 8

BEGIN;

-- ============================================================================
-- QUESTION: P-IND-0001 (91feb6cf-7b63-42ad-b81d-39f1f2f050e6)
-- ============================================================================

-- Add approved role tags
INSERT INTO question_roles (question_id, role_id) VALUES
    ('91feb6cf-7b63-42ad-b81d-39f1f2f050e6', '20000001-0000-0000-0000-000000000002'),  -- DevOps Engineer / SRE
    ('91feb6cf-7b63-42ad-b81d-39f1f2f050e6', '20000001-0000-0000-0000-000000000004'),  -- ML Engineer
    ('91feb6cf-7b63-42ad-b81d-39f1f2f050e6', '20000001-0000-0000-0000-000000000003')   -- Data Scientist
ON CONFLICT (question_id, role_id) DO NOTHING;

-- ============================================================================
-- QUESTION: P-IND-0002 (a900614e-7d82-4cfc-92cb-165b34bbeac7)
-- ============================================================================

INSERT INTO question_roles (question_id, role_id) VALUES
    ('a900614e-7d82-4cfc-92cb-165b34bbeac7', '20000001-0000-0000-0000-000000000002')   -- DevOps Engineer / SRE
ON CONFLICT (question_id, role_id) DO NOTHING;

-- ... (more questions)

COMMIT;

-- ============================================================================
-- ROLLBACK SCRIPT (save separately)
-- ============================================================================
-- To undo this tagging batch, run:
-- 
-- BEGIN;
-- DELETE FROM question_roles WHERE (question_id, role_id) IN (
--     ('91feb6cf-7b63-42ad-b81d-39f1f2f050e6', '20000001-0000-0000-0000-000000000002'),
--     ('91feb6cf-7b63-42ad-b81d-39f1f2f050e6', '20000001-0000-0000-0000-000000000004'),
--     ...
-- );
-- COMMIT;
```

### Step 8: Import to Database

**Command**: `prk-question-tag-import`

```bash
# Preview SQL
cat .prk-question/work-YYYY-MM-DD-NNN/tagging/question-tags-import.sql

# Import to database
docker exec -i saas-webapp-postgres psql -U promptranks -d promptranks \
  < .prk-question/work-YYYY-MM-DD-NNN/tagging/question-tags-import.sql

# Verify
docker exec saas-webapp-postgres psql -U promptranks -d promptranks \
  -c "SELECT COUNT(*) FROM question_roles WHERE question_id = '91feb6cf-7b63-42ad-b81d-39f1f2f050e6';"
```

## Advanced Features

### Dry Run Mode

```bash
prk-question-tag --industry=technology-software --dry-run
```

Shows suggestions without saving YAML file.

### Filter by Pillar

```bash
prk-question-tag --pillar=P --min-score=80
```

Only tag questions from specific pillar.

### Cross-Industry Tagging

```bash
prk-question-tag --cross-industry --min-score=85
```

Suggest industry tags (not just role tags).

### Batch Processing

```bash
# Tag all 131 core questions
prk-question-tag --all-core --min-score=75 --auto-approve
```

## Success Criteria

- ✅ Semantic analysis produces relevant suggestions
- ✅ Scoring is accurate and consistent
- ✅ YAML output is reviewable and editable
- ✅ SQL script is safe (ON CONFLICT DO NOTHING)
- ✅ Rollback script generated
- ✅ Import is idempotent (can run multiple times)

## Changes from v1.0

This is a new agent in v2.0 - no previous version exists.
