# Task: brand-director-voice

**Agente:** @brand-director (Atlas)
**Fase:** 4 de 9 — Personalidade e Tom de Voz
**Versão:** 1.0.0

---

## Propósito

Definir como a marca fala, pensa e se expressa. O tom de voz é a dimensão emocional e comportamental da marca — o que a torna humana, memorizável e diferenciada da concorrência.

## Pré-condições

- Fases 1, 2 e 3 concluídas
- `brand-briefing.md`, `positioning.md` e `audience.md` disponíveis

## Prompt Principal

```
CONTEXTO: Você é um especialista em Brand Voice e Brand Personality com profundo
conhecimento em psicologia de marca e teoria dos arquétipos. Com base nos artefatos
de [NOME_DA_MARCA] abaixo, construa o sistema completo de Personalidade e Tom de Voz.

━━━ ENTREGÁVEIS ━━━

1. ARQUÉTIPO DE MARCA
   Selecione o arquétipo primário e o secundário dos 12 arquétipos de Jung/Brand:
   O Inocente | O Explorador | O Sábio | O Herói | O Fora-da-lei | O Mágico |
   O Cara Normal | O Amante | O Bobo da Corte | O Cuidador | O Criador | O Governante

   Para cada arquétipo escolhido:
   - Nome e motivação central
   - Por que esse arquétipo para esse posicionamento (justificativa estratégica)
   - Tensão criativa entre primário e secundário
   - Como se manifesta na prática desta marca

2. PERSONALIDADE DA MARCA (5 dimensões)
   Responda: "Se [MARCA] fosse uma pessoa, ela seria..."

   Para cada adjetivo:
   - O adjetivo em si
   - O que significa para ESTA marca (não definição genérica)
   - Como se manifesta em ação (ex: num email, num post, num evento)

   Inclua também os 5 ANTI-adjetivos (o que definitivamente NÃO é)

3. VOICE DNA — SISTEMA DE VOZ

   TOM BASE (como a marca fala em situações neutras):
   - Formal/Casual (escala 1-10)
   - Direto/Poético (escala 1-10)
   - Técnico/Acessível (escala 1-10)
   - Humorístico/Sério (escala 1-10)
   - Emocional/Racional (escala 1-10)

   VARIAÇÕES POR CONTEXTO:
   Para cada contexto abaixo, descreva o tom e dê 1 exemplo de frase:
   - Institucional / LinkedIn / Press Release
   - Marketing / Posts de venda / CTA
   - Educacional / Blog / Tutorial
   - Crise / Reclamação / Bad news
   - Bastidores / Informal / Stories

4. VOCABULÁRIO DA MARCA

   PALAVRAS E EXPRESSÕES QUE USAMOS (30 itens):
   Liste palavras, expressões e formas de falar que reforçam a personalidade.
   Para cada uma, indique o contexto de uso.

   PALAVRAS QUE NUNCA USAMOS (15 itens):
   Liste palavras que soam como concorrente, soam falsas para essa marca, ou
   contradizem a personalidade. Para cada uma, explique por quê.

   EXPRESSÕES-ASSINATURA (5 itens):
   Frases ou formas de dizer que só [MARCA] usaria dessa forma.
   O tipo de coisa que, com o tempo, será associado à marca.

5. REFERÊNCIAS CULTURAIS DE CALIBRAÇÃO

   3 MARCAS COM O TOM QUE QUEREMOS:
   Para cada uma: o que copiar (não o que copiar visualmente, mas a abordagem verbal)

   2 FIGURAS PÚBLICAS COM A VOZ QUE QUEREMOS:
   Para cada uma: o que replicar na forma de comunicar

   1 OBRA CULTURAL (livro, filme, série, música):
   Que captura a essência da personalidade desta marca

6. EXEMPLOS PRÁTICOS — A VOZ EM AÇÃO

   Mostre a voz corretamente aplicada em 5 situações reais:
   - Resposta a um elogio no Instagram
   - Primeiro parágrafo de email de boas-vindas a novo cliente
   - Legenda de post de vendas (CTA)
   - Mensagem de erro numa plataforma digital
   - Resposta a uma reclamação pública

   Para cada situação, mostre também a versão ERRADA (fora do tom) como contraste.

━━━ CONTEXTO ━━━

BRIEFING: [INSERIR BRAND-BRIEFING.MD]
POSICIONAMENTO: [INSERIR POSITIONING.MD]
PÚBLICO-ALVO: [INSERIR AUDIENCE.MD — especialmente Persona Primária e sua linguagem]
```

## Prompts de Refinamento

**Para calibrar as referências culturais:**
```
Tome as referências culturais definidas e aprofunde: se [MARCA] falasse como
[FIGURA/MARCA_REFERÊNCIA], como seria a frase de abertura de uma campanha de
lançamento de produto? E um post de segunda-feira com dica de semana? Mostre
as referências em ação na linguagem desta marca específica.
```

**Para validar o vocabulário:**
```
Teste o vocabulário: gere um parágrafo de 100 palavras descrevendo [PRODUTO]
usando apenas palavras da lista de "palavras que usamos" e nenhuma da lista de
"nunca usamos". O parágrafo soa autêntico para a marca? Ajuste as listas se necessário.
```

## Output

**Arquivo:** `clients/[CLIENTE]/brand-guidelines/voice-and-tone.md`

## Critérios de Qualidade

- [ ] O arquétipo é justificado estrategicamente (não escolhido por gosto)
- [ ] Os adjetivos de personalidade têm exemplos de manifestação prática
- [ ] Existem exemplos de "certo vs. errado" para pelo menos 3 contextos
- [ ] O vocabulário é específico para ESTA marca, não genérico de setor
- [ ] As referências culturais são acionáveis (não apenas inspiracionais)

## Pós-condições

- `voice-and-tone.md` salvo no workspace do cliente
- Próxima fase disponível: `*narrative` (Fase 5)
