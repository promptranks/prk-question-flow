---
name: prk-question-qa
description: Validate generated questions with QA agent
user-invocable: true
disable-model-invocation: true
---

# prk-question-qa

Validate questions, skip PASSED questions.

## Usage

```bash
prk-question-qa
```

## Workflow

1. Read current working folder
2. Call `question-validator` agent for each questions file
3. Process only TBI and REVISED questions
4. For each question:
   - Validate format, content, quality
   - Semantic duplicate check via MCP (similarity > 0.85)
   - Score: clarity, relevance, difficulty (1-10)
   - Update qa_status: PASSED (≥7.0) or REVISED (<7.0)
5. Update `qa-status.yaml`
