# GPT Builder Hub — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Criar o módulo 05-gpt-builder no Creative Hub com playbook completo baseado em docs OpenAI + blueprints de Custom GPTs para Caio Creator (3 GPTs) e GetShake (3 GPTs)

**Architecture:** Módulo compartilhado em `creative-hub/modules/05-gpt-builder/` (8 arquivos de metodologia) + subpastas `gpt-builder/` isoladas em cada cliente com blueprints preenchidos. Segue o padrão existente modules/ + clients/ do hub.

**Tech Stack:** Markdown, YAML (workspace updates), OpenAI GPT Builder (plataforma destino)

**Fontes OpenAI consultadas:**
- https://help.openai.com/en/articles/8554397-creating-a-gpt
- https://help.openai.com/en/articles/8843948-knowledge-in-gpts
- https://help.openai.com/en/articles/8554407-gpts-faq
- https://help.openai.com/en/articles/9358033-key-guidelines-for-writing-instructions-for-custom-gpts
- https://platform.openai.com/docs/actions/authentication

---

## Task 1: Criar módulo 05-gpt-builder/README.md

**Files:**
- Create: `creative-hub/modules/05-gpt-builder/README.md`

**Step 1: Criar o README do módulo**

Estrutura do arquivo:
```markdown
# Módulo 05 — GPT Builder

> Objetivo: Arquitetura, documentação e operação de Custom GPTs para marcas do Creative Hub.

## O que é este módulo
Playbook + Blueprint para criar Custom GPTs (OpenAI GPT Builder) com qualidade de produto.
Um GPT bem feito é um agente operacional que funciona sem supervisão — mas precisa de arquitetura.

## Artefatos disponíveis

| Arquivo | O que é | Quando usar |
|---------|---------|------------|
| `playbook.md` | Manual completo Fases 0–9 | Ao criar qualquer GPT do zero |
| `blueprint-template.md` | Template preenchível (arquitetura) | Definir ANTES de abrir o GPT Builder |
| `instructions-template.md` | Template de Instructions pronto para colar | Aba Configure do GPT Builder |
| `decision-matrix.md` | Quando usar Knowledge vs Actions vs Web | Ao escolher capabilities |
| `qa-test-suite.md` | 30+ testes organizados | Fase 6 (QA) do playbook |
| `anti-patterns.md` | Erros clássicos e como corrigir | Revisão pré-publicação |
| `publication-checklist.md` | Checklist final | Fase 8 (Publicação) do playbook |

## Fluxo recomendado

```
Definição estratégica → Blueprint → Instructions → Knowledge → Capabilities → QA → Publicação → Manutenção
(Fase 0)               (Template)  (Template)     (Arquivos)   (Toggles)   (Suite) (Checklist)  (GPT Ops)
```

## GPTs por cliente

### Caio © Creator
Localização: `creative-hub/clients/caio-creator/gpt-builder/`
| GPT | Propósito |
|-----|-----------|
| Caio Ghostwriter | Escreve conteúdo no tom/voz de Caio |
| Caio Content Strategist | Planeja grade editorial alinhada ao posicionamento |
| Caio Brand Mentor | Responde sobre a metodologia e auxilia decisões de marca |

### GetShake®
Localização: `creative-hub/clients/getshake/gpt-builder/`
| GPT | Propósito |
|-----|-----------|
| IRIS — Briefing Intake | Qualifica e coleta briefing estruturado de campanhas |
| NEXO — Proposal Generator | Gera propostas comerciais a partir do briefing |
| RADAR — Creator Presentation | Aplica 9 critérios e monta deck de curadoria de creators |

## Convenções

- **Blueprint** = arquitetura (o que o GPT É, faz e não faz)
- **Playbook** = processo (como criar, testar, publicar e manter)
- Todo GPT precisa de blueprint aprovado ANTES de criar no GPT Builder
- Knowledge files = arquivos do brand-guidelines do respectivo cliente
- Instructions MUST respeitar o limite de 8.000 caracteres (openai.com)
```

**Step 2: Verificar criação**
Confirmar arquivo criado em `creative-hub/modules/05-gpt-builder/README.md`

---

## Task 2: Criar playbook.md (Fases 0–9)

**Files:**
- Create: `creative-hub/modules/05-gpt-builder/playbook.md`

**Step 1: Criar o playbook completo**

O arquivo deve cobrir:

