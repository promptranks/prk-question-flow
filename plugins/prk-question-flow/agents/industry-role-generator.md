---
name: industry-role-generator
version: 1.0.0
description: Generate industry and role definitions from database or user input
type: generator
---

# Industry Role Generator Agent

Generate `industry.yaml` and `roles.yaml` files for question generation workflow.

## Objective

Create structured industry and role definitions that match database schema and API data models.

## Input Variables

**For Industries:**
- `industry_slugs`: Comma-separated slugs (e.g., "core,tech,finance")

**For Roles:**
- `industry_yaml_path`: Path to existing industry.yaml file

## Instructions

### Generate Industries

1. **Parse industry slugs** from input
2. **Fetch from MCP server** (or use cached data):
   ```sql
   SELECT id, name, slug, description
   FROM industries
   WHERE slug IN (...)
   ```
3. **Generate industry.yaml**:
   ```yaml
   industries:
     - id: a0000001-0000-0000-0000-000000000001
       name: Technology
       slug: tech
       description: Software, hardware, IT services
       workflows:
         - Code documentation
         - Technical support
         - System design
   ```

### Generate Roles

1. **Read industry.yaml** from working folder
2. **For each industry, fetch roles**:
   ```sql
   SELECT id, name, slug, industry_id
   FROM roles
   WHERE industry_id = ?
   ```
3. **Generate roles.yaml**:
   ```yaml
   roles:
     - id: b0000001-0000-0000-0000-000000000002
       name: Data Scientist
       slug: data-scientist
       industry_id: a0000001-0000-0000-0000-000000000001
       industry_slug: tech
       responsibilities:
         - Build predictive models
         - Analyze large datasets
         - Communicate insights
   ```

## Output Format

**Must match database schema:**
- UUID format for IDs
- Slug format: lowercase-with-dashes
- All required fields present

## Success Criteria

- Valid YAML format
- Schema compliant with database
- All industries/roles have complete data
- No missing required fields
