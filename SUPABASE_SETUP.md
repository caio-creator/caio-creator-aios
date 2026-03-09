# 🗄️ Supabase Setup Completo

## PASSO 1: Criar Projeto Supabase

1. Ir para **https://supabase.com**
2. Fazer login (ou criar conta)
3. Clicar "New Project"
4. Preencer:
   - **Name**: `aios-chat-suite`
   - **Database Password**: Salvar em lugar seguro!
   - **Region**: Escolher mais próximo (eu-west-1 para Brasil/EU, us-east-1 para USA)
5. Clicar "Create New Project" (aguardar ~2 min)

---

## PASSO 2: Copiar Credenciais

Na dashboard do Supabase:

1. Ir para **Settings > API**
2. Copiar:
   - **Project URL** (ex: https://xxxxx.supabase.co)
   - **anon public key** (ex: eyJ...)
   - **service_role secret** (ex: eyJ... - GUARDAR COM SEGURANÇA!)

---

## PASSO 3: Criar Tabelas

Na dashboard, ir para **SQL Editor** e rodar o SQL abaixo:

```sql
-- Create sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id TEXT NOT NULL,
  client_slug TEXT,
  title TEXT NOT NULL,
  model TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_messages_session_id ON messages(session_id);
CREATE INDEX idx_sessions_updated_at ON sessions(updated_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow public access (temporário - para desenvolvimento)
CREATE POLICY "Enable public access" ON sessions FOR ALL USING (true);
CREATE POLICY "Enable public access" ON messages FOR ALL USING (true);
```

---

## PASSO 4: Adicionar ao .env

No arquivo `.env.local` (raiz do projeto):

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

**IMPORTANTE:** Nunca commitar `.env.local` - está no `.gitignore`

---

## PASSO 5: Instalar SDK Supabase

```bash
cd aios-dashboard/backend
npm install @supabase/supabase-js
```

---

## PASSO 6: Testar Conexão

Backend vai usar Supabase automaticamente quando os env vars forem setados.

Testar com:
```bash
npm run dev
# Acessar http://localhost:5175/chat
# Enviar uma mensagem
# Verificar se aparece em: https://supabase.com > sessions table
```

---

## URLs das Credenciais

Depois de criar o projeto, você terá:

- **Project URL**: https://XXXXX.supabase.co
- **API Key (anon)**: Começar com `eyJ`
- **Service Role Key**: Começar com `eyJ` (maior que anon key)

---

**Quando tiver as credenciais, avisa!** ✅
