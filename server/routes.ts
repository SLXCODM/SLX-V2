import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertContactSchema, insertProductSchema, projectCategories } from "@shared/schema";
import { contactRateLimiter } from "./rate-limiter";
import { sendContactEmail, sendSponsorshipEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Projects Routes
  
  // GET /api/projects - Get all projects
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // GET /api/projects/:category - Get projects by category
  app.get("/api/projects/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const projects = await storage.getProjectsByCategory(category);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects by category" });
    }
  });

  // GET /api/projects/:id - Get single project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // POST /api/projects - Create new project
  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Invalid project data" });
      }
    }
  });

  // PATCH /api/projects/:id - Update project
  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate partial update with schema
      const partialSchema = insertProjectSchema.partial();
      const validatedUpdates = partialSchema.parse(req.body);
      
      const project = await storage.updateProject(id, validatedUpdates);
      
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Failed to update project" });
      }
    }
  });

  // DELETE /api/projects/:id - Delete project
  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProject(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Contact Route
  
  // POST /api/contact - Submit contact form (rate limited)
  app.post("/api/contact", async (req, res) => {
    try {
      // Rate limiting check (by IP)
      const clientIp = req.ip || req.socket.remoteAddress || "unknown";
      if (!contactRateLimiter.check(clientIp)) {
        return res.status(429).json({ 
          error: "Too many requests",
          message: "Por favor, aguarde antes de enviar outra mensagem. Limite: 3 mensagens por minuto."
        });
      }

      const validatedData = insertContactSchema.parse(req.body);
      
      // Honeypot anti-spam check
      if (validatedData.honeypot) {
        return res.status(400).json({ error: "Invalid submission" });
      }
      
      // Remove honeypot field before storing
      const { honeypot, ...contactData } = validatedData;
      
      const contact = await storage.createContact(contactData);
      
      // Send emails
      try {
        await sendContactEmail(contactData);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the request if email fails - contact is still saved
      }
      
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        id: contact.id 
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Invalid contact data" });
      }
    }
  });

  // About Content Routes
  
  // GET /api/about - Get about content
  app.get("/api/about", async (_req, res) => {
    try {
      const content = await storage.getAboutContent();
      
      if (!content) {
        return res.status(503).json({ 
          error: "Content temporarily unavailable",
          message: "About content is being updated. Please try again later."
        });
      }
      
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch about content" });
    }
  });

  // Note: GET /api/contacts endpoint removed - requires authentication system
  // Will be re-added when auth layer is implemented

  // Weapon Likes Routes

  // GET /api/weapon-likes - Get all weapon likes
  app.get("/api/weapon-likes", async (_req, res) => {
    try {
      const likes = await storage.getAllWeaponLikes();
      res.json(likes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weapon likes" });
    }
  });

  // GET /api/weapon-likes/:weaponId - Get likes for specific weapon
  app.get("/api/weapon-likes/:weaponId", async (req, res) => {
    try {
      const { weaponId } = req.params;
      const likes = await storage.getWeaponLikes(weaponId);
      res.json({ weaponId, likes });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weapon likes" });
    }
  });

  // POST /api/weapon-likes/:weaponId/like - Increment likes
  app.post("/api/weapon-likes/:weaponId/like", async (req, res) => {
    try {
      const { weaponId } = req.params;
      const likes = await storage.incrementWeaponLikes(weaponId);
      res.json({ weaponId, likes });
    } catch (error) {
      res.status(500).json({ error: "Failed to update weapon likes" });
    }
  });

  // POST /api/weapon-likes/:weaponId/unlike - Decrement likes
  app.post("/api/weapon-likes/:weaponId/unlike", async (req, res) => {
    try {
      const { weaponId } = req.params;
      const likes = await storage.decrementWeaponLikes(weaponId);
      res.json({ weaponId, likes });
    } catch (error) {
      res.status(500).json({ error: "Failed to update weapon likes" });
    }
  });

  // Products Routes
  
  // GET /api/products - Get all products
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // GET /api/products/:id - Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // POST /api/products - Create new product
  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Invalid product data" });
      }
    }
  });

  // PATCH /api/products/:id - Update product
  app.patch("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const partialSchema = insertProductSchema.partial();
      const validatedUpdates = partialSchema.parse(req.body);
      
      const product = await storage.updateProduct(id, validatedUpdates);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Failed to update product" });
      }
    }
  });

  // DELETE /api/products/:id - Delete product
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
