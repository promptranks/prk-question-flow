#!/usr/bin/env python3
"""Import generated questions to PromptRanks database."""

import yaml
import psycopg2
import json
from uuid import uuid4
from pathlib import Path

DATABASE_URL = "postgresql://promptranks:change-me-in-production@localhost:5432/promptranks"

def import_questions(yaml_file: Path, conn):
    """Import questions from YAML file to database."""
    with open(yaml_file) as f:
        data = yaml.safe_load(f)

    cursor = conn.cursor()

    for q in data['questions']:
        question_id = uuid4()

        # Insert question
        cursor.execute("""
            INSERT INTO questions (
                id, external_id, pillar, difficulty, question_type,
                question_text, options, correct_answer, explanation,
                tags, content_tier, source
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            question_id,
            q['id'],
            data['pillar'],
            data['difficulty'],
            'mcq',
            q['question_text'],
            json.dumps(q['options']),
            json.dumps([q['correct_answer']]),
            q['explanation'],
            json.dumps(q.get('tags', [])),
            'premium',
            'generated'
        ))

        # Link to industry if present
        if 'industry_id' in data:
            cursor.execute("""
                INSERT INTO question_industries (question_id, industry_id)
                VALUES (%s, %s)
            """, (question_id, data['industry_id']))

        # Link to role if present
        if 'role_id' in data:
            cursor.execute("""
                INSERT INTO question_roles (question_id, role_id)
                VALUES (%s, %s)
            """, (question_id, data['role_id']))

    conn.commit()
    print(f"✓ Imported {len(data['questions'])} questions from {yaml_file}")

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: python import_to_db.py <yaml_file>")
        sys.exit(1)

    conn = psycopg2.connect(DATABASE_URL)
    import_questions(Path(sys.argv[1]), conn)
    conn.close()