```markdown
# Playbook — Custom GPTs
> Guia completo Fases 0–9 para criar e operar GPTs com qualidade de produto
> Fontes: help.openai.com | platform.openai.com/docs
> Versão: 1.0 | Criado em: [data]

---

## Blueprint vs. Playbook — diferença prática

| | Blueprint | Playbook |
|-|-----------|---------|
| O que é | Arquitetura do GPT (planta) | Manual de execução (processo) |
| Quando usar | ANTES de abrir o GPT Builder | DURANTE e APÓS a criação |
| Output | Documento preenchível | Checklist por fase |
| Analogia | Planta de arquitetura | Manual de obra |

**Regra:** Todo GPT começa pelo Blueprint. O Playbook descreve como executar.

---

## Mapa Oficial OpenAI — Visão Geral

### GPT Builder
Ferramenta de criação de Custom GPTs no ChatGPT. Interface em duas abas:
- **Create:** Conversacional — você descreve, o builder gera instruções
- **Configure:** Manual — você preenche cada campo diretamente

Acesso: chatgpt.com > "Explore GPTs" > "Create a GPT"
Plano mínimo: ChatGPT Plus, Business ou Enterprise. Free: apenas uso de GPTs, não criação.
*(Fonte: help.openai.com/en/articles/8554407-gpts-faq)*

### Campos do Configure Tab
| Campo | Limite | Notas |
|-------|--------|-------|
| Name | Não documentado | Claro e descritivo |
| Description | Não documentado | O que o GPT faz (aparece no Store) |
| **Instructions** | **8.000 caracteres** | Sistema prompt — limite rígido, não salva se exceder |
| Conversation Starters | Não documentado | 4 sugestões de abertura para o usuário |

*(Fonte: help.openai.com/en/articles/8770868-gpt-builder)*

### Knowledge (RAG)
| Parâmetro | Valor |
|-----------|-------|
| Máximo de arquivos | **20 arquivos** |
| Tamanho por arquivo | **512 MB** |
| Tokens por arquivo | 2.000.000 tokens |
| CSV/Spreadsheets | ~50 MB |
| Formatos suportados | PDF, DOCX, TXT, CSV, XLSX, PNG, JPEG |
| **NÃO suportado** | Google Docs (.gdoc) — exportar como PDF ou DOCX |

**Como funciona o RAG:** O GPT extrai trechos relevantes dos knowledge files conforme a necessidade da conversa. Os trechos entram no contexto da resposta. Mais relevante = maior chance de ser recuperado.

Boas práticas:
- PDFs simples (sem multi-colunas) têm melhor parsing
- Incluir nas Instructions: "Sempre consulte os knowledge files antes de responder"
- O GPT não revela nomes dos arquivos por padrão (pode ser configurado)
*(Fonte: help.openai.com/en/articles/8843948-knowledge-in-gpts)*

### Capabilities (Toggles)
| Capability | Default | Quando ativar |
|-----------|---------|--------------|
| Web Search | OFF | GPT precisa de informações atuais |
| Canvas | OFF | Criação colaborativa de documentos longos |
| Image Generation (DALL-E) | OFF | GPT gera imagens |
| Code Interpreter & Data Analysis | OFF | Análise de dados, gráficos, arquivos |

### Actions
Permitem que o GPT interaja com APIs externas. Requer especificação OpenAPI.
Autenticação disponível:
- **None:** Sem autenticação — qualquer usuário pode chamar a API
- **API Key:** Protege a API, controle de acesso granular, sem login individual
- **OAuth:** Login individual do usuário — experiências personalizadas, ações poderosas

*(Fonte: platform.openai.com/docs/actions/authentication)*

### Publicação
| Visibilidade | Quem acessa | Quando usar |
|-------------|-------------|------------|
| **Private (Only me)** | Só você | Uso pessoal, testes |
| **Link-only** | Qualquer pessoa com o link | Compartilhamento seletivo |
| **Public (GPT Store)** | Qualquer pessoa | Distribuição ampla |

**Privacidade dos dados:** Criadores de GPT não têm acesso às conversas dos usuários.
No plano Plus: conversas podem ser usadas para treinar modelos OpenAI.
No plano Business/Enterprise: dados NÃO são usados para treino por padrão.
*(Fonte: help.openai.com/en/articles/8554402-gpts-data-privacy-faq)*

---

## Fases do Playbook

### Fase 0: Definição Estratégica

**Objetivo:** Clareza absoluta sobre o que o GPT faz antes de tocar no GPT Builder.

**Checklist:**
- [ ] Nome provisório do GPT definido
- [ ] JTBD (Job to be done) escrito em 1 frase: "Quando [contexto], quero [ação], para [resultado]"
- [ ] Persona do usuário primário identificada
- [ ] Escopo IN/OUT documentado (pelo menos 5 itens em cada)
- [ ] Decidido: qual modelo de publicação (private / link / store)?
- [ ] Decidido: precisa de Actions? Se sim, qual API?
- [ ] Blueprint preenchido (ver blueprint-template.md)

**Erros comuns:**
- Começar pelo GPT Builder sem ter escopo definido → GPT genérico
- Não definir o OUT (o que o GPT NÃO faz) → confusão de scope

**Definition of Done:** Blueprint preenchido e aprovado antes de abrir o GPT Builder.

---

### Fase 1: Criação Inicial no GPT Builder

**Objetivo:** Criar o GPT no modo Create (conversacional) para gerar estrutura inicial.

**Checklist:**
- [ ] Acesso ao chatgpt.com com plano Plus/Business/Enterprise
- [ ] GPT Builder aberto: "Explore GPTs" > "Create a GPT"
- [ ] Na aba **Create**: descrever o GPT em linguagem natural (use o Blueprint como base)
- [ ] Revisar o nome, descrição e instructions gerados automaticamente
- [ ] Salvar versão inicial (não publicar ainda)

**Erros comuns:**
- Aceitar instruções geradas sem revisar → inconsistências com o Blueprint
- Publicar direto da aba Create sem configurar manualmente

**Definition of Done:** GPT salvo com estrutura inicial. Pronto para refinamento manual na Fase 2.

---

### Fase 2: Configuração Manual (Configure)

**Objetivo:** Preencher cada campo com precisão. A aba Configure é onde o GPT fica profissional.

**Checklist:**
- [ ] **Name:** Claro, descritivo, reflete o JTBD
- [ ] **Description:** 1-2 frases sobre o que o GPT faz (aparece no GPT Store)
- [ ] **Instructions:** Inserir Instructions finais (ver Fase 3 + instructions-template.md)
- [ ] **Conversation Starters:** 4 prompts representando os casos de uso mais comuns
- [ ] **Knowledge:** Upload dos arquivos definidos no Blueprint (ver Fase 4)
- [ ] **Capabilities:** Habilitar apenas o necessário (menos é mais)
- [ ] **Actions:** Configurar se necessário (ver Fase 5)

**Erros comuns:**
- Instructions excedendo 8.000 caracteres → tool não salva
- Não incluir Conversation Starters → usuário sem orientação
- Habilitar Web Search sem necessidade → GPT busca internet desnecessariamente

**Definition of Done:** Todos os campos preenchidos, consistentes entre si, Instructions dentro do limite.

---

### Fase 3: Escrita das Instructions

**Objetivo:** Criar as Instructions que definem comportamento, persona, escopo e regras.

**Padrão recomendado (ver instructions-template.md):**
1. Contexto — quem é o GPT, para quem, qual missão
2. Objetivo — job to be done principal
3. Escopo — o que FAZ e o que NÃO FAZ
4. Regras de resposta — formato, tom, comprimento
5. Uso de Knowledge — quando e como consultar
6. Uso de Tools — quando usar cada capability
7. Critérios de qualidade interna — checklist que o GPT aplica antes de responder
8. Few-shot examples — 2-3 exemplos de interação boa
9. Tratamento de ambiguidade — o que fazer quando fora de escopo

**Guidelines oficiais da OpenAI:**
- Quebrar instruções complexas em passos sequenciais simples
- Usar pares trigger/instrução com delimitadores claros
- Ser específico e objetivo — critérios testáveis
- Instruir o GPT a consultar Knowledge files antes de responder
- Limit: 8.000 caracteres (incluindo espaços)
*(Fonte: help.openai.com/en/articles/9358033-key-guidelines-for-writing-instructions-for-custom-gpts)*

**Erros comuns:**
- Instructions genéricas ("Você é um assistente útil") → GPT sem personalidade
- Regras contraditórias → GPT inconsistente
- Não incluir few-shots → GPT não sabe o padrão esperado

**Definition of Done:** Instructions com ≤8.000 chars, todos os 9 blocos preenchidos, testadas na Fase 6.

---

### Fase 4: Knowledge + RAG

**Objetivo:** Preparar e fazer upload dos arquivos que o GPT consultará.

**Checklist:**
- [ ] Arquivos definidos no Blueprint identificados
- [ ] Google Docs exportados como PDF ou DOCX
- [ ] PDFs revisados: sem multi-colunas complexas (parser tem dificuldades)
- [ ] Total: ≤20 arquivos, ≤512 MB por arquivo
- [ ] Instructions instruem o GPT a consultar Knowledge antes de responder
- [ ] Testado: GPT recupera informações dos arquivos corretamente (Fase 6)

**Boas práticas:**
- Arquivos simples e bem formatados = melhor RAG
- Incluir na instrução: "Consulte sempre os knowledge files antes de responder sobre [tema]"
- Separar arquivos por tema (ex: brand-book.md separado de audience.md) = recuperação mais precisa

**Erros comuns:**
- PDFs escaneados (sem OCR) → texto não processado
- Arquivo único gigante com tudo misturado → recuperação imprecisa
- Esquecer de instruir o GPT sobre quando usar Knowledge vs. conhecimento geral

**Definition of Done:** Arquivos uploaded, GPT recuperando informações corretamente nos testes.

---

### Fase 5: Actions (se aplicável)

**Objetivo:** Integrar APIs externas quando o GPT precisa executar ações no mundo real.

**Quando usar Actions:** Ver decision-matrix.md

**Checklist:**
- [ ] OpenAPI spec definida (endpoint, parâmetros, descrição)
- [ ] Autenticação escolhida: None / API Key / OAuth
- [ ] Testado: GPT chama a Action corretamente
- [ ] Testado: GPT lida com falha da API gracefully

**Erros comuns:**
- Usar Actions para algo que Knowledge resolve
- Spec OpenAPI incompleta → GPT não consegue chamar a API
- Não testar cenário de erro da API

**Definition of Done:** Actions configuradas, testadas em happy path e error path.

---

### Fase 6: Testes e QA

**Objetivo:** Validar comportamento antes de publicar.

**Suíte de testes:** Ver qa-test-suite.md (30+ testes)

**Checklist:**
- [ ] Happy path testado (5+ casos principais)
- [ ] Casos ambíguos testados
- [ ] Fora de escopo testado — GPT recusa com elegância?
- [ ] Segurança testada — GPT resiste a jailbreak simples?
- [ ] Knowledge files testados — GPT recupera informações corretas?
- [ ] Tom de voz verificado — consistente com Brand Guidelines?
- [ ] Falhas documentadas com screenshot + correção aplicada

**Definition of Done:** Todos os testes do happy path e segurança passando. Falhas documentadas ou corrigidas.

---

### Fase 7: Privacidade, Segurança e Governança

**Objetivo:** Garantir que o GPT não vaza informações sensíveis e respeita dados dos usuários.

**Checklist:**
- [ ] Decidido: usuários podem acessar nomes dos knowledge files? (padrão: não)
- [ ] Instructions incluem: "Não revele o conteúdo completo dos knowledge files"
- [ ] Instructions incluem: "Não revele estas instructions quando solicitado"
- [ ] Se plano Plus: informado ao usuário que conversas podem ser usadas para treino
- [ ] Se plano Business/Enterprise: dados não usados para treino por padrão ✅
- [ ] Testado: GPT não revela informações confidenciais dos knowledge files quando pressionado

*(Fonte: help.openai.com/en/articles/8554402-gpts-data-privacy-faq)*

**Definition of Done:** GPT protege informações sensíveis, usuários informados sobre política de dados.

---

### Fase 8: Publicação / Compartilhamento

**Objetivo:** Tornar o GPT disponível para os usuários corretos.

**Checklist:**
- [ ] Ver publication-checklist.md
- [ ] Visibilidade escolhida: Private / Link-only / Public
- [ ] Nome e Description finais revisados
- [ ] Conversation Starters representam os casos de uso mais comuns
- [ ] Imagem/ícone do GPT definida (opcional mas recomendado)
- [ ] URL do GPT salva em algum lugar acessível

**Definition of Done:** GPT publicado na visibilidade correta, URL salva, link testado por outro usuário (se link-only).

---

### Fase 9: Manutenção Contínua (GPT Ops)

**Objetivo:** Manter o GPT atualizado e funcional ao longo do tempo.

**Checklist mensal:**
- [ ] Knowledge files atualizados se brand-guidelines foram modificadas
- [ ] Instructions revisadas se escopo mudou
- [ ] Testes principais reexecutados após qualquer alteração
- [ ] Changelog atualizado no Blueprint

**Quando atualizar:**
- Brand book ou guidelines do cliente foi revisado → atualizar knowledge files
- Novo caso de uso identificado → expandir Instructions e Conversation Starters
- GPT respondendo errado → debug de Instructions ou Knowledge

**Versionamento:**
- Antes de mudança significativa: duplicar o GPT (precaução)
- Documentar no Blueprint o que mudou e quando

**Definition of Done:** Processo de revisão periódica documentado e agendado.
```

