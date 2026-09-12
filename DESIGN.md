# DESIGN.md — Random Food 💕
### Prompt kỹ thuật cho AI Coding Agent (Front-end + UI/UX + QA)

> Tài liệu này là **đặc tả kỹ thuật đầy đủ**, dùng làm prompt cho một AI coding agent để tự thiết kế, lập trình, kiểm thử và tự sửa lỗi một website tĩnh hoàn chỉnh. Agent phải đọc **toàn bộ** tài liệu trước khi viết dòng code đầu tiên, và phải tự đối chiếu lại với tài liệu này ở bước QA cuối cùng.

---

## 0. VAI TRÒ & CÁCH LÀM VIỆC

Bạn đóng đồng thời 3 vai trò:

1. **Senior Front-end Engineer** — chịu trách nhiệm chất lượng code, kiến trúc, performance.
2. **UI/UX Designer** — chịu trách nhiệm thẩm mỹ, trải nghiệm, responsive, accessibility.
3. **QA Engineer** — chịu trách nhiệm tự kiểm thử và tự sửa lỗi trước khi giao sản phẩm.

Bạn PHẢI tuân theo quy trình bắt buộc:

```
DESIGN → IMPLEMENT → SELF-VERIFY (đọc lại code) → TEST (theo checklist) →
FIND BUGS → FIX BUGS → RE-TEST → DELIVER FINAL CODE
```

Quy tắc cứng:

- **Không dừng ở bản nháp.** Chỉ được coi là hoàn thành khi đã tự chạy qua toàn bộ checklist ở Mục 12 và mọi mục đều PASS.
- **Không dùng pseudo-code.** Mọi đoạn code đưa ra phải là code thật, chạy được ngay sau khi copy.
- **Không mô tả lỗi rồi bỏ đó.** Nếu trong lúc tự review phát hiện lỗi (ảnh vỡ, roulette lệch marker, overflow, console error...), phải **sửa trực tiếp trong code** trước khi trả kết quả, không được viết kiểu "bạn cần tự sửa thêm...".
- **Không có backend.** Toàn bộ chạy bằng HTML/CSS/JS thuần, mở trực tiếp bằng trình duyệt hoặc static hosting.
- Nếu một yêu cầu trong tài liệu này mâu thuẫn với yêu cầu khác, ưu tiên: **không để website bị lỗi/crash > đúng UX mô tả > đúng thẩm mỹ mô tả**.

---

## 1. MỤC TIÊU SẢN PHẨM

Xây dựng website **Random Food 💕** giúp người dùng:

1. Chọn một **thể loại đồ ăn/đồ uống** (Screen 1).
2. Chuyển mượt sang **Random Food Roulette** (Screen 2), không reload trang.
3. Quay ngẫu nhiên để chọn ra một món trong category đã chọn.
4. Sau khi roulette dừng, được chọn: **quay lại** hoặc **chốt món**.
5. Khi chốt món, gửi kết quả (category, food, timestamp) tới **Formspree**.
6. Hoạt động tốt, không vỡ layout, không lỗi console trên Mobile / Tablet / Desktop.

Giao diện: đẹp, hiện đại, dễ thương nhưng không trẻ con, có thể dùng thực tế hằng ngày.

---

## 2. TECH STACK & CẤU TRÚC PROJECT

- HTML5, CSS3, Vanilla JavaScript ES6+.
- Không dùng framework/thư viện ngoài trừ khi thực sự cần thiết (ví dụ Google Fonts qua `<link>`). Không cài npm package, không cần bundler.
- Cấu trúc project bắt buộc (3 file tách biệt, để dễ bảo trì):

```text
random-food/
├── index.html
├── style.css
└── script.js
```

- Phải cung cấp **toàn bộ nội dung đầy đủ của cả 3 file**, không rút gọn, không viết "// phần còn lại tương tự".
- Code phải chạy được ngay khi mở `index.html` trực tiếp bằng trình duyệt (không yêu cầu server, trừ việc gọi Formspree cần mạng).

---

## 3. HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM)

### 3.1 Phong cách
Aesthetic, girly, Pinterest-style, coquette, soft pastel, cute nhưng không trẻ con, modern, clean, chic.

### 3.2 Bảng màu (khai báo bằng CSS Variables, không hard-code trong nhiều nơi)

**Light mode:**
- Pastel Pink, Peach, Lavender, Rose Gold, Baby Blue, Cream, Soft White.

**Dark mode** (không dùng `#000000` thuần):
- Nền: Deep Purple / Dark Plum / Dark Magenta / Burgundy Purple.
- Chữ: Soft Pink / Lavender / Cream / Pastel White.

