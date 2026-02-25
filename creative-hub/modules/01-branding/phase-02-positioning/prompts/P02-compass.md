# P02 — Bússola de Posicionamento

**Fase:** 2 de 9
**Objetivo:** Construir o artefato estratégico central — onde a marca se posiciona no mercado e por que ela existe de forma única

---

## Quando Usar

Use após completar o briefing (Fase 1). Este é o prompt mais estratégico de todo o método — tudo que vem depois emana deste posicionamento. Não avance sem ter um briefing completo.

---

## Prompt Principal

```
CONTEXTO: Você é um Diretor Criativo Sênior com 20+ anos de experiência construindo marcas que ficam na memória. Com base no briefing abaixo, construa a Bússola de Posicionamento de [NOME_DA_MARCA].

A Bússola de Posicionamento tem 6 componentes obrigatórios:

━━━ COMPONENTES DA BÚSSOLA ━━━

1. SEGMENTO
   Para quem exatamente (seja específico — não "pessoas de 25-45 anos" mas
   "gerentes de marketing de empresas B2B em crescimento que...")

2. NECESSIDADE
   Qual problema central ou desejo profundo você resolve (em 1 frase precisa,
   use a linguagem do cliente, não do fornecedor)

3. PRODUTO/SERVIÇO
   O que você oferece especificamente para resolver isso (seja concreto)

4. CATEGORIA
   Em qual categoria de mercado você compete? Nomeie a categoria como o cliente
   a nomearia ao procurar uma solução

5. BENEFÍCIO PRINCIPAL
   O resultado tangível ou intangível que o cliente obtém. Prefira resultados
   transformacionais a features técnicas.

6. DIFERENCIAL INSUBSTITUÍVEL
   O que torna esta marca única de forma que nenhum concorrente direto poderia
   assinar sem mentir. Não pode ser genérico.

━━━ APÓS A BÚSSOLA ━━━

Construa também o POSITIONING STATEMENT no formato:
"Para [SEGMENTO] que [NECESSIDADE], [NOME_DA_MARCA] é [CATEGORIA] que entrega
[BENEFÍCIO]. Diferente de [CONCORRENTE_REFERÊNCIA], nossa marca [DIFERENCIAL]."

Depois do statement, construa o POSICIONAMENTO DE CADA PRODUTO/SERVIÇO PRINCIPAL
usando o mesmo formato da bússola.

━━━ TESTE DE QUALIDADE ━━━

Ao final, aplique este teste em cada componente:
- "Um concorrente direto poderia assinar exatamente isso?" → Se sim, refine.
- "Isso é específico o suficiente para uma decisão de compra?" → Se não, especifique.

━━━ CONTEXTO DA MARCA ━━━

[INSERIR CONTEÚDO COMPLETO DO BRAND-BRIEFING.MD]
```

---

## Prompt de Refinamento — Aprofundar Diferenciais

```
Os diferenciais que você listou ainda parecem genéricos. Analise o briefing novamente
e encontre o que é genuinamente impossível de copiar sobre [MARCA]: processos únicos,
ativos exclusivos, propriedade intelectual, relacionamentos, história ou perspectiva
que concorrentes não têm. Reescreva os diferenciais com esse nível de especificidade.
```

## Prompt de Refinamento — Precisar o Segmento

```
O segmento definido ainda está muito amplo. Considere: qual é o subgrupo dentro
desse público que tem o problema mais agudo, maior urgência de resolver e maior
capacidade de pagar? Esse é o ICP real. Redefina o segmento para esse perfil.
```

## Prompt de Refinamento — Validar o Benefício

```
Teste o benefício principal: um cliente ao usar [PRODUTO/SERVIÇO] — o que muda
concretamente na vida ou no negócio dele? Transforme isso em uma declaração de
resultado mensurável ou transformação clara. Reescreva o benefício.
```

## Prompt de Refinamento — Testar o Statement

```
Aplique o "teste do vazio" no positioning statement: retire o nome da marca e
o nome do concorrente. Um cliente do setor conseguiria identificar para qual marca
foi escrito? Se não, o statement não é diferenciado o suficiente. Reescreva.
```

---

## Output Esperado

**Arquivo:** `clients/[CLIENTE]/brand-guidelines/positioning.md`

```markdown
# Posicionamento de Marca — [NOME DA MARCA]

## Bússola de Posicionamento
- **Segmento:** ...
- **Necessidade:** ...
- **Produto/Serviço:** ...
- **Categoria:** ...
- **Benefício Principal:** ...
- **Diferencial Insubstituível:** ...

## Positioning Statement
[Texto completo]

## Posicionamento por Produto/Serviço
### [Produto 1]
[Bússola específica]

## Notas Estratégicas
[Tensões, trade-offs e decisões tomadas]
```

---

## Critérios de Qualidade

- [ ] Nenhum concorrente direto poderia assinar o statement sem mentir
- [ ] O segmento é específico o suficiente para guiar decisão de canal/mídia
- [ ] O benefício principal é transformacional, não técnico
- [ ] O diferencial tem evidência no briefing (não é aspiracional)
- [ ] Cada produto principal tem seu próprio posicionamento

---

## Próximo Passo

→ `P03-icp.md` (Fase 3 — Público-Alvo e Personas)
