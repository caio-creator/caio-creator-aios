# Task: content-producer-carousel

> Agente executor: @content-producer (Verso)
> Versão: 1.0 | Criada em: 2026-02-22
> Dependências: brand-book.md, voice-and-tone.md, editorial.md, digital-guidelines.md

---

## Objetivo

Gerar um carrossel completo e publicável para uma marca — 9 slides estruturados, legenda e hashtags — aplicando automaticamente as diretrizes de marca do cliente ativo, passando nos 8 critérios do Quality Bar sem iteração manual.

---

## Inputs Obrigatórios

```yaml
tema: "[tema do carrossel]"
pilar: "P1 | P2 | P3 | P4 | P5"  # Se não fornecido: identificar automaticamente
modo: "coluna | ensaio | framework"  # Default: auto-selecionar baseado no pilar
cliente: "[nome-do-cliente]"  # Default: detectar pelo contexto da sessão
gancho_aprovado: "[slide 1 aprovado via *hook]"  # Opcional — se não fornecido, gerar e perguntar
```

**Se gancho_aprovado não fornecido:**
1. Gerar 3 opções de gancho para o tema/pilar
2. Apresentar para aprovação
3. Aguardar escolha antes de prosseguir

---

## Pré-Execução — Leitura Obrigatória

```
STEP 1: Ler clients/[cliente]/deliverables/brand-book.md
         → Extrair: frase-assinatura, vocabulário proibido, quality bar, ganchos favoritos

STEP 2: Ler clients/[cliente]/brand-guidelines/editorial.md
         → Extrair: pilares, temas do pilar identificado, ganchos por pilar

STEP 3: Ler clients/[cliente]/brand-guidelines/digital-guidelines.md
         → Extrair: hashtags aprovadas para o pilar, diretrizes de legenda

STEP 4: Confirmar modo de execução:
         - coluna: crítico/filosófico — análise, opinião fundamentada
         - ensaio: estético — conexão emocional, linguagem sensorial
         - framework: didático — estrutura enumerada, passos, contraste
```

---

## Execução — 9 Slides

### SLIDE 1 — GANCHO

**Regras:**
- All-caps ou mixed case com hierarquia visual clara
- Máximo 10 palavras de destaque
- Usar modelo de gancho aprovado para o pilar (ver brand-book.md Seção 5)
- Subtítulo opcional: máximo 1 linha complementar, em fonte menor
- SEM número de slide (não escrever "1/9")

**Template de output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━
SLIDE 1 / GANCHO
[COPY PRINCIPAL EM ALL-CAPS]
[subtítulo opcional em caixa baixa]
━━━━━━━━━━━━━━━━━━━━━━━━
Modelo usado: [identificar]
Pilar: [P1–P5]
```

---

### SLIDE 2 — CONTEXTO

**Regras:**
- 3–5 linhas de corpo
- Ancora o gancho na realidade vivida pelo leitor
- Termina com tensão — não com resposta
- Sem bullet points — prosa fluida

**Template:**
```
━━━━━━━━━━━━━━━━━━━━━━━━
SLIDE 2 / CONTEXTO
[TÍTULO CURTO 3–4 palavras]

[3–5 linhas de desenvolvimento]
[última linha termina com tensão]
━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### SLIDE 3 — SUBTEXTO

**Regras:**
- Frase de transição dominante: "Isso não é sobre [X]. É sobre [Y]."
- Máx 4 linhas de desenvolvimento após a transição
- Este slide é onde a voz se diferencia — o que a maioria não diria

**Template:**
```
━━━━━━━━━━━━━━━━━━━━━━━━
SLIDE 3 / SUBTEXTO
[TÍTULO 3–4 palavras]

Isso não é sobre [X].
É sobre [Y].

[2–3 linhas de desenvolvimento]
━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### SLIDES 4, 5, 6 — FRAMEWORK

**Regras:**
- 1 ideia dominante por slide — nunca 2
- Título curto (3–5 palavras) + 2–4 linhas de explicação
- Modo framework: lista numerada ou pontos
- Modo coluna/ensaio: prosa com hierarquia

**Para cada slide de framework:**
```
━━━━━━━━━━━━━━━━━━━━━━━━
SLIDE [4|5|6] / FRAMEWORK [1|2|3]
[TÍTULO: 3–5 PALAVRAS]

[2–4 linhas de desenvolvimento]
[Terminar com ponto ou reticências que criam expectativa]
━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### SLIDE 7 — RESPIRO POÉTICO

**Regras:**
- Máximo 12 palavras
- Deve ser citável e memorável isolado
- SEM marca ou @handle neste slide
- SEM título — apenas a frase
- Teste interno: "Alguém vai guardar este slide e mandar para um amigo?"
- Se não → reescrever antes de prosseguir

**Template:**
```
━━━━━━━━━━━━━━━━━━━━━━━━
SLIDE 7 / RESPIRO POÉTICO

"[FRASE — MÁX 12 PALAVRAS]"

[Sem mais nada neste slide]
━━━━━━━━━━━━━━━━━━━━━━━━
Teste: ✅ Citável isolado
```

