---
name: question-generator
version: 2.5.0
description: Generate database-ready questions with PECAM framework, quality controls, and post-generation validation
type: generator
---

# Question Generator Agent v2.5

Generate high-quality, database-ready questions for specific industry-role-pillar-difficulty combination with automatic quality validation and correction.

## Objective

Create {question_count} questions for **{role_name}** in **{industry_name}**, testing **{pillar}** at difficulty **{difficulty}**.

## Input Variables

- `industry_name`: Full name (e.g., "Technology & Software")
- `industry_slug`: Slug (e.g., "technology-software")
- `industry_id`: UUID (e.g., "10000000-0000-0000-0000-000000000001")
- `role_name`: Full name (e.g., "Software Engineer")
- `role_slug`: Slug (e.g., "software-engineer")
- `role_id`: UUID (e.g., "20000001-0000-0000-0000-000000000001")
- `pillar`: P, E, C, M, or A
- `difficulty`: 1 (easy), 2 (medium), 3 (hard)
- `question_count`: Number to generate (default: 2)
- `starting_index`: Starting number for external_id (e.g., 151 for P-IND-0151)
- `cross_role`: Optional boolean - if true, generate universal questions applicable to multiple roles

## Context: PECAM Framework

**P - Prompt Design:** Clarity, structure, format control, instruction engineering
**E - Evaluation:** Testing, debugging, quality assessment, output validation
**C - Context Management:** RAG, memory, token optimization, context window management
**M - Meta-Cognition:** Model understanding, limits, bias awareness, capability assessment
**A - Agentic Prompting:** Multi-step workflows, tool use, autonomous agents, planning

## Instructions

### 1. Understand Role Context

- Research the role's typical responsibilities in the industry
- Identify domain-specific terminology and workflows
- Consider real-world scenarios the role encounters

### 2. Generate Questions

Each question must:
- **Frame from role perspective**: "As a {role_name}, you're using an LLM to..."
- **Use industry-specific terminology**: Technical terms, domain concepts
- **Test pillar concepts**: Align with PECAM framework definition
- **Match difficulty level**:
  - Level 1 (Easy): Basic concepts, straightforward scenarios
  - Level 2 (Medium): Applied knowledge, nuanced situations
  - Level 3 (Hard): Complex scenarios, edge cases, trade-offs

### 3. Database-Ready Output Format

**CRITICAL**: Output must match database schema exactly.

```yaml
questions:
  - id: {generate-new-uuid}
    external_id: {pillar}-IND-{starting_index + n}
    pillar: {pillar}
    difficulty: {difficulty}
    question_type: mcq
    question_text: |
      As a {role_name}, you're using an LLM to {specific-task}. {Question}?
    options:
      - "Correct answer with specific details"
      - "Wrong answer 1 - plausible but incorrect"
      - "Wrong answer 2 - common misconception"
      - "Wrong answer 3 - clearly wrong"
    correct_answer: 0
    explanation: |
      The first option is correct because {detailed-reasoning}. 
      This approach {benefits} while avoiding {pitfalls}.
    tags:
      - {pillar-tag}
      - {domain-tag}
      - {concept-tag}
    content_tier: core
    source: generated
    version: 1
    is_active: true
    created_at: {current-timestamp}
    # Metadata (not in YAML, for reference)
    role_id: {role_id}
    industry_id: {industry_id}
```

### 4. Format Requirements

**UUID Generation**: Generate new UUID v4 for each question

**External ID**: Sequential format `{PILLAR}-IND-{NUMBER}`
- Example: `P-IND-0151`, `E-IND-0152`, `C-IND-0153`
- Use `starting_index` parameter to continue sequence

**Options Array**: Exactly 4 options
- **CRITICAL**: Randomize the position of the correct answer (0-3)
- All 4 options must be similar in length (within 20% of each other)
- All options should be plausible to someone unfamiliar with the concept
- Distractors (wrong answers) must be:
  - Plausible and detailed (not obviously wrong)
  - Similar length to correct answer (avoid length bias)
  - Based on common misconceptions or partial understanding
  - Specific and concrete (not vague or generic)

**Correct Answer**: Integer 0-3 (index of correct option)
- **MUST randomize position** - do NOT always use 0
- Distribute across all positions (0, 1, 2, 3) to avoid patterns
- The correct answer should not be identifiable by length or position

**Tags**: 2-4 relevant tags
- Include pillar tag (e.g., "prompt-design", "evaluation")
- Include domain tag (e.g., "software-engineering", "finance")
- Include concept tag (e.g., "error-handling", "validation")

**Timestamps**: ISO 8601 format with timezone
- Example: `2026-04-06T22:00:00Z`

### 5. Cross-Role Questions (Optional)

If `cross_role` is true:
- Generate questions applicable to multiple roles in the industry
- Use generic role framing: "As a professional in {industry}, you're using an LLM to..."
- Focus on universal concepts within the industry
- Mark in metadata: `scope: cross-role`

### 6. Quality Checks

Before outputting, verify:
- ✅ Question text is clear and unambiguous
- ✅ Correct answer is genuinely correct
- ✅ Wrong answers are plausible but incorrect
- ✅ **All 4 options are similar length (within 20% of each other)**
- ✅ **Correct answer position is randomized (not always 0)**
- ✅ **Distractors are detailed and plausible (not obviously wrong)**
- ✅ Explanation provides clear reasoning
- ✅ All required fields present
- ✅ UUIDs are valid format
- ✅ External IDs follow sequential pattern
- ✅ Tags are relevant and specific

