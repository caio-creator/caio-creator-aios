# Caio Creator Hub 🎨

**Hub criativo pessoal para desenvolvimento de marcas, segundo cérebro e documentação agêntica.**

---

## O que é isso?

O Caio Creator Hub é um sistema estruturado de métodos e prompts para:

1. **Branding** — Desenvolver diretrizes completas de marca para qualquer cliente
2. **Segundo Cérebro** — Clonar o pensamento de personas e referências relevantes
3. **Agenting** — Criar documentação e instruções agênticas profissionais

---

## Como navegar

```
creative-hub/
├── modules/01-branding/          → Método de branding fase a fase
├── modules/02-second-brain/      → Protocolo de clonagem de personas
├── modules/03-agenting/          → Biblioteca de prompts para agentes
├── modules/04-content-production/→ Produção de conteúdo e carrosséis
├── tasks/                        → Tasks AIOS executáveis
├── data/                         → Arquétipos, tons de voz, referências
├── templates/                    → Templates de output para clientes
├── checklists/                   → Gates de qualidade
└── clients/                      → Workspace por cliente
```

---

## Quick Start

### Novo projeto de branding

```
@brand-director
*new-client [nome-do-cliente]
*briefing [nome-do-cliente]
```

Ou manualmente: use os prompts em `modules/01-branding/` fase a fase.

### Clonar uma persona / Segundo Cérebro

```
Vá para: modules/02-second-brain/
Use os prompts SB01 → SB07 em sequência
```

### Criar documentação de agente

```
Vá para: modules/03-agenting/
Use AG01 → AG03 para system prompts
Use AG04 → AG05 para documentação AIOS
```

---

## Agente @content-producer (Verso)

O hub inclui um agente AIOS especializado em produção de conteúdo — complementar ao @brand-director.

**Ativar:** Digite `@content-producer` no Claude Code

**Comandos principais:**
| Comando | O que faz |
|---------|-----------|
| `*carousel [tema]` | Carrossel completo (9 slides + legenda + hashtags) com voz de marca aplicada |
| `*hook [tema]` | 5 opções de gancho (Slide 1) para aprovação antes do carrossel |
| `*week` | Grade semanal completa: 3 carrosséis (Terça/Quinta/Sábado) |
| `*validate [copy]` | Valida copy contra os 8 critérios do Quality Bar — retorna score e feedback |

**Fluxo recomendado:**
```
1. *hook [tema]      → Escolha 1 das 5 opções de gancho
2. *carousel [tema]  → Carrossel completo baseado no gancho aprovado
3. *validate         → Quality Gate automático (score X/8)
4. Publicar          → Copy + legenda + hashtags prontos para colar
```

**Dependências automáticas:** Lê `clients/[cliente]/deliverables/brand-book.md` antes de qualquer geração.

---

## Agente @brand-director (Atlas)

O hub inclui um agente AIOS especializado em branding.

**Ativar:** Digite `@brand-director` no Claude Code

**Comandos principais:**
| Comando | O que faz |
|---------|-----------|
| `*briefing [marca]` | Inicia o discovery da marca |
| `*positioning` | Bússola de posicionamento |
| `*audience` | Mapeamento de público-alvo |
| `*voice` | Personalidade e tom de voz |
| `*narrative` | Storytelling e manifesto |
| `*editorial` | Linha editorial |
| `*visual-brief` | Brief de identidade visual |
| `*digital` | Diretrizes por canal digital |
| `*compile-brandbook` | Compila o brand book completo |
| `*new-client [nome]` | Inicializa workspace do cliente |
| `*status` | Progresso das fases |

---

## Fluxo do Método de Branding

```
FASE 1 → Briefing e Discovery
    ↓
FASE 2 → Bússola de Posicionamento
    ↓
FASE 3 → Público-Alvo e Personas
    ↓
FASE 4 → Personalidade e Tom de Voz
    ↓
FASE 5 → Narrativa e Storytelling
    ↓
FASE 6 → Linha Editorial
    ↓
FASE 7 → Brief de Identidade Visual
    ↓
FASE 8 → Diretrizes Digitais
    ↓
FASE 9 → Compilação do Brand Book
```

Cada fase produz um artefato documentado salvo no workspace do cliente.

---

## Estrutura de Cliente

Para cada cliente, crie um workspace em `clients/[nome-do-cliente]/`:

```
clients/[nome-do-cliente]/
├── briefing/brand-briefing.md       ← Fase 1
├── brand-guidelines/
│   ├── positioning.md               ← Fase 2
│   ├── audience.md                  ← Fase 3
│   ├── voice-and-tone.md            ← Fase 4
│   ├── narrative.md                 ← Fase 5
│   ├── editorial.md                 ← Fase 6
│   ├── visual-brief.md              ← Fase 7
│   ├── digital-guidelines.md        ← Fase 8
│   └── brand-book.md                ← Fase 9 (compilação)
├── content/story-bank.md
└── sessions/                        ← Logs de trabalho
```

Use `clients/_template/` como ponto de partida para novos clientes.

---

## Integração AIOS

Este hub é um **Squad AIOS** registrado via `squad.yaml`. Integra com:
- `@analyst` — Pesquisa de mercado antes do briefing
- `@qa` — Quality gate do brand book (10 critérios)
- `@devops` — Entrega do brand book ao cliente via git/PR

---

*Caio Creator Hub v1.0.0 — Desenvolvido com Synkra AIOS*
