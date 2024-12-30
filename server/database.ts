import { createPool, Pool } from 'mysql2/promise';

export class Database {
  private static pool: Pool;

  public static init() {
    Database.pool = createPool({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'cars_db',
    });
  }

  public static async executeQuery(query: string, params: any[] = []) {
    const [rows] = await Database.pool.execute(query, params);
    return rows;
  }
}

Database.init();