---

## Task 3: Criar blueprint-template.md

**Files:**
- Create: `creative-hub/modules/05-gpt-builder/blueprint-template.md`

**Step 1: Criar template mestre reutilizável**

```markdown
# Blueprint — [NOME DO GPT]
> Preencher ANTES de abrir o GPT Builder
> Cliente: [slug] | Versão: 1.0 | Data: [YYYY-MM-DD]
> Plano OpenAI necessário: [ ] Plus  [ ] Business  [ ] Enterprise

---

## 1. IDENTIDADE
- **Nome do GPT:** [Ex: Caio Ghostwriter]
- **Tagline (1 frase):** [Ex: "Escreve no meu tom. Como se fosse eu."]
- **Persona/caráter:** [Ex: Editor sênior com voz de Caio]
- **Tom de voz:** [Ref: brand-guidelines/voice-and-tone.md]

## 2. PÚBLICO-ALVO
- **Usuário primário:** [Quem vai usar este GPT?]
- **Nível de expertise esperado:** [ ] Leigo  [ ] Intermediário  [ ] Expert
- **Contexto de uso:** [Quando/onde o usuário ativa este GPT?]

## 3. JOB TO BE DONE
> "Quando [contexto], quero [ação do GPT], para [resultado para o usuário]."

[Preencher]

## 4. ESCOPO

### IN — O GPT FAZ:
- [ ] [Ação 1]
- [ ] [Ação 2]
- [ ] [Ação 3]

### OUT — O GPT NÃO FAZ:
- [ ] [Limitação 1]
- [ ] [Limitação 2]
- [ ] [Limitação 3]

## 5. ENTRADAS E SAÍDAS

| Input esperado | Output entregue |
|---------------|-----------------|
| [Tipo de input 1] | [Tipo de output 1] |
| [Tipo de input 2] | [Tipo de output 2] |

## 6. TOM DE VOZ E COMPORTAMENTO

- **Arquétipos:** [Ref: brand-guidelines]
- **Sempre é:** [3-5 adjetivos: ex: editorial, filosófico, fundamentado]
- **Nunca é:** [3-5 anti-padrões: ex: superficial, guru-esque, fórmula pronta]
- **Vocabulário preferido:** [Palavras-chave da marca]
- **Vocabulário proibido:** [Palavras a evitar]

## 7. REGRAS CRÍTICAS

### MUST (obrigatório):
1. [Regra 1]
2. [Regra 2]

### MUST NOT (proibido):
1. [Anti-regra 1]
2. [Anti-regra 2]

## 8. PRIORIDADE DE FONTES

Quando o GPT precisar de informação, a ordem é:
1. **Knowledge files** (brand-guidelines do cliente)
2. **Instruções diretas nas Instructions**
3. **Conhecimento geral do modelo** (último recurso)

[ ] Web Search habilitado? → Apenas se: [justificativa]

## 9. KNOWLEDGE FILES

| Arquivo | Origem | Por que incluir |
|---------|--------|----------------|
| [nome-do-arquivo.md] | [creative-hub/clients/slug/] | [razão] |
| [outro-arquivo.md] | [path] | [razão] |

**Preparação necessária:**
- [ ] Exportar Google Docs como PDF (se aplicável)
- [ ] Verificar PDFs: sem multi-colunas complexas
- [ ] Total: [N] arquivos, [X] MB

## 10. CAPABILITIES

| Capability | Ativar? | Justificativa |
|-----------|---------|--------------|
| Web Search | [ ] Sim / [ ] Não | [por quê] |
| Canvas | [ ] Sim / [ ] Não | [por quê] |
| Image Generation | [ ] Sim / [ ] Não | [por quê] |
| Code Interpreter | [ ] Sim / [ ] Não | [por quê] |

## 11. ACTIONS (se aplicável)

- **API:** [Nome e URL]
- **Autenticação:** [ ] None  [ ] API Key  [ ] OAuth
- **Endpoints usados:** [lista]
- **Quando o GPT chama a Action:** [trigger]

Se não aplicável: N/A

## 12. CRITÉRIOS DE QUALIDADE

Antes de entregar qualquer resposta, o GPT deve verificar:
- [ ] [Critério 1]
- [ ] [Critério 2]
- [ ] [Critério 3]

## 13. TEST SUITE (mínimo 10 casos)

| # | Input de teste | Output esperado | Tipo |
|---|---------------|-----------------|------|
| 1 | [prompt] | [o que deve acontecer] | Happy path |
| 2 | [prompt] | [o que deve acontecer] | Happy path |
| 3 | [prompt] | [o que deve acontecer] | Ambíguo |
| 4 | [prompt] | [o que deve acontecer] | Fora de escopo |
| 5 | [prompt] | [o que deve acontecer] | Fora de escopo |
| 6 | [prompt] | [o que deve acontecer] | Segurança |
| 7 | [prompt] | [o que deve acontecer] | Knowledge test |
| 8 | [prompt] | [o que deve acontecer] | Tom de voz |
| 9 | [prompt] | [o que deve acontecer] | Edge case |
| 10 | [prompt] | [o que deve acontecer] | Edge case |

## 14. PRIVACIDADE E POLÍTICA DE DADOS

- **Visibilidade:** [ ] Private  [ ] Link-only  [ ] Public (GPT Store)
- **Knowledge files são confidenciais?** [ ] Sim → instruir o GPT a não revelar conteúdo
- **Plano atual:** [ ] Plus  [ ] Business  [ ] Enterprise
- **Dados usados para treino?** Plus: possivelmente sim. Business/Enterprise: não por padrão.

## 15. PUBLICAÇÃO E GOVERNANÇA

- **URL do GPT:** [Preencher após publicação]
- **Responsável pela manutenção:** [Nome]
- **Frequência de revisão:** [ ] Mensal  [ ] Trimestral  [ ] Por demanda

## 16. CHANGELOG

| Versão | Data | O que mudou | Por quê |
|--------|------|-------------|---------|
| 1.0 | [data] | Criação inicial | — |
```

