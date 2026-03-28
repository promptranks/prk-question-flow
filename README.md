# PRK Question Flow - Agent Specification

**Version:** 1.0.0
**Date:** 2026-03-28
**Type:** Sprint Workflow Plugin
**Repository:** promptranks/prk-question-flow (private → public)

---

## Overview

Automated question generation workflow for PromptRanks using sprint-flow agents. Generates industry-specific and role-specific questions with built-in validation.

**Purpose:**
- Generate 10+ questions per industry/role
- Validate quality automatically
- Enable team collaboration via GitHub
- Support community contributions via PR

**Architecture:**
```
Main Sprint Executor
├── Iteration 1: Industry Questions
│   ├── industry-qa-agent (generates questions)
│   └── qa-validation-agent (validates questions)
│
└── Iteration 2: Role Questions
    ├── role-qa-agent (generates questions)
    └── qa-role-validation-agent (validates questions)
```

---

## Agent Specifications

### 1. industry-qa-agent

**Purpose:** Generate industry-specific questions for a given pillar and difficulty

**Input Parameters:**
```yaml
industry_name: "Finance & Banking"
industry_slug: "finance"
industry_id: "a0000001-0000-0000-0000-000000000002"
pillar: "P"  # P, E, C, M, A
difficulty: 1  # 1, 2, 3
question_count: 2
output_file: "output/finance-P-D1.yaml"
```

**Context Provided:**
- Industry description and common workflows
- Pillar definition (from PECAM framework)
- Difficulty level guidelines
- Example questions from core set
- Industry-specific terminology

**Output Format:**
```yaml
# output/finance-P-D1.yaml
industry: Finance & Banking
industry_slug: finance
industry_id: a0000001-0000-0000-0000-000000000002
pillar: P
difficulty: 1
questions:
  - id: finance-P-D1-001
    question_text: |
      You're building a prompt to analyze quarterly earnings reports...
    options:
      - "Analyze this earnings report"
      - "Extract revenue, profit, and EPS from Q3 2024 earnings. Format as JSON."
      - "Tell me about the financial performance"
      - "What are the numbers?"
    correct_answer: 1
    explanation: |
      Option B is most effective because...
    tags:
      - financial-analysis
      - structured-output

  - id: finance-P-D1-002
    question_text: |
      ...
```

**Success Criteria:**
- Generates exactly `question_count` questions
- All questions are industry-specific (use industry terminology)
- Questions match pillar and difficulty level
- Valid YAML output
- No duplicates with existing questions

---

### 2. qa-validation-agent

**Purpose:** Validate industry questions for quality, accuracy, and compliance

**Input Parameters:**
```yaml
input_file: "output/finance-P-D1.yaml"
validation_report: "output/finance-P-D1-validation.json"
core_questions_db: "data/core_questions.yaml"
```

**Validation Checks:**

1. **Format Validation**
   - Valid YAML structure
   - All required fields present
   - Correct data types

2. **Content Validation**
   - Question text is clear and unambiguous
   - 4 options provided
   - Only 1 correct answer
   - Explanation references correct answer
   - Industry-specific terminology used

3. **Pillar Alignment**
   - Question tests the specified pillar
   - Difficulty matches level (D1=basic, D2=intermediate, D3=advanced)

4. **Uniqueness**
   - No duplicates with core questions
   - No duplicates within batch

5. **Quality Metrics**
   - Clarity score (1-10)
   - Industry relevance score (1-10)
   - Difficulty calibration (correct level?)

**Output Format:**
```json
{
  "file": "output/finance-P-D1.yaml",
  "status": "pass",
  "score": 8.5,
  "checks": {
    "format": {"pass": true},
    "content": {"pass": true},
    "pillar_alignment": {"pass": true, "score": 9},
    "uniqueness": {"pass": true},
    "quality": {"clarity": 8, "relevance": 9, "difficulty": 8}
  },
  "issues": [],
  "suggestions": [
    "Consider adding more specific financial metrics in question 2"
  ],
  "approved": true
}
```

**Success Criteria:**
- All checks pass
- Quality score ≥ 7.0
- No critical issues
- Approved = true

---

### 3. role-qa-agent

**Purpose:** Generate role-specific questions for a given industry, pillar, and difficulty

**Input Parameters:**
```yaml
role_name: "Financial Analyst"
role_slug: "financial-analyst"
role_id: "b0000001-0000-0000-0000-000000000203"
industry_name: "Finance & Banking"
industry_id: "a0000001-0000-0000-0000-000000000002"
pillar: "E"
difficulty: 2
question_count: 2
output_file: "output/financial-analyst-E-D2.yaml"
```

