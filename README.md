# 🌸 ÉLÉGANCE — Nafis Ayollar Liboslari Onlayn Butigi

Ushbu veb-sayt zamonaviy ayollar kiyimlari do'koni uchun yaratilgan to'liq funksional, nafis va responsiv onlayn vitrina hisoblanadi.

---

## ✨ Saytning Asosiy Afzalliklari va Imkoniyatlari

1. **Nafis va Ayollarbop Dizayn (Haute Couture Aesthetic)**:
   - Soft pastel, pudra pushti, nozik krem va oltin ranglar gammasi.
   - Hashamatli tipografiya (*Playfair Display*, *Plus Jakarta Sans*, *Alex Brush*).
   - Glassmorphism (shisha effekti), mayin hover animatsiyalari va responsive layout (smartfon, planshet, kompyuter).

2. **To'liq Dinamik Katalog va Filtrlash**:
   - Toifalar bo'yicha saralash (*Ko'ylaklar*, *Kostyumlar*, *Oqshom*, *Casual*, *Ustki kiyim*).
   - Tezkor qidiruv (nomi va mato tarkibi bo'yicha).
   - O'lcham bo'yicha filtrlash (`XS`, `S`, `M`, `L`, `XL`).
   - Narx slayderi (300,000 so'mdan 1,500,000 so'mgacha).
   - Narx va reyting bo'yicha saralash.

3. **Interaktiv Savatcha (Cart)**:
   - Mahsulotlarni tanlangan o'lcham va rang bilan savatchaga qo'shish.
   - Soni va narxni avtomatik hisoblash.
   - **Promokod tizimi**: `AYOL2026` (10% chegirma) yoki `BAHOR` (15% chegirma).
   - 500,000 so'mdan yuqori xaridlarda bepul yetkazib berish.

4. **Sevimlilar Ro'yxati (Wishlist)**:
   - Istalgan libosni bir bosishda yurakcha bilan saqlash va keyinchalik savatchaga o'tkazish.

5. **Tezkor Ko'rish Modali (Quick View)**:
   - Katta formatdagi rasmlar galereyasi.
   - Mato tarkibi va tavsifi.
   - O'lcham va rang tanlash, o'lchamlar jadvaliga o'tish.

6. **Telegram va WhatsApp Orqali Tezkor Buyurtma**:
   - O'zbekiston bozori uchun eng qulay usul!
   - Mijoz ism, telefon, manzil va to'lov turini kiritganda, chiroyli chek formatidagi xabar avtomatik do'kon menejerining Telegramiga yoki WhatsAppiga yuboriladi.

7. **Do'kon Boshqaruvi Paneli (Admin Panel)**:
   - Saytning o'zida "Boshqaruv" tugmasi mavjud.
   - Yangi liboslarni rasm, narx, chegirma va toifasi bilan qo'shish.
   - Mahsulotlarni o'chirish.
   - Telegram username, WhatsApp va aloqa telefonlarini o'zgartirish.
   - Barcha o'zgarishlar brauzer xotirasida (`localStorage`) saqlanadi.

---

## 📁 Loyiha Strukturasi

```
web saytim/
│
├── index.html          # Asosiy veb-sahifa (Barcha bo'limlar, modallar va drawerlar)
├── css/
│   └── style.css       # Maxsus nozik stillar, gradientlar, animatsiyalar
├── js/
│   ├── products.js     # Mahsulotlar katalogi bazasi va LocalStorage sinxronizatsiyasi
│   ├── app.js          # Savatcha, filtrlar, Telegram buyurtma shakllantirish, modal oynalar
│   └── admin.js        # Yangi tovar qo'shish va do'kon sozlamalari
└── README.md           # Loyiha qo'llanmasi
```

---

## 🚀 Qanday Ishga Tushirish Mumkin?

Hech qanday qo'shimcha o'rnatish shart emas!

1. `web saytim` papkasidagi `index.html` faylini istalgan brauzerda (Chrome, Edge, Safari, Opera) ikki marta bosib oching.
2. Yoki terminal orqali lokal serverda ishga tushirishingiz mumkin:
   ```bash
   npx serve .
   ```
   yoki
   ```bash
   python -m http.server 8000
   ```

---

## ⚙️ Do'kon Egasi Uchun Sozlamalar

Sayt yuqorisidagi yoki pastidagi **"Boshqaruv"** tugmasini bosing:
- O'zingizning Telegram linkingizni kiriting (masalan: `sizning_telegramingiz`).
- Telefon raqamingizni kiriting.
- Istalgan vaqt yangi libos rasmi va narxini qo'shishingiz yoki o'chirishingiz mumkin.
