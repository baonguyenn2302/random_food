# FIX.md — Sửa lại phần gửi kết quả về Gmail qua Formspree

### Prompt vá lỗi (patch prompt) cho AI Coding Agent — chỉ tập trung vào module gửi form

> Đây là bản vá bổ sung cho `DESIGN.md` (Random Food 💕). Agent chỉ cần sửa **phần gửi kết quả tới Formspree** trong `script.js` (và phần liên quan trong `index.html`/`style.css` nếu cần), **không cần viết lại toàn bộ website**. Giữ nguyên toàn bộ phần category selection, roulette, theme, v.v. đã đúng — chỉ động vào đúng module submit-to-Formspree.

---

## 0. BỐI CẢNH & LỖI ĐANG GẶP

- Endpoint Formspree đang dùng: `https://formspree.io/f/mzebwlkr` (form này được cấu hình để chuyển tiếp submission về một hộp Gmail cụ thể trên Formspree dashboard).
- Hiện tượng: phần gửi form đang **không hoạt động đúng / không tương thích** — có thể do một hoặc nhiều nguyên nhân sau (agent phải tự rà soát code hiện tại để xác định nguyên nhân thật sự, không đoán mò):

| Nguyên nhân thường gặp với Formspree | Cách kiểm tra |
|---|---|
| Gửi bằng `Content-Type: application/json` nhưng thiếu header `Accept: application/json` | Formspree mặc định trả về HTML redirect nếu không có `Accept: application/json`, khiến `fetch` không parse được JSON → tưởng lỗi |
| Form Formspree **chưa được xác nhận lần đầu** | Với plan free, lần submit đầu tiên tới 1 endpoint mới thường yêu cầu **xác nhận email** (Formspree gửi mail xác nhận, phải confirm 1 lần) — nếu chưa xác nhận, các submit sau có thể bị âm thầm chặn hoặc trả lỗi 403 |
| CORS / preflight bị chặn | Formspree hỗ trợ CORS cho JSON POST, nhưng nếu code gửi sai `Content-Type` (ví dụ để trình duyệt tự set `text/plain`) có thể gây lỗi khó hiểu |
| Field `_replyto` / field email không được set | Nếu muốn Formspree hiển thị đúng "Reply-To" trong mail nhận ở Gmail, cần field tên `email` hoặc `_replyto` trong payload (tuỳ chọn, không bắt buộc cho use-case này vì không thu email người dùng) |
| Không kiểm tra `response.ok` / `response.status` | Code cũ có thể coi mọi request đã gửi là "thành công" mà không check status code trả về, dẫn tới hiển thị sai trạng thái |
| Submit trong lúc offline / mạng chập chờn không được bắt lỗi đúng cách (`catch` không phân biệt network error vs HTTP error) |
| Bị gọi submit nhiều lần liên tiếp do không disable nút đúng lúc (double submit) |

Agent phải tự đọc code JS hiện tại liên quan tới `submitResult`/`fetch(...formspree...)`, xác định nguyên nhân cụ thể, và sửa triệt để theo đặc tả bên dưới.

---

## 1. YÊU CẦU HÀNH VI (GIỮ NGUYÊN THEO DESIGN.md, LÀM RÕ HƠN)

Khi người dùng bấm **"Chốt món này! 🥰"**:

1. Thu thập payload:
   ```javascript
   {
     category: "...",   // dùng LABEL hiển thị (vd "Bún nước 🍜"), không dùng key nội bộ, để mail nhận dễ đọc
     food: "...",       // tên món đã chốt
     timestamp: "..."   // ISO string hoặc local datetime đầy đủ ngày/tháng/năm/giờ/phút/giây
   }
   ```
