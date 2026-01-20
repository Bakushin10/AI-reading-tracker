import 'dotenv/config';
import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createMigrationsTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
}

async function getAppliedMigrations(): Promise<string[]> {
  const result = await db.query('SELECT filename FROM migrations ORDER BY id');
  return result.rows.map(row => row.filename);
}

async function applyMigration(filename: string) {
  const sqlPath = join(__dirname, filename);
  const sql = readFileSync(sqlPath, 'utf-8');

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Apply the migration
    await client.query(sql);

    // Record the migration
    await client.query(
      'INSERT INTO migrations (filename) VALUES ($1)',
      [filename]
    );

    await client.query('COMMIT');
    console.log(`✅ Applied migration: ${filename}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`❌ Failed to apply migration: ${filename}`, error);
    throw error;
  } finally {
    client.release();
  }
}

async function runMigrations() {
  try {
    console.log('🚀 Starting database migrations...');

    // Create migrations table
    await createMigrationsTable();

    // Get list of applied migrations
    const appliedMigrations = await getAppliedMigrations();

    // List of migration files (in order)
    const migrationFiles = [
      '001_create_books_table.sql'
    ];

    // Apply pending migrations
    for (const filename of migrationFiles) {
      if (!appliedMigrations.includes(filename)) {
        await applyMigration(filename);
      } else {
        console.log(`⏭️  Skipped (already applied): ${filename}`);
      }
    }

    console.log('✅ Database migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await db.end();
  }
}

// Run migrations
runMigrations();