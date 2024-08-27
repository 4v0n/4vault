declare module 'mongodb-memory-server' {
    import { MongoClient } from 'mongodb';
  
    export class MongoMemoryServer {
      constructor(options?: any);
  
      getUri(): Promise<string>;
      stop(): Promise<void>;
      getDb(): Promise<MongoClient>;
    }
  }