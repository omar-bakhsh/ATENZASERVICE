# ==============================================================================
# دليل رفع وتشغيل موقع مركز اتينزا (Atenza Service) على استضافة GoDaddy Node.js
# ==============================================================================

## 📌 الخطوات السريعة لرفع المشروع على GoDaddy cPanel:

### 1. تجهيز الملفات:
- قم بضغط كافة ملفات ومجلدات المشروع داخل ملف مضغوط بصيغة `.zip` (استثنِ مجلد `node_modules` لتسريع الرفع وحجم الملف).

### 2. تسجيل الدخول إلى GoDaddy cPanel:
1. ادخل إلى لوحة تحكم **cPanel** في حساب GoDaddy الخاص بك.
2. ابحث عن قسم **Software** أو **البرامج**، ثم انقر على **Setup Node.js App** (إعداد تطبيق Node.js).

### 3. إنشاء التطبيق في Node.js Selector:
1. اضغط على زر **Create Application** (إنشاء تطبيق).
2. حدد إعدادات التطبيق كما يلي:
   - **Node.js version**: اختر إصدار حديث (مثل 18.x أو 20.x).
   - **Application mode**: اختر `Production`.
   - **Application root**: حدد المجلد (مثال: `atenza-service` أو المسار الذي ترغب برفع الملفات إليه).
   - **Application URL**: اختر الدومين `atenzaservice.com`.
   - **Application startup file**: اكتب `server.js`.
3. اضغط **Create** (إنشاء).

### 4. رفع الملفات وتثبيت التبعيات (NPM Install):
1. افتح **File Manager** (مدير الملفات) في cPanel.
2. توجه إلى المجلد المحدد للتطبيق (مثلاً `atenza-service`).
3. اضغط على **Upload** وارفع ملف الـ `.zip` ثم فك الضغط (Extract).
4. ارجع إلى صفحة **Setup Node.js App** واضغط على تطبيقك.
5. اضغط على زر **Run NPM Install** ليتم تثبيت الحزم المطلوبة تلقائياً.
6. اضغط على **Restart** لإعادة تشغيل الخادم.

---

## 🎯 تتبع إعلانات قوقل (Google Ads Conversion Tracking):
- افتح ملف `public/js/ads-tracker.js`.
- في بداية الملف ستجد كائن `ADS_CONFIG`:
```javascript
const ADS_CONFIG = {
  GOOGLE_ADS_ID: 'AW-XXXXXXXXX', // ضع معرف حساب جوجل ادز هنا
  CONVERSION_LABEL_CALL: 'YYYYYYYYYYYY', // ملصق تحويل الاتصال الهاتفي
  CONVERSION_LABEL_WHATSAPP: 'ZZZZZZZZZZZZ', // ملصق تحويل محادثة الواتساب
  CONVERSION_LABEL_BOOKING: 'WWWWWWWWWWWW', // ملصق تحويل حجز الموعد
  GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX' // معرف إحصاءات جوجل 4
};
```
- جميع النقرات على أزرار الاتصال الهاتفي، أزرار الواتساب، والخرائط يتم تتبعها تلقائياً وإرسالها إلى `dataLayer` وإلى حملات قوقل بدون أي تعديل يدوي إضافي.

---

## 📞 تعديل أرقام الهواتف والواتساب للفروع:
- افتح ملف `public/js/app.js` و `public/index.html`.
- استبدل الرقم `0500000000` و `966500000000` برقم اتصال واتساب فرع كيلو 14 ورقم فرع عسفان في أي وقت.
