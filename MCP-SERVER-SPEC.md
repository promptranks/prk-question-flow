# PromptRanks Questions MCP Server

**Version:** 1.0.0
**Package:** @promptranks/questions-mcp-server

---

## Overview

MCP server for PromptRanks question generation workflow. Provides database access for:
- Industry/role lookup and creation
- Question duplicate detection
- Existing question retrieval

---

## Installation

```bash
npm install -g @promptranks/questions-mcp-server
```

---

## Configuration

```json
{
  "mcpServers": {
    "promptranks-questions": {
      "command": "npx",
      "args": ["@promptranks/questions-mcp-server"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@host:5432/promptranks",
        "EMBEDDING_PROVIDER": "openai",
        "OPENAI_API_KEY": "sk-...",
        "RATE_LIMIT": "100"
      }
    }
  }
}
```

---

## Endpoints

### get_or_create_industry
```typescript
get_or_create_industry(name: string, slug: string, description: string): Industry
```
**Behavior:**
- Check if industry exists by slug
- If exists: return existing industry with ID
- If not: create new industry, return with new ID

**Returns:**
```json
{
  "id": "uuid",
  "name": "Technology",
  "slug": "tech",
  "description": "...",
  "existed": true
}
```

### get_or_create_role
```typescript
get_or_create_role(
  name: string,
  slug: string,
  industry_id: string,
  responsibilities: string[]
): Role
```
**Behavior:**
- Check if role exists by slug and industry_id
- If exists: return existing role with ID
- If not: create new role, return with new ID

**Returns:**
```json
{
  "id": "uuid",
  "name": "Data Scientist",
  "slug": "data-scientist",
  "industry_id": "uuid",
  "responsibilities": [...],
  "existed": false
}
```

### get_questions
```typescript
get_questions(industry_id: string, role_id?: string): Question[]
```

### get_embeddings
```typescript
get_embeddings(industry_id: string, role_id?: string): Embedding[]
```

### check_duplicate
```typescript
check_duplicate(
  question_text: string,
  industry_id: string,
  role_id?: string
): DuplicateResult
```

---

## Security

- Database access: Read + Write (industries, roles only)
- Rate limit: 100 req/hour (configurable)
- No user data exposed
- Write operations limited to taxonomy (industries/roles)