Khai báo mẫu (agent tự chọn mã màu hex cụ thể, phải đảm bảo contrast đủ đọc — xem Mục 9):

```css
:root {
  --bg: #fdf6f0;
  --bg-secondary: #fce8ec;
  --text: #4a3f4d;
  --text-secondary: #8a7a8c;
  --card: #ffffff;
  --accent: #f7b6c2;
  --accent-strong: #e88ca0;
  --border: #f3d1d8;
  --shadow: rgba(232, 140, 160, 0.25);
}

[data-theme="dark"] {
  --bg: #2b1f36;
  --bg-secondary: #3a2a46;
  --text: #f6e9f2;
  --text-secondary: #d8b8d6;
  --card: #3f2d4d;
  --accent: #d9a5c4;
  --accent-strong: #f0c2dc;
  --border: #5a3f66;
  --shadow: rgba(0, 0, 0, 0.4);
}
```

- Toàn bộ màu trong CSS phải tham chiếu qua biến trên, **không hard-code hex trực tiếp** trong rule của component.
- Theme lưu bằng `localStorage` (key ví dụ `"rf-theme"`), khi reload phải giữ theme cũ. Nếu chưa có giá trị trong localStorage, tôn trọng `prefers-color-scheme` của hệ thống làm mặc định, sau đó fallback về light.

### 3.3 Typography
- Google Fonts: Quicksand / Comfortaa / Nunito (chọn tối đa 2 font: 1 cho heading, 1 cho body).
- Có hierarchy rõ ràng (h1/h2/body/caption), responsive bằng `clamp()`.
- Không dùng quá 2 font-family.

### 3.4 Component style chung
Card, Button, Modal, Roulette item, Result card đều phải có:
```css
border-radius: (8–20px tuỳ component)
box-shadow mềm (dùng var(--shadow))
transition mượt (150–300ms, ease)
```
- Có thể dùng glassmorphism nhẹ (`backdrop-filter: blur(6–10px)`) nhưng **không được làm giảm khả năng đọc chữ** — mọi text trên nền blur phải đảm bảo contrast ratio ≥ 4.5:1.
- Hover button: scale nhẹ (1.02–1.05), hoặc translateY(-2px), hoặc bounce nhẹ bằng `cubic-bezier`. Không animation giật mạnh.

---

## 4. SCREEN 1 — CATEGORY SELECTION

- Tiêu đề: **"Hôm nay công chúa ăn gì? 👑"** + subtitle ngắn tuỳ chọn.
- Góc màn hình có nút chuyển theme: icon `☀️ / 🌙` (dùng `<button aria-label="Chuyển giao diện sáng/tối">`).
- Grid category responsive (auto-fill/auto-fit với `minmax()`), gồm đúng 13 category, mỗi category 1 card:

| # | Category (key nội bộ) | Label hiển thị |
|---|---|---|
| 1 | `bun_nuoc` | Bún nước 🍜 |
| 2 | `com` | Cơm 🍚 |
| 3 | `pho` | Phở 🥢 |
| 4 | `banh_mi` | Bánh mì 🥖 |
| 5 | `healthy` | Đồ ăn healthy 🥗 |
| 6 | `trang_mieng` | Tráng miệng 🍮 |
| 7 | `an_vat` | Ăn vặt 🍟 |
| 8 | `tra_sua` | Trà sữa 🧋 |
| 9 | `co_con` | Đồ uống có cồn 🥂 |
| 10 | `khong_con` | Đồ uống không cồn 🧃 |
| 11 | `sinh_to` | Sinh tố 🍓 |
| 12 | `lau_nuong` | Lẩu & nướng 🥓 |
| 13 | `chay` | Đồ chay 🥦 |

Mỗi card category:
- Có emoji, tên, hover animation (nổi nhẹ + shadow rõ hơn + border pastel highlight), `cursor: pointer`.
- Là phần tử focus/keyboard-accessible được (dùng thẻ `<button>` thật, không dùng `<div onclick>`).

---

## 5. FOOD DATA (JavaScript)

Cấu trúc dữ liệu rõ ràng, key trùng với key category ở Mục 4:

```javascript
const foodData = {
  bun_nuoc: [
    { name: "Bún bò Huế", image: "..." },
    { name: "Bún riêu cua", image: "..." },
    { name: "Bún chả Hà Nội", image: "..." },
    { name: "Bún mắm", image: "..." },
    { name: "Bún thịt nướng", image: "..." },
    { name: "Bún cá", image: "..." },
    { name: "Bún ốc", image: "..." },
    { name: "Bún ngan", image: "..." }
  ],
  // ... tương tự cho 12 category còn lại
};
```

