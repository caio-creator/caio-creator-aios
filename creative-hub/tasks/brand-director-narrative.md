# Task: brand-director-narrative

**Agente:** @brand-director (Atlas)
**Fase:** 5 de 9 — Narrativa e Storytelling
**Versão:** 1.0.0

---

## Propósito

Criar o sistema narrativo completo da marca: a brand story fundacional, o manifesto e um banco de histórias prontas para uso em conteúdo. A narrativa é o que transforma uma marca em algo que as pessoas querem contar para outras pessoas.

## Pré-condições

- Fases 1 a 4 concluídas
- `briefing.md`, `positioning.md`, `audience.md` e `voice-and-tone.md` disponíveis

## Prompt Principal

```
CONTEXTO: Você é um roteirista e estrategista de narrativa de marca com experiência
em construir histórias que vendem sem parecer venda. Com base nos artefatos de
[NOME_DA_MARCA], construa o sistema narrativo completo.

━━━ ENTREGÁVEIS ━━━

1. BRAND STORY FUNDACIONAL (400-600 palavras)

   Construída obrigatoriamente em 5 atos:

   ATO 1 — O ANTES (O Cenário)
   Como era o mundo/mercado ANTES da marca existir. Qual era o problema que ninguém
   estava resolvendo adequadamente? Seja específico e emocional — mostre a dor.

   ATO 2 — O CONFLITO (O Que Não Prestava)
   O que incomodava profundamente o fundador ou o primeiro cliente. Qual foi o
   momento de "chega" — aquele ponto em que ficou claro que precisava mudar?

   ATO 3 — A VIRADA (O Insight)
   O momento de descoberta. O que o fundador/marca percebeu que outros não tinham
   percebido? Qual foi a ideia, o acidente, a conversa ou o experimento que mudou tudo?

   ATO 4 — A TRANSFORMAÇÃO (O Que Construíram)
   Como a marca surgiu e o que mudou para os primeiros clientes. Evidência real
   da transformação — preferência por detalhes concretos, não abstrações.

   ATO 5 — O LEGADO (Por Que Importa)
   Por que a marca vai continuar importando. Qual é o impacto no mundo se der certo?
   Não "missão corporativa" — o impacto real na vida de pessoas reais.

   REGRAS DE OURO DA BRAND STORY:
   - O cliente/público é o herói — a marca é o mentor ou o catalisador
   - Especificidade > Generalidade (use nomes, datas, lugares reais)
   - Autenticidade > Dramatização (erro real é melhor que vitória genérica)
   - Tom deve seguir o voice-and-tone definido

2. MANIFESTO DA MARCA (200-300 palavras)

   Um documento apaixonado que declara as crenças da marca.

   ESTRUTURA OBRIGATÓRIA:
   - Abertura: Uma verdade universal que o público reconhece imediatamente
   - Confronto: O que está errado com o status quo (o que incomoda a marca)
   - Crença: O que a marca acredita profundamente (seu manifesto de valores)
   - Convite: O que a marca convida o leitor a fazer ou ser

   REGRAS DO MANIFESTO:
   - Não pode soar corporativo — deve arrepiar
   - Usa "nós" e "você" — é uma conversa, não uma declaração institucional
   - Não menciona features de produto — fala de valores e visão de mundo
   - Quem discordar deste manifesto não é nosso cliente — e tudo bem

3. BANCO DE HISTÓRIAS (10 histórias-semente)

   Para cada história, forneça:
   - Título e tipo de história
   - Premissa em 3 linhas (o bastante para executar)
   - Formatos sugeridos (reels, carrossel, blog, podcast)
   - Momento ideal na jornada do cliente (descoberta, consideração, fidelização)

   TIPOS OBRIGATÓRIOS:
   - 2 histórias de transformação de cliente (before/after específico)
   - 2 histórias de bastidores/processo (como fazemos o que fazemos)
   - 2 histórias de crença/valores (por que fazemos o que fazemos)
   - 2 histórias de origem/criação (de onde veio essa ideia/produto)
   - 1 história de visão de futuro (para onde vamos)
   - 1 história de fracasso e aprendizado (humaniza a marca)

4. DIRETRIZES NARRATIVAS

   O QUE ESTA MARCA CONTA (temas recorrentes):
   - 5 temas que aparecem sempre nas histórias desta marca
   - O fio narrativo que conecta tudo

   O QUE ESTA MARCA NUNCA CONTA:
   - 3-5 limites narrativos (o que está fora do escopo de histórias)
   - Por que esses limites existem (coerência com valores)

   O NARRADOR:
   - Perspectiva principal das histórias (1ª pessoa do fundador? 3ª do cliente? Plural da marca?)
   - Tom emocional predominante (esperançoso, ativista, íntimo, provocador?)

━━━ CONTEXTO ━━━

BRIEFING: [INSERIR BRAND-BRIEFING.MD]
POSICIONAMENTO: [INSERIR POSITIONING.MD]
PERSONA PRIMÁRIA: [INSERIR SEÇÃO DE PERSONA DE AUDIENCE.MD]
VOZ E PERSONALIDADE: [INSERIR VOICE-AND-TONE.MD]
```

## Prompts de Refinamento

**Para tornar a brand story mais específica:**
```
A brand story ainda está genérica demais. Identifique no briefing: há um momento
específico, uma data, uma conversa ou um evento concreto que pode ser o centro de cada
ato? Substitua cada abstração por um detalhe real. "Sabíamos que precisávamos mudar"
→ "Em outubro de 2019, depois da terceira reunião perdida em uma semana, [NOME]..."
```

**Para fortalecer o manifesto:**
```
O manifesto atual está seguro demais. Um bom manifesto perde alguns leitores e
apaixona outros. Identifique o ponto de vista mais ousado que [MARCA] poderia defender
— algo que competidores diretos não defenderiam. Reescreva o manifesto com esse
posicionamento corajoso.
```

## Output

**Arquivos:**
- `clients/[CLIENTE]/brand-guidelines/narrative.md`
- `clients/[CLIENTE]/content/story-bank.md`

## Critérios de Qualidade

- [ ] A brand story tem detalhes específicos (nomes, datas, lugares)
- [ ] O manifesto apaixona ou divide opiniões — não é neutro
- [ ] O banco de histórias tem premissas acionáveis (podem ser executadas amanhã)
- [ ] A narrativa usa o tom de voz definido na Fase 4
- [ ] O cliente/público é o herói, não a marca

## Pós-condições

- `narrative.md` e `story-bank.md` salvos no workspace
- Próxima fase disponível: `*editorial` (Fase 6)
