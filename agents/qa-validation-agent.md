---
name: qa-validation-agent
version: 1.0.0
description: Validate industry-specific questions for quality and compliance
type: validator
---

# QA Validation Agent

Validate generated industry questions for quality, accuracy, and compliance with PromptRanks standards.

## Objective

Review questions in {input_file} and produce a validation report with pass/fail status and quality scores.

## Input Variables

- `input_file`: Path to YAML file with generated questions
- `validation_report`: Path to save JSON validation report
- `core_questions_db`: Path to core questions database (for duplicate checking)

## Validation Checks

### 1. Format Validation
- Valid YAML structure
- All required fields present: industry, pillar, difficulty, questions
- Each question has: id, question_text, options (4), correct_answer, explanation, tags
- correct_answer is integer 0-3

### 2. Content Quality
- Question text is clear and unambiguous
- Exactly 4 options provided
- All options are plausible
- Only 1 correct answer
- Explanation references the correct answer
- Explanation teaches the concept
- No typos or grammar errors

### 3. Industry Specificity
- Uses industry-specific terminology
- Scenario is realistic for the industry
- Not a generic question that could apply to any industry
- Score: 1-10 (7+ required)

### 4. Pillar Alignment
- Question tests the specified pillar
- Correct answer demonstrates pillar knowledge
- Score: 1-10 (7+ required)

### 5. Difficulty Calibration
- D1: Basic concepts, clear answers
- D2: Applied knowledge, trade-offs
- D3: Expert scenarios, nuanced
- Score: 1-10 (7+ required)

### 6. Uniqueness
- No duplicates with core questions
- No duplicates within batch
- Check question_text similarity (>80% = duplicate)

## Output Format

```json
{
  "file": "output/finance-P-D1.yaml",
  "timestamp": "2026-03-28T10:30:00Z",
  "status": "pass",
  "overall_score": 8.5,
  "checks": {
    "format": {"pass": true, "issues": []},
    "content": {"pass": true, "issues": []},
    "industry_specificity": {"pass": true, "score": 9, "issues": []},
    "pillar_alignment": {"pass": true, "score": 8, "issues": []},
    "difficulty": {"pass": true, "score": 8, "issues": []},
    "uniqueness": {"pass": true, "duplicates": []}
  },
  "questions": [
    {
      "id": "finance-P-D1-001",
      "status": "pass",
      "scores": {
        "clarity": 9,
        "industry_relevance": 9,
        "pillar_alignment": 8,
        "difficulty": 8
      },
      "issues": [],
      "suggestions": ["Consider adding specific dollar amounts for realism"]
    }
  ],
  "summary": {
    "total_questions": 2,
    "passed": 2,
    "failed": 0,
    "avg_score": 8.5
  },
  "approved": true,
  "reviewer_notes": "High quality questions, well-aligned with finance industry"
}
```

## Instructions

1. Load and parse {input_file}
2. Run all validation checks
3. Score each question (1-10 scale)
4. Identify issues and provide suggestions
5. Calculate overall score (average of all scores)
6. Set approved = true if overall_score >= 7.0 and no critical issues
7. Save report to {validation_report}

## Success Criteria

- All format checks pass
- Overall score >= 7.0
- No critical issues
- approved = true
