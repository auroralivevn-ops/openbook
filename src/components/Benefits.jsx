import { useEffect, useRef } from 'react'

/* ── Icons (inline SVG, hand-drawn style, stroke #C8102E, accent fill #F5B700) ── */

const IconBrain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5M14.5 2A2.5 2.5 0 0 0 12 4.5M12 4.5V20" />
    <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5 3 3 0 0 0 5 10a2.5 2.5 0 0 0 0 5A2.5 2.5 0 0 0 7.5 17.5" />
    <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5 3 3 0 0 1 19 10a2.5 2.5 0 0 1 0 5A2.5 2.5 0 0 1 16.5 17.5" />
    <circle cx="9" cy="8.5" r="1.2" fill="#F5B700" stroke="none" />
    <circle cx="15.5" cy="11.5" r="0.9" fill="#F5B700" stroke="none" />
  </svg>
)

const IconBook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    <path d="M12 14v-4" stroke="#F5B700" strokeWidth="1.6" />
    <path d="M10.5 12c.4-1.4 1-2.2 1.5-2.2s1.1.8 1.5 2.2" stroke="#F5B700" strokeWidth="1.6" fill="none" />
  </svg>
)

const IconCloud = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <circle cx="9.5" cy="12.5" r="1" fill="#F5B700" stroke="none" />
    <circle cx="14.5" cy="12.5" r="1" fill="#F5B700" stroke="none" />
    <path d="M10 15.5c.5.7 1.2 1 2 1s1.5-.3 2-1" />
  </svg>
)

const IconTrending = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 8 13.5 16.5 8.5 11.5 2 18" />
    <polyline points="16 8 22 8 22 14" />
    <path d="M18.5 3l.65 1.85L21 5.5l-1.85.65L18.5 8l-.65-1.85L16 5.5l1.85-.65z" fill="#F5B700" stroke="none" />
  </svg>
)

const IconSun = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="3.5" />
    <line x1="12" y1="1.5" x2="12" y2="3.5" />
    <line x1="12" y1="14.5" x2="12" y2="16.5" />
    <line x1="4.93" y1="3.93" x2="6.34" y2="5.34" />
    <line x1="17.66" y1="3.93" x2="19.07" y2="5.34" />
    <line x1="1.5" y1="9" x2="3.5" y2="9" />
    <line x1="20.5" y1="9" x2="22.5" y2="9" />
    <path d="M3 20h18" />
    <circle cx="12" cy="9" r="1.5" fill="#F5B700" stroke="none" />
  </svg>
)

/* ── Card data ── */
const CARDS = [
  {
    id: '01', title: 'Ghi nhớ dễ dàng',
    desc: 'Con thuộc bài cũ trong 5 phút thay vì 30 phút mỗi tối',
    stat: '+47% tốc độ học', Icon: IconBrain, highlight: false,
  },
  {
    id: '02', title: 'Hiểu sâu nhớ lâu',
    desc: 'Kiến thức ghi sâu trong não, không quên sau 1 tuần',
    stat: 'Nhớ 90% sau 30 ngày', Icon: IconBook, highlight: false,
  },
  {
    id: '03', title: 'Học nhẹ nhàng thoải mái',
    desc: 'Con thấy học là vui, không còn căng thẳng cuối tuần',
    stat: '8/10 phụ huynh khen', Icon: IconCloud, highlight: false,
  },
  {
    id: '04', title: 'Tăng tốc kết quả',
    desc: 'Điểm số tăng rõ rệt sau 2 tuần áp dụng',
    stat: '+1.5 điểm trung bình', Icon: IconTrending, highlight: false,
  },
  {
    id: '05', title: 'Tự tin mỗi ngày',
    desc: 'Con dám phát biểu, tự xung phong giải bài, không sợ sai trước bạn bè',
    stat: '9/10 con tự tin hơn rõ rệt', Icon: IconSun, highlight: true,
  },
]

/* ── Single card ── */
function BenefitCard({ card, index, cardRef }) {
  const { id, title, desc, stat, Icon, highlight } = card
  return (
    <div
      ref={cardRef}
      className={`benefits-card relative rounded-2xl p-4 ${
        highlight
          ? 'benefits-card-highlight'
          : 'hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(245,183,0,0.15)]'
      }`}
      style={{
        '--stagger-delay': `${index * 0.1}s`,
        background: highlight ? '#FFF8E1' : '#FFFFFF',
        border: highlight ? '2px solid #F5B700' : '1px solid #FDE68A',
      }}
    >
      {/* Badge trên card 5 */}
      {highlight && (
        <span
          className="absolute -top-3 left-3 text-white font-bold px-2.5 py-0.5 rounded-full"
          style={{ background: '#C8102E', fontSize: '10px' }}
        >
          ★ Thay đổi sâu nhất
        </span>
      )}

      {/* Icon + số thứ tự */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-[10px] flex-shrink-0"
          style={{ background: '#FFF8E1' }}
        >
          <Icon />
        </div>
        <span style={{ fontSize: '11px', color: '#B4B2A9', fontWeight: 500 }}>{id}</span>
      </div>

      {/* Title */}
      <p
        className="font-semibold text-[#1F1B16] mb-1 leading-snug"
        style={{ fontSize: highlight ? '15px' : '14px' }}
      >
        {title}
      </p>

      {/* Description */}
      <p className="text-[#6B5D54] leading-relaxed mb-3" style={{ fontSize: '12px' }}>
        {desc}
      </p>

      {/* Stat badge */}
      <span
        className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold"
        style={{
          fontSize: '10px',
          background: highlight ? '#FFFFFF' : '#FFF8E1',
          border: highlight ? '1px solid #FDE68A' : 'none',
          color: highlight ? '#C8102E' : '#854F0B',
        }}
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
            // Reset stagger delay sau khi reveal xong để hover không bị chậm
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
    document.getElementById('form-cod')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
          Không phải lý thuyết — đây là kết quả phụ huynh báo về
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-[720px] mx-auto">
        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          {CARDS.slice(0, 3).map((card, i) => (
            <BenefitCard
              key={card.id} card={card} index={i}
              cardRef={el => { cardRefs.current[i] = el }}
            />
          ))}
        </div>
        {/* Row 2: 2 cards — card 5 rộng hơn 40% trên desktop */}
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
          Xem giá ưu đãi 129K →
        </button>
      </div>

    </section>
  )
}
