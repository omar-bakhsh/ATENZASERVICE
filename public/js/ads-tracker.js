/**
 * ==========================================================================
 * Atenza Service - Google Ads & Analytics Tracking Module
 * ==========================================================================
 * هذا الملف مخصص لإدارة وتتبع جميع تحويلات إعلانات جوجل (Google Ads Conversions)
 * وإحصائيات جوجل (Google Analytics 4).
 */

// إعدادات إعلانات جوجل والتحليلات (يمكنك وضع المعرفات الخاصة بك هنا)
const ADS_CONFIG = {
  // مثال: 'AW-123456789'
  GOOGLE_ADS_ID: '', 
  // مثال: 'AbCdEfGhIjKlMnOp'
  CONVERSION_LABEL_CALL: '', 
  CONVERSION_LABEL_WHATSAPP: '',
  CONVERSION_LABEL_BOOKING: '',
  // مثال: 'G-XXXXXXXXXX'
  GA4_MEASUREMENT_ID: ''
};

// DataLayer Initialization
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

// دالة إرسال تحويلات إعلانات جوجل عند النقر
function trackConversion(actionName, eventData = {}) {
  // 1. إرسال الحدث إلى dataLayer
  window.dataLayer.push({
    event: actionName,
    ...eventData,
    timestamp: new Date().toISOString()
  });

  console.log(`[Google Ads Tracking] Event: ${actionName}`, eventData);

  // 2. إذا تم تعيين معرف Google Ads، يتم إرسال الحدث مباشرة
  if (ADS_CONFIG.GOOGLE_ADS_ID && typeof window.gtag === 'function') {
    let sendTo = ADS_CONFIG.GOOGLE_ADS_ID;
    if (actionName === 'phone_call' && ADS_CONFIG.CONVERSION_LABEL_CALL) {
      sendTo += `/${ADS_CONFIG.CONVERSION_LABEL_CALL}`;
    } else if (actionName === 'whatsapp_click' && ADS_CONFIG.CONVERSION_LABEL_WHATSAPP) {
      sendTo += `/${ADS_CONFIG.CONVERSION_LABEL_WHATSAPP}`;
    } else if (actionName === 'appointment_booking' && ADS_CONFIG.CONVERSION_LABEL_BOOKING) {
      sendTo += `/${ADS_CONFIG.CONVERSION_LABEL_BOOKING}`;
    }

    window.gtag('event', 'conversion', {
      send_to: sendTo,
      value: eventData.value || 1.0,
      currency: 'SAR',
      event_callback: eventData.callback || function() {}
    });
  }
}

// تتبع جميع النقرات التلقائية على أزرار الاتصال والواتساب والخرائط
document.addEventListener('DOMContentLoaded', () => {
  // 1. تتبع أزرار الاتصال الهاتفي (Phone Calls)
  document.querySelectorAll('a[href^="tel:"]').forEach(callBtn => {
    callBtn.addEventListener('click', (e) => {
      const phoneNumber = callBtn.getAttribute('href').replace('tel:', '');
      const branchName = callBtn.getAttribute('data-branch') || 'General';
      trackConversion('phone_call', {
        phone_number: phoneNumber,
        branch: branchName,
        source: 'Landing Page'
      });
    });
  });

  // 2. تتبع أزرار الواتساب (WhatsApp Direct Messages)
  document.querySelectorAll('a[href*="whatsapp.com"], [data-action="whatsapp"]').forEach(waBtn => {
    waBtn.addEventListener('click', (e) => {
      const branchName = waBtn.getAttribute('data-branch') || 'General';
      trackConversion('whatsapp_click', {
        branch: branchName,
        source: 'Landing Page CTA'
      });
    });
  });

  // 3. تتبع النقر على اتجاهات خرائط قوقل (Google Maps Directions)
  document.querySelectorAll('a[href*="maps.app.goo.gl"], a[href*="google.com/maps"]').forEach(mapBtn => {
    mapBtn.addEventListener('click', (e) => {
      const branchName = mapBtn.getAttribute('data-branch') || 'General';
      trackConversion('map_directions_click', {
        branch: branchName
      });
    });
  });
});
