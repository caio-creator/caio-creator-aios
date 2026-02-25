# P05 — Story Bank (Banco de Histórias)

**Fase:** 5 de 9
**Objetivo:** Criar um banco de histórias-semente que alimenta o conteúdo da marca por meses — cada semente pode ser expandida em múltiplos formatos

---

## Quando Usar

Use após criar o Manifesto. O Story Bank é o arsenal narrativo da marca — não histórias prontas, mas sementes com personagens, conflito e lição que qualquer criador de conteúdo pode expandir.

---

## Prompt Principal

```
Você é um Estrategista de Conteúdo especializado em storytelling de marca. Com base em tudo que sabemos sobre [NOME_DA_MARCA], crie o Story Bank — 10 histórias-semente organizadas por tipo narrativo.

━━━ CONTEXTO ━━━
[INSERIR BRIEFING + BRAND STORY + MANIFESTO + PERSONA]

━━━ OS 10 TIPOS DE HISTÓRIA ━━━

Para cada tipo, crie UMA história-semente para [NOME_DA_MARCA]:

**TIPO 1: A HISTÓRIA DE ORIGEM**
A narrativa de como tudo começou — condensada e impactante.
Personagem central: o fundador ou a situação fundadora.
Conflito: o status quo inaceitável.
Lição: por que a marca precisa existir.

**TIPO 2: A HISTÓRIA DO CLIENTE TRANSFORMADO**
Um cliente real (ou composto) antes e depois de usar a marca.
Não fala do produto — fala da vida que mudou.
Personalagem central: o cliente (herói), a marca (mentor).
Estrutura: problema → descoberta → transformação → nova realidade.

**TIPO 3: A HISTÓRIA DO ERRO E APRENDIZADO**
Algo que deu errado — um erro real da empresa ou do fundador.
Por que é poderosa: mostra vulnerabilidade e humanidade.
Conflito: a falha e suas consequências.
Lição: o que mudou por causa disso.

**TIPO 4: A HISTÓRIA DA CRENÇA CONTRAINTUITIVA**
Uma afirmação que parece errada mas que a marca prova ser verdadeira.
Começa com: "A maioria das pessoas acredita que..."
Termina com: "Mas nós descobrimos que..."
Evidência: dado, caso, ou observação que prova o ponto.

**TIPO 5: A HISTÓRIA DO BASTIDOR**
O que acontece por trás das câmeras — o processo, o detalhe obsessivo, o cuidado invisível.
Por que é poderosa: prova o diferencial sem falar do diferencial.
Personagem central: quem trabalha na marca ou o processo de criação.

**TIPO 6: A HISTÓRIA DO MOMENTO DE VIRADA**
Um momento específico em que tudo poderia ter ido diferente.
Conflito: a decisão difícil ou o risco tomado.
Lição: por que valeu a pena.

**TIPO 7: A HISTÓRIA DO DETALHE**
Um detalhe pequeno que tem um significado grande.
Por que é poderosa: revela os valores da marca através da especificidade.
Estrutura: observação de detalhe → por que existe → o que diz sobre a marca.

**TIPO 8: A HISTÓRIA DA COMPARAÇÃO**
Antes e depois — não do cliente, mas do setor ou do problema.
Como era antes da marca existir × como é hoje.
Ou: como [NOME_DA_MARCA] faz × como o setor tipicamente faz.

**TIPO 9: A HISTÓRIA DA PERGUNTA**
Começa com uma pergunta que o público gostaria de ter feito.
A história responde de forma inesperada.
Pode ser: "A pergunta que nenhum cliente quer fazer é..."

**TIPO 10: A HISTÓRIA DO LEGADO**
Para onde a marca está indo — o futuro que está construindo.
Não é uma projeção de mercado — é uma visão emocional.
Pergunta central: "Daqui a 10 anos, o que terá mudado por causa de [NOME_DA_MARCA]?"

━━━ FORMATO DE CADA SEMENTE ━━━

Para cada uma das 10 histórias, entregue:

**Título:** [nome da história]
**Tipo:** [qual dos 10 tipos]
**Personagem central:** [quem protagoniza]
**Conflito:** [o problema ou tensão central]
**Núcleo narrativo:** [3-5 frases — a essência da história]
**Lição ou revelação:** [o que o leitor aprende ou sente]
**Expansões possíveis:**
  - Post de Instagram: [como usar]
  - Reels/TikTok: [ângulo para vídeo]
  - E-mail marketing: [abertura sugerida]
  - Artigo de blog: [ângulo de profundidade]
```

---

## Prompt de Refinamento — Expandir Uma Semente

```
Escolha a história-semente de TIPO [X] e expanda em 3 formatos:

**FORMATO 1: Post de Instagram (carrossel)**
- Tela 1: Gancho (provocação ou dado inesperado)
- Telas 2-5: Desenvolvimento da história
- Tela 6: Lição ou conclusão
- Tela 7: CTA

**FORMATO 2: Roteiro de Reels (60 segundos)**
- Segundos 0-5: Gancho visual e verbal
- Segundos 5-45: Desenvolvimento
- Segundos 45-55: Lição
- Segundos 55-60: CTA

**FORMATO 3: E-mail marketing**
- Assunto: [3 opções de subject line]
- Abertura: [história sem spoiler]
- Desenvolvimento: [história completa]
- Fechamento: [lição + CTA]
```

---

## Output Esperado

**Arquivo:** `clients/[CLIENTE]/content/story-bank.md`

```markdown
# Story Bank — [NOME DA MARCA]

## Instruções de Uso
[como expandir as sementes nos diferentes formatos]

## História 1: [Título]
[estrutura completa]

[repetir para 10 histórias]

## Registro de Expansões
[rastrear quais histórias já foram publicadas e em quais formatos]
```

---

## Critérios de Qualidade

- [ ] 10 tipos de história cobertos
- [ ] Cada semente tem personagem, conflito e lição claros
- [ ] Expansões possíveis listadas para cada formato
- [ ] Histórias são específicas de [NOME_DA_MARCA] — não genéricas

---

## Próximo Passo

→ `P06-content-pillars.md` (Fase 6 — Linha Editorial)
