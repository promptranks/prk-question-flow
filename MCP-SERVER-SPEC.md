# PromptRanks Questions MCP Server

**Version:** 1.0.0
**Package:** @promptranks/questions-mcp-server

---

## Overview

MCP server for PromptRanks question generation workflow. Provides read-only database access and semantic duplicate detection.

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

- Read-only database access
- Rate limit: 100 req/hour (configurable)
- No user data exposed
