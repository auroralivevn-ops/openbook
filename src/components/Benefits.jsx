import { useEffect, useRef } from 'react'

/* ── Icons ── */
const IconHeart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    <circle cx="12" cy="12" r="1.5" fill="#F5B700" stroke="none" />
  </svg>
)

const IconFamily = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <circle cx="15" cy="9" r="1" fill="#F5B700" stroke="none" />
  </svg>
)

const IconChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="9" cy="10" r="1" fill="#F5B700" stroke="none" />
    <circle cx="15" cy="10" r="1" fill="#F5B700" stroke="none" />
  </svg>
)

const IconEye = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="1.2" fill="#F5B700" stroke="none" />
  </svg>
)

const IconStar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    <circle cx="12" cy="10" r="1.5" fill="#F5B700" stroke="none" />
  </svg>
)

/* ── Card data ── */
const CARDS = [
  {
    id: '01', title: 'Hiểu nỗi lòng bố mẹ',
    desc: 'Con nhận ra bố mẹ yêu con qua từng hành động nhỏ — bữa cơm, giấc ngủ, lời nói dối nhẹ nhàng',
    stat: '9/10 con thay đổi cách nhìn', Icon: IconHeart, highlight: false,
    bgColor: '#FEF2F2', borderColor: '#E74C3C', iconBg: '#FECACA', textColor: '#C0392B',
  },
  {
    id: '02', title: 'Gắn kết gia đình',
    desc: 'Cả nhà đọc cùng nhau, chia sẻ cảm xúc và thấu hiểu lẫn nhau hơn mỗi ngày',
    stat: '8/10 gia đình gần gũi hơn', Icon: IconFamily, highlight: false,
    bgColor: '#EEF5F9', borderColor: '#1B4D7C', iconBg: '#D9EBF7', textColor: '#1B4D7C',
  },
  {
    id: '03', title: 'Con biết mở lòng',
    desc: 'Từ giận dỗi, con chuyển sang nói "Con yêu bố mẹ" và biết lắng nghe',
    stat: 'Thay đổi sau 3 ngày đọc', Icon: IconChat, highlight: false,
    bgColor: '#FFF5E6', borderColor: '#F77F00', iconBg: '#FFE8CC', textColor: '#F77F00',
  },
  {
    id: '04', title: 'Nhìn thấy sự hy sinh',
    desc: 'Con hiểu tại sao bố mẹ hay mệt, hay cáu — vì mỗi phút đều dành cho con',
    stat: 'Bài học cảm động nhất', Icon: IconEye, highlight: false,
    bgColor: '#F5E8F5', borderColor: '#D946A6', iconBg: '#F0D9F0', textColor: '#D946A6',
  },
  {
    id: '05', title: 'Trưởng thành từ trái tim',
    desc: 'Con biết ơn, trân trọng và tự nguyện trở thành phiên bản tốt hơn — không cần bố mẹ nhắc nhở',
    stat: '100% phụ huynh xúc động', Icon: IconStar, highlight: true,
    bgColor: '#FFF8E1', borderColor: '#F5B700', iconBg: '#FFECB3', textColor: '#C8102E',
  },
]

/* ── Single card ── */
function BenefitCard({ card, index, cardRef }) {
  const { id, title, desc, stat, Icon, highlight, bgColor, borderColor, iconBg, textColor } = card
  return (
    <div
      ref={cardRef}
      className={`benefits-card relative rounded-2xl p-4 hover:scale-[1.02] transition-transform duration-200 ${
        highlight ? 'benefits-card-highlight' : ''
      }`}
      style={{
        '--stagger-delay': `${index * 0.1}s`,
        background: bgColor,
        border: `2px solid ${borderColor}`,
        boxShadow: `0 4px 12px rgba(${parseInt(borderColor.slice(1, 3), 16)}, ${parseInt(borderColor.slice(3, 5), 16)}, ${parseInt(borderColor.slice(5, 7), 16)}, 0.12)`,
      }}
    >
      {highlight && (
        <span
          className="absolute -top-3 left-3 text-white font-bold px-2.5 py-0.5 rounded-full"
          style={{ background: textColor, fontSize: '10px' }}
        >
          ★ Thay đổi sâu nhất
        </span>
      )}

      <div className="flex items-center gap-2.5 mb-2.5">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-[10px] flex-shrink-0"
          style={{ background: iconBg }}
        >
          <Icon />
        </div>
        <span style={{ fontSize: '11px', color: textColor, fontWeight: 600 }}>{id}</span>
      </div>

      <p
        className="font-semibold mb-1 leading-snug"
        style={{ fontSize: highlight ? '15px' : '14px', color: textColor }}
      >
        {title}
      </p>

      <p className="leading-relaxed mb-3" style={{ fontSize: '12px', color: '#6B5D54' }}>
        {desc}
      </p>

      <span
        className="inline-flex items-center px-2.5 py-1 rounded-full font-semibold"
        style={{ fontSize: '10px', background: iconBg, color: textColor }}
      >
        {stat}
      </span>
    </div>
  )
}

/* ── Section chính ── */
export default function Benefits() {
  const cardRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target
            el.classList.add('visible')
            const staggerMs = (parseFloat(el.style.getPropertyValue('--stagger-delay')) || 0) * 1000
            setTimeout(() => el.style.setProperty('--stagger-delay', '0s'), staggerMs + 600)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    cardRefs.current.forEach(ref => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [])

  const scrollToForm = () => {
    window.dispatchEvent(new CustomEvent('openbook:selectQty', { detail: 1 }))
    setTimeout(() => {
      document.getElementById('order-btn')?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 50)
  }

  return (
    <section className="bg-[#FFFBF5] px-4 py-5 md:py-8">

      {/* Header */}
      <div className="text-center mb-5 max-w-[720px] mx-auto">
        <p
          className="font-medium uppercase tracking-[0.12em] mb-1"
          style={{ fontSize: '12px', color: '#C8102E' }}
        >
          Lợi ích cho con
        </p>
        <h2
          className="font-medium text-[#1F1B16] leading-tight mb-1"
          style={{ fontSize: 'clamp(22px, 5.5vw, 28px)' }}
        >
          5 thay đổi sau khi con đọc sách
        </h2>
        <p className="text-[#6B5D54]" style={{ fontSize: '14px' }}>
          Không phải lý thuyết — đây là chia sẻ thật từ phụ huynh
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-[720px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          {CARDS.slice(0, 3).map((card, i) => (
            <BenefitCard
              key={card.id} card={card} index={i}
              cardRef={el => { cardRefs.current[i] = el }}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 benefits-row2 gap-3">
          {CARDS.slice(3).map((card, i) => (
            <BenefitCard
              key={card.id} card={card} index={i + 3}
              cardRef={el => { cardRefs.current[i + 3] = el }}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="mt-8 pt-6 text-center max-w-[720px] mx-auto"
        style={{ borderTop: '1px dashed #FDE68A' }}
      >
        <p className="font-medium text-[#1F1B16] mb-4" style={{ fontSize: '14px' }}>
          Tất cả những điều này đều có trong cuốn sách
        </p>
        <button
          onClick={scrollToForm}
          className="text-white font-semibold hover:scale-105 active:scale-95 transition-transform duration-200"
          style={{
            background: '#C8102E',
            padding: '10px 22px',
            borderRadius: '999px',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Xem giá ưu đãi 199K →
        </button>
      </div>

    </section>
  )
}
