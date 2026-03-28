#!/usr/bin/env python3
"""
Export questions with industry/role relationships to SQL.
Generates INSERT statements for questions, question_industries, question_roles.
"""
import yaml
import json
from pathlib import Path
from datetime import datetime

def main():
    work_dir = Path('.prk-question/work-2026-03-28-001')
    export_dir = work_dir / 'export'
    export_dir.mkdir(exist_ok=True)

    # Load industry and role mappings
    with open(work_dir / 'industry.yaml') as f:
        industries = yaml.safe_load(f)['industries']

    with open(work_dir / 'roles.yaml') as f:
        roles = yaml.safe_load(f)['roles']

    # Create role_id -> industry_id mapping
    role_to_industry = {r['id']: r['industry_id'] for r in roles}

    # Collect all PASSED questions
    all_questions = []
    for yaml_file in work_dir.glob('questions-*.yaml'):
        with open(yaml_file) as f:
            data = yaml.safe_load(f)
            for q in data.get('questions', []):
                if q.get('qa_status') == 'PASSED':
                    all_questions.append(q)

    print(f"Processing {len(all_questions)} questions...")

    # Generate SQL
    sql_questions = []
    sql_industries = []
    sql_roles = []

    for q in all_questions:
        qid = q['id']
        role_id = q['role_id']
        industry_id = role_to_industry.get(role_id)

        # Question INSERT
        options = json.dumps([q['correct_answer']] + q['wrong_answers'])
        sql_questions.append(
            f"('{qid}', '{qid[:20]}', '{q['pillar']}', {q['difficulty']}, "
            f"'mcq', {json.dumps(q['question_text'])}, '{options}', "
            f"'{{\"answer\": 0}}', {json.dumps(q['explanation'])}, 'core')"
        )

        # Many-to-many links
        sql_roles.append(f"('{qid}', '{role_id}')")
        if industry_id:
            sql_industries.append(f"('{qid}', '{industry_id}')")

    # Write SQL files
    with open(export_dir / 'questions.sql', 'w') as f:
        f.write(f"-- Questions INSERT ({len(sql_questions)} rows)\n")
        f.write("INSERT INTO questions (id, external_id, pillar, difficulty, question_type, ")
        f.write("question_text, options, correct_answer, explanation, content_tier) VALUES\n")
        f.write(',\n'.join(sql_questions) + ';\n')

    with open(export_dir / 'question_roles.sql', 'w') as f:
        f.write(f"-- Question-Role links ({len(sql_roles)} rows)\n")
        f.write("INSERT INTO question_roles (question_id, role_id) VALUES\n")
        f.write(',\n'.join(sql_roles) + ';\n')

    with open(export_dir / 'question_industries.sql', 'w') as f:
        f.write(f"-- Question-Industry links ({len(sql_industries)} rows)\n")
        f.write("INSERT INTO question_industries (question_id, industry_id) VALUES\n")
        f.write(',\n'.join(sql_industries) + ';\n')

    # JSON export
    with open(export_dir / 'questions.json', 'w') as f:
        json.dump({'questions': all_questions, 'total': len(all_questions)}, f, indent=2)

    print(f"✓ Exported to {export_dir}/")
    print(f"  - questions.sql ({len(sql_questions)} rows)")
    print(f"  - question_roles.sql ({len(sql_roles)} rows)")
    print(f"  - question_industries.sql ({len(sql_industries)} rows)")
    print(f"  - questions.json")

if __name__ == '__main__':
    main()

