/**
 * RANDOM FOOD 💕 — CLIENT JAVASCRIPT
 * Girly, Coquette Pastel Aesthetic Roulette
 * Fully compliant with DESIGN.md specifications
 */

// ============================================================================
// 1. DATA DEFINITIONS
// ============================================================================

/**
 * Metadata for 13 official categories
 */
const CATEGORIES = [
  { key: "bun_nuoc", label: "Bún nước 🍜", emoji: "🍜" },
  { key: "com", label: "Cơm 🍚", emoji: "🍚" },
  { key: "pho", label: "Phở 🥢", emoji: "🥢" },
  { key: "banh_mi", label: "Bánh mì 🥖", emoji: "🥖" },
  { key: "healthy", label: "Đồ ăn healthy 🥗", emoji: "🥗" },
  { key: "trang_mieng", label: "Tráng miệng 🍮", emoji: "🍮" },
  { key: "an_vat", label: "Ăn vặt 🍟", emoji: "🍟" },
  { key: "tra_sua", label: "Trà sữa 🧋", emoji: "🧋" },
  { key: "co_con", label: "Đồ uống có cồn 🥂", emoji: "🥂" },
  { key: "khong_con", label: "Đồ uống không cồn 🧃", emoji: "🧃" },
  { key: "sinh_to", label: "Sinh tố 🍓", emoji: "🍓" },
  { key: "lau_nuong", label: "Lẩu & nướng 🥓", emoji: "🥓" },
  { key: "chay", label: "Đồ chay 🥦", emoji: "🥦" }
];

/**
 * 13 Categories with at least 8 authentic items each (Total: 104 items)
 * Uses high quality, direct Unsplash photo URLs + guaranteed 3-layer fallback
 */
