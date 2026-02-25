# Task: brand-director-editorial

**Agente:** @brand-director (Atlas)
**Fase:** 6 de 9 — Linha Editorial e Estratégia de Conteúdo
**Versão:** 1.0.0

---

## Propósito

Definir o sistema completo de conteúdo: pilares temáticos, linha editorial semanal, régua de conteúdo e quality bar. Transforma a estratégia de marca em produção sistemática e consistente.

## Pré-condições

- Fases 1 a 5 concluídas
- Todos os artefatos anteriores disponíveis (briefing, positioning, audience, voice, narrative)

## Prompt Principal

```
CONTEXTO: Você é um especialista em Estratégia de Conteúdo e Social Media com
profundo entendimento de marketing de atração. Com base nos artefatos de [NOME_DA_MARCA],
construa o sistema editorial completo.

━━━ ENTREGÁVEIS ━━━

1. PILARES DE CONTEÚDO (4-5 pilares)

   Para cada pilar:
   - NOME E TAGLINE: Um título e uma frase que define o pilar
   - DEFINIÇÃO: O que é esse pilar e por que existe para [MARCA]
   - OBJETIVO ESTRATÉGICO: O que queremos que o público pense/sinta/faça após consumir
   - PÚBLICO QUE MAIS SE BENEFICIA: Qual persona este pilar atende principalmente
   - 10 TEMAS ESPECÍFICOS: Não genéricos — temas que [MARCA] pode abordar com autoridade
   - FORMATOS NATURAIS: Quais formatos servem melhor este pilar (reels, carrossel, etc.)
   - REGRA DE OURO: A diretriz que define se um conteúdo pertence a este pilar

   ATENÇÃO: Os pilares devem:
   - Cobrir toda a jornada do cliente (descoberta até fidelização)
   - Ser mutuamente exclusivos (um post não deve caber em 2 pilares)
   - Refletir o posicionamento estratégico (não apenas o que é fácil de fazer)

2. LINHA EDITORIAL SEMANAL

   Para cada dia da semana (segunda a domingo):
   - DIA E TEMA EDITORIAL: O assunto central desse dia
   - OBJETIVO EMOCIONAL: Como queremos que [PERSONA] se sinta ao consumir
   - PILAR ASSOCIADO: Qual dos 4-5 pilares governa esse dia
   - FORMATOS RECOMENDADOS: Os 2-3 formatos mais eficazes para esse tema/dia
   - PROMPT DE GERAÇÃO: Uma instrução pronta para gerar conteúdo para esse slot
     (formato: "Crie um [formato] sobre [tema] para [persona], com tom [tom], abordando [ângulo]")

3. RÉGUA DE CONTEÚDO (mix mensal em %)

   Defina a distribuição mensal entre as categorias:
   - EDUCACIONAL: Ensina algo diretamente útil para a persona
   - CONVERSÃO: Gera leads, vendas, cadastros ou ações mensuráveis
   - CONEXÃO: Humaniza a marca (bastidores, equipe, história, pessoal)
   - CURADORIA: Referências externas com a perspectiva única da marca
   - ENGAJAMENTO: Pergunta, poll, participe, compartilhe (baixo esforço cognitivo)

   Justifique cada percentual com base no momento da marca e objetivo de negócio.

4. FORMATOS PRIORITÁRIOS

   Ranqueie os 5 formatos mais importantes para [MARCA] agora.
   Para cada formato:
   - Por que é prioritário neste momento
   - Frequência recomendada por mês
   - Duração ou extensão ideal
   - 1 regra de ouro de execução

5. QUALITY BAR — O QUE É "EXCELENTE" PARA ESTA MARCA

   Defina o padrão de qualidade com 8 critérios específicos.
   Para cada critério: o que é ótimo, o que é aceitável, o que reprova.

   TAMBÉM INCLUA:
   - 5 ANTI-EXEMPLOS: O que jamais deve ser publicado (com explicação do porquê)
   - CHECKLIST PRÉ-PUBLICAÇÃO: 10 perguntas para responder antes de publicar qualquer conteúdo

6. MÉTRICAS DE SUCESSO (por tipo de conteúdo)

   Para cada formato prioritário, defina:
   - KPI principal (views, saves, cliques, conversões)
   - Meta realista para os primeiros 90 dias
   - Sinal de que está funcionando
   - Sinal de que precisa ajustar

━━━ CONTEXTO ━━━

POSICIONAMENTO: [INSERIR POSITIONING.MD]
PERSONA PRIMÁRIA: [INSERIR SEÇÃO DE PERSONA]
VOZ E TOM: [INSERIR VOICE-AND-TONE.MD]
NARRATIVA: [INSERIR SEÇÃO DE PILARES NARRATIVOS]
OBJETIVOS DE NEGÓCIO: [EXTRAIR DO BRIEFING.MD — objetivos de 12 meses]
```

## Prompts de Refinamento

**Para tornar os temas mais específicos:**
```
Os 10 temas de cada pilar ainda são genéricos. Para [MARCA] especificamente:
quais são os 10 temas que ela pode abordar com mais autoridade e originalidade
do que qualquer concorrente? Que perspectiva única [MARCA] traz a cada tema?
Reescreva os temas com esse ângulo de diferenciação.
```

**Para calibrar a linha semanal:**
```
Revise a linha editorial semanal considerando: qual é o momento de humor do
seguidor em cada dia da semana? Segunda é diferente de sexta. Como a jornada
emocional da semana de [PERSONA] se conecta com o conteúdo de cada dia?
Ajuste os objetivos emocionais e formatos com essa perspectiva.
```

## Output

**Arquivo:** `clients/[CLIENTE]/brand-guidelines/editorial.md`

## Critérios de Qualidade

- [ ] Os pilares cobrem toda a jornada do cliente (atração até fidelização)
- [ ] Cada dia da semana tem um prompt de geração pronto para uso
- [ ] A régua de conteúdo está alinhada com os objetivos de negócio
- [ ] O quality bar tem critérios específicos, não genéricos
- [ ] O checklist pré-publicação é acionável (pode ser usado amanhã)

## Pós-condições

- `editorial.md` salvo no workspace do cliente
- Próxima fase disponível: `*visual-brief` (Fase 7)
