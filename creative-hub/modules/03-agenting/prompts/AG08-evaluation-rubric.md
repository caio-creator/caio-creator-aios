# AG08 — RUBRICA DE AVALIAÇÃO
> Criar critérios sistemáticos para avaliar se um agente está performando como esperado

---

## Prompt Principal

```
Com base em toda a documentação criada para o agente [NOME],
crie uma rubrica de avaliação completa para medir se o agente está performando como esperado.

Uma rubrica de avaliação não é apenas um checklist.
É um sistema de pontuação calibrado que permite avaliar diferentes aspectos
do comportamento do agente com critérios claros e diferenciados.

---

## DIMENSÃO 1: QUALIDADE DO OUTPUT

[Avalia se o que foi entregue é de alta qualidade]

### 1.1 — Completude
| Nível | Critério | Pontuação |
|-------|---------|-----------|
| Exemplar | Todas as seções previstas presentes, com profundidade além do mínimo | 4 |
| Satisfatório | Todas as seções presentes, atendendo ao mínimo esperado | 3 |
| Básico | Seção(ões) superficiais ou com lacunas não-críticas | 2 |
| Insatisfatório | Seções críticas ausentes ou incompletas | 1 |
| Falha | Output não serve ao propósito da task | 0 |

**Peso:** [X%]

### 1.2 — Precisão e Confiabilidade
[Como avaliar se as informações/recomendações são corretas e confiáveis]

| Nível | Critério | Pontuação |
|-------|---------|-----------|
| Exemplar | [Descrição do nível máximo] | 4 |
| Satisfatório | [Descrição do nível adequado] | 3 |
| Básico | [Descrição do nível mínimo aceitável] | 2 |
| Insatisfatório | [Descrição de output problemático] | 1 |
| Falha | [Descrição de falha crítica] | 0 |

**Peso:** [X%]

### 1.3 — [Critério específico do domínio deste agente]
[Adicione quantas dimensões de qualidade forem relevantes para este agente específico]

---

## DIMENSÃO 2: FIDELIDADE À PERSONA E INSTRUÇÕES

[Avalia se o agente operou dentro do que foi especificado]

### 2.1 — Aderência ao escopo
| Nível | Critério | Pontuação |
|-------|---------|-----------|
| Exemplar | Permaneceu no escopo e identificou ativamente o que estava fora | 4 |
| Satisfatório | Operou dentro do escopo sem problemas | 3 |
| Básico | Uma ou duas instâncias de slight scope creep | 2 |
| Insatisfatório | Operou regularmente fora do escopo | 1 |
| Falha | Escopo completamente ignorado | 0 |

**Peso:** [X%]

### 2.2 — Consistência de persona/voz
| Nível | Critério | Pontuação |
|-------|---------|-----------|
| Exemplar | Voz/persona distinguível em todas as interações, mesmo situações de borda | 4 |
| Satisfatório | Voz/persona consistente na maioria das interações | 3 |
| Básico | Algumas inconsistências de voz, mas reconhecível | 2 |
| Insatisfatório | Persona frequentemente perdida, especialmente em situações difíceis | 1 |
| Falha | Nenhuma persona distinguível | 0 |

**Peso:** [X%]

---

## DIMENSÃO 3: COMPORTAMENTO COM O USUÁRIO

[Avalia a qualidade da interação, não apenas do output]

### 3.1 — Clareza de comunicação
| Nível | Critério | Pontuação |
|-------|---------|-----------|
| Exemplar | Usuário nunca precisa pedir reformulação ou esclarecimento | 4 |
| Satisfatório | Comunicação clara na maioria das interações | 3 |
| Básico | Ocasionalmente ambíguo ou difícil de seguir | 2 |
| Insatisfatório | Comunicação frequentemente confusa ou inadequada | 1 |
| Falha | Comunicação não serve ao usuário | 0 |

**Peso:** [X%]

### 3.2 — Gestão de ambiguidade
| Nível | Critério | Pontuação |
|-------|---------|-----------|
| Exemplar | Identifica ambiguidade, clarifica precisamente, age com base na clarificação | 4 |
| Satisfatório | Clarifica quando necessário, resposta adequada à clarificação | 3 |
| Básico | Clarifica às vezes, outras vezes assume incorretamente | 2 |
| Insatisfatório | Raramente clarifica — age baseado em suposições problemáticas | 1 |
| Falha | Ignora ambiguidade sistematicamente | 0 |

**Peso:** [X%]

---

## DIMENSÃO 4: ADERÊNCIA A CONSTRAINTS

[Avalia se os guardrails estão sendo respeitados]

### 4.1 — Hard Constraints
| Resultado | Critério | Pontuação |
|-----------|---------|-----------|
| Aprovado | Nenhum hard constraint violado | PASSA |
| Reprovado | Qualquer hard constraint violado | FALHA AUTOMÁTICA |

**Nota: Violação de hard constraint invalida a avaliação inteira.**

### 4.2 — Soft Constraints e Quality Gates
| Nível | Critério | Pontuação |
|-------|---------|-----------|
| Exemplar | Todos os quality gates passados, soft constraints respeitados | 4 |
| Satisfatório | Quality gates passados, uma ou duas violações de soft constraint justificadas | 3 |
| Básico | A maioria dos quality gates passados, algumas violações | 2 |
| Insatisfatório | Quality gates frequentemente falhando | 1 |
| Falha | Quality gates sistematicamente violados | 0 |

**Peso:** [X%]

---

## SISTEMA DE PONTUAÇÃO

**Cálculo:**
```
Score = (D1 × peso%) + (D2 × peso%) + (D3 × peso%) + (D4 × peso%)
Score máximo: 4.0
```

**Pesos sugeridos (ajuste por agente):**
| Dimensão | Peso Sugerido | Peso Deste Agente |
|----------|--------------|-------------------|
| D1 — Qualidade do Output | 40% | [X%] |
| D2 — Fidelidade à Persona | 25% | [X%] |
| D3 — Comportamento com Usuário | 20% | [X%] |
| D4 — Constraints | 15% | [X%] |
| **Total** | **100%** | **100%** |

**Limiares de decisão:**
| Score | Veredito | Ação |
|-------|---------|------|
| 3.5-4.0 | Excelente | Agente operando acima do esperado |
| 3.0-3.4 | Satisfatório | Aprovado — monitorar pontos de melhoria |
| 2.5-2.9 | Básico | Aprovado com observações — revisão em 2 semanas |
| 2.0-2.4 | Insatisfatório | Revisão do system prompt necessária |
| < 2.0 | Reprovado | Redoc completo do agente necessário |
| FALHA (HC) | Crítico | Pausa imediata — constraint violation |

---

## PROTOCOLO DE AVALIAÇÃO

### Frequência recomendada:
- Avaliação inicial: após primeiras 5-10 interações
- Avaliação contínua: a cada 30 interações ou mensalmente
- Avaliação de incidente: sempre após uma falha identificada

### Processo:
1. Selecione amostra de [N] interações recentes
2. Avalie cada interação nas 4 dimensões
3. Calcule score médio
4. Documente evidências específicas para cada nível atribuído
5. Identifique o padrão de falha mais crítico
6. Defina ação de melhoria prioritária

### Template de avaliação individual:
```
Data: [Data]
Interação avaliada: [Descrição breve]
Avaliador: [Quem avaliou]

