require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const Product = require('../src/models/Product');

async function run() {
  const MONGODB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/monga-shop';
  await mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('connected');

  // create admin user if not exists
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPass = process.env.ADMIN_PASSWORD || 'password123';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const hashed = await bcrypt.hash(adminPass, 10);
    admin = await User.create({ name: 'Admin', email: adminEmail, password: hashed, role: 'admin' });
    console.log('created admin', adminEmail);
  } else {
    console.log('admin exists');
  }

  const sample = [
    { name: 'Ceiling Fan 1200mm', price: 2499, desc: 'High-efficiency fan', brand: 'orient' },
    { name: 'Inverter 850VA', price: 8999, desc: 'Reliable power backup', brand: 'microtek' },
    { name: 'RO Water Filter', price: 12999, desc: 'Advanced filtration', brand: 'livpure' },
  ];

  for (const s of sample) {
    const exists = await Product.findOne({ name: s.name });
    if (!exists) await Product.create(s);
  }
  console.log('seeded products');
    // Seed script disabled — backend removed.
    console.log('Seed script disabled: backend removed');
    process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
