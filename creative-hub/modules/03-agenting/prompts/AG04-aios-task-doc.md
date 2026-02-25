# AG04 — TASK DOC AIOS
> Cria documentação de task no padrão Synkra AIOS para integração ao framework

---

## Prompt Principal

```
Com base no briefing do agente/processo [NOME] realizado em AG01,
crie uma task doc no padrão Synkra AIOS.

Tasks AIOS são diferentes de system prompts — elas são documentos de WORKFLOW,
não de PERSONA. Uma task define: o que precisa acontecer, em que ordem, quais são
as pré-condições, o que valida que foi bem feito, e qual é o output esperado.

---

## ESTRUTURA OBRIGATÓRIA DE TASK DOC AIOS

Gere o documento completo neste formato:

---

# [NOME DA TASK]
> Task ID: [task-nome-kebab-case]
> Executor padrão: @[agente-responsável]
> Versão: [X.0] | Criado: [Data]

---

## Propósito

[1-3 parágrafos explicando:
- Por que esta task existe
- Qual problema ela resolve
- Que valor ela entrega ao processo maior]

---

## Pré-condições

Para iniciar esta task, os seguintes itens devem existir:

**Artefatos necessários:**
- [ ] [Arquivo/documento que deve existir antes]
- [ ] [Recurso ou input necessário]

**Estado requerido:**
- [O que deve ter acontecido antes (ex: "Story deve estar em status Ready")]
- [Condição de contexto necessária]

**Dependências de agente:**
- [Agente que deve ter executado tarefa anterior, se aplicável]

---

## Elicitação

> `elicit: [true/false]`

[Se elicit: true — liste aqui as perguntas que o agente deve fazer ao usuário antes de executar]

**Pontos de elicitação:**
1. [Pergunta 1 — quando fazer, o que precisa da resposta]
2. [Pergunta 2]
3. [Pergunta N]

**Decisões que precisam de confirmação:**
- [Decisão com trade-off que o usuário deve resolver]
- [Decisão de escopo que pode variar]

---

## Execução

### Passo 1: [Nome do Passo]
**Objetivo:** [O que este passo alcança]

**Ação:**
[Instrução detalhada de O QUE FAZER — não como o agente deve falar, mas o que deve produzir]

**Ferramentas/recursos:**
- [Ferramenta ou referência necessária]
- [Template ou data file a consultar]

**Output deste passo:** [Artefato ou estado gerado]

---

### Passo 2: [Nome do Passo]
**Objetivo:** [O que este passo alcança]

**Ação:**
[Instrução detalhada]

**Decisão:**
Se [condição A] → [ação A]
Se [condição B] → [ação B]

**Output deste passo:** [Artefato ou estado gerado]

---

### Passo 3: [Nome do Passo]
(Continue para quantos passos forem necessários — ideal 3-7 passos)

---

## Pontos de Parada (Elicit no Meio da Execução)

> Use esta seção se houver momentos no fluxo onde o agente DEVE pausar e consultar o usuário antes de continuar.

**Parada X — após Passo [N]:**
- Mostrar: [O que apresentar ao usuário]
- Perguntar: [Que decisão precisa da aprovação]
- Se aprovado: [Continuar para Passo N+1]
- Se reprovado: [Revisitar Passo N com novo input]

---

## Output Esperado

**Artefatos gerados por esta task:**
| Artefato | Localização | Formato |
|----------|------------|---------|
| [Nome do arquivo] | [Caminho relativo] | [Markdown / YAML / JSON] |
| [Nome do arquivo] | [Caminho relativo] | [Formato] |

**Estado do sistema após execução:**
- [O que mudou no projeto/workspace depois que a task roda]
- [Status que algum item deve ter mudado]

---

## Critérios de Qualidade

Antes de marcar a task como concluída, verificar:

### Qualidade do processo:
- [ ] [Critério 1 — verificável, binário]
- [ ] [Critério 2 — verificável, binário]
- [ ] [Critério 3 — verificável, binário]

### Qualidade do output:
- [ ] [Critério do artefato 1]
- [ ] [Critério do artefato 2]
- [ ] [Critério do artefato 3]

**Definição de Done:**
[Frase clara que define quando esta task está genuinamente completa]

---

## Pós-condições

Após execução bem-sucedida:
- [O que deve ser atualizado no workspace]
- [Qual agente/task deve ser notificado ou ativado]
- [O que o usuário deve saber/receber]

**Próxima task sugerida:** [task-nome] executada por @[agente]

---

## Tratamento de Erros

| Situação | Ação |
|----------|------|
| [Erro/bloqueio comum 1] | [Como resolver] |
| [Erro/bloqueio comum 2] | [Como resolver] |
| [Input insuficiente] | [Pedir mínimo necessário] |
| [Fora do escopo da task] | [Como encaminhar] |

---

## Notas de Implementação

[Qualquer context adicional que um agente ou desenvolvedor precisa para usar esta task corretamente]

**Referências:**
- [Task relacionada ou predecessor]
- [Template utilizado]
- [Data file consultado]
```

---

## Prompt de Refinamento — Validação de Completude

Use para verificar se a task doc está pronta para integração AIOS:

```
Avalie se esta task doc de [NOME DA TASK] está pronta para integração ao Synkra AIOS:

1. PRÉ-CONDIÇÕES: Estão específicas o suficiente? Um agente saberia com certeza se elas estão satisfeitas?

2. ELICITAÇÃO: Os pontos de elicitação cobrem todos os casos onde o agente precisaria de input humano?
   Há algum ponto de decisão não-óbvio que deveria ser perguntado mas não está?

3. PASSOS: A sequência é lógica e completa? Há algum gap entre um passo e o próximo?
   Algum passo requer uma decisão não mapeada?

4. CRITÉRIOS DE QUALIDADE: São verificáveis? "Checklist OK" é aceitável, "parece bom" não é.

5. TRATAMENTO DE ERROS: Os erros mais prováveis estão mapeados?

6. INTEGRAÇÃO: As pós-condições conectam corretamente com o que vem depois no workflow?

Identifique os 3 gaps mais críticos e proponha correções.
```

---

## Critérios de Qualidade

- [ ] Task ID está no formato kebab-case
- [ ] Pré-condições são binárias e verificáveis
- [ ] Elicitação mapeia todas as decisões que precisam de input humano
- [ ] Passos têm objetivo, ação, e output claramente separados
- [ ] Há pelo menos 1 ponto de parada no meio se a task for complexa
- [ ] Output tem localização e formato definidos
- [ ] Critérios de qualidade são binários (não subjetivos)
- [ ] Tratamento de erros cobre os 3+ casos mais prováveis
- [ ] Pós-condições conectam ao workflow maior

---

## Localização do Artefato

Tasks AIOS ficam em:
`creative-hub/tasks/[nome-da-task].md`

Para integração ao core do AIOS:
`.aios-core/development/tasks/[nome-da-task].md`

---

## Próximo Passo
- Para workflow multi-task → **AG05**
- Para constraints detalhados → **AG07**
- Para testar a task → **AG08**
