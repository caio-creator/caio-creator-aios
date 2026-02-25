# GPT Builder — Caio Creator

> Blueprints prontos para configurar os Custom GPTs da marca Caio Creator no OpenAI GPT Builder.

---

## Os 3 GPTs da Marca

| # | Nome | JTBD Resumido | Status | Plano OpenAI |
|---|------|---------------|--------|--------------|
| 1 | **Caio Ghostwriter** | Criar conteúdo no tom exato da marca | Pronto para deploy | Plus / Team |
| 2 | **Caio Content Strategist** | Gerar pautas alinhadas com pilares e fase atual | Pronto para deploy | Plus / Team |
| 3 | **Caio Brand Mentor** | Consultoria de posicionamento com base na metodologia | Pronto para deploy | Plus / Team |

---

## Como Usar Esta Pasta

### Pré-requisito
Conta OpenAI com plano **Plus, Team, Business ou Enterprise** (criação de GPTs não disponível no plano Free).

### Fluxo de Deploy

1. **Leia o blueprint completo** do GPT que deseja criar
2. **Prepare os Knowledge Files** conforme indicado na seção 7 de cada blueprint
3. **Acesse:** [chat.openai.com/gpts/editor](https://chat.openai.com/gpts/editor) → "Create"
4. **Configure → aba "Configure"** (não use o modo "Create" por chat):
   - Cole o conteúdo da seção **"Instructions"** do blueprint
   - Preencha nome, descrição e foto de perfil conforme indicado
   - Faça upload dos Knowledge Files
   - Ative/desative Capabilities conforme especificado
   - Adicione os Conversation Starters
5. **Execute o Test Suite** mínimo antes de publicar
6. **Defina a visibilidade** conforme recomendado no blueprint (Private / Link-only)

### Estrutura de Cada Blueprint

```
1. Metadados
2. Identidade
3. JTBD
4. Escopo IN / OUT
5. Entradas / Saídas
6. Instructions (pronto para colar — máx 8.000 chars)
7. Knowledge Files
8. Capabilities
9. Actions
10. Conversation Starters
11. Test Suite
12. Privacidade e Segurança
13. Publicação
14. Changelog
```

---

## Arquivos Nesta Pasta

| Arquivo | GPT |
|---------|-----|
| `gpt-ghostwriter-blueprint.md` | Caio Ghostwriter |
| `gpt-content-strategist-blueprint.md` | Caio Content Strategist |
| `gpt-brand-mentor-blueprint.md` | Caio Brand Mentor |

---

## Referência de Módulo

Este folder é gerenciado pelo módulo de automação de marca:
`../../modules/05-gpt-builder/playbook.md`

*(Módulo a ser criado quando o epic GPT Builder for ativado no backlog do projeto.)*

---

## Arquivos de Knowledge (Mapa Geral)

Todos os GPTs utilizam arquivos do Creative Hub desta mesma estrutura de cliente:

```
../brand-guidelines/
  ├── positioning.md
  ├── audience.md
  ├── voice-and-tone.md
  ├── narrative.md
  ├── editorial.md
  ├── visual-brief.md
  └── digital-guidelines.md
../content/
  └── story-bank.md
../deliverables/
  └── brand-book.md
```

**Importante:** Antes do upload, converta arquivos `.md` para `.txt` ou `.pdf` — o GPT Builder não suporta Markdown nativo como formato de Knowledge.

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

*Última atualização: 2026-02-24 — Caio Creator Creative Hub v1.0*
