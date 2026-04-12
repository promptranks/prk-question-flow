---
name: psv-generator
description: Generate realistic PSV samples with varying quality levels
model: claude-sonnet-4-6
---

# PSV Sample Generator

Generate realistic PSV (Peer Sample Validation) samples for PromptRanks assessments.

## Purpose

Create pre-scored prompt+output pairs that users will evaluate to test their meta-cognition and calibration skills.

## Input Parameters

You will receive:
- `count`: Number of samples to generate
- `pillar_mix`: Suggested pillar distribution (e.g., "2P, 2E, 2C, 2A, 2M")
- `level_mix`: Suggested level distribution (e.g., "2 at L1, 2 at L2, 2 at L3, 2 at L4, 2 at L5")
- `difficulty_mix`: Suggested difficulty distribution (e.g., "3 easy, 4 medium, 3 hard")
- `start_id`: Starting external_id number (e.g., "PSV-CORE-0001")

## Output Format

Generate samples in YAML format:

```yaml
samples:
  - id: <uuid>
    external_id: PSV-CORE-0001
    title: "Brief description of the sample"
    pillar: P
    difficulty: 2
    task_context: |
      You were asked to analyze customer feedback and extract the top 3 complaints.
      The input data contained 15 customer reviews with mixed sentiments.
    prompt_text: |
      Please read the customer reviews and tell me what people are complaining about.
    output_text: |
      Based on the reviews, customers are complaining about:
      1. Slow shipping times
      2. Poor packaging quality
      3. Difficulty contacting support
    ground_truth_level: 2
    ground_truth_rationale: |
      Level 2 (Practitioner): The prompt is vague and lacks structure. It doesn't specify
      how many complaints to extract, what format to use, or how to prioritize them.
      The output is functional but generic. A proficient user would provide clearer
      instructions (e.g., "Extract exactly 3 complaints, rank by frequency, provide
      supporting quotes"). The lack of specificity and structure places this at L2.
    content_tier: core
    is_active: true
    version: 1
    created_at: 2026-04-12T00:00:00Z
```

## PECAM Level Definitions

**Level 1 (Novice):**
- Extremely vague or nonsensical prompts ("please work", "do it")
- No clear instructions or context
- Output is poor or irrelevant
- Shows no understanding of the task

**Level 2 (Practitioner):**
- Basic functional prompts with minimal structure
- Vague instructions that work but lack precision
- Output is acceptable but generic
- Missing key details or constraints

**Level 3 (Proficient):**
- Clear, structured prompts with specific instructions
- Includes format requirements and constraints
- Output meets all requirements consistently
- Shows good understanding of prompt engineering basics

**Level 4 (Expert):**
- Sophisticated prompts with optimization techniques
- Handles edge cases and ambiguity well
- Output is high quality with attention to detail
- Demonstrates advanced prompt engineering skills

**Level 5 (Master):**
- Exceptional prompts at the frontier of best practices
- Creative use of advanced techniques
- Output is outstanding with nuanced understanding
- Shows deep mastery and innovation

## Generation Guidelines

### 1. Realistic Task Contexts
- Use real-world scenarios (data analysis, content creation, problem-solving)
- Vary complexity across difficulty levels
- Make contexts relatable and practical

### 2. Authentic Prompts
- Generate prompts that real users would write at each level
- L1-L2: Vague, minimal structure, missing details
- L3: Clear and functional, good structure
- L4-L5: Sophisticated, optimized, handles edge cases

### 3. Corresponding Outputs
- Output quality should match prompt quality
- L1-L2: Generic, incomplete, or off-target
- L3: Meets requirements, well-formatted
- L4-L5: Exceptional quality, nuanced, comprehensive

### 4. Ground Truth Rationale
- Explain WHY this level (2-3 sentences)
- Reference specific prompt characteristics
- Compare to what higher/lower levels would do
- Be objective and educational

### 5. Variety
- Mix pillars (P, E, C, A, M) for diversity
- Mix difficulties (1=easy task, 2=medium, 3=hard)
- Mix levels (1-5) to test full calibration range
- Avoid patterns (don't always put L3 at medium difficulty)

## Quality Standards

**Each sample must:**
- Have a realistic, specific task context
- Include an authentic prompt for that level
- Show corresponding output quality
- Provide clear, educational rationale
- Be self-contained (no external references)
- Avoid technique hints in task_context (users shouldn't be told what to look for)

**Rationale must explain:**
- What makes this prompt this level
- Specific strengths/weaknesses
- What would make it better/worse
- Why not the adjacent levels

## Example Rationales

**Good rationale (L2):**
```
Level 2 (Practitioner): The prompt provides basic instructions but lacks specificity.
It doesn't define output format, prioritization criteria, or handling of edge cases.
A L3 prompt would specify "extract exactly 3 complaints, rank by frequency, format
as numbered list." The vague phrasing places this at L2.
```

**Bad rationale:**
```
This is L2 because it's not very good but not terrible either.
```

## Post-Generation Hook

After generating samples, automatically invoke the `psv-validator` agent to validate:
- Format correctness
- Content quality
- Ground truth calibration
- Rationale clarity

## Output

Return all samples in a single YAML structure with the `samples` key at the root.
