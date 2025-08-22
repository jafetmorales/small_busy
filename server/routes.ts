import type { Express, NextFunction } from "express";
import { createServer, type Server } from "http";
import type { Request, Response } from 'express';
import 'dotenv/config';
import { db } from './db';
import { profiles } from '@shared/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

interface SupabaseJWT {
  sub: string; // user id
  email?: string;
  [k: string]: any;
}

// Middleware to verify Supabase JWT from Authorization header
function requireAuth(req: Request & { userId?: string }, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ message: 'missing bearer token' });
  const token = auth.slice('Bearer '.length);
  try {
    const secret = process.env.SUPABASE_JWT_SECRET;
    if (!secret) return res.status(500).json({ message: 'server missing jwt secret' });
    const payload = jwt.verify(token, secret) as SupabaseJWT;
    req.userId = payload.sub;
    next();
  } catch (e: any) {
    return res.status(401).json({ message: 'invalid token' });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api
  // Health endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  // Get current profile (name)
  app.get('/api/profile', requireAuth, async (req: Request & { userId?: string }, res: Response) => {
    const userId = req.userId!;
    if (!db) return res.status(503).json({ message: 'db unavailable' });
    const start = Date.now();
    try {
      const rows = await db.select().from(profiles).where(eq(profiles.id, userId)).limit(1);
      const profile = rows[0] || { id: userId, name: null };
      console.log('[profile] fetch', { userId, ms: Date.now() - start });
      res.json(profile);
    } catch (e) {
      console.error('[profile] fetch error', e);
      res.status(500).json({ message: 'internal error' });
    }
  });

  // Upsert profile name
  app.post('/api/profile', requireAuth, async (req: Request & { userId?: string }, res: Response) => {
    const userId = req.userId!;
    const { name } = req.body || {};
    if (typeof name !== 'string' || !name.trim()) return res.status(400).json({ message: 'name required' });
    // Try update then insert if missing
    if (!db) return res.status(503).json({ message: 'db unavailable' });
    const start = Date.now();
    try {
      const updated = await db.update(profiles).set({ name }).where(eq(profiles.id, userId)).returning();
      let row = updated[0];
      if (!row) {
        const inserted = await db.insert(profiles).values({ id: userId, name }).returning();
        row = inserted[0];
      }
      console.log('[profile] upsert', { userId, ms: Date.now() - start });
      res.json(row);
    } catch (e) {
      console.error('[profile] upsert error', e);
      res.status(500).json({ message: 'internal error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
