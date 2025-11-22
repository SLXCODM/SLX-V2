// Simple in-memory rate limiter for contact form spam prevention
// In production, use Redis-backed rate limiting

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 3) {
    this.windowMs = windowMs; // 1 minute default
    this.maxRequests = maxRequests; // 3 requests per minute default
    
    // Cleanup old entries every 5 minutes
    setInterval(() => this.cleanup(), 300000);
  }

  check(identifier: string): boolean {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry || now > entry.resetTime) {
      // New window
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    if (entry.count >= this.maxRequests) {
      return false; // Rate limit exceeded
    }

    entry.count++;
    return true;
  }

  private cleanup() {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.requests.forEach((entry, key) => {
      if (now > entry.resetTime) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.requests.delete(key));
  }
}

// Contact form rate limiter: 3 requests per minute per IP
export const contactRateLimiter = new RateLimiter(60000, 3);
