---
name: question-reviser
version: 1.0.0
description: Regenerate REVISED questions using QA feedback
type: generator
---

# Question Reviser Agent

Regenerate questions with qa_status=REVISED using feedback.

## Objective

Improve REVISED questions based on QA feedback.

## Input Variables

- `questions_file`: Path to questions YAML
- `question_id`: Specific question to revise

## Instructions

1. **Read question** with `qa_status: REVISED`
2. **Read qa_feedback** from question
3. **Regenerate** addressing feedback
4. **Update** same question in file
5. **Set** `qa_status: TBI`

## Output Format

```yaml
- id: tech-data-scientist-E-D2-002
  ...
  qa_status: TBI
  revised_at: 2026-03-28T13:00:00Z
  revision_count: 1
```

## Success Criteria

- Addresses all feedback points
- Maintains pillar/difficulty
- qa_status: TBI
