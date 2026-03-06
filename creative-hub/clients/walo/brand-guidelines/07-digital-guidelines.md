# WALO | Digital Guidelines & Implementation

> **Frase-Guia Interna:** "Nenhuma decisão de marca que não caiba no amor."

## Filosofia Digital

WALO existe onde sua audiência vive — e sua audiência vive no TikTok às 22h, rola o feed no transporte, pesquisa produto no Mercado Livre pelo celular. Não existe decisão digital neutra: toda escolha de plataforma, velocidade, acessibilidade e tom de resposta é uma declaração sobre quem a marca respeita.

A filosofia digital de WALO parte de três convicções:

**1. Presença antes de performance.** O objetivo de cada touchpoint digital não é converter imediatamente — é fazer quem chegou se sentir visto. Uma pessoa que encontra WALO no TikTok e sente "isso foi feito pra mim" é mais valiosa do que mil impressões de alguém para quem WALO foi apenas mais um anúncio.

**2. Acessibilidade como ato de inclusão.** Performance rápida, contraste legível, tipografia adequada em telas pequenas — não são apenas boas práticas técnicas. São a implementação digital do compromisso de inclusão. Uma marca que diz "todos os corpos são bem-vindos" mas tem site que não carrega em conexão 3G está excluindo exatamente quem mais precisa ser incluído.

**3. Tom consistente como território de confiança.** O tom afetuoso de WALO não vive só no Instagram — vive na resposta de WhatsApp Business, no email de boas-vindas, na descrição do produto no Mercado Livre, no auto-resposta às 23h. Quando o tom varia por canal, a confiança quebra.

## Mobile-First como Princípio de Amor

Mobile-first não é uma decisão técnica — é uma declaração de valores.

80% da audiência de WALO encontra a marca pelo celular. Luna não pesquisa colágeno no notebook da startup — pesquisa no TikTok enquanto espera o almoço. Gabriel não compra no desktop — compra no Mercado Livre pelo telefone antes de dormir. Se WALO não funciona perfeitamente em mobile, WALO não funciona — e a mensagem implícita é "você, com seu telefone comum, não era o público que imaginávamos."

**Implementação prática do Mobile-First com amor:**
- Velocidade < 3s = respeitar o tempo de quem não tem fibra óptica
- Fonte mín. 16px = legibilidade para todos os graus de visão
- Área de toque generosa em CTAs = acessibilidade como padrão, não opção
- Checkout em menos de 3 cliques = não desperdiçar a decisão de compra já tomada

---

## 1. WEBSITE WALO.COM

### Arquitetura
```
HOME
├─ Hero: Visual + Frase-guia
├─ Produtos: 3 sabores em carousel
├─ Sobre: Propósito + Valores
├─ Comunidade: Reviews + User stories
├─ FAQ: Perguntas frequentes
└─ CTA: Compre agora (TikTok Shop / Mercado Livre)

SOBRE
├─ História de origem
├─ Time (Gabriel, Gustavo, Roger)
├─ Valores & Inclusão
└─ Contato

BLOG (Futuro)
├─ Educação sobre colágeno
├─ Histórias de clientes
├─ Guia de rotina
└─ News & Updates
```

### Ton de Voz Web
- Acolhedor mas profissional
- Educativo sem ser pedante
- Inclusivo explicitamente
- CTA suave (não agressivo)

### Homepage Copy Example
```
HERO SECTION:
"Hidratação com amor.
Para todos os corpos. Todos os dias."

SUBHEADER:
"WALO transforma sua hidratação em um gesto de amor próprio.
Colágeno + Creatina em sabores irresistíveis."

CTA PRINCIPAL:
"Descubra WALO" [button roxo]

SECONDARY CTA:
"Veja como funciona" [link]
```

### Mobile Responsive
- **Viewport:** 320px - 1920px
- **Breakpoints:** 480px, 768px, 1024px, 1280px
- **Font size:** Escalado por breakpoint (mín 16px mobile)
- **Imagens:** Lazy-loaded, otimizadas WebP

---

## 2. TIKTOK SHOP INTEGRATION

### Product Listing
```
[Imagem 1: Garrafa destaque]
[Imagem 2: Close no rótulo]
[Imagem 3: Garrafa + mão]
[Vídeo: 15s de produto em ação]
[Imagem 5: Feedback cliente]
```

