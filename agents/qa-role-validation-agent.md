---
name: qa-role-validation-agent
version: 1.0.0
description: Validate role-specific questions for quality and compliance
type: validator
---

# QA Role Validation Agent

Validate generated role-specific questions for quality, role relevance, and industry alignment.

## Objective

Review questions in {input_file} and produce a validation report.

## Input Variables

- `input_file`: Path to YAML file with role questions
- `validation_report`: Path to save JSON validation report
- `industry_questions_db`: Path to industry questions (for conflict checking)

## Validation Checks

### 1. Format Validation
Same as qa-validation-agent

### 2. Role Specificity
- Uses role-specific responsibilities
- Scenario is realistic for the role
- Question couldn't apply to other roles
- Score: 1-10 (7+ required)

### 3. Industry Alignment
- Fits within industry context
- No conflicts with industry questions
- Score: 1-10 (7+ required)

### 4. Pillar & Difficulty
Same as qa-validation-agent

### 5. Scenario Realism
- Realistic workflow for the role
- Appropriate complexity
- Score: 1-10 (7+ required)

## Output Format

Same structure as qa-validation-agent with additional fields:
```json
{
  "checks": {
    "role_specificity": {"pass": true, "score": 8},
    "industry_alignment": {"pass": true, "score": 9},
    "scenario_realism": {"pass": true, "score": 8}
  }
}
```

## Success Criteria

- Role relevance score >= 7.0
- Industry alignment score >= 7.0
- approved = true
