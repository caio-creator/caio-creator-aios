#!/bin/bash

# Script para iniciar CreatorOS Chat Suite
# Inicia backend (port 3002) e frontend (port 5175) em paralelo

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 CreatorOS Chat Suite — Iniciando aplicação..."
echo ""

# Check .env.local
if [ ! -f "$PROJECT_DIR/.env.local" ]; then
    echo "⚠️  .env.local não encontrado!"
    echo "   Copiando .env.example para .env.local..."
    cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env.local"
    echo "   ✅ .env.local criado"
    echo ""
    echo "   ⚠️  Você PRECISA configurar GROQ_API_KEY em .env.local"
    echo "   Obtenha em: https://console.groq.com/keys"
    echo ""
fi

# Start Backend
echo "📦 Iniciando Backend (Express + SSE)..."
cd "$PROJECT_DIR/backend"

if [ ! -d "node_modules" ]; then
    echo "   → npm install..."
    npm install > /dev/null 2>&1
fi

npm run dev &
BACKEND_PID=$!
echo "   ✅ Backend iniciado (PID: $BACKEND_PID)"
echo "   → Rodando em http://127.0.0.1:3002"
echo ""

# Start Frontend
echo "⚙️  Iniciando Frontend (Vite + React)..."
cd "$PROJECT_DIR/frontend"

if [ ! -d "node_modules" ]; then
    echo "   → npm install..."
    npm install > /dev/null 2>&1
fi

npm run dev &
FRONTEND_PID=$!
echo "   ✅ Frontend iniciado (PID: $FRONTEND_PID)"
echo "   → Rodando em http://localhost:5175"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ CreatorOS Chat Suite está pronto!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Acesse em: http://localhost:5175"
echo ""
echo "Para parar: pressione Ctrl+C"
echo ""

# Function para matar processos filhos ao sair
cleanup() {
    echo ""
    echo "🛑 Encerrando aplicação..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    echo "✅ Aplicação encerrada"
    exit 0
}

trap cleanup SIGINT

# Wait for both processes
wait
