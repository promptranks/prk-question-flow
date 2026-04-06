# PRK Question Flow Update Plan

**Date**: 2026-04-06  
**Purpose**: Update workflow to use authoritative taxonomy and database-ready format

---

## Current Issues

### 1. Wrong Taxonomy
- **Current**: Uses old workflow IDs (e.g., `a0000001-...`, `b0000001-...`)
- **Should be**: Authoritative NAICS + LinkedIn taxonomy with correct UUIDs
  - Industries: `10000000-0000-0000-0000-00000000000X` (X = 1-10)
  - Roles: `2000000X-0000-0000-0000-00000000000Y` (X = industry, Y = role)

### 2. Wrong Question Format
- **Current**: Workflow format with `correct_answer` (string) + `wrong_answers` (array)
- **Should be**: Database format with `options` (array) + `correct_answer` (integer index)

### 3. Wrong External ID Format
- **Current**: `{industry_slug}-{role_slug}-{pillar}-D{difficulty}-001`
- **Should be**: `{pillar}-IND-{sequential_number}` (e.g., `P-IND-0001`)

### 4. Missing Fields
- **Current**: Missing `question_type`, `content_tier`, `source`, `version`, `is_active`
- **Should be**: All required database fields present

---

## Required Changes

### 1. Update MCP Server

**File**: `mcp-server/src/index.ts`

**Current behavior**: Creates industries/roles dynamically via API

**New behavior**: Return pre-defined authoritative taxonomy

**Changes needed**:
1. Embed the 10 industries + 70 roles as constants
2. `get_or_create_industry` → lookup from constants, return correct UUID
3. `get_or_create_role` → lookup from constants, return correct UUID
4. Remove API calls (no dynamic creation)

**Benefits**:
- No API dependency
- Guaranteed correct UUIDs
- Faster execution
- Works offline

### 2. Update Industry/Role Generator Agent

**File**: `plugins/prk-question-flow/agents/industry-role-generator.md`

**Changes needed**:
1. Use MCP tools to fetch authoritative taxonomy
2. Generate `industry.yaml` with correct UUIDs
3. Generate `roles.yaml` with correct UUIDs
4. Match exact schema from `DATABASE_IDS_REFERENCE.md`

**Example output**:
```yaml
industries:
  - id: 10000000-0000-0000-0000-000000000001
    name: Technology & Software
    slug: technology-software
    description: Software development, IT services, cloud computing...

roles:
  - id: 20000001-0000-0000-0000-000000000001
    name: Software Engineer
    slug: software-engineer
    industry_id: 10000000-0000-0000-0000-000000000001
    industry_slug: technology-software
    responsibilities:
      - Design and develop software applications
      - Write clean, maintainable code
```

### 3. Update Question Generator Agent

**File**: `plugins/prk-question-flow/agents/question-generator.md`

**Changes needed**:
1. Generate questions in **database-ready format**
2. Use `options` array (4 options) + `correct_answer` (integer 0-3)
3. Use external_id format: `{pillar}-IND-{sequential}`
4. Include all required fields

**New output format**:
```yaml
questions:
  - id: {uuid}  # Generate new UUID
    external_id: P-IND-0151  # Sequential, not role-based
    pillar: P
    difficulty: 2
    question_type: mcq
    question_text: |
      As a Software Engineer, you're using an LLM to...
    options:
      - "Correct answer here"
      - "Wrong answer 1"
      - "Wrong answer 2"
      - "Wrong answer 3"
    correct_answer: 0  # Integer index (0-3)
    explanation: |
      The first option is correct because...
    tags:
      - prompt-engineering
      - software-development
    content_tier: core
    source: generated
    version: 1
    is_active: true
    created_at: 2026-04-06T21:00:00Z
    # Relationships (for reference, not in YAML)
    role_id: 20000001-0000-0000-0000-000000000001
    industry_id: 10000000-0000-0000-0000-000000000001
```

### 4. Update Export Logic

**File**: `plugins/prk-question-flow/skills/export.md` (or similar)

**Changes needed**:
1. Generate SQL that matches our successful import format
2. Include proper escaping (apostrophes, quotes)
3. Use `::jsonb` cast for `correct_answer`
4. Generate `question_roles` and `question_industries` INSERT statements

