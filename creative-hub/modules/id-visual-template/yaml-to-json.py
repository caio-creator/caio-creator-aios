#!/usr/bin/env python3
"""
Convert YAML brand config to JSON for template loading.
Usage: python yaml-to-json.py brand-config.yaml [output.json]
"""

import yaml
import json
import sys
from pathlib import Path

def convert_yaml_to_json(yaml_file, output_file=None):
    """Convert YAML config to JSON"""
    try:
        # Read YAML
        with open(yaml_file, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)

        # Determine output path
        if output_file is None:
            output_file = str(Path(yaml_file).with_suffix('.json'))

        # Write JSON
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"✓ Converted {yaml_file} → {output_file}")
        return True
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python yaml-to-json.py <input.yaml> [output.json]")
        sys.exit(1)

    yaml_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    success = convert_yaml_to_json(yaml_file, output_file)
    sys.exit(0 if success else 1)
