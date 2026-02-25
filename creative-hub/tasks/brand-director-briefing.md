# Task: brand-director-briefing

**Agente:** @brand-director (Atlas)
**Fase:** 1 de 9 — Briefing e Discovery
**Versão:** 1.0.0

---

## Propósito

Conduzir uma sessão de discovery completa com o cliente para extrair todas as informações necessárias sobre a marca. O briefing é o alicerce de todas as fases seguintes — nenhuma decisão estratégica é tomada sem ele.

## Pré-condições

- Nome do cliente ou da marca fornecido
- Workspace do cliente inicializado (`*new-client [nome]` executado)
- Acesso ao responsável pela marca para responder as perguntas

## Inputs

- `CLIENT_NAME`: Nome do cliente / marca
- `SECTOR`: Setor de atuação (se já conhecido)
- Qualquer informação prévia disponível sobre a marca

## Execução

### Passo 1 — Preparação

Apresente-se como o responsável pelo discovery e explique o processo:

> "Vou conduzir uma sessão de discovery estruturada sobre [MARCA]. O objetivo é entender profundamente quem vocês são, o que fazem e para quem. As respostas alimentarão todas as próximas fases da estratégia de marca. Serão 7 blocos de perguntas. Podemos avançar?"

### Passo 2 — Discovery em 7 Blocos

Execute as perguntas abaixo em sequência. Faça uma pergunta por vez. Quando a resposta abrir novos ângulos relevantes, explore antes de avançar.

**Bloco 1 — Identidade e História**
1. Qual é o nome da marca e o que ela vende (produto/serviço)?
2. Quando foi fundada e por quem? Qual era o contexto?
3. Como chegaram até aqui? Quais foram os marcos mais importantes?
4. O que quase não deu certo? O que foi o maior aprendizado?
5. Qual é a situação atual da marca (faturamento, equipe, canais, clientes)?

**Bloco 2 — Produtos e Serviços**
6. Descreva seus produtos/serviços em ordem de importância para o negócio.
7. Qual é a transformação real que o cliente tem ao usar o que você vende?
8. Como é o processo de entrega/uso do seu produto/serviço?
9. Qual é o ticket médio? Existe recorrência ou é compra única?
10. O que torna seu produto/serviço difícil de copiar?

**Bloco 3 — Contexto Competitivo**
11. Quem são seus 3 maiores concorrentes diretos?
12. O que você faz melhor do que eles? O que eles fazem melhor do que você?
13. Quais marcas (mesmo de outros segmentos) você admira? Por quê?
14. O que um cliente perderia se você parasse de existir amanhã?

**Bloco 4 — Público-Alvo**
15. Quem é seu cliente típico hoje? Descreva como se estivesse falando de uma pessoa real.
16. Quem deveria ser seu cliente mas ainda não é?
17. Já tentou vender para alguém que claramente não era o público certo? Quem foi?
18. O que seu cliente fala quando recomenda você para alguém?

**Bloco 5 — Objetivos**
19. O que você quer alcançar nos próximos 12 meses com a marca?
20. Em 5 anos, como você quer que sua marca seja reconhecida?
21. O que está impedindo de chegar lá hoje?
22. Qual seria o sinal claro de que essa estratégia de marca funcionou?

**Bloco 6 — Personalidade da Marca**
23. Se sua marca fosse uma pessoa famosa, quem seria? Por quê?
24. Com quais 5 adjetivos você descreveria sua marca?
25. Se sua marca fosse um lugar, que lugar seria?
26. Tem algum conteúdo (post, campanha, vídeo) que você fez que "pareceu você de verdade"?

**Bloco 7 — Restrições e Limites**
27. O que sua marca definitivamente NÃO é e NÃO quer ser?
28. Existem assuntos, estéticas ou abordagens que você evita? Por quê?
29. Tem alguma limitação legal, regulatória ou de mercado que precisa ser respeitada?
30. O que uma agência de publicidade já tentou fazer com você que simplesmente não colou?

### Passo 3 — Síntese e Identificação de Lacunas

Após coletar todas as respostas, sintetize:

1. Confirme seu entendimento da marca em 3-4 parágrafos
2. Identifique as lacunas de informação (o que ainda está vago)
3. Liste as tensões detectadas (ex: "você diz que é premium mas mencionou preço baixo")
4. Peça clarificação nas lacunas e tensões antes de prosseguir

### Passo 4 — Documentação

Salve o briefing estruturado em `clients/[CLIENTE]/briefing/brand-briefing.md` usando o template `templates/brand-briefing-form.md`.

## Output

**Arquivo:** `clients/[CLIENTE]/briefing/brand-briefing.md`

**Conteúdo mínimo:**
- Visão geral da marca (nome, setor, estágio, fundação)
- Produtos/serviços com descrição e diferenciais
- Contexto competitivo
- Público-alvo inicial (antes do mapeamento aprofundado)
- Objetivos de negócio
- Personalidade percebida
- Restrições e limites
- Lacunas identificadas (a serem resolvidas nas próximas fases)

## Critérios de Qualidade

- [ ] Todos os 7 blocos foram cobertos
- [ ] Nenhuma resposta ficou vaga sem aprofundamento
- [ ] Tensões e contradições foram identificadas e registradas
- [ ] O briefing está claro o suficiente para um terceiro entender a marca
- [ ] As lacunas estão explicitamente documentadas

## Pós-condições

- Arquivo `brand-briefing.md` salvo no workspace do cliente
- Próxima fase disponível: `*positioning` (Fase 2)

## Notas de Execução

- Se o cliente resistir a alguma pergunta, note a resistência — ela própria é um dado
- Se houver inconsistências nas respostas, aponte com cuidado mas não deixe passar
- Prefira exemplos concretos a respostas abstratas — pressione por especificidade
- O briefing deve durar 45-90 minutos numa sessão real; num chat, pode ser assíncrono