2. Disable nút, đổi text thành **"Đang ghi nhận... 💕"**, chặn double-click (dùng cờ `isSubmitting`).
3. Gửi `POST` JSON tới `https://formspree.io/f/mzebwlkr` với đầy đủ header bắt buộc (xem Mục 2).
4. Kiểm tra `response.ok` (status 2xx) **và** thử parse JSON body để xác nhận Formspree trả về không có field `errors`.
5. Thành công → hiện modal **"Lựa chọn đã được ghi nhận! Chúc nàng ăn ngon miệng nha! 💖"** + nút "Về trang chủ 🏠".
6. Thất bại (HTTP lỗi, network lỗi, hoặc Formspree trả về `errors`) → hiện message **"Oops! Hình như kết nối đang có chút vấn đề 🥺 Thử lại một lần nữa nha!"** + nút retry, **không mất kết quả hiện tại** (không quay lại roulette, giữ nguyên `selectedFood`).
7. Luôn mở lại nút ở `finally` (trừ trường hợp đã chuyển sang màn hình thành công).

---

## 2. IMPLEMENTATION CHUẨN (bắt buộc theo đúng phần này)

```javascript
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzebwlkr";

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
  const btn = document.getElementById("btn-confirm-food");
  if (!btn) return;
  btn.disabled = loading;
  btn.textContent = loading ? "Đang ghi nhận... 💕" : "Chốt món này! 🥰";
}

function showSubmitError() {
  // Hiện UI lỗi thân thiện + nút retry, KHÔNG reset selectedFood, KHÔNG quay lại roulette
  const errorBox = document.getElementById("submit-error-box");
  if (errorBox) {
    errorBox.hidden = false;
    errorBox.textContent = "Oops! Hình như kết nối đang có chút vấn đề 🥺 Thử lại một lần nữa nha!";
  }
}

function retrySubmit() {
  const errorBox = document.getElementById("submit-error-box");
  if (errorBox) errorBox.hidden = true;
  handleFinalSubmit(); // gọi lại với đúng payload hiện tại (selectedFood chưa bị mất)
}
```

Yêu cầu bổ sung bắt buộc:

- Hằng số `FORMSPREE_ENDPOINT` khai báo **một lần duy nhất**, không hard-code URL rải rác nhiều chỗ trong file.
- `category` gửi đi phải là **label hiển thị** (ví dụ `"Bún nước 🍜"`), không phải key nội bộ (`"bun_nuoc"`), để khi Formspree forward về Gmail, nội dung mail dễ đọc trực tiếp.
- Không được nuốt lỗi im lặng: mọi nhánh lỗi (`catch`) đều phải gọi `showSubmitError()`, không để UI treo ở trạng thái loading vô thời hạn.
- Nút retry phải gọi lại đúng payload hiện tại, **không** kích hoạt roulette quay lại, không tạo `selectedFood` mới.
- `console.error` chỉ dùng để debug (dev có thể thấy trong DevTools), **không** hiển thị nội dung lỗi kỹ thuật thô cho người dùng cuối.

---

## 3. HTML CẦN CÓ (bổ sung nếu chưa có, không phá vỡ cấu trúc hiện tại)

Đảm bảo tồn tại các phần tử agent có thể tham chiếu bằng `id` (đổi tên `id` cho khớp với code hiện tại của bạn nếu khác, miễn nhất quán 2 chiều HTML ↔ JS):

```html
<button id="btn-confirm-food" type="button">Chốt món này! 🥰</button>

<div id="submit-error-box" role="alert" hidden>
  <!-- message lỗi sẽ được set bằng JS -->
  <button type="button" id="btn-retry-submit">Thử lại 🔁</button>
</div>
```

- Gắn `retrySubmit()` vào `onClick` của `#btn-retry-submit`.
- `role="alert"` giúp screen reader thông báo lỗi khi nó xuất hiện (accessibility).

---

## 4. KIỂM TRA CẤU HÌNH FORMSPREE (PHÍA NGƯỜI DÙNG CẦN TỰ LÀM THỦ CÔNG NGOÀI CODE)

Agent nên **nhắc rõ trong phần trả lời cuối cùng** (không thể tự làm thay vì đây là thao tác ngoài code) rằng người dùng cần xác nhận các mục sau trên Formspree dashboard, vì nếu sai thì dù code đúng 100% vẫn không nhận được mail:

