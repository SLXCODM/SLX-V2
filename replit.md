# SLX - Marca Pessoal Profissional Minimalista

## Visão Geral

Site profissional minimalista para SLX - estrategista de pensamento, criador de conteúdo técnico e profundo nas áreas de Gaming (Call of Duty Mobile), Fotografia, Agricultura e Desenvolvimento Pessoal.

## Arquitetura

### Frontend
- **Framework**: React com TypeScript + Vite
- **Roteamento**: Wouter
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: TanStack Query

### Backend
- **Framework**: Express.js
- **Storage**: In-memory (MemStorage)
- **API**: RESTful com validação Zod
- **Email**: Resend (transactional emails)

## Estrutura do Projeto

```
/client
  /src
    /components
      Header.tsx         - Navegação principal (mobile + desktop)
      Footer.tsx         - Rodapé com links e redes sociais
      ProjectCard.tsx    - Card reutilizável para projetos
      FollowToUnlock.tsx - Sistema de desbloqueio de conteúdo
      /ui                - Componentes Shadcn
    /pages
      Home.tsx           - Hero + categorias de conteúdo
      About.tsx          - História pessoal SLX
      Content.tsx        - Grid de projetos com filtros por categoria
      Projects.tsx       - Canais e plataformas
      Contact.tsx        - Formulário de contato
      Sponsors.tsx       - Página de patrocínios com mediakit
      Classes.tsx        - Classes de armas do CODM
      Donations.tsx      - Página de doações
/server
  routes.ts            - API endpoints
  storage.ts           - Interface de storage
  email.ts             - Serviço de envio de emails (Resend)
  rate-limiter.ts      - Limitação de taxa para contato
/shared
  schema.ts            - Tipos compartilhados (Projects, Contacts, AboutContent)
  weaponsData.ts       - Dados das armas do CODM
```

## Design System

### Paleta de Cores (Minimalista Profissional)
- **Preto Fosco**: `hsl(0, 0%, 8%)` - Background principal
- **Cinza Escuro**: `hsl(0, 0%, 12%)` - Cards
- **Cinza Médio**: `hsl(0, 0%, 18%)` - Borders
- **Branco Suave**: `hsl(0, 0%, 98%)` - Texto principal
- **Azul Petróleo**: `hsl(195, 85%, 35%)` - Cor de acento (única!)

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Fonte Mono**: JetBrains Mono
- Hierarquia clara: Hero (6xl/8xl) → Títulos (4xl/5xl) → Corpo (base/lg)

### Princípios de Design
- **Minimalismo funcional**: Cada elemento tem propósito
- **Espaço em branco**: Conteúdo respira
- **Autoridade silenciosa**: Visual passa profissionalismo sem gritar
- **Mobile-first**: Tráfego vem de Instagram/TikTok bio

## Páginas

1. **Home (`/`)**
   - Hero section full viewport com tagline
   - Grid de 4 categorias (Gaming, Fotografia, Agricultura, Dev Pessoal)
   - CODM ID exibido (6870254103403626497)
   - Scroll indicator animado
   - Popup de raffle em PT-BR

2. **Sobre (`/sobre`)**
   - História pessoal profunda sobre depressão, superação, significado de SLX
   - Layout de coluna única, max-width 3xl
   - Email de contato para leitores raros

3. **Conteúdo (`/conteudo`)**
   - Tabs para filtrar por categoria (Tudo, Gaming, Fotografia, Agricultura, Dev Pessoal, Writer)
   - FollowToUnlock na aba Gaming (desbloqueio global com `slx_codm_unlocked`)
   - Grid responsivo de ProjectCards
   - Suporta query params (?category=gaming)

4. **Classes (`/classes`)**
   - Exibição de 16 armas do CODM com stats, builds e dicas
   - Busca e filtro por tipo de arma
   - Sistema de likes em storage
   - Acesso bloqueado até desbloquear na aba de Conteúdo

5. **Projetos (`/projetos`)**
   - Cards grandes para YouTube Gaming, Instagram, TikTok, YouTube Agricultura
   - Ícones coloridos, descrições, CTAs
   - Seção de colaboração/patrocínio