**SQL format** (use our working `transform_questions.py` as reference):
```sql
INSERT INTO questions (
    id, external_id, pillar, difficulty, question_type,
    question_text, options, correct_answer, explanation,
    tags, content_tier, source, version, is_active, created_at
) VALUES (
    '{uuid}',
    'P-IND-0151',
    'P',
    2,
    'mcq',
    'As a Software Engineer...',
    '["Correct answer", "Wrong 1", "Wrong 2", "Wrong 3"]',
    '0'::jsonb,
    'Explanation...',
    '["prompt-engineering"]',
    'core',
    'generated',
    1,
    true,
    NOW()
);

INSERT INTO question_roles (question_id, role_id) VALUES
    ('{uuid}', '20000001-0000-0000-0000-000000000001');

INSERT INTO question_industries (question_id, industry_id) VALUES
    ('{uuid}', '10000000-0000-0000-0000-000000000001');
```

---

## Implementation Steps

### Step 1: Update MCP Server with Authoritative Taxonomy

1. Copy taxonomy data from `DATABASE_IDS_REFERENCE.md`
2. Create TypeScript constants for industries and roles
3. Update `get_or_create_industry` to lookup from constants
4. Update `get_or_create_role` to lookup from constants
5. Test MCP server locally
6. Publish new version to npm

### Step 2: Update Agent Definitions

1. Update `industry-role-generator.md` with new format
2. Update `question-generator.md` with database-ready format
3. Update `question-validator.md` to validate new format
4. Update `question-reviser.md` to maintain new format

### Step 3: Update Export Logic

1. Create new export template based on `transform_questions.py`
2. Add proper SQL escaping
3. Generate relationship INSERT statements
4. Test export with sample questions

### Step 4: Update Documentation

1. Update `README.md` with new format examples
2. Update `WORKFLOW-SPEC.md` with schema changes
3. Add migration guide for existing workflows
4. Document the authoritative taxonomy

### Step 5: Test End-to-End

1. Run `prk-question-init --industry=technology-software`
2. Run `prk-question-init --role`
3. Verify correct UUIDs in generated files
4. Run `prk-question-create 5`
5. Verify database-ready format
6. Run `prk-question-export`
7. Import SQL into test database
8. Verify all relationships correct

---

## Files to Update

### MCP Server
- `mcp-server/src/index.ts` - Add taxonomy constants, update tools
- `mcp-server/src/taxonomy.ts` - New file with authoritative data
- `mcp-server/package.json` - Bump version to 2.0.0

### Agents
- `agents/industry-role-generator.md` - New format
- `agents/question-generator.md` - Database-ready format
- `agents/question-validator.md` - Validate new schema
- `agents/question-reviser.md` - Maintain new format

### Skills/Commands
- `skills/export.md` - New SQL generation
- `commands/init.md` - Updated examples
- `commands/create.md` - Updated examples

### Documentation
- `README.md` - New format examples
- `WORKFLOW-SPEC.md` - Schema updates
- `MIGRATION.md` - New file for v1 → v2 migration

---

## Benefits After Update

✅ **Zero transformation needed** - Questions ready for direct database import
✅ **Correct UUIDs** - Matches production taxonomy exactly
✅ **No mapping errors** - No role_id translation needed
✅ **Faster workflow** - Skip transformation step
✅ **Less error-prone** - Single source of truth for taxonomy
✅ **Offline capable** - No API dependency for taxonomy

---

## Backward Compatibility

**Breaking changes**: Yes, this is a major version update (v2.0.0)

**Migration path for existing workflows**:
1. Keep old workflows in `work-*` folders as-is
2. Use `transform_questions.py` to convert old format to new
3. New workflows use v2.0.0 format directly
4. Document migration in `MIGRATION.md`

---

## Next Steps

1. **Review this plan** - Confirm approach is correct
2. **Prioritize changes** - Which files to update first?
3. **Create taxonomy constants** - Extract from `DATABASE_IDS_REFERENCE.md`
4. **Update MCP server** - Test locally before publishing
5. **Update agents** - One at a time, test each
6. **End-to-end test** - Generate 10 questions, import to database
7. **Publish v2.0.0** - Update npm package and documentation

---

**Estimated effort**: 4-6 hours
**Risk level**: Medium (breaking changes, but well-defined)
**Impact**: High (eliminates transformation step, ensures data quality)
