# GUIA DE IMPLEMENTAÇÃO — GETSHAKE OPERATIONS HUB (NOTION)

**GetShake | Fevereiro 2026**
**Baseado em:** Fluxo Comercial Juicy (PDF fornecido por Felipe Pastore)

---

## VISÃO GERAL DA ARQUITETURA

O Operations Hub da GetShake no Notion é composto por **3 databases relacionados** e **1 hub central** (página mestra que integra tudo).

```
GetShake Operations Hub
├── 🎯 Pipeline Comercial       ← DATABASE PRINCIPAL (Kanban)
├── 🏢 Base de Clientes         ← DATABASE RELACIONADO
├── 🎬 Base de Creators         ← DATABASE RELACIONADO
└── 📋 README / Como Usar       ← PÁGINA DE INSTRUÇÕES
```

---

## DATABASE 1 — PIPELINE COMERCIAL

> **Propósito:** Rastrear todas as campanhas em andamento, etapa por etapa, do briefing ao pós-venda.

### Status / Etapas do Kanban

| Etapa | Cor | Time Responsável |
|-------|-----|-----------------|
| 🔵 Briefing Recebido | Azul | Comercial |
| 🔵 Cadastro & Qualificação | Azul | Comercial |
| 🟡 Lab / Planejamento | Amarelo | Comercial |
| 🟡 Montagem de Casting | Amarelo | Operação |
| 🟠 Casting Enviado | Laranja | Comercial |
| 🟠 Aprovação de Casting | Laranja | Comercial |
| 🔴 Contrato & NFs | Vermelho | Financeiro/Jurídico |
| 🔴 Execução | Vermelho | Operação |
| 🟢 Entrega | Verde | Operação |
| 🟢 Relatório (PDF + Excel) | Verde | Operação |
| ✅ Pós-Venda | Cinza | Comercial |
| ❌ Cancelado | Cinza | — |

### Propriedades

| Propriedade | Tipo | Opções / Notas |
|-------------|------|----------------|
| Nome da Campanha | Title | Ex: "Nike × Seeding — Fevereiro" |
| Status | Select | 12 etapas acima |
| Tipo de Campanha | Select | Seeding / Presence / Casting |
| Cliente | Relation | → Database "Base de Clientes" |
| Responsável Comercial | Select | Felipe Iacoca / Marcelo Mattar / Felipe Pastore / Patrícia Nascimento / Renato Santos |
| Responsável Operação | Select | Pedro Morais / Renato Santos |
| Responsável Financeiro | Select | Bianca Assaf / Marcelo Mattar |
| Data do Briefing | Date | Data de entrada do job |
| Data de Entrega | Date | Prazo acordado com o cliente |
| Valor da Campanha | Number | Formato R$ |
| Prioridade | Select | 🔴 Alta / 🟡 Média / 🟢 Baixa |
| Contrato Assinado | Checkbox | Marcar quando jurídico liberar |
| NF Emitida | Checkbox | Marcar quando financeiro emitir |
| Relatório Entregue | Checkbox | Marcar quando ops entregar |
| Observações | Text | Notas internas, contexto extra |

### Views recomendadas

1. **📋 Kanban por Etapa** — visão padrão, colunas = Status
2. **📊 Tabela Geral** — todas as campanhas com filtro de data
3. **📅 Calendário de Entrega** — filtrado por "Data de Entrega"
4. **👤 Por Responsável** — agrupar por "Responsável Comercial"
5. **💰 Financeiro Pendente** — filtro: Contrato Assinado = false OU NF Emitida = false
6. **🏁 Em Execução** — filtro: Status = "Execução" ou "Entrega"

---

## DATABASE 2 — BASE DE CLIENTES

> **Propósito:** CRM básico para rastrear marcas e anunciantes da GetShake.

### Propriedades

| Propriedade | Tipo | Notas |
|-------------|------|-------|
| Nome da Empresa | Title | Nome do cliente |
| Contato Principal | Text | Nome da pessoa de contato |
| Email | Email | E-mail comercial |
| WhatsApp | Phone | Número comercial |
| Segmento | Select | Moda / Beleza / Tech / Alimentação / Varejo / Serviços / Outros |
| Status | Select | Lead / Cliente Ativo / Inativo / VIP |
| Campanhas | Relation | → Pipeline Comercial |
| Total de Campanhas | Rollup | Count de "Campanhas" |
| Ticket Médio | Rollup | Avg de "Valor da Campanha" |
| Notas | Text | Histórico, preferências, alertas |
| Data de Entrada | Date | Primeiro contato ou primeiro job |

### Views recomendadas

1. **🏢 Todos os Clientes** — tabela padrão com Status
2. **⭐ VIPs** — filtro: Status = VIP
3. **🔥 Leads Ativos** — filtro: Status = Lead

---

## DATABASE 3 — BASE DE CREATORS

> **Propósito:** Banco de talentos da GetShake para casting de campanhas.

### Propriedades

