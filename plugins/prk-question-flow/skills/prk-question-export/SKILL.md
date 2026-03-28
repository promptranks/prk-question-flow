---
name: prk-question-export
description: Export questions to SQL/JSON
user-invocable: true
disable-model-invocation: true
---

# prk-question-export

Export validated questions to SQL and JSON formats.

## Usage

```bash
prk-question-export
```

## Workflow

1. Read all `questions-*.yaml` files with qa_status: PASSED
2. Read `industry.yaml` and `roles.yaml` for mappings
3. Run `export_sql.py` script to generate:
   - `questions.sql` - INSERT for questions table
   - `question_industries.sql` - Many-to-many industry links
   - `question_roles.sql` - Many-to-many role links
   - `questions.json` - JSON format for API import
4. Save to `export/` directory

## Database Schema

```sql
-- questions table
CREATE TABLE questions (
    id UUID PRIMARY KEY,
    external_id VARCHAR(20) UNIQUE,
    pillar CHAR(1) CHECK (pillar IN ('P','E','C','M','A')),
    difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 3),
    question_text TEXT,
    options JSONB,
    correct_answer JSONB,
    explanation TEXT,
    content_tier VARCHAR(20) DEFAULT 'core'
);

-- Many-to-many: question ↔ industry
CREATE TABLE question_industries (
    question_id UUID REFERENCES questions(id),
    industry_id UUID REFERENCES industries(id),
    PRIMARY KEY (question_id, industry_id)
);

-- Many-to-many: question ↔ role
CREATE TABLE question_roles (
    question_id UUID REFERENCES questions(id),
    role_id UUID REFERENCES roles(id),
    PRIMARY KEY (question_id, role_id)
);
```
