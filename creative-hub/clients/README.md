# CLIENTS — Espaço de Trabalho por Cliente
> Cada cliente tem seu próprio workspace isolado com todos os artefatos do projeto

---

## Estrutura

```
clients/
├── README.md                    # Este arquivo
├── _template/                   # Template base — copiar para cada cliente novo
│   ├── workspace.yaml           # Manifesto do projeto
│   ├── briefing/
│   │   └── brand-briefing.md   # Briefing inicial preenchido
│   ├── brand-guidelines/
│   │   ├── positioning.md       # Bússola de posicionamento
│   │   ├── audience.md          # ICP, personas e jornada
│   │   ├── voice-and-tone.md   # DNA de voz e vocabulário
│   │   ├── narrative.md         # Brand story e manifesto
│   │   ├── editorial.md         # Pilares e grade editorial
│   │   ├── visual-brief.md      # Brief de identidade visual
│   │   └── digital-guidelines.md # Diretrizes por canal
│   ├── deliverables/
│   │   └── brand-book.md        # Brand book compilado (output final)
│   ├── content/
│   │   └── story-bank.md        # Banco de histórias em expansão
│   ├── second-brain/            # (Opcional) Perfis clonados de referências
│   └── sessions/                # Log de sessões e decisões
│       └── session-log.md
└── [slug-do-cliente]/           # Ex: marcela-coach, startup-xyz, loja-aurora
    └── [mesma estrutura acima]
```

---

## Como Criar um Novo Workspace

### Via @brand-director (recomendado)
```
@brand-director → *new-client [NOME DO CLIENTE]
```
O agente cria o workspace, preenche o `workspace.yaml` e inicia o briefing.

### Manualmente
1. Copie o diretório `_template/` para `clients/[slug-do-cliente]/`
2. Substitua `[slug-do-cliente]` por um identificador em kebab-case
3. Abra `workspace.yaml` e preencha as informações básicas
4. Inicie com o prompt `P01-brand-intake.md` do módulo de branding

---

## Convenções de Nomenclatura

**Slug do cliente:** kebab-case, identificador único, sem espaços ou acentos
- ✅ `marcela-mendes-coach`, `aurora-cosmeticos`, `startup-fintech-xyz`
- ❌ `Marcela Mendes`, `Cliente_01`, `novo projeto`

**Versões:** quando um documento tem revisão, use sufixo `-v2`, `-v3`
- `brand-book-v2.md`

---

## Isolamento e Privacidade

Cada pasta de cliente é completamente isolada. Nenhum arquivo de cliente deve referenciar
arquivos de outro cliente.

Dados sensíveis (contratos, valores, dados pessoais) **não** devem ser armazenados aqui
— use ferramentas apropriadas para gestão contratual.

---

## Clientes Ativos

| Slug | Nome | Status | Fase Atual |
|------|------|--------|-----------|
| _template | Template base | — | — |
| [adicionar ao criar] | | | |