Yêu cầu:
- Mỗi category **tối thiểu 5 món**, khuyến nghị 8–10 món.
- Tên món phải là tên món ăn/đồ uống thật, phù hợp category, **không dùng placeholder** kiểu `"Food 1"`, `"Item 1"`.
- Mỗi món bắt buộc có `name` và `image`.
- Trước khi hoàn thành, agent phải tự đếm lại số món mỗi category để đảm bảo ≥ 5 (đây là một bước bắt buộc trong Self-Test, Mục 12).

---

## 6. CHIẾN LƯỢC HÌNH ẢNH (BẮT BUỘC ĐỌC KỸ)

Đây là phần dễ gây lỗi nhất của một site tĩnh vì ảnh ngoài dễ bị 404/hotlink-block/redirect.

### 6.1 Nguyên tắc chọn nguồn ảnh
- Ưu tiên URL ảnh ổn định, không dùng URL tạm/preview/redirect dễ hết hạn.
- Nếu dùng Unsplash, chỉ dùng dạng URL ảnh trực tiếp ổn định (`images.unsplash.com/photo-...`), không dùng link chia sẻ trang (`unsplash.com/photos/...`).
- **Khuyến nghị an toàn nhất:** với món ăn Việt Nam vốn khó tìm ảnh stock ổn định, ưu tiên dùng **emoji + placeholder card đẹp bằng CSS** làm hình ảnh chính thay vì phụ thuộc ảnh ngoài, hoặc dùng ảnh ngoài kèm fallback bắt buộc như Mục 6.2. Agent được quyền tự quyết định, miễn là kết quả cuối cùng **không bao giờ hiển thị ảnh vỡ**.

### 6.2 Cơ chế fallback 3 lớp (bắt buộc áp dụng cho MỌI ảnh món ăn)

```
Primary Image (từ foodData)
      ↓ onerror
Fallback Image (ảnh chung theo category, hoặc ảnh generic)
      ↓ onerror
CSS/Emoji Placeholder (luôn hoạt động 100%, không phụ thuộc mạng)
```

Yêu cầu kỹ thuật cụ thể:
- Dùng `img.onerror` (không dùng thư viện ngoài) để bắt lỗi tải ảnh.
- `onerror` handler phải **tự gỡ chính nó** sau khi kích hoạt fallback (tránh loop vô hạn nếu ảnh fallback cũng lỗi):

```javascript
function handleImageError(imgEl, foodName) {
  imgEl.onerror = null; // tránh loop nếu fallback cũng lỗi
  imgEl.style.display = "none";
  const placeholder = imgEl.closest(".food-image-wrapper");
  if (placeholder) {
    placeholder.classList.add("image-fallback");
    placeholder.innerHTML = `<span class="fallback-emoji" aria-hidden="true">🍽️</span><span class="fallback-name">${foodName}</span>`;
  }
}
```

- Placeholder CSS phải đẹp (gradient pastel/nền `--card`), tương thích cả light/dark mode, và **giữ nguyên kích thước/aspect-ratio của card** — không được co lại, không được đẩy layout.
- Tuyệt đối không để lộ: broken image icon mặc định của browser, khung trắng trống, alt text tràn giao diện, card vỡ layout.
- Alt text luôn có (`alt="Tên món"`), nhưng không được hiển thị ra UI khi ảnh lỗi (vì đã bị `display:none` và thay bằng placeholder).

### 6.3 Loading state & chống layout shift
- Ảnh dùng `loading="lazy"` khi phù hợp (trừ ảnh trong roulette đang hiển thị ngay).
- Container ảnh có `aspect-ratio` cố định (ví dụ `4/3` hoặc `1/1`) + `object-fit: cover`, để không bị layout shift dù ảnh chưa tải/tải lỗi.
- Có background placeholder màu (skeleton nhẹ) trong lúc ảnh đang tải.

---

## 7. SCREEN 2 — RANDOM FOOD ROULETTE

### 7.1 Chuyển màn hình

- Khi click category: Screen 1 ẩn, Screen 2 hiện, có transition mượt (fade/slide/scale nhẹ), **không reload trang**.
- **QUAN TRỌNG — KHÔNG ĐƯỢC TỰ ĐỘNG QUAY:** Khi vừa chuyển sang Screen 2, roulette chỉ được **dựng sẵn ở trạng thái đứng yên** (build strip, render item, nhưng `transform` ở vị trí mặc định/ban đầu, KHÔNG chạy animation quay). Việc quay **chỉ được bắt đầu khi người dùng bấm nút "Quay 🎲"** (xem Mục 7.9a). Đây là hành vi bắt buộc, không phải tuỳ chọn.
- Ngay khi vào Screen 2, hiển thị:
  - Roulette strip ở trạng thái tĩnh (có thể hiện preview vài món đầu của category, hoặc để trống/mờ nhẹ chờ quay).
  - Nút **"Quay 🎲"** (hoặc text tương đương), là hành động **duy nhất** để bắt đầu animation quay.
  - Không hiển thị nút "Quay lại đi 🥺" / "Chốt món này! 🥰" ở giai đoạn này — 2 nút đó chỉ xuất hiện **sau khi** roulette đã dừng và có kết quả (xem Mục 7.9).
