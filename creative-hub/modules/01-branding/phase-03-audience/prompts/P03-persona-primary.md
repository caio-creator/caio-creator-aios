# P03 — Persona Primária e Secundária

**Fase:** 3 de 9
**Objetivo:** Criar personas detalhadas e humanizadas que guiarão todas as decisões de comunicação

---

## Quando Usar

Use após definir o ICP (P03-icp). As personas são representações semificcionais dos clientes reais — mais específicas e mais humanas do que o ICP, projetadas para inspirar empatia na criação de conteúdo e comunicação.

---

## Prompt Principal

```
Você é um Especialista em Pesquisa de Usuários e Comunicação de Marca. Com base no ICP e briefing abaixo, crie 2 personas para [NOME_DA_MARCA]: a Persona Primária (ICP principal) e a Persona Secundária (segundo público relevante).

━━━ CONTEXTO ━━━
[INSERIR ICP + POSICIONAMENTO + BRIEFING]

━━━ PERSONA PRIMÁRIA ━━━

**IDENTIDADE**
- Nome fictício e foto descrita (aparência que represente o perfil)
- Idade, cidade, estado civil, filhos
- Profissão, cargo, empresa
- Renda familiar aproximada

**UM DIA NA VIDA**
Escreva em prosa: como é o dia típico desta pessoa? Do acordar até dormir — o que ela faz, pensa, consome, com quem fala? Onde a marca de [NOME_DA_MARCA] poderia aparecer nesse dia?

**OBJETIVOS E MOTIVAÇÕES**
- O que ela quer alcançar profissionalmente nos próximos 2 anos?
- O que ela quer para a vida pessoal?
- O que a motiva a sair da cama pela manhã?
- O que ela celebra quando dá certo?

**DORES E FRUSTRAÇÕES**
- Qual é o problema mais urgente no contexto do produto/serviço de [NOME_DA_MARCA]?
- O que ela já tentou que não funcionou?
- Qual é a dor emocional por trás do problema prático?
- O que ela sente quando o problema aparece? (frustração, vergonha, ansiedade, raiva?)

**LINGUAGEM E VOCABULÁRIO**
- Como ela descreve o problema com as próprias palavras?
- Quais termos usa para buscar solução? (literalmente: o que digitaria no Google)
- O que ela nunca diria (que a marca poderia errar ao usar)?
- Cite 3 frases que ela provavelmente já disse sobre o tema

**COMPORTAMENTO DE COMPRA**
- Onde descobre soluções novas?
- Quanto tempo leva para decidir?
- Quem influencia a decisão?
- O que precisa para confiar?
- O que faz antes de comprar? (pesquisa, testa, pede indicação, vê reviews)

**RELAÇÃO COM [NOME_DA_MARCA]**
- Como ela chegaria à marca?
- Qual seria o primeiro ponto de contato?
- O que ela precisaria ver/ouvir para considerar a compra?
- O que a faria virar fã e recomendar?

━━━ PERSONA SECUNDÁRIA ━━━

Repita a mesma estrutura para o segundo público mais relevante:
- Quem é (perfil diferente do primário, mas ainda relevante)
- Por que é diferente do primário
- Como a comunicação deve ser adaptada para ele

━━━ ANTI-PERSONA ━━━

Descreva brevemente o cliente que parece ideal mas não é:
- Perfil básico
- Por que parece o cliente certo
- Por que não é (o que gera fricção, frustração ou baixo valor)
- Como reconhecer esse perfil cedo para não investir esforço

━━━ IMPLICAÇÕES PARA COMUNICAÇÃO ━━━

Com base nas duas personas, responda:
1. Qual canal cada persona usa mais — e quando?
2. Qual tom de voz ressoa com cada uma?
3. Qual formato de conteúdo cada uma consome?
4. Qual objeção principal cada uma levanta antes de comprar?
5. Qual é a mensagem que fecha a venda para cada uma?
```

---

## Prompt de Refinamento — Humanizar a Persona

```
A persona que criamos ainda parece uma planilha com nome. Quero transformá-la em uma pessoa real.

Para a Persona Primária:
1. Escreva um "diário" de 3 entradas do dia em que ela descobriu o problema que [NOME_DA_MARCA] resolve
2. Escreva o que ela postou no Instagram nesse dia
3. Escreva a mensagem que ela mandou para uma amiga descrevendo a situação
4. Escreva o que ela pesquisou no Google

Isso nos dará a linguagem exata que a persona usa para descrever o problema — que é o que devemos usar na comunicação da marca.
```

## Prompt de Refinamento — Momentos de Verdade

```
Para cada persona, mapeie os 3 "momentos de verdade" mais importantes:

1. MOMENTO DO PROBLEMA — o instante em que ela se dá conta que precisa de uma solução
2. MOMENTO DA DESCOBERTA — o instante em que ela encontra [NOME_DA_MARCA]
3. MOMENTO DA DECISÃO — o instante que a faz dizer "sim, vou comprar"

Para cada momento:
- Onde ela está (física e digitalmente)?
- O que ela sente?
- O que ela precisa ver/ouvir/ler para avançar?
- Qual é a maior barreira que pode fazer ela desistir?
```

---

## Output Esperado

**Arquivo:** `clients/[CLIENTE]/brand-guidelines/audience.md`

```markdown
# Público-Alvo — [NOME DA MARCA]

## ICP
[síntese do P03-icp]

## Persona Primária: [Nome]
[estrutura completa]

## Persona Secundária: [Nome]
[estrutura completa]

## Anti-Persona
[descrição]

## Implicações para Comunicação
[tabela canais × personas × mensagens]
```

---

## Critérios de Qualidade

- [ ] Personas humanizadas — parecem pessoas reais, não planilhas
- [ ] Linguagem da persona documentada com exemplos literais
- [ ] Momentos de verdade identificados
- [ ] Anti-persona definida claramente
- [ ] Implicações para comunicação práticas e acionáveis

---

## Próximo Passo

→ `P03-journey.md` (mapear a jornada completa do cliente)
