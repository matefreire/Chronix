import { CapacitorSQLite } from '@capacitor-community/sqlite';

interface DatabaseConnection {
  open(): Promise<void>;
  execute(sql: string): Promise<unknown>;
}

let db: DatabaseConnection | null = null;

export async function useDatabase() {
  if (!db) {
    const sqlite = CapacitorSQLite;
    const ret = await sqlite.createConnection({
      database: 'chronix.db',
      version: 1,
      encrypted: false,
      mode: 'no-encryption',
    });
    db = ret as unknown as DatabaseConnection;
    await db.open();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done INTEGER DEFAULT 0
      );
    `);
  }
  return db;
}
