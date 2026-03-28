# Contributing to PRK Question Flow

Thank you for contributing to PromptRanks question generation!

## Quick Start

1. **Fork and clone**
   ```bash
   git clone git@github.com:YOUR_USERNAME/prk-question-flow.git
   cd prk-question-flow
   ```

2. **Install plugin**
   ```bash
   claude-code plugin install .
   ```

3. **Create branch**
   ```bash
   git checkout -b questions/finance-pillar-P
   ```

4. **Run sprint**
   ```bash
   claude-code sprint run sprints/industry-questions-sprint.yaml \
     --var industry=finance \
     --var pillar=P \
     --var difficulty=1
   ```

5. **Review output**
   - Check `output/finance-P-D1.yaml`
   - Check `output/finance-P-D1-validation.json`
   - Ensure validation passed

6. **Commit and push**
   ```bash
   git add output/
   git commit -m "Add finance Pillar P difficulty 1 questions"
   git push origin questions/finance-pillar-P
   ```

7. **Create PR**

## Question Quality Guidelines

- Use industry-specific terminology
- Create realistic scenarios
- Provide clear explanations
- Ensure only one correct answer
- Match difficulty level appropriately

## Need Help?

Open an issue or ask in discussions.
