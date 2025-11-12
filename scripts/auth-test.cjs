require('dotenv').config();
const fetch = global.fetch || require('node-fetch');

const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

(async ()=>{
  const timestamp = Date.now();
  const email = `test+${timestamp}@example.com`;
  const password = 'Password123!';
  const name = 'Automated Test';

  console.log('Waiting for local server to be available...');
  // wait for server to respond
  let ready = false;
  for(let i=0;i<20;i++){
    try{
      const r = await fetch(`${base}/api/health`).catch(()=>null);
      if(r && (r.status===200 || r.status===404 || r.status===405)) { ready = true; break; }
    }catch(e){}
    await sleep(500);
  }
  if(!ready) console.warn('Server did not respond - proceeding anyway (it may start soon)');

  try{
    console.log('Signing up', email);
    const su = await fetch(`${base}/api/auth/signup`, { method:'POST', headers:{ 'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password }) });
    const suJson = await su.json();
    console.log('Signup response:', su.status, suJson);

    console.log('Logging in');
    const li = await fetch(`${base}/api/auth/login`, { method:'POST', headers:{ 'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
    const liJson = await li.json();
    console.log('Login response:', li.status, liJson);

    if(li.ok && liJson.token) {
      console.log('Token received (truncated):', liJson.token.slice(0,32) + '...');
    }

    console.log('Test email:', email);
    process.exit(0);
  }catch(err){
    console.error('auth-test error', err);
    process.exit(2);
  }

})();