- `isSpinning` phải là `false` khi mới vào Screen 2; nút "Quay 🎲" bị disable trong lúc `isSpinning === true`, và ẩn/thay thế bằng 2 nút hành động sau khi có kết quả.

### 7.2 Roulette UI
- Lấy cảm hứng từ CSGO/CS2 case-opening roulette nhưng thiết kế theo theme girly (pastel, bo tròn, không góc cạnh sắc/quân sự).
- Là một horizontal strip (`.roulette-track`) nằm trong viewport có `overflow: hidden` (`.roulette-viewport`), chứa nhiều `.roulette-item` (ảnh + tên món, bo góc, shadow nhẹ).

### 7.3 Marker kết quả
- Nằm cố định chính giữa viewport theo chiều ngang, dùng: `left: 50%; transform: translateX(-50%);` (hoặc flex/grid tương đương), **không phụ thuộc vào breakpoint**.
- Biểu tượng: 💖 / 🎀 / 💗 hoặc mũi tên pastel — không dùng vạch đỏ đơn giản.
- Marker nằm trên track (z-index cao hơn), không cản trở việc đọc tên món phía dưới nó khi cần.

### 7.4 Sinh dữ liệu strip
- Không render danh sách category đúng 1 lần. Lặp lại danh sách nhiều lần (ví dụ 6–10 vòng) để strip đủ dài, tạo cảm giác quay nhanh trong vài giây, và **không để lộ khoảng trắng ở cuối** trong suốt animation.
- Item trúng thưởng (`winningIndex`) phải nằm ở một vị trí đủ xa về phía cuối strip (không phải vòng đầu) để animation có đủ quãng đường quay.

### 7.5 Random hoá kết quả
- Việc chọn ngẫu nhiên và bắt đầu animation **chỉ được kích hoạt bởi hành động click của người dùng vào nút "Quay 🎲"** (`spinRoulette()` được gọi từ `onClick` của nút này) — tuyệt đối không tự gọi `spinRoulette()` ngay trong `selectCategory()` hay trong bất kỳ hàm khởi tạo Screen 2 nào.
- Dùng `Math.random()` để chọn ngẫu nhiên 1 món trong category **trước khi** animation bắt đầu chạy (result-first, animation-follows).
- Animation phải dừng chính xác tại phần tử đại diện cho món đã chọn.

### 7.6 Tính offset (CỰC KỲ QUAN TRỌNG — nguồn lỗi phổ biến nhất)

Không hard-code `translateX(px)`. Phải tính động dựa trên DOM thực tế, tại thời điểm bắt đầu quay (sau khi DOM đã render và có kích thước thật):

```javascript
function calculateTargetOffset(targetElement, viewportEl) {
  const viewportWidth = viewportEl.clientWidth;
  const targetCenter = targetElement.offsetLeft + targetElement.offsetWidth / 2;
  return targetCenter - viewportWidth / 2;
}
```

Yêu cầu:
- Phải tính lại mỗi lần quay (không cache offset cũ, vì layout có thể thay đổi do resize).
- Phải tính đến: card width thực tế (không giả định fixed width nếu CSS responsive), gap giữa item (`gap` trong flex/grid), padding của track/viewport.
- Mục tiêu bắt buộc đạt được: `center(targetItem) === center(marker)` sau khi animation dừng — sai lệch cho phép ≤ vài pixel do làm tròn.
- Nên thêm một khoảng random nhỏ (jitter vài px) trong phạm vi an toàn để tránh cảm giác máy móc — **nhưng không được làm lệch tâm quá mức chấp nhận** (tối đa lệch phải luôn nhỏ hơn 1/3 bề rộng item, và không bao giờ khiến item liền kề trông giống trúng thưởng).

