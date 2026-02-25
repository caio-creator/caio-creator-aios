# Módulo 01 — Branding

Biblioteca de prompts para desenvolver diretrizes completas de marca. Cada fase produz um artefato específico. Execute em sequência para o resultado mais coeso.

## Fluxo das 9 Fases

```
Fase 1: Briefing → Fase 2: Posicionamento → Fase 3: Público
    ↓
Fase 4: Voz → Fase 5: Narrativa → Fase 6: Editorial
    ↓
Fase 7: Visual → Fase 8: Digital → Fase 9: Brand Book
```

## Prompts por Fase

| Fase | Diretório | Prompts | Output |
|------|-----------|---------|--------|
| 1 — Briefing | `phase-01-briefing/prompts/` | P01-brand-intake, P01-competitive, P01-audit-existing | `brand-briefing.md` |
| 2 — Posicionamento | `phase-02-positioning/prompts/` | P02-compass, P02-differentiation | `positioning.md` |
| 3 — Público | `phase-03-audience/prompts/` | P03-icp, P03-persona-primary, P03-journey | `audience.md` |
| 4 — Voz | `phase-04-voice/prompts/` | P04-personality, P04-voice-definition, P04-vocabulary | `voice-and-tone.md` |
| 5 — Narrativa | `phase-05-narrative/prompts/` | P05-brand-story, P05-manifesto, P05-story-bank | `narrative.md` + `story-bank.md` |
| 6 — Editorial | `phase-06-editorial/prompts/` | P06-content-pillars, P06-weekly-line | `editorial.md` |
| 7 — Visual | `phase-07-visual/prompts/` | P07-visual-direction, P07-color-system | `visual-brief.md` |
| 8 — Digital | `phase-08-digital/prompts/` | P08-instagram, P08-linkedin, P08-tiktok, P08-email | `digital-guidelines.md` |
| 9 — Brand Book | `phase-09-brandbook/prompts/` | P09-compile, P09-executive-summary | `brand-book.md` |

## Como Usar

### Via @brand-director (recomendado)
```
@brand-director
*briefing [Nome da Marca]
```
O agente conduz todas as fases automaticamente, salvando os artefatos no workspace do cliente.

### Via prompt direto (modo standalone)
1. Abra o arquivo de prompt desejado
2. Copie o prompt completo
3. Substitua os campos `[EM COLCHETES]` com os dados reais
4. Cole numa nova conversa com Claude

## Convenções dos Prompts

- `[NOME_DA_MARCA]` — Nome oficial da marca
- `[SETOR]` — Setor de atuação
- `[BRIEFING_COMPLETO]` — Cole o conteúdo completo do `brand-briefing.md`
- `[FASE_ANTERIOR]` — Cole o output da fase anterior

Cada prompt inclui:
- **Prompt principal** — para colar e executar
- **Prompts de refinamento** — para aprofundar resultados
- **Critérios de qualidade** — para validar o output
