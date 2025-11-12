// CommonJS MongoDB connection test script
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config({ path: '.env.local' });

async function main() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || undefined;

  if (!uri) {
    console.error('MONGODB_URI not set in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('orders_connection_test');
    const doc = { test: 'connection-check', ts: new Date() };
    const res = await col.insertOne(doc);
    console.log('OK: insertedId=' + res.insertedId.toString());

    const last = await col.find().sort({ ts: -1 }).limit(1).toArray();
    if (last && last.length) {
      console.log('Last doc id (from DB):', last[0]._id.toString());
    }

    await client.close();
    process.exit(0);
  } catch (err) {
    console.error('ERROR connecting/inserting to MongoDB:', err && err.message ? err.message : err);
    try { await client.close(); } catch (e) {}
    process.exit(2);
  }
}

main();