### 7.7 Animation quay
- Thời lượng: 4–5 giây.
- Đường cong: nhanh → vừa → chậm → dừng (ease-out rõ rệt), không dừng đột ngột. Dùng `transition: transform 4.5s cubic-bezier(0.12, 0.75, 0.15, 1)` hoặc Web Animations API tương đương.
- Xác định thời điểm animation **thật sự** kết thúc bằng event (`transitionend` hoặc `animationend`), không chỉ dựa vào `setTimeout` cứng. Có thể dùng `setTimeout` làm **fallback an toàn** (phòng trường hợp event không bắn, ví dụ tab mất focus) nhưng logic chính phải theo event.
- Trong lúc quay: khoá toàn bộ input liên quan (`isSpinning = true` → disable nút quay/chọn category khác/spam click), mở khoá lại khi animation thật sự kết thúc.

### 7.8 Kết quả & hiệu ứng
- Card thắng: scale nhẹ + glow pastel + border highlight, có thể pulse nhẹ (label "✨ WINNER ✨" tuỳ chọn), tránh rối mắt.
- Confetti nhẹ quanh winner (CSS/Canvas/JS thuần, không dùng thư viện ngoài nặng), không được chặn tương tác người dùng (`pointer-events: none` trên lớp confetti).

### 7.9a Nút bắt đầu quay (bắt buộc, trạng thái mặc định của Screen 2)
- **"Quay 🎲"**: là nút duy nhất hiển thị khi vừa vào Screen 2 hoặc sau khi bấm "Về trang chủ 🏠" rồi chọn lại category. Click nút này mới gọi `spinRoulette()`.
- Sau khi bấm, nút này ẩn đi (hoặc disable + đổi trạng thái) cho đến khi animation kết thúc; lúc đó chuyển sang hiển thị 2 nút ở Mục 7.9b.

### 7.9b Hành động sau khi có kết quả (chỉ xuất hiện sau khi roulette đã dừng)
- **"Quay lại đi 🥺"**: reset trạng thái roulette, chọn kết quả mới, quay lại animation **ngay lập tức** (đây là hành động reroll — không cần bấm lại nút "Quay 🎲"), không reload trang, không chồng animation cũ (huỷ animation trước nếu còn đang chạy), không giữ lại class `.winner` cũ, không add trùng event listener.
- **"Chốt món này! 🥰"**: gửi kết quả tới Formspree (Mục 8).

> Lưu ý phân biệt: nút **"Quay 🎲"** (7.9a) chỉ dùng cho lần quay **đầu tiên** sau khi vào Screen 2; nút **"Quay lại đi 🥺"** (7.9b) dùng để **quay lại (reroll)** sau khi đã có kết quả. Hai nút này không được gộp làm một và không được tự kích hoạt lẫn nhau.

---

## 8. GỬI KẾT QUẢ (FORMSPREE)

### 8.1 Dữ liệu gửi
```javascript
{
  category: "...",   // label hiển thị hoặc key, ghi rõ cái nào
  food: "...",
  timestamp: "..."   // chứa đủ ngày/tháng/năm/giờ/phút/giây, dùng ISO string hoặc local datetime rõ ràng
}
```

### 8.2 Gọi API
```javascript
async function submitResult(payload) {
  const response = await fetch("https://formspree.io/f/mzebwlkr", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Submit failed with status " + response.status);
  return response.json();
}
```
- Không submit theo kiểu native form (tránh reload trang) — luôn dùng `fetch` + `event.preventDefault()` nếu có bọc trong `<form>`.

### 8.3 Trạng thái khi gửi
- Khi đang gửi: nút đổi text thành **"Đang ghi nhận... 💕"** và bị `disabled` (chống spam request).
- Bọc bằng `try / catch / finally`, `finally` luôn dùng để mở lại nút (trừ khi đã thành công và chuyển màn hình).

### 8.4 Thành công
- Hiện modal: **"Lựa chọn đã được ghi nhận! Chúc nàng ăn ngon miệng nha! 💖"**, có nút **"Về trang chủ 🏠"**.
- Click nút đó: đóng modal, reset toàn bộ state roulette, quay lại Screen 1, không reload trang.

### 8.5 Thất bại
- Không được giả vờ báo thành công.
- Hiện message thân thiện: *"Oops! Hình như kết nối đang có chút vấn đề 🥺 Thử lại một lần nữa nha!"*, kèm nút **retry**.
- Không làm mất kết quả hiện tại (giữ nguyên winner đã chọn để retry gửi lại, không quay roulette lại).

---

## 9. RESPONSIVE & ACCESSIBILITY

### 9.1 Responsive (mobile-first)
- Test tối thiểu ở các breakpoint: 320 / 375 / 390 / 430 / 768 / 1024px+.
- Không có horizontal overflow ngoài phạm vi roulette viewport (viewport roulette được phép overflow nội bộ nhưng bản thân trang không được scroll ngang).
- Category grid tự điều chỉnh số cột hợp lý theo màn hình.
- Text không tràn/cắt chữ xấu; button có kích thước chạm tối thiểu ~44px.
- Marker roulette luôn ở đúng giữa viewport ở mọi kích thước màn hình.

