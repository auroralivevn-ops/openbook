import { useState, useEffect, useCallback, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import sach1 from '../assets/sach-images/bia-hocit.png'
import sach2 from '../assets/sach-images/bia-murphy.jpg'
import sach3 from '../assets/sach-images/bia-dacnhantam.jpg'
import sach4 from '../assets/sach-images/bia-kyluat.webp'
import sachMeoUngXu from '../assets/sach-images/BÌA MẸO ỨNG XỬ LỊCH SỰ.webp'
import slide1 from '../assets/sach-images/SLIDE-1.jpg'
import slide2 from '../assets/sach-images/SLIDE-2.jpg'
import slide3 from '../assets/sach-images/SLIDE-3.jpg'
import slide4 from '../assets/sach-images/SLIDE-4.jpg'
import slide5 from '../assets/sach-images/SLIDE-5.jpg'

const YT = ['9UqSOrkgAT8', 'tFh4E_ip2Hc']

const SLIDES = [
  { type: 'video', ytId: YT[0] },
  { type: 'video', ytId: YT[1] },
  { type: 'image', src: sach1, alt: 'Bìa sách Học Ít Nhớ Nhiều' },
  { type: 'image', src: slide1, alt: 'Liên tưởng & tưởng tượng — bộ đôi ghi nhớ hiệu quả' },
  { type: 'image', src: slide2, alt: 'Trí nhớ cũng cần sự tự tin' },
  { type: 'image', src: slide3, alt: 'Kiến thức đang bốc hơi như thế nào?' },
  { type: 'image', src: slide4, alt: 'Phương pháp rút gọn — biến dài thành ngắn' },
  { type: 'image', src: slide5, alt: 'Tái hiện câu chuyện — bí quyết để không quên lời' },
]

const NOTIFICATIONS = [
  'Nguyễn Tuấn Anh vừa đặt mua sách',
  'Trần Thị Hoa đánh giá 5 sao: "Sách rất hay!"',
  'Lê Văn Bình vừa đặt 2 cuốn',
  'Phạm Minh Châu: "Con tôi rất thích!"',
  'Hoàng Văn Tùng vừa đặt mua sách',
  'Vũ Thị Mai: "Phương pháp hay, hiệu quả"',
  'Đỗ Tiến Dũng vừa đặt 3 cuốn',
  'Bùi Thanh Hà: "Đáng đồng tiền lắm!"',
]

const StarIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="#F59E0B">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

// Đường sóng vàng nhẹ phân cách section
const WaveDivider = () => (
  <div
    className="w-full"
    style={{
      height: '10px',
      background: 'linear-gradient(90deg, transparent 0%, rgba(245,183,0,0.25) 30%, rgba(247,127,0,0.35) 50%, rgba(245,183,0,0.25) 70%, transparent 100%)',
    }}
  />
)

export default function Hero() {
  // ── Carousel ──
  const autoplay = useRef(Autoplay({ delay: 3800, stopOnInteraction: true }))
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current])
  const [thumbRef, thumbApi] = useEmblaCarousel({ containScroll: 'keepSnaps', dragFree: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onThumbClick = useCallback(
    (index) => { if (emblaApi && thumbApi) emblaApi.scrollTo(index) },
    [emblaApi, thumbApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi || !thumbApi) return
    const idx = emblaApi.selectedScrollSnap()
    setSelectedIndex(idx)
    thumbApi.scrollTo(idx)
    if (idx < 2) emblaApi.plugins().autoplay?.stop()
    else emblaApi.plugins().autoplay?.play()
  }, [emblaApi, thumbApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => { emblaApi.off('select', onSelect); emblaApi.off('reInit', onSelect) }
  }, [emblaApi, onSelect])

  // ── Notification ──
  const [notifIdx, setNotifIdx] = useState(0)
  const [notifVisible, setNotifVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setNotifVisible(false)
      setTimeout(() => { setNotifIdx(i => (i + 1) % NOTIFICATIONS.length); setNotifVisible(true) }, 300)
    }, 3400)
    return () => clearInterval(t)
  }, [])

  // ── Ẩn thanh sticky bottom khi cuộn tới form đăng ký ──
  const [hideBottomBar, setHideBottomBar] = useState(false)
  useEffect(() => {
    // Theo dõi form-cod bằng IntersectionObserver. Vì FormCOD render sau Hero,
    // dùng setTimeout để chắc chắn DOM đã có sẵn element.
    let observer
    const tryAttach = () => {
      const form = document.getElementById('form-cod')
      if (!form) return false
      observer = new IntersectionObserver(
        ([entry]) => setHideBottomBar(entry.isIntersecting),
        { threshold: 0.05 }
      )
      observer.observe(form)
      return true
    }
    if (!tryAttach()) {
      const t = setTimeout(tryAttach, 300)
      return () => { clearTimeout(t); observer?.disconnect() }
    }
    return () => observer?.disconnect()
  }, [])

  // ── Countdown (localStorage-persisted) ──
  // Số phụ huynh còn lại — đếm ngược từ 99 với nhịp ngẫu nhiên (1s, 3s, hoặc 10s)
  // để tạo cảm giác đang có người mua liên tục
  const [slotsLeft, setSlotsLeft] = useState(() => {
    if (typeof window === 'undefined') return 99
    const saved = parseInt(localStorage.getItem('bhh_slots_left'))
    return Number.isFinite(saved) && saved >= 10 && saved <= 99 ? saved : 99
  })
  useEffect(() => {
    // Xác suất: 1s = 65%, 3s = 25%, 10s = 10% (đã hiệu chỉnh để cảm giác thời gian
    // các nhịp tương đương — vì 10s dài nên dù xác suất thấp vẫn chiếm phần lớn thời gian xem)
    let timeoutId

    const scheduleNext = () => {
      const r = Math.random()
      const delay = r < 0.65 ? 1000 : r < 0.90 ? 3000 : 10000
      timeoutId = setTimeout(() => {
        setSlotsLeft((prev) => {
          const next = prev > 10 ? prev - 1 : prev
          localStorage.setItem('bhh_slots_left', String(next))
          return next
        })
        scheduleNext()
      }, delay)
    }

    scheduleNext()
    return () => clearTimeout(timeoutId)
  }, [])

  const [countdown, setCountdown] = useState('23:59:59')
  useEffect(() => {
    let deadline = parseInt(localStorage.getItem('bhh_deadline'))
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + 24 * 60 * 60 * 1000
      localStorage.setItem('bhh_deadline', String(deadline))
    }
    const tick = () => {
      const diff = deadline - Date.now()
      if (diff <= 0) { setCountdown('00:00:00'); return }
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0')
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
      setCountdown(`${h}:${m}:${s}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const scrollToForm = (qty = null) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout')
    }
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'VND',
        value: 179000,
        items: [{
          item_id: 'sach-hoc-it-nho-nhieu',
          item_name: 'Sách Học Ít Nhớ Nhiều',
          quantity: qty || 1,
          price: 179000
        }]
      })
    }
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('InitiateCheckout', {
        contents: [{
          content_id: 'sach-hoc-it-nho-nhieu',
          content_name: 'Sách Học Ít Nhớ Nhiều',
          content_type: 'product',
          quantity: qty || 1,
          price: 179000,
        }],
        value: 179000,
        currency: 'VND',
      })
    }
    if (qty !== null) {
      window.dispatchEvent(new CustomEvent('openbook:selectQty', { detail: qty }))
    }
    setTimeout(() => {
      document.getElementById('order-btn')?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 50)
  }

  return (
    <>
      {/* ══════════════════════════════════════════════
          1. HEADER + BRAND ROW — sticky cả 2 cùng nhau
      ══════════════════════════════════════════════ */}
      <div className="sticky top-0 z-50">
      <header className="h-11 bg-white flex items-center gap-2 px-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
        <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex-1 flex items-center gap-2 h-8 px-3 rounded-sm bg-gray-100">
          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <span className="text-[11px] text-gray-400 truncate">Sách Học Ít Nhớ Nhiều - OpenBook</span>
        </div>

        <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px', color: '#4b5563' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>

        <button className="relative flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px', color: '#4b5563' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h12M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center text-white font-bold" style={{ fontSize: '7px' }}>2</span>
        </button>

        <button className="flex-shrink-0 w-6 h-8 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </header>

      {/* BRAND ROW + NOTIFICATION */}
      <div className="bg-white" style={{ borderBottom: '1px solid #f3f3f3' }}>
        {/* Dòng trên: logo + tên + sold + badge tĩnh */}
        <div className="flex items-center justify-between px-3 pt-2 pb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full border border-amber-200 flex items-center justify-center flex-shrink-0 bg-white shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <defs>
                  <linearGradient id="bookGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F5B700" />
                    <stop offset="100%" stopColor="#F77F00" />
                  </linearGradient>
                </defs>
                <path d="M3 6.5c2-1.5 4.5-1.5 6.5 0V19c-2-1.5-4.5-1.5-6.5 0V6.5z" fill="url(#bookGrad)" />
                <path d="M21 6.5c-2-1.5-4.5-1.5-6.5 0V19c2-1.5 4.5-1.5 6.5 0V6.5z" fill="url(#bookGrad)" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 leading-none" style={{ fontSize: '12px' }}>OpenBook</p>
              <p className="text-gray-400 leading-none mt-0.5" style={{ fontSize: '10px' }}>
                Bán được <span className="text-gray-600 font-medium">158.254</span> trong 30 ngày
              </p>
            </div>
          </div>
          {/* Badge tĩnh — không cắt text */}
          <div
            className="flex-shrink-0 px-2 py-1 rounded-sm"
            style={{ background: '#DC2626' }}
          >
            <span className="text-white font-bold" style={{ fontSize: '9px', letterSpacing: '0.04em' }}>
              ƯU ĐÃI ĐỘC QUYỀN
            </span>
          </div>
        </div>

        {/* Dòng dưới: notification ticker full-width — FIX không bị cắt */}
        <div className="flex items-center gap-2 px-3 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
          <div className="flex-1 overflow-hidden h-4 flex items-center">
            <span
              className={`text-[10px] font-medium whitespace-nowrap transition-all duration-300 ease-out ${
                notifVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
              }`}
              style={{ color: '#B91C1C' }}
            >
              {NOTIFICATIONS[notifIdx]}
            </span>
          </div>
        </div>
      </div>
      </div>{/* end sticky wrapper */}

      {/* ══════════════════════════════════════════════
          3. CAROUSEL — gradient bình minh + glow vàng
      ══════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #FFF8EC 0%, #FFF0E8 100%)' }}
      >
        {/* Gold glow — góc trên phải */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-50px', right: '-50px',
            width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(245,183,0,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {SLIDES.map((slide, i) => (
              <div key={i} className="flex-none w-full relative" style={{ aspectRatio: '1 / 1' }}>
                {slide.type === 'video' ? (
                  <>
                    <iframe
                      src={`https://www.youtube.com/embed/${slide.ytId}?rel=0&modestbranding=1&playsinline=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      style={{ border: 'none', display: 'block' }}
                      title={`Video review ${i + 1}`}
                    />
                    <div
                      className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-white font-semibold"
                      style={{ fontSize: '9px', background: 'rgba(220,38,38,0.82)', backdropFilter: 'blur(4px)' }}
                    >
                      ▶ VIDEO
                    </div>
                  </>
                ) : (
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-contain"
                    loading={i > 1 ? 'lazy' : 'eager'}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute top-2 right-2 px-1.5 py-0.5 rounded-sm text-white font-medium"
          style={{ fontSize: '10px', background: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(2px)' }}
        >
          {selectedIndex + 1}/{SLIDES.length}
        </div>

        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 pointer-events-none">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === selectedIndex ? '14px' : '4px',
                height: '4px',
                background: i === selectedIndex ? '#DC2626' : 'rgba(0,0,0,0.22)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip — cùng nền bình minh */}
      <div
        className="overflow-hidden pb-2.5 px-2"
        ref={thumbRef}
        style={{ background: 'linear-gradient(180deg, #FFF0E8 0%, #FFF8EC 100%)', borderBottom: '1px solid #FDE68A' }}
      >
        <div className="flex gap-1.5 pt-2">
          {SLIDES.map((slide, i) => (
            <button
              key={i}
              onClick={() => onThumbClick(i)}
              className="flex-none w-[52px] h-[52px] rounded-sm overflow-hidden bg-white transition-all duration-150"
              style={{
                outline: i === selectedIndex ? '1.5px solid #DC2626' : '1.5px solid rgba(245,183,0,0.3)',
                outlineOffset: '1px',
                opacity: i === selectedIndex ? 1 : 0.5,
              }}
            >
              {slide.type === 'video' ? (
                <div className="relative w-full h-full bg-amber-50">
                  <img
                    src={`https://img.youtube.com/vi/${slide.ytId}/hqdefault.jpg`}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `https://img.youtube.com/vi/${slide.ytId}/mqdefault.jpg`
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-red-600 text-white rounded-full flex items-center justify-center shadow-md" style={{ width: '18px', height: '18px', fontSize: '8px', paddingLeft: '2px' }}>
                      ▶
                    </span>
                  </div>
                </div>
              ) : (
                <img src={slide.src} alt="" className="w-full h-full object-cover" loading="lazy" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sóng vàng phân cách ── */}
      <WaveDivider />

      {/* ══════════════════════════════════════════════
          4. PROMO STRIP — nền vàng kem, chip màu
      ══════════════════════════════════════════════ */}
      <div
        className="flex items-center px-3 py-3 gap-2 overflow-x-auto scrollbar-hide"
        style={{ background: '#FFF7E6', borderBottom: '1px solid #FDE68A' }}
      >
        {[
          { icon: '🚚', label: 'Freeship toàn quốc', border: '#86EFAC' },
          { icon: '🔥', label: 'Giảm 37%',         border: '#FCA5A5' },
          { icon: '✅', label: 'COD toàn quốc',    border: '#86EFAC' },
          { icon: '🎁', label: 'Tặng bookmark',     border: '#FCD34D' },
        ].map(({ icon, label, border }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0 bg-white"
            style={{ border: `1px solid ${border}` }}
          >
            <span style={{ fontSize: '11px' }}>{icon}</span>
            <span className="text-gray-700 font-medium whitespace-nowrap" style={{ fontSize: '10px' }}>{label}</span>
          </div>
        ))}
        <button
          className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-white font-semibold ml-1"
          style={{ background: '#DC2626', fontSize: '10px', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          VOUCHER 20K ›
        </button>
      </div>

      {/* ══════════════════════════════════════════════
          5. PRICE BLOCK — Multi-color Premium
      ══════════════════════════════════════════════ */}
      <div className="px-4 my-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
        <div
          className="overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFFBEA 0%, #FEF2F2 100%)',
            border: '1px solid #FDE68A',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(220,38,38,0.15)',
          }}
        >
          {/* Banner đỏ-cam — 3 phần: LIVE | tiêu đề | countdown */}
          <div
            className="flex items-center justify-between py-1.5 px-3"
            style={{ background: 'linear-gradient(90deg, #DC2626 0%, #F77F00 100%)' }}
          >
            {/* Trái: dot pulse + LIVE */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" />
              <span className="text-white font-bold" style={{ fontSize: '10px' }}>LIVE</span>
            </div>
            {/* Giữa: tiêu đề */}
            <span className="text-white font-bold uppercase tracking-wide" style={{ fontSize: '10px' }}>
              ƯU ĐÃI CHỈ TRONG HÔM NAY
            </span>
            {/* Phải: countdown */}
            <div className="flex items-center gap-1">
              <span style={{ fontSize: '10px' }}>⏰</span>
              <span className="text-white font-medium" style={{ fontSize: '10px' }}>
                Còn {countdown}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-3.5">
            {/* Thông điệp khuyến mãi với điểm nhấn bo viền */}
            <p
              className="font-bold leading-snug text-center"
              style={{ fontSize: '14px', color: '#4A1B0C' }}
            >
              Giảm giá{' '}
              <span
                className="text-white font-extrabold inline-block animate-pulse-zoom"
                style={{
                  background: 'linear-gradient(135deg, #DC2626, #F77F00)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '15px',
                  boxShadow: '0 2px 6px rgba(220,38,38,0.35)',
                  border: '2px solid #FFE082',
                }}
              >
                50%
              </span>{' '}
              cho{' '}
              <span
                className="text-white font-extrabold inline-block animate-pulse-zoom"
                style={{
                  background: 'linear-gradient(135deg, #DC2626, #F77F00)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '15px',
                  boxShadow: '0 2px 6px rgba(220,38,38,0.35)',
                  border: '2px solid #FFE082',
                }}
              >
                {slotsLeft}
              </span>{' '}
              phụ huynh mua trong hôm nay!
            </p>

            {/* Dashed divider */}
            <div style={{ borderTop: '1px dashed #FDE68A', marginTop: '10px', paddingTop: '10px' }}>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Badge tiết kiệm */}
                <span
                  className="font-semibold"
                  style={{
                    background: '#DCFCE7',
                    color: '#16A34A',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                  }}
                >
                  ✓ Tiết kiệm 71K
                </span>
                {/* Trust info */}
                <span style={{ fontSize: '10px', color: '#4A1B0C' }}>
                  🚚 Freeship toàn quốc
                </span>
              </div>
            </div>

            {/* Nút MUA NGAY */}
            <button
              onClick={() => scrollToForm(1)}
              className="w-full flex flex-col items-center justify-center text-center text-white active:scale-[0.98] transition-transform mt-2.5"
              style={{
                background: 'linear-gradient(90deg, #DC2626 0%, #F77F00 100%)',
                padding: '10px 14px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(220,38,38,0.3)',
                border: 'none',
              }}
            >
              <span className="font-extrabold leading-tight whitespace-nowrap" style={{ fontSize: '13px' }}>
                🛒 MUA 1 CUỐN - 179.000đ{' '}
                <span className="italic font-normal" style={{ fontSize: '11px' }}>
                  (Giá Gốc <span className="line-through" style={{ fontSize: '13px' }}>250.000đ</span>)
                </span>
              </span>
              <span className="font-semibold mt-1" style={{ fontSize: '12px', opacity: 0.95 }}>
                Học Ít Nhớ Nhiều
              </span>
            </button>
            {/* Nút COMBO 2 CUỐN */}
            <button
              onClick={() => scrollToForm(2)}
              className="w-full flex flex-col items-center justify-center text-center text-white active:scale-[0.98] transition-transform mt-2"
              style={{
                background: 'linear-gradient(90deg, #DC2626 0%, #F77F00 100%)',
                padding: '10px 14px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(220,38,38,0.3)',
                border: 'none',
              }}
            >
              <span className="font-extrabold leading-tight whitespace-nowrap" style={{ fontSize: '13px' }}>
                📚📚 COMBO 2 CUỐN - 250.000đ{' '}
                <span className="italic font-normal" style={{ fontSize: '11px' }}>
                  (Giá Gốc <span className="line-through" style={{ fontSize: '13px' }}>408.000đ</span>)
                </span>
              </span>
              <span className="font-semibold mt-1" style={{ fontSize: '12px', opacity: 0.95 }}>
                Học Ít Nhớ Nhiều - Mẹo Ứng Xử Lịch Sự
              </span>
            </button>
            {/* Nút COMBO 3 */}
            <button
              onClick={() => scrollToForm(3)}
              className="w-full flex flex-col items-center justify-center active:scale-[0.98] transition-transform mt-2"
              style={{
                background: 'linear-gradient(90deg, #F77F00 0%, #EF4444 100%)',
                padding: '9px 12px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(247,127,0,0.3)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span className="font-extrabold text-white leading-tight whitespace-nowrap" style={{ fontSize: '13px' }}>
                🔥 COMBO 3 CUỐN - 350.000đ{' '}
                <span className="italic font-normal" style={{ fontSize: '11px' }}>
                  (Giá Gốc <span className="line-through" style={{ fontSize: '13px' }}>558.000đ</span>)
                </span>
              </span>
              <span className="font-semibold text-white mt-1" style={{ fontSize: '12px', opacity: 0.95 }}>
                Học Ít Nhớ Nhiều - Mẹo Ứng Xử Lịch Sự - Định Luật Murphy
              </span>
            </button>
            {/* Nút COMBO 4 */}
            <button
              onClick={() => scrollToForm(4)}
              className="w-full flex flex-col items-center justify-center active:scale-[0.98] transition-transform mt-2"
              style={{
                background: 'linear-gradient(90deg, #7C3AED 0%, #DC2626 100%)',
                padding: '9px 12px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(124,58,237,0.3)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span className="font-extrabold text-white leading-tight whitespace-nowrap" style={{ fontSize: '13px' }}>
                👑 COMBO 4 CUỐN - 450.000đ{' '}
                <span className="italic font-normal" style={{ fontSize: '11px' }}>
                  (Giá Gốc <span className="line-through" style={{ fontSize: '13px' }}>828.000đ</span>)
                </span>
              </span>
              <span className="font-semibold text-white mt-1" style={{ fontSize: '12px', opacity: 0.95 }}>
                Học Ít Nhớ Nhiều - Mẹo Ứng Xử Lịch Sự
              </span>
              <span className="font-semibold text-white" style={{ fontSize: '12px', opacity: 0.95 }}>
                Định Luật Murphy - Đắc Nhân Tâm Cho Trẻ
              </span>
              <span
                className="font-extrabold text-white mt-1 rounded"
                style={{
                  fontSize: '11px',
                  background: 'rgba(255,255,255,0.15)',
                  padding: '3px 8px',
                  letterSpacing: '0.3px',
                }}
              >
                🎁 TẶNG QUÀ ĐẶC BIỆT: Kỷ Luật Tự Giác
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          6. VOUCHER CHIPS — nền hồng rất nhạt
      ══════════════════════════════════════════════ */}
      <div
        className="px-3 py-2.5 flex gap-2 overflow-x-auto scrollbar-hide"
        style={{ background: '#FFF8F8', borderBottom: '1px solid #f3f3f3' }}
      >
        <p className="font-medium flex-shrink-0 self-center" style={{ fontSize: '10px', color: '#BE185D' }}>Voucher</p>
        {[
          'Giảm 20K khi mua 2 cuốn',
          'Giảm thêm 5% tối đa 50K',
          'Tiết kiệm với BOOK20K',
        ].map((label) => (
          <div
            key={label}
            className="flex items-center gap-1 px-2 py-1 rounded-sm flex-shrink-0 bg-white"
            style={{ border: '1px solid #fca5a5' }}
          >
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="#f87171" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <span className="text-red-500 font-medium whitespace-nowrap" style={{ fontSize: '10px' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Sóng vàng phân cách ── */}
      <WaveDivider />

      {/* ══════════════════════════════════════════════
          7. PRODUCT TITLE + RATING — trắng, sạch
      ══════════════════════════════════════════════ */}
      <div className="bg-white px-3 py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
        <div className="flex items-start gap-1.5 mb-2">
          <span
            className="flex-shrink-0 mt-0.5 text-white font-bold rounded-sm px-1.5 py-0.5"
            style={{ fontSize: '9px', background: '#DC2626' }}
          >
            Mall
          </span>
          <h1 className="text-gray-900 leading-snug flex-1" style={{ fontSize: '13px', fontWeight: 500 }}>
            OpenBook · Sách Học Ít Nhớ Nhiều – Kích hoạt trí não, đánh thức tiềm năng · NXB Văn Học
          </h1>
          <button className="flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(s => <StarIcon key={s} />)}
          </div>
          <span className="font-semibold text-gray-700 underline" style={{ fontSize: '11px' }}>5.0</span>
          <span className="text-gray-300" style={{ fontSize: '11px' }}>|</span>
          <span className="text-gray-400" style={{ fontSize: '11px' }}>(11.534)</span>
          <span className="text-gray-300" style={{ fontSize: '11px' }}>|</span>
          <span className="text-gray-500" style={{ fontSize: '11px' }}>Đã bán <span className="font-medium text-gray-700">158.254</span></span>
        </div>

        {/* Dải ảnh bìa 5 cuốn sách — scroll ngang */}
        <div className="mt-3 pt-3" style={{ borderTop: '1px dashed #FDE68A' }}>
          <p className="font-semibold mb-2" style={{ fontSize: '11px', color: '#92400E' }}>📚 Bộ sách gồm 5 cuốn:</p>
          <style>{`.book-strip-scroll::-webkit-scrollbar{display:none}`}</style>
          <div
            className="book-strip-scroll flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory -mx-3 px-3"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {[
              { src: sach1, name: 'Học Ít Nhớ Nhiều' },
              { src: sachMeoUngXu, name: 'Mẹo Ứng Xử Lịch Sự' },
              { src: sach2, name: 'Định Luật Murphy' },
              { src: sach3, name: 'Đắc Nhân Tâm Cho Trẻ' },
              { src: sach4, name: 'Kỷ Luật Tự Giác' },
            ].map((book, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 snap-start"
                style={{ width: '110px' }}
              >
                <img
                  src={book.src}
                  alt={book.name}
                  className="w-full rounded-lg shadow-md object-cover"
                  style={{ aspectRatio: '3/4' }}
                  loading="lazy"
                />
                <p className="text-center leading-tight font-medium" style={{ fontSize: '11px', color: '#4A1B0C' }}>{book.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          8. THÔNG TIN NHANH 4 CUỐN SÁCH
      ══════════════════════════════════════════════ */}
      <div className="px-3 py-3" style={{ background: '#FFFBF5', borderBottom: '1px solid #f0f0f0' }}>
        <p className="font-bold mb-2.5" style={{ fontSize: '11px', color: '#92400E' }}>📖 Thông tin nhanh</p>
        <div className="flex flex-col gap-2">
          {[
            {
              src: sach1,
              name: 'Học Ít Nhớ Nhiều',
              author: 'Hoàng Văn Đặt · NXB Văn Học',
              tag: 'Ghi nhớ',
              tagColor: '#DC2626',
              desc: 'Kỹ thuật ghi nhớ siêu tốc — học ít mà nhớ lâu, áp dụng ngay từ lớp 1.',
            },
            {
              src: sach2,
              name: 'Định Luật Murphy',
              author: 'Truyện tranh · 28 bài học',
              tag: 'Tư duy',
              tagColor: '#2563EB',
              desc: 'Giúp trẻ hiểu bản thân, quản lý cảm xúc và giao tiếp tự tin qua truyện tranh.',
            },
            {
              src: sach3,
              name: 'Đắc Nhân Tâm Cho Trẻ',
              author: 'Dale Carnegie · Bản trẻ em',
              tag: 'Giao tiếp',
              tagColor: '#D97706',
              desc: 'Dạy bé cách lắng nghe, kết bạn chân thành và ứng xử khéo léo mọi tình huống.',
            },
            {
              src: sachMeoUngXu,
              name: 'Mẹo Ứng Xử Lịch Sự',
              author: 'Cẩm nang kỹ năng · 50+ tình huống',
              tag: 'Lịch sự',
              tagColor: '#7C3AED',
              desc: 'Giúp trẻ tự tin chào hỏi, cảm ơn, xin lỗi đúng lúc và ứng xử văn minh ở mọi nơi.',
            },
            {
              src: sach4,
              name: 'Kỷ Luật Tự Giác',
              author: 'Kỹ năng sống · Thói quen tốt',
              tag: 'Thói quen',
              tagColor: '#16A34A',
              desc: 'Giúp trẻ làm chủ thời gian, vượt lười biếng và xây dựng thói quen tốt từ sớm.',
            },
          ].map((book, i) => (
            <div
              key={i}
              className="flex gap-2.5 p-2.5 rounded-xl"
              style={{ background: '#fff', border: '1px solid #F3F4F6', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            >
              <img
                src={book.src}
                alt={book.name}
                className="flex-shrink-0 rounded-lg object-cover shadow-sm"
                style={{ width: '44px', height: '60px' }}
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className="text-white font-bold rounded-sm px-1.5 py-0.5 flex-shrink-0"
                    style={{ fontSize: '8px', background: book.tagColor }}
                  >
                    {book.tag}
                  </span>
                  <p className="font-bold text-gray-900 truncate" style={{ fontSize: '11px' }}>{book.name}</p>
                </div>
                <p className="text-gray-400 mb-1" style={{ fontSize: '9px' }}>{book.author}</p>
                <p className="text-gray-600 leading-snug" style={{ fontSize: '10px' }}>{book.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sóng vàng phân cách ── */}
      <WaveDivider />


      <div className="h-6" style={{ background: '#f9f9f9' }} />

      {/* ══════════════════════════════════════════════
          10. STICKY BOTTOM — 4 cột (ẩn khi cuộn tới form)
      ══════════════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          transform: hideBottomBar ? 'translateY(100%)' : 'translateY(0)',
          opacity: hideBottomBar ? 0 : 1,
          pointerEvents: hideBottomBar ? 'none' : 'auto',
        }}
      >
        <div
          className="max-w-[430px] mx-auto flex items-stretch bg-white"
          style={{ borderTop: '1px solid #f0f0f0', boxShadow: '0 -2px 12px rgba(0,0,0,0.08)' }}
        >
          <button className="flex flex-col items-center justify-center gap-0.5 py-2 flex-none w-[58px]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.7}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-gray-400" style={{ fontSize: '9px' }}>Cửa hàng</span>
          </button>

          <button className="flex flex-col items-center justify-center gap-0.5 py-2 flex-none w-[58px]" style={{ borderLeft: '1px solid #f3f3f3' }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.7}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-gray-400" style={{ fontSize: '9px' }}>Chat</span>
          </button>

          <button className="flex flex-col items-center justify-center gap-0.5 py-2 flex-none w-[58px]" style={{ borderLeft: '1px solid #f3f3f3' }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth={1.7}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h12M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
            <span className="font-medium" style={{ fontSize: '9px', color: '#DC2626' }}>Giỏ hàng</span>
          </button>

          <button
            onClick={() => scrollToForm(1)}
            className="flex-1 flex flex-col items-center justify-center py-2 px-3 active:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)', borderLeft: '1px solid #f3f3f3' }}
          >
            <span className="text-white font-semibold leading-snug" style={{ fontSize: '13px' }}>Mua ngay</span>
            <span className="text-white/80 leading-snug" style={{ fontSize: '10px' }}>
              Freeship · 179.000đ
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
