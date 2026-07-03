export default function BookInfo() {
  return (
    <section className="bg-[#FFFBF5] py-8 px-5 md:py-12">
      <div className="max-w-3xl mx-auto">

        {/* HERO BLOCK */}
        <div className="text-center mb-5">
          <div className="text-2xl font-medium text-[#C8102E] mb-1">OpenBook</div>
          <div className="text-sm text-[#6B5D54] italic mb-1.5">Nuôi dưỡng trí tuệ Việt từ tuổi thơ</div>
          <div className="text-xs text-[#B4B2A9]">158.254 phụ huynh đã tin chọn từ năm 2024</div>
        </div>

        {/* BANNER HOTLINE — full width, mobile flex-col, desktop flex-row */}
        <div className="bg-white border border-[#C8102E] rounded-2xl p-4 mb-2.5 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          {/* Left: icon + phone */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-11 h-11 bg-[#C8102E] rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-[#C8102E] tracking-[0.12em] font-medium">Hotline đặt sách</div>
              <a href="tel:0339604426" className="block text-xl font-medium text-[#C8102E] tracking-tight whitespace-nowrap leading-tight">0339 604 426</a>
            </div>
          </div>
          {/* Right: CTA + hours */}
          <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
            <a href="tel:0339604426" className="inline-flex items-center gap-1.5 bg-[#C8102E] text-white text-sm font-medium px-4 py-2 rounded-full hover:scale-[1.05] transition-transform">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Gọi ngay
            </a>
            <div className="text-[10px] text-[#B4B2A9]">Hỗ trợ 8h - 22h</div>
          </div>
        </div>

        {/* ADDRESS STRIP */}
        <div className="bg-white border border-[#FDE68A] rounded-xl p-2.5 px-3.5 mb-3 flex items-center gap-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <div className="text-xs text-[#6B5D54]"><span className="text-[#1F1B16] font-medium">Văn phòng:</span> 11 Lô 1 Nam Thắng, Phùng Khoang, Trung Văn, Hà Nội</div>
        </div>

        {/* 2 CỘT — Thông tin sách + Cam kết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {/* Thông tin sách */}
          <div className="bg-white border border-[#FDE68A] rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="w-6 h-6 bg-[#FFF8E1] rounded-md flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <div className="text-[11px] text-[#C8102E] tracking-[0.12em] font-medium">Thông tin sách</div>
            </div>
            <div className="text-[17px] font-medium text-[#1F1B16] mb-0.5">Nếu Con Làm Bố Mẹ Một Ngày</div>
            <div className="text-xs text-[#6B5D54] mb-3">OpenBook — Tổng hợp &amp; biên soạn</div>
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-[#FFF8E1] text-[#854F0B] text-[11px] px-2.5 py-1 rounded-full font-medium">116 trang</span>
              <span className="bg-[#FFF8E1] text-[#854F0B] text-[11px] px-2.5 py-1 rounded-full font-medium">18 × 26 cm</span>
              <span className="bg-[#FFF8E1] text-[#854F0B] text-[11px] px-2.5 py-1 rounded-full font-medium">NXB Văn Học</span>
              <span className="bg-[#FFF8E1] text-[#854F0B] text-[11px] px-2.5 py-1 rounded-full font-medium">4 - 13 tuổi</span>
            </div>
          </div>

          {/* Cam kết */}
          <div className="bg-white border border-[#FDE68A] rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="w-6 h-6 bg-[#FFF8E1] rounded-md flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              </div>
              <div className="text-[11px] text-[#C8102E] tracking-[0.12em] font-medium">Cam kết của chúng tôi</div>
            </div>
            {[
              'Sách chính hãng NXB Văn Học',
              'Đổi trả miễn phí 7 ngày',
              'Hoàn tiền 100% nếu không hài lòng',
              'Tư vấn nhiệt tình từ A đến Z',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 mb-1.5 last:mb-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10" fill="#DCFCE7"/>
                  <path d="M8 12l3 3 5-6" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-xs text-[#1F1B16]">{text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center pt-3.5 border-t border-dashed border-[#FDE68A]">
          <div className="text-[11px] text-[#B4B2A9]">© 2026 OpenBook · Hotline 0339 604 426</div>
        </div>

      </div>
    </section>
  )
}
