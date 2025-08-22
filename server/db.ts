import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
const { Pool } = pg as any;
import * as schema from '@shared/schema';

export let db: ReturnType<typeof drizzle> | undefined;
if (process.env.DATABASE_URL) {
  const cs = process.env.DATABASE_URL;
  const isSupabase = /supabase\.co|supabase\.com/.test(cs);
  // Supabase pooler sometimes needs explicit ssl disable cert validation in some environments
  const pool = new Pool({
    connectionString: cs,
    ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
  });
  pool.on('error', (e: any) => {
    console.error('[db] pool error', e);
  });
  console.log('[startup] initializing db pool', { isSupabase, withSSL: !!(isSupabase) });
  db = drizzle(pool, { schema });
} else {
  // eslint-disable-next-line no-console
  console.warn('[startup] DATABASE_URL not set – DB features disabled');
}
export { schema };