### Descrição do Produto
```
WALO — Açaí Berry | Colágeno + Creatina

✓ 500ml por garrafa
✓ Sabor Açaí Berry (roxo)
✓ Colágeno hidrolisado (absorção máxima)
✓ Creatina monohidratada
✓ Sem culpa, sem julgamento

Para quem quer:
→ Pele e cabelo mais fortes
→ Energia e disposição
→ Rotina com propósito
→ Cuidado sem culpa

Resultado em 3-4 semanas.
Recomendação: 1x ao dia, qualquer hora.

Feito por quem acredita em você. 💜

#WALO #Colágeno #Creatina #Autocuidado
```

### TikTok Content Strategy
- **Frequência:** 5x por semana (diferentes horários)
- **Tipos:** 70% Educação/Inspiração, 20% Comunidade, 10% Promo
- **Duração:** 15-30 segundos (natural, não forçado)
- **Engagement:** Responder comentários em 2 horas

---

## 3. MERCADO LIVRE SELLER

### Perfil de Loja
```
Nome Loja: WALO — We Are Love
Bio: "Bebida funcional com amor próprio.
Colágeno + Creatina em sabores irresistíveis."

Imagem de Capa: Garrafa main visual
Destacados: 3 sabores em carousel
```

### Produto Listing (Mercado Livre)
```
TÍTULO:
WALO Agua com Colágeno + Creatina 500ml - Roxo

PREÇO:
[Price transparente] + Frete grátis (acima de R$ 50)

DESCRIÇÃO:
[Estruturada em tópicos]
✓ O que é: Água com proteína de colágeno e creatina
✓ Benefícios: Pele, cabelo, unhas, energia
✓ Modo de usar: 1x ao dia, qualquer hora
✓ Ingredientes: Colágeno hidrolisado, creatina, saborizantes naturais
✓ Para quem: Todos que buscam cuidado sem culpa

IMAGENS:
[Garr afa principal] [Close rótulo] [Contexto] [Nutrição]

AVALIAÇÕES:
Seção destacada de reviews
```

---

## 4. INSTAGRAM & FACEBOOK

### Instagram Profile
```
Bio:
"Hidratação com amor. Para todos os corpos. Todos os dias. 💜
Colágeno + Creatina em sabores irresistíveis.
[Link TikTok Shop]"

Foto de Perfil: Logo WALO (roxo)
Capa do Feed: Roxo + branco (limpo)
Stories Highlights: Sabores, Testimunhos, FAQ
```

### Feed Strategy
- **Posting:** 3x por semana (seg, qua, sab)
- **Ratio:** 60% Inspiração, 30% Educação, 10% Promo
- **Carrossel:** Educational slides (em português)
- **Captions:** 100-150 caracteres + hashtags (10-15)

### Stories Strategy
- **Frequência:** Daily (quando houver conteúdo)
- **Tipos:** Behind-the-scenes, polls, Q&A, clips de reels
- **CTA:** "Clique no link" (TikTok Shop)

### Reels Strategy
- **Frequência:** 2x por semana
- **Duração:** 15-30 segundos
- **Conteúdo:** Trends + Brand message (educação, inspiração)

---

## 5. EMAIL MARKETING

### Welcome Series (3 emails)
```
Email 1 (Imediato):
Assunto: "Bem-vinda ao time WALO! 💜"
Conteúdo: Boas-vindas + oferta inicial

Email 2 (Dia 3):
Assunto: "Como potencializar seu colágeno?"
Conteúdo: Educação sobre uso + ingredientes

Email 3 (Dia 7):
Assunto: "Sua comunidade te espera..."
Conteúdo: Convite para grupo / comunidade privada
```

### Weekly Newsletter
**Dia:** Terça, 10am
**Assunto:** Variado (educação, story, comunidade)
**Estrutura:**
1. Header com logo
2. Imagem principal
3. Copy (150 palavras máx)
4. CTA (link ou botão)
5. Footer com social links

---

## 6. WHATSAPP BUSINESS

### Auto-resposta
```
Obrigada por mensagear WALO! 💜

Respondemos em até 2 horas nos dias úteis.
Dúvidas? Veja nosso FAQ: [link]

[Opções:]
1. Dúvida sobre produto
2. Status do pedido
3. Feedback / Reclamação
4. Parceria / Influencer
```

### Atendimento
- **Tone:** Afetuoso, resolutivo
- **Tempo:** < 2 horas em dias úteis
- **Escalação:** Dúvidas complexas → email com contexto

