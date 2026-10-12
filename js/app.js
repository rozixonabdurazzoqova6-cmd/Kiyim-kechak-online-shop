// ÉLÉGANCE Boutique - Asosiy JavaScript Mantig'i

// 1. Dastlabki Holat (State)
let products = getStoredProducts();
let cart = JSON.parse(localStorage.getItem("elegance_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("elegance_wishlist")) || [];
let activeCategory = "all";
let activeSort = "featured";
let searchQuery = "";
let selectedSize = "";
let maxPrice = 1500000;
let appliedCoupon = null;

// Do'kon aloqa ma'lumotlari (Admin osongina o'zgartirishi mumkin)
const STORE_CONFIG = {
  name: "ÉLÉGANCE",
  tagline: "Ayollar liboslari butigi",
  phone: "+998 (90) 123-45-67",
  telegramUsername: "elegance_boutique_uz", // Sizning Telegram profilingiz yoki botingiz
  whatsappNumber: "998901234567",
  address: "Toshkent shahri, Amir Temur ko'chasi 45-uy",
  freeDeliveryThreshold: 500000,
  standardDeliveryCost: 25000
};

// 2. Narxni chiroyli formatlash (so'm)
function formatPrice(num) {
  return new Intl.NumberFormat('uz-UZ').format(num) + " so'm";
}

// 3. Toast xabarnoma ko'rsatish
function showToast(message, icon = "🌸") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="text-xl">${icon}</span>
    <div class="text-sm font-medium text-stone-800">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 4. Mahsulotlarni Filtrlash va Saralash
function getFilteredProducts() {
  let list = [...products];

  // Kategoriya bo'yicha
  if (activeCategory !== "all") {
    list = list.filter(item => item.category === activeCategory);
  }

  // Qidiruv bo'yicha
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.fabric.toLowerCase().includes(q) ||
      item.categoryName.toLowerCase().includes(q)
    );
  }

  // O'lcham bo'yicha
  if (selectedSize !== "") {
    list = list.filter(item => item.sizes.includes(selectedSize));
  }

  // Narx bo'yicha
  list = list.filter(item => item.price <= maxPrice);

  // Saralash
  if (activeSort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (activeSort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (activeSort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  } else if (activeSort === "newest") {
    list.sort((a, b) => b.id - a.id);
  }

  return list;
}

// 5. Katalog Kartochkalarini Chizish
function renderCatalog() {
  const container = document.getElementById("products-grid");
  const countSpan = document.getElementById("products-count");
  if (!container) return;

  const filtered = getFilteredProducts();
  if (countSpan) countSpan.textContent = `${filtered.length} ta libos`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-rose-50 flex items-center justify-center text-rose-300 text-3xl">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3 class="text-xl font-serif-luxury font-semibold text-stone-800 mb-2">Hech qanday libos topilmadi</h3>
        <p class="text-sm text-stone-500 max-w-md mx-auto mb-6">Tanlangan filtrlar bo'yicha mahsulot topilmadi. Filtrlarni tozalab qaytadan ko'ring.</p>
        <button onclick="resetFilters()" class="px-6 py-2.5 bg-rose-500 text-white rounded-full text-sm font-medium hover:bg-rose-600 transition">
          Filtrlarni tozalash
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isWish = wishlist.some(w => w.id === item.id);
    const discount = item.oldPrice ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100) : 0;

    return `
      <div class="product-card group relative bg-white rounded-3xl p-3 border border-rose-100/70 shadow-sm flex flex-col justify-between" data-id="${item.id}">
        <!-- Rasm va Belgilar -->
        <div class="product-img-wrapper rounded-2xl aspect-[3/4] bg-stone-100 relative mb-4">
          <img src="${item.images[0]}" alt="${item.title}" class="w-full h-full object-cover rounded-2xl" loading="lazy">
          
          <!-- Badjlar -->
          <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            ${item.badge ? `
              <span class="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full ${
                item.badge.includes('%') ? 'bg-rose-500 text-white' : 'bg-white/90 text-stone-800 backdrop-blur-md shadow-sm border border-stone-200/50'
              }">
                ${item.badge}
              </span>
            ` : ''}
            ${discount > 0 && !item.badge?.includes('%') ? `
              <span class="px-2.5 py-1 text-[11px] font-bold rounded-full bg-rose-500 text-white shadow-sm">
                -${discount}%
              </span>
            ` : ''}
          </div>

          <!-- Wishlist tugmasi -->
          <button onclick="toggleWishlist(${item.id})" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-600 hover:text-rose-500 transition shadow-sm z-10" title="Sevimlilarga qo'shish">
            <i class="${isWish ? 'fa-solid text-rose-500' : 'fa-regular'} fa-heart text-base"></i>
          </button>

          <!-- Hover tezkor tugmalar -->
          <div class="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
            <button onclick="openQuickView(${item.id})" class="flex-1 py-2.5 bg-white/95 backdrop-blur-md text-stone-800 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-xs font-semibold shadow-md transition flex items-center justify-center gap-1.5">
              <i class="fa-regular fa-eye"></i> Tezkor ko'rish
            </button>
          </div>
        </div>

        <!-- Matn va Ma'lumotlar -->
        <div class="flex-1 flex flex-col justify-between px-1.5">
          <div>
            <div class="flex items-center justify-between text-xs text-stone-400 mb-1">
              <span class="uppercase tracking-wider font-medium text-[10px] text-rose-600">${item.categoryName}</span>
              <div class="flex items-center gap-1 text-amber-500">
                <i class="fa-solid fa-star text-[10px]"></i>
                <span class="text-stone-700 font-semibold">${item.rating}</span>
                <span class="text-stone-400">(${item.reviewsCount})</span>
              </div>
            </div>

            <h3 onclick="openQuickView(${item.id})" class="font-serif-luxury font-semibold text-stone-800 text-base leading-snug hover:text-rose-600 transition cursor-pointer mb-2 line-clamp-2">
              ${item.title}
            </h3>

            <!-- O'lchamlar miniatyurasi -->
            <div class="flex flex-wrap gap-1 mb-3">
              ${item.sizes.map(s => `
                <span class="px-1.5 py-0.5 text-[10px] bg-stone-100 text-stone-600 rounded border border-stone-200 font-mono">${s}</span>
              `).join('')}
            </div>
          </div>

          <!-- Narx va Savatcha -->
          <div class="pt-2 border-t border-rose-50/80 flex items-center justify-between">
            <div>
              <div class="font-serif-luxury text-lg font-bold text-stone-900 leading-none">
                ${formatPrice(item.price)}
              </div>
              ${item.oldPrice ? `
                <div class="text-xs text-stone-400 line-through mt-0.5 font-sans">
                  ${formatPrice(item.oldPrice)}
                </div>
              ` : ''}
            </div>

            <button onclick="quickAddToCart(${item.id})" class="w-10 h-10 rounded-2xl bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white flex items-center justify-center transition shadow-sm" title="Savatchaga qo'shish">
              <i class="fa-solid fa-bag-shopping text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 6. Filtrlarni tozalash
function resetFilters() {
  activeCategory = "all";
  searchQuery = "";
  selectedSize = "";
  maxPrice = 1500000;
  activeSort = "featured";

  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";

  const priceSlider = document.getElementById("price-slider");
  if (priceSlider) priceSlider.value = 1500000;
  const priceDisplay = document.getElementById("price-value");
  if (priceDisplay) priceDisplay.textContent = formatPrice(1500000);

  // Kategoriya tugmalarini yangilash
  document.querySelectorAll(".category-pill").forEach(pill => {
    if (pill.dataset.category === "all") {
      pill.classList.add("bg-stone-900", "text-white");
      pill.classList.remove("bg-white", "text-stone-700");
    } else {
      pill.classList.remove("bg-stone-900", "text-white");
      pill.classList.add("bg-white", "text-stone-700");
    }
  });

  renderCatalog();
}

// 7. Savatcha Mantig'i (Cart Operations)
function updateCartUI() {
  localStorage.setItem("elegance_cart", JSON.stringify(cart));

  const countBadge = document.getElementById("cart-count");
  if (countBadge) {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    countBadge.textContent = totalQty;
    countBadge.classList.toggle("hidden", totalQty === 0);
  }

  const itemsContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const deliveryEl = document.getElementById("cart-delivery");
  const discountRow = document.getElementById("cart-discount-row");
  const discountEl = document.getElementById("cart-discount");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("cart-checkout-btn");

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="py-16 text-center">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-rose-50 flex items-center justify-center text-rose-300 text-3xl">
          <i class="fa-solid fa-bag-shopping"></i>
        </div>
        <h4 class="font-serif-luxury font-semibold text-lg text-stone-800 mb-1">Savatchangiz bo'sh</h4>
        <p class="text-xs text-stone-500 mb-6">O'zingizga yoqqan nafis liboslarni tanlab savatchaga qo'shing</p>
        <button onclick="closeCart(); scrollToCatalog();" class="px-6 py-2.5 bg-rose-500 text-white rounded-full text-xs font-semibold hover:bg-rose-600 transition">
          Xaridni boshlash
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "0 so'm";
    if (deliveryEl) deliveryEl.textContent = "0 so'm";
    if (discountRow) discountRow.classList.add("hidden");
    if (totalEl) totalEl.textContent = "0 so'm";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (checkoutBtn) checkoutBtn.disabled = false;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal >= STORE_CONFIG.freeDeliveryThreshold || subtotal === 0 ? 0 : STORE_CONFIG.standardDeliveryCost;
  
  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = Math.round(subtotal * (appliedCoupon.percent / 100));
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + delivery);

  itemsContainer.innerHTML = cart.map((item, index) => `
    <div class="flex gap-3 py-3 border-b border-rose-100/60 items-center">
      <img src="${item.image}" alt="${item.title}" class="w-16 h-20 object-cover rounded-xl border border-rose-100 flex-shrink-0">
      <div class="flex-1 min-w-0">
        <h5 class="text-xs font-semibold text-stone-800 truncate mb-1">${item.title}</h5>
        <div class="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
          <span class="px-1.5 py-0.5 bg-rose-50 rounded text-stone-700 font-mono">O'lcham: ${item.size}</span>
          ${item.color ? `<span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full border" style="background-color: ${item.color.hex}"></span> ${item.color.name}</span>` : ''}
        </div>
        <div class="text-xs font-bold text-rose-600 font-serif-luxury">
          ${formatPrice(item.price)}
        </div>
      </div>
      <div class="flex flex-col items-end justify-between self-stretch">
        <button onclick="removeFromCart(${index})" class="text-stone-300 hover:text-rose-500 text-xs transition" title="O'chirish">
          <i class="fa-solid fa-trash-can"></i>
        </button>
        <div class="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
          <button onclick="changeCartQty(${index}, -1)" class="w-6 h-6 flex items-center justify-center text-xs text-stone-600 hover:bg-stone-100 transition">-</button>
          <span class="w-7 text-center text-xs font-semibold text-stone-800">${item.quantity}</span>
          <button onclick="changeCartQty(${index}, 1)" class="w-6 h-6 flex items-center justify-center text-xs text-stone-600 hover:bg-stone-100 transition">+</button>
        </div>
      </div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (deliveryEl) deliveryEl.textContent = delivery === 0 ? "BEPUL" : formatPrice(delivery);
  
  if (discountRow && discountEl) {
    if (discountAmount > 0) {
      discountRow.classList.remove("hidden");
      discountEl.textContent = `-${formatPrice(discountAmount)} (${appliedCoupon.code})`;
    } else {
      discountRow.classList.add("hidden");
    }
  }

  if (totalEl) totalEl.textContent = formatPrice(grandTotal);
}

