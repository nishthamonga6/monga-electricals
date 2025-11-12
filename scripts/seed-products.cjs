require('dotenv').config();
const { MongoClient } = require('mongodb');

const PRODUCTS = [
  { name: 'Product 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpsERNgh3n3He0HuB2ylMwTLorRKbK4y344CB9Yom19LiFjjm', price: 0, desc: '' },
  { name: 'Product 2', image: 'https://5.imimg.com/data5/SELLER/Default/2024/9/448532834/HG/TI/WO/81144813/55-500x500.jpg', price: 0, desc: '' },
  { name: 'Product 3', image: 'https://productimages.withfloats.com/tile/68cc0736cd0e8f5d490473c2.jpeg', price: 0, desc: '' },
  { name: 'Product 4', image: 'https://www.bestomart.com/cdn/shop/files/1000136467-2_grande.jpg?v=1736241787', price: 0, desc: '' },
  { name: 'Product 5', image: 'https://rukminim2.flixcart.com/image/300/300/xif0q/water-geyser/m/h/a/2024-aqua-therm-3000-lazer-5-5-original-imah6xef565evbjq.jpeg', price: 0, desc: '' },
  { name: 'Product 6', image: 'https://cdn.moglix.com/p/ci1D4WIvAKbjx-xxlarge.jpg', price: 0, desc: '' },
  { name: 'Product 7', image: 'https://rukminim2.flixcart.com/image/480/640/l3hmwsw0/room-heater/u/q/g/hot-waves-lazer-2000-original-imagehzggekzq6nb.jpeg?q=20', price: 0, desc: '' },
  { name: 'Product 8', image: 'https://5.imimg.com/data5/SELLER/Default/2025/7/528076508/LF/UY/ZF/247216349/commercial-ro-plant.jpg', price: 0, desc: '' },
  { name: 'Product 9', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRk9CTE2vz3c2CVk8XSJMVTAc9kPg5BouG8I5exm4Cs-xkXwxJM', price: 0, desc: '' },
  { name: 'Product 10', image: 'https://rukminim2.flixcart.com/image/480/640/kw3v0cw0/water-geyser/b/w/y/2021-cdr-dlx-vertical-water-heater-25-liter-2000-racold-25-original-imag8usdf6qsguh6.jpeg?q=90', price: 0, desc: '' },
  { name: 'Product 11', image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/water-purifier/i/n/i/bliss-model-with-premium-led-display-suitable-for-home-office-original-imahdqwpqjczysz4.jpeg?q=90', price: 0, desc: '' },
  { name: 'Product 12', image: 'https://content.jdmagicbox.com/v2/comp/amritsar/l8/0183px183.x183.200312131120.s8l8/catalogue/sandhu-enterprises-amritsar-gpo-amritsar-water-purifier-repair-and-services-pureit-2d7wlyd2st-250.jpg', price: 0, desc: '' },
  { name: 'Product 13', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR5DZDvNDSzKwiRM0mgIde_4knNT1O_IOPXTVrSlveE1mlLd_y1ULYoQ4eL-yPkpgQm_-1UZAGkdR60rxgAl9mrMtVtR5KM0P0K3ZddvysuySc-FTZJerjYLrk', price: 0, desc: '' },
  { name: 'Product 14', image: 'https://5.imimg.com/data5/SELLER/Default/2025/4/500418803/TQ/UT/JM/109955577/sunexa-25-lph-ro-plant-500x500.jpg', price: 0, desc: '' },
  { name: 'Product 15', image: 'https://lazerindia.com/wp-content/uploads/2024/08/Latest-Watre-Heater-1024x1024.jpg', price: 0, desc: '' },
  { name: 'Product 16', image: 'https://images-eu.ssl-images-amazon.com/images/I/71jqL1lY4sL._AC_UL495_SR435,495_.jpg', price: 0, desc: '' },
  { name: 'Product 17', image: 'https://aqua1.in/wp-content/uploads/2024/04/web-pic-2-250x250.jpg', price: 0, desc: '' },
  { name: 'Product 18', image: 'https://m.media-amazon.com/images/I/41EacWgvP1L._AC_UF350,350_QL50_.jpg', price: 0, desc: '' },
  { name: 'Product 19', image: 'https://5.imimg.com/data5/SELLER/Default/2025/10/551648476/PT/JW/AB/51768864/bink-1.jpg', price: 0, desc: '' },
  { name: 'Product 20', image: 'https://www.indiamart.com/proddetail/industrial-ro-system-2855121293391.html', price: 0, desc: '' },
  { name: 'Product 21', image: 'https://aquaro.in/wp-content/uploads/2025/09/olix-golden.png', price: 0, desc: '' },
  { name: 'Product 22', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7hdoBNXjE7Bh5vumXoPyhHNJMOZotxO3gIPqL4c8r573KMPgy', price: 0, desc: '' },
  { name: 'Product 23', image: 'https://5.imimg.com/data5/SELLER/Default/2025/8/536475711/EE/FH/EU/8295197/electric-water-heater-500x500.jpg', price: 0, desc: '' },
  { name: 'Product 24', image: 'https://images-eu.ssl-images-amazon.com/images/I/51RlfUI3+oL._AC_UL210_SR210,210_.jpg', price: 0, desc: '' },
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if(!uri) { console.error('MONGODB_URI not set'); process.exit(2); }
  const client = new MongoClient(uri);
  try{
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || 'MONGA_ELECTRICALS');
    const col = db.collection('products');
    const count = await col.countDocuments();
    if(count === 0) {
      await col.insertMany(PRODUCTS.map(p=>({ ...p, createdAt: new Date() })));
      console.log('Seeded products');
    } else {
      console.log('Products collection already has documents:', count);
    }
  }catch(err){ console.error('seed error', err); process.exit(2); }
  finally{ await client.close(); }
}

main();
