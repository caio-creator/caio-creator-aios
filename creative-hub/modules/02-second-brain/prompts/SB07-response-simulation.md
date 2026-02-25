# SB07 — SIMULAÇÃO DE RESPOSTAS
> Fase 7 do Protocolo de Clonagem — Uso operacional da persona e refinamento contínuo

---

## Prompt Principal — Análise de Problema

```
[USE APÓS ATIVAR O SYSTEM PROMPT DE [NOME DA REFERÊNCIA]]

Analise o seguinte problema/situação usando o modelo mental de [NOME DA REFERÊNCIA]:

CONTEXTO:
[Descreva o contexto do problema ou situação]

PERGUNTA:
[A pergunta específica que você quer que a perspectiva responda]

---

Instrução adicional (escolha o modo):

MODO ANÁLISE: Analise como [referência] analisaria — use os frameworks dela, aplique
as premissas do modelo de mundo, chegar às conclusões que ela chegaria.

MODO CRIAÇÃO: Crie [tipo de conteúdo] sobre [tema] na voz e perspectiva de [referência].
Mantenha os padrões de linguagem, o tom, e as posições características.

MODO DECISÃO: [Referência] está diante da decisão [X]. Que opção ela escolheria e por quê?
Use a hierarquia de valores e os frameworks de decisão do perfil.

MODO CRÍTICA: [Referência] está avaliando [ideia/projeto/estratégia X]. Que objeções ela levantaria?
O que ela aprovaria? Seja fiel às posições contraintuitivas do modelo.
```

---

## Prompt de Simulação — Conteúdo na Voz

```
Crie [FORMATO DE CONTEÚDO] sobre [TEMA] na perspectiva e voz de [NOME DA REFERÊNCIA].

Especificações:
- Formato: [Post LinkedIn / Thread / Artigo / Carrossel / Email / Outro]
- Tamanho: [Número de palavras ou slides]
- Ângulo: [Qual aspecto do tema a referência abordaria]
- Tom: [Confirme o tom esperado com base no perfil]

Critérios que o conteúdo deve atender:
1. Usa pelo menos 1 framework característico desta referência
2. Inclui pelo menos 1 posição contraintuitiva desta referência sobre o tema
3. Usa o vocabulário e as marcas de linguagem do perfil
4. Estrutura o argumento da forma que esta referência tipicamente estrutura
5. Incluiria algo que surpreende o leitor (o que a referência tipicamente faz)

Após criar o conteúdo, faça um check de fidelidade:
- [ ] Qual framework está sendo usado?
- [ ] Qual posição contraintuitiva aparece?
- [ ] Quais marcas de linguagem foram aplicadas?
- [ ] O que tornaria este conteúdo reconhecível como desta referência?
```

---

## Prompt de Simulação — Decisão Estratégica

```
[NOME DA REFERÊNCIA] está consultando sobre a seguinte situação:

SITUAÇÃO:
[Descreva o contexto da decisão]

OPÇÕES EM CONSIDERAÇÃO:
A) [Opção A]
B) [Opção B]
C) [Opção C — se aplicável]

PERGUNTA:
Que opção [referência] recomendaria? Por quê?

---

Estruture a resposta como ela estruturaria:
1. Qual é a premissa do modelo de mundo que é mais relevante aqui?
2. Que framework ela aplicaria para analisar?
3. Qual informação adicional ela pediria antes de decidir?
4. Qual seria sua recomendação e com que grau de confiança?
5. Que risco ela apontaria na opção que não escolher?
6. O que ela diria que é inegociável nesta decisão?
```

---

## Prompt de Simulação — Avaliação Crítica

```
Compartilhe com [NOME DA REFERÊNCIA] a seguinte ideia/estratégia/projeto para avaliação crítica:

[DESCREVA A IDEIA/ESTRATÉGIA/PROJETO]

Peça a avaliação completa:

1. PONTOS FORTES: O que esta ideia tem de genuinamente bom? Por quê?
2. OBJEÇÕES CENTRAIS: Que problemas fundamentais esta ideia tem? Seja específico.
3. SUPOSIÇÕES PROBLEMÁTICAS: Que premissas esta ideia assume que são questionáveis?
4. O QUE ESTÁ FALTANDO: O que precisaria ser verdade para isso funcionar, mas não está contemplado?
5. REFORMULAÇÃO: Se fosse reapresentar esta ideia de forma mais robusta, como seria?
6. VEREDITO: Aprovaria esta ideia? Com quais condições ou ressalvas?

Responda como [referência] responderia — com a diretividade e a perspectiva contraintuitiva que é característica dela.
```

---

## Prompt de Refinamento — Log de Fidelidade

Use após cada sessão de simulação para refinar o perfil:

```
Completei uma sessão de simulação usando o perfil de [NOME DA REFERÊNCIA].

Pergunta feita: [Pergunta]
Resposta recebida: [Resumo da resposta]

Minha avaliação de fidelidade:
- O que estava certo e característico: [Observação]
- O que não soou como esta referência: [Observação]
- O que ficou genérico demais: [Observação]

Com base nisso, o perfil precisa ser ajustado?
1. Qual seção do system prompt está causando o problema?
2. Que instrução mais específica resolveria?
3. Que exemplo ou referência concreta ajudaria a calibrar?

Sugira ajustes pontuais ao system prompt para a próxima sessão.
```

---

## Biblioteca de Perguntas de Calibração

Use estas perguntas para testar qualquer perfil de Segundo Cérebro:

### Perguntas Universais de Calibração

**Para testar o modelo de mundo:**
- "Qual é sua visão sobre [tema emergente que a referência nunca comentou publicamente]?"
- "Como você explicaria [fenômeno complexo] para alguém que nunca estudou isso?"

**Para testar frameworks:**
- "Analise [empresa/produto/movimento contemporâneo] usando seus critérios."
- "Que conselho você daria a alguém que está começando em [campo de expertise da referência]?"

**Para testar posições contraintuitivas:**
- "Todo mundo está dizendo [posição mainstream]. Você concorda?"
- "Qual é o erro mais comum que as pessoas cometem ao pensar sobre [tema central]?"

**Para testar a voz:**
- "Escreva um parágrafo sobre [tema simples] explicando sua perspectiva."
- "Como você responderia a alguém que te critica por [crítica comum a esta referência]?"

---

## Sinal de Perfil Calibrado

O perfil de Segundo Cérebro está bem calibrado quando:

✅ Respostas sobre temas novos (que a referência nunca abordou) soam plausíveis e coerentes com o modelo
✅ Você consegue identificar quando a IA "escorregou" para uma resposta genérica vs. quando manteve o modelo
✅ As posições contraintuitivas emergem naturalmente, sem precisar ser forçadas
✅ A voz é reconhecível sem ser caricata
✅ Você começa a antecipar o que a IA dirá antes de ela dizer

Quando você atingir este nível, o Segundo Cérebro foi internalizado.

---

## Arquivo de Saída

Registre cada sessão de simulação com data e descobertas em:
`clients/[slug]/second-brain/[referencia]/session-log.md`

Isso cria um histórico de refinamento e aprendizado ao longo do tempo.
