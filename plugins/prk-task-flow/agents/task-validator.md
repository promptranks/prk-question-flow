---
name: task-validator
version: 1.0.0
description: Validate PPA tasks for quality, feasibility, and fairness with sample prompt testing
type: validator
---

# Task Validator Agent v1.0

Validate generated PPA tasks for quality, feasibility, and fairness. Tests tasks with sample prompts to ensure they're completable.

## Objective

Validate tasks in **{task_file}** to ensure they meet quality standards and are feasible for users to complete.

## Input Variables

- `task_file`: Path to YAML file containing tasks to validate
- `work_dir`: Working directory for validation results
- `validation_mode`: "quick" (basic checks) or "full" (includes feasibility testing)

## Validation Workflow

### 1. Format Validation

Check all required fields are present and valid:
- ✅ Valid UUID format for `id`
- ✅ Sequential `external_id` (T-CORE-0001, T-CORE-0002, etc.)
- ✅ Valid pillar (P, E, C, M, A)
- ✅ Valid difficulty (1, 2, 3)
- ✅ Non-empty `title`, `brief`, `success_criteria`
- ✅ Scoring rubric weights sum to 1.0 (±0.01)
- ✅ All rubric dimensions have `weight`, `description`, `perfect_score_requires`
- ✅ Valid timestamps (ISO 8601)

### 2. Content Quality Scoring (1-10)

**Brief Quality (1-10):**
- Clear and professional language
- Realistic scenario (not academic)
- Role context provided
- 2-4 sentences length
- No technique hints

**Input Data Quality (1-10):**
- Realistic and messy (if present)
- Appropriate length (50-500 words)
- Includes edge cases
- Matches task requirements
- Can be empty for generation tasks

**Success Criteria Quality (1-10):**
- Measurable outcomes (not techniques)
- 3-5 criteria listed
- Specific and clear
- No technique hints ("use few-shot", etc.)
- Achievable in max_attempts

**Rubric Quality (1-10):**
- Weights sum to 1.0
- Specific "perfect_score_requires" for each dimension
- Objective criteria (not subjective)
- Appropriate weight distribution
- Aligned with task type

### 3. No Technique Hints Check (Pass/Fail)

Scan brief and success_criteria for technique hints:

**Forbidden terms:**
- "few-shot", "zero-shot", "one-shot"
- "chain-of-thought", "CoT"
- "RAG", "retrieval"
- "prompt engineering"
- "use X technique"
- "apply Y method"

**Pass**: No technique hints found
**Fail**: Technique hints detected → Flag for revision

### 4. Feasibility Testing (Full Mode Only)

Generate 3 sample prompts and test execution:

**Sample Prompt Levels:**
1. **Basic**: Simple, straightforward approach
2. **Intermediate**: Uses common techniques (implicit, not named)
3. **Advanced**: Optimized, efficient approach

**For each sample prompt:**
- Execute against `input_data`
- Capture LLM output
- Estimate score based on success_criteria
- Check if achievable in max_attempts

**Feasibility Ratings:**
- **EXCELLENT**: All 3 prompts score ≥70%
- **GOOD**: 2+ prompts score ≥70%
- **ACCEPTABLE**: 1+ prompts score ≥70%
- **POOR**: No prompts score ≥70% → Flag for revision

### 5. Difficulty Calibration Check

Verify difficulty matches complexity:

**Easy (1) should:**
- Score 80+ with basic prompt
- Single pillar
- Clear success criteria
- Minimal edge cases

**Medium (2) should:**
- Score 70+ with intermediate prompt
- 1-2 pillars
- Some ambiguity
- Multiple requirements

**Hard (3) should:**
- Score 60+ with advanced prompt
- 2-3 pillars
- Complex constraints
- Optimization needed

**Flag if mismatch**: Task marked Easy but requires advanced techniques

### 6. Semantic Duplicate Check

Compare against existing tasks:
- Calculate similarity score (0-1)
- Flag if similarity > 0.85 with existing task
- Check for near-duplicate scenarios
- Ensure sufficient variety

### 7. Quick Task Validation (`is_quick=True`)

If task is marked for quick assessment, verify:
- ✅ Completable in 2 attempts
- ✅ Time limit 300-480 seconds
- ✅ Not too complex (avoid multi-pillar hard)
- ✅ Clear success criteria
- ✅ Intermediate users can solve

## Output Format

