# World Cup 2026 Web App

تطبيق ويب لمتابعة كأس العالم 2026 يمكن فتحه من Android وiPhone وتثبيته
كاختصار على الشاشة الرئيسية. يعمل كتطبيق مستقل ويدعم العمل دون اتصال بعد
فتحه لأول مرة.

## Project structure

- `src/` and `public/` contain the active PWA source.
- `reference/world-cup-tracker.tsx` is the original standalone tracker source.
- `reference/world-cup-pwa.zip` is the original packaged PWA snapshot.

The active app was migrated into this independent workspace without modifying
the original Traceora workspace files.

## التشغيل محليًا

```bash
npm install
npm run dev
```

## النشر

أنشئ نسخة النشر:

```bash
npm run build
```

ارفع المشروع إلى Vercel أو Netlify. بعد فتح رابط الموقع من الهاتف:

- Android/Chrome: اختر **Install app**.
- iPhone/Safari: اضغط **Share** ثم **Add to Home Screen**.

سيظهر الاختصار بأيقونة التطبيق ويفتح دون واجهة Safari مثل تطبيق مستقل.

## ربط البيانات الرسمية على Netlify

التطبيق يستخدم API-Football من خلال Netlify Function حتى يبقى مفتاح API سريًا.

1. أنشئ حسابًا في `https://dashboard.api-football.com`.
2. انسخ مفتاح API.
3. في Netlify افتح: **Site configuration > Environment variables**.
4. أضف متغيرًا باسم `API_FOOTBALL_KEY` وضع المفتاح كقيمة.
5. أعد نشر المشروع الكامل من GitHub، أو استخدم Netlify CLI. رفع مجلد `dist`
   وحده لا ينشر Netlify Functions.

لتناسب خطة API-Football المجانية:

- Netlify Scheduled Function واحدة فقط تحدث البيانات من المصدر كل 15 دقيقة،
  بحد أقصى يقارب 96 طلبًا يوميًا مهما كان عدد الأجهزة.
- كل الأجهزة تقرأ نسخة مشتركة من Netlify Blobs ولا تستطيع تشغيل تحديث API يدويًا.
- أثناء المباراة تتحرك الدقيقة محليًا كل دقيقة دون طلب API إضافي.
- أحداث المباراة التي يوفرها رد المباريات تظهر عند فتح تفاصيل المباراة.

بعد أول نشر، افتح **Functions** في Netlify، اختر `update-world-cup` ثم اضغط
**Run now** مرة واحدة لتجهيز أول نسخة. بعد ذلك سيعمل التحديث تلقائيًا.

## ملاحظات

- لا يعرض الإصدار الحالي نتائج أو مواعيد تجريبية. يحتاج التطبيق إلى مصدر
  بيانات موثوق قبل عرض المباريات والنتائج المباشرة.
- الإشعارات الحالية إشعارات متصفح محلية. إشعارات الهاتف في الخلفية تحتاج
  خدمة Push ومصدر بيانات مباشر للمباريات.
