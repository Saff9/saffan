import { neon } from '@neondatabase/serverless';

/**
 * Returns a Neon SQL query executor if DATABASE_URL is configured in .env.
 * Returns null if DATABASE_URL is not set, enabling graceful fallback to local storage.
 */
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || databaseUrl.trim() === '' || databaseUrl.includes('your_neon_database_url_here')) {
    return null;
  }
  return neon(databaseUrl);
}

export interface DbPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  published_at: string;
  tags: string[];
  read_time: string;
}

export interface DbInquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

/**
 * Initialize Neon DB schema if tables do not exist
 */
export async function initDbSchema(): Promise<boolean> {
  const sql = getDb();
  if (!sql) return false;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id VARCHAR(64) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        tags TEXT[] DEFAULT ARRAY[]::TEXT[],
        read_time VARCHAR(32) DEFAULT '5 min read'
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return true;
  } catch (err) {
    console.error('Failed to initialize Neon DB schema:', err);
    return false;
  }
}