function addToCart(product, size, color, quantity = 1) {
  const existingIndex = cart.findIndex(
    item => item.id === product.id && item.size === size && item.color?.name === color?.name
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: size || product.sizes[0],
      color: color || product.colors[0],
      quantity: quantity
    });
  }

  updateCartUI();
  showToast(`"${product.title}" savatchaga qo'shildi! 🌸`);
}

function quickAddToCart(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;
  addToCart(prod, prod.sizes[0], prod.colors[0], 1);
}

function changeCartQty(index, delta) {
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    updateCartUI();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
  showToast("Mahsulot savatchadan olib tashlandi", "🗑️");
}

function applyCouponCode() {
  const input = document.getElementById("coupon-input");
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === "AYOL2026") {
    appliedCoupon = { code: "AYOL2026", percent: 10 };
    showToast("Ajoyib! 10% chegirma kuponi qo'llanildi! ✨", "🎉");
  } else if (code === "BAHOR") {
    appliedCoupon = { code: "BAHOR", percent: 15 };
    showToast("Bahoriy 15% chegirma muvaffaqiyatli faollashdi! 🌸", "🎉");
  } else {
    showToast("Kupon kodi noto'g'ri yoki muddati o'tgan", "⚠️");
    return;
  }
  input.value = "";
  updateCartUI();
}