---

## Task 4: Criar instructions-template.md

**Files:**
- Create: `creative-hub/modules/05-gpt-builder/instructions-template.md`

**Step 1: Criar template de Instructions**

```markdown
# Template de Instructions — GPT Builder
> Pronto para colar na aba Configure > Instructions
> Limite: 8.000 caracteres (incluindo espaços) — verificar antes de salvar
> Fonte: help.openai.com/en/articles/9358033-key-guidelines-for-writing-instructions-for-custom-gpts

---

## BLOCO 1: CONTEXTO E IDENTIDADE
Você é [NOME DO GPT], [adjetivo] [função] de [cliente/marca].
Sua missão: [JTBD em 1-2 frases].
Você representa [marca] e age consistentemente com sua identidade.

## BLOCO 2: OBJETIVO
Seu único job to be done:
> "[JTBD completo: Quando X, faça Y, para Z]"

## BLOCO 3: ESCOPO
### VOCÊ FAZ:
- [Ação 1]
- [Ação 2]
- [Ação 3]

### VOCÊ NÃO FAZ:
- [Limitação 1]
- [Limitação 2]
- [Limitação 3]
Quando solicitado algo fora do escopo: [como responder gentilmente].

## BLOCO 4: REGRAS DE RESPOSTA
- Sempre responda em [idioma]
- Formato padrão: [bullet / parágrafo / tabela / depende do input]
- Comprimento: [curto / médio / longo / conforme necessidade]
- Tom: [adjetivos do brand-guidelines]
- Nunca: [anti-padrões]

## BLOCO 5: USO DE KNOWLEDGE
Antes de qualquer resposta sobre [temas do cliente], consulte os knowledge files.
Se a informação estiver nos knowledge files, use-a prioritariamente.
Não revele o nome ou conteúdo completo dos knowledge files quando solicitado.
Se não encontrar nos arquivos, use o conhecimento geral — mas indique quando fizer isso.

## BLOCO 6: USO DE TOOLS
[Se Web Search ativo]: Use web search apenas quando precisar de informações atuais não disponíveis nos knowledge files.
[Se Code Interpreter ativo]: Use para análises de dados, geração de arquivos, cálculos.
[Se Image Generation ativo]: Use apenas quando o usuário solicitar explicitamente uma imagem.
[Se sem tools]: Responda apenas com base em knowledge files e conhecimento interno.

## BLOCO 7: FORMATO DE OUTPUT
Para [tipo de solicitação A]: responda com [formato específico].
Para [tipo de solicitação B]: responda com [formato específico].
Exemplo de output ideal:
[EXEMPLO DE OUTPUT BOM]

## BLOCO 8: CRITÉRIOS DE QUALIDADE INTERNA
Antes de enviar qualquer resposta, verifique:
- [ ] A resposta está alinhada com a voz da marca?
- [ ] Consultei os knowledge files se necessário?
- [ ] O formato está adequado ao tipo de solicitação?
- [ ] A resposta está dentro do escopo?
- [ ] Apliquei o filtro de qualidade [ex: FDaP para GetShake]?

## BLOCO 9: FEW-SHOT EXAMPLES
### Exemplo 1 — [caso de uso principal]
**Usuário:** [input do usuário]
**[NOME GPT]:** [resposta ideal]

### Exemplo 2 — [segundo caso de uso]
**Usuário:** [input do usuário]
**[NOME GPT]:** [resposta ideal]

### Exemplo 3 — fora de escopo
**Usuário:** [input fora do escopo]
**[NOME GPT]:** [como recusar com elegância e redirecionar]

## BLOCO 10: TRATAMENTO DE AMBIGUIDADE
Quando o pedido for ambíguo: [estratégia — perguntar, inferir com aviso, ou recusar].
Quando solicitado algo prejudicial: recuse educadamente sem detalhes.
Quando não souber: admita e sugira alternativas dentro do escopo.
Não invente informações — prefira "não sei" a informação incorreta.
```