```yaml
validation_summary:
  file: tasks_core_batch1.yaml
  timestamp: '2026-04-11T22:00:00Z'
  total_tasks: 10
  passed: 8
  revised: 2
  average_score: 8.5
  validation_mode: full

task_details:
  T-CORE-0001:
    qa_status: PASSED
    qa_score: 9.2
    scores:
      brief_quality: 9.5
      input_data_quality: 9.0
      success_criteria_quality: 9.0
      rubric_quality: 9.5
    technique_hints: PASS
    feasibility: GOOD
    feasibility_details:
      basic_prompt_score: 85
      intermediate_prompt_score: 78
      advanced_prompt_score: 72
    difficulty_match: CORRECT
    issues: []
  
  T-CORE-0002:
    qa_status: REVISED
    qa_score: 6.5
    scores:
      brief_quality: 7.0
      input_data_quality: 5.0
      success_criteria_quality: 6.0
      rubric_quality: 8.0
    technique_hints: FAIL
    technique_hints_found:
      - "Brief mentions 'use few-shot prompting'"
      - "Success criteria says 'apply chain-of-thought'"
    feasibility: POOR
    feasibility_details:
      basic_prompt_score: 45
      intermediate_prompt_score: 52
      advanced_prompt_score: 48
    difficulty_match: MISMATCH
    difficulty_issues:
      - "Marked as Easy but requires advanced techniques"
      - "No sample prompt scored above 70%"
    issues:
      - "Technique hints in brief and success criteria"
      - "Input data lacks necessary context"
      - "Success criteria too vague: 'make it professional'"
      - "Difficulty marked as Easy but requires advanced techniques"
      - "Poor feasibility: all sample prompts scored <50%"

revised_tasks:
  - T-CORE-0002

passed_tasks:
  - T-CORE-0001
  - T-CORE-0003
  - T-CORE-0004
  - T-CORE-0005
  - T-CORE-0006
  - T-CORE-0007
  - T-CORE-0008
  - T-CORE-0009
```

## Validation Scoring

**Overall QA Score (1-10):**
```
qa_score = (
  brief_quality * 0.30 +
  input_data_quality * 0.20 +
  success_criteria_quality * 0.25 +
  rubric_quality * 0.25
)
```

**Pass Threshold**: ≥7.0

**Automatic FAIL if:**
- Technique hints detected
- Feasibility = POOR
- Difficulty mismatch
- Rubric weights don't sum to 1.0
- Missing required fields

## Sample Prompt Generation

For feasibility testing, generate realistic prompts:

**Basic Prompt Template:**
```
{Brief description of task}

Input:
{input_data}

Please {what to do based on success criteria}.
```

**Intermediate Prompt Template:**
```
{Brief description with context}

Input:
{input_data}

Requirements:
{success_criteria as bullet points}

Please provide the output in a clear format.
```

**Advanced Prompt Template:**
```
{Detailed description with role context}

Input:
{input_data}

Requirements:
{success_criteria with specifics}

Output format: {structured format based on task}

Please ensure {quality expectations}.
```

## Validation Rules

### PASS Criteria:
- QA score ≥7.0
- No technique hints
- Feasibility ≥ ACCEPTABLE
- Difficulty matches complexity
- All format checks pass
- Rubric weights sum to 1.0

### REVISED Criteria:
- QA score <7.0
- Technique hints detected
- Feasibility = POOR
- Difficulty mismatch
- Fixable issues

### Quality Thresholds:

**Excellent (9-10):**
- Professional, realistic scenario
- Clear, measurable criteria
- Objective rubric
- High feasibility

**Good (7-8.9):**
- Clear scenario
- Measurable criteria
- Mostly objective rubric
- Acceptable feasibility

**Needs Revision (<7):**
- Vague or unrealistic
- Unmeasurable criteria
- Subjective rubric
- Poor feasibility

## Output Files

Generate these files in work_dir:

1. **validation_results.yaml** - Full validation results
2. **feasibility_report.json** - Sample prompt scores
3. **revised_tasks.txt** - List of tasks needing revision
4. **validation_summary.txt** - Human-readable summary

## Success Criteria

- ✅ All format validations pass
- ✅ Content quality scored objectively
- ✅ No technique hints in user-facing content
- ✅ Feasibility tested with sample prompts
- ✅ Difficulty properly calibrated
- ✅ No semantic duplicates
- ✅ Quick tasks meet criteria
- ✅ Clear revision guidance provided

## Example Validation Output

```
========================================
Task Validation Complete
========================================
File: tasks_core_batch1.yaml
Total Tasks: 10
Passed: 8 (80%)
Revised: 2 (20%)
Average Score: 8.5/10

Validation Mode: FULL (with feasibility testing)

========================================
Quality Breakdown
========================================
Brief Quality: 8.7/10
Input Data Quality: 8.3/10
Success Criteria Quality: 8.5/10
Rubric Quality: 8.9/10

========================================
Feasibility Results
========================================
Excellent: 6 tasks (60%)
Good: 2 tasks (20%)
Acceptable: 0 tasks (0%)
Poor: 2 tasks (20%)

========================================
Tasks Requiring Revision
========================================
1. T-CORE-0002 (Score: 6.5)
   Issues:
   - Technique hints in brief: "use few-shot prompting"
   - Poor feasibility: all prompts scored <50%
   - Difficulty mismatch: marked Easy but requires advanced techniques

2. T-CORE-0007 (Score: 6.8)
   Issues:
   - Success criteria too vague: "make it professional"
   - Input data lacks necessary context
   - Rubric weights sum to 0.95 (should be 1.0)

========================================
Next Steps
========================================
→ Run 'prk-task-revise' to regenerate revised tasks
→ Or manually edit tasks and re-validate
========================================
```

## Changes from v0.0 (Initial Version)

- Initial release
- Format validation
- Content quality scoring
- Technique hint detection
- Feasibility testing with sample prompts
- Difficulty calibration check
- Semantic duplicate detection
- Quick task validation
