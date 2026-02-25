# AG05 — WORKFLOW DESIGN
> Desenhar sequências multi-step ou multi-agente com gates, ramificações e tratamento de falhas

---

## Prompt Principal

```
Com base no processo [NOME DO PROCESSO] descrito no briefing,
crie um workflow design completo para uso no Synkra AIOS.

Um workflow não é uma lista de passos — é uma arquitetura de decisões.
Inclui: sequência, condições, ramificações, gates de qualidade, e tratamento de falhas.

---

## BLOCO 1: VISÃO GERAL DO WORKFLOW

**Nome do workflow:** [workflow-nome-kebab-case]
**Propósito:** [1 frase — que transformação este workflow realiza]
**Gatilho:** [O que inicia este workflow — evento, comando, ou condição]
**Outputs finais:** [Artefatos produzidos ao final]

**Executor(es):**
| Fase | Agente Principal | Agentes de Suporte |
|------|-----------------|-------------------|
| [Fase 1] | @[agente] | @[suporte] |
| [Fase 2] | @[agente] | @[suporte] |
| [Fase N] | @[agente] | — |

---

## BLOCO 2: DIAGRAMA DE FLUXO (formato textual)

Represente o workflow em formato ASCII/textual antes de detalhar cada fase:

```
[GATILHO]
    ↓
[FASE 1: Nome] — @agente
    ↓
[GATE 1: Condição de GO]
  ├── GO → [FASE 2]
  └── NO-GO → [REVISÃO] → volta para [FASE 1]
    ↓
[FASE 2: Nome] — @agente
    ↓
[DECISÃO: Condição de ramificação]
  ├── Caminho A → [FASE 3A]
  └── Caminho B → [FASE 3B]
    ↓
[FASE FINAL] — @agente
    ↓
[OUTPUT: Artefatos entregues]
```

---

## BLOCO 3: DETALHAMENTO POR FASE

Para cada fase do workflow:

### FASE [N]: [NOME]

**Executor:** @[agente]
**Task:** [task-doc-referência] (ou "a criar")
**Modo:** [Autônomo / Interativo / Requer aprovação humana]

**Input desta fase:**
- [O que entra — artefato, dado, ou estado]

**Ação central:**
[O que acontece nesta fase — o que o agente faz]

**Output desta fase:**
- [O que sai — artefato ou estado resultante]

**Critério de completude:**
- [ ] [Verificação 1]
- [ ] [Verificação 2]

**Duração estimada:** [X minutos / X horas]

---

## BLOCO 4: GATES DE QUALIDADE

Para cada gate/decisão no fluxo:

### GATE [N]: [Nome]

**Posição no workflow:** Entre [Fase X] e [Fase Y]
**Executor do gate:** @[agente] / humano

**Critérios de GO:**
- [ ] [Critério binário 1]
- [ ] [Critério binário 2]
- [ ] Mínimo de [X] de [N] critérios satisfeitos

**Resultado GO:**
- Ação: [O que acontece]
- Próxima fase: [Fase Y]

**Resultado NO-GO:**
- Ação: [O que acontece]
- Retorno para: [Fase Z com feedback específico]
- Máximo de tentativas: [N]
- Se exceder: [Escalação ou parada]

---

## BLOCO 5: TRATAMENTO DE FALHAS

| Falha | Fase Afetada | Ação | Escalação |
|-------|------------|------|-----------|
| [Tipo de falha 1] | [Fase X] | [O que fazer] | [Para quem escalar] |
| [Tipo de falha 2] | [Fase Y] | [O que fazer] | [Para quem escalar] |
| [Input inválido] | [Qualquer] | [Clarificar e reiniciar] | — |
| [Agente bloqueado] | [Qualquer] | [Pausar e notificar] | @aios-master |

**Circuit breaker:**
- Máximo de falhas antes de parar: [N]
- Timeout por fase: [X minutos]
- Estado salvo em: [Arquivo de estado]

---

## BLOCO 6: MÉTRICAS E MONITORAMENTO

**O que medir:**
| Métrica | Como medir | Alvo |
|---------|-----------|------|
| Tempo total do workflow | [Como] | [X minutos] |
| Taxa de aprovação no gate [N] | [Como] | [X%] |
| Número de iterações médio | [Como] | [X] |

**Sinal de sucesso:**
[Como saber que o workflow está funcionando bem]

**Sinal de problema:**
[Como identificar que algo precisa de ajuste]

---

## BLOCO 7: CONFIGURAÇÃO (para implementação AIOS)

```yaml
workflow:
  name: [workflow-nome]
  version: "1.0"
  trigger:
    command: "*[comando]"
    event: "[evento-opcional]"

  phases:
    - id: phase-1
      name: "[Nome da Fase 1]"
      executor: "@[agente]"
      task: "[task-file-reference]"
      mode: interactive # ou autonomous
      timeout_minutes: [N]

    - id: phase-2
      name: "[Nome da Fase 2]"
      executor: "@[agente]"
      depends_on: [phase-1]
      gate:
        type: quality_check
        pass_threshold: [N]

  error_handling:
    max_retries: [N]
    escalation_agent: "@aios-master"
    state_file: "workflow-state.json"
```

---

## OUTPUT ESPERADO

1. Diagrama de fluxo textual (Bloco 2)
2. Detalhamento completo de cada fase (Bloco 3)
3. Especificação de cada gate (Bloco 4)
4. Tabela de tratamento de falhas (Bloco 5)
5. Bloco de configuração YAML (Bloco 7)
```

---

## Prompt de Refinamento — Simplificação

Use quando o workflow ficou complexo demais:

```
Este workflow tem [N] fases e [M] gates. Parece excessivamente complexo.

Analise cada fase e gate com este critério:
- "Se eu remover esta fase, o workflow ainda produz o mesmo output com a mesma qualidade?"
- "Este gate está protegendo contra um risco real ou é burocracia?"

Proponha uma versão simplificada com no máximo [X] fases e [Y] gates.
Explique o que está sendo eliminado e qual é o risco aceito ao simplificar.
```

---

## Critérios de Qualidade

- [ ] Gatilho está definido (o que inicia)
- [ ] Todos os outputs finais estão especificados
- [ ] Diagrama de fluxo cobre todos os caminhos possíveis (feliz e infeliz)
- [ ] Cada gate tem critérios GO/NO-GO binários
- [ ] Falhas têm ação definida (não apenas "tratar erro")
- [ ] Circuit breaker impede loops infinitos
- [ ] Configuração YAML é válida e completa

---

## Próximo Passo
- Para documentar instruction set detalhado → **AG06**
- Para especificar constraints e guardrails → **AG07**
- Para criar rubrica de avaliação → **AG08**
