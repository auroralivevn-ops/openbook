export default function DiscountCode() {
  const copyCode = () => {
    navigator.clipboard.writeText('BOOK20K').then(() => {
      const btn = document.getElementById('copy-btn')
      if (btn) { btn.textContent = '✓ Đã lưu'; setTimeout(() => { btn.textContent = 'Lưu' }, 1800) }
    })
  }

  return (
    <div className="bg-white px-3 pt-3 pb-4" style={{ borderBottom: '8px solid #f5f5f5' }}>
      <p
        className="uppercase mb-2"
        style={{ fontSize: '10px', letterSpacing: '0.06em', color: '#6B7280', fontWeight: 500 }}
      >
        Mã giảm giá
      </p>
      <div
        className="flex items-center gap-2.5 px-3 py-2.5"
        style={{
          background: 'linear-gradient(90deg, #FEF2F2 0%, #FFFFFF 100%)',
          border: '1px dashed #F4C0D1',
          borderRadius: '10px',
        }}
      >
        <span className="flex-shrink-0 text-lg leading-none">🎟️</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold" style={{ fontSize: '12px', color: '#BE185D' }}>Giảm thêm 20.000đ</span>
            <span
              className="font-mono font-semibold"
              style={{
                background: 'white',
                border: '1px solid #F4C0D1',
                padding: '1px 6px',
                borderRadius: '4px',
                fontSize: '9px',
                color: '#BE185D',
              }}
            >
              BOOK20K
            </span>
          </div>
          <p className="mt-0.5" style={{ fontSize: '10px', color: '#888' }}>Khi mua từ 2 cuốn trở lên</p>
        </div>

        <button
          id="copy-btn"
          onClick={copyCode}
          className="flex-shrink-0 text-white font-semibold active:opacity-80 transition-opacity"
          style={{
            background: 'linear-gradient(135deg, #DB2777, #DC2626)',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '11px',
            boxShadow: '0 2px 6px rgba(219,39,119,0.3)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Lưu
        </button>
      </div>
    </div>
  )
}
