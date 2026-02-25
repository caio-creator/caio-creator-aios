# Task: brand-director-visual-brief

**Agente:** @brand-director (Atlas)
**Fase:** 7 de 9 — Brief de Identidade Visual
**Versão:** 1.0.0

---

## Propósito

Gerar o brief estratégico de identidade visual da marca. Este documento guia o trabalho de designers — não executa o design, mas define com precisão a direção visual que reflete o posicionamento e a personalidade da marca.

> **Nota importante:** Esta fase produz um BRIEF de direção visual, não uma identidade visual finalizada. O design final é executado por um designer humano com base neste brief.

## Pré-condições

- Fases 1 a 6 concluídas
- `positioning.md`, `audience.md`, `voice-and-tone.md` disponíveis

## Prompt Principal

```
CONTEXTO: Você é um Diretor de Arte e especialista em Branding Visual com experiência
em traduzir estratégia de marca em direção visual. Com base nos artefatos de [NOME_DA_MARCA],
crie o brief completo de identidade visual.

IMPORTANTE: Este é um BRIEF ESTRATÉGICO, não um manual de identidade final.
O objetivo é dar ao designer direção clara e justificada — não escolher pixels.

━━━ ENTREGÁVEIS ━━━

1. PERSONALIDADE VISUAL (7 adjetivos)

   Liste 7 adjetivos que descrevem como a identidade visual deve parecer e sentir.
   Para cada adjetivo:
   - O adjetivo
   - O que significa visualmente para [MARCA] (não abstratamente)
   - 1 referência visual que exemplifica (marca, obra, lugar, objeto)

   INCLUA TAMBÉM 3 ANTI-ADJETIVOS VISUAIS:
   O que a identidade visual definitivamente NÃO deve parecer.

2. SISTEMA DE CORES

   COR PRIMÁRIA:
   - Cor ou família de cores recomendada
   - Justificativa estratégica (por que essa cor para esse posicionamento e público?)
   - Psicologia e significado cultural relevante
   - Contexto de uso principal
   - Sugestão de HEX como ponto de partida [MARCAR COMO SUGESTÃO, não definitivo]

   PALETA SECUNDÁRIA:
   - 2-3 cores que complementam a primária
   - Papel de cada cor (acento, neutro, fundo)
   - Relação emocional com a primária
   - Sugestões de HEX como ponto de partida

   NEUTROS:
   - Tons de cinza, branco e preto recomendados
   - Quando usar cada um

   REGRAS DE USO:
   - Combinações aprovadas (o que pode aparecer junto)
   - Combinações proibidas (o que nunca deve aparecer junto)
   - Proporção aproximada (ex: 60% primária, 30% neutros, 10% acento)

3. TIPOGRAFIA

   FONTE DE HEADINGS (títulos, displays, comunicação de impacto):
   - Personalidade tipográfica desejada (serifada/sem serifa, condensed/wide, etc.)
   - Características técnicas preferidas (peso, contraste, x-height)
   - Emoção que deve transmitir
   - 2-3 fontes de referência como ponto de partida (Google Fonts / Adobe Fonts)
   - O que NÃO usar (categorias ou fontes a evitar)

   FONTE DE CORPO (texto corrido, legendas, copy):
   - Mesma estrutura da fonte de headings
   - Critério de legibilidade para o contexto de uso principal (digital, impresso, etc.)

   HIERARQUIA TIPOGRÁFICA:
   - Como as duas fontes interagem
   - Pesos aprovados (Bold, Regular, Light)
   - Uso de itálico (quando sim, quando nunca)

4. ESTILO DE IMAGEM E FOTOGRAFIA

   ESTILO FOTOGRÁFICO:
   - Descrição do estilo em 3-5 adjetivos
   - Tipo de composição preferida (close-up, ambiental, retrato, produto)
   - Temperatura de cor (warm, cool, neutro)
   - Nível de edição (naturalístico vs. tratado)
   - Direção de iluminação (dura, suave, natural, estúdio)

   PESSOAS NAS IMAGENS (se aplicável):
   - Diversidade e representatividade esperada
   - Faixa etária e perfil visual dos modelos
   - Contexto (trabalho, lifestyle, íntimo, público)

   O QUE EVITAR EM IMAGENS:
   - Tipos de fotos que contradizem a marca
   - Estéticas que posicionam errado
   - Clichês do setor a evitar

5. ICONOGRAFIA E ELEMENTOS GRÁFICOS

   ESTILO DE ÍCONES:
   - Outline, filled, duo-tone ou custom?
   - Peso de traço
   - Nível de detalhe
   - Corner radius (sharp vs. rounded)

   ELEMENTOS DECORATIVOS:
   - Existe um elemento gráfico de assinatura? (padrão, textura, forma)
   - Formas geométricas prioritárias
   - Como esses elementos reforçam a personalidade

6. BENCHMARKS VISUAIS

   3 MARCAS COM IDENTIDADE VISUAL QUE ADMIRAMOS:
   Para cada uma: o que específico na identidade dela é referência para [MARCA]
   (não copiar — mas o que nos inspira)

   2 MARCAS COM IDENTIDADE VISUAL QUE NÃO QUEREMOS PARECER:
   Para cada uma: o que specificamento evitar

7. APLICAÇÕES PRIORITÁRIAS

   Em quais aplicações a identidade será mais usada?
   Para cada aplicação principal (ex: Instagram, apresentação, cartão, website):
   - Desafio visual específico desse contexto
   - O que é mais importante nessa aplicação

━━━ CONTEXTO ━━━

POSICIONAMENTO: [INSERIR POSITIONING.MD]
ARQUÉTIPO E PERSONALIDADE: [INSERIR SEÇÕES DE VOICE-AND-TONE.MD]
PERSONA PRIMÁRIA: [RESUMO DO PÚBLICO — o que ressoa com ela visualmente]
```

## Prompts de Refinamento

**Para calibrar a direção de cor:**
```
Analise o arquétipo [ARQUÉTIPO] e o posicionamento de [MARCA]. Que família de cores
historicamente representa esse arquétipo em marcas bem-sucedidas? Como isso se conecta
com o que [PERSONA PRIMÁRIA] associa visualmente a [BENEFÍCIO]? Refine a direção de cor
com esse cruzamento de dados.
```

**Para tornar o brief fotográfico acionável:**
```
Descreva a foto ideal para a home do site de [MARCA]. Uma imagem que captura a essência
da marca em 2 segundos. Quem aparece? O que fazem? Que luz? Que fundo? Qual é a emoção
imediata ao ver essa foto? Essa descrição deve guiar o briefing fotográfico completo.
```

## Output

**Arquivo:** `clients/[CLIENTE]/brand-guidelines/visual-brief.md`

## Critérios de Qualidade

- [ ] Cada decisão visual tem justificativa estratégica (não apenas preferência estética)
- [ ] Os benchmarks visuais são específicos ("o que X tem que queremos" não apenas "X é bom")
- [ ] O brief é útil para um designer que nunca ouviu falar da marca
- [ ] As sugestões de HEX estão claramente marcadas como ponto de partida
- [ ] O brief diferencia o que é direção ("queremos warm") do que é execução ("use #F5A623")

## Pós-condições

- `visual-brief.md` salvo no workspace do cliente
- Próxima fase disponível: `*digital` (Fase 8)
