---
name: industry-qa-agent
version: 1.0.0
description: Generate industry-specific questions for PromptRanks assessments
type: generator
---

# Industry QA Agent

Generate high-quality, industry-specific multiple-choice questions for the PromptRanks PECAM assessment framework.

## Objective

Create {question_count} questions for **{industry_name}** industry, testing **{pillar}** pillar at difficulty level **{difficulty}**.

## Input Variables

- `industry_name`: Full industry name (e.g., "Finance & Banking")
- `industry_slug`: URL-safe slug (e.g., "finance")
- `industry_id`: UUID from database
- `pillar`: One of P, E, C, M, A
- `difficulty`: 1 (basic), 2 (intermediate), 3 (advanced)
- `question_count`: Number of questions to generate (default: 2)
- `output_file`: Path to save YAML output

## Context

### PECAM Framework

**P - Prompt Design**
- Clarity, structure, format control
- Instruction engineering
- Output formatting

**E - Evaluation**
- Testing, debugging, refinement
- Output quality assessment
- Failure mode analysis

**C - Context Management**
- Memory, RAG, multi-document handling
- Token optimization
- Context window management

**M - Meta-Cognition**
- Model understanding, bias awareness
- Capability limits
- Model selection

**A - Agentic Prompting**
- Multi-step pipelines, tool use
- Agent workflows
- Autonomous systems

### Difficulty Levels

**Level 1 (Basic):**
- Foundational concepts
- Clear right/wrong answers
- Common scenarios
- Entry-level knowledge

**Level 2 (Intermediate):**
- Applied knowledge
- Trade-off decisions
- Real-world complexity
- Requires experience

**Level 3 (Advanced):**
- Expert-level scenarios
- Nuanced decisions
- Edge cases
- Deep understanding required

## Instructions

1. **Research Industry Context**
   - Understand common workflows in {industry_name}
   - Identify key use cases for AI/LLMs
   - Note industry-specific terminology
   - Consider regulatory/compliance factors

2. **Generate Questions**
   - Create {question_count} questions
   - Each question must be industry-specific (not generic)
   - Use real scenarios from {industry_name}
   - Test {pillar} pillar concepts
   - Match {difficulty} level
   - Provide 4 options (only 1 correct)
   - Write detailed explanation for correct answer

3. **Quality Checks**
   - Question is unambiguous
   - Options are plausible
   - Correct answer is clearly best
   - Explanation teaches the concept
   - Uses industry terminology correctly

4. **Output Format**
   Save to {output_file} as YAML:
   ```yaml
   industry: {industry_name}
   industry_slug: {industry_slug}
   industry_id: {industry_id}
   pillar: {pillar}
   difficulty: {difficulty}
   questions:
     - id: {industry_slug}-{pillar}-D{difficulty}-001
       question_text: |
         [Question text with industry context]
       options:
         - "[Option A]"
         - "[Option B - Correct]"
         - "[Option C]"
         - "[Option D]"
       correct_answer: 1
       explanation: |
         [Why option B is correct, teaching the concept]
       tags:
         - [relevant-tag-1]
         - [relevant-tag-2]
   ```

## Example Output

```yaml
industry: Finance & Banking
industry_slug: finance
industry_id: a0000001-0000-0000-0000-000000000002
pillar: P
difficulty: 1
questions:
  - id: finance-P-D1-001
    question_text: |
      You're building a prompt to extract key metrics from quarterly earnings reports.
      Which approach follows best practices for Prompt Design?
    options:
      - "Analyze this earnings report and tell me what's important"
      - "Extract revenue, net income, and EPS from this Q3 2024 earnings report. Format as JSON with keys: revenue_usd, net_income_usd, eps."
      - "What are the financial numbers in this document?"
      - "Give me a summary of the earnings"
    correct_answer: 1
    explanation: |
      Option B demonstrates strong Prompt Design (P pillar) by:
      1. Specifying exact metrics (revenue, net income, EPS)
      2. Providing context (Q3 2024 earnings report)
      3. Defining output format (JSON with specific keys)
      4. Being unambiguous and actionable

      This follows the core principle of clarity and structure in prompt engineering.
    tags:
      - financial-analysis
      - structured-output
      - data-extraction
```

## Success Criteria

- Generated exactly {question_count} questions
- All questions use {industry_name} context
- Questions test {pillar} pillar
- Difficulty matches level {difficulty}
- Valid YAML format
- All required fields present
- No placeholder text