6. **Contato (`/contato`)**
   - Formulário: Nome, Email, Assunto, Mensagem
   - Honeypot anti-spam
   - Rate limiting: 3 mensagens por minuto
   - Email automático para admin via Resend
   - Confirmação enviada ao usuário

7. **Patrocínios (`/patrocinadores`)**
   - Mediakit integrado via iframe (https://beacons.ai/slx_codm/mediakit)
   - Link externo como fallback
   - Formulário de contato para patrocínios
   - Mesmo sistema de email que Contact

## Funcionalidades

### Implementadas
- [x] Navegação responsiva (mobile menu overlay)
- [x] Hero section impactante com CODM ID
- [x] Filtros de categoria com Tabs
- [x] Cards de projeto com hover states sutis
- [x] Formulário de contato com Resend
- [x] Formulário de patrocínios com mediakit integrado
- [x] Footer com redes sociais
- [x] Dark mode por padrão (minimalista)
- [x] Smooth scroll
- [x] Data-testids em todos os elementos interativos
- [x] Sistema de Follow to Unlock para conteúdo CODM
- [x] Desbloqueio global com localStorage (`slx_codm_unlocked`)
- [x] Página de Classes com 16 armas CODM
- [x] Página de Doações bilíngue
- [x] Seletor de idioma PT/BR/EN
- [x] Popup de raffle em PT-BR
- [x] API endpoints para projetos
- [x] API endpoint para contato (com rate limiting)
- [x] Envio de emails transacionais (Resend)
- [x] Storage em memória
- [x] Honeypot anti-spam
- [x] Sistema de likes para armas

## Dados Mock

Atualmente usando dados mock para desenvolvimento:
- 6 projetos de exemplo nas categorias
- Informações estáticas sobre/contato

## Tecnologias Chave

- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI (Radix primitives)
- Wouter (routing)
- TanStack Query
- Zod validation
- Lucide icons + React Icons

## Como Executar

```bash
npm run dev
```

Acessa: http://localhost:5000

## Sistema de Email (Resend)

- **Integração**: Resend connector configurado
- **Fluxo**: Formulários enviados → Resend API → Emails automáticos para admin + confirmação ao usuário
- **Rate Limiting**: 3 mensagens por minuto por IP
- **Anti-spam**: Honeypot field para detectar bots

## Sistema de Desbloqueio CODM

- **Chave Global**: `slx_codm_unlocked` no localStorage
- **Trigger**: Usuário clica "Já Segui" no FollowToUnlock na aba Gaming
- **Efeito**: Desbloqueia:
  - Todos os ProjectCards com `isLocked: true` na categoria gaming
  - Página de Classes (/classes)
  - Handcam, Minhas Configurações, Meus Tutoriais Exclusivos

## Google AdSense Integration

- **Status**: Implementado ✅
- **Publisher ID**: ca-pub-2053964731459379
- **Ads Placement**:
  - Home page: After categories section (slot: 1234567890)
  - Content page: Above photography grid (slot: 2345678901)
  - About page: Middle of content (slot: 3456789012)
- **Component**: AdSenseUnit.tsx (reutilizável em qualquer página)
- **Note**: Ads não aparecem em localhost - funcionam apenas em domínio verificado (slx-codm.vercel.app)

## Próximos Passos

1. Monitorar performance dos anúncios no AdSense dashboard
2. Adicionar mais anúncios em outras páginas conforme necessário
3. Adicionar sistema de admin para gerenciar projetos
4. Otimizar imagens
5. Analytics
6. Migrar para PostgreSQL (banco de dados real)

## Identidade de Marca

**SLX NÃO é:**
- Influencer divertido
- Motivador genérico
- Criador superficial

**SLX É:**
- Estrategista de pensamento
- Perfil analítico
- Criador profundo
- Autoridade silenciosa

## Contato do Desenvolvedor

Para modificações ou dúvidas sobre o código, contactar através do projeto.