// 8. Sevimlilar (Wishlist) Mantig'i
function updateWishlistUI() {
  localStorage.setItem("elegance_wishlist", JSON.stringify(wishlist));

  const badge = document.getElementById("wishlist-count");
  if (badge) {
    badge.textContent = wishlist.length;
    badge.classList.toggle("hidden", wishlist.length === 0);
  }

  const container = document.getElementById("wishlist-items");
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-50 flex items-center justify-center text-rose-300 text-2xl">
          <i class="fa-regular fa-heart"></i>
        </div>
        <h4 class="font-serif-luxury font-semibold text-lg text-stone-800 mb-1">Sevimlilar ro'yxati bo'sh</h4>
        <p class="text-xs text-stone-500 mb-6">Sizga yoqqan kiyimlarni yurakcha belgisini bosib saqlang</p>
      </div>
    `;
    return;
  }

  container.innerHTML = wishlist.map(item => `
    <div class="flex items-center gap-3 py-3 border-b border-rose-100/60">
      <img src="${item.images[0]}" alt="${item.title}" class="w-16 h-20 object-cover rounded-xl border border-rose-100 flex-shrink-0">
      <div class="flex-1 min-w-0">
        <h5 class="text-xs font-semibold text-stone-800 truncate mb-1">${item.title}</h5>
        <div class="text-xs font-bold text-rose-600 font-serif-luxury mb-2">
          ${formatPrice(item.price)}
        </div>
        <button onclick="quickAddToCart(${item.id}); toggleWishlist(${item.id});" class="text-[11px] px-3 py-1 bg-stone-900 text-white rounded-lg hover:bg-rose-500 transition font-medium flex items-center gap-1">
          <i class="fa-solid fa-bag-shopping text-[9px]"></i> Savatga olish
        </button>
      </div>
      <button onclick="toggleWishlist(${item.id})" class="text-stone-300 hover:text-rose-500 text-sm transition p-2" title="Olib tashlash">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join('');
}

