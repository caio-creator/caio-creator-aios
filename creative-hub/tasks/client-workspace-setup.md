# Task: client-workspace-setup

**Agente:** @brand-director (Atlas)
**Propósito:** Inicializar workspace de novo cliente
**Versão:** 1.0.0

---

## Propósito

Criar a estrutura de diretórios e arquivos iniciais para um novo projeto de branding de cliente. Deve ser executado antes de qualquer fase do método.

## Pré-condições

- Nome do cliente ou projeto fornecido
- Diretório `creative-hub/clients/` existe

## Execução

### Passo 1 — Definir slug do cliente

Converter o nome do cliente para slug (minúsculas, sem espaços, sem caracteres especiais):
- "Maria Fernanda Consultoria" → `maria-fernanda-consultoria`
- "TechStart Soluções" → `techstart-solucoes`

### Passo 2 — Criar estrutura de diretórios

Criar os seguintes arquivos (copiar de `clients/_template/`):

```
clients/[SLUG-CLIENTE]/
├── workspace.yaml                         ← Manifesto do projeto
├── README.md                              ← Índice do projeto
├── briefing/
│   └── brand-briefing.md                 ← Preenchido na Fase 1
├── brand-guidelines/
│   ├── positioning.md                    ← Gerado na Fase 2
│   ├── audience.md                       ← Gerado na Fase 3
│   ├── voice-and-tone.md                 ← Gerado na Fase 4
│   ├── narrative.md                      ← Gerado na Fase 5
│   ├── editorial.md                      ← Gerado na Fase 6
│   ├── visual-brief.md                   ← Gerado na Fase 7
│   ├── digital-guidelines.md             ← Gerado na Fase 8
│   └── brand-book.md                     ← Compilado na Fase 9
├── content/
│   ├── story-bank.md                     ← Gerado na Fase 5
│   └── message-library.md               ← (opcional) mensagens-chave
└── sessions/
    └── .gitkeep                          ← Logs de sessões de trabalho
```

### Passo 3 — Preencher workspace.yaml

```yaml
client: "[NOME DO CLIENTE]"
slug: "[SLUG]"
sector: "[SETOR DE ATUAÇÃO]"
project_start: "[DATA ATUAL]"
responsible: "Caio Creator"
status: "in_progress"

phases:
  briefing: pending
  positioning: pending
  audience: pending
  voice: pending
  narrative: pending
  editorial: pending
  visual_brief: pending
  digital: pending
  brand_book: pending

notes: ""
```

### Passo 4 — Confirmar e instruir

Confirme a criação do workspace e mostre o próximo passo:

> "Workspace de **[NOME DO CLIENTE]** inicializado em `clients/[SLUG]/`.
> Próximo passo: execute `*briefing [NOME DO CLIENTE]` para iniciar o discovery."

## Output

- Diretório `clients/[SLUG]/` criado com estrutura completa
- `workspace.yaml` preenchido com dados básicos do projeto
- `README.md` com índice do projeto

## Pós-condições

- Workspace pronto para uso
- Próxima ação: `*briefing [CLIENTE]` (Fase 1)