### 9.2 Accessibility
- Mọi `<img>` có `alt`.
- Icon-only button (theme toggle, close modal...) có `aria-label`.
- Dùng `<button>` thật cho mọi phần tử bấm được (không `<div onclick>`).
- Focus state rõ ràng (`:focus-visible` với outline/box-shadow tương phản).
- Contrast text/nền đạt mức đọc được rõ ràng ở cả 2 theme (ước lượng ≥ 4.5:1 cho text thường).
- Không dùng màu là cách DUY NHẤT để biểu thị trạng thái (ví dụ winner phải có thêm icon/border, không chỉ đổi màu).

---

## 10. QUẢN LÝ STATE & CHẤT LƯỢNG CODE

### 10.1 State tối thiểu cần quản lý (gom trong 1 object hoặc module scope, hạn chế biến global rời rạc)
```javascript
const appState = {
  selectedCategory: null,
  selectedFood: null,
  isSpinning: false,
  isSubmitting: false,
  hasSpunOnce: false, // true sau khi đã bấm "Quay 🎲" lần đầu ở Screen 2 hiện tại
  currentTheme: "light"
};
```
- Reset đúng lúc: khi reroll (reset `selectedFood`, giữ `hasSpunOnce = true`, không reset category), khi về trang chủ (reset toàn bộ trừ theme, đưa `hasSpunOnce` về `false`), khi chọn category khác (reset toàn bộ trừ theme, đưa `hasSpunOnce` về `false`).
- `hasSpunOnce` dùng để quyết định UI hiển thị nút nào: `false` → hiển thị nút "Quay 🎲" (Mục 7.9a); `true` và đã có kết quả → hiển thị 2 nút "Quay lại đi 🥺" / "Chốt món này! 🥰" (Mục 7.9b).

### 10.2 Cấu trúc hàm gợi ý
```javascript
initApp()
loadTheme() / toggleTheme()
renderCategories()
selectCategory(categoryKey)
buildRouletteStrip(categoryKey)
spinRoulette()
calculateTargetOffset(targetEl, viewportEl)
onSpinEnd()
showResult(food)
handleReroll()
submitResult(payload)
showSuccessModal() / showErrorMessage()
resetApp()
handleImageError(imgEl, foodName)
```
Agent có thể tổ chức khác nếu hợp lý hơn, miễn giữ nguyên tắc: mỗi hàm một trách nhiệm, tên biến/hàm rõ nghĩa tiếng Anh, không quá nhiều biến global rời rạc.

### 10.3 Cấm kỵ
- Không hard-code `translateX(px)` không liên quan tới DOM thật.
- Không dùng `setTimeout` làm cơ chế **duy nhất** để biết animation kết thúc (chỉ được dùng làm fallback).
- Không để lặp code kiểm tra ảnh lỗi rải rác nhiều nơi — gom vào 1 hàm dùng chung.

---

## 11. XỬ LÝ LỖI BẮT BUỘC (KHÔNG ĐƯỢC CRASH KHI)

Website tuyệt đối không được crash / hiển thị lỗi xấu khi gặp các tình huống sau — với mỗi tình huống phải có fallback graceful:

| Tình huống | Yêu cầu xử lý |
|---|---|
| Ảnh lỗi/404 | Kích hoạt fallback 3 lớp (Mục 6.2) |
| Một món thiếu `image` | Coi như lỗi ảnh ngay từ đầu, hiển thị placeholder luôn, không gọi `<img>` với `src` rỗng |
| Formspree lỗi/network fail | Hiện message lỗi thân thiện + nút retry, không mất kết quả hiện tại |
| Người dùng spam nút | Disable nút trong lúc `isSpinning`/`isSubmitting` = true |
| Resize khi đang dùng | Không crash; nếu đang quay, không bắt buộc tính lại animation giữa chừng, nhưng lần quay tiếp theo phải tính lại đúng theo layout mới |
| localStorage không có giá trị / bị chặn (private mode) | Bọc `try/catch` quanh mọi thao tác localStorage, fallback về theme mặc định nếu lỗi |
| Category không tồn tại trong `foodData` | Kiểm tra tồn tại trước khi truy cập, log cảnh báo console (dev-only), không throw lỗi làm vỡ UI |
| DOM element không tìm thấy (lỗi lập trình) | Luôn kiểm tra `null` trước khi thao tác (`if (el) {...}`), không để `Uncaught TypeError` |

