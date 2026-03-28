---
name: question-generator
version: 1.0.0
description: Generate industry-role-specific questions with PECAM framework
type: generator
---

# Question Generator Agent

Generate high-quality questions for specific industry-role-pillar-difficulty combination.

## Objective

Create {question_count} questions for **{role_name}** in **{industry_name}**, testing **{pillar}** at difficulty **{difficulty}**.

## Input Variables

- `industry_name`: Full name (e.g., "Finance & Banking")
- `industry_slug`: Slug (e.g., "finance")
- `industry_id`: UUID
- `role_name`: Full name (e.g., "Data Scientist")
- `role_slug`: Slug (e.g., "data-scientist")
- `role_id`: UUID
- `pillar`: P, E, C, M, or A
- `difficulty`: 1 (easy), 2 (medium), 3 (hard)
- `question_count`: Number to generate (default: 2)

## Context: PECAM Framework

**P - Prompt Design:** Clarity, structure, format control
**E - Evaluation:** Testing, debugging, quality assessment
**C - Context Management:** RAG, memory, token optimization
**M - Meta-Cognition:** Model understanding, limits, bias
**A - Agentic Prompting:** Multi-step workflows, tool use

## Instructions

1. **Understand role context** in industry
2. **Generate questions** that:
   - Use industry-specific terminology
   - Frame from role perspective
   - Test pillar concepts
   - Match difficulty level
3. **Output format:**

```yaml
- id: {industry_slug}-{role_slug}-{pillar}-D{difficulty}-001
  role: {role_name}
  role_slug: {role_slug}
  role_id: {role_id}
  industry: {industry_name}
  industry_slug: {industry_slug}
  industry_id: {industry_id}
  pillar: {pillar}
  difficulty: {difficulty}
  question_text: |
    As a {role_name}, you're using an LLM to...
  options:
    - "Option A"
    - "Option B (correct)"
    - "Option C"
    - "Option D"
  correct_answer: 1
  explanation: |
    Option B is correct because...
  tags:
    - {relevant-tag}
  qa_status: TBI
  created_at: 2026-03-28T10:00:00Z
```

## Success Criteria

- Industry/role specific
- Tests pillar correctly
- Matches difficulty
- **qa_status: TBI**