1. Endpoint `https://formspree.io/f/mzebwlkr` đã được liên kết đúng với địa chỉ Gmail nhận mail trong phần **Settings → Email** của form đó trên formspree.io.
2. Với submit **đầu tiên** từ một domain/trình duyệt mới, Formspree có thể gửi **1 email xác nhận** tới chính Gmail đó — cần bấm xác nhận (verify) thì các submit tiếp theo mới được forward tự động, nếu không sẽ bị giữ lại chờ duyệt thủ công.
3. Kiểm tra tab **Spam/Rác** của Gmail trong lần test đầu tiên, vì mail từ Formspree đôi khi bị lọc rác.
4. Nếu dùng plan free, kiểm tra **giới hạn số submission/tháng** của Formspree chưa bị vượt quá — vượt quota cũng khiến request trả lỗi dù code đúng.
5. Nếu website được host trên một domain cụ thể (không phải mở file `index.html` local), kiểm tra mục **Allowed Domains** trong cấu hình form trên Formspree (nếu có bật) để đảm bảo domain đó được whitelist.

---

## 5. SELF-TEST BẮT BUỘC CHO PHẦN VÁ NÀY

Sau khi sửa xong, agent phải tự kiểm tra lại (đọc code, truy vết logic) theo checklist sau, PASS hết mới coi là xong:

- [ ] Header gửi đi có cả `Content-Type: application/json` **và** `Accept: application/json`.
- [ ] Code kiểm tra `response.ok` **và** field `errors` trong JSON trả về trước khi coi là thành công.
- [ ] Trường hợp `response.json()` throw (parse lỗi) được bắt và coi là submit thất bại, không crash.
- [ ] Bấm liên tục nhiều lần vào "Chốt món này! 🥰" trong lúc đang gửi **không** tạo ra nhiều request song song (nhờ `isSubmitting` + `disabled`).
- [ ] Khi giả lập lỗi mạng (throw trong `fetch`), UI hiển thị đúng message lỗi thân thiện, nút quay về "Chốt món này! 🥰" (không kẹt ở "Đang ghi nhận...").
- [ ] Khi giả lập submit thành công, modal hiện đúng nội dung, nút "Về trang chủ 🏠" reset đúng state và quay lại Screen 1.
- [ ] Khi submit lỗi rồi bấm retry, payload gửi lại đúng với `selectedFood` cũ (không bị `null`/`undefined`), không kích hoạt lại roulette.
- [ ] `category` trong payload là label hiển thị dễ đọc, không phải key nội bộ dạng `snake_case`.
- [ ] Không còn đoạn code cũ nào submit theo kiểu native `<form action="...">` gây reload trang.
- [ ] Không có `Uncaught` error nào trong toàn bộ luồng thử nghiệm submit thành công / thất bại / retry.

Nếu bất kỳ mục nào FAIL → sửa tiếp → chạy lại toàn bộ checklist trước khi giao code.

---

## 6. ĐỊNH DẠNG KẾT QUẢ TRẢ VỀ

Chỉ cần trả về:

1. **Đoạn code JS đã sửa/thêm** cho toàn bộ module submit (đủ để copy-paste thay thế phần cũ), gồm: `FORMSPREE_ENDPOINT`, `submitResult`, `handleFinalSubmit`, `setSubmitButtonState`, `showSubmitError`, `retrySubmit`, và mọi hàm phụ trợ liên quan (`getCategoryLabel` nếu chưa có).
2. **Đoạn HTML cần bổ sung/sửa** (nút confirm, error box, nút retry) nếu chưa tồn tại đúng cấu trúc.
3. **Self-Test Report** theo checklist Mục 5 (PASS/FAIL từng dòng).
4. **Ghi chú nhắc người dùng** kiểm tra cấu hình Formspree dashboard theo Mục 4 (vì đây là phần nằm ngoài khả năng sửa của code).

Không cần in lại toàn bộ `index.html`/`style.css`/`script.js` nếu các phần khác không thay đổi — chỉ cần rõ ràng đoạn nào chèn vào đâu (ví dụ: "thay thế hàm `submitResult` cũ trong `script.js` bằng đoạn sau").
