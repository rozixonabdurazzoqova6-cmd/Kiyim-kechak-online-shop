// ÉLÉGANCE Boutique - Mahsulotlar Ma'lumotlar Bazasi

const initialProducts = [
  {
    id: 1,
    title: "Shoyi matoli nafis oqshom ko'ylagi",
    category: "evening",
    categoryName: "Oqshom liboslari",
    price: 540000,
    oldPrice: 650000,
    badge: "Hit sotuv",
    rating: 4.9,
    reviewsCount: 42,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Pushti marvarid", hex: "#FCE7F3" },
      { name: "Shampan bej", hex: "#F5EBE1" },
      { name: "Klassik qora", hex: "#1F2937" }
    ],
    fabric: "Tabiiy ipak va atlas (100% Premium Silk)",
    description: "Nafis va nozik bichimdagi oqshom ko'ylagi. Har qanday tantanali marosim, to'y va bayram kechalarida sizning beqiyos go'zalligingizni namoyon etadi. Matosi yengil va teriga yoqimli.",
    isFeatured: true,
    isTrending: true
  },
  {
    id: 2,
    title: "Klassik ikki qatorli ayollar kostyumi",
    category: "suits",
    categoryName: "Klassik kostyumlar",
    price: 680000,
    oldPrice: 790000,
    badge: "Yangi",
    rating: 5.0,
    reviewsCount: 29,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591369822096-ffd140ec946f?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Och bej", hex: "#EADBC8" },
      { name: "Pudra pushti", hex: "#FBCFE8" },
      { name: "Qora", hex: "#111827" }
    ],
    fabric: "Italiya jun va viskoza aralashmasi",
    description: "Biznes uchrashuvlar va kundalik zamonaviy obraz uchun ajoyib tanlov. Qad-qomatni mukammal ko'rsatuvchi premium bichim.",
    isFeatured: true,
    isTrending: false
  },
  {
    id: 3,
    title: "Gul naqshli yengil bahoriy ko'ylak",
    category: "dresses",
    categoryName: "Ko'ylaklar",
    price: 390000,
    oldPrice: 470000,
    badge: "-17%",
    rating: 4.8,
    reviewsCount: 56,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Oq-pushti gulli", hex: "#FDF2F8" },
      { name: "Zangori pastel", hex: "#E0F2FE" }
    ],
    fabric: "Shifon va tabiiy paxta astari",
    description: "Bahor va yoz fasli uchun eng xaridorgir model. Nafis gulli printlar bilan bezatilgan, harakatlanish uchun juda qulay.",
    isFeatured: true,
    isTrending: true
  },
  {
    id: 4,
    title: "Tvid matoli Chanel uslubidagi nimcha va yubka",
    category: "suits",
    categoryName: "Klassik kostyumlar",
    price: 620000,
    oldPrice: 720000,
    badge: "Eksklyuziv",
    rating: 4.9,
    reviewsCount: 34,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["XS", "S", "M"],
    colors: [
      { name: "Krem oq", hex: "#FDFBF7" },
      { name: "Pushti tvid", hex: "#FCE7F3" }
    ],
    fabric: "Premium fransuzcha tvid mato, tilla tugmalar",
    description: "Fransuzcha nafislik va dabdaba ramzi bo'lgan tvid to'plam. Tilla rangli tugmalar va nafis chiziqlar har bir ayolga o'zgacha maftunkorlik bag'ishlaydi.",
    isFeatured: false,
    isTrending: true
  },
  {
    id: 5,
    title: "Zamonaviy yumshoq kaşmir kardiğan to'plami",
    category: "casual",
    categoryName: "Kundalik liboslar",
    price: 340000,
    oldPrice: 420000,
    badge: "Yangi",
    rating: 4.7,
    reviewsCount: 19,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sutli qahva", hex: "#D7C4B7" },
      { name: "Och pushti", hex: "#FCE7F3" },
      { name: "Krem", hex: "#FAF5EF" }
    ],
    fabric: "100% yumshoq paxta va nozik kaşmir iplari",
    description: "Salqin ob-havoda o'zingizni erkin va iliq his qilish uchun ajoyib kardiğan. Shimlar va yubkalar bilan oson uyg'unlashadi.",
    isFeatured: false,
    isTrending: false
  },
  {
    id: 6,
    title: "A-siluetli hashamatli atlas libos",
    category: "evening",
    categoryName: "Oqshom liboslari",
    price: 590000,
    oldPrice: 710000,
    badge: "Hit sotuv",
    rating: 5.0,
    reviewsCount: 63,
    images: [
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Qirmizi sharob", hex: "#881337" },
      { name: "Shampan oltin", hex: "#F3E8D7" },
      { name: "Zumrad yashil", hex: "#064E3B" }
    ],
    fabric: "Yaltiroq og'ir atlas (Satin Royal)",
    description: "Qomatni qomatga moslashtiruvchi korsetli bel qismi va erkin tushib turuvchi A-siluet yubka. Sizni barcha diqqat markazida qiladi.",
    isFeatured: true,
    isTrending: true
  },
  {
    id: 7,
    title: "Oversize uslubdagi premium bej trenkot",
    category: "outerwear",
    categoryName: "Ustki kiyim",
    price: 750000,
    oldPrice: 890000,
    badge: "Trend 2026",
    rating: 4.9,
    reviewsCount: 47,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Klassik qum rangi", hex: "#D6C0B3" },
      { name: "Zaytun yashil", hex: "#374151" }
    ],
    fabric: "Suv o'tkazmaydigan zich paxta (Water-resistant Cotton)",
    description: "Mavsumiy klassika! Har qanday kiyim ustidan nafis va zamonaviy ko'rinish beruvchi qulay belbog'li trenkot.",
    isFeatured: true,
    isTrending: false
  },
  {
    id: 8,
    title: "Lola gulli erkin yozgi sarafan",
    category: "dresses",
    categoryName: "Ko'ylaklar",
    price: 320000,
    oldPrice: 380000,
    badge: "-15%",
    rating: 4.8,
    reviewsCount: 22,
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Limon sariq", hex: "#FEF08A" },
      { name: "Pudra pushti", hex: "#FCE7F3" }
    ],
    fabric: "100% Tabiiy zig'ir (Linen)",
    description: "Issiq yoz kunlarida badanni salqin tutuvchi tabiiy zig'ir matosidan tayyorlangan zamonaviy sarafan.",
    isFeatured: false,
    isTrending: true
  },
  {
    id: 9,
    title: "Keng yengli va kamarcha bilan nafis shoyi ko'ylak",
    category: "dresses",
    categoryName: "Ko'ylaklar",
    price: 490000,
    oldPrice: 580000,
    badge: "Yangi",
    rating: 4.9,
    reviewsCount: 31,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Lavanda binafsha", hex: "#DDD6FE" },
      { name: "Och bej", hex: "#F5EBE1" }
    ],
    fabric: "Yumshoq yengil viskoza va atlas",
    description: "Sharqona noziklik va zamonaviy Yevropa qulayligini o'zida jamlagan bejirim libos. Kamari qomatni nozik ko'rsatadi.",
    isFeatured: true,
    isTrending: true
  },
  {
    id: 10,
    title: "Casual uslubdagi ikki qismli trikotaj kostyum",
    category: "casual",
    categoryName: "Kundalik liboslar",
    price: 360000,
    oldPrice: 440000,
    badge: "-18%",
    rating: 4.7,
    reviewsCount: 51,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sut rang", hex: "#FEF9F2" },
      { name: "Kulrang pastel", hex: "#E5E7EB" },
      { name: "Och shaftoli", hex: "#FFEDD5" }
    ],
    fabric: "Premium paxta trikotaj (Oeko-Tex sertifikati)",
    description: "Sayohatlar, shahar bo'ylab sayr va uyda erkin bo'lish uchun ideal tanlov. Mato cho'zilmaydi va yuvilganda o'z rangini yo'qotmaydi.",
    isFeatured: false,
    isTrending: false
  },
  {
    id: 11,
    title: "Qora mini kokteyl libosi (Little Black Dress)",
    category: "evening",
    categoryName: "Oqshom liboslari",
    price: 480000,
    oldPrice: 560000,
    badge: "Klassika",
    rating: 5.0,
    reviewsCount: 78,
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Chuqur qora", hex: "#111827" }
    ],
    fabric: "Elastik krepli mato, ipak astar",
    description: "Har bir ayol garderobida bo'lishi shart bo'lgan afsonaviy klassika. Kechki ziyofat va uchrashuvlarda o'zgacha joziba baxsh etadi.",
    isFeatured: true,
    isTrending: false
  },
  {
    id: 12,
    title: "Yumshoq alpaka junli qishki nafis palto",
    category: "outerwear",
    categoryName: "Ustki kiyim",
    price: 980000,
    oldPrice: 1200000,
    badge: "Premium",
    rating: 5.0,
    reviewsCount: 33,
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Krem bej", hex: "#F3EDE2" },
      { name: "Karamel", hex: "#B4846C" }
    ],
    fabric: "80% Alpaka juni, 20% tabiiy kaşmir",
    description: "Qishki fasl uchun eng nafis va dabdabali palto. O'ta issiq, yengil va aristokratik ko'rinishga ega.",
    isFeatured: false,
    isTrending: true
  }
];

// LocalStorage bilan sinxronizatsiya qilish (Mahsulotlar boshqaruvi uchun)
function getStoredProducts() {
  const stored = localStorage.getItem("elegance_products");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Mahsulotlarni o'qishda xato:", e);
      return initialProducts;
    }
  }
  localStorage.setItem("elegance_products", JSON.stringify(initialProducts));
  return initialProducts;
}

function saveProductsToStorage(products) {
  localStorage.setItem("elegance_products", JSON.stringify(products));
}