function toggleWishlist(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  const index = wishlist.findIndex(w => w.id === productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`"${prod.title}" sevimlilardan olindi`, "🤍");
  } else {
    wishlist.push(prod);
    showToast(`"${prod.title}" sevimlilarga saqlandi!`, "💖");
  }

  updateWishlistUI();
  renderCatalog();
}

// 9. Tezkor Ko'rish Modali (Quick View Modal)
let currentModalProduct = null;
let selectedModalSize = null;
let selectedModalColor = null;
let modalQty = 1;

function openQuickView(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  currentModalProduct = prod;
  selectedModalSize = prod.sizes[0];
  selectedModalColor = prod.colors[0];
  modalQty = 1;

  const modal = document.getElementById("quickview-modal");
  if (!modal) return;

  // Ma'lumotlarni to'ldirish
  document.getElementById("qv-main-img").src = prod.images[0];
  
  // Thumbnails
  const thumbsContainer = document.getElementById("qv-thumbnails");
  if (thumbsContainer) {
    thumbsContainer.innerHTML = prod.images.map((img, idx) => `
      <button onclick="changeModalImage('${img}')" class="w-14 h-16 rounded-xl overflow-hidden border-2 border-transparent focus:border-rose-500 transition">
        <img src="${img}" class="w-full h-full object-cover">
      </button>
    `).join('');
  }

  document.getElementById("qv-title").textContent = prod.title;
  document.getElementById("qv-category").textContent = prod.categoryName;
  document.getElementById("qv-price").textContent = formatPrice(prod.price);
  
  const oldPriceEl = document.getElementById("qv-oldprice");
  if (prod.oldPrice) {
    oldPriceEl.textContent = formatPrice(prod.oldPrice);
    oldPriceEl.classList.remove("hidden");
  } else {
    oldPriceEl.classList.add("hidden");
  }

  document.getElementById("qv-description").textContent = prod.description;
  document.getElementById("qv-fabric").textContent = prod.fabric;

  // Sizes
  const sizesContainer = document.getElementById("qv-sizes");
  if (sizesContainer) {
    sizesContainer.innerHTML = prod.sizes.map((s, idx) => `
      <button onclick="selectModalSize('${s}', this)" class="size-pill px-3.5 py-1.5 text-xs font-semibold rounded-xl border border-stone-200 ${idx === 0 ? 'active' : 'bg-white text-stone-800 hover:border-stone-400'}">
        ${s}
      </button>
    `).join('');
  }

  // Colors
  const colorsContainer = document.getElementById("qv-colors");
  if (colorsContainer) {
    colorsContainer.innerHTML = prod.colors.map((c, idx) => `
      <div onclick="selectModalColor('${c.name}', '${c.hex}', this)" class="color-dot ${idx === 0 ? 'active' : ''}" style="background-color: ${c.hex}" title="${c.name}"></div>
    `).join('');
    document.getElementById("qv-color-name").textContent = prod.colors[0].name;
  }

  document.getElementById("qv-qty").textContent = modalQty;

  // Oynani ochish
  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.add("modal-active");
  }, 10);
}

