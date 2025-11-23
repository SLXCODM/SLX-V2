import { 
  type Project, 
  type InsertProject,
  type Contact,
  type InsertContact,
  type AboutContent,
  type InsertAboutContent,
  type WeaponLike
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
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private contacts: Map<string, Contact>;
  private aboutContent: AboutContent | undefined;
  private weaponLikes: Map<string, number>;

  constructor() {
    this.projects = new Map();
    this.contacts = new Map();
    this.aboutContent = undefined;
    this.weaponLikes = new Map();
    
    // Initialize with mock data
    this.initializeMockData();
    this.initializeAboutContent();
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
        title: "Agricultura Sustentável",
        category: "agriculture",
        description: "Meu trabalho no campo e conexão com a natureza",
        imageUrl: "/attached_assets/setup1.jpg",
        externalUrl: "https://youtube.com/@slx-agricultura",
        featured: false,
        order: "5",
      },
      {
        id: "proj-dev-1",
        title: "Desenvolvimento Pessoal",
        category: "development",
        description: "Reflexões sobre psicologia, filosofia e autoconhecimento",
        imageUrl: "/attached_assets/setup2.jpg",
        externalUrl: "https://tiktok.com/@slx",
        featured: false,
        order: "6",
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
      content: `Uma breve descrição do que você pode gostar de saber sobre este nictófilo:

À primeira vista, este texto pode parecer desnecessário, mas recentemente, tenho refletido sobre meu passado, percebendo que durante toda a minha infância, pensamentos de suicídio me consumiam.

Praticamente 7 anos se passaram desde que percebi que meu mundo estava desmoronando. Em toda a minha vida ou praticamente toda a minha infância, todos os dias de todos os meses de todos os anos... Como eu era apenas um adolescente, não percebi o que estava acontecendo.

Depois de um tempo solitário, acabei me apaixonando por alguém. Consegui me apaixonar, e como acontece com quase todas as pessoas, esse amor me destruiu. Mas isso foi bom; me fez uma pessoa não dependente emocionalmente.

Por que SLX?

Com 6 dias restantes para cometer o ato que esperei minha vida toda, minha vida passou por mudanças profundas, coisas inexplicáveis aconteceram e finalmente, pela primeira vez, senti o desejo de viver... Finalmente um momento sem ansiedade, apenas a emoção de ser um ser humano feliz.

A partir de então, prometi a mim mesmo que mudaria o rumo da minha vida, seria alguém importante, pelo menos para mim. Não posso dizer que me senti curado depois daquele dia, mas de alguma forma uma faísca se acendeu em uma janela de luz de pensamento que me fez lembrar quem sou e a importância de ser eu mesmo.

SLX foi um nome apenas para não deixar claro que o significado é seis, para mostrar que não queria expor o que aconteceu comigo, eu era apenas uma das milhares de crianças que passaram toda a vida com depressão, e piorando a cada dia que passava.

Minha mensagem:

Meu objetivo com este texto (caso alguém leia um dia) é apenas mostrar que não é o fim, a depressão pode ser curada e se você precisar de ajuda, não faça como eu mantendo para mim mesmo, vá e procure ajuda porque os sintomas vão piorar a cada dia que passa e você ignora isso.

Para SLX, peça ajuda.

Se você leu até aqui, você é uma pessoa rara. Por favor, certifique-se de me avisar: slowedbase@gmail.com

Como está o SLX hoje em dia?

Bem, eu... não consigo pensar direito, não consigo falar muito, meu trabalho me cansa e me sinto pior a cada dia por essa razão... Estou aproveitando o tempo que me resta para conhecer pessoas e me divertir um pouco em um jogo estranho...`,
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
}

export const storage = new MemStorage();
