# P03 — ICP (Ideal Customer Profile)

**Fase:** 3 de 9
**Objetivo:** Definir o Perfil do Cliente Ideal com precisão cirúrgica — o cliente que a marca mais quer atender e que mais se beneficia dela

---

## Quando Usar

Use após definir o posicionamento (Fase 2). O ICP é o ponto de partida das personas — define quem é o cliente principal antes de criar os perfis detalhados.

---

## Prompt Principal

```
Você é um Especialista em Segmentação de Mercado. Com base no posicionamento e briefing abaixo, defina o ICP (Ideal Customer Profile) de [NOME_DA_MARCA] com máxima precisão.

━━━ CONTEXTO ━━━
[INSERIR POSICIONAMENTO + BRIEFING]

━━━ DEFINIÇÃO DO ICP ━━━

O ICP não é "todo mundo que pode comprar". É o cliente que:
- Tem o problema mais agudo que a marca resolve
- Tem capacidade e urgência de pagar pela solução
- Gera o maior valor de longo prazo para o negócio
- Torna-se defensor natural da marca após a experiência

**BLOCO 1: PERFIL OBJETIVO**

Para B2B — defina:
- Porte da empresa (faturamento, nº de funcionários)
- Setor e subsegmento específico
- Cargo e nível de senioridade do decisor
- Cargo e nível do influenciador (quem indica)
- Estágio de maturidade da empresa (startup, crescimento, escala, consolidada)
- Localização geográfica relevante

Para B2C — defina:
- Faixa etária específica (não "25-45", mas "31-38")
- Renda e poder de compra
- Localização e contexto de vida (cidade, bairro, estilo de vida)
- Ocupação e nível educacional
- Estágio de vida relevante (recém formado, casando, filhos pequenos, etc)

**BLOCO 2: PERFIL COMPORTAMENTAL**

- Como busca soluções? (Google, indicação, redes sociais, eventos, YouTube)
- Quanto tempo leva para tomar decisão de compra?
- O que precisa ver/ouvir/sentir para confiar e comprar?
- Quais objeções levanta antes de comprar?
- Como prefere ser atendido? (autoserviço, consultivo, WhatsApp, e-mail)
- O que faz antes, durante e depois de usar o produto/serviço?

**BLOCO 3: PERFIL PSICOGRÁFICO**

- Quais são os valores mais importantes para ele?
- Como ele se vê e quer ser visto pelos outros?
- Quais são seus maiores medos relacionados ao que a marca resolve?
- Quais são suas maiores aspirações no contexto de uso da marca?
- O que o mantém acordado à noite (além do problema da marca)?
- Quais marcas ele admira fora do setor — e o que essas marcas têm em comum?

**BLOCO 4: CONTEXTO DE COMPRA**

- Qual é o gatilho que faz ele buscar a solução agora?
- O que estava tentando usar antes de encontrar a marca?
- Por que a solução anterior era inadequada?
- Quem mais está envolvido na decisão de compra?
- Qual é o budget típico e como ele justifica o investimento?

━━━ SÍNTESE DO ICP ━━━

Encerre com uma descrição em prosa de 1 parágrafo: "O ICP de [NOME_DA_MARCA] é..."
Use linguagem vívida — descreva como se fosse uma pessoa real que você conhece.

━━━ ANTI-ICP ━━━

Defina também quem NÃO é o ICP — o cliente que parece ideal mas não é:
- Quem gera fricção na venda
- Quem abandona ou não vê valor
- Quem drena energia sem gerar resultado
```

---

## Prompt de Refinamento — Validar o ICP

```
O ICP que definimos parece plausível, mas quero validá-lo com os dados disponíveis.

Analise os clientes reais que [NOME_DA_MARCA] já atendeu:
- Quais têm maior LTV (tempo de relacionamento × valor pago)?
- Quais geraram mais indicações?
- Quais tiveram os resultados mais expressivos?
- O que esses clientes têm em comum que outros clientes não têm?

Compare com o ICP que definimos. Há ajustes necessários?
```

---

## Output Esperado

Seção no `audience.md`:

```markdown
## ICP — Ideal Customer Profile

### Perfil Objetivo
[dados demográficos/firmográficos]

### Perfil Comportamental
[como age, decide, consome]

### Perfil Psicográfico
[valores, medos, aspirações]

### Contexto de Compra
[gatilho, jornada, decisão]

### Síntese
[1 parágrafo em prosa]

### Anti-ICP
[quem não é o cliente ideal]
```

---

## Critérios de Qualidade

- [ ] ICP específico o suficiente para guiar decisão de canal/mídia
- [ ] Contexto de compra detalhado com gatilho claro
- [ ] Anti-ICP definido explicitamente
- [ ] Síntese em prosa — parece uma pessoa real, não uma planilha

---

## Próximo Passo

→ `P03-persona-primary.md` (criar personas detalhadas a partir do ICP)