function changeModalImage(src) {
  const main = document.getElementById("qv-main-img");
  if (main) main.src = src;
}

function selectModalSize(size, el) {
  selectedModalSize = size;
  document.querySelectorAll("#qv-sizes .size-pill").forEach(p => p.classList.remove("active"));
  el.classList.add("active");
}

function selectModalColor(name, hex, el) {
  selectedModalColor = { name, hex };
  document.querySelectorAll("#qv-colors .color-dot").forEach(d => d.classList.remove("active"));
  el.classList.add("active");
  document.getElementById("qv-color-name").textContent = name;
}

function changeModalQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  document.getElementById("qv-qty").textContent = modalQty;
}

function addModalToCart() {
  if (!currentModalProduct) return;
  addToCart(currentModalProduct, selectedModalSize, selectedModalColor, modalQty);
  closeQuickView();
}

function closeQuickView() {
  const modal = document.getElementById("quickview-modal");
  if (!modal) return;
  modal.classList.remove("modal-active");
  setTimeout(() => modal.classList.add("hidden"), 300);
}

// 10. Buyurtma Berish va Telegram Integratsiyasi
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Savatchangiz bo'sh!", "⚠️");
    return;
  }
  closeCart();

  const modal = document.getElementById("checkout-modal");
  if (!modal) return;

  // Chek xulosasini ko'rsatish
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal >= STORE_CONFIG.freeDeliveryThreshold ? 0 : STORE_CONFIG.standardDeliveryCost;
  let discountAmount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.percent / 100)) : 0;
  const grandTotal = subtotal - discountAmount + delivery;

  document.getElementById("checkout-items-summary").innerHTML = cart.map(item => `
    <div class="flex justify-between items-center text-xs py-1 border-b border-stone-100">
      <span class="truncate max-w-[200px] text-stone-700">${item.title} (${item.size}) x ${item.quantity}</span>
      <span class="font-semibold text-stone-900">${formatPrice(item.price * item.quantity)}</span>
    </div>
  `).join('');

  document.getElementById("checkout-total-val").textContent = formatPrice(grandTotal);

  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.add("modal-active"), 10);
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  if (!modal) return;
  modal.classList.remove("modal-active");
  setTimeout(() => modal.classList.add("hidden"), 300);
}