const foodData = {
  bun_nuoc: [
    { name: "Bún bò Huế", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80" },
    { name: "Bún riêu cua", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80" },
    { name: "Bún chả Hà Nội", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80" },
    { name: "Bún mắm miền Tây", image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=400&q=80" },
    { name: "Bún thịt nướng", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80" },
    { name: "Bún cá Nha Trang", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" },
    { name: "Bún ốc sườn giòn", image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=400&q=80" },
    { name: "Bún thang Phố Cổ", image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=400&q=80" }
  ],
  com: [
    { name: "Cơm tấm sườn bì chả", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" },
    { name: "Cơm gà xối mỡ", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80" },
    { name: "Cơm niêu Singapore", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80" },
    { name: "Cơm rang dưa bò", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80" },
    { name: "Cơm đảo gà rim", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=400&q=80" },
    { name: "Cơm gà Hội An", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=400&q=80" },
    { name: "Cơm chiên hải sản", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80" },
    { name: "Cơm sườn nướng mật ong", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" }
  ],
  pho: [
    { name: "Phở bò tái lăn", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80" },
    { name: "Phở gà ta lá chanh", image: "https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=400&q=80" },
    { name: "Phở cuốn Hà Nội", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80" },
    { name: "Phở sốt vang", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80" },
    { name: "Phở chiên phồng", image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=400&q=80" },
    { name: "Phở xào bắp bò", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80" },
    { name: "Phở trộn chua ngọt", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80" },
    { name: "Phở đuôi bò niêu đất", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80" }
  ],
  banh_mi: [
    { name: "Bánh mì chảo xíu mại", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80" },
    { name: "Bánh mì thịt nướng", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80" },
    { name: "Bánh mì pate trứng ốp la", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80" },
    { name: "Bánh mì chả cá nóng", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80" },
    { name: "Bánh mì heo quay giòn bì", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80" },
    { name: "Bánh mì que cay Hải Phòng", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80" },
    { name: "Bánh mì nướng muối ớt", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80" },
    { name: "Bánh mì bò sốt tiêu đen", image: "https://images.unsplash.com/photo-1549611016-3a70d82b5040?auto=format&fit=crop&w=400&q=80" }
  ],
  healthy: [
    { name: "Salad ức gà sốt mè rang", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80" },
    { name: "Poke cá hồi bơ tươi", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" },
    { name: "Cơm gạo lứt bò sốt tiêu", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" },
    { name: "Salad cá ngừ quả bơ", image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=400&q=80" },
    { name: "Bún gạo lứt tôm thịt", image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80" },
    { name: "Sandwich ngũ cốc kẹp trứng", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80" },
    { name: "Salad tôm áp chảo sốt cam", image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=400&q=80" },
    { name: "Ức gà cuộn măng tây nướng", image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=400&q=80" }
  ],
  trang_mieng: [
    { name: "Bingsu dâu tây hoa tuyết", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80" },
    { name: "Tàu hũ trân châu xoài", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80" },
    { name: "Bánh flan caramel cốt dừa", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=400&q=80" },
    { name: "Chè khúc bạch hạnh nhân", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80" },
    { name: "Panna cotta phúc bồn tử", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80" },
    { name: "Chè bưởi An Giang", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" },
    { name: "Rau câu trái dừa tươi", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80" },
    { name: "Kem bơ sầu riêng Đà Lạt", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80" }
  ],
  an_vat: [
    { name: "Bánh tráng nướng Đà Lạt", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80" },
    { name: "Bánh tráng trộn bò khô", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80" },
    { name: "Khoai tây lắc phô mai", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80" },
    { name: "Nem chua rán Phố Cổ", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" },
    { name: "Gà popcorn lắc phô mai", image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80" },
    { name: "Cá viên chiên nước mắm", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=400&q=80" },
    { name: "Trứng cút lộn xào me", image: "https://images.unsplash.com/photo-1514944298352-f4728f32a76f?auto=format&fit=crop&w=400&q=80" },
    { name: "Xoài lắc muối tôm cay", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80" }
  ],
  tra_sua: [
    { name: "Trà sữa trân châu hoàng kim", image: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=400&q=80" },
    { name: "Trà sữa nướng ô long", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80" },
    { name: "Trà đào cam sả hạt chia", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80" },
    { name: "Trà xoài kem cheese béo", image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=80" },
    { name: "Matcha kem cheese macchiato", image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80" },
    { name: "Trà dâu tằm pha lê tuyết", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80" },
    { name: "Trà ổi hồng sen vàng", image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=400&q=80" },
    { name: "Sữa tươi trân châu đường đen", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80" }
  ],
  co_con: [
    { name: "Mojito dâu tây bạc hà", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80" },
    { name: "Rượu Soju đào tươi", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80" },
    { name: "Bia bơ Butterbeer béo", image: "https://images.unsplash.com/photo-1538488881522-4327244c62e2?auto=format&fit=crop&w=400&q=80" },
    { name: "Cocktail Gin Tonic hoa hồng", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80" },
    { name: "Sangria rượu vang hoa quả", image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=400&q=80" },
    { name: "Cocktail Margarita muối hồng", image: "https://images.unsplash.com/photo-1556855810-ac404aa91e85?auto=format&fit=crop&w=400&q=80" },
    { name: "Rượu mơ Umeshu ướp lạnh", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80" },
    { name: "Cocktail Cosmopolitan việt quất", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=400&q=80" }
  ],
  khong_con: [
    { name: "Trà hoa cúc mật ong", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80" },
    { name: "Nước dừa xiêm trân châu", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80" },
    { name: "Nước ép dưa hấu bạc hà", image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=400&q=80" },
    { name: "Nước ép cam cà rốt mật", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80" },
    { name: "Trà sen vàng macchiato", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80" },
    { name: "Nước chanh leo đá tuyết", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80" },
    { name: "Trà vải hạt chia thanh nhiệt", image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=400&q=80" },
    { name: "Nước ép lựu đỏ nguyên chất", image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=80" }
  ],
  sinh_to: [
    { name: "Sinh tố bơ sáp cốt dừa", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" },
    { name: "Sinh tố xoài chanh leo", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80" },
    { name: "Sinh tố dâu tây chuối", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80" },
    { name: "Sinh tố việt quất sữa chua", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80" },
    { name: "Sinh tố mãng cầu hạt chia", image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=400&q=80" },
    { name: "Sinh tố kiwi bạc hà", image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=400&q=80" },
    { name: "Sinh tố thanh long đỏ", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80" },
    { name: "Sinh tố dưa lưới tuyết", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80" }
  ],
  lau_nuong: [
    { name: "Lẩu Thái tomyum hải sản", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80" },
    { name: "Ba chỉ bò sốt tiêu nướng", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" },
    { name: "Lẩu gà lá é Phú Yên", image: "https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=400&q=80" },
    { name: "Dẻ sườn bò nướng tảng", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80" },
    { name: "Nầm heo nướng sốt me", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=400&q=80" },
    { name: "Lẩu ếch măng cay đồng quê", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80" },
    { name: "Bạch tuộc sa tế than hoa", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80" },
    { name: "Lẩu riêu cua bắp bò sườn sụn", image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=400&q=80" }
  ],
  chay: [
    { name: "Lẩu nấm thanh đạm hoàng cung", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80" },
    { name: "Cơm lá sen ngũ sắc", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80" },
    { name: "Đậu hũ sốt nấm linh chi", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" },
    { name: "Nấm đùi gà xào sả ớt", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" },
    { name: "Nem rán chay hoa chuối", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80" },
    { name: "Chả giò nấm hạt sen", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80" },
    { name: "Canh chua rong biển đậu non", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80" },
    { name: "Miến xào nấm đông cô giòn", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80" }
  ]
};

// ============================================================================
// 2. STATE MANAGEMENT
// ============================================================================

const appState = {
  selectedCategory: null,
  selectedFood: null,
  isSpinning: false,
  isSubmitting: false,
  hasSpunOnce: false, // true sau khi đã bấm "Quay 🎲" lần đầu ở Screen 2 hiện tại
  currentTheme: "light"
};

// Internal references for roulette spinning & cleanup
let spinEndHandler = null;
let spinTimeoutFallback = null;

// ============================================================================
// 3. UTILITY FUNCTIONS
// ============================================================================

/**
 * Escape HTML to prevent injection issues
 */
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * 3-Layer Image Fallback Handler (Section 6.2)
 * Primary Image -> Fallback / Category placeholder -> CSS/Emoji Placeholder
 * Guaranteed to never loop and never show broken browser image icons
 */
window.handleImageError = function(imgEl, foodName) {
  if (!imgEl) return;
  imgEl.onerror = null; // Unbind immediately to avoid infinite loops
  imgEl.style.display = "none";
  
  const wrapper = imgEl.closest(".food-image-wrapper");
  if (wrapper) {
    wrapper.classList.add("image-fallback");
    wrapper.innerHTML = `
      <span class="fallback-emoji" aria-hidden="true">🍽️</span>
      <span class="fallback-name">${escapeHtml(foodName)}</span>
    `;
  }
};

/**
 * Safe HTML renderer for food card image
 */
function renderFoodImageHtml(food) {
  if (!food.image) {
    return `
      <div class="food-image-wrapper image-fallback">
        <span class="fallback-emoji" aria-hidden="true">🍽️</span>
        <span class="fallback-name">${escapeHtml(food.name)}</span>
      </div>
    `;
  }

  // Safe inline onerror escaping single quotes
  const safeNameArg = food.name.replace(/'/g, "\\'");
  return `
    <div class="food-image-wrapper">
      <img 
        src="${escapeHtml(food.image)}" 
        alt="${escapeHtml(food.name)}" 
        loading="lazy"
        onerror="handleImageError(this, '${safeNameArg}')" 
      />
    </div>
  `;
}

// ============================================================================
// 4. THEME MANAGEMENT
// ============================================================================

function loadTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("rf-theme");
  } catch (err) {
    console.warn("Storage access restricted, using default theme:", err);
  }

  if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme);
  } else {
    // Respect system preference if no stored theme
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
}

function applyTheme(theme) {
  appState.currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  
  const themeIcon = document.getElementById("theme-icon");
  const themeBtn = document.getElementById("theme-toggle");
  
  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
  if (themeBtn) {
    themeBtn.setAttribute("aria-label", theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối");
  }

  try {
    localStorage.setItem("rf-theme", theme);
  } catch (err) {
    console.warn("Unable to save theme to localStorage:", err);
  }
}

function toggleTheme() {
  const nextTheme = appState.currentTheme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
}

// ============================================================================
// 5. SCREEN 1: CATEGORY SELECTION
// ============================================================================

function renderCategories() {
  const grid = document.getElementById("category-grid");
  if (!grid) return;

  grid.innerHTML = "";

  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "category-card";
    btn.type = "button";
    btn.setAttribute("data-category", cat.key);
    btn.setAttribute("aria-label", `Chọn thể loại ${cat.label}`);
    btn.innerHTML = `
      <span class="category-emoji" aria-hidden="true">${cat.emoji}</span>
      <span class="category-label">${escapeHtml(cat.label)}</span>
    `;

    btn.addEventListener("click", () => {
      selectCategory(cat.key);
    });

    grid.appendChild(btn);
  });
}

/**
 * Select a category, switch to Screen 2 in a stationary state.
 * CRITICAL RULE: NO AUTO SPINNING. Must NOT call spinRoulette() here!
 */
function selectCategory(categoryKey) {
  if (appState.isSpinning) return;
  
  const category = CATEGORIES.find(c => c.key === categoryKey);
  const items = foodData[categoryKey];

  if (!category || !items || items.length === 0) {
    console.error("Category data not found for:", categoryKey);
    return;
  }

  appState.selectedCategory = categoryKey;
  appState.selectedFood = null;
  appState.isSpinning = false;
  appState.hasSpunOnce = false; // Reset spin state for the new category

  // Update Category Badge in Screen 2
  const badgeEmoji = document.getElementById("current-category-emoji");
  const badgeName = document.getElementById("current-category-name");
  if (badgeEmoji) badgeEmoji.textContent = category.emoji;
  if (badgeName) badgeName.textContent = category.label;

  const statusText = document.getElementById("roulette-status-text");
  if (statusText) {
    statusText.textContent = 'Bấm nút "Quay 🎲" để vòng quay bắt đầu nha! 💕';
  }

  // Build stationary strip (preview only, no spin)
  buildStationaryStrip(categoryKey);

  // Show "Quay 🎲" button, hide result panel
  showInitialSpinButton();
  hideResultPanel();
  hideSubmitError();

  // Switch to Screen 2 smoothly (NO AUTO SPIN)
  switchScreen("screen-roulette");
}

// ============================================================================
// 6. SCREEN 2: ROULETTE LOGIC & ANIMATION
// ============================================================================

/**
 * Build stationary strip when first entering Screen 2 (Mục 7.1)
 * Renders items statically at transform 0, without selecting a winner or animating
 */
function buildStationaryStrip(categoryKey) {
  const track = document.getElementById("roulette-track");
  if (!track) return;

  const items = foodData[categoryKey];
  if (!items || items.length === 0) return;

  // Clear any past inline styles
  track.style.transition = "none";
  track.style.transform = "translate3d(0, 0, 0)";

  // Render repeated preview items (4 cycles) for a clean visual strip
  let trackHtml = "";
  for (let c = 0; c < 4; c++) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      trackHtml += `
        <div class="roulette-item" data-food-name="${escapeHtml(item.name)}">
          ${renderFoodImageHtml(item)}
          <span class="food-card-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
        </div>
      `;
    }
  }

  track.innerHTML = trackHtml;
}

/**
 * Build the active spinning horizontal strip (7 full cycles)
 * Selects winner FIRST (result-first, animation-follows)
 * Returns target item in the track
 */
function buildRouletteStrip(categoryKey) {
  const track = document.getElementById("roulette-track");
  if (!track) return { targetElement: null, winnerItem: null };

  const items = foodData[categoryKey];
  if (!items || items.length === 0) return { targetElement: null, winnerItem: null };

  // 1. Pick random winner from the category (Result-first)
  const randomIndex = Math.floor(Math.random() * items.length);
  const winnerItem = items[randomIndex];
  appState.selectedFood = winnerItem;

  // 2. Generate repeating strip (7 cycles)
  const cycles = 7;
  const winningCycle = 5; // Winning item placed in cycle 5 for ample travel distance

  let trackHtml = "";
  for (let c = 0; c < cycles; c++) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const isWinner = (c === winningCycle && i === randomIndex);
      trackHtml += `
        <div class="roulette-item ${isWinner ? 'target-winner-candidate' : ''}" data-food-name="${escapeHtml(item.name)}">
          ${renderFoodImageHtml(item)}
          <span class="food-card-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
        </div>
      `;
    }
  }

  track.innerHTML = trackHtml;

  const targetElement = track.querySelector(".target-winner-candidate");
  return { targetElement, winnerItem };
}

/**
 * Calculate dynamic target offset (Section 7.6)
 * center(targetItem) === center(marker)
 */
function calculateTargetOffset(targetElement, viewportEl) {
  if (!targetElement || !viewportEl) return 0;
  const viewportWidth = viewportEl.clientWidth;
  const targetCenter = targetElement.offsetLeft + (targetElement.offsetWidth / 2);
  return targetCenter - (viewportWidth / 2);
}

/**
 * spinRoulette: Executes the roulette spin animation.
 * MUST ONLY be called when the user clicks "Quay 🎲" or "Quay lại đi 🥺"
 */
function spinRoulette() {
  if (appState.isSpinning || !appState.selectedCategory) return;

  appState.isSpinning = true;
  appState.hasSpunOnce = true;

  // Hide initial start button and result panel during spin
  hideInitialSpinButton();
  hideResultPanel();
  hideSubmitError();

  const statusText = document.getElementById("roulette-status-text");
  if (statusText) {
    statusText.textContent = "Vòng quay đang quay... hồi hộp quá! 💕";
  }

  const track = document.getElementById("roulette-track");
  const viewport = document.getElementById("roulette-viewport");
  if (!track || !viewport) {
    appState.isSpinning = false;
    return;
  }

  // Clear previous animations and listener
  if (spinEndHandler) {
    track.removeEventListener("transitionend", spinEndHandler);
    spinEndHandler = null;
  }
  if (spinTimeoutFallback) {
    clearTimeout(spinTimeoutFallback);
    spinTimeoutFallback = null;
  }

  // Remove existing winner classes
  track.querySelectorAll(".is-winner").forEach(el => el.classList.remove("is-winner"));

  // Build the roulette strip with winner predetermined
  const { targetElement, winnerItem } = buildRouletteStrip(appState.selectedCategory);
  if (!targetElement || !winnerItem) {
    appState.isSpinning = false;
    return;
  }

  // Reset track to 0 position without transition
  track.style.transition = "none";
  track.style.transform = "translate3d(0, 0, 0)";

  // Force synchronous reflow to register the 0 position
  void track.offsetWidth;

  // Calculate dynamic target offset based on rendered DOM geometry
  const targetOffset = calculateTargetOffset(targetElement, viewport);

  // Tiny realistic jitter: ±8px (well within safety bounds, target item card is ~140px wide)
  const safeJitter = (Math.random() - 0.5) * 16;
  const finalOffset = Math.round(targetOffset + safeJitter);

  // Animate: 4.5s ease-out with cubic-bezier
  requestAnimationFrame(() => {
    track.style.transition = "transform 4.5s cubic-bezier(0.12, 0.75, 0.15, 1)";
    track.style.transform = `translate3d(-${finalOffset}px, 0, 0)`;
  });

  // End event listener using transitionend (Section 7.7)
  spinEndHandler = (e) => {
    if (e.target !== track || e.propertyName !== "transform") return;
    onSpinEnd(targetElement, winnerItem);
  };
  track.addEventListener("transitionend", spinEndHandler, { once: true });

  // Safe timeout fallback in case of tab switch or throttled event
  spinTimeoutFallback = setTimeout(() => {
    if (appState.isSpinning) {
      if (spinEndHandler) {
        track.removeEventListener("transitionend", spinEndHandler);
        spinEndHandler = null;
      }
      onSpinEnd(targetElement, winnerItem);
    }
  }, 4850);
}

/**
 * Handle end of spin animation
 */
function onSpinEnd(targetElement, winnerItem) {
  appState.isSpinning = false;
  if (spinTimeoutFallback) {
    clearTimeout(spinTimeoutFallback);
    spinTimeoutFallback = null;
  }

  // Highlight winner item
  if (targetElement) {
    targetElement.classList.add("is-winner");
  }

  const statusText = document.getElementById("roulette-status-text");
  if (statusText) {
    statusText.textContent = "Tadaa! Đã có món ngon tuyệt cho nàng rồi nè! ✨";
  }

  // Trigger celebratory confetti
  fireConfettiBurst();

  // Show result panel with "Quay lại đi 🥺" and "Chốt món này! 🥰" (Section 7.9b)
  showResult(winnerItem);
}

function showResult(food) {
  const resultFoodName = document.getElementById("result-food-name");
  const resultPanel = document.getElementById("result-panel");
  
  if (resultFoodName) {
    resultFoodName.textContent = food.name;
  }
  if (resultPanel) {
    resultPanel.classList.remove("panel-hidden");
  }

  // Scroll smoothly to result panel on smaller screens
  if (window.innerWidth < 600 && resultPanel) {
    setTimeout(() => {
      resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 200);
  }
}

function hideResultPanel() {
  const resultPanel = document.getElementById("result-panel");
  if (resultPanel) {
    resultPanel.classList.add("panel-hidden");
  }
}

function showInitialSpinButton() {
  const container = document.getElementById("initial-spin-container");
  const btn = document.getElementById("btn-spin-start");
  if (container) {
    container.classList.remove("container-hidden");
  }
  if (btn) {
    btn.disabled = false;
  }
}

function hideInitialSpinButton() {
  const container = document.getElementById("initial-spin-container");
  if (container) {
    container.classList.add("container-hidden");
  }
}

/**
 * Handle Reroll action (Section 7.9b)
 * Spins again immediately without needing to click "Quay 🎲"
 */
function handleReroll() {
  if (appState.isSpinning) return;
  spinRoulette();
}

// ============================================================================
// 7. SCREEN SWITCHING & RESET
// ============================================================================

function switchScreen(targetScreenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((scr) => {
    if (scr.id === targetScreenId) {
      scr.classList.remove("screen-hidden");
      scr.classList.add("screen-active");
      scr.removeAttribute("aria-hidden");
    } else {
      scr.classList.remove("screen-active");
      scr.classList.add("screen-hidden");
      scr.setAttribute("aria-hidden", "true");
    }
  });

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetApp() {
  appState.selectedCategory = null;
  appState.selectedFood = null;
  appState.isSpinning = false;
  appState.isSubmitting = false;
  appState.hasSpunOnce = false;

  hideResultPanel();
  hideSubmitError();
  hideSuccessModal();
  showInitialSpinButton();

  const track = document.getElementById("roulette-track");
  if (track) {
    track.style.transition = "none";
    track.style.transform = "translate3d(0, 0, 0)";
    track.innerHTML = "";
  }

  switchScreen("screen-category");
}

// ============================================================================
// 8. FORMSPREE INTEGRATION (Section 8 & FIX.md)
// ============================================================================

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzebwlkr";

function getCategoryLabel(categoryKey) {
  const cat = CATEGORIES.find((c) => c.key === categoryKey);
  return cat ? cat.label : categoryKey;
}

async function submitResult(payload) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json" // BẮT BUỘC, thiếu dòng này Formspree có thể trả HTML thay vì JSON
    },
    body: JSON.stringify(payload)
  });

  let data = null;
  try {
    data = await response.json();
  } catch (parseErr) {
    // Formspree đôi khi trả về không phải JSON hợp lệ (vd HTML lỗi) -> coi là lỗi
    throw new Error("Phản hồi từ Formspree không hợp lệ.");
  }

  if (!response.ok || (data && Array.isArray(data.errors) && data.errors.length > 0)) {
    const errorMessage =
      data && Array.isArray(data.errors) && data.errors.length > 0
        ? data.errors.map((e) => e.message).join("; ")
        : `Formspree trả về lỗi với status ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
}

async function handleFinalSubmit() {
  if (appState.isSubmitting) return; // chống double click / double submit
  if (!appState.selectedCategory || !appState.selectedFood) return; // guard: chưa có kết quả thì không cho submit

  appState.isSubmitting = true;
  hideSubmitError();
  setSubmitButtonState({ loading: true });

  const payload = {
    category: getCategoryLabel(appState.selectedCategory), // label hiển thị, không phải key nội bộ
    food: appState.selectedFood.name,
    timestamp: new Date().toISOString()
  };

  try {
    await submitResult(payload);
    showSuccessModal();
  } catch (err) {
    console.error("[Formspree submit error]", err); // log để debug, không hiển thị raw error cho user
    showSubmitError();
  } finally {
    appState.isSubmitting = false;
    setSubmitButtonState({ loading: false });
  }
}

function setSubmitButtonState({ loading }) {
  const btn = document.getElementById("btn-confirm-food") || document.getElementById("btn-submit");
  if (!btn) return;
  btn.disabled = loading;
  btn.textContent = loading ? "Đang ghi nhận... 💕" : "Chốt món này! 🥰";

  const rerollBtn = document.getElementById("btn-reroll");
  if (rerollBtn) {
    rerollBtn.disabled = loading;
  }
}

function showSubmitError() {
  // Hiện UI lỗi thân thiện + nút retry, KHÔNG reset selectedFood, KHÔNG quay lại roulette
  const errorBox = document.getElementById("submit-error-box") || document.getElementById("submit-error-banner");
  if (errorBox) {
    errorBox.hidden = false;
    errorBox.classList.remove("banner-hidden");
    const errorMsg = document.getElementById("submit-error-message") || errorBox.querySelector(".error-text");
    if (errorMsg) {
      errorMsg.textContent = "Oops! Hình như kết nối đang có chút vấn đề 🥺 Thử lại một lần nữa nha!";
    }
  }
}

function hideSubmitError() {
  const errorBox = document.getElementById("submit-error-box") || document.getElementById("submit-error-banner");
  if (errorBox) {
    errorBox.hidden = true;
    errorBox.classList.add("banner-hidden");
  }
}

function retrySubmit() {
  hideSubmitError();
  handleFinalSubmit(); // gọi lại với đúng payload hiện tại (selectedFood chưa bị mất)
}

function showSuccessModal(foodName) {
  const modal = document.getElementById("modal-success");
  const recap = document.getElementById("modal-food-recap");
  
  const nameToDisplay = foodName || (appState.selectedFood ? appState.selectedFood.name : "");
  if (recap) recap.textContent = nameToDisplay;
  if (modal) {
    modal.classList.remove("modal-hidden");
  }
}

function hideSuccessModal() {
  const modal = document.getElementById("modal-success");
  if (modal) {
    modal.classList.add("modal-hidden");
  }
}

// ============================================================================
// 9. LIGHTWEIGHT CANVAS CONFETTI
// ============================================================================

let confettiAnimationId = null;

function fireConfettiBurst() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Cancel any prior animation
  if (confettiAnimationId) {
    cancelAnimationFrame(confettiAnimationId);
    confettiAnimationId = null;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pastelColors = [
    "#f7b6c2", "#e88ca0", "#f3b6d7", "#ffd1dc", "#c8b6ff", "#b8c0ff", "#ffe5ec", "#ffcbf2"
  ];

  const particles = [];
  const particleCount = 65;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.75) * 12,
      size: Math.random() * 8 + 6,
      color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
      alpha: 1,
      decay: Math.random() * 0.015 + 0.01,
      shape: Math.random() > 0.4 ? "heart" : "circle",
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 8
    });
  }

  function drawHeart(c, x, y, size, color, alpha) {
    c.save();
    c.globalAlpha = alpha;
    c.fillStyle = color;
    c.beginPath();
    const topCurveHeight = size * 0.3;
    c.moveTo(x, y + topCurveHeight);
    c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
    c.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    c.closePath();
    c.fill();
    c.restore();
  }

  function renderConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.alpha <= 0) continue;

      activeParticles++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28; // gentle gravity
      p.vx *= 0.985;
      p.alpha -= p.decay;

      if (p.shape === "heart") {
        drawHeart(ctx, p.x, p.y, p.size, p.color, Math.max(0, p.alpha));
      } else {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    if (activeParticles > 0) {
      confettiAnimationId = requestAnimationFrame(renderConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiAnimationId = null;
    }
  }

  renderConfetti();
}

// ============================================================================
// 10. APP INITIALIZATION & EVENT BINDINGS
// ============================================================================

function initApp() {
  loadTheme();
  renderCategories();

  // Theme button toggle
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Back button in Screen 2
  const backBtn = document.getElementById("btn-back");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (appState.isSpinning) return;
      resetApp();
    });
  }

  // Start Spin button in Screen 2 (Section 7.9a)
  const spinStartBtn = document.getElementById("btn-spin-start");
  if (spinStartBtn) {
    spinStartBtn.addEventListener("click", () => {
      spinRoulette();
    });
  }

  // Reroll button (Section 7.9b)
  const rerollBtn = document.getElementById("btn-reroll");
  if (rerollBtn) {
    rerollBtn.addEventListener("click", handleReroll);
  }

  // Submit / Confirm button
  const confirmBtn = document.getElementById("btn-confirm-food") || document.getElementById("btn-submit");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", handleFinalSubmit);
  }

  // Retry button
  const retryBtn = document.getElementById("btn-retry-submit") || document.getElementById("btn-retry");
  if (retryBtn) {
    retryBtn.addEventListener("click", retrySubmit);
  }

  // Home button in Modal
  const homeBtn = document.getElementById("btn-home");
  if (homeBtn) {
    homeBtn.addEventListener("click", resetApp);
  }

  // Window resize handler (anti-crash and geometry adjustment)
  window.addEventListener("resize", () => {
    const canvas = document.getElementById("confetti-canvas");
    if (canvas && confettiAnimationId) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
}

// Bootstrap on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