**Context Provided:**
- Role description and responsibilities
- Industry context
- Pillar definition
- Difficulty guidelines
- Example role-specific scenarios

**Output Format:**
```yaml
# output/financial-analyst-E-D2.yaml
role: Financial Analyst
role_slug: financial-analyst
role_id: b0000001-0000-0000-0000-000000000203
industry: Finance & Banking
industry_id: a0000001-0000-0000-0000-000000000002
pillar: E
difficulty: 2
questions:
  - id: financial-analyst-E-D2-001
    question_text: |
      As a financial analyst, you've prompted an LLM to forecast Q4 revenue...
    options:
      - "Accept the forecast as-is"
      - "Check if the model considered seasonality and compare to historical Q4 data"
      - "Ask for a different forecast"
      - "Average it with last year's Q4"
    correct_answer: 1
    explanation: |
      Financial analysts must evaluate LLM outputs critically...
    tags:
      - evaluation
      - forecasting
      - financial-analysis
```

**Success Criteria:**
- Questions are role-specific (use role responsibilities)
- Questions are industry-contextualized
- Realistic scenarios for the role
- Valid YAML output

---

### 4. qa-role-validation-agent

**Purpose:** Validate role-specific questions

**Input Parameters:**
```yaml
input_file: "output/financial-analyst-E-D2.yaml"
validation_report: "output/financial-analyst-E-D2-validation.json"
industry_questions_db: "data/industry_questions.yaml"
```

**Validation Checks:**

1. **Format Validation** (same as qa-validation-agent)

2. **Role Specificity**
   - Question uses role-specific responsibilities
   - Scenario is realistic for the role
   - Terminology matches role context

3. **Industry Alignment**
   - Question fits within industry context
   - No conflicts with industry-specific questions

4. **Pillar & Difficulty** (same as qa-validation-agent)

5. **Quality Metrics**
   - Role relevance score (1-10)
   - Industry alignment score (1-10)
   - Scenario realism score (1-10)

**Output Format:** (same structure as qa-validation-agent)

**Success Criteria:**
- All checks pass
- Role relevance score ≥ 7.0
- Industry alignment score ≥ 7.0
- Approved = true

---

## Sprint Flow Structure

### Directory Structure
```
prk-question-flow/
├── README.md
├── agents/
│   ├── industry-qa-agent.md
│   ├── qa-validation-agent.md
│   ├── role-qa-agent.md
│   └── qa-role-validation-agent.md
├── data/
│   ├── industries.yaml
│   ├── roles.yaml
│   ├── pillars.yaml
│   └── core_questions.yaml
├── output/
│   └── .gitkeep
├── scripts/
│   ├── import_to_db.py
│   └── validate_all.py
└── sprints/
    ├── industry-questions-sprint.yaml
    └── role-questions-sprint.yaml
```

---

## Installation & Usage

### Install Plugin
```bash
# From GitHub (private repo)
claude-code plugin install promptranks/prk-question-flow

# Or local development
cd prk-question-flow
claude-code plugin install .
```

### Run Industry Questions Sprint
```bash
# Generate questions for Finance industry, Pillar P, Difficulty 1
claude-code sprint run industry-questions-sprint.yaml \
  --var industry=finance \
  --var pillar=P \
  --var difficulty=1
```

### Run Role Questions Sprint
```bash
# Generate questions for Financial Analyst role
claude-code sprint run role-questions-sprint.yaml \
  --var role=financial-analyst \
  --var pillar=E \
  --var difficulty=2
```

---

## Collaboration Workflow

### For Team Members

1. **Clone repo**
   ```bash
   git clone git@github.com:promptranks/prk-question-flow.git
   cd prk-question-flow
   ```

2. **Create branch**
   ```bash
   git checkout -b questions/healthcare-pillar-C
   ```

3. **Run sprint**
   ```bash
   claude-code sprint run industry-questions-sprint.yaml \
     --var industry=healthcare \
     --var pillar=C \
     --var difficulty=1
   ```

4. **Review output**
   ```bash
   cat output/healthcare-C-D1.yaml
   cat output/healthcare-C-D1-validation.json
   ```

5. **Commit & push**
   ```bash
   git add output/
   git commit -m "Add healthcare Pillar C difficulty 1 questions"
   git push origin questions/healthcare-pillar-C
   ```

6. **Create PR**
   - GitHub will run validation CI
   - Team reviews questions
   - Merge to main

### For Community Contributors (Open Source)

Same workflow, but:
- Fork the repo
- Create PR from fork
- Maintainers review and merge

---

## Next Steps

1. Create agent definition files
2. Create sprint YAML files
3. Set up GitHub repo structure
4. Add CI/CD for validation
5. Write contribution guidelines

Should I proceed with creating the agent definition files?
