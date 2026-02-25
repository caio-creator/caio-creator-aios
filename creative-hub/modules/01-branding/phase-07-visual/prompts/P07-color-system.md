# P07 — Sistema de Cores

**Fase:** 7 de 9 (suplemento)
**Objetivo:** Desenvolver o sistema de cores completo com paleta, proporções e regras de uso

---

## Quando Usar

Use como suplemento à P07-visual-direction quando a marca precisar de especificação de cores mais detalhada para briefar um designer ou validar uma paleta existente.

---

## Prompt Principal

```
Você é um Especialista em Teoria das Cores aplicada ao branding. Com base na personalidade e direção visual abaixo, desenvolva o sistema de cores de [NOME_DA_MARCA].

NOTA: Você vai sugerir direções de cor com descrições de mood e referências. Não defina HEX codes fixos — isso é responsabilidade do designer após testar em contexto real. Defina o CARÁTER das cores.

━━━ CONTEXTO ━━━
[INSERIR PERSONALIDADE + DIREÇÃO VISUAL]

━━━ SISTEMA DE CORES ━━━

**FILOSOFIA DE COR**
Qual é a filosofia por trás das escolhas de cor de [NOME_DA_MARCA]?
Em 2-3 frases: por que estas cores? O que elas comunicam sobre a marca?

**COR PRIMÁRIA**

Definição de caráter:
- Família de cor: [azul, verde, vermelho, terra, neutro...]
- Tom: [mais frio/quente, mais claro/escuro, mais saturado/dessaturado]
- Mood: o que esta cor deve evocar no público?
- Usos obrigatórios: onde sempre aparece?
- Usos proibidos: onde nunca aparece?

Referências de cor (não HEX — mood):
- Pense na cor do [objeto/material/elemento natural] — é esse tom
- Mais próxima de [cor conhecida] do que de [cor conhecida]

**CORES SECUNDÁRIAS (1-2)**

Para cada secundária:
- Relação com a primária: complementar, análoga, triádica?
- Função: suporte, destaque, contraste, ou alternativa?
- Usos: quando e onde se aplica?

**NEUTROS**

- Qual é o "preto" da marca? (preto puro, quase-preto, grafite escuro, azul-escuro)
- Qual é o "branco" da marca? (branco puro, off-white, creme, cinza-claro)
- Há cinzas intermediários? Quais funções têm?

**PROPORÇÕES**

Como as cores se distribuem visualmente:
- Cor dominante na maioria do material: qual e em quanto?
- Cor de suporte: aparece com que frequência?
- Cor de destaque: usada em pequenas doses para chamar atenção

Ex: 60% neutros (branco/preto) + 30% primária + 10% destaque

**PSICOLOGIA DAS CORES**

Para cada cor da paleta:
- Associações positivas que queremos ativar
- Associações negativas que precisamos neutralizar com os outros elementos
- Como a combinação das cores trabalha junto para criar o mood correto?

**ACESSIBILIDADE**

A paleta de [NOME_DA_MARCA] deve:
- Respeitar contraste mínimo WCAG AA para texto?
- Funcionar em contextos de daltonismo (verificar no design)?
- Quais combinações de texto/fundo devem ser evitadas por contraste insuficiente?

━━━ APLICAÇÕES DE REFERÊNCIA ━━━

Para cada aplicação, descreva o uso de cor ideal:

**Background de site:**
- Tom: [primária clara / neutro / branco]
- Por quê: [justificativa]

**Botões de CTA:**
- Tom: [qual cor, qual shade]
- Por quê: [justificativa]

**Headlines:**
- Cor: [qual]
- Por quê: [justificativa]

**Fundo escuro (dark mode ou seção de destaque):**
- Cor de fundo: [qual]
- Cor de texto: [qual]
```

---

## Prompt de Refinamento — Testar Combinações

```
Com a paleta definida, teste estas 5 combinações e avalie se funcionam para [NOME_DA_MARCA]:

1. Texto escuro em fundo branco — funciona? Qual é o mood?
2. Texto claro em fundo na cor primária — funciona? Qual é o mood?
3. Elemento destaque sobre neutro — chama atenção sem agredir?
4. Toda a paleta junta numa composição — há harmonia ou tensão?
5. Apenas preto e branco — a marca ainda funciona sem cor?

Para cada teste: aprova, ajusta, ou rejeita — e por quê.
```

---

## Output Esperado

Adição ao `visual-brief.md`:

```markdown
## Sistema de Cores Detalhado

### Filosofia de Cor
[2-3 frases]

### Cor Primária
[caráter + mood + usos]

### Cores Secundárias
[caráter + relação + função]

### Neutros
[preto + branco + intermediários]

### Proporções
[distribuição típica]

### Aplicações
[por formato]
```

---

## Critérios de Qualidade

- [ ] Filosofia de cor explica o "por quê" das escolhas
- [ ] Cada cor com mood e não apenas família
- [ ] Proporções definidas
- [ ] Psicologia das cores considerada com associações negativas identificadas
- [ ] Aplicações de referência por contexto

---

## Próximo Passo

→ `P08-instagram.md` (Fase 8 — Diretrizes Digitais)
