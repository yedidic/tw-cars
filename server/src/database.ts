import { config, ConnectionPool, Request } from 'mssql';

export interface SQLParam {
  name: string;
  type: any;
  value: any;
}

export class Database {
  private static pool: ConnectionPool;

  /**
   * Initialize the database connection pool
   */

  public static async init(retryCount: number = 0): Promise<void> {
    try {
      const env = process.env;
      const sqlConfig: config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        server: process.env.DB_HOST || 'db',
        pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 30000,
        },
        options: {
          trustServerCertificate: process.env.TRUST_SERVER_CERT === '1', // True for local dev / self-signed certs
        },
      };
      this.pool = await new ConnectionPool(sqlConfig).connect();
      console.log('Connection Successful!');
    } catch (err) {
      console.error('Error connecting to the database:', err);
      if (retryCount < 100) {
        console.log('Retrying in 60 seconds.', 'retry number:', retryCount + 1);
        await new Promise((res) => setTimeout(res, 60000));
        this.init(retryCount + 1);
      }
    }
  }

  /**
   * Execute a query with optional parameters
   * @param query SQL query string
   * @param params Optional parameters array
   * @returns Query result
   */
  public static async executeQuery(
    query: string,
    params: SQLParam[] = [],
  ): Promise<any> {
    if (!this.pool) {
      throw new Error('Database not initialized. Call Database.init() first.');
    }

    const request: Request = this.pool.request();

    // Add parameters to the request
    params.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    try {
      const result = await request.query(query);
      return result.recordset; // Return rows
    } catch (err) {
      console.error('Error executing query:', err);
      throw err;
    }
  }

  /**
   * Execute a stored procedure with optional parameters
   * @param procedureName Stored procedure name
   * @param params Optional parameters array
   * @returns Procedure result
   */
  public static async executeProcedure(
    procedureName: string,
    params: SQLParam[] = [],
  ): Promise<any> {
    if (!this.pool) {
      throw new Error('Database not initialized. Call Database.init() first.');
    }

    const request: Request = this.pool.request();

    // Add parameters to the request
    params.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    try {
      const result = await request.execute(procedureName);
      return result.recordset; // Return rows
    } catch (err) {
      console.error('Error executing procedure:', err);
      throw err;
    }
  }
}
