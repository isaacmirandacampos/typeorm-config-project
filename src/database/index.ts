import { createConnection, getConnectionOptions } from 'typeorm';

import 'reflect-metadata';
import 'dotenv/config';

class Database {
  constructor() {
    this.sqlDB();
  }

  private async sqlDB(): Promise<void> {
    const defaultOptions = await getConnectionOptions();
    createConnection(defaultOptions);
  }
}

export default new Database();
