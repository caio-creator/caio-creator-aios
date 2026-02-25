# P01 — Análise Competitiva (Supplemento do Briefing)

**Fase:** 1 de 9 (suplemento)
**Objetivo:** Mapear o cenário competitivo com profundidade para identificar espaços de diferenciação únicos

---

## Quando Usar

Use este prompt quando o briefing inicial gerou informações superficiais sobre concorrentes, ou quando a análise competitiva precisa ser mais rigorosa antes de avançar para o posicionamento.

---

## Prompt Principal

```
Você é um Estrategista de Marca especializado em análise competitiva. Com base nos dados abaixo, conduza uma análise completa do cenário competitivo de [NOME_DA_MARCA] no setor de [SETOR].

━━━ DADOS DA MARCA ━━━
[RESUMO DO BRIEFING — principais informações sobre a marca]

━━━ ANÁLISE COMPETITIVA ━━━

Para cada concorrente direto identificado, analise:

**1. CONCORRENTES DIRETOS**
Para cada concorrente (use os mencionados no briefing + adicione até 2 relevantes que faltaram):
- Posicionamento central: o que eles prometem
- Público-alvo aparente: para quem falam
- Tom de comunicação: como se expressam
- Pontos fortes: onde são genuinamente melhores
- Pontos cegos: onde são fracos ou genéricos
- Assinatura visual/verbal: o que os torna reconhecíveis

**2. CONCORRENTES INDIRETOS**
Quem mais compete pela mesma atenção ou orçamento do cliente — mesmo sendo de categoria diferente?

**3. MAPA DE POSICIONAMENTO**
Crie um mapa conceitual com 2 eixos relevantes para este setor (ex: preço × especialização, tradição × inovação) e posicione todos os players, incluindo [NOME_DA_MARCA].

**4. ESPAÇOS VAZIOS**
Com base no mapa, identifique:
- Quais posições estão saturadas (evitar)
- Quais posições estão sub-exploradas (oportunidades)
- Qual posição seria autêntica E diferenciada para [NOME_DA_MARCA]

**5. ANÁLISE DE LINGUAGEM**
Quais palavras/conceitos os concorrentes usam tanto que já perderam valor? O que ninguém está dizendo que seria verdadeiro para [NOME_DA_MARCA]?

━━━ CONCLUSÃO ━━━

Termine com 3 insights estratégicos diretos:
1. A posição mais defensável para [NOME_DA_MARCA] baseada no mercado real
2. O território de linguagem que está disponível
3. O risco competitivo mais imediato a considerar
```

---

## Prompt de Refinamento — Benchmarks de Comunicação

```
Agora analise especificamente como os principais concorrentes se comunicam:

Para [CONCORRENTE 1], [CONCORRENTE 2], [CONCORRENTE 3]:
- Analise 3 peças de comunicação recentes (posts, landing pages, campanhas)
- Qual é o padrão de linguagem? Formal, informal, técnico, emocional?
- O que eles nunca diriam? Onde estão seus limites implícitos?
- Qual é o "jeito certo" de fazer as coisas nesse setor — e quem está quebrando esse padrão?

Identifique: o que seria ousado mas legítimo para [NOME_DA_MARCA] dizer que nenhum concorrente diria?
```

---

## Output Esperado

Seção "Contexto Competitivo" no `brand-briefing.md`:

```markdown
## Contexto Competitivo

### Concorrentes Diretos
[tabela com players, posicionamento, pontos fortes/fracos]

### Mapa de Posicionamento
[descrição dos eixos e posição de cada player]

### Espaços de Diferenciação
[oportunidades identificadas]

### Vocabulário Saturado
[palavras a evitar por serem commodities no setor]
```

---

## Critérios de Qualidade

- [ ] Pelo menos 3 concorrentes diretos analisados em profundidade
- [ ] Mapa de posicionamento com eixos relevantes ao setor
- [ ] Espaços vazios identificados com evidência
- [ ] Vocabulário saturado listado

---

## Próximo Passo

→ `P02-compass.md` (Fase 2 — Bússola de Posicionamento)