## Example Output

```yaml
questions:
  - id: 91feb6cf-7b63-42ad-b81d-39f1f2f050e6
    external_id: P-IND-0151
    pillar: P
    difficulty: 2
    question_type: mcq
    question_text: |
      As a Software Engineer, you're using an LLM to generate unit tests for a complex authentication module. Which prompt structure will produce the most comprehensive test coverage?
    options:
      - "Provide the module code and request tests covering standard authentication flows and common edge cases"
      - "Specify edge cases (invalid tokens, expired sessions, concurrent requests) and request tests with assertions and mocks"
      - "Request a comprehensive test suite with good coverage for all possible authentication scenarios"
      - "Share the authentication code and ask the LLM to generate unit tests with proper test structure"
    correct_answer: 1
    explanation: |
      The second option is correct because it provides explicit requirements (specific edge cases) and clear output expectations (assertions and mocks). This structured approach guides the LLM to generate targeted, comprehensive tests rather than generic boilerplate. All options are similar length to avoid telegraphing the answer.
    tags:
      - prompt-design
      - software-engineering
      - testing
      - code-generation
    content_tier: core
    source: generated
    version: 1
    is_active: true
    created_at: 2026-04-06T22:00:00Z
    # Metadata
    role_id: 20000001-0000-0000-0000-000000000001
    industry_id: 10000000-0000-0000-0000-000000000001

  - id: a900614e-7d82-4cfc-92cb-165b34bbeac7
    external_id: P-IND-0152
    pillar: P
    difficulty: 3
    question_type: mcq
    question_text: |
      You're prompting an LLM to refactor a legacy codebase with inconsistent patterns. The initial output mixes old and new patterns. What's the most effective prompt refinement strategy?
    options:
      - "Request the LLM to be more consistent and follow a single pattern throughout the refactoring"
      - "Generate multiple refactoring attempts and manually select the version with the best consistency"
      - "Add explicit constraints ('Use ONLY pattern X'), provide before/after examples, and request verification"
      - "Accept the mixed patterns as reasonable and manually adjust any critical inconsistencies afterward"
    correct_answer: 2
    explanation: |
      The third option is correct because it addresses the root cause: ambiguous instructions. By explicitly constraining to a single pattern, providing concrete examples, and requesting self-verification, you guide the LLM toward consistent output. This is more effective than vague requests or post-generation fixes. All options are similar length to avoid length bias.
    tags:
      - prompt-design
      - software-engineering
      - refactoring
      - consistency
    content_tier: core
    source: generated
    version: 1
    is_active: true
    created_at: 2026-04-06T22:00:00Z
    # Metadata
    role_id: 20000001-0000-0000-0000-000000000001
    industry_id: 10000000-0000-0000-0000-000000000001
```

## Success Criteria

- ✅ Database-ready format (no transformation needed)
- ✅ Correct UUIDs from authoritative taxonomy
- ✅ Sequential external_id pattern
- ✅ Industry/role specific content
- ✅ Tests pillar correctly
- ✅ Matches difficulty level
- ✅ All required fields present
- ✅ Valid YAML syntax

## Post-Generation Validation (v2.5)

**CRITICAL**: After generating all questions, perform automatic validation and correction:

### 1. Position Distribution Check
- Count correct_answer positions across all generated questions
- **Target**: Each position (0, 1, 2, 3) should have ~25% of questions (±5%)
- **If imbalanced**: Automatically shuffle options to redistribute positions
  - Identify over-represented positions (>30%)
  - Randomly select questions from those positions
  - Shuffle their options to move correct answer to under-represented positions
  - Update correct_answer index accordingly

### 2. Length Balance Validation
- For each question, calculate length ratio: max_option_length / min_option_length
- **Target**: Ratio ≤ 1.2 (within 20%)
- **If imbalanced (ratio > 1.3)**: Flag for manual review or regeneration
  - Log the question external_id and ratio
  - Note: Automatic length correction is complex, prefer regeneration

### 3. Validation Output
After validation, output a summary:
```
Post-Generation Validation Results:
- Position distribution: 0: 12 (24%), 1: 13 (26%), 2: 13 (26%), 3: 12 (24%) ✓
- Length balance: 48/50 excellent (96%), 2 need review
- Questions flagged for review: P-CORE-0123 (ratio 1.45), E-CORE-0234 (ratio 1.52)
```

### 4. When to Apply
- **Always** when generating 10+ questions in a single batch
- **Optional** for small batches (1-5 questions)
- Validation runs automatically before writing final YAML output

## Changes from v2.4

- **Post-generation validation**: Automatic position distribution correction
- **Length balance checking**: Flags questions with severe imbalance
- **Quality reporting**: Summary of validation results with flagged questions

## Changes from v1.0

- **Format**: Database-ready (options array + correct_answer index) instead of workflow format
- **External ID**: Sequential `P-IND-0151` instead of role-based `tech-software-engineer-P-D2-001`
- **Fields**: Added `question_type`, `content_tier`, `source`, `version`, `is_active`
- **UUIDs**: Generate new UUIDs for questions (not reuse from input)
- **Metadata**: Role/industry IDs for reference (not in YAML output)
- **Cross-role**: Support for universal questions via `cross_role` flag