| Propriedade | Tipo | Notas |
|-------------|------|-------|
| Nome | Title | Nome real ou artístico |
| @Handle | Text | Handle no Instagram (ou plataforma principal) |
| Plataformas | Multi-select | Instagram / TikTok / YouTube / Twitter / LinkedIn |
| Nicho | Multi-select | Moda / Beleza / Lifestyle / Fitness / Tech / Gastronomia / Viagem / Games / Business / Entretenimento |
| Seguidores | Number | Número de seguidores (plataforma principal) |
| Taxa de Engajamento | Number | Formato % (ex: 4.2) |
| Localização | Text | Cidade e Estado |
| Status | Select | ⭐ Alta Prioridade / ✅ Boa Fit / 🔁 Em Análise / ❌ Fora do Perfil |
| Email | Email | Contato direto |
| WhatsApp | Phone | Contato direto |
| Campanhas Participadas | Relation | → Pipeline Comercial |
| Total Campanhas | Rollup | Count de participações |
| Observações | Text | Histórico, notas de curadoria, feedbacks |
| Data de Cadastro | Date | Entrada no sistema |

### Views recomendadas

1. **🎬 Todos os Creators** — galeria ou tabela
2. **⭐ Alta Prioridade** — filtro: Status = Alta Prioridade
3. **✅ Casting Disponível** — filtro: Status = Boa Fit ou Alta Prioridade
4. **🔍 Por Nicho** — agrupar por Nicho
5. **📊 Por Plataforma** — filtro por plataforma específica

---

## CHECKLIST DE IMPLEMENTAÇÃO MANUAL (passo a passo)

Se preferir criar manualmente no Notion:

### Passo 1 — Criar a página hub
```
1. New page na workspace GetShake
2. Título: "⚡ GetShake Operations Hub"
3. Ícone: ⚡ | Capa: verde (#04FF93) ou imagem da marca
```

### Passo 2 — Criar Pipeline Comercial
```
1. /database inline na página hub
2. Nomear: "🎯 Pipeline Comercial"
3. Adicionar todas as propriedades da lista acima
4. Configurar Select "Status" com as 12 etapas e cores
5. Criar view Kanban usando "Status" como propriedade de agrupamento
```

### Passo 3 — Criar Base de Clientes
```
1. /database inline ou sub-página
2. Nomear: "🏢 Base de Clientes"
3. Adicionar propriedades da lista
4. Criar Relation entre "Campanhas" e "Pipeline Comercial"
```

### Passo 4 — Criar Base de Creators
```
1. /database inline ou sub-página
2. Nomear: "🎬 Base de Creators"
3. Adicionar propriedades
4. Criar Relation entre "Campanhas Participadas" e "Pipeline Comercial"
```

### Passo 5 — Vincular databases
```
1. No Pipeline Comercial: confirmar Relation "Cliente" → Base de Clientes
2. No Pipeline Comercial: adicionar Relation "Creators" → Base de Creators
3. Testar criando um job de exemplo
```

---

## FLUXO DE TRABALHO OPERACIONAL

### Como usar o Pipeline no dia a dia

**Quando chega um briefing:**
1. Criar novo item no Pipeline Comercial
2. Preencher: Nome, Cliente, Tipo, Responsável Comercial, Data Briefing
3. Status → "Briefing Recebido"
4. Mover para "Cadastro & Qualificação" após registrar cliente

**Na fase de planejamento:**
5. Mover para "Lab / Planejamento"
6. Definir Tipo de Campanha (Seeding / Presence / Casting)

**No casting:**
7. Mover para "Montagem de Casting"
8. Linkar creators da Base de Creators ao job
9. Mover para "Casting Enviado" quando enviar ao cliente
10. Se aprovado → "Aprovação de Casting"
11. Se não aprovado → voltar para "Montagem de Casting" com nota

**Na fase contratual:**
12. Mover para "Contrato & NFs"
13. Marcar checkbox "Contrato Assinado" quando jurídico liberar
14. Marcar checkbox "NF Emitida" quando financeiro emitir

**Na execução e entrega:**
15. Mover para "Execução" quando campanha começar
16. Mover para "Entrega" quando conteúdo for publicado
17. Mover para "Relatório" quando ops entregar PDF + Excel
18. Marcar checkbox "Relatório Entregue"

**Pós-venda:**
19. Mover para "Pós-Venda"
20. Documentar aprendizados e próximos passos em "Observações"

---

## LEGENDA DE TIMES (replicar como Responsible/Owner)

| Cor | Time | Membros |
|-----|------|---------|
| 🩷 Rosa/Vermelho | Comercial | Felipe Iacoca, Marcelo Mattar, Felipe Pastore, Patrícia Nascimento, Renato Santos |
| 🟠 Laranja | Financeiro / Jurídico | Bianca Assaf, Marcelo Mattar |
| 🟣 Roxo/Azul | Operação / Atendimento | Pedro Morais, Renato Santos |

---

## INTEGRAÇÕES FUTURAS (V2)

- **Tally → Notion:** Formulário de creators popula automaticamente Base de Creators
- **Tally → Notion:** Briefing de clientes popula automaticamente Pipeline
- **Zapier / Make:** Notificação no WhatsApp quando status mudar
- **Google Drive:** Anexar relatórios PDF/Excel diretamente no item do Pipeline

---

*Documento elaborado por: Caio Almeida*
*Baseado em: Fluxo Comercial Juicy (PDF) + Reunião Felipe Pastore*
*Fevereiro 2026*
