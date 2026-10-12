// ÉLÉGANCE Boutique - Admin va Do'kon Boshqaruvi Paneli

function openAdminModal() {
  const modal = document.getElementById("admin-modal");
  if (!modal) return;
  renderAdminProductsList();
  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.add("modal-active"), 10);
}

function closeAdminModal() {
  const modal = document.getElementById("admin-modal");
  if (!modal) return;
  modal.classList.remove("modal-active");
  setTimeout(() => modal.classList.add("hidden"), 300);
}

function renderAdminProductsList() {
  const container = document.getElementById("admin-products-table");
  if (!container) return;

  container.innerHTML = products.map(item => `
    <tr class="border-b border-stone-100 hover:bg-rose-50/30 transition text-xs">
      <td class="p-2.5">
        <div class="flex items-center gap-2">
          <img src="${item.images[0]}" class="w-9 h-11 object-cover rounded-lg border border-stone-200">
          <div>
            <div class="font-semibold text-stone-800 line-clamp-1">${item.title}</div>
            <div class="text-[10px] text-stone-400">${item.categoryName}</div>
          </div>
        </div>
      </td>
      <td class="p-2.5 font-semibold text-stone-800 font-serif-luxury">${formatPrice(item.price)}</td>
      <td class="p-2.5">
        <span class="px-2 py-0.5 text-[10px] bg-rose-100 text-rose-700 rounded-full font-medium">
          ${item.badge || 'Standart'}
        </span>
      </td>
      <td class="p-2.5 text-right">
        <button onclick="deleteProductFromAdmin(${item.id})" class="px-2 py-1 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="O'chirish">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function handleAddProduct(e) {
  e.preventDefault();

  const title = document.getElementById("admin-p-title").value.trim();
  const category = document.getElementById("admin-p-category").value;
  const price = parseInt(document.getElementById("admin-p-price").value);
  const oldPrice = parseInt(document.getElementById("admin-p-oldprice").value) || null;
  const badge = document.getElementById("admin-p-badge").value.trim();
  const fabric = document.getElementById("admin-p-fabric").value.trim();
  const imageUrl = document.getElementById("admin-p-image").value.trim();
  const description = document.getElementById("admin-p-desc").value.trim();

  // Selected sizes
  const sizes = Array.from(document.querySelectorAll('input[name="admin-size"]:checked')).map(el => el.value);
  const finalSizes = sizes.length > 0 ? sizes : ["S", "M", "L"];

  const categoryNamesMap = {
    dresses: "Ko'ylaklar",
    suits: "Klassik kostyumlar",
    casual: "Kundalik liboslar",
    evening: "Oqshom liboslari",
    outerwear: "Ustki kiyim"
  };

  const newProduct = {
    id: Date.now(),
    title,
    category,
    categoryName: categoryNamesMap[category] || "Liboslar",
    price,
    oldPrice,
    badge: badge || null,
    rating: 5.0,
    reviewsCount: 1,
    images: [
      imageUrl || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: finalSizes,
    colors: [
      { name: "Asosiy rang", hex: "#FCE7F3" }
    ],
    fabric: fabric || "Tabiiy sifatli mato",
    description: description || "Nafis va zamonaviy ayollar libosi.",
    isFeatured: true,
    isTrending: true
  };

  products.unshift(newProduct);
  saveProductsToStorage(products);
  
  // Tozalash va yangilash
  document.getElementById("admin-add-form").reset();
  renderAdminProductsList();
  renderCatalog();
  showToast(`"${title}" muvaffaqiyatli qo'shildi! 🌸`, "✅");
}

function deleteProductFromAdmin(id) {
  if (confirm("Haqiqatan ham bu mahsulotni o'chirmoqchimisiz?")) {
    products = products.filter(p => p.id !== id);
    saveProductsToStorage(products);
    renderAdminProductsList();
    renderCatalog();
    showToast("Mahsulot o'chirildi", "🗑️");
  }
}

function resetDefaultCatalog() {
  if (confirm("Barcha mahsulotlarni asl holatiga qaytarishni xohlaysizmi?")) {
    localStorage.removeItem("elegance_products");
    products = getStoredProducts();
    renderAdminProductsList();
    renderCatalog();
    showToast("Katalog asl holatiga qaytarildi", "🔄");
  }
}

// Do'kon aloqa ma'lumotlarini saqlash
function saveStoreSettings(e) {
  e.preventDefault();
  const phone = document.getElementById("admin-set-phone").value.trim();
  const tg = document.getElementById("admin-set-tg").value.trim().replace("@", "");
  const wa = document.getElementById("admin-set-wa").value.trim();

  if (phone) STORE_CONFIG.phone = phone;
  if (tg) STORE_CONFIG.telegramUsername = tg;
  if (wa) STORE_CONFIG.whatsappNumber = wa;

  localStorage.setItem("elegance_config", JSON.stringify(STORE_CONFIG));
  showToast("Sozlamalar saqlandi! Telegram va aloqa yangilandi 🌸", "💾");
}

document.addEventListener("DOMContentLoaded", () => {
  const savedConfig = localStorage.getItem("elegance_config");
  if (savedConfig) {
    try {
      Object.assign(STORE_CONFIG, JSON.parse(savedConfig));
    } catch(e) {}
  }

  const addForm = document.getElementById("admin-add-form");
  if (addForm) {
    addForm.addEventListener("submit", handleAddProduct);
  }

  const settingsForm = document.getElementById("admin-settings-form");
  if (settingsForm) {
    settingsForm.addEventListener("submit", saveStoreSettings);
  }
});