---

## 12. SELF-TEST BẮT BUỘC (AGENT PHẢI TỰ CHẠY QUA TRƯỚC KHI GIAO KẾT QUẢ)

Sau khi viết xong code, **không được kết thúc ngay**. Agent phải tự đối chiếu (đọc lại toàn bộ code, truy vết logic bằng tay) theo từng test sau và xác nhận PASS/FAIL. Nếu FAIL bất kỳ mục nào → sửa code → chạy lại toàn bộ checklist từ đầu.

**Test 1 – Initial Load:** Không có lỗi cú pháp JS; toàn bộ 13 category hiển thị đủ; font áp dụng đúng; layout ban đầu không vỡ ở cả light/dark.

**Test 2 – Images:** Mọi ảnh có cấu hình `onerror`; giả lập trường hợp URL sai → xác nhận fallback 3 lớp hoạt động đúng thứ tự; card không đổi kích thước khi ảnh lỗi (kiểm tra bằng `aspect-ratio`/kích thước cố định trong CSS).

**Test 3 – Theme:** Light→Dark, Dark→Light, reload trang → theme giữ nguyên; kiểm tra thao tác localStorage có bọc try/catch.

**Test 4 – Category:** Mỗi category khi click chỉ load đúng data của nó, không lẫn món category khác; số món mỗi category ≥ 5.

**Test 5 – Roulette alignment:** Truy vết bằng tay công thức `calculateTargetOffset` với vài bộ số liệu giả định (card width, gap, viewport width khác nhau) để xác nhận `center(targetItem) === center(marker)`; đảm bảo `winningIndex` xác định trước animation và không bị đổi trong lúc chạy.

**Test 6 – Reroll:** Reroll không chồng animation cũ (có huỷ/replace transition trước đó); không giữ class `.winner` cũ; không add trùng event listener (dùng cách gán handler ổn định, không `addEventListener` lặp lại mỗi lần render).

**Test 7 – Formspree:** Payload đúng field `category/food/timestamp`; đúng endpoint; có xử lý success/error/network-failure riêng biệt; nút bị disable đúng lúc gửi.

**Test 8 – Responsive:** Kiểm tra logic/CSS ở tối thiểu 375 / 768 / 1440px — không overflow ngang ngoài ý muốn, marker vẫn ở giữa.

**Test 9 – Console cleanliness:** Không có (về mặt logic) `Uncaught TypeError`, `ReferenceError`, `Unhandled Promise Rejection`, hay 404 ảnh do chính code chủ động tạo ra mà không có fallback đi kèm.

**Test 10 – Data integrity (bổ sung):** Đếm số phần tử từng key trong `foodData`, xác nhận không category nào < 5 món và không có tên món placeholder kiểu "Food 1".

**Test 11 – No auto-spin (bổ sung, quan trọng):** Xác nhận `spinRoulette()` KHÔNG được gọi ở bất kỳ đâu trong luồng chuyển màn hình (`selectCategory()`, hàm khởi tạo Screen 2, hoặc trong `resetApp()`). Xác nhận Screen 2 khi vừa hiện ra luôn ở trạng thái đứng yên với nút "Quay 🎲" hiển thị, và `isSpinning`/`hasSpunOnce` đều ở giá trị mặc định (`false`). Chỉ khi giả lập click vào nút "Quay 🎲" thì `spinRoulette()` mới được gọi.

---

## 13. QUY TRÌNH AUTO-FIX

Nếu Self-Test (Mục 12) phát hiện bất kỳ lỗi nào (ảnh không hiển thị, broken URL, roulette lệch marker, layout overflow, spam được nút, lỗi form submit, dark mode lỗi, mobile vỡ...):

- **Phải sửa trực tiếp trong source code** trước khi trả kết quả cuối cùng.
- Không được kết thúc bằng câu như *"có thể còn lỗi..."* hoặc *"bạn tự sửa thêm..."*.
- Sau khi sửa, chạy lại toàn bộ Mục 12 (không chỉ mục vừa sửa) trước khi coi là DONE.

---

## 14. PERFORMANCE & UX POLISH

- Lazy load ảnh khi phù hợp; không tạo DOM vô hạn (giới hạn số vòng lặp lại của roulette strip ở mức hợp lý, ví dụ 6–10 vòng, không phải hàng nghìn phần tử).
- Không load thư viện lớn không cần thiết.
- Roulette dùng `transform: translate3d(...)` / `will-change: transform` nếu cần mượt hơn.
- Bổ sung polish: cursor, focus, hover, active state, transition mượt giữa 2 screen, empty/error state, loading state, disabled state cho nút, animation modal — nhưng luôn ưu tiên **clean hơn là hiệu ứng rườm rà**.