// Telegram va WhatsApp uchun xabarni chiroyli formatlash
function buildOrderMessage(formData) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal >= STORE_CONFIG.freeDeliveryThreshold ? 0 : STORE_CONFIG.standardDeliveryCost;
  let discountAmount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.percent / 100)) : 0;
  const grandTotal = subtotal - discountAmount + delivery;

  const now = new Date();
  const timeString = now.toLocaleString("uz-UZ", { dateStyle: "short", timeStyle: "short" });

  let text = `🌸 YANGI BUYURTMA - ${STORE_CONFIG.name}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📅 Vaqt: ${timeString}\n`;
  text += `👤 Mijoz: ${formData.name}\n`;
  text += `📞 Telefon: ${formData.phone}\n`;
  text += `📍 Manzil: ${formData.region}, ${formData.address}\n`;
  text += `🚚 Yetkazish turi: ${formData.deliveryType}\n`;
  text += `💳 To'lov usuli: ${formData.paymentType}\n`;
  if (formData.comment) {
    text += `📝 Izoh: ${formData.comment}\n`;
  }
  text += `\n🛍 TANLANGAN LIBOSLAR:\n`;

  cart.forEach((item, index) => {
    text += `${index + 1}. ${item.title}\n`;
    text += `   • O'lcham: ${item.size} | Rang: ${item.color ? item.color.name : 'Standart'}\n`;
    text += `   • ${item.quantity} dona x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}\n`;
  });

  text += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💰 Mahsulotlar: ${formatPrice(subtotal)}\n`;
  if (discountAmount > 0) {
    text += `🎁 Chegirma: -${formatPrice(discountAmount)} (${appliedCoupon.code})\n`;
  }
  text += `🚚 Yetkazib berish: ${delivery === 0 ? 'BEPUL' : formatPrice(delivery)}\n`;
  text += `⭐ JAMI TO'LOV: ${formatPrice(grandTotal)}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `✨ Bizni tanlaganingiz uchun tashakkur!`;

  return text;
}

function submitOrder(method = "telegram") {
  const name = document.getElementById("order-name").value.trim();
  const phone = document.getElementById("order-phone").value.trim();
  const region = document.getElementById("order-region").value;
  const address = document.getElementById("order-address").value.trim();
  const deliveryType = document.querySelector('input[name="delivery-method"]:checked')?.value || "Kuryer orqali eshikkacha";
  const paymentType = document.querySelector('input[name="payment-method"]:checked')?.value || "Click / Payme";
  const comment = document.getElementById("order-comment")?.value.trim() || "";

  if (!name) {
    showToast("Iltimos, ismingizni kiriting", "⚠️");
    document.getElementById("order-name").focus();
    return;
  }
  if (!phone || phone.length < 9) {
    showToast("Iltimos, to'g'ri telefon raqamingizni kiriting", "⚠️");
    document.getElementById("order-phone").focus();
    return;
  }
  if (!address) {
    showToast("Iltimos, yetkazib berish manzilini kiriting", "⚠️");
    document.getElementById("order-address").focus();
    return;
  }

  const formData = { name, phone, region, address, deliveryType, paymentType, comment };
  const messageText = buildOrderMessage(formData);

  if (method === "telegram") {
    const encoded = encodeURIComponent(messageText);
    const tgUrl = `https://t.me/${STORE_CONFIG.telegramUsername}?text=${encoded}`;
    window.open(tgUrl, "_blank");
  } else if (method === "whatsapp") {
    const encoded = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, "_blank");
  }

  // Muvaffaqiyat xabari va savatchani tozalash
  cart = [];
  appliedCoupon = null;
  updateCartUI();
  closeCheckoutModal();

  showToast("Buyurtmangiz qabul qilindi! Menejerimiz tez orada bog'lanadi 🌸", "🎉");
}

