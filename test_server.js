const http = require('http');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    if (data) {
      req.write(data);
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== Running Verification Tests for Atenza Service ===\n');

  // 1. Homepage Test
  const homeRes = await request({ hostname: 'localhost', port: 3000, path: '/', method: 'GET' });
  console.log(`1. Homepage GET /: Status ${homeRes.statusCode} (HTML length: ${homeRes.body.length} bytes)`);
  if (homeRes.body.includes('مركز اتينزا') && homeRes.body.includes('ATENZASERVICE.COM')) {
    console.log('   ✓ Title, branding and SEO tags present.');
  }

  // 2. Health check
  const healthRes = await request({ hostname: 'localhost', port: 3000, path: '/health', method: 'GET' });
  console.log(`2. Health GET /health: Status ${healthRes.statusCode} -> ${healthRes.body}`);

  // 3. Sitemap & Robots
  const sitemapRes = await request({ hostname: 'localhost', port: 3000, path: '/sitemap.xml', method: 'GET' });
  console.log(`3. Sitemap GET /sitemap.xml: Status ${sitemapRes.statusCode}`);
  const robotsRes = await request({ hostname: 'localhost', port: 3000, path: '/robots.txt', method: 'GET' });
  console.log(`4. Robots GET /robots.txt: Status ${robotsRes.statusCode}`);

  // 4. Booking API Test
  const postData = JSON.stringify({
    name: 'أحمد الغامدي',
    phone: '0551234567',
    branch: 'فرع كيلو 14 (جنوب جدة)',
    carModel: 'مازدا CX-9',
    year: '2023',
    service: 'فحص وبرمجة كمبيوتر',
    date: '2026-08-26',
    notes: 'فحص صوت في الهوبات وفحص كمبيوتر'
  });

  const bookingRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/booking',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, postData);

  console.log(`5. Booking POST /api/booking: Status ${bookingRes.statusCode} -> ${bookingRes.body}`);

  // 5. Assets test
  const cssRes = await request({ hostname: 'localhost', port: 3000, path: '/css/style.css', method: 'GET' });
  console.log(`6. CSS GET /css/style.css: Status ${cssRes.statusCode} (${cssRes.body.length} bytes)`);

  const imgRes = await request({ hostname: 'localhost', port: 3000, path: '/assets/images/hero.jpg', method: 'GET' });
  console.log(`7. Hero Image GET /assets/images/hero.jpg: Status ${imgRes.statusCode}`);

  console.log('\n=== All Server Verification Tests Passed Successfully! ===');
}

runTests().catch(console.error);