---

## 15. ĐỊNH NGHĨA HOÀN THÀNH (DEFINITION OF DONE)

Chỉ coi là DONE khi TẤT CẢ các điều sau đúng:

- [ ] Website chạy được ngay khi mở `index.html`, không pseudo-code, không thiếu file.
- [ ] Đủ 13 category, mỗi category ≥ 5 món, không tên placeholder.
- [ ] Category → Roulette chuyển mượt, không reload.
- [ ] Sau khi chuyển sang Screen 2, roulette đứng yên và hiển thị nút "Quay 🎲"; **không tự động quay**. Chỉ quay khi người dùng chủ động bấm nút.
- [ ] Roulette quay đúng, winner nằm chính xác dưới marker (tính động theo DOM, không hard-code offset).
- [ ] Reroll hoạt động, không chồng animation, không leak listener.
- [ ] Formspree hoạt động đúng field, đúng endpoint, xử lý đủ success/error/network fail, có retry.
- [ ] Light/Dark mode hoạt động, lưu đúng localStorage, có fallback khi localStorage lỗi.
- [ ] Responsive tốt ở các breakpoint yêu cầu, không overflow ngang ngoài ý muốn.
- [ ] Không có broken image hiển thị trên UI trong bất kỳ trường hợp nào; có fallback 3 lớp đầy đủ.
- [ ] Không có lỗi JS rõ ràng (theo Test 9).
- [ ] Có loading/disabled state cho các thao tác bất đồng bộ (spin, submit).
- [ ] Code sạch, có cấu trúc hàm rõ ràng, tên biến dễ hiểu, hạn chế global rời rạc.

Nếu còn thiếu bất kỳ mục nào → tiếp tục sửa trước khi giao kết quả cuối cùng.

---

## 16. ĐỊNH DẠNG KẾT QUẢ TRẢ VỀ

Trả lời theo đúng thứ tự sau, không thêm phần giới thiệu dài dòng trước đó:

### A. Project Structure
```text
random-food/
├── index.html
├── style.css
└── script.js
```

### B. HTML — code đầy đủ, không rút gọn.

### C. CSS — code đầy đủ, không rút gọn.

### D. JavaScript — code đầy đủ, không rút gọn.

### E. Self-Test Report
Trình bày kết quả PASS/FAIL cho từng test ở Mục 12 (ngắn gọn, dạng danh sách), và liệt kê rõ những lỗi đã tìm thấy + đã sửa như thế nào (nếu có). Ví dụ định dạng:

```text
[✓] Test 1 - Initial Load
[✓] Test 2 - Images (fallback 3 lớp hoạt động)
[✓] Test 3 - Theme (giữ trạng thái qua reload)
[✓] Test 4 - Category (đúng data theo key)
[✓] Test 5 - Roulette alignment (offset tính động, đã kiểm tra 3 bộ số liệu)
[✓] Test 6 - Reroll (không chồng animation, không leak listener)
[✓] Test 7 - Formspree (payload đúng field, xử lý đủ 3 trạng thái)
[✓] Test 8 - Responsive (375/768/1440)
[✓] Test 9 - Console cleanliness
[✓] Test 10 - Data integrity (đủ ≥5 món/category, không placeholder)
[✓] Test 11 - No auto-spin (chỉ quay khi bấm nút "Quay 🎲")
```

---

## 17. ƯU TIÊN KIỂM TRA ĐẶC BIỆT (KHÔNG ĐƯỢC BỎ QUA)

Ngay cả khi mọi thứ trông có vẻ ổn, luôn kiểm tra kỹ 5 điểm dễ gãy nhất sau trước khi coi là hoàn thành, **kể cả khi URL ảnh đã khai báo sẵn trong JS** (không có nghĩa là ảnh chắc chắn tải được):

1. **Image loading / broken image** — có thật sự không bao giờ lộ icon vỡ ảnh mặc định của trình duyệt?
2. **Roulette winner alignment** — winner do `Math.random()` chọn có thật sự trùng với món nằm đúng dưới marker sau khi animation dừng?
3. **Mobile responsive** — có overflow ngang ngoài ý muốn, marker có lệch tâm ở màn hình hẹp không?
4. **Formspree error handling** — khi mất mạng/API lỗi, UI có báo đúng, có nút retry, có giữ lại kết quả không?
5. **JavaScript console errors** — dò từng luồng thao tác (load trang, đổi theme, chọn category, quay, reroll nhiều lần liên tiếp, submit) xem có khả năng phát sinh lỗi runtime nào không.