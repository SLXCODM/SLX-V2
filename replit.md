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
- **Storage**: In-memory (MemStorage) - pode migrar para PostgreSQL
- **API**: RESTful com validação Zod

## Estrutura do Projeto

```
/client
  /src
    /components
      Header.tsx         - Navegação principal (mobile + desktop)
      Footer.tsx         - Rodapé com links e redes sociais
      ProjectCard.tsx    - Card reutilizável para projetos
      /ui                - Componentes Shadcn
    /pages
      Home.tsx           - Hero + categorias de conteúdo
      About.tsx          - História pessoal SLX
      Content.tsx        - Grid de projetos com filtros por categoria
      Projects.tsx       - Canais e plataformas
      Contact.tsx        - Formulário de contato
/server
  routes.ts            - API endpoints
  storage.ts           - Interface de storage
/shared
  schema.ts            - Tipos compartilhados (Projects, Contacts, AboutContent)
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
   - Scroll indicator animado

2. **Sobre (`/sobre`)**
   - História pessoal profunda sobre depressão, superação, significado de SLX
   - Layout de coluna única, max-width 3xl
   - Email de contato para leitores raros

3. **Conteúdo (`/conteudo`)**
   - Tabs para filtrar por categoria (Tudo, Gaming, Fotografia, Agricultura, Dev Pessoal)
   - Grid responsivo de ProjectCards
   - Suporta query params (?category=gaming)

4. **Projetos (`/projetos`)**
   - Cards grandes para YouTube Gaming, Instagram, TikTok, YouTube Agricultura
   - Ícones coloridos, descrições, CTAs
   - Seção de colaboração/patrocínio

5. **Contato (`/contato`)**
   - Formulário: Nome, Email, Assunto, Mensagem
   - Email direto: slowedbase@gmail.com
   - Info sobre colaborações e tempo de resposta

## Funcionalidades

### Implementadas (Frontend)
- [x] Navegação responsiva (mobile menu overlay)
- [x] Hero section impactante
- [x] Filtros de categoria com Tabs
- [x] Cards de projeto com hover states sutis
- [x] Formulário de contato
- [x] Footer com redes sociais
- [x] Dark mode por padrão (minimalista)
- [x] Smooth scroll
- [x] Data-testids em todos os elementos interativos

### Pendentes (Backend)
- [ ] API endpoints para projetos
- [ ] API endpoint para contato
- [ ] Storage real (PostgreSQL ou in-memory)

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

## Próximos Passos

1. Implementar backend APIs
2. Conectar formulário de contato real
3. Adicionar sistema de admin para gerenciar projetos
4. Otimizar imagens
5. SEO completo
6. Analytics

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
