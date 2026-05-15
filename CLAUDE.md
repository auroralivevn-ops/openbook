# OpenBook — Bản Nâng Cấp Mới

## ⚠️ QUY TẮC QUAN TRỌNG NHẤT
**TUYỆT ĐỐI KHÔNG sửa, deploy, hay push bất kỳ thay đổi nào lên openbook.vn (web đang chạy thật).**

Đây là bản clone riêng để phát triển tính năng mới. Mọi thay đổi chỉ được thực hiện tại thư mục này (`d:\claude code\openbook-upgrade\`) và deploy lên môi trường staging/preview riêng biệt.

Nếu có bước nào có thể ảnh hưởng web gốc → hỏi anh Tuân Anh trước khi làm.

---

## Thông tin dự án
- **Web gốc:** openbook.vn (KHÔNG được động vào)
- **Repo nguồn:** https://github.com/tuananhvelari-code/openbook
- **Thư mục làm việc:** `d:\claude code\openbook-upgrade\`
- **Owner:** Anh Tuân Anh (không phải dev — giải thích bằng tiếng Việt, đơn giản)

## Tech Stack
- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS 3 + custom design system "Book Hồng Hà"
- **Carousel:** Embla Carousel
- **Build:** Vite (output → `dist/`)
- **Deploy dự kiến:** Netlify (môi trường mới, tách biệt với web gốc)

## Lệnh thường dùng
```bash
npm install        # Cài dependencies lần đầu
npm run dev        # Chạy dev server (localhost)
npm run build      # Build production → dist/
npm run preview    # Xem bản build trước khi deploy
npm run lint       # Kiểm tra lỗi code
```

## Cấu trúc thư mục
```
openbook-upgrade/
├── index.html
├── src/
│   ├── main.jsx       # Entry point — React 19 StrictMode
│   ├── App.jsx        # Root component
│   ├── index.css      # Global styles + Tailwind directives
│   ├── App.css        # Animations & component styles
│   └── assets/        # Ảnh, SVG
├── public/            # Tài sản tĩnh (không xử lý qua Vite)
├── tailwind.config.js # Custom colors, animations
├── vite.config.js
└── package.json
```

## Design System "Book Hồng Hà"
**Màu sắc (prefix `hh-`):**
- `hh-red` / `hh-red-dark` / `hh-red-light` — màu chủ đạo (#C8102E)
- `hh-yellow` / `hh-yellow-light` / `hh-yellow-warm` — accent (#F5B700)
- `hh-blue` / `hh-blue-light` — phụ (#1B4D7C)
- `hh-green` / `hh-green-light` — CTA (#2D8659)
- `hh-brown` / `hh-brown-light` — earthy (#8B5E3C)
- `hh-cream` — nền (#FFF8EC)

**Gradient:** `bg-sunrise`, `bg-gold-glow`, `bg-green-cta`
**Animation:** `animate-float`, `animate-glow`
**Font:** Be Vietnam Pro (Google Fonts)

## Nguyên tắc làm việc
- Ưu tiên dùng Tailwind utilities cho layout/spacing
- Chỉ dùng `App.css` cho animation phức tạp hoặc positioning mà Tailwind không xử lý được
- Giải thích mọi thứ bằng tiếng Việt, ngắn gọn, dễ hiểu
