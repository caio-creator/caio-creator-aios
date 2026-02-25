# GetShake — Agentes Operacionais

> Sistema de 3 agentes para automatizar os fluxos operacionais da GetShake
> Criado em: 2026-02-24 | Versão 1.0

---

## Visão Geral

Os 3 agentes cobrem as etapas críticas do pipeline comercial da GetShake, do briefing à apresentação de creators. Cada agente foi construído com persona, protocolos e constraints alinhados com as diretrizes de marca e a metodologia SHAKE.AI.

---

## Os 3 Agentes

| Agente | Arquivo | Fase Pipeline | Responsável | Input | Output |
|--------|---------|---------------|-------------|-------|--------|
| **IRIS** — Briefing Intake | `getshake-briefing-intake.md` | Fase 1 (01-02) | Comercial | Pedido do cliente (raw) | Briefing estruturado |
| **NEXO** — Proposal Generator | `getshake-proposal-generator.md` | Fase 2-3 (03, 07) | Comercial | Briefing estruturado + criadores | Proposta comercial |
| **RADAR** — Creator Presentation | `getshake-creator-presentation.md` | Fase 2-4 (04-05) | Comercial + Operação | Briefing + lista de criadores | Deck de apresentação |

---

## Pipeline de Uso

```
Cliente chega com pedido
        ↓
[IRIS] Briefing Intake
  → Coleta e estrutura o briefing
  → Output: briefing-{cliente}-{data}.md
        ↓
[NEXO] Proposal Generator
  → Gera proposta comercial
  → Output: proposta-{cliente}-{data}.md
        ↓
[RADAR] Creator Presentation
  → Aplica 9 critérios de curadoria
  → Gera deck de apresentação
  → Output: creators-{cliente}-{data}.md
        ↓
Aprovação do cliente → Execução da campanha
```

---

## Princípios de Design

**FDaP como filtro:** Todas as comunicações passam pelo filtro Rápido. Delicioso. Quase Perfeito.

**Tom calibrado por destinatário:**
- Clientes (Buyers): Nível 1 (Institucional) ou Nível 2 (Operacional)
- Creators (Sellers): Nível 3 (Cultural/Street)

**Metodologia embarcada:** 9 critérios de curadoria, 12 etapas do pipeline, 54 métricas — todos embutidos nos protocolos de cada agente.

---

## Arquivos

```
agents/
├── README.md                              # Este arquivo
├── getshake-briefing-intake.md            # IRIS — System prompt do agente de briefing
├── getshake-proposal-generator.md         # NEXO — System prompt do agente de proposta
└── getshake-creator-presentation.md       # RADAR — System prompt do agente de apresentação
```

---

## Para Usar

Cada arquivo `.md` contém o system prompt completo do agente. Para ativar:

1. Abrir nova sessão no Claude
2. Colar o conteúdo do arquivo como system prompt
3. Usar a frase de ativação para iniciar a sessão
4. Seguir o protocolo de coleta de inputs descrito no próprio agente

---

## Manutenção

Os agentes devem ser revisados quando houver mudanças em:
- Metodologia SHAKE.AI (pipeline, critérios, métricas)
- Templates de proposta ou contrato
- Precificação e modelos comerciais
- Diretrizes de tom de voz da marca
