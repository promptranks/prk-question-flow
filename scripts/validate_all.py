#!/usr/bin/env python3
"""Validate all generated questions in output directory."""

import json
from pathlib import Path

def validate_all():
    """Validate all YAML files in output directory."""
    output_dir = Path("output")
    validation_files = list(output_dir.glob("*-validation.json"))

    total = len(validation_files)
    passed = 0
    failed = 0

    for vf in validation_files:
        with open(vf) as f:
            report = json.load(f)

        if report['approved']:
            passed += 1
            print(f"✓ {vf.stem}: PASS (score: {report['overall_score']})")
        else:
            failed += 1
            print(f"✗ {vf.stem}: FAIL (score: {report['overall_score']})")

    print(f"\nSummary: {passed}/{total} passed, {failed}/{total} failed")
    return failed == 0

if __name__ == "__main__":
    import sys
    sys.exit(0 if validate_all() else 1)
