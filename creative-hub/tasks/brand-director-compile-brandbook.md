# Task: brand-director-compile-brandbook

**Agente:** @brand-director (Atlas)
**Fase:** 9 de 9 — Compilação do Brand Book
**Versão:** 1.0.0

---

## Propósito

Consolidar todos os artefatos das 8 fases anteriores em um único Brand Book completo, coeso e imediatamente utilizável pelo cliente e por qualquer fornecedor (designer, redator, agência) que trabalhe com a marca.

## Pré-condições

- Todas as 8 fases anteriores concluídas
- Todos os arquivos em `clients/[CLIENTE]/brand-guidelines/` disponíveis
- Quality gate `checklists/brand-completeness-gate.md` executado (GO >= 8/10)

## Prompt Principal

```
CONTEXTO: Você é o responsável pela edição final do Brand Book de [NOME_DA_MARCA].
Sua missão é transformar os 8 artefatos estratégicos em um documento único, fluido
e utilizável que qualquer pessoa possa usar para comunicar a marca corretamente.

━━━ ESTRUTURA DO BRAND BOOK ━━━

1. CAPA E IDENTIFICAÇÃO
   - Nome da marca
   - Versão e data
   - Responsável (Caio Creator / [Nome do cliente])
   - "Este é o documento de identidade oficial de [MARCA]"

2. CARTA DE APRESENTAÇÃO (200-300 palavras)
   Uma mensagem direta para quem vai usar este Brand Book.
   Tom: quem é a marca, por que este documento existe, e como usar.

3. QUICK REFERENCE CARD (1 página — o cheat sheet da marca)
   Para quem precisa entender a marca em 60 segundos:
   - Missão em 1 frase
   - Posicionamento em 1 frase
   - Público em 1 linha
   - Personalidade em 5 adjetivos
   - Tom de voz em 3 características
   - Cores principais (HEX ou família)
   - Tipografia principal
   - O que a marca é e o que não é (5+5 bullets)

4. CAPÍTULO 1 — ESSÊNCIA E POSICIONAMENTO
   (Baseado em positioning.md)
   - Bússola de Posicionamento
   - Positioning Statement
   - Missão, Visão e Valores (extraídos do posicionamento)
   - Diferenciais estratégicos

5. CAPÍTULO 2 — PÚBLICO-ALVO E PERSONAS
   (Baseado em audience.md)
   - ICP resumido
   - Persona Primária (card completo)
   - Persona Secundária (se houver)
   - Jornada do cliente simplificada
   - O que NÃO somos para quem (anti-persona)

6. CAPÍTULO 3 — PERSONALIDADE E VOZ
   (Baseado em voice-and-tone.md)
   - Arquétipo da marca
   - 5 adjetivos de personalidade com exemplos
   - Voice DNA (escalas + variações por contexto)
   - Vocabulário: usamos / nunca usamos / expressões-assinatura
   - Exemplos de tom em situações reais (certo vs. errado)

7. CAPÍTULO 4 — NARRATIVA E HISTÓRIAS
   (Baseado em narrative.md e story-bank.md)
   - Brand Story Fundacional
   - Manifesto
   - Top 5 histórias do banco (as mais acionáveis)
   - Diretrizes narrativas

8. CAPÍTULO 5 — CONTEÚDO E EDITORIAL
   (Baseado em editorial.md)
   - Pilares de conteúdo (nome, definição, temas)
   - Linha editorial semanal
   - Régua de conteúdo (%)
   - Quality bar e checklist pré-publicação

9. CAPÍTULO 6 — IDENTIDADE VISUAL (DIREÇÃO)
   (Baseado em visual-brief.md)
   - Personalidade visual
   - Sistema de cores com justificativas
   - Tipografia com exemplos
   - Estilo fotográfico
   - Iconografia e elementos gráficos

10. CAPÍTULO 7 — CANAIS DIGITAIS
    (Baseado em digital-guidelines.md)
    - Instagram: perfil, conteúdo, tom, regras
    - LinkedIn: estratégia e diferenciação
    - Email: tipos, estrutura, cadência
    - Outros canais relevantes
    - Regras transversais

11. FAQ — PERGUNTAS FREQUENTES
    10 situações comuns onde alguém precisaria consultar o Brand Book:
    - "Como reagimos a uma polêmica nas redes?"
    - "Posso usar humor neste contexto?"
    - "Como fazer uma parceria ficar com a cara da marca?"
    - [mais 7 perguntas específicas de [MARCA]]

12. HISTÓRICO DE VERSÕES
    - Versão 1.0 — [data de criação]
    - Como solicitar atualizações

━━━ INSTRUÇÕES DE COMPILAÇÃO ━━━

1. Leia todos os 8 artefatos das fases anteriores
2. Identifique inconsistências entre os documentos e resolva antes de compilar
3. Use a estrutura acima mas adapte o conteúdo para a marca específica
4. O Brand Book deve ter personalidade — escreva no tom de voz da própria marca
5. Remova redundâncias entre capítulos sem perder informação essencial
6. Para cada seção, adicione "Uso Prático" com 1-2 exemplos de quando usar aquela diretriz

━━━ ARTEFATOS DE ENTRADA ━━━

[INSERIR CONTEÚDO COMPLETO DE TODOS OS ARQUIVOS]:
- clients/[CLIENTE]/briefing/brand-briefing.md
- clients/[CLIENTE]/brand-guidelines/positioning.md
- clients/[CLIENTE]/brand-guidelines/audience.md
- clients/[CLIENTE]/brand-guidelines/voice-and-tone.md
- clients/[CLIENTE]/brand-guidelines/narrative.md
- clients/[CLIENTE]/brand-guidelines/editorial.md
- clients/[CLIENTE]/brand-guidelines/visual-brief.md
- clients/[CLIENTE]/brand-guidelines/digital-guidelines.md
```

## Prompt de Executive Summary

Para criar apenas o executive summary para apresentação:

```
Com base no Brand Book completo de [MARCA], crie um Executive Summary executivo
de 1 página que um CEO ou investidor possa ler em 3 minutos e entender tudo
que importa sobre a identidade desta marca.

Inclua: posicionamento em 1 frase, público em 1 linha, personalidade em 5 palavras,
pilares de conteúdo, tom de voz, e o próximo passo recomendado para ativar a marca.

Tom: do dono da marca para quem vai operacionalizar.
```

## Quality Gate — Executar Antes de Entregar

Verifique `checklists/brand-completeness-gate.md`. Score mínimo para entrega: **8/10**.

Se score < 8: identifique as lacunas e retorne às fases correspondentes para completar.

## Output

**Arquivo:** `clients/[CLIENTE]/brand-guidelines/brand-book.md`

Este é o entregável final da estratégia de marca. Deve ser exportável para PDF para entrega ao cliente.

## Critérios de Qualidade

- [ ] Todos os 8 artefatos das fases anteriores estão refletidos no Brand Book
- [ ] O documento tem personalidade — foi escrito no tom de voz da marca
- [ ] O Quick Reference Card está correto e utilizável como cheat sheet
- [ ] O FAQ responde situações reais que a equipe da marca vai enfrentar
- [ ] Nenhuma variável [COLCHETES] não preenchida restou no documento
- [ ] Quality gate executado com score >= 8/10

## Pós-condições

- `brand-book.md` salvo no workspace do cliente
- Cliente notificado da conclusão
- Se aplicável: @devops para envio ao cliente via PR ou entrega digital
