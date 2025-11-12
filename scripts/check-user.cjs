require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI;
  if(!uri) { console.error('MONGODB_URI not set in .env.local'); process.exit(2); }
  const email = process.argv[2];
  if(!email) { console.error('Usage: node check-user.cjs <email>'); process.exit(2); }

  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try{
    await client.connect();
    const dbName = process.env.MONGODB_DB || 'MONGA_ELECTRICALS';
    const db = client.db(dbName);
    const users = db.collection('users');
    const u = await users.findOne({ email: email.toLowerCase() });
    console.log('Found user:', u);
  }catch(err){
    console.error('check-user error', err);
    process.exit(2);
  }finally{
    await client.close();
  }
}

main();
