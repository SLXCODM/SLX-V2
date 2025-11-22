# Design Guidelines: SLX - Marca Pessoal Minimalista Profissional

## Filosofia de Design
**Minimalismo Funcional Profissional** - Um site que passa autoridade silenciosa, clareza intelectual e profundidade. Sem superficialidade, sem poluição visual, sem elementos infantis. Cada pixel tem propósito.

**Princípios Fundamentais:**
- Clareza, profundidade, inteligência e controle
- Presença silenciosa e respeito pelo conteúdo
- Estética limpa e profissional
- Espaço vazio como elemento de design
- Mobile-first (tráfego vem de Instagram/TikTok)

---

## Sistema de Cores

**Paleta Minimalista:**
```
Preto Fosco (Base Principal): hsl(0, 0%, 8%)
Cinza Escuro (Superfícies): hsl(0, 0%, 12%)
Cinza Médio (Bordas Sutis): hsl(0, 0%, 18%)
Branco Suave (Texto Principal): hsl(0, 0%, 98%)
Cinza Claro (Texto Secundário): hsl(0, 0%, 65%)

Acento Principal (Azul Petróleo):
- Base: hsl(195, 85%, 35%)  // Inteligência, profundidade, tecnologia
- Hover: hsl(195, 85%, 45%)
- Pressed: hsl(195, 85%, 25%)
```

**Hierarquia de Texto:**
- Texto Principal: branco suave (98%)
- Texto Secundário: cinza claro (65%)
- Texto Terciário/Meta: cinza médio (40%)

**Regras de Contraste:**
- Sempre garantir contraste suficiente para legibilidade
- Texto claro sobre fundo escuro
- Acento azul petróleo usado com parcimônia (CTAs, links importantes, highlights)
- NUNCA usar mais de uma cor de acento além da paleta monocromática

---

## Tipografia

**Fonte Principal:** Inter (Google Fonts)
- Limpa, moderna, profissional
- Excelente legibilidade em telas pequenas

**Hierarquia:**
```
Hero/Display: text-5xl md:text-6xl font-bold tracking-tight
Títulos de Página: text-3xl md:text-4xl font-semibold
Títulos de Seção: text-2xl font-semibold
Subtítulos: text-xl font-medium
Corpo: text-base md:text-lg
Metadata: text-sm font-medium opacity-60
Labels: text-xs font-semibold uppercase tracking-wider
```

**Espaçamento entre Linhas:**
- Títulos: leading-tight
- Corpo de texto: leading-relaxed

---

## Layout & Espaçamento

**Sistema de Espaçamento:**
- Pequeno: p-4, gap-4
- Médio: p-6, gap-6  
- Grande: p-8, gap-8
- Extra Grande: p-12, gap-12

**Containers:**
- Mobile: px-4
- Desktop: max-w-7xl mx-auto px-8

**Seções:**
- Espaçamento vertical entre seções: py-16 md:py-24
- Dentro de seções: gap-8 md:gap-12

---

## Componentes

### Navegação
**Desktop:**
- Fixed header, bg-background/95 backdrop-blur-sm
- Logo simples "SLX" à esquerda
- Links de navegação centralizados ou à direita
- Minimal hover states (apenas sublinhado fino em azul petróleo)

**Mobile:**
- Hamburger menu (Lucide Menu icon)
- Full-screen overlay quando aberto
- Links grandes, touch-friendly (min-h-12)

### Cards de Projeto
```
- Background: bg-card (cinza escuro 12%)
- Border: border border-border (cinza 18%)
- Padding: p-6
- Rounded: rounded-lg
- Hover: sutil translação Y e border-color para azul petróleo
- Imagem: aspect-video, object-cover
- Título: text-xl font-semibold
- Categoria: Badge pequeno com bg-accent text-accent-foreground
```

### Botões
**Primary (Azul Petróleo):**
- bg-[hsl(195,85%,35%)] text-white
- hover:bg-[hsl(195,85%,45%)]
- Padding: px-8 py-3
- Rounded: rounded-md

**Ghost/Outline:**
- border border-border text-foreground
- hover:bg-accent hover:text-accent-foreground
- Mesmo padding

### Badges
- Pequenos: px-3 py-1 text-xs
- Rounded: rounded-full
- Background sutil: bg-accent/20 text-accent-foreground
- Para categorias: Gaming, Agricultura, Fotografia, Dev Pessoal

