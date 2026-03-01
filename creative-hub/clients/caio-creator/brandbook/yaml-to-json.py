#!/usr/bin/env python3
"""
Brandbook Template — YAML to JSON Converter
Converte brand-config.yaml para config.json

Uso:
  python yaml-to-json.py                              # usa defaults
  python yaml-to-json.py brand-config.yaml             # especifica input
  python yaml-to-json.py brand-config.yaml config.json  # especifica ambos
"""

import yaml
import json
import sys
from pathlib import Path


def convert_yaml_to_json(yaml_file: str, output_file: str = None) -> None:
    yaml_path = Path(yaml_file)

    if not yaml_path.exists():
        print(f"Erro: arquivo '{yaml_file}' não encontrado.")
        sys.exit(1)

    with open(yaml_path, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)

    if output_file is None:
        output_file = str(yaml_path.with_suffix('.json'))

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Convertido: {yaml_file} -> {output_file}")


if __name__ == '__main__':
    if len(sys.argv) >= 3:
        convert_yaml_to_json(sys.argv[1], sys.argv[2])
    elif len(sys.argv) == 2:
        convert_yaml_to_json(sys.argv[1])
    else:
        convert_yaml_to_json('brand-config.yaml', 'config.json')
