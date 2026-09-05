const fs = require('fs');

const filepath = 'public/index.html';
let content = fs.readFileSync(filepath, 'utf8');

// Replace emojis with SVG
const emojiMap = {
    "✨": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    "🏷️": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    "🛡️": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    "📋": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    "🧾": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    "📍": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    "📞": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    "💬": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    "🌙": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    "🏢": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22"/><line x1="15" y1="22" x2="15" y2="22"/><line x1="12" y1="18" x2="12" y2="22"/></svg>',
    "🗺️": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    "🔧": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    "⚙️": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    "💻": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    "⚡": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    "❄️": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15 7 12 12 9 7 12 2"/><polygon points="22 12 17 15 12 12 17 9 22 12"/><polygon points="12 22 9 17 12 12 15 17 12 22"/><polygon points="2 12 7 9 12 12 7 15 2 12"/></svg>',
    "🛑": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    "🛢️": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 7.52 2 13s4.48 10 10 10z"/><circle cx="12" cy="12" r="3"/></svg>',
    "❓": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    "⏱️": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    "📄": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
};

for (const [emoji, svg] of Object.entries(emojiMap)) {
    content = content.replaceAll(emoji, svg);
}

// EXACT MATCH REPLACEMENT
content = content.replace("مازدا (MAZDA)", "مازدا (بخش)");
content = content.replace("ATENZA SERVICE • MAZDA", "ATENZA SERVICE • بخش");

const carouselHtml = `
          <div class="hero-image-box hero-carousel-wrapper" style="position: relative; display: flex; flex-direction: column; gap: 10px;">
            <!-- Thumbnails -->
            <div class="carousel-thumbnails" style="display: flex; gap: 10px; justify-content: center; z-index: 2;">
              <div class="thumb-item active" onclick="changeHeroImage(this, '/assets/images/service_1.jpg', 'صيانة الدورية حسب جدول الوكالة')" style="cursor: pointer; border: 2px solid var(--brand-blue); border-radius: 8px; overflow: hidden; width: 80px; height: 60px; transition: all 0.3s ease;">
                <img src="/assets/images/service_1.jpg" alt="صيانة الدورية" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              <div class="thumb-item" onclick="changeHeroImage(this, '/assets/images/service_2.jpg', 'صيانة نظام المكيف والتبريد')" style="cursor: pointer; border: 2px solid transparent; border-radius: 8px; overflow: hidden; width: 80px; height: 60px; transition: all 0.3s ease; opacity: 0.7;">
                <img src="/assets/images/service_2.jpg" alt="صيانة المكيف" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              <div class="thumb-item" onclick="changeHeroImage(this, '/assets/images/service_3.jpg', 'كشف اعطال بالاجهزة الحديثة والبرمجة')" style="cursor: pointer; border: 2px solid transparent; border-radius: 8px; overflow: hidden; width: 80px; height: 60px; transition: all 0.3s ease; opacity: 0.7;">
                <img src="/assets/images/service_3.jpg" alt="كشف اعطال" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
            </div>
            
            <div class="carousel-main" style="position: relative; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg);">
              <img id="mainCarouselImg" src="/assets/images/service_1.jpg" alt="صيانة الدورية" width="580" height="400" loading="eager" style="width: 100%; height: 400px; object-fit: cover; display: block; transition: opacity 0.3s ease;">
              <div class="carousel-caption" id="mainCarouselCaption" style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(6, 9, 15, 0.85); backdrop-filter: blur(8px); color: #fff; padding: 12px 20px; font-weight: 700; font-size: 1.1rem; text-align: center; border-top: 1px solid var(--brand-blue);">صيانة الدورية حسب جدول الوكالة</div>
            </div>
          </div>
`;

const originalImg = `          <div class="hero-image-box">
            <img src="/assets/images/branch_south_kilo14.png" alt="مركز اتينزا لصيانة مازدا بجدة" width="580" height="440" loading="eager">
          </div>`;

content = content.replace(originalImg, carouselHtml);

const scriptToAdd = `
  <script>
    function changeHeroImage(element, src, caption) {
      document.getElementById('mainCarouselImg').src = src;
      document.getElementById('mainCarouselCaption').innerText = caption;
      
      const thumbs = document.querySelectorAll('.thumb-item');
      thumbs.forEach(t => {
          t.style.borderColor = 'transparent';
          t.style.opacity = '0.7';
      });
      element.style.borderColor = 'var(--brand-blue)';
      element.style.opacity = '1';
    }
  </script>
</body>
`;

content = content.replace("</body>", scriptToAdd);

fs.writeFileSync(filepath, content, 'utf8');
