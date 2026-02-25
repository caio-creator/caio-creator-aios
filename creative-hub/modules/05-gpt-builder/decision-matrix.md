# Matriz de Decisão — Knowledge vs. Actions vs. Web Search
> Quando usar cada recurso nos Custom GPTs do Creative Hub
> Versão: 1.0 | Criado em: 2026-02-24

---

## A Regra Geral

```
Knowledge → Actions → Web Search → Conhecimento interno do modelo
(prioridade)
```

**Knowledge first.** Se a informação está nos arquivos, use-a. Actions e Web são para casos específicos.

---

## Tabela de Decisão

| Situação | Knowledge | Actions | Web Search | Conhecimento interno |
|----------|-----------|---------|-----------|---------------------|
| Responder sobre a marca, posicionamento, voz | USE | Não | Não | fallback |
| Responder sobre produto/serviço do cliente | USE | Não | Não | fallback |
| Recuperar dados históricos do cliente | USE | Não | Não | Não |
| Escrever no tom da marca | USE | Não | Não | Não |
| Buscar informações atuais (notícias, preços) | Não | Não | USE | Não |
| Verificar dados que mudam frequentemente | Não | Sim ou Web | Sim | Não |
| Integrar com CRM/sistema externo | Não | USE | Não | Não |
| Criar proposta e salvar no sistema | Não | USE | Não | Não |
| Responder sobre conceitos gerais (não da marca) | Não | Não | Não | USE |
| Executar cálculos ou análises de dados | Não | Não | Não | Code Interpreter |

---

## Exemplos Práticos — Caio © Creator

| Pergunta do usuário | Fonte correta | Por quê |
|--------------------|--------------|---------|
| "Qual o arquétipo principal da marca Caio?" | Knowledge (voice-and-tone.md) | Dado fixo do brand-book |
| "Escreve um hook no tom do Caio sobre frameworks" | Knowledge (voice-and-tone.md + story-bank.md) | Tom calibrado nos arquivos |
| "Quais são os 5 paradoxos da marca?" | Knowledge (narrative.md ou brand-book.md) | Conteúdo estratégico documentado |
| "Quais as tendências de conteúdo para criadores em 2026?" | Web Search | Informação atual e dinâmica |
| "Gera uma imagem de um framework visual" | Image Generation capability | Não é Knowledge nem Actions |

---

## Exemplos Práticos — GetShake

| Pergunta do usuário | Fonte correta | Por quê |
|--------------------|--------------|---------|
| "Quais são os 9 critérios do SHAKE.AI?" | Knowledge (brand-book.md) | Dado fixo da metodologia |
| "Aplica o FDaP nessa mensagem para o cliente" | Knowledge (voice-and-tone.md) | Filtro definido nos brand-guidelines |
| "Quais as personas dos compradores GetShake?" | Knowledge (audience.md) | Personas documentadas |
| "Salva esse briefing no CRM" | Actions | Integração com sistema externo |
| "Qual é a taxa média de engajamento de creators de gastronomia em 2026?" | Web Search | Dado dinâmico de mercado |

---

## Quando NÃO usar Web Search

- Quando a informação está nos knowledge files → sempre preferir Knowledge
- Quando o dado é sobre a marca/produto/metodologia do cliente → usar Knowledge
- Quando o GPT é de escrita/criação pura (Ghostwriter, Copywriter) → desligar Web Search

## Quando NÃO usar Actions

- Quando a tarefa é só gerar texto → Knowledge é suficiente
- Quando não há API configurada → óbvio, mas é um erro de config comum
- Para tarefas simples de escrita ou análise → desproporcional

## Quando NÃO usar Knowledge

- Quando o dado é dinâmico (preços de mercado, notícias) → Web Search
- Quando o assunto é completamente genérico e não tem relação com a marca → conhecimento interno
- Quando os arquivos não foram atualizados → cuidado: dados desatualizados nos arquivos = respostas desatualizadas