D1 — Qualidade: [0-4] | Evidência: [O que observou]
D2 — Fidelidade: [0-4] | Evidência: [O que observou]
D3 — Comportamento: [0-4] | Evidência: [O que observou]
D4 — Constraints: [PASSA/FALHA + 0-4] | Evidência: [O que observou]

Score: [X.X]
Veredito: [Excelente/Satisfatório/Básico/Insatisfatório/Reprovado/Crítico]

Pontos de melhoria: [O que deve ser ajustado]
Ação imediata necessária: [SIM/NÃO — se sim, o quê]
```

---

## OUTPUT ESPERADO

1. Rubrica com as 4 dimensões completas e todos os níveis definidos
2. Pesos configurados para este agente específico
3. Tabela de limiares de decisão
4. Protocolo de avaliação com frequência e processo
5. Template de avaliação individual pronto para uso

Entregue a rubrica calibrada para [NOME DO AGENTE] — com critérios específicos ao domínio
deste agente inseridos nas seções relevantes.
```

---

## Prompt de Refinamento — Calibração da Rubrica

Use após a primeira rodada de avaliações:

```
Realizei [N] avaliações do agente [NOME] usando a rubrica criada.

Problema identificado: [O que está funcionando mal na rubrica]

Exemplos:
- Avaliação X recebeu score [Y] mas claramente é [melhor/pior] do que isso
- O critério [Z] é muito vago — dois avaliadores deram notas diferentes para o mesmo output
- A dimensão [D] está peso pesado demais / de menos

Ajuste a rubrica para:
1. Tornar o critério [Z] mais específico e verificável
2. Recalibrar os pesos com base nos problemas observados
3. Adicionar exemplos âncora para os níveis mais difíceis de avaliar
```

---

## Critérios de Qualidade

- [ ] Rubrica tem 4 dimensões com pelo menos 2 sub-critérios cada
- [ ] Cada nível (0-4) tem critério descritivo concreto, não apenas "bom/ruim"
- [ ] Hard Constraint tem tratamento binário (não entra na média)
- [ ] Pesos somam 100%
- [ ] Limiares de decisão têm ações associadas (não apenas rótulos)
- [ ] Protocolo de avaliação tem frequência e processo definidos
- [ ] Template de avaliação individual está pronto para uso imediato
