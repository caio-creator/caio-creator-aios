# P04 — Personalidade e Arquétipo de Marca

**Fase:** 4 de 9
**Objetivo:** Definir o arquétipo e a personalidade da marca — a base psicológica que guia toda a comunicação

---

## Quando Usar

Use após mapear o público (Fase 3). O arquétipo não é uma escolha estética — é um sistema de valores e comportamentos que torna a comunicação consistente e reconhecível, mesmo quando feita por equipes diferentes em momentos diferentes.

---

## Prompt Principal

```
Você é um Especialista em Psicologia de Marca e Arquétipos. Com base no posicionamento e público abaixo, defina o sistema de personalidade de [NOME_DA_MARCA].

━━━ CONTEXTO ━━━
[INSERIR POSICIONAMENTO + PERSONAS]

━━━ OS 12 ARQUÉTIPOS DE MARCA ━━━

Avalie [NOME_DA_MARCA] contra cada arquétipo:

| Arquétipo | Desejo Central | Medo | Motivação |
|-----------|---------------|------|-----------|
| Inocente | Ser feliz, puro | Punição | Fazer o bem |
| Sábio | Descobrir a verdade | Ser enganado | Entender o mundo |
| Explorador | Liberdade, aventura | Aprisionamento | Descobrir |
| Herói | Provar o valor | Fraqueza | Dominar |
| Fora da Lei | Revolução | Impotência | Destruir o que não funciona |
| Mago | Transformação | Consequências | Tornar sonhos realidade |
| Pessoa Comum | Pertencimento | Ser deixado de lado | Conectar |
| Amante | Intimidade | Não ser amado | Criar vínculos |
| Bobo da Corte | Alegria, diversão | Tédio | Viver o momento |
| Prestativo | Ajudar os outros | Ingratidão | Servir |
| Criador | Criar algo valioso | Mediocridade | Dar forma à visão |
| Governante | Controle, ordem | Caos | Criar prosperidade |

━━━ DEFINIÇÃO DO ARQUÉTIPO ━━━

**1. ARQUÉTIPO PRIMÁRIO**
Qual arquétipo captura melhor a essência de [NOME_DA_MARCA]?
- Por que este (e não os outros)?
- Como ele se manifesta no que a marca faz, diz e entrega?
- Quais marcas globais compartilham este arquétipo — e o que aprendemos com elas?

**2. ARQUÉTIPO SECUNDÁRIO**
Qual arquétipo completa e nuança o primário?
- Como os dois se combinam sem se contradizer?
- Qual é a tensão criativa entre eles?

**3. PERSONALIDADE EM 5 DIMENSÕES**

Para cada dimensão, defina onde [NOME_DA_MARCA] se posiciona numa escala de 1-10:

- **Seriedade ←→ Leveza** (1 = muito séria, 10 = muito leve)
  [posição + justificativa]

- **Formal ←→ Informal** (1 = muito formal, 10 = muito informal)
  [posição + justificativa]

- **Técnico ←→ Acessível** (1 = muito técnico, 10 = muito acessível)
  [posição + justificativa]

- **Tradicional ←→ Inovador** (1 = muito tradicional, 10 = muito inovador)
  [posição + justificativa]

- **Individual ←→ Coletivo** (1 = foco no indivíduo, 10 = foco na comunidade)
  [posição + justificativa]

**4. ADJETIVOS DA MARCA**

5 adjetivos que definem a personalidade (não o que faz, mas como é):
- [adjetivo 1]: por que este?
- [adjetivo 2]: por que este?
- [adjetivo 3]: por que este?
- [adjetivo 4]: por que este?
- [adjetivo 5]: por que este?

E 3 adjetivos que a marca definitivamente NÃO é:
- [anti-adjetivo 1]
- [anti-adjetivo 2]
- [anti-adjetivo 3]

**5. A MARCA COMO PESSOA**

Se [NOME_DA_MARCA] fosse uma pessoa que você conhece:
- Como ela se vestiria para uma reunião de negócios?
- Como ela se vestiria num final de semana?
- O que ela pediria num restaurante?
- Como ela falaria com um cliente novo?
- Como ela falaria com um cliente de longa data?
- O que ela nunca diria?

━━━ SÍNTESE ━━━

Encerre com um "Cartão de Identidade de Personalidade" resumindo:
- Arquétipo primário + secundário
- As 5 dimensões com posições
- 5 adjetivos + 3 anti-adjetivos
- A marca em 1 frase de personalidade (não de posicionamento)
```

---

## Prompt de Refinamento — Testar Consistência

```
Agora aplique um teste de consistência de personalidade em 3 situações:

**SITUAÇÃO 1: CRISE**
Um cliente publica uma reclamação forte nas redes sociais. Como [NOME_DA_MARCA], com a personalidade definida, responderia? Escreva a resposta real.

**SITUAÇÃO 2: CELEBRAÇÃO**
A marca alcançou um marco importante. Como ela anunciaria isso? Escreva o post.

**SITUAÇÃO 3: INSTRUÇÃO**
A marca precisa ensinar algo técnico e complexo para iniciantes. Como ela abordaria isso? Escreva o início do texto.

Avalie: nas 3 situações, a personalidade está consistente? Onde haveria risco de inconsistência?
```

---

## Output Esperado

Seção no `voice-and-tone.md`:

```markdown
## Personalidade de Marca

### Arquétipo Primário: [Nome]
[descrição + manifestação na marca]

### Arquétipo Secundário: [Nome]
[descrição + como complementa]

### Dimensões de Personalidade
[tabela com posições]

### Adjetivos da Marca
Somos: [5 adjetivos]
Não somos: [3 anti-adjetivos]

### A Marca como Pessoa
[descrição vívida]
```

---

## Critérios de Qualidade

- [ ] Arquétipo justificado com evidências do briefing
- [ ] Tensão criativa entre primário e secundário identificada
- [ ] 5 dimensões com posições claras e justificadas
- [ ] Anti-adjetivos tão importantes quanto os adjetivos
- [ ] "Marca como pessoa" é vívida e específica

---

## Próximo Passo

→ `P04-voice-definition.md` (definir o DNA da voz de marca)