---

## 7. ANÚNCIOS PAGOS

### Google Ads
**Keywords:**
- "colágeno + creatina"
- "água com colágeno"
- "bebida funcional"
- "autocuidado drink"
- "WALO roxo"

**Bid Strategy:** CPC máximo (conversão foco)
**Budget:** R$ 300-500/dia

### Meta Ads (Facebook + Instagram)
**Audiência:**
- 20-40 anos, urbano, Brasil
- Interest: Wellness, autocuidado, fitness casual
- Behavior: E-commerce comprador

**Creatives:**
- 70% Educational (colágeno, creatina)
- 20% Inspirational (stories)
- 10% Promotional (offers)

**Budget:** R$ 500-1000/dia (teste)

### TikTok Ads
**Formato:** TikTok Shop ads (nativo)
**Audiência:** 18-40 anos, interest wellness
**Creative:** Mix de UGC + brand content

---

## 8. ANALYTICS & TRACKING

### KPIs por Canal

| Canal | Métrica | Target |
|-------|---------|--------|
| **Website** | CTR | 3%+ |
|  | Bounce Rate | < 60% |
|  | Conversão | 2%+ |
| **TikTok** | Views | 50k+/post |
|  | Engagement | 5-8% |
|  | Click Rate | 2%+ |
| **Instagram** | Reach | 10k+/post |
|  | Engagement | 8-12% |
|  | Saves | 5%+ |
| **Email** | Open Rate | 25%+ |
|  | CTR | 5%+ |
|  | Conversion | 2%+ |
| **Marketplace** | Views | 1k+/dia |
|  | Conversion | 1-2% |
|  | Reviews | 4.5+ stars |

### Tools
- **Analytics:** GA4 (website)
- **Social:** Meta Business Suite, TikTok Analytics
- **Email:** Mailchimp ou SendGrid
- **Marketplace:** Próprio dashboard (Mercado Livre, TikTok)

---

## 9. CHECKLIST DE IMPLEMENTAÇÃO

**Website:**
- [ ] Homepage pronto
- [ ] Mobile responsivo
- [ ] Fast (< 3s)
- [ ] Analytics integrado (GA4)
- [ ] Acessibilidade testada

**Social Media:**
- [ ] Perfis criados (TikTok, Instagram, Facebook)
- [ ] Bio atualizado
- [ ] Content calendar planejado
- [ ] Equipe de resposta estruturada

**E-commerce:**
- [ ] TikTok Shop integrado
- [ ] Mercado Livre loja pronta
- [ ] Imagens otimizadas
- [ ] Descrições claras

**Email:**
- [ ] List limpa e segmentada
- [ ] Welcome series pronta
- [ ] Templates responsivos
- [ ] Automação testada

**Ads:**
- [ ] Pixéis configurados
- [ ] Audiências definidas
- [ ] Creatives prontos
- [ ] Budget alocado

---

## 10. FALHA RÁPIDA & OTIMIZAÇÃO

**Primeira Semana:** Launch e monitorar
**Primeira Quinzena:** Ajustes rápidos (copy, imagens, timing)
**Primeiro Mês:** Dados sólidos, pivota se necessário
**Mensal:** Review de KPIs, planejamento próximo mês

---

## GATE 07 — Verificação de Qualidade

- [x] **Frase-Guia Interna** posicionada como filtro de todas as decisões digitais
- [x] **Filosofia Digital** articulada em prosa — 3 convicções com dissertação de cada uma
- [x] **Mobile-First como Princípio de Amor** — decisão técnica alinhada com valores de marca
- [x] **Website** — arquitetura, tom de voz e copy de exemplo documentados
- [x] **TikTok Shop** — produto listing, estratégia de conteúdo e frequência documentadas
- [x] **Email Marketing** — welcome series (3 emails) + newsletter semanal estruturada
- [x] **Analytics & KPIs** — métricas por canal com targets definidos
- [x] **Checklist de implementação** por área (website, social, e-commerce, email, ads)

**Resultado Gate 07: 8/8 — PASS ✅**

---

**Status:** ✅ Digital Guidelines — Padrão AIOS
**Filtro Operacional:** I.R.A. — Inclusão. Ritual. Amor.
**Última atualização:** 6 de março de 2026
**Próximo:** `deliverables/brand-book.md`