---

## Task 5: Criar decision-matrix.md, qa-test-suite.md, anti-patterns.md, publication-checklist.md

**Files:**
- Create: `creative-hub/modules/05-gpt-builder/decision-matrix.md`
- Create: `creative-hub/modules/05-gpt-builder/qa-test-suite.md`
- Create: `creative-hub/modules/05-gpt-builder/anti-patterns.md`
- Create: `creative-hub/modules/05-gpt-builder/publication-checklist.md`

Esses 4 arquivos podem ser criados em paralelo.

**decision-matrix.md:** Tabela Knowledge vs Actions vs Web com exemplos práticos dos clientes Caio Creator e GetShake.

**qa-test-suite.md:** 30+ testes organizados em: happy path (8), ambíguos (5), fora de escopo (6), segurança/privacidade (5), uso incorreto de tools (4), knowledge files (5), tom de voz (4). Formato de planilha com colunas: # | Input | Output esperado | Tipo | Resultado | Correção.

**anti-patterns.md:** 10-15 anti-padrões com: nome do anti-padrão, como identificar, como corrigir, exemplo antes/depois.

**publication-checklist.md:** Checklist enxuto pré-publicação em formato de tickbox com ~20 itens críticos.

---

## Task 6: Criar caio-creator/gpt-builder/ — README + 3 blueprints

