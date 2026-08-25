const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3060;

// Enable Gzip compression for high Google PageSpeed score
app.use(compression());

// Security headers with CSP configured for Google Ads, Analytics & Fonts
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://googleads.g.doubleclick.net"
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com"
        ],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https:",
          "http:"
        ],
        connectSrc: [
          "'self'",
          "https://www.google-analytics.com",
          "https://analytics.google.com",
          "https://stats.g.doubleclick.net",
          "https://maps.googleapis.com"
        ],
        frameSrc: [
          "'self'",
          "https://www.google.com",
          "https://maps.google.com",
          "https://www.google.com/maps"
        ]
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static assets with zero-caching for instant live reload
const staticOptions = {
  maxAge: 0,
  setHeaders: (res, filePath) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
};

app.use(express.static(path.join(__dirname, 'public'), staticOptions));

// Health check endpoint for GoDaddy monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Atenza Service - Mazda Specialists',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Serve sitemap and robots explicitly
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// Catch-all route to serve the landing page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚗 مركز اتينزا - Atenza Service Server`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`🏢 Branches: Kilo 14 & Osfan (Jeddah)`);
  console.log(`=========================================`);
});
