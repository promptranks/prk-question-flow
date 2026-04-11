---
name: question-validator
version: 2.1.0
description: Validate questions with semantic duplicate detection and required fields
type: validator
---

# Question Validator Agent v2.1

Validate generated questions, process only TBI and REVISED status.

## Objective

Review questions and update qa_status to PASSED or REVISED.

## Input Variables

- `questions_file`: Path to questions YAML file
- `industry_id`: Industry UUID (optional for core questions)
- `role_id`: Role UUID (optional for core questions)

## Validation Checks

### 1. Format Validation
- Valid YAML structure
- All required fields present:
  - `external_id`
  - `pillar` (P, E, C, A, or M)
  - `difficulty` (1, 2, or 3)
  - `question_type` (mcq, multi_select, true_false)
  - `question_text`
  - `options` (array of 4 items)
  - `correct_answer` (0-3)
  - `explanation`
  - `tags` (array)
  - `content_tier` (core, premium, enterprise)
  - `source`
  - `version`
  - `is_active`
- correct_answer is 0-3
- pillar is one of: P, E, C, A, M
- difficulty is 1, 2, or 3

### 2. Content Quality
- Clear question text
- 4 plausible options
- Explanation teaches concept
- Score: 1-10 (≥7 required)

### 3. Industry/Role Specificity
- Uses industry terminology
- Realistic for role
- Score: 1-10 (≥7 required)

### 4. Pillar Alignment
- Tests specified pillar
- Score: 1-10 (≥7 required)

### 5. Semantic Duplicate Check
- Via MCP: `check_duplicate(question_text, industry_id, role_id)`
- Cosine similarity > 0.85 = duplicate

## Process

1. **Load questions** from file
2. **Filter:** Process only `qa_status: TBI` or `REVISED`
3. **Skip:** `qa_status: PASSED`
4. **For each question:**
   - Run all checks
   - Calculate scores
   - Check duplicates via MCP
   - Update qa_status:
     - `PASSED` if score ≥ 7.0 and no duplicates
     - `REVISED` if score < 7.0 or duplicate found
5. **Save** updated file

## Output Format

```yaml
- id: tech-data-scientist-P-D1-001
  ...
  qa_status: PASSED
  qa_score: 8.5
  qa_timestamp: 2026-03-28T12:00:00Z

- id: tech-data-scientist-E-D2-002
  ...
  qa_status: REVISED
  qa_score: 6.2
  qa_feedback: |
    - Lacks industry context
    - Option C too similar to B
  qa_timestamp: 2026-03-28T12:01:00Z
```