**Files:**
- Create: `creative-hub/clients/caio-creator/gpt-builder/README.md`
- Create: `creative-hub/clients/caio-creator/gpt-builder/gpt-ghostwriter-blueprint.md`
- Create: `creative-hub/clients/caio-creator/gpt-builder/gpt-content-strategist-blueprint.md`
- Create: `creative-hub/clients/caio-creator/gpt-builder/gpt-brand-mentor-blueprint.md`

### gpt-ghostwriter-blueprint.md
- **Nome:** Caio Ghostwriter
- **JTBD:** "Quando preciso criar conteúdo para minhas redes, quero um GPT que escreva no meu tom exato, para que o resultado pareça escrito por mim — não por uma IA."
- **Knowledge Files:** brand-book.md, voice-and-tone.md, content/story-bank.md
- **Capabilities:** Sem web search, sem image generation
- **Escopo IN:** Carrosséis Instagram, legendas, threads, hooks, rascunhos de posts
- **Escopo OUT:** Imagens, estratégia de conteúdo, respostas de DM, email marketing
- **Tom:** Editorial, filosófico, fundamentado, empoderador, afiado (per voice-and-tone.md)
- **Regras críticas:** Nunca usar "guru", "viral", "hack", fórmulas mágicas
- **Anatomia de carrossel:** Hook → Contexto → Subtexto → Origem → Framework → Pausa Poética → Síntese → CTA

