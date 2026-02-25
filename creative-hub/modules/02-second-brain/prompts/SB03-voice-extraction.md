# SB03 — EXTRAÇÃO DE VOZ
> Fase 3 do Protocolo de Clonagem — Padrões de linguagem, ritmo e comunicação

---

## Prompt Principal

```
Você é um linguista e analista de estilo literário especializado em comunicação estratégica.

Com base no que foi pesquisado nas Fases 1 e 2 sobre [NOME DA REFERÊNCIA], sua missão agora é
mapear os padrões de voz e linguagem que tornam esta referência reconhecível — independente do tema.

Queremos capturar não o que ela diz, mas COMO ela diz. A estrutura da comunicação, não o conteúdo.

---

## BLOCO 1: RITMO E ESTRUTURA
(O esqueleto da comunicação)

**Tamanho das frases:**
- Esta referência usa frases curtas e impactantes, longas e elaboradas, ou mistura?
- Qual é o padrão de pontuação preferido?
- Há uso recorrente de listas ou enumerações? Em que contextos?

**Estrutura de parágrafo:**
- Como ela organiza ideias em um parágrafo?
- Qual é o padrão de abertura (afirmação → exemplos / pergunta → resposta / contexto → insight)?

**Estrutura de argumento:**
- Ela tende a ir do específico para o geral (indutivo) ou do geral para o específico (dedutivo)?
- Ela usa a estrutura tese → antítese → síntese?
- Ela usa exemplos históricos, dados quantitativos, analogias, ou histórias pessoais?
- Em que proporção cada tipo de evidência aparece?

**Abertura e fechamento:**
- Como ela tipicamente abre um texto, palestra ou argumento?
- Como ela tipicamente conclui?
- Há padrões recorrentes de abertura que são característicos dela?

---

## BLOCO 2: VOCABULÁRIO E METÁFORAS
(A textura da linguagem)

**Palavras de alta frequência:**
Que palavras e termos aparecem sistematicamente no trabalho desta referência?
Liste pelo menos 15, separando por categoria:
- Termos técnicos do campo (que ela usa de forma distinta)
- Palavras de transição favoritas ("portanto", "no entanto", "na verdade", etc.)
- Termos que ela própria cunhou ou ressignificou

**Metáforas recorrentes:**
Que imagens, analogias e campos semânticos ela usa sistematicamente?
- Que metáforas ela usa para explicar conceitos complexos?
- De que campo vêm as metáforas preferidas? (Biologia, esportes, música, guerra, natureza...)
- Que comparações históricas ou culturais são recorrentes?

**O que ela NÃO usa:**
- Que jargões do campo ela evita ou critica?
- Que tipos de linguagem são notavelmente ausentes?
- Que expressões populares no campo ela não usa?

---

## BLOCO 3: TOM E POSTURA EMOCIONAL
(A temperatura da comunicação)

**Espectro de tom:**
Em uma escala de 1-10, posicione esta referência em cada dimensão:

| Dimensão | Posição (1-10) | Como isso aparece |
|----------|---------------|------------------|
| Formal ←→ Coloquial | [X] | [Exemplo] |
| Distante ←→ Íntimo | [X] | [Exemplo] |
| Neutro ←→ Apaixonado | [X] | [Exemplo] |
| Cauteloso ←→ Assertivo | [X] | [Exemplo] |
| Humilde ←→ Confiante | [X] | [Exemplo] |

**Postura diante da incerteza:**
- Como ela lida com o que não sabe? (Admite abertamente, qualifica, evita?)
- Ela usa "talvez", "possivelmente", "certamente" com que frequência?
- Como ela trata controvérsias internas ao campo?

**Humor (se aplicável):**
- Ela usa humor? De que tipo? (Ironia, autoironia, anedotas, wit intelectual?)
- Em que momentos o humor aparece?

---

## BLOCO 4: MARCAS DISTINTIVAS
(O que torna esta voz imediatamente reconhecível)

Se você lesse um texto anônimo desta referência, o que te faria reconhecê-la?

Liste entre 5 e 10 "marcas de voz" — características tão específicas desta referência que raramente
você encontra combinadas desta forma em outros autores.

Exemplos de marcas de voz:
- "Sempre começa com uma paradoxo"
- "Usa perguntas retóricas no final de seções"
- "Cita dados quantitativos antes de cada argumento qualitativo"
- "Termina com uma implicação prática nunca explicitada — deixa o leitor tirar a conclusão"
- "Usa a primeira pessoa plural ('nós') para incluir o leitor no problema"

---

## BLOCO 5: EXEMPLOS CALIBRADOS
Para referência futura ao ativar a persona, liste 3-5 exemplos de trechos que capturam bem a voz:

**Exemplo 1 — [Contexto/tipo de texto]:**
"[Trecho representativo da voz desta referência]"

**Exemplo 2 — [Contexto/tipo de texto]:**
"[Trecho representativo]"

**Exemplo 3 — [Contexto/tipo de texto]:**
"[Trecho representativo]"

Para cada exemplo, explique brevemente por que ele é característico desta referência.

---

## OUTPUT ESPERADO

1. **Análise de ritmo e estrutura** (Bloco 1)
2. **Inventário de vocabulário e metáforas** (Bloco 2)
3. **Mapa de tom** com escalas posicionadas (Bloco 3)
4. **Lista de marcas distintivas** — 5-10 características únicas (Bloco 4)
5. **Exemplos calibrados** com anotação (Bloco 5)

Este output alimenta diretamente o system prompt de ativação da persona (SB06).
```

---

## Prompt de Refinamento — Calibração por Formato

Use para mapear como a voz muda entre formatos:

```
Sabemos como [NOME DA REFERÊNCIA] escreve em [FORMATO PRINCIPAL].
Agora vamos mapear variações por formato:

Para cada formato abaixo (se aplicável), descreva como a voz muda:

**Em entrevistas faladas:**
- O ritmo muda? Como?
- Ela usa recursos que não aparecem no texto escrito?
- Há marcadores de oralidade característicos?

**Em textos curtos (Twitter/threads):**
- Como ela comprime o estilo para textos breves?
- O que ela sacrifica e o que mantém?

**Em apresentações/palestras:**
- Como ela usa a estrutura narrativa em contexto oral?
- O ritmo e o tom mudam?

**Em respostas a críticas:**
- Qual é o padrão de resposta diante de oposição?
- O tom muda? Como?
```

---

## Critérios de Qualidade

- [ ] Ritmo e estrutura de argumento mapeados com exemplos
- [ ] Pelo menos 15 palavras/termos de alta frequência listados
- [ ] Pelo menos 5 metáforas ou campos semânticos identificados
- [ ] Escalas de tom preenchidas com justificativas
- [ ] Pelo menos 5 marcas distintivas identificadas
- [ ] 3 exemplos calibrados com anotação

---

## Próxima Fase
**SB04 — Sistema de Crenças** → Com a voz mapeada, agora extraímos as crenças fundacionais e posições contraintuitivas.
