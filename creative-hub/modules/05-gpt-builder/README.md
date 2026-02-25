# Módulo 05 — GPT Builder
> Arquitetura, documentação e operação de Custom GPTs para marcas do Creative Hub.
> Versão: 1.0 | Criado em: 2026-02-24

---

## O que é este módulo

Playbook + Blueprint para criar Custom GPTs (OpenAI GPT Builder) com qualidade de produto.
Um GPT bem feito é um agente operacional que funciona sem supervisão — mas precisa de arquitetura.

Este módulo transforma brand-guidelines de cada cliente em GPTs operacionais, replicáveis e mantidos.

---

## Artefatos disponíveis

| Arquivo | O que é | Quando usar |
|---------|---------|------------|
| `playbook.md` | Manual completo Fases 0–9 | Ao criar qualquer GPT do zero |
| `blueprint-template.md` | Template preenchível (arquitetura) | Definir ANTES de abrir o GPT Builder |
| `instructions-template.md` | Template de Instructions pronto para colar | Aba Configure do GPT Builder |
| `decision-matrix.md` | Quando usar Knowledge vs Actions vs Web | Ao escolher capabilities |
| `qa-test-suite.md` | 30+ testes organizados | Fase 6 (QA) do playbook |
| `anti-patterns.md` | Erros clássicos e como corrigir | Revisão pré-publicação |
| `publication-checklist.md` | Checklist final | Fase 8 (Publicação) do playbook |

---

## Fluxo recomendado

```
Blueprint → Instructions → Knowledge → Capabilities → QA → Publicação → Manutenção
(Template)  (Template)     (Arquivos)   (Toggles)   (Suite) (Checklist)  (GPT Ops)
   ↑
Fase 0: Definição estratégica — preencher ANTES de abrir o GPT Builder
```

---

## GPTs por cliente

### Caio © Creator
**Localização:** `creative-hub/clients/caio-creator/gpt-builder/`

| GPT | Nome | Propósito |
|-----|------|-----------|
| Ghostwriter | Caio Ghostwriter | Escreve conteúdo no tom/voz exato de Caio |
| Content Strategist | Caio Content Strategist | Planeja grade editorial alinhada ao posicionamento |
| Brand Mentor | Caio Brand Mentor | Responde sobre metodologia e valida decisões de marca |

### GetShake®
**Localização:** `creative-hub/clients/getshake/gpt-builder/`

| GPT | Nome | Agente AIOS paralelo |
|-----|------|---------------------|
| Briefing Intake | GetShake · IRIS | IRIS (briefing intake) |
| Proposal Generator | GetShake · NEXO | NEXO (proposal generator) |
| Creator Presentation | GetShake · RADAR | RADAR (creator presentation) |

---

## Diferença: AIOS Agent vs. Custom GPT

| | AIOS Agent (Claude) | Custom GPT (OpenAI) |
|-|---------------------|---------------------|
| Plataforma | Claude Code / Synkra | ChatGPT |
| Ativação | @agente-nome no terminal | chatgpt.com |
| Instructions | Markdown sem limite | Aba Configure, 8.000 chars |
| Knowledge | Arquivos lidos pelo Claude | Upload de até 20 arquivos |
| Usuário | Caio (desenvolvedor) | Equipe GetShake / clientes / Caio |
| Objetivo | Automação de workflow | Operação recorrente por humanos |

---

## Convenções

- **Blueprint** = arquitetura do GPT (o que É, FAZ e NÃO FAZ)
- **Playbook** = processo (como criar, testar, publicar, manter)
- **Todo GPT começa pelo Blueprint** — preencher antes de abrir o GPT Builder
- Knowledge files = arquivos do `brand-guidelines/` do respectivo cliente
- Instructions MUST respeitar limite de 8.000 caracteres
- FDaP como filtro de qualidade para todos os GPTs GetShake