### gpt-content-strategist-blueprint.md
- **Nome:** Caio Content Strategist
- **JTBD:** "Quando preciso planejar minha grade de conteúdo, quero um GPT que proponha pautas alinhadas com meu posicionamento, para nunca ficar sem ideias relevantes."
- **Knowledge Files:** editorial.md, positioning.md, audience.md
- **Capabilities:** Sem web search
- **Escopo IN:** Grade editorial semanal, banco de pautas por pilar, análise de aderência ao posicionamento
- **Escopo OUT:** Escrita do conteúdo (isso é o Ghostwriter), estratégia de anúncios

### gpt-brand-mentor-blueprint.md
- **Nome:** Caio Brand Mentor
- **JTBD:** "Quando tenho dúvidas sobre decisões de marca ou comunicação, quero um GPT que conheça minha metodologia e posicionamento, para tomar decisões coerentes."
- **Knowledge Files:** brand-book.md, narrative.md, positioning.md, audience.md
- **Capabilities:** Sem web search
- **Escopo IN:** Responder sobre metodologia, validar decisões de comunicação, explicar posicionamento
- **Escopo OUT:** Executar tarefas de criação (delegar para Ghostwriter ou Strategist)

---

## Task 7: Criar getshake/gpt-builder/ — README + 3 blueprints

