import { 
  type Project, 
  type InsertProject,
  type Contact,
  type InsertContact,
  type AboutContent,
  type InsertAboutContent,
  type WeaponLike,
  type Product,
  type InsertProduct
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  // Contacts (write-only until auth implemented)
  createContact(contact: InsertContact): Promise<Contact>;
  // Note: getContacts() removed from interface - should only be exposed via authenticated admin endpoint
  
  // About Content
  getAboutContent(): Promise<AboutContent | undefined>;
  updateAboutContent(content: InsertAboutContent): Promise<AboutContent>;

  // Weapon Likes
  getWeaponLikes(weaponId: string): Promise<number>;
  getAllWeaponLikes(): Promise<WeaponLike[]>;
  incrementWeaponLikes(weaponId: string): Promise<number>;
  decrementWeaponLikes(weaponId: string): Promise<number>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private contacts: Map<string, Contact>;
  private aboutContent: AboutContent | undefined;
  private weaponLikes: Map<string, number>;
  private products: Map<string, Product>;

  constructor() {
    this.projects = new Map();
    this.contacts = new Map();
    this.aboutContent = undefined;
    this.weaponLikes = new Map();
    this.products = new Map();
    
    // Initialize with mock data
    this.initializeMockData();
    this.initializeAboutContent();
    this.initializeProducts();
  }

  private initializeMockData() {
    // Use fixed IDs to prevent re-shuffling on server restart
    const mockProjects: Array<InsertProject & { id: string }> = [
      {
        id: "proj-gaming-0",
        title: "Classes",
        category: "gaming",
        description: "Classes de armas profissionais do SLX",
        imageUrl: "/attached_assets/generated_images/weapon_icon_gaming_classes_button.png",
        externalUrl: "/classes",
        featured: true,
        order: "0",
      },
      {
        id: "proj-gaming-1",
        title: "Meus Tutoriais Exclusivos",
        category: "gaming",
        description: "Conteúdo exclusivo para melhorar sua gameplay",
        imageUrl: "/attached_assets/generated_images/notebook_icon_tutorials_button_background.png",
        externalUrl: JSON.stringify({
          isLocked: true,
          links: [
            { label: "TikTok", url: "https://www.tiktok.com/@slxcodm_/collection/Dicas%20e%20tutoriais-7505787344423766790?is_from_webapp=1&sender_device=pc" },
            { label: "YouTube", url: "https://youtube.com/playlist?list=PLNjPit_9myAFBhDzh635QGPgzukbXRYLg&si=Yiq6MVgx8GJG0Fq8" }
          ]
        }),
        featured: true,
        order: "1",
      },
      {
        id: "proj-gaming-2",
        title: "Minhas configurações",
        category: "gaming",
        description: "As melhores configurações do jogo",
        imageUrl: "/attached_assets/generated_images/gear_icon_settings_button_background.png",
        externalUrl: JSON.stringify({
          isLocked: true,
          links: [
            { label: "TikTok", url: "https://www.tiktok.com/@slxcodm_/collection/Configs,%20loadouts,%20sensi%20etc-7510645794769668869?is_from_webapp=1&sender_device=pc" },
            { label: "YouTube", url: "https://youtube.com/playlist?list=PLNjPit_9myAFwYgp2zNBJs6EzzZ-qs839&si=2mEzeWonPFB5Leen" }
          ]
        }),
        featured: true,
        order: "2",
      },
      {
        id: "proj-gaming-3",
        title: "Handcam",
        category: "gaming",
        description: "Handcam do SLX",
        imageUrl: "/attached_assets/generated_images/smartphone_icon_handcam_button_background.png",
        externalUrl: JSON.stringify({
          isLocked: true,
          links: [
            { label: "TikTok", url: "https://www.tiktok.com/@slxcodm_" },
            { label: "YouTube", url: "https://www.youtube.com/@SLXCODM" }
          ]
        }),
        featured: true,
        order: "3",
      },
      {
        id: "proj-photo-1",
        title: "Fotografia de Paisagens",
        category: "photography",
        description: "Explorando a melancolia através de paisagens naturais e urbanas",
        imageUrl: "/attached_assets/1000004347.jpg",
        externalUrl: "https://instagram.com/slx",
        featured: false,
        order: "3",
      },
      {
        id: "proj-photo-2",
        title: "Retratos Minimalistas",
        category: "photography",
        description: "Capturando essências através da simplicidade e contraste",
        imageUrl: "/attached_assets/1000004348.jpg",
        externalUrl: "https://instagram.com/slx",
        featured: false,
        order: "4",
      },
      {
        id: "proj-agri-1",
        title: "Acompanhe meu trabalho rural",
        category: "agriculture",
        description: "Vem ver a experiencia de morar no campo, trago videos sobre o meu trabalho aqui",
        imageUrl: "/attached_assets/photo-rural-harvest.jpg",
        externalUrl: "https://www.youtube.com/@SLNXofc",
        featured: false,
        order: "5",
      },
    ];

    mockProjects.forEach(project => {
      const fullProject: Project = {
        ...project,
        imageUrl: project.imageUrl || null,
        externalUrl: project.externalUrl || null,
        featured: project.featured ?? false,
        order: project.order || "0",
      };
      this.projects.set(project.id, fullProject);
    });
  }

  private initializeAboutContent() {
    // Initialize with default about content (plain text - safe from XSS)
    this.aboutContent = {
      id: "about-content-default",
      content: `SLX é um criador de conteúdo e pensador independente que trabalha com jogos, filosofia prática e desenvolvimento mental. Identificado com altas habilidades cognitivas (superdotação), desenvolveu desde cedo uma percepção aguçada de padrões de comportamento, tomada de decisão e controle emocional.

Fora do ambiente digital, mantém uma rotina física e mentalmente exigente. Mora no interior do Rio Grande do Sul, onde trabalha com atividades rurais, o que construiu uma base sólida de disciplina, resistência mental e convivência com o silêncio e o isolamento. Esse contraste entre o trabalho físico e o ambiente digital moldou seu estilo de pensamento: prático, direto e pouco influenciado por tendências superficiais.

Sua rotina inclui treinos, estudo contínuo e períodos prolongados de introspecção. Estuda por interesse próprio áreas como neurociência, psicologia, filosofia e comportamento humano, utilizando o conhecimento como ferramenta para compreender a si mesmo e a realidade ao seu redor.

Seu trabalho não se baseia em entretenimento vazio, mas em estratégia, mentalidade e construção de identidade própria. Prefere manter sua vida pessoal distante de romantizações e de exposição excessiva. Sua identidade não é construída para agradar públicos, mas como uma extensão natural do que vive diariamente. Seus projetos são guiados por autonomia, autenticidade e pela necessidade de construir algo sólido no longo prazo.

Desde criança, a tristeza, a depressão profunda e a solidão emocional e cognitiva moldaram sua forma de enxergar a realidade. Com uma mente acelerada, encontrou no caos uma forma de organizar pensamentos, regular emoções e lidar com a ansiedade, o estresse diário é o que dá sentido a vida.

Por que SLX?

SLX vem de six (seis em inglês), desde criança vivi com planejamento de acabar com a minha vida aos 18 anos, mas 6 dias antes de cometer, coisas inexplicáveis aconteceram comigo e que mudaram minha visão sobre eu mesmo, hoje em dia ainda luto diariamente contra esse desejo, mas deixo escondido porque não quero mostrar para ninguém minha dor, minha forma de camuflar isso foi escrevendo SLX ao invés de six.

Minha mensagem:

Meu objetivo com este texto (caso alguém leia um dia) é apenas mostrar que não é o fim, a depressão pode ser curada e se você precisar de ajuda, não faça como eu mantendo para mim mesmo, vá e procure ajuda porque os sintomas vão piorar a cada dia que passa que você ignora isso.

Você pode entrar em contato comigo para conversar caso você esteja passando por problemas difíceis, acesse a aba de redes sociais.

slowedbase@gmail.com`,
      lastUpdated: new Date(),
    };
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      (a.order || "0").localeCompare(b.order || "0")
    );
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(p => p.category === category)
      .sort((a, b) => (a.order || "0").localeCompare(b.order || "0"));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      imageUrl: insertProject.imageUrl || null,
      externalUrl: insertProject.externalUrl || null,
      featured: insertProject.featured ?? false,
      order: insertProject.order || "0",
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updated: Project = { ...project, ...updates };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Contacts
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Private method - not exposed in IStorage interface
  // Only for future admin use with proper authentication
  private async getContactsInternal(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // About Content
  async getAboutContent(): Promise<AboutContent | undefined> {
    return this.aboutContent;
  }

  async updateAboutContent(insertContent: InsertAboutContent): Promise<AboutContent> {
    const id = this.aboutContent?.id || randomUUID();
    const content: AboutContent = {
      ...insertContent,
      id,
      lastUpdated: new Date(),
    };
    this.aboutContent = content;
    return content;
  }

  // Weapon Likes
  async getWeaponLikes(weaponId: string): Promise<number> {
    return this.weaponLikes.get(weaponId) || 0;
  }

  async getAllWeaponLikes(): Promise<WeaponLike[]> {
    const likes: WeaponLike[] = [];
    this.weaponLikes.forEach((likeCount, weaponId) => {
      if (likeCount > 0) {
        likes.push({ weaponId, likes: likeCount });
      }
    });
    return likes;
  }

  async incrementWeaponLikes(weaponId: string): Promise<number> {
    const current = this.weaponLikes.get(weaponId) || 0;
    const updated = current + 1;
    this.weaponLikes.set(weaponId, updated);
    return updated;
  }

  async decrementWeaponLikes(weaponId: string): Promise<number> {
    const current = this.weaponLikes.get(weaponId) || 0;
    const updated = Math.max(0, current - 1);
    this.weaponLikes.set(weaponId, updated);
    return updated;
  }

  private initializeProducts() {
    const mockProducts: Array<InsertProduct & { id: string }> = [
      {
        id: "prod-1",
        name: "Curso: Domínio de Sniper no CODM",
        description: "Guia completo sobre técnicas avançadas de sniper, posicionamento e clutches em Call of Duty Mobile",
        price: "4999", // R$ 49,99
        imageUrl: null,
        category: "course",
        featured: true,
        active: true,
        order: "0",
      },
      {
        id: "prod-2",
        name: "Curso: Loadouts Competitivos 2024",
        description: "Configurações otimizadas para ranked, análise de metas, builds e estratégias competitivas",
        price: "4999", // R$ 49,99
        imageUrl: null,
        category: "course",
        featured: true,
        active: true,
        order: "1",
      },
      {
        id: "prod-3",
        name: "Mentorias de Gameplay Privadas",
        description: "Sessões 1:1 de mentoria focadas em melhorar sua gameplay, decision-making e controle mental",
        price: "19999", // R$ 199,99
        imageUrl: null,
        category: "service",
        featured: false,
        active: true,
        order: "2",
      },
      {
        id: "prod-4",
        name: "Links de Afiliados - Streamers & Creators",
        description: "Conteúdo técnico através de links de afiliados com criadores de conteúdo CODM certificados",
        price: "0", // Gratuito com comissão
        imageUrl: null,
        category: "affiliate",
        featured: false,
        active: true,
        order: "3",
      },
    ];

    mockProducts.forEach(product => {
      const fullProduct: Product = {
        ...product,
        stripeProductId: null,
        stripePriceId: null,
        createdAt: new Date(),
      };
      this.products.set(product.id, fullProduct);
    });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(p => p.active)
      .sort((a, b) => (a.order || "0").localeCompare(b.order || "0"));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id,
      stripeProductId: null,
      stripePriceId: null,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updated: Product = { ...product, ...updates };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }
}

export const storage = new MemStorage();
