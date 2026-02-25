# Módulo 04 — Produção de Conteúdo

> Módulo do Caio Creator Hub para geração de conteúdo publicável a partir das diretrizes de marca.
> Versão: 1.0 | Criado em: 2026-02-22

---

## O que é este módulo

Este módulo transforma diretrizes de marca (brand-guidelines/) em conteúdo pronto para publicação — carrosséis de Instagram, ganchos, grades editoriais e validação de copy.

É operado pelo agente `@content-producer` (Verso) e funciona como a fase de **execução** após o @brand-director ter completado as 9 fases de brand development.

---

## Pré-requisito

Para usar este módulo, o cliente precisa ter:
- ✅ `clients/[cliente]/deliverables/brand-book.md` compilado (Fase 9)
- ✅ `clients/[cliente]/brand-guidelines/voice-and-tone.md` (Fase 4)
- ✅ `clients/[cliente]/brand-guidelines/editorial.md` (Fase 6)
- ✅ `clients/[cliente]/brand-guidelines/digital-guidelines.md` (Fase 8)

---

## Como usar

### Via agente (recomendado)

```
@content-producer

*carousel [tema]
*hook [tema]
*week
*validate [copy]
```

### Via task direta

```
[Execute a task]
creative-hub/tasks/content-producer-carousel.md
```

---

## Estrutura de Output

### Carrossel completo (`*carousel`)

```
SLIDE 1: Gancho (tese, all-caps, max 10 palavras)
SLIDE 2: Contexto (ancora na realidade do leitor)
SLIDE 3: Subtexto ("Isso não é sobre X. É sobre Y.")
SLIDE 4: Framework 1 (1 ideia dominante)
SLIDE 5: Framework 2 (1 ideia dominante)
SLIDE 6: Framework 3 (1 ideia dominante)
SLIDE 7: Respiro Poético (1 frase, max 12 palavras, citável)
SLIDE 8: Síntese (destila o arco, contém algo novo)
SLIDE 9: Fechamento + Pergunta real (CTA editorial)

LEGENDA: 3–6 linhas. Mais íntima que o carrossel.
HASHTAGS: Máx 8, das listas aprovadas por pilar.
QUALITY GATE: Score X/8 automático antes da entrega.
```

---

## Quality Bar — 8 Critérios

| # | Critério | Definição |
|---|----------|-----------|
| 1 | Tese memorável | 1 ideia central citável sem contexto |
| 2 | Subtexto | O segundo nível que poucos enxergariam |
| 3 | Framework | Estrutura que organiza, não só opiniões |
| 4 | Respiro Poético | Slide 7 funciona isolado como frase memorável |
| 5 | Pergunta real | CTA só respondível por quem leu até o fim |
| 6 | Evidência | Toda afirmação tem fundamentação |
| 7 | Voz consistente | Nenhum slide quebra o tom da marca |
| 8 | Zero moralismo | Observa e analisa — nunca prega |

**Score mínimo para publicação:** 7/8

---

## Modos de Carrossel

| Modo | Quando usar | Estilo |
|------|------------|--------|
| **coluna** | Análise crítica, opinião filosófica | Prosa fundamentada, 1 tese central |
| **ensaio** | Conexão emocional, criatividade | Linguagem sensorial, ritmo literário |
| **framework** | Conteúdo didático, processos | Estrutura enumerada, passos claros |

---

## 5 Pilares — Mapeamento Rápido

| Pilar | % | Modo Preferido | Dia |
|-------|---|----------------|-----|
| P1 — Psicologia de Marca | 20% | coluna | Terça |
| P2 — Sistemas & Frameworks | 25% | framework | Terça |
| P3 — Criatividade & Neurodivergência | 20% | coluna/ensaio | Quinta |
| P4 — Cultura & Identidade | 15% | ensaio | Quinta |
| P5 — Construção em Público | 20% | coluna | Sábado |

---

## Referências

- Agente: `creative-hub/agents/content-producer.md`
- Task principal: `creative-hub/tasks/content-producer-carousel.md`
- Brand Book do Caio: `creative-hub/clients/caio-creator/deliverables/brand-book.md`
- Voz de marca: `creative-hub/clients/caio-creator/brand-guidelines/voice-and-tone.md`

---

*Módulo 04 — Content Production | Caio Creator Hub v1.0.0*