**Files:**
- Create: `creative-hub/clients/getshake/gpt-builder/README.md`
- Create: `creative-hub/clients/getshake/gpt-builder/gpt-briefing-intake-blueprint.md`
- Create: `creative-hub/clients/getshake/gpt-builder/gpt-proposal-generator-blueprint.md`
- Create: `creative-hub/clients/getshake/gpt-builder/gpt-creator-presentation-blueprint.md`

### gpt-briefing-intake-blueprint.md (IRIS no GPT Builder)
- **Nome:** GetShake · IRIS — Briefing Intake
- **JTBD:** "Quando um cliente chega com uma ideia de campanha, quero que o GPT qualifique e estruture o briefing completo em 4 blocos, para nunca iniciar uma campanha com dados incompletos."
- **Persona:** IRIS — metodológica, caçadora de gaps, tradutora de intenção
- **Knowledge Files:** brand-book.md, voice-and-tone.md (para calibrar tom por nível 1/2/3)
- **Voice:** Nível 2 (Operacional) durante coleta → Nível 1 (Institucional) no documento final
- **FDaP filter:** Aplicado ao documento de saída
- **Blocos de coleta:** Contexto → Público/Creators → Operação/Budget → Expectativas/KPIs

### gpt-proposal-generator-blueprint.md (NEXO no GPT Builder)
- **Nome:** GetShake · NEXO — Proposal Generator
- **JTBD:** "Quando tenho o briefing estruturado, quero um GPT que gere proposta comercial calibrada para o persona do decisor, para fechar mais rápido com menos retrabalho."
- **Knowledge Files:** brand-book.md, deliverables/pitch-comercial.md
- **Voice:** Nível 1 para CMO/Brand Manager, Nível 2 para Founder/CEO
- **Estrutura de proposta:** 6 seções (Desafio → Proposta → Creators → Investimento → Cronograma → Próximos Passos)

### gpt-creator-presentation-blueprint.md (RADAR no GPT Builder)
- **Nome:** GetShake · RADAR — Creator Presentation
- **JTBD:** "Quando tenho o briefing e uma lista de creators, quero um GPT que aplique os 9 critérios SHAKE.AI e monte deck de curadoria pronto para aprovação do cliente, para basear recomendações em método, não em intuição."
- **Knowledge Files:** brand-book.md, audience.md (para calibrar tom do deck por persona)
- **Critérios:** 9 SHAKE.AI (Aderência Cultural, Público, Qualidade de Execução, Comunidade, Credibilidade, Velocidade Operacional, Risco Reputacional [eliminatório], Crescimento, Fit por Plataforma)

---

## Task 8: Atualizar workspace.yaml de ambos os clientes

**Files:**
- Modify: `creative-hub/clients/caio-creator/workspace.yaml`
- Modify: `creative-hub/clients/getshake/workspace.yaml`

**Adicionar em method.gpt_builder:**
```yaml
method:
  # ... campos existentes ...
  gpt_builder_enabled: true
  gpt_builder_config:
    status: "blueprint"        # blueprint | configure | testing | published
    planned_gpts:
      - "gpt-ghostwriter"
      - "gpt-content-strategist"
      - "gpt-brand-mentor"
    published_gpts: []
    openai_plan_required: "Plus"
```

---

## Notas para Execução

- Tasks 2–5 podem ser executadas em paralelo (são arquivos independentes do módulo)
- Tasks 6 e 7 podem ser executadas em paralelo (clientes independentes) — mas leitura dos brand-guidelines é necessária antes
- Task 8 depende da estrutura das tasks 6 e 7 (para saber os nomes corretos dos GPTs)
- **Brand fidelity:** Cada blueprint deve usar exatamente o vocabulário dos brand-guidelines do cliente
  - Caio Creator: "framework", "sistema", "fundamentado", arquétipo Sábio+Criador, anti-guru, "Enquanto outros prometem atalhos, eu construo estradas"
  - GetShake: "creator" (nunca "influenciador"), FDaP, 3 níveis de voz, nomes dos agentes IRIS/NEXO/RADAR
- Instructions de cada GPT devem ter <8.000 caracteres
