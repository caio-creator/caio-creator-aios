# P01 — Auditoria de Marca Existente

**Fase:** 1 de 9 (suplemento)
**Objetivo:** Mapear o estado atual de marcas que já existem antes de redefinir o posicionamento

---

## Quando Usar

Use quando o cliente já tem uma marca estabelecida (logo, site, redes sociais, histórico de comunicação). A auditoria revela o que funciona, o que não funciona, e o que o público já associa à marca — informações críticas para não desperdiçar ativos valiosos.

---

## Prompt Principal

```
Você é um Auditor de Marca sênior. Sua função é diagnosticar o estado atual de [NOME_DA_MARCA] antes de qualquer reposicionamento. O objetivo é mapear o que existe, o que funciona, e o que precisa mudar.

━━━ DADOS DISPONÍVEIS ━━━
[INSERIR: link do site, perfis de redes sociais, exemplos de materiais, briefing básico]

━━━ AUDITORIA EM 6 DIMENSÕES ━━━

**DIMENSÃO 1: IDENTIDADE VISUAL ATUAL**
- O que a identidade comunica (mesmo sem querer)?
- Qual a qualidade de execução (amadora, profissional, consistente, inconsistente)?
- O que está funcionando visualmente?
- O que está desalinhado ou datado?
- Há ativos visuais que devem ser preservados (reconhecimento de marca)?

**DIMENSÃO 2: TOM DE VOZ ATUAL**
- Analise 10-15 peças de comunicação recentes (posts, e-mails, textos do site)
- Como a marca fala hoje? (formal/informal, técnico/acessível, frio/caloroso)
- Há consistência de tom entre canais?
- O tom atual representa quem a marca é — ou quem ela acha que deveria ser?
- Quais elementos de voz merecem ser preservados?

**DIMENSÃO 3: POSICIONAMENTO PERCEBIDO**
- O que o mercado parece acreditar sobre esta marca hoje?
- Qual categoria mental o cliente usa para classificar a marca?
- Há gap entre o que a marca acredita que é e o que o mercado percebe?

**DIMENSÃO 4: CONSISTÊNCIA ENTRE CANAIS**
- O site, Instagram, LinkedIn e materiais impressos falam a mesma linguagem?
- Onde há maior inconsistência?
- Qual canal representa melhor a marca?

**DIMENSÃO 5: PONTOS DE ANCORAGEM**
O que já funciona e DEVE ser preservado:
- Elementos de identidade com alta memorabilidade
- Mensagens que ressoam genuinamente com o público
- Tom ou estilo que o cliente reconhece como autêntico

**DIMENSÃO 6: GAPS E OPORTUNIDADES**
- O que falta na comunicação atual?
- Onde a marca deixa dinheiro na mesa por comunicação inadequada?
- O que seria a maior melhoria de impacto imediato?

━━━ DIAGNÓSTICO FINAL ━━━

Sintetize em:
1. Estado atual em 1 parágrafo direto (sem suavizar)
2. Top 3 ativos a preservar
3. Top 3 problemas a resolver
4. Recomendação: evolução (refinar o que existe) ou revolução (reconstruir do zero)?
```

---

## Prompt de Refinamento — Percepção do Cliente

```
Agora quero entender como o público percebe [NOME_DA_MARCA]. Com base nos comentários, avaliações, depoimentos e interações disponíveis:

- O que os clientes dizem espontaneamente sobre a marca?
- Quais palavras aparecem mais nas avaliações positivas?
- Quais frustações aparecem mais nas avaliações negativas?
- O que os clientes valorizam que a marca não sabe que tem?
- O que a marca promete que os clientes acham que não entrega?

Destile em: "O que o cliente realmente compra quando compra [NOME_DA_MARCA]" — em linguagem dele, não da marca.
```

---

## Output Esperado

Seção "Auditoria de Marca" no `brand-briefing.md`:

```markdown
## Auditoria de Marca Existente

### Estado Atual
[diagnóstico direto em 1 parágrafo]

### Identidade Visual
[análise + ativos a preservar]

### Tom de Voz Atual
[análise + exemplos]

### Gaps Identificados
[lista priorizada]

### Recomendação
Evolução / Revolução — justificativa
```

---

## Critérios de Qualidade

- [ ] Diagnóstico honesto (não suavizado)
- [ ] Ativos a preservar claramente identificados
- [ ] Gaps prioritizados por impacto
- [ ] Recomendação fundamentada

---

## Próximo Passo

→ `P02-compass.md` (Fase 2 — Bússola de Posicionamento)
