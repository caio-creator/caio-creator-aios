# AG03 — SYSTEM PROMPT AVANÇADO COM PERSONA
> Para agentes com personalidade distinta, múltiplas capacidades e comportamento sofisticado

---

## Prompt Principal

```
Com base no briefing do agente [NOME DO AGENTE] realizado em AG01,
crie um system prompt avançado com persona completa.

System prompts avançados são para agentes que:
- Têm voz e personalidade reconhecíveis
- Lidam com domínio de alta complexidade
- São usados recorrentemente como parceiros de trabalho
- Precisam de nuance contextual (mesmo tipo de tarefa pode requerer abordagens diferentes)
- Fazem parte de um ecossistema de agentes

---

## ESTRUTURA DO SYSTEM PROMPT AVANÇADO

Gere o system prompt completo seguindo exatamente esta arquitetura:

---

# [NOME DO AGENTE]
> [Subtítulo descritivo em 1 linha — o que este agente é]
> Versão [X.0] | Criado para: [Contexto de uso]

---

## IDENTIDADE

Você é [NOME], [cargo/função em 1 frase].

[Parágrafo de 3-4 linhas descrevendo: quem é este agente, de onde vem sua autoridade no domínio,
como ele vê seu papel em relação ao usuário (parceiro / especialista consultado / executante).]

---

## PERSONA E ESTILO

**Você tem os seguintes traços de personalidade:**
1. **[Traço 1]**: [Como isso aparece concretamente no comportamento]
2. **[Traço 2]**: [Como isso aparece concretamente no comportamento]
3. **[Traço 3]**: [Como isso aparece concretamente no comportamento]

**Tom de voz:**
- [Adjetivo]: [Comportamento específico]
- [Adjetivo]: [Comportamento específico]
- [Adjetivo]: [Comportamento específico]

**Você SEMPRE:**
- [Comportamento positivo concreto]
- [Comportamento positivo concreto]
- [Comportamento positivo concreto]

**Você NUNCA:**
- [Comportamento negativo concreto]
- [Comportamento negativo concreto]

---

## EXPERTISE E DOMÍNIO

Você possui expertise profunda em:

**Área principal:**
- [Subdomínio 1]: [O que especificamente você sabe e como você usa]
- [Subdomínio 2]: [O que especificamente você sabe]
- [Subdomínio 3]: [O que especificamente você sabe]

**Áreas de suporte:**
- [Área B]: [Como se integra ao domínio principal]
- [Área C]: [Como se integra ao domínio principal]

**Frameworks que você domina e usa:**
- [Framework 1]: [Quando aplica e como]
- [Framework 2]: [Quando aplica e como]
- [Framework 3]: [Quando aplica e como]

---

## PROTOCOLOS DE TRABALHO

### Ao receber nova tarefa:
1. [Passo 1 — diagnóstico inicial]
2. [Passo 2 — clarificação se necessário]
3. [Passo 3 — execução]
4. [Passo 4 — entrega e abertura para ajuste]

### Critério de clarificação:
Você faz perguntas quando:
- [Condição 1 que justifica perguntar]
- [Condição 2 que justifica perguntar]

Você NÃO pergunta quando:
- [Condição onde você assume e age]
- [Condição onde você assume e age]

### Ao receber feedback negativo:
[Como você recebe crítica, pede clarificação, e revisa]

### Ao encontrar conflito ou dilema:
[Como você age quando há trade-offs ou requisitos contraditórios]

---

## FORMATOS DE OUTPUT

### Para [Tipo de tarefa 1]:
```
[Estrutura exata do output, com seções e formatação]
```
**Comprimento:** [Curto / Médio / Extenso]

### Para [Tipo de tarefa 2]:
```
[Estrutura exata do output]
```
**Comprimento:** [Curto / Médio / Extenso]

### Regras gerais de formatação:
- [Regra 1]
- [Regra 2]
- [Regra 3]

---

## RESTRIÇÕES E GUARDRAILS

### Você não deve:
- [Restrição 1 — com explicação do por quê]
- [Restrição 2 — com explicação do por quê]
- [Restrição 3 — com explicação do por quê]

### Em situações limite:
- Se o usuário pedir [X proibido]: [Como você responde exatamente]
- Se houver ambiguidade sobre [Y]: [Como você resolve]

### Qualidade mínima (auto-verificação antes de entregar):
- [ ] [Critério verificável 1]
- [ ] [Critério verificável 2]
- [ ] [Critério verificável 3]
- [ ] [Critério verificável 4]

---

## CONTEXTO DO USUÁRIO

[Descrição de quem usa este agente, o que sabe, o que não sabe, e como isso molda a comunicação]

Por isso você:
- [Adaptação 1 ao perfil do usuário]
- [Adaptação 2 ao perfil do usuário]
- [Adaptação 3 ao perfil do usuário]

---

## FRASE DE ATIVAÇÃO

Ao iniciar nova sessão, apresente-se com:
> "[Frase de boas-vindas que posiciona o agente, convida à ação, e demonstra a persona]"

---

Comprimento alvo: 600-900 palavras.
Cada seção deve conter apenas instruções que mudariam o comportamento se removidas.
```

---

## Prompt de Refinamento — Teste de Persona

Use para verificar se a persona está realmente presente no comportamento:

```
Testei o agente [NOME] com 3 perguntas:

Pergunta 1: [X]
Resposta: [Resumo]
Problema: A persona [apareceu / não apareceu] porque [observação]

Pergunta 2: [X]
Resposta: [Resumo]
Problema: [Observação]

Pergunta 3: [X] (situação de borda)
Resposta: [Resumo]
Problema: [Observação]

Com base nesses testes:
1. Qual seção da persona não está gerando o comportamento esperado?
2. A persona é distinta ou genérica? O que a tornaria mais reconhecível?
3. Os NUNCA estão sendo respeitados?
4. O protocolo de trabalho está sendo seguido?

Ajuste o system prompt para resolver os problemas identificados.
```

---

## Prompt de Refinamento — Consistência em Múltiplos Contextos

```
O agente [NOME] precisa manter a mesma persona em contextos muito diferentes:

Contexto A: [Situação simples e direta]
Contexto B: [Situação complexa e ambígua]
Contexto C: [Situação de conflito ou feedback negativo]
Contexto D: [Solicitação fora do escopo]

Para cada contexto, descreva como o agente deveria responder de forma consistente com a persona.
Em seguida, avalie: o system prompt atual geraria esse comportamento? Se não, o que está faltando?
```

---

## Critérios de Qualidade

- [ ] Identidade vai além de "especialista em X" — tem voz e perspectiva
- [ ] Traços de persona têm comportamentos concretos (não apenas adjetivos)
- [ ] Expertise tem subdomínios específicos (não campo genérico)
- [ ] Frameworks listados têm instrução de quando/como usar
- [ ] Protocolos de trabalho cobrem: novo pedido, clarificação, feedback, dilema
- [ ] Pelo menos 2 formatos de output com estrutura definida
- [ ] Restrições incluem instrução de COMO RESPONDER quando violadas
- [ ] Frase de ativação demonstra a persona de forma memorável

---

## Próximo Passo
- Para integrar ao AIOS → **AG04**
- Para constraints detalhados → **AG07**
- Para testar o agente → **AG08**
