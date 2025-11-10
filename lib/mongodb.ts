import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
if (!uri) {
  // We'll allow the app to run without a DB in dev, but API routes will error clearly.
  console.warn('MONGODB_URI not set — database operations will fail until provided.');
}

let cached: { client: MongoClient | null } = (global as any)._mongoClientCache || { client: null };
if (!cached.client) {
  cached.client = uri ? new MongoClient(uri) : null;
  (global as any)._mongoClientCache = cached;
}

export async function getMongoClient() {
  if (!cached.client) throw new Error('MongoDB client not configured (MONGODB_URI missing)');
  // Ensure the client is connected. connect() is idempotent in the official driver.
  await cached.client.connect();
  return cached.client;
}

export async function getDatabase(dbName?: string) {
  const client = await getMongoClient();
  const name = dbName || process.env.MONGODB_DB || (() => {
    // try to parse DB from URI if present (mongodb://host:port/dbname)
    try {
      const m = (process.env.MONGODB_URI || '').match(/\/([A-Za-z0-9_-]+)(?:\?|$)/);
      return m ? m[1] : 'MONGA_ELECTRICALS';
    } catch (e) {
      return 'MONGA_ELECTRICALS';
    }
  })();
  return client.db(name);
}
