# PromptRanks Questions MCP Server

MCP server for PromptRanks question generation workflow. Provides tools to create and manage industries and roles in the PromptRanks database.

## Installation

```bash
npm install -g @promptranks/questions-mcp-server
```

## Configuration

### 1. Get your API key

Visit https://promptranks.org/mcp-api-key and request an API key. You'll receive it via email.

### 2. Save your API key

Create `~/.promptranks/mcp_api_key.json`:

```json
{
  "key": "mcp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### 3. Add to Claude Code

Add to your `~/.claude.json`:

```json
{
  "mcpServers": {
    "prk-questions": {
      "command": "npx",
      "args": ["@promptranks/questions-mcp-server"]
    }
  }
}
```

Or use the CLI:

```bash
claude mcp add-json prk-questions '{"command":"npx","args":["@promptranks/questions-mcp-server"]}'
```

## Tools

### get_or_create_industry

Get or create an industry by slug.

**Parameters:**
- `name` (string): Industry name
- `slug` (string): URL-friendly slug
- `description` (string): Industry description

**Returns:**
- `id` (string): Database UUID
- `existed` (boolean): Whether industry already existed

### get_or_create_role

Get or create a role by slug and industry.

**Parameters:**
- `name` (string): Role name
- `slug` (string): URL-friendly slug
- `industry_id` (string): Industry UUID
- `responsibilities` (array): List of responsibilities

**Returns:**
- `id` (string): Database UUID
- `existed` (boolean): Whether role already existed

## License

MIT