// 11. O'lchamlar Jadvali Modali (Size Guide)
function openSizeGuide() {
  const modal = document.getElementById("sizeguide-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.add("modal-active"), 10);
}

function closeSizeGuide() {
  const modal = document.getElementById("sizeguide-modal");
  if (!modal) return;
  modal.classList.remove("modal-active");
  setTimeout(() => modal.classList.add("hidden"), 300);
}

// 12. UI Drawer Boshqaruvi (Cart & Wishlist)
function openCart() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  const content = document.getElementById("cart-drawer-content");
  if (!drawer) return;

  drawer.classList.remove("pointer-events-none");
  backdrop.classList.add("active");
  content.classList.add("active");
}

function closeCart() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  const content = document.getElementById("cart-drawer-content");
  if (!drawer) return;

  backdrop.classList.remove("active");
  content.classList.remove("active");
  setTimeout(() => drawer.classList.add("pointer-events-none"), 350);
}

function openWishlist() {
  const drawer = document.getElementById("wishlist-drawer");
  const backdrop = document.getElementById("wishlist-backdrop");
  const content = document.getElementById("wishlist-drawer-content");
  if (!drawer) return;

  drawer.classList.remove("pointer-events-none");
  backdrop.classList.add("active");
  content.classList.add("active");
}

function closeWishlist() {
  const drawer = document.getElementById("wishlist-drawer");
  const backdrop = document.getElementById("wishlist-backdrop");
  const content = document.getElementById("wishlist-drawer-content");
  if (!drawer) return;

  backdrop.classList.remove("active");
  content.classList.remove("active");
  setTimeout(() => drawer.classList.add("pointer-events-none"), 350);
}

function scrollToCatalog() {
  const el = document.getElementById("catalog-section");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// 13. Event Listenerlar va Sahifa Yuklanishi
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  updateCartUI();
  updateWishlistUI();

  // Kategoriya tugmalari
  document.querySelectorAll(".category-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".category-pill").forEach(p => {
        p.classList.remove("bg-stone-900", "text-white");
        p.classList.add("bg-white", "text-stone-700");
      });
      pill.classList.remove("bg-white", "text-stone-700");
      pill.classList.add("bg-stone-900", "text-white");

      activeCategory = pill.dataset.category;
      renderCatalog();
    });
  });

  // Saralash tanlovi
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSort = e.target.value;
      renderCatalog();
    });
  }

  // Qidiruv maydoni
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderCatalog();
    });
  }

  // Narx slayderi
  const priceSlider = document.getElementById("price-slider");
  const priceDisplay = document.getElementById("price-value");
  if (priceSlider) {
    priceSlider.addEventListener("input", (e) => {
      maxPrice = parseInt(e.target.value);
      if (priceDisplay) priceDisplay.textContent = formatPrice(maxPrice);
      renderCatalog();
    });
  }

  // O'lcham filtrlari
  document.querySelectorAll(".size-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (selectedSize === btn.dataset.size) {
        selectedSize = "";
        btn.classList.remove("bg-rose-500", "text-white", "border-rose-500");
      } else {
        document.querySelectorAll(".size-filter-btn").forEach(b => {
          b.classList.remove("bg-rose-500", "text-white", "border-rose-500");
        });
        selectedSize = btn.dataset.size;
        btn.classList.add("bg-rose-500", "text-white", "border-rose-500");
      }
      renderCatalog();
    });
  });

  // Mobil menyu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});
