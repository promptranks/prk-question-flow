---
name: industry-role-generator
version: 2.0.0
description: Interactive industry and role selection from database via MCP
type: generator
---

# Industry Role Generator Agent v2.0

Generate `industry.yaml` and `roles.yaml` files by querying the authoritative taxonomy via MCP.

## Objective

Enable interactive selection of industries and roles from the database, ensuring correct UUIDs and metadata.

## MCP Tools Available

- `list_industries` - Get all available industries
- `list_roles` - Get all roles (optionally filtered by industry)
- `get_industry` - Get specific industry by ID or slug
- `get_role` - Get specific role by ID or slug

## Workflow

### Part 1: Generate industry.yaml

**Command**: `prk-question-init --industry`

**Steps**:

1. **Query available industries** via MCP:
   ```
   Call: list_industries
   Returns: Array of all 10 industries with id, name, slug, description
   ```

2. **Present industries to user** for selection:
   ```
   Available Industries:
   
   1. Technology & Software (technology-software)
      Software development, IT services, cloud computing...
   
   2. Financial Services (financial-services)
      Banking, investment management, insurance...
   
   3. Healthcare & Life Sciences (healthcare-lifesciences)
      Healthcare delivery, pharmaceuticals, biotechnology...
   
   [... 7 more ...]
   
   Select industries (comma-separated numbers or 'all'): 
   ```

3. **User selects industries** (e.g., "1,2,5" or "all")

4. **Generate industry.yaml** with selected industries:
   ```yaml
   # Generated: 2026-04-06T22:00:00Z
   # Source: MCP query from authoritative taxonomy
   # Selected: 3 industries
   
   industries:
     - id: 10000000-0000-0000-0000-000000000001
       name: Technology & Software
       slug: technology-software
       description: Software development, IT services, cloud computing, cybersecurity, and emerging technologies
   
     - id: 10000000-0000-0000-0000-000000000002
       name: Financial Services
       slug: financial-services
       description: Banking, investment management, insurance, fintech, and financial technology
   
     - id: 10000000-0000-0000-0000-000000000005
       name: Professional Services
       slug: professional-services
       description: Consulting, legal, HR, marketing, and business services
   ```

5. **Save to** `.prk-question/work-YYYY-MM-DD-NNN/industry.yaml`

### Part 2: Generate roles.yaml

**Command**: `prk-question-init --role`

**Steps**:

1. **Read industry.yaml** from current working folder

2. **For each selected industry**, query roles via MCP:
   ```
   Call: list_roles with industry_id
   Returns: Array of 7 roles for that industry
   ```

3. **Present roles to user** for selection (per industry):
   ```
   Industry: Technology & Software
   
   Available Roles:
   1. Software Engineer (software-engineer)
   2. DevOps Engineer / SRE (devops-sre)
   3. Data Scientist (data-scientist)
   4. ML Engineer (ml-engineer)
   5. Security Engineer (security-engineer)
   6. Solutions Architect (solutions-architect)
   7. Product Manager (Technical) (product-manager-tech)
   
   Select roles (comma-separated numbers or 'all'): 
   ```

4. **User selects roles** for each industry

5. **Generate roles.yaml** with selected roles:
   ```yaml
   # Generated: 2026-04-06T22:00:00Z
   # Source: MCP query from authoritative taxonomy
   # Selected: 10 roles across 3 industries
   
   roles:
     # Technology & Software (3 roles selected)
     - id: 20000001-0000-0000-0000-000000000001
       name: Software Engineer
       slug: software-engineer
       industry_id: 10000000-0000-0000-0000-000000000001
       industry_slug: technology-software
       description: Design and develop software applications, write clean maintainable code, collaborate with cross-functional teams
   
     - id: 20000001-0000-0000-0000-000000000002
       name: DevOps Engineer / SRE
       slug: devops-sre
       industry_id: 10000000-0000-0000-0000-000000000001
       industry_slug: technology-software
       description: Build and maintain CI/CD pipelines, monitor system reliability, manage cloud infrastructure
   
     - id: 20000001-0000-0000-0000-000000000003
       name: Data Scientist
       slug: data-scientist
       industry_id: 10000000-0000-0000-0000-000000000001
       industry_slug: technology-software
       description: Build predictive models and ML algorithms, analyze large datasets, communicate findings to stakeholders
   
     # Financial Services (2 roles selected)
     - id: 20000002-0000-0000-0000-000000000001
       name: Financial Analyst
       slug: financial-analyst
       industry_id: 10000000-0000-0000-0000-000000000002
       industry_slug: financial-services
       description: Analyze financial data and prepare reports, build financial models, evaluate investment opportunities
   
     - id: 20000002-0000-0000-0000-000000000002
       name: Quantitative Analyst
       slug: quant-analyst
       industry_id: 10000000-0000-0000-0000-000000000002
       industry_slug: financial-services
       description: Develop quantitative trading strategies, build statistical models, analyze market data
   
     # Professional Services (5 roles selected)
     - id: 20000005-0000-0000-0000-000000000001
       name: Management Consultant
       slug: management-consultant
       industry_id: 10000000-0000-0000-0000-000000000005
       industry_slug: professional-services
       description: Advise organizations on strategy, analyze business problems, implement solutions
   
     # ... (4 more Professional Services roles)
   ```

6. **Save to** `.prk-question/work-YYYY-MM-DD-NNN/roles.yaml`

## Alternative: Non-Interactive Mode

For automation, support command-line selection:

```bash
# Select specific industries by slug
prk-question-init --industry=technology-software,financial-services

# Select all industries
prk-question-init --industry=all

# Select specific roles by slug (after industry selection)
prk-question-init --role=software-engineer,data-scientist,financial-analyst

# Select all roles for selected industries
prk-question-init --role=all
```

## Output Format Requirements

### industry.yaml Schema

```yaml
# Header comments (optional but recommended)
industries:
  - id: string (UUID)
    name: string
    slug: string
    description: string
```

### roles.yaml Schema

```yaml
# Header comments (optional but recommended)
roles:
  - id: string (UUID)
    name: string
    slug: string
    industry_id: string (UUID)
    industry_slug: string
    description: string
```

## Validation

After generation, verify:
- ✅ All UUIDs are valid format
- ✅ All slugs match database taxonomy
- ✅ All industry_ids in roles.yaml exist in industry.yaml
- ✅ No duplicate IDs or slugs
- ✅ Valid YAML syntax

## Error Handling

**MCP connection failed**:
- Display error message
- Suggest checking MCP server configuration
- Provide fallback: manual entry with validation

**Invalid selection**:
- Re-prompt user with valid options
- Show example: "Enter numbers like: 1,3,5 or 'all'"

**No industries selected**:
- Warn: "At least one industry must be selected"
- Re-prompt for selection

## Success Criteria

- ✅ Queries live taxonomy via MCP
- ✅ Interactive user selection
- ✅ Correct UUIDs from database
- ✅ Valid YAML output
- ✅ Saved to correct working folder
- ✅ Ready for question generation

## Changes from v1.0

- **Data source**: MCP query (live) instead of hardcoded/API
- **Interaction**: User selects from list instead of specifying slugs
- **Validation**: Real-time validation against taxonomy
- **UUIDs**: Guaranteed correct from authoritative source
- **Offline**: Works offline (taxonomy embedded in MCP server)