---

### SLIDE 8 — SÍNTESE

**Regras:**
- 3–5 linhas que destilam o arco completo
- Deve conter algo que não estava explícito nos slides anteriores
- Não é resumo — é avanço. A síntese eleva.

**Template:**
```
━━━━━━━━━━━━━━━━━━━━━━━━
SLIDE 8 / SÍNTESE
[TÍTULO 3–4 palavras]

[3–5 linhas — deve ter algo novo, não repetição]
━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### SLIDE 9 — FECHAMENTO + CTA

**Regras:**
- Pergunta real — não retórica performática
- Deve ser uma pergunta que só quem leu até o fim consegue responder
- CTA editorial — jamais mecânico
- Aceito: "Se isso ressoa, conta pra mim." / "O que você estaria fazendo diferente amanhã?"
- Proibido: "Arrasta para o lado!" / "Salva esse post!" / "Comenta com um emoji!"

**Template:**
```
━━━━━━━━━━━━━━━━━━━━━━━━
SLIDE 9 / FECHAMENTO
[TÍTULO 3–4 palavras]

[2–3 linhas de fechamento]

[PERGUNTA REAL — 1 linha]
━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Output — Legenda

**Estrutura:**
```
[Linha 1 — extensão íntima do Slide 1. Mais confessional.]
[Linhas 2–3 — contexto que não cabia no carrossel.]

[Linha em branco]

[CTA — pergunta ou convite. Nunca instrução mecânica.]
```

**Regras:**
- Tom: mais íntimo e humano que o carrossel
- Emojis: 0 no corpo. Máximo 1 no CTA se funcional.
- Comprimento: 3–6 linhas visíveis antes do "ver mais"
- NÃO repetir copy do carrossel

---

## Output — Hashtags

**Regras:**
- Máximo 8 hashtags
- Sempre das listas aprovadas em digital-guidelines.md para o pilar
- Incluir 1–2 hashtags universais da marca
- Separadas do texto da legenda por 1 linha em branco

**Template:**
```
[Legenda completa]

#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5 #hashtag6 #hashtag7 #hashtag8
```

---

## Quality Gate Automático

Após gerar o carrossel, executar Quality Bar antes de entregar:

```yaml
quality_check:
  1_tese_memoravel:
    pergunta: "O Slide 1 tem 1 ideia central citável sem contexto?"
    aprovado: true/false
  2_subtexto:
    pergunta: "O Slide 3 tem um segundo nível que poucos enxergariam sozinhos?"
    aprovado: true/false
  3_framework:
    pergunta: "Os Slides 4–6 têm estrutura, não apenas opiniões?"
    aprovado: true/false
  4_respiro_poetico:
    pergunta: "O Slide 7 funciona isolado como frase memorável?"
    aprovado: true/false
  5_pergunta_real:
    pergunta: "O CTA do Slide 9 só pode ser respondido por quem leu até o fim?"
    aprovado: true/false
  6_evidencia:
    pergunta: "Toda afirmação tem fundamentação (estudo, exemplo, mecanismo)?"
    aprovado: true/false
  7_voz_consistente:
    pergunta: "Nenhum slide quebra o tom do voice-and-tone.md?"
    aprovado: true/false
  8_zero_moralismo:
    pergunta: "O carrossel observa e analisa — não prega nem julga?"
    aprovado: true/false
```

**Score mínimo para entrega: 7/8**

Se score < 7/8:
- Identificar critérios reprovados
- Reescrever os slides afetados
- Re-aplicar Quality Gate antes de entregar

---

## Output Final — Formato Completo

```markdown
## CARROSSEL: [TEMA]
**Pilar:** [P1–P5] | **Modo:** [coluna|ensaio|framework] | **Quality Score:** [X/8]

---

[SLIDE 1]
[SLIDE 2]
...
[SLIDE 9]

---

**LEGENDA:**
[legenda completa]

**HASHTAGS:**
[lista de hashtags]

---
Quality Gate: [X/8] — [APROVADO | APROVADO COM OBSERVAÇÕES | REPROVADO]
[Se observações: listá-las]
```

---

## Notas de Execução

**Sobre vocabulário:**
- PROIBIDO: hack, truque, segredo, simplesmente, facilmente, basta, qualquer pessoa pode
- USAR: framework, sistema, metodologia, fundamento, mecanismo, estrutura, construir, escala

**Sobre o Slide 7:**
- Se o Slide 7 gerado não passar no teste de citabilidade, reescrever antes de entregar
- Variações seguras: frases com contraste ("X falha. Y não."), frases com tensão interna, metáforas concretas

**Sobre pilares e modos:**
| Pilar | Modo preferido |
|-------|---------------|
| P1 — Psicologia | coluna |
| P2 — Sistemas | framework |
| P3 — Criatividade | coluna ou ensaio |
| P4 — Cultura | ensaio |
| P5 — Construção em Público | coluna |
