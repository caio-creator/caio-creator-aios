# Task: brand-director-digital

**Agente:** @brand-director (Atlas)
**Fase:** 8 de 9 — Diretrizes Digitais por Canal
**Versão:** 1.0.0

---

## Propósito

Definir como a marca se comporta em cada canal digital, adaptando a estratégia de marca às especificidades de cada plataforma sem perder a consistência de identidade e voz.

## Pré-condições

- Fases 1 a 7 concluídas
- `positioning.md`, `audience.md`, `voice-and-tone.md`, `editorial.md` disponíveis

## Prompt Principal

```
CONTEXTO: Você é um especialista em Marketing Digital e Estratégia de Canais
com profundo conhecimento das dinâmicas e algoritmos de cada plataforma. Com base
nos artefatos de [NOME_DA_MARCA], crie as diretrizes completas por canal digital.

━━━ ESTRUTURA POR CANAL ━━━

Para cada canal relevante para [MARCA], defina:

──────────────────────────────
📸 INSTAGRAM
──────────────────────────────

PROPÓSITO DESTE CANAL PARA [MARCA]:
Por que estar no Instagram? O que este canal entrega que outros não entregam?

PERFIL E BIO:
- Foto de perfil: o que deve aparecer (logo, produto, founder?)
- Bio ideal (150 caracteres — escreva 3 versões para testar)
- Link da bio: o que deve apontar e quando trocar
- Highlights: quais categorias e que conteúdo guardar

ESTRATÉGIA DE CONTEÚDO:
- Mix de formatos: % Reels, % Carrossel, % Posts estáticos, % Stories
- Frequência: posts por semana por formato
- Horários prioritários: baseado no comportamento da persona
- Assuntos proibidos neste canal (o que jamais postar aqui)

REELS:
- Duração ideal
- Estrutura de abertura (os primeiros 3 segundos são tudo)
- Tipos de conteúdo que funcionam no Reels para [MARCA]
- Abordagem de áudio (original, trending, off)

STORIES:
- Frequência ideal
- O que vai nos stories mas NÃO no feed
- Tom dos stories (mais informal? mais pessoal?)
- Uso de interações (polls, questions, quiz)

CAPTIONS:
- Extensão ideal
- Estrutura (gancho, corpo, CTA)
- Uso de emojis (como e onde)
- Estratégia de hashtags (quantidade, mix popular/nicho, uso de hashtag própria)

ENGAJAMENTO:
- Política de resposta a comentários (tom, tempo, quando NÃO responder)
- Estratégia de DMs
- Regras para UGC (user-generated content)

──────────────────────────────
💼 LINKEDIN
──────────────────────────────

PROPÓSITO DESTE CANAL PARA [MARCA]:
(se relevante — se não for, justifique por que não usar)

PERFIL DA EMPRESA:
- Banner e foto de perfil
- About em 200 palavras
- Botão de ação ideal

CONTEÚDO:
- Tipos de posts que funcionam no LinkedIn para [MARCA]
- Tom específico para esta plataforma (mais formal? mais educacional?)
- Frequência e horários
- Formato preferido (texto longo, artigo, PDF, vídeo)
- Uso de hashtags (menos é mais no LinkedIn)

THOUGHT LEADERSHIP:
- Quem da equipe deve ter perfil ativo?
- Temas para artigos longos
- Como pessoalizar o conteúdo institucional

──────────────────────────────
🎵 TIKTOK
──────────────────────────────

(Se relevante para [MARCA] — justifique se não for)

PROPÓSITO DESTE CANAL:
Por que TikTok para esta marca? O que o público busca lá?

ESTRATÉGIA:
- Tom: mais casual, mais experimental que outros canais
- Tipos de vídeo que fazem sentido (educacional, entretenimento, desafio, bastidores)
- Relação com trends: pegar trends (sim/não/como adaptar)
- Frequência
- Duração ideal

──────────────────────────────
📧 EMAIL MARKETING
──────────────────────────────

PROPÓSITO DESTE CANAL:
O que o email faz que redes sociais não fazem para [MARCA]?

TIPOS DE EMAIL:
Para cada tipo, defina: frequência, objetivo, estrutura básica, tom
- Newsletter (conteúdo regular)
- Emails transacionais (boas-vindas, confirmação, recibo)
- Sequência de nurturing (onboarding de novos leads)
- Campanhas promocionais
- Reengajamento (inativos)

ESTRUTURA PADRÃO:
- Subject line: regras e exemplos (o que abre e o que não abre)
- Preview text: como usar para aumentar abertura
- From name: [Nome / Empresa] — qual usar?
- Corpo: proporção de imagem/texto
- CTA: quantos, onde, como escrever
- Footer: o que deve ter obrigatoriamente

SEGMENTAÇÃO BÁSICA:
- Como segmentar a lista de [MARCA]
- O que muda por segmento
- Regras de frequência (não sobre-enviar)

──────────────────────────────
🌐 WEBSITE (se aplicável)
──────────────────────────────

OBJETIVO PRINCIPAL DO SITE:
O site de [MARCA] é para: descoberta, conversão, educação, e-commerce?

PÁGINAS ESSENCIAIS:
Para cada página principal: objetivo, estrutura sugerida, tom específico

HOME:
- Hero: o que vai no headline e subheadline
- Estrutura de seções recomendada
- O que deve estar acima da dobra

TOM DO SITE:
Como o tom de voz se adapta para a leitura em tela
(mais escannable, mais direto, mais benefícios que features)

━━━ REGRAS TRANSVERSAIS ━━━

Defina regras que valem para TODOS os canais:
- Consistência visual (como as diretrizes visuais se aplicam digitalmente)
- Consistência de mensagem (messaging principal que aparece em todos os canais)
- Regras de crise (como reagir a comentários negativos, crises, erros)
- Política de parceria e menções

━━━ CONTEXTO ━━━

POSICIONAMENTO: [INSERIR POSITIONING.MD]
PERSONA: [INSERIR AUDIENCE.MD — comportamento digital da persona]
VOZ: [INSERIR VOICE-AND-TONE.MD]
LINHA EDITORIAL: [INSERIR EDITORIAL.MD — pilares e régua de conteúdo]
CANAIS PRIORITÁRIOS PARA [MARCA]: [EXTRAIR DO BRIEFING.MD]
```

## Prompts de Refinamento

**Para o Instagram especificamente:**
```
Crie a estrutura da primeira semana de conteúdo de [MARCA] no Instagram em detalhe:
7 posts, um por dia, com formato, tema, gancho de abertura e instrução para a legenda.
Use a linha editorial definida e os pilares de conteúdo. Esta deve ser a semana
de lançamento ou retomada da conta.
```

**Para o email marketing:**
```
Escreva o email de boas-vindas de [MARCA] que vai para todo novo cadastro.
Máximo de 300 palavras. Use o tom de voz definido. O objetivo é fazer o leitor
se sentir que tomou a decisão certa ao se inscrever. Inclua 1 CTA claro.
```

## Output

**Arquivo:** `clients/[CLIENTE]/brand-guidelines/digital-guidelines.md`

## Critérios de Qualidade

- [ ] Cada canal tem justificativa de por que está (ou não está) na estratégia
- [ ] O tom de cada canal é adaptado mas reconhecível como a mesma marca
- [ ] As regras de engajamento são específicas e acionáveis
- [ ] O email marketing tem estrutura de sequência definida
- [ ] As regras transversais garantem consistência sem rigidez

## Pós-condições

- `digital-guidelines.md` salvo no workspace do cliente
- Próxima fase disponível: `*compile-brandbook` (Fase 9)
