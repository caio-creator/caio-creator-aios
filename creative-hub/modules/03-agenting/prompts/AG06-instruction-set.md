# AG06 — INSTRUCTION SET COMPLETO
> Para agentes altamente especializados que precisam de instrução em múltiplos níveis de nuance

---

## Prompt Principal

```
Com base no briefing e nos artefatos já criados para o agente [NOME],
crie um instruction set completo — o nível mais detalhado de documentação de agente.

Um instruction set vai além do system prompt. Ele documenta:
- Princípios que guiam decisões não previstas
- Playbooks para situações específicas e recorrentes
- Calibração de julgamento em situações de borda
- Hierarquia de prioridades quando há conflito

Use este nível de detalhe quando o agente opera com alto grau de autonomia
ou em situações de alta consequência onde erros têm custo real.

---

## SEÇÃO 1: PRINCÍPIOS FUNDAMENTAIS

[5-7 princípios que guiam QUALQUER decisão do agente, mesmo situações não previstas]

Cada princípio segue o formato:

**Princípio [N]: [NOME]**
[Frase que define o princípio]

*Por que este princípio existe:* [Contexto e raciocínio]

*Como aplicar:* [Comportamento concreto que este princípio gera]

*Quando conflitar com outro princípio:* [Hierarquia de resolução]

*Exemplo de aplicação:*
- Situação: [Cenário específico]
- Sem este princípio, o agente faria: [X]
- Com este princípio, o agente faz: [Y]

---

## SEÇÃO 2: PLAYBOOKS POR SITUAÇÃO

[Protocolos específicos para as situações mais recorrentes e/ou críticas]

### Playbook A: [NOME DA SITUAÇÃO]

**Quando ativar:** [Condição de trigger — como reconhecer esta situação]

**Contexto:** [Por que esta situação merece um protocolo próprio]

**Protocolo:**
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]
4. [Passo 4]

**Resultado esperado:** [O que deve ter acontecido ao final]

**Armadilhas a evitar nesta situação:**
- [Erro comum 1]
- [Erro comum 2]

**Exemplo real:**
- Situação: "[Descrição concreta]"
- O agente deveria: "[Ação correta segundo o playbook]"
- Não deveria: "[Erro a evitar]"

---

### Playbook B: [NOME DA SITUAÇÃO]
(Repita para as 3-5 situações mais importantes)

---

## SEÇÃO 3: CALIBRAÇÃO DE JULGAMENTO

[Situações de borda onde o agente precisa de orientação sobre como calibrar sua resposta]

### Borda [N]: [Nome da situação de borda]

**A tensão:** [Dois valores ou objetivos que entram em conflito]

**Fatores que puxam para [Lado A]:**
- [Fator 1]
- [Fator 2]

**Fatores que puxam para [Lado B]:**
- [Fator 1]
- [Fator 2]

**Regra de desempate:**
[Quando usar lado A vs. lado B — critério de decisão]

**Exemplos calibrados:**
| Situação | Decisão correta | Por quê |
|----------|----------------|---------|
| [Exemplo 1] | [Lado A / Lado B] | [Razão] |
| [Exemplo 2] | [Lado A / Lado B] | [Razão] |
| [Exemplo 3] | [Lado A / Lado B] | [Razão] |

---

## SEÇÃO 4: HIERARQUIA DE PRIORIDADES

[Quando há conflito entre diferentes objetivos, qual vence?]

**Em ordem de prioridade (1 = mais importante):**
1. [Objetivo de prioridade máxima] — NUNCA sacrificar
2. [Objetivo de alta prioridade] — sacrificar apenas se conflitar com #1
3. [Objetivo de prioridade média] — sacrificar se conflitar com #1 ou #2
4. [Objetivo de baixa prioridade] — sacrificar se necessário
5. [Objetivo de prioridade mínima] — preferível, não obrigatório

**Exemplos de conflito e resolução:**
| Conflito | Prioridade vence | Raciocínio |
|----------|-----------------|------------|
| [Objetivo 1] vs [Objetivo 3] | [Objetivo 1] | [Por quê] |
| [Objetivo 2] vs [Objetivo 4] | [Objetivo 2] | [Por quê] |

---

## SEÇÃO 5: COMUNICAÇÃO COM O USUÁRIO

[Instruções específicas sobre como o agente se comunica em diferentes contextos]

### Ao entregar resultado:
[Como estruturar a entrega — formato, contexto, abertura para ajuste]

### Ao fazer perguntas:
[Quando perguntar, quantas perguntas, como formular]
- Máximo de perguntas por interação: [N]
- Formato preferido: [Uma lista / Uma de cada vez / Pergunta composta]
- Quando perguntar NUNCA é adequado: [Situações onde agir é melhor que perguntar]

### Ao receber crítica ou rejeição:
[Como receber feedback negativo — validar, clarificar, revisar]

### Ao encontrar conflito com o usuário:
[Como manter a posição técnica sem ser confrontacional]

### Ao detectar que o usuário está errado:
[Como corrigir de forma útil sem ser condescendente]

---

## SEÇÃO 6: AUTO-AVALIAÇÃO

[Checklist que o agente deve rodar internamente antes de cada entrega]

**Nível 1 — Antes de responder (rápido):**
- [ ] Entendi o que foi pedido corretamente?
- [ ] Minha resposta atinge o objetivo do usuário?
- [ ] Algum limite ou constraint está sendo violado?

**Nível 2 — Antes de entregar output complexo:**
- [ ] [Critério específico do domínio 1]
- [ ] [Critério específico do domínio 2]
- [ ] [Critério específico do domínio 3]
- [ ] [Critério de qualidade 4]
- [ ] O output usa o formato correto para este tipo de tarefa?

**Nível 3 — Revisão de consistência (para projetos longos):**
- [ ] Estou sendo consistente com o que entreguei antes?
- [ ] Alguma decisão anterior deve ser revisada à luz desta nova informação?
- [ ] O usuário tem tudo que precisa para usar este output?

---

## OUTPUT ESPERADO

1. Seção de Princípios Fundamentais (5-7 princípios com exemplos)
2. Playbooks para 3-5 situações recorrentes
3. Calibração de 3-5 situações de borda
4. Hierarquia de prioridades com exemplos de resolução de conflito
5. Guia de comunicação por tipo de interação
6. Checklist de auto-avaliação em 3 níveis

Comprimento alvo: 1000-1500 palavras. Este é o documento mais detalhado da suíte.
```

---

## Critérios de Qualidade

- [ ] Princípios são genuinamente úteis para decisões não previstas (não apenas declarações genéricas)
- [ ] Cada playbook tem critério de trigger, protocolo sequencial, e exemplos
- [ ] Situações de borda têm regra de desempate clara (não apenas "depende")
- [ ] Hierarquia de prioridades é testável (dado um conflito real, há resposta correta)
- [ ] Comunicação tem instrução para os 5 tipos de situação listados
- [ ] Checklist de auto-avaliação tem itens binários (não subjetivos)

---

## Próximo Passo
- Para adicionar constraints e guardrails → **AG07**
- Para criar rubrica de avaliação → **AG08**
