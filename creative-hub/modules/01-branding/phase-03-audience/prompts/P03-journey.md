# P03 — Jornada do Cliente

**Fase:** 3 de 9
**Objetivo:** Mapear o caminho completo do cliente desde a consciência do problema até se tornar defensor da marca

---

## Quando Usar

Use após criar as personas. A jornada do cliente conecta a estratégia à execução: ela revela onde e quando falar, o que dizer em cada etapa, e onde estão os vazios na comunicação atual.

---

## Prompt Principal

```
Você é um Especialista em Experiência do Cliente e Jornada de Compra. Com base nas personas e posicionamento abaixo, mapeie a jornada completa do cliente para [NOME_DA_MARCA].

━━━ CONTEXTO ━━━
[INSERIR PERSONAS + POSICIONAMENTO]

━━━ JORNADA EM 5 ESTÁGIOS ━━━

Para cada estágio, responda as 4 perguntas:
1. O que o cliente PENSA?
2. O que o cliente SENTE?
3. O que o cliente FAZ?
4. O que a marca deve DIZER/FAZER?

**ESTÁGIO 1: CONSCIÊNCIA (Awareness)**
O cliente percebe que tem um problema ou desejo.

- Qual é o gatilho que ativa a consciência?
- Como ele descreve o problema para si mesmo nesse momento?
- O que ele faz imediatamente (pesquisa, fala com alguém, ignora)?
- Quais canais ele usa para buscar informação inicial?
- Como [NOME_DA_MARCA] pode aparecer nesse momento?
- Qual mensagem específica deve ser dita aqui?

**ESTÁGIO 2: CONSIDERAÇÃO (Consideration)**
O cliente está ativamente avaliando soluções.

- Quais opções ele está comparando?
- Que critérios usa para comparar?
- Quem consulta para ajudar na decisão?
- O que busca online neste estágio?
- Quais objeções surgem aqui?
- Como [NOME_DA_MARCA] deve se diferenciar neste estágio?

**ESTÁGIO 3: DECISÃO (Decision)**
O cliente está pronto para comprar.

- Qual é o último gatilho para a decisão?
- O que pode fazer ele desistir na última hora?
- O que precisa estar perfeito na experiência de compra?
- Como ele prefere finalizar a compra?
- Qual é a confirmação que ele precisa para se sentir seguro?

**ESTÁGIO 4: EXPERIÊNCIA (Experience)**
O cliente usa o produto/serviço.

- Qual é o primeiro momento "uau" após a compra?
- Onde estão os momentos de fricção ou frustração mais comuns?
- Como a marca pode superar expectativas na entrega?
- Qual é o momento em que o cliente "realmente entende" o valor?
- Como documentar e celebrar os resultados do cliente?

**ESTÁGIO 5: LEALDADE E ADVOCACY (Loyalty)**
O cliente vira fã e defensor.

- O que transforma um cliente satisfeito em defensor ativo?
- O que ele precisa sentir para recomendar espontaneamente?
- Qual é a melhor forma de manter o relacionamento?
- Como a marca pode facilitar que ele indique?
- O que o faria voltar a comprar mais?

━━━ MAPA DE TOUCHPOINTS ━━━

Liste todos os pontos de contato da marca com o cliente durante a jornada:
- Antes da compra (ads, posts, boca a boca, Google, etc)
- Durante a compra (site, vendedor, proposta, etc)
- Após a compra (onboarding, suporte, e-mails, etc)

Para cada touchpoint: qual é a mensagem central e qual é a emoção desejada?

━━━ GAPS DE COMUNICAÇÃO ━━━

Com base na jornada, identifique:
- Quais estágios não têm nenhum touchpoint da marca?
- Onde o cliente fica "no escuro" sem informação?
- Onde a marca está falando mas o cliente não está ouvindo?
- Qual é a maior oportunidade de melhoria?
```

---

## Prompt de Refinamento — Mapear Emoções

```
A jornada que mapeamos está muito racional. Quero adicionar a camada emocional.

Para cada estágio da jornada, defina:
1. A emoção dominante do cliente (medo, esperança, excitação, frustração, confiança)
2. A emoção que a marca deve evocar (segurança, entusiasmo, pertencimento, orgulho)
3. O risco emocional se a comunicação errar o tom neste estágio

A comunicação deve sempre encontrar o cliente onde ele está emocionalmente — não onde a marca quer que ele esteja.
```

---

## Output Esperado

Seção no `audience.md`:

```markdown
## Jornada do Cliente

### Estágio 1: Consciência
- Pensamentos: ...
- Sentimentos: ...
- Ações: ...
- Comunicação ideal: ...

[repetir para os 5 estágios]

### Mapa de Touchpoints
[tabela: touchpoint | mensagem central | emoção desejada]

### Gaps Identificados
[lista de estágios sem cobertura adequada]
```

---

## Critérios de Qualidade

- [ ] 5 estágios mapeados com as 4 perguntas respondidas
- [ ] Camada emocional presente em cada estágio
- [ ] Touchpoints listados com mensagem e emoção
- [ ] Gaps identificados com ação recomendada

---

## Próximo Passo

→ `P04-personality.md` (Fase 4 — Personalidade e Arquétipo de Marca)
