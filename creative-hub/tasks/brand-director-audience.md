# Task: brand-director-audience

**Agente:** @brand-director (Atlas)
**Fase:** 3 de 9 — Público-Alvo e Personas
**Versão:** 1.0.0

---

## Propósito

Construir o mapeamento completo do público-alvo: ICP (Ideal Customer Profile), personas primária e secundária, anti-persona e jornada do cliente. Esse mapeamento define para quem cada decisão de comunicação é direcionada.

## Pré-condições

- Fases 1 e 2 concluídas
- `brand-briefing.md` e `positioning.md` disponíveis

## Prompt Principal

```
CONTEXTO: Você é um especialista em Estratégia de Público-Alvo e Customer Intelligence.
Com base no briefing e posicionamento de [NOME_DA_MARCA], construa o mapeamento
completo do público-alvo.

━━━ ENTREGÁVEIS REQUERIDOS ━━━

1. ICP — IDEAL CUSTOMER PROFILE
   O cliente dos sonhos da marca. Aquele para quem a proposta de valor é perfeita.

   Descreva em 1 parágrafo que o tornaria imediatamente reconhecível.
   Responda também:
   - Por que ele/ela é ideal (alinhamento de valores + capacidade de compra)?
   - Como ele/ela busca soluções hoje?
   - O que o impede de comprar agora?
   - Quanto ele/ela gasta anualmente em soluções similares?

2. PERSONA PRIMÁRIA (nome fictício representativo do ICP)

   DEMOGRÁFICO:
   - Nome, idade, gênero, localização
   - Ocupação, cargo, empresa (tamanho e setor)
   - Renda mensal/anual, nível educacional
   - Estado civil, filhos, estilo de moradia

   COMPORTAMENTAL:
   - Rotina digital (apps, redes sociais, tempo gasto)
   - Hábitos de consumo (como pesquisa, como decide, como paga)
   - Fontes de informação confiáveis (quem ouve, o que lê, que vídeos assiste)
   - Como descobre novas marcas/soluções

   PSICOGRÁFICO:
   - 5 valores fundamentais (o que é não-negociável para ele/ela)
   - 3 crenças profundas sobre o tema/área que [MARCA] atua
   - Identidade percebida (como se vê, como quer ser visto)
   - Medos e inseguranças mais relevantes

   DESEJOS PROFUNDOS (o que quer mas não diz abertamente):
   Liste 5 desejos não-declarados mas presentes na tomada de decisão

   DORES ATIVAS (o que está incomodando agora):
   Liste 5 problemas ativos, específicos, que ele/ela pesquisa ativamente

   LINGUAGEM:
   - 10 palavras/expressões que ele/ela usa para descrever o problema
   - 5 palavras/expressões que o/a repelem (o que parece salesman, corporativo ou fake)
   - Citação característica (uma frase que poderia sair da boca dessa pessoa)

3. PERSONA SECUNDÁRIA (se aplicável)
   Mesmo formato, mas para o segundo segmento mais importante.
   Explique por que é relevante e como difere do ICP.

4. ANTI-PERSONA
   Quem definitivamente NÃO queremos como cliente e por quê.
   - Perfil demográfico
   - Por que seria um mal fit (valores, expectativas, maturidade)
   - Como evitar atrair esse perfil na comunicação

5. JORNADA DO CLIENTE (5 etapas)
   Para cada etapa, descreva:
   - Nome e o que acontece nessa etapa
   - Emoção dominante do cliente
   - Perguntas que ele está fazendo
   - Onde procura respostas (canal, plataforma)
   - Como [MARCA] pode aparecer e ajudar nesse momento

   Etapas: Descoberta → Interesse → Avaliação → Decisão → Fidelização

━━━ CONTEXTO ━━━

BRIEFING: [INSERIR BRAND-BRIEFING.MD]
POSICIONAMENTO: [INSERIR POSITIONING.MD]
```

## Prompts de Refinamento

**Para aprofundar as dores:**
```
As dores listadas ainda são genéricas. Imagine que [PERSONA] está às 2h da manhã
não conseguindo dormir por causa desse problema. O que está exatamente na cabeça
dela? O que ela googla às 2h? Que conversa ela teve na semana passada que a deixou
frustrada? Reescreva as dores com esse nível de especificidade e emoção.
```

**Para tornar a linguagem mais precisa:**
```
A linguagem da persona precisa ser mais autêntica. Como [PERSONA] descreveria
o problema dela para um amigo próximo — não para um vendedor? Que gírias, abreviações
ou expressões coloquiais ela usaria? Que palavras ela claramente NÃO usaria porque
soam muito formais ou de marketing? Reescreva o bloco de linguagem com isso.
```

**Para validar a jornada:**
```
Valide cada etapa da jornada: qual é o conteúdo ou touchpoint específico de
[MARCA] que deveria aparecer em cada momento? O que acontece se [MARCA] não aparecer
nessa etapa — o cliente vai para onde? Adicione esses detalhes à jornada.
```

## Output

**Arquivo:** `clients/[CLIENTE]/brand-guidelines/audience.md`

## Critérios de Qualidade

- [ ] O ICP é específico o suficiente para guiar compra de mídia
- [ ] As personas têm nome e são tratadas como pessoas reais, não categorias
- [ ] As dores são emocionalmente verdadeiras, não superficiais
- [ ] A linguagem da persona difere claramente da linguagem corporativa
- [ ] A anti-persona explica o critério de exclusão, não apenas descreve quem evitar
- [ ] A jornada tem touchpoints concretos de [MARCA] em cada etapa

## Pós-condições

- `audience.md` salvo no workspace do cliente
- Próxima fase disponível: `*voice` (Fase 4)
