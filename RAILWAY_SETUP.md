# Deploy no Railway/Render

## 1. Railway Setup (Recomendado - mais fácil)

### Passo 1: Criar conta Railroad
- Acesse: https://railway.app
- Clique "Sign Up"
- Conecte sua conta GitHub

### Passo 2: Deploy automático
1. Clique "New Project"
2. Selecione "Deploy from GitHub"
3. Escolha repositório `SLX`
4. Railway vai auto-detectar Node.js
5. Variáveis de ambiente:
   - `SESSION_SECRET`: copie o valor do Replit (secrets tab)
   - `RESEND_API_KEY`: copie do Replit

### Passo 3: Obter URL
- Depois do deploy, acesse "Settings"
- Copie a URL gerada (exemplo: `https://slx-api-xxxxx.railway.app`)

---

## 2. Render Setup (Alternativa)

### Passo 1: Criar conta
- Acesse: https://render.com
- Clique "Sign Up" com GitHub

### Passo 2: Deploy
1. Clique "New+" → "Web Service"
2. Conecte repositório `SLX`
3. Configurações:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Adicione variáveis:
   - `SESSION_SECRET`
   - `RESEND_API_KEY`

### Passo 3: Obter URL
- Render fornece URL automática

---

## 3. Atualizar Frontend (Vercel)

Depois que Railway/Render está online, VOCÊ PRECISA:

1. Criar arquivo `.env.production` com:
```
VITE_API_BASE_URL=https://slx-api-xxxxx.railway.app
```

2. Fazer deploy no Vercel

---

## 4. Variáveis de Ambiente Necessárias

### Backend (Railway/Render)
- `SESSION_SECRET`: do Replit secrets
- `RESEND_API_KEY`: do Replit secrets
- `NODE_ENV`: production (automático)

### Frontend (Vercel)
- `VITE_API_BASE_URL`: URL do Railway/Render

---

## Pronto!
Agora seu site roda:
- Backend: Railway/Render
- Frontend: Vercel
- Conectados automaticamente!
