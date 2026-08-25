/**
 * ==========================================================================
 * Atenza Service - Main Client Application Logic (Updated Contacts & Direct CTAs)
 * ==========================================================================
 */

// Phone numbers & direct contacts for Atenza Branches and Supervisor
const BRANCH_CONTACTS = {
  south_kilo14: {
    name: 'فرع جنوب جدة (كيلو 14)',
    address: 'طريق مكة القديم - كيلو 14 - مجمع 14 - رقم المركز 119',
    mapUrl: 'https://maps.app.goo.gl/UbuuLhEKYbC5aaKX8',
    phone: '0556565135',
    phoneFormatted: '055 656 5135',
    whatsapp: '966556565135'
  },
  north_osfan: {
    name: 'فرع شمال جدة (عسفان)',
    address: 'المدينة الذكية - رقم المركز 1207 (المظلة الحمراء)',
    mapUrl: 'https://maps.app.goo.gl/mwS9mkbrYxAkkg6y5',
    phone: '0535984648',
    phoneFormatted: '053 598 4648',
    whatsapp: '966535984648'
  },
  supervisor: {
    name: 'المشرف العام (تواصل بعد الدوام)',
    note: 'متاح للرد والاستفسارات بعد انتهاء ساعات العمل الرسمية (بعد 5:30 م) وطوال أيام الأسبوع',
    phone: '0598260665',
    phoneFormatted: '059 826 0665',
    whatsapp: '966598260665'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initScrollAnimations();
});

/* Mobile Menu Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const isOpen = navLinks.classList.contains('show');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        toggleBtn.innerHTML = '☰';
      });
    });
  }
}

/* FAQ Accordion Toggle */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
}

/* Scroll reveal for enhanced UX */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.branch-card, .service-card, .why-item, .dealer-feature-box, .hub-card, .supervisor-banner, .hero-branch-cta-card');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
}
