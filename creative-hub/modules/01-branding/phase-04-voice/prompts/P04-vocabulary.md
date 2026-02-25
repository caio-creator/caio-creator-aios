# P04 — Vocabulário de Marca

**Fase:** 4 de 9
**Objetivo:** Construir o banco de palavras da marca — o léxico que torna a comunicação reconhecível e consistente

---

## Quando Usar

Use após definir o DNA de voz (P04-voice-definition). O vocabulário é o último componente da Fase 4 — a lista de palavras-chave que qualquer membro da equipe ou IA pode usar para comunicar como a marca.

---

## Prompt Principal

```
Você é um Especialista em Linguística de Marca. Com base no DNA de voz e personalidade abaixo, construa o vocabulário completo de [NOME_DA_MARCA].

━━━ CONTEXTO ━━━
[INSERIR DNA DE VOZ + PERSONALIDADE + POSICIONAMENTO]

━━━ VOCABULÁRIO EM 4 CATEGORIAS ━━━

**CATEGORIA 1: PALAVRAS DA MARCA (use sempre)**

Selecione 50 palavras que representam a marca — termos que a marca usa naturalmente e que devem aparecer na comunicação:

Subdivida em:
- Palavras de VALORES (ex: autenticidade, profundidade, resultado)
- Palavras de AÇÃO (verbos que a marca usa — ex: transformar, construir, revelar)
- Palavras de ESTADO (como o cliente se sente — ex: confiante, claro, capaz)
- Palavras de PRODUTO/SERVIÇO (termos técnicos próprios da marca)
- Palavras de CONEXÃO (que criam proximidade — ex: juntos, parceria, junto com você)

**CATEGORIA 2: PALAVRAS PROIBIDAS (nunca use)**

Liste 20 palavras ou expressões que a marca evita — porque soam:
- Genéricas demais para o setor
- Frias demais para a personalidade
- Inconsistentes com os valores
- Superusadas pela concorrência

Para cada proibição, dê a alternativa preferida da marca.

**CATEGORIA 3: FRASES ASSINATURA**

5-10 frases que encapsulam a filosofia da marca — podem ser usadas como tagline, CTAs, headlines, ou assinaturas:

Para cada frase:
- A frase completa
- Onde usar (qual contexto)
- Por que funciona para esta marca

**CATEGORIA 4: TERMOS EXCLUSIVOS**

Termos, metodologias ou conceitos que só a marca usa — palavras inventadas ou ressignificadas:
- [Termo exclusivo 1]: o que significa e como usar
- [Termo exclusivo 2]: o que significa e como usar

━━━ GUIA DE USO ━━━

**Tratamento do cliente:**
- Como chamar o cliente? (você, vocês, você + nome, cliente, parceiro, outro?)
- Usar português formal ou informal?
- Usar "a gente" ou "nós"?

**Pontuação e recursos:**
- Uso de exclamação (sim/não/quando)
- Uso de emoji (sim/não/quando/quais)
- Uso de travessão, reticências, parênteses
- Uso de negrito e itálico

**Formatos de texto:**
- Textos curtos (até 5 linhas): tom e estrutura típica
- Textos médios (6-20 linhas): como estruturar
- Textos longos (artigos): como abrir e encerrar

━━━ EXEMPLOS DE APLICAÇÃO ━━━

Escreva 5 exemplos práticos usando o vocabulário definido:

1. Post de Instagram (carrossel — primeira tela)
2. E-mail de boas-vindas (parágrafo de abertura)
3. Bio do perfil (máximo 150 caracteres)
4. Resposta a comentário positivo
5. Resposta a dúvida frequente

Para cada exemplo, aponte quais elementos do vocabulário foram usados.
```

---

## Prompt de Refinamento — Consistência em IA

```
Quero garantir que qualquer IA (ChatGPT, Claude, Gemini) consiga escrever como [NOME_DA_MARCA] ao receber um briefing de conteúdo.

Crie um "card de voz" conciso — máximo 200 palavras — que encapsula:
1. O tom em 3 adjetivos
2. 5 palavras que sempre aparecem
3. 5 palavras proibidas
4. 1 exemplo de frase no estilo correto
5. 1 regra inquebrável de linguagem

Este card será incluído em todos os prompts de criação de conteúdo da marca.
```

---

## Output Esperado

Seção no `voice-and-tone.md`:

```markdown
## Vocabulário de Marca

### Palavras da Marca (use sempre)
**Valores:** [lista]
**Ações:** [lista]
**Estados:** [lista]
**Produto:** [lista]
**Conexão:** [lista]

### Palavras Proibidas
| Proibida | Alternativa | Motivo |
|----------|------------|--------|

### Frases Assinatura
[lista com contexto de uso]

### Termos Exclusivos
[glossário interno]

### Guia de Uso
[regras de pontuação, tratamento, formatos]

### Card de Voz (IA)
[versão compacta para prompts]
```

---

## Critérios de Qualidade

- [ ] 50 palavras da marca em 5 categorias
- [ ] 20 palavras proibidas com alternativas
- [ ] Frases assinatura com contexto de uso
- [ ] Card de voz para IA — conciso e completo
- [ ] 5 exemplos de aplicação escritos no tom correto

---

## Próximo Passo

→ `P05-brand-story.md` (Fase 5 — Narrativa e Storytelling)
