# Migration Guide: v2.1 → v2.2

**Date**: 2026-04-11  
**Status**: Stable Release

---

## Overview

v2.2 introduces automatic QA validation after question generation, eliminating the manual step of running `prk-question-qa` separately.

---

## What Changed

### Auto-QA Integration

**Before (v2.1)**:
```bash
# Step 1: Generate questions
prk-question-create 10
# ✓ 50 questions generated with qa_status: TBI

# Step 2: Manually run QA (REQUIRED MANUAL STEP)
prk-question-qa
# ✓ 48 PASSED, 2 REVISED
```

**After (v2.2)**:
```bash
# Single command does both generation AND QA
prk-question-create 10
# ✓ 50 questions generated
# ✓ Auto-QA validation complete
# ✓ Results: 48 PASSED, 2 REVISED
```

---

## Breaking Changes

**None!** v2.2 is fully backward compatible.

---

## New Features

### 1. Automatic QA Validation

Questions are automatically validated immediately after generation:
- Format validation
- Content quality scoring
- Semantic duplicate detection via MCP
- qa_status updated automatically (PASSED or REVISED)

### 2. Optional Skip Flag

For debugging or special cases, you can skip auto-QA:

```bash
prk-question-create 10 --skip-qa
# ✓ Questions generated (qa_status: TBI)
# ⏸ Auto-QA skipped

# Run QA manually later
prk-question-qa
```

### 3. Combined Output

See both generation and QA results in one output:

```
========================================
Question Generation Complete
========================================
Industry: Technology & Software
Questions Generated: 50

========================================
Auto-QA Validation Complete
========================================
Total Validated: 50
✓ PASSED: 48 questions
✗ REVISED: 2 questions

Questions requiring revision:
  - P-IND-0151 (score: 6.5) - Lacks industry context
  - E-IND-0152 (score: 6.8) - Option C too similar to B

Next Steps:
→ Run 'prk-question-revise' to regenerate REVISED questions
→ Or run 'prk-question-create' again to continue to next industry
========================================
```

---

## Migration Steps

### For New Users

No action needed! Just use v2.2 and enjoy auto-QA.

```bash
prk-question-init --industry
prk-question-init --role
prk-question-create 10  # Auto-QA enabled by default
```

### For Existing Users

**Option 1: Use Auto-QA (Recommended)**

Simply update to v2.2 and continue using the same commands:

```bash
# Update plugin
claude-code plugin update prk-question-flow

# Use as before, but QA runs automatically
prk-question-create 10
```

**Option 2: Keep Old Workflow**

If you prefer the old two-step workflow:

```bash
# Skip auto-QA
prk-question-create 10 --skip-qa

# Run QA manually
prk-question-qa
```

---

## Workflow Changes

### Old Workflow (v2.1)

```
1. prk-question-init --industry
2. prk-question-init --role
3. prk-question-create 10
4. prk-question-qa          ← Manual step
5. prk-question-revise
6. prk-question-qa          ← Manual step again
7. prk-question-export
```

### New Workflow (v2.2)

```
1. prk-question-init --industry
2. prk-question-init --role
3. prk-question-create 10   ← Auto-QA included
4. prk-question-revise
5. prk-question-create 0    ← Re-validate (or use prk-question-qa)
6. prk-question-export
```

**Time saved**: ~30% fewer commands, immediate feedback

---

## Command Reference Updates

### Updated Commands

| Command | v2.1 Behavior | v2.2 Behavior |
|---------|---------------|---------------|
| `prk-question-create [N]` | Generate only | Generate + Auto-QA |
| `prk-question-create [N] --skip-qa` | N/A | Generate only (skip QA) |
| `prk-question-qa` | Manual QA | Still available for manual QA |

### Unchanged Commands

All other commands work exactly the same:
- `prk-question-init`
- `prk-question-plan`
- `prk-question-revise`
- `prk-question-status`
- `prk-question-validate`
- `prk-question-export`
- All other commands

---

## Benefits

✅ **Faster Workflow** - One command instead of two  
✅ **Immediate Feedback** - See QA results right away  
✅ **Guaranteed Quality** - Can't forget to run QA  
✅ **Better UX** - Clear combined output  
✅ **Backward Compatible** - Old workflow still works with `--skip-qa`  

---

## FAQ

### Q: Do I need to change my existing workflows?

**A:** No! v2.2 is fully backward compatible. Your existing workflows will work, but now with automatic QA.

### Q: Can I disable auto-QA?

**A:** Yes, use the `--skip-qa` flag:
```bash
prk-question-create 10 --skip-qa
```

### Q: Does `prk-question-qa` still work?

**A:** Yes! It's still available for:
- Re-running QA on revised questions
- Manual QA when needed
- Debugging and testing

### Q: Will auto-QA slow down generation?

**A:** QA runs immediately after generation, so total time is the same. The difference is you get immediate feedback instead of waiting to run a separate command.

### Q: What if auto-QA fails?

**A:** The generation still completes successfully. QA errors are reported clearly, and you can:
- Fix the issue and re-run QA manually with `prk-question-qa`
- Use `--skip-qa` to bypass auto-QA temporarily

### Q: Can I use v2.2 with old question files?

**A:** Yes! v2.2 works with all question files from v2.0+. Auto-QA only processes TBI questions, skipping already PASSED questions.

---

## Troubleshooting

### Issue: Auto-QA is not running

**Solution**: Check that you're using v2.2:
```bash
claude-code plugin list | grep prk-question-flow
# Should show version 2.2.0
```

### Issue: Want to skip auto-QA temporarily

**Solution**: Use the `--skip-qa` flag:
```bash
prk-question-create 10 --skip-qa
```

### Issue: QA results not showing

**Solution**: Check `qa-status.yaml` in your work folder:
```bash
cat .prk-question/work-*/qa-status.yaml
```

---

## Rollback

If you need to revert to v2.1:

```bash
# Uninstall v2.2
claude-code plugin uninstall prk-question-flow

# Install v2.1
claude-code plugin install prk-question-flow@2.1.0
```

---

## Support

- **Issues**: https://github.com/promptranks/prk-question-flow/issues
- **Discussions**: https://github.com/promptranks/prk-question-flow/discussions
- **Documentation**: https://github.com/promptranks/prk-question-flow

---

## Summary

v2.2 makes the workflow faster and more intuitive by automatically running QA after generation. No breaking changes, fully backward compatible, and you can always skip auto-QA if needed.

**Recommendation**: Update to v2.2 and enjoy the streamlined workflow!