### Imagens
- Sempre object-cover
- Aspect ratios consistentes: aspect-video (16:9) ou aspect-square
- Rounded: rounded-lg
- Lazy loading

---

## Páginas

### Homepage
**Hero Section:**
- Full viewport height
- Fundo: gradient sutil de preto para cinza escuro
- Texto central:
  - Nome "SLX" em display (text-6xl md:text-8xl)
  - Tagline/frase que define você (text-xl md:text-2xl)
  - CTA sutil para scroll ou explorar

**Seção de Apresentação:**
- Grid de 4 áreas (Gaming, Agricultura, Fotografia, Dev Pessoal)
- Cards minimalistas com imagem de fundo, overlay escuro, título
- Hover revela descrição breve

**Links Rápidos:**
- Social media icons (Instagram, TikTok, YouTube) - discretos
- Tamanho: w-10 h-10
- Hover: scale sutil + cor azul petróleo

### Sobre
- Layout de coluna única
- Máximo width: max-w-3xl
- Texto justificado ou left-aligned
- Parágrafos com espaçamento generoso (space-y-6)
- Possível foto profile (circular, border azul petróleo)
- Texto direto, sem drama, profundo

### Conteúdo (Por Categoria)
- Filtros de categoria no topo (Tabs ou Buttons)
- Grid responsivo de projetos/conteúdos
  - Mobile: grid-cols-1
  - Tablet: grid-cols-2
  - Desktop: grid-cols-3
- Cada card mostra: imagem, título, descrição curta, link externo

### Projetos
- Lista de canais, iniciativas, trabalhos
- Cards maiores com mais informação
- Links para YouTube, TikTok, Instagram profiles específicos

### Contato
- Formulário simples: Nome, Email, Assunto, Mensagem
- Estilo minimalista: inputs com border sutil, bg transparente, focus:border azul petróleo
- Botão submit: Primary button
- Informações adicionais: email direto, redes sociais

---

## Interações & Animações

**Princípio:** Sutis, nunca exageradas

**Hover States:**
- Translação Y pequena: -2px a -4px
- Mudança de cor de border para azul petróleo
- Escala sutil em ícones: scale-110

**Transições:**
- duration-300 ease-in-out
- Todas as animações devem ser suaves

**Scroll Behavior:**
- Smooth scroll
- Possível parallax muito sutil no hero

---

## Responsividade

**Breakpoints:**
- Mobile: base (< 768px)
- Tablet: md (768px - 1024px)
- Desktop: lg (>= 1024px)

**Mobile-First:**
- Touch targets: min 44x44px
- Espaçamento maior entre elementos clicáveis
- Text sizes maiores em mobile para legibilidade
- Imagens otimizadas para mobile

---

## Acessibilidade

- Contraste WCAG AA mínimo
- Focus states visíveis (ring-2 ring-[hsl(195,85%,35%)])
- Alt text em todas as imagens
- Navegação por teclado funcional
- Aria labels onde necessário

---

## Exemplos de Inspiração Visual

Sites com estética similar:
- Estúdios de design minimalistas
- Portfólios de arquitetos
- Marcas de tecnologia premium (Apple, Vercel, Linear)
- **Gsap.com** (mencionado pelo usuário como inspiração)

**O que evitar:**
- Sites coloridos demais
- Animações exageradas
- Layout poluído
- Elementos infantis ou "divertidos"
- Gradientes vibrantes (apenas sutis preto→cinza)

---

## Notas Importantes

1. **Uma cor de acento apenas:** Azul petróleo. Usar com parcimônia.
2. **Espaço em branco é seu amigo:** Deixe o conteúdo respirar
3. **Tipografia é rei:** Com paleta limitada, hierarquia tipográfica é crucial
4. **Imagens de alta qualidade:** As fotos do usuário (fotografia, gaming) devem brilhar
5. **Performance:** Site deve carregar rápido, especialmente em mobile
6. **Sem bot interativo por enquanto:** Navegação clara e direta

---

## Identidade de Marca SLX

O site deve refletir:
- ✅ Estrategista de pensamento
- ✅ Criador de estilo próprio
- ✅ Perfil analítico
- ✅ Performance mental e disciplina
- ✅ Profundo, não superficial
- ✅ Autoridade silenciosa

**NÃO é:**
- ❌ Influencer divertido
- ❌ Criador de conteúdo genérico
- ❌ Motivador superficial
- ❌ Carismático de palco
