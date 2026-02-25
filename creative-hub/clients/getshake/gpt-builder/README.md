# GPT Builder — GetShake®

> Blueprints prontos para configurar os Custom GPTs operacionais da GetShake no OpenAI GPT Builder.

---

## Os 3 GPTs da Operação

| # | Nome | Codinome | JTBD Resumido | Status | Plano OpenAI |
|---|------|----------|---------------|--------|--------------|
| 1 | **Briefing Intake** | IRIS | Transformar pedido fragmentado em briefing estruturado e acionável | Pronto para deploy | Plus / Team |
| 2 | **Proposal Generator** | NEXO | Gerar proposta comercial calibrada por persona de buyer | Pronto para deploy | Plus / Team |
| 3 | **Creator Presentation** | RADAR | Aplicar 9 critérios SHAKE.AI e gerar deck de curadoria | Pronto para deploy | Plus / Team |

---

## Relação com os Agentes AIOS

Estes GPTs são versões **ChatGPT** dos agentes AIOS já documentados em `../agents/`. São funcionalmente equivalentes, mas operam em plataformas distintas:

| Agente AIOS (Claude) | GPT ChatGPT | Diferença-chave |
|----------------------|-------------|-----------------|
| `getshake-briefing-intake.md` | IRIS GPT | GPT opera de forma autônoma e stateless — sem memória de sessão entre conversas |
| `getshake-proposal-generator.md` | NEXO GPT | GPT recebe briefing colado no chat — não conecta com IRIS automaticamente |
| `getshake-creator-presentation.md` | RADAR GPT | GPT analisa lista fornecida pelo usuário — não acessa plataformas externas (sem Actions) |

**Nota:** Os agentes AIOS são recomendados para uso interno integrado. Os GPTs são ideais para uso avulso, demos comerciais, ou acesso pelo time sem acesso ao AIOS.

---

## Como Usar Esta Pasta

### Pré-requisito
Conta OpenAI com plano **Plus, Team, Business ou Enterprise** (criação de GPTs não disponível no plano Free).

### Fluxo de Deploy

1. **Leia o blueprint completo** do GPT que deseja criar
2. **Prepare os Knowledge Files** listados na seção 7 de cada blueprint
   - Converta arquivos `.md` para `.txt` antes do upload — GPT Builder não aceita Markdown nativo
3. **Acesse:** [chat.openai.com/gpts/editor](https://chat.openai.com/gpts/editor) → "Create"
4. **Use a aba "Configure"** (não o modo "Create" por chat):
   - Cole as **Instructions** da seção 6 do blueprint
   - Preencha nome, descrição e foto de perfil conforme indicado
   - Faça upload dos Knowledge Files
   - Ative/desative Capabilities conforme especificado
   - Adicione os Conversation Starters da seção 10
5. **Execute o Test Suite** (seção 11) antes de publicar
6. **Defina a visibilidade** conforme recomendado (Link-only = uso interno do time)

---

## Arquivos Nesta Pasta

| Arquivo | GPT | Codinome |
|---------|-----|----------|
| `gpt-briefing-intake-blueprint.md` | Briefing Intake | IRIS |
| `gpt-proposal-generator-blueprint.md` | Proposal Generator | NEXO |
| `gpt-creator-presentation-blueprint.md` | Creator Presentation | RADAR |

---

## Referência de Módulo

Este folder é gerenciado pelo módulo de automação de marca:
`../../modules/05-gpt-builder/playbook.md`

---

## Knowledge Files — Mapa Geral

Todos os GPTs utilizam arquivos do Creative Hub desta estrutura:

```
../brand-guidelines/
  ├── positioning.md        → Posicionamento, taglines, mensagens por audiência
  ├── audience.md           → 4 personas (CMO, Founder, Brand Manager, Creator)
  ├── voice-and-tone.md     → 3 níveis de voz, filtro FDaP, vocabulário
  ├── narrative.md          → Brand story e manifesto
  └── editorial.md          → Linha editorial e conteúdo
../deliverables/
  ├── brand-book.md         → Identidade completa consolidada
  ├── manual-operacional.md → Pipeline 12 etapas, 9 critérios SHAKE.AI
  └── pitch-comercial.md    → Materiais de vendas prontos
../agents/
  ├── getshake-briefing-intake.md    → Protocolo completo do IRIS (AIOS)
  ├── getshake-proposal-generator.md → Protocolo completo do NEXO (AIOS)
  └── getshake-creator-presentation.md → Protocolo completo do RADAR (AIOS)
```

**Importante:** Antes do upload, converta `.md` para `.txt` ou `.pdf`.

---

## Limites Técnicos (Referência Rápida)

| Limite | Valor |
|--------|-------|
| Máximo de caracteres nas Instructions | 8.000 |
| Máximo de arquivos de Knowledge | 20 |
| Tamanho máximo por arquivo | 512 MB |
| Formatos suportados | PDF, DOCX, TXT, CSV, XLSX, PNG, JPEG |
| Formatos NÃO suportados | .gdoc, .md nativo |

---

*Última atualização: 2026-02-24 — GetShake® Creative Hub v1.0*
