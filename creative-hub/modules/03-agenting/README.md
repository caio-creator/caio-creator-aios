# MÓDULO 03 — AGENTING
> Biblioteca de prompts para criar agentes, system prompts e documentação agêntica

---

## O Que É Este Módulo

O **Agenting** é uma biblioteca de prompts para criar toda a documentação que define e governa agentes de IA. Aqui você encontra prompts para:

- Criar system prompts de agentes (simples e avançados)
- Desenvolver personas cognitivas para agentes
- Escrever documentação de tasks no padrão AIOS
- Desenhar workflows multi-agente
- Definir instruction sets, constraints e guardrails
- Criar rubricas de avaliação para agentes

---

## Para Quem É

Este módulo é para quem precisa:

- **Criar agentes personalizados** para clientes ou projetos
- **Documentar agentes existentes** com a profundidade necessária para serem reutilizáveis
- **Integrar agentes ao AIOS** seguindo os padrões do framework Synkra
- **Ensinar agentes novos** — sistemas de instrução completos para IAs

---

## Arquitetura do Módulo

```
03-agenting/
├── README.md                          # Este arquivo
└── prompts/
    ├── AG01-agent-brief.md            # Brief inicial: definir propósito e escopo
    ├── AG02-system-prompt-simple.md   # System prompt simples e direto
    ├── AG03-system-prompt-advanced.md # System prompt avançado com persona completa
    ├── AG04-aios-task-doc.md          # Documentação de task no padrão AIOS
    ├── AG05-workflow-design.md        # Desenho de workflow multi-step ou multi-agente
    ├── AG06-instruction-set.md        # Instruction set completo para agente especializado
    ├── AG07-constraints-guardrails.md # Constraints e guardrails de segurança e qualidade
    └── AG08-evaluation-rubric.md      # Rubrica de avaliação do comportamento do agente
```

---

## Fluxo Recomendado

### Para criar um agente do zero:
```
[AG01] Brief → [AG02/AG03] System Prompt → [AG07] Constraints → [AG08] Rubrica de teste
```

### Para integrar ao AIOS:
```
[AG01] Brief → [AG04] Task Doc AIOS → [AG05] Workflow Design → [AG07] Constraints
```

### Para documentar agente existente:
```
[AG06] Instruction Set → [AG07] Constraints → [AG08] Rubrica
```

---

## Diferenças entre os Tipos de Artefato

| Artefato | Para Que Serve | Quando Criar |
|----------|---------------|-------------|
| **System Prompt Simples** | Agente focado, 1 especialidade | Tarefa bem definida |
| **System Prompt Avançado** | Agente com persona e múltiplas capacidades | Agente que precisa de voz e estilo |
| **Task Doc AIOS** | Task executável dentro do framework AIOS | Integração ao Synkra AIOS |
| **Instruction Set** | Agente altamente especializado com protocolo detalhado | Casos complexos, muita nuance |
| **Workflow Design** | Sequência de múltiplas tasks/agentes | Processos de múltiplos passos |

---

## Padrões AIOS

Se você está criando documentação para integração ao **Synkra AIOS**, siga o padrão:
- Tasks ficam em `.aios-core/development/tasks/`
- Agentes ficam em `.aios-core/development/agents/`
- O `AG04` gera o formato correto de task AIOS
- Consulte `creative-hub/tasks/` para exemplos reais do padrão

---

## Templates Relacionados

Para agentes que precisam de um system prompt pronto para uso:
→ `templates/agent-system-prompt.md`

---

## Como Usar com @brand-director

O módulo Agenting pode ser usado para:
- Criar agentes derivados especializados em partes do processo de branding
- Documentar a própria metodologia de Atlas (@brand-director) em formato exportável
- Criar agentes de conteúdo que aplicam diretrizes de marca de forma autônoma
