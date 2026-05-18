import { useState, useEffect } from 'react'
import biaSach from '../assets/sach-images/bia-hocit.png'
import biaSach2 from '../assets/sach-images/bia-murphy.jpg'
import biaSach3 from '../assets/sach-images/bia-dacnhantam.jpg'
import biaSach4 from '../assets/sach-images/bia-kyluat.webp'
import biaMeoUngXu from '../assets/sach-images/BÌA MẸO ỨNG XỬ LỊCH SỰ.webp'
import { submitOrder, validatePhone, validateName, validateAddress } from '../lib/submitOrder'

const StarIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#F59E0B">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const StepBadge = ({ n }) => (
  <span
    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
    style={{ background: '#DC2626', fontSize: '11px' }}
  >
    {n}
  </span>
)

const COMBO_BOOKS = {
  1: [
    { title: 'Học Ít Nhớ Nhiều', desc: 'Kỹ thuật ghi nhớ siêu tốc giúp con học nhanh, nhớ lâu hơn.', img: biaSach },
  ],
  2: [
    { title: 'Học Ít Nhớ Nhiều', desc: 'Kỹ thuật ghi nhớ siêu tốc giúp con học nhanh, nhớ lâu hơn.', img: biaSach },
    { title: 'Mẹo Ứng Xử Lịch Sự', desc: 'Cẩm nang vàng cho trẻ tự tin giao tiếp — 50+ tình huống thực tế giúp con biết chào hỏi, cảm ơn, xin lỗi đúng lúc và ứng xử khéo léo ở trường, ở nhà, nơi công cộng.', img: biaMeoUngXu },
  ],
  3: [
    { title: 'Học Ít Nhớ Nhiều', desc: 'Kỹ thuật ghi nhớ siêu tốc giúp con học nhanh, nhớ lâu hơn.', img: biaSach },
    { title: 'Định Luật Murphy', desc: '28 bài học truyện tranh giúp trẻ hiểu bản thân, quản lý cảm xúc và giao tiếp tự tin. Rèn tư duy thông minh và nhân cách vững vàng cho trẻ 6–15 tuổi.', img: biaSach2 },
    { title: 'Mẹo Ứng Xử Lịch Sự', desc: 'Cẩm nang vàng cho trẻ tự tin giao tiếp — 50+ tình huống thực tế giúp con biết chào hỏi, cảm ơn, xin lỗi đúng lúc và ứng xử khéo léo ở trường, ở nhà, nơi công cộng.', img: biaMeoUngXu },
  ],
  4: [
    { title: 'Học Ít Nhớ Nhiều', desc: 'Kỹ thuật ghi nhớ siêu tốc giúp con học nhanh, nhớ lâu hơn.', img: biaSach },
    { title: 'Định Luật Murphy', desc: '28 bài học truyện tranh giúp trẻ hiểu bản thân, quản lý cảm xúc và giao tiếp tự tin. Rèn tư duy thông minh và nhân cách vững vàng cho trẻ 6–15 tuổi.', img: biaSach2 },
    { title: 'Đắc Nhân Tâm Cho Trẻ', desc: 'Phiên bản đặc biệt từ kiệt tác của Dale Carnegie — dạy bé cách lắng nghe, kết bạn chân thành và ứng xử khéo léo trong mọi tình huống từ trường học đến gia đình.', img: biaSach3 },
    { title: 'Mẹo Ứng Xử Lịch Sự', desc: 'Cẩm nang vàng cho trẻ tự tin giao tiếp — 50+ tình huống thực tế giúp con biết chào hỏi, cảm ơn, xin lỗi đúng lúc và ứng xử khéo léo ở trường, ở nhà, nơi công cộng.', img: biaMeoUngXu },
    { title: 'Kỷ Luật Tự Giác', desc: 'Giúp trẻ làm chủ thời gian, vượt qua sự lười biếng và xây dựng thói quen tốt qua những câu chuyện thực tế. Hành trình từ kỷ luật bị ép buộc đến tự nguyện!', img: biaSach4, sectionTitle: '🎁 QUÀ TẶNG ĐẶC BIỆT' },
  ],
}

export default function FormCOD() {
  const [quantity, setQuantity] = useState(2)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState({ name: '', phone: '', address: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [successData, setSuccessData] = useState(null) // { orderId, total }
  const [errorMsg, setErrorMsg] = useState('')

  // Countdown — dùng chung deadline với Hero qua localStorage
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

  useEffect(() => {
    const handler = (e) => setQuantity(e.detail)
    window.addEventListener('openbook:selectQty', handler)
    return () => window.removeEventListener('openbook:selectQty', handler)
  }, [])

  useEffect(() => {
    let deadline = parseInt(localStorage.getItem('bhh_deadline'))
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + 24 * 60 * 60 * 1000
      localStorage.setItem('bhh_deadline', String(deadline))
    }
    const tick = () => {
      const diff = Math.max(0, deadline - Date.now())
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  const { hours, minutes, seconds } = timeLeft

  const PRICE_MAP = { 1: 179000, 2: 250000, 3: 350000, 4: 450000 }
  const priceBook = PRICE_MAP[quantity] || 179000
  const priceShip = 0
  const total = priceBook + priceShip
  const fmt = (n) => n.toLocaleString('vi-VN') + 'đ'

  const handleSubmit = async () => {
    // Validate
    const newErrors = { name: '', phone: '', address: '' }
    let hasError = false
    if (!validateName(name)) {
      newErrors.name = 'Tên tối thiểu 2 ký tự'
      hasError = true
    }
    if (!validatePhone(phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
      hasError = true
    }
    if (!validateAddress(address)) {
      newErrors.address = 'Địa chỉ tối thiểu 10 ký tự'
      hasError = true
    }
    if (hasError) {
      setErrors(newErrors)
      return
    }
    setErrors({ name: '', phone: '', address: '' })
    setStatus('submitting')

    const res = await submitOrder({ name: name.trim(), phone: phone.trim(), address: address.trim(), quantity })
    if (res.success) {
      setSuccessData({ orderId: res.orderId, total: res.total })
      setStatus('success')
      setName('')
      setPhone('')
      setAddress('')
      setQuantity(2)
    } else {
      setErrorMsg(res.error)
      setStatus('error')
    }
  }

  return (
    <>
      <section id="form-cod" style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Effect 5: Floating gold particles */}
        <div className="particle" style={{
          top: '8%', left: '6%',
          width: '8px', height: '8px',
          background: 'radial-gradient(circle, rgba(245,183,0,0.7), transparent 70%)',
          boxShadow: '0 0 12px rgba(245,183,0,0.5)',
          animation: 'float-particle-1 6s ease-in-out infinite',
        }} />
        <div className="particle" style={{
          top: '25%', right: '8%',
          width: '6px', height: '6px',
          background: 'radial-gradient(circle, rgba(245,183,0,0.6), transparent 70%)',
          boxShadow: '0 0 10px rgba(245,183,0,0.4)',
          animation: 'float-particle-2 8s ease-in-out infinite',
          animationDelay: '1s',
        }} />
        <div className="particle" style={{
          top: '60%', left: '12%',
          width: '5px', height: '5px',
          background: 'rgba(245,183,0,0.6)',
          boxShadow: '0 0 8px rgba(245,183,0,0.4)',
          animation: 'float-particle-3 7s ease-in-out infinite',
          animationDelay: '2s',
        }} />
        <div className="particle" style={{
          top: '85%', right: '15%',
          width: '7px', height: '7px',
          background: 'radial-gradient(circle, rgba(245,183,0,0.7), transparent 70%)',
          boxShadow: '0 0 10px rgba(245,183,0,0.5)',
          animation: 'float-particle-4 9s ease-in-out infinite',
          animationDelay: '0.5s',
        }} />

        {/* HEADING */}
        <div
          className="py-4 px-4 text-center"
          style={{ background: 'linear-gradient(135deg, #FFFBEA 0%, #FEF2F2 100%)' }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 bg-white" style={{ border: '1px solid #BBF7D0' }}>
            <span className="font-semibold" style={{ fontSize: '10px', color: '#16A34A' }}>
              ✓ ĐÃ CÓ 158.254 PHỤ HUYNH ĐẶT MUA
            </span>
          </div>
          <h2 className="font-extrabold text-gray-900" style={{ fontSize: '18px' }}>🎁 Đặt hàng ngay hôm nay</h2>
          <p className="mt-1" style={{ fontSize: '12px', color: '#6B7280' }}>Điền thông tin để nhận sách trong 2–4 ngày</p>
        </div>

        {/* Card sản phẩm tóm tắt — hiển thị ảnh bìa theo combo */}
        <div className="mx-4 mt-4 mb-4 backdrop-blur-md bg-white/60 border border-white/50 rounded-2xl shadow-[0_8px_32px_rgba(220,38,38,0.08)] p-3">
          <div className="flex gap-3 items-center">
            {/* Ảnh bìa sách — hiện đủ bìa thật theo combo */}
            <div className="flex items-end flex-shrink-0">
              {(COMBO_BOOKS[quantity] || [{ img: biaSach, title: 'Học Ít Nhớ Nhiều' }]).map((book, i, arr) => {
                const count = arr.length
                return (
                  <img
                    key={i}
                    src={book.img}
                    alt={book.title}
                    className="object-cover"
                    style={{
                      width: count === 1 ? '60px' : count === 2 ? '48px' : count === 3 ? '42px' : count === 4 ? '38px' : '34px',
                      height: count === 1 ? '80px' : count === 2 ? '66px' : count === 3 ? '58px' : count === 4 ? '52px' : '46px',
                      marginLeft: i > 0 ? '-12px' : '0',
                      zIndex: i,
                      position: 'relative',
                      boxShadow: '2px 2px 6px rgba(0,0,0,0.2)',
                      borderRadius: '6px',
                    }}
                  />
                )
              })}
            </div>

            {/* Thông tin sản phẩm */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-gray-900">
                {quantity === 1 ? 'Học Ít Nhớ Nhiều' : `Combo ${quantity} cuốn sách`}
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                {quantity === 1 ? 'Hoàng Văn Đặt · NXB Văn Học' : 'Bộ sách Gieo Mầm Nhân Cách'}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base font-extrabold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  {fmt(priceBook)}
                </span>
              </div>
            </div>
            <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex-shrink-0">FREESHIP</div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mx-4 mb-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl px-4 py-3 shadow-[0_4px_12px_rgba(220,38,38,0.3)] flex items-center justify-between">
          <span className="text-white text-xs font-medium flex items-center gap-1.5">
            <span className="text-base">⏰</span>
            Ưu đãi giới hạn còn:
          </span>
          <div className="flex items-center gap-1 text-white">
            <div className="bg-white text-red-600 px-2 py-1 rounded-md font-mono font-bold text-sm min-w-[36px] text-center">
              {hours.toString().padStart(2, '0')}h
            </div>
            <span className="font-bold">:</span>
            <div className="bg-white text-red-600 px-2 py-1 rounded-md font-mono font-bold text-sm min-w-[36px] text-center">
              {minutes.toString().padStart(2, '0')}m
            </div>
            <span className="font-bold">:</span>
            <div className="bg-white text-red-600 px-2 py-1 rounded-md font-mono font-bold text-sm min-w-[36px] text-center">
              {seconds.toString().padStart(2, '0')}s
            </div>
          </div>
        </div>

        {/* CHỌN SỐ LƯỢNG */}
        <div className="px-4 py-3 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <StepBadge n="1" />
            <span className="font-bold text-gray-900 text-sm">Chọn số lượng</span>
          </div>

          <div className="flex flex-col gap-3">
            {/* 1 cuốn — full width */}
            <button
              onClick={() => setQuantity(1)}
              className={`relative flex items-center justify-between p-3 transition-all duration-150${quantity === 1 ? ' card-active-glow' : ''}`}
              style={{
                border: quantity === 1 ? '2px solid #DC2626' : '2px solid #E5E5E5',
                borderRadius: '12px',
                background: quantity === 1 ? 'linear-gradient(135deg, #FFFBEA 0%, #FEF2F2 100%)' : 'white',
                boxShadow: quantity === 1 ? '0 4px 12px rgba(220,38,38,0.2)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="font-bold" style={{ fontSize: '11px', color: '#DC2626' }}>📚 1 CUỐN</p>
                <p className="mt-1" style={{ fontSize: '12px', color: '#374151', lineHeight: 1.5, fontWeight: 500 }}>
                  · Học Ít Nhớ Nhiều
                </p>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="font-extrabold leading-none" style={{ fontSize: '20px', color: '#DC2626' }}>179.000đ</p>
                <p className="italic mt-0.5 font-medium" style={{ fontSize: '12px', color: '#374151' }}>
                  (Giá Gốc <span className="line-through">250.000đ</span>)
                </p>
                <p className="mt-1 font-semibold" style={{ fontSize: '10px', color: '#16A34A' }}>✓ FREESHIP · Tiết kiệm 108.000đ</p>
              </div>
            </button>

            {/* Combo 2 — full width */}
            <button
              onClick={() => setQuantity(2)}
              className={`relative flex items-center justify-between p-3 transition-all duration-150${quantity === 2 ? ' card-active-glow' : ''}`}
              style={{
                border: quantity === 2 ? '2px solid #DC2626' : '2px solid #E5E5E5',
                borderRadius: '12px',
                background: quantity === 2 ? 'linear-gradient(135deg, #FFFBEA 0%, #FEF2F2 100%)' : 'white',
                boxShadow: quantity === 2 ? '0 4px 12px rgba(220,38,38,0.2)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span className="absolute -top-2 left-3 text-white font-bold" style={{ background: 'linear-gradient(90deg, #DC2626, #F77F00)', padding: '2px 8px', borderRadius: '4px', fontSize: '8px' }}>
                ⭐ TIẾT KIỆM
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold" style={{ fontSize: '11px', color: '#DC2626' }}>📚📚 COMBO 2</p>
                <p className="mt-1" style={{ fontSize: '12px', color: '#374151', lineHeight: 1.5, fontWeight: 500 }}>
                  · Học Ít Nhớ Nhiều<br />
                  · Mẹo Ứng Xử Lịch Sự
                </p>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="font-extrabold leading-none bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent" style={{ fontSize: '20px' }}>250.000đ</p>
                <p className="italic mt-0.5 font-medium" style={{ fontSize: '12px', color: '#374151' }}>
                  (Giá Gốc <span className="line-through">408.000đ</span>)
                </p>
                <p className="mt-1 font-semibold" style={{ fontSize: '10px', color: '#16A34A' }}>✓ FREESHIP · Tiết kiệm 158.000đ</p>
              </div>
            </button>

            {/* Combo 3 — full width */}
            <button
              onClick={() => setQuantity(3)}
              className={`relative flex items-center justify-between p-3 transition-all duration-150${quantity === 3 ? ' card-active-glow' : ''}`}
              style={{
                border: quantity === 3 ? '2px solid #DC2626' : '2px solid #E5E5E5',
                borderRadius: '12px',
                background: quantity === 3 ? 'linear-gradient(135deg, #FFFBEA 0%, #FEF2F2 100%)' : 'white',
                boxShadow: quantity === 3 ? '0 4px 12px rgba(220,38,38,0.2)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span className="absolute -top-2 left-3 text-white font-bold" style={{ background: 'linear-gradient(90deg, #F77F00, #EF4444)', padding: '2px 8px', borderRadius: '4px', fontSize: '8px' }}>
                🔥 COMBO KHUYẾN HỌC
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold" style={{ fontSize: '11px', color: '#DC2626' }}>📚📚📚 COMBO 3</p>
                <p className="mt-1" style={{ fontSize: '12px', color: '#374151', lineHeight: 1.5, fontWeight: 500 }}>
                  · Học Ít Nhớ Nhiều<br />
                  · Định Luật Murphy<br />
                  · Mẹo Ứng Xử Lịch Sự
                </p>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="font-extrabold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent" style={{ fontSize: '20px', lineHeight: 1 }}>350.000đ</p>
                <p className="italic mt-0.5 font-medium" style={{ fontSize: '12px', color: '#374151' }}>
                  (Giá Gốc <span className="line-through">558.000đ</span>)
                </p>
                <p className="mt-1 font-semibold" style={{ fontSize: '10px', color: '#16A34A' }}>✓ FREESHIP · Tiết kiệm 208.000đ</p>
              </div>
            </button>

            {/* Combo 4 — full width */}
            <button
              onClick={() => setQuantity(4)}
              className={`relative flex items-center justify-between p-3 transition-all duration-150${quantity === 4 ? ' card-active-glow' : ''}`}
              style={{
                border: quantity === 4 ? '2px solid #DC2626' : '2px solid #E5E5E5',
                borderRadius: '12px',
                background: quantity === 4 ? 'linear-gradient(135deg, #FFFBEA 0%, #FEF2F2 100%)' : 'white',
                boxShadow: quantity === 4 ? '0 4px 12px rgba(220,38,38,0.2)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span className="absolute -top-2 left-3 text-white font-bold" style={{ background: 'linear-gradient(90deg, #7C3AED, #DC2626)', padding: '2px 8px', borderRadius: '4px', fontSize: '8px' }}>
                👑 COMBO TOÀN DIỆN
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold" style={{ fontSize: '11px', color: '#DC2626' }}>📚📚📚📚 COMBO 4</p>
                <p className="mt-1" style={{ fontSize: '12px', color: '#374151', lineHeight: 1.5, fontWeight: 500 }}>
                  · Học Ít Nhớ Nhiều<br />
                  · Định Luật Murphy<br />
                  · Đắc Nhân Tâm Cho Trẻ<br />
                  · Mẹo Ứng Xử Lịch Sự<br />
                  · Kỷ Luật Tự Giác{' '}
                  <span
                    className="text-white font-extrabold rounded"
                    style={{
                      background: 'linear-gradient(90deg, #DC2626, #F77F00)',
                      fontSize: '9px',
                      padding: '2px 6px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    🎁 QUÀ TẶNG
                  </span>
                </p>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="font-extrabold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent" style={{ fontSize: '20px', lineHeight: 1 }}>450.000đ</p>
                <p className="italic mt-0.5 font-medium" style={{ fontSize: '12px', color: '#374151' }}>
                  (Giá Gốc <span className="line-through">828.000đ</span>)
                </p>
                <p className="mt-1 font-semibold" style={{ fontSize: '10px', color: '#16A34A' }}>✓ FREESHIP · Tiết kiệm 378.000đ</p>
              </div>
            </button>
          </div>

          {/* Panel thông tin sách — hiện cho 1 cuốn, Combo 3 và 4 */}
          {COMBO_BOOKS[quantity] && (
            <div
              className="mt-3 p-3"
              style={{ background: '#FFFBEA', border: '1px dashed #F5B700', borderRadius: '10px' }}
            >
              <p className="font-bold mb-3" style={{ fontSize: '11px', color: '#92400E' }}>
                {quantity === 1
                  ? '📦 Sách bạn chọn:'
                  : `📦 Combo gồm ${COMBO_BOOKS[quantity].length} cuốn:`}
              </p>
              <div className="flex flex-col">
                {COMBO_BOOKS[quantity].map((book, i) => (
                  <div key={i}>
                    {book.sectionTitle ? (
                      <div
                        className="mt-4 mb-3 py-2 px-3 text-center text-white font-extrabold rounded-lg"
                        style={{
                          background: 'linear-gradient(90deg, #DC2626 0%, #F77F00 100%)',
                          fontSize: '16px',
                          letterSpacing: '0.5px',
                          boxShadow: '0 4px 12px rgba(220,38,38,0.25)',
                        }}
                      >
                        {book.sectionTitle}
                      </div>
                    ) : (
                      i > 0 && <div style={{ borderTop: '1px dashed #FDE68A', margin: '10px 0' }} />
                    )}
                    <div className="flex items-center gap-2.5">
                      <img src={book.img} alt={book.title} className="flex-shrink-0 rounded object-cover shadow-sm" style={{ width: '38px', height: '52px' }} />
                      <div>
                        <p className="font-bold text-gray-900 flex items-center gap-1.5 flex-wrap" style={{ fontSize: '12px' }}>
                          {book.title}
                          {book.sectionTitle && (
                            <span
                              className="text-white font-extrabold rounded"
                              style={{
                                background: 'linear-gradient(90deg, #DC2626, #F77F00)',
                                fontSize: '9px',
                                padding: '2px 6px',
                                letterSpacing: '0.5px',
                              }}
                            >
                              🎁 QUÀ TẶNG
                            </span>
                          )}
                        </p>
                        <p className="text-gray-500 mt-0.5 leading-snug" style={{ fontSize: '10px' }}>{book.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            className="mt-3 py-2 px-3 text-center"
            style={{ background: '#FEF3C7', border: '1px dashed #F5B700', borderRadius: '8px' }}
          >
            <p className="font-medium" style={{ fontSize: '11px', color: '#92400E' }}>
              {quantity === 1 && '💡 Mua combo 2 cuốn chỉ 250K – tiết kiệm thêm 108K so với mua lẻ!'}
              {quantity === 2 && '🎉 Bạn tiết kiệm 108K so với mua 2 cuốn lẻ!'}
              {quantity === 3 && '🔥 Combo 3 cuốn — bộ kỹ năng học tập hoàn chỉnh!'}
              {quantity === 4 && '👑 Combo 4 cuốn — bộ toàn diện, giá tốt nhất!'}
            </p>
          </div>
        </div>

        {/* FORM INPUTS */}
        <div className="px-4 pb-3 bg-white" style={{ borderBottom: '8px solid #f5f5f5' }}>
          <div className="flex items-center gap-2 mb-3">
            <StepBadge n="2" />
            <span className="font-bold text-gray-900 text-sm">Thông tin nhận hàng</span>
          </div>

          <div className="flex flex-col gap-2.5">
            <div>
              <div className={`input-magic${errors.name ? ' border-red-500' : ''}`}>
                <span className="input-icon flex-shrink-0 text-base leading-none">👤</span>
                <input
                  type="text"
                  placeholder="Họ và tên *"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400"
                  style={{ border: 'none', outline: 'none' }}
                />
              </div>
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <div className={`input-magic${errors.phone ? ' border-red-500' : ''}`}>
                <span className="input-icon flex-shrink-0 text-base leading-none">📞</span>
                <input
                  type="tel"
                  placeholder="Số điện thoại *"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: '' })) }}
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400"
                  style={{ border: 'none', outline: 'none' }}
                />
              </div>
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <div className={`input-magic${errors.address ? ' border-red-500' : ''}`} style={{ alignItems: 'flex-start' }}>
                <span className="input-icon flex-shrink-0 text-base leading-none mt-0.5">📍</span>
                <textarea
                  placeholder="Địa chỉ giao hàng *"
                  value={address}
                  onChange={e => { setAddress(e.target.value); setErrors(p => ({ ...p, address: '' })) }}
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 resize-none"
                  style={{ border: 'none', outline: 'none', minHeight: '60px', fontFamily: 'inherit' }}
                />
              </div>
              {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* TỔNG TIỀN */}
        <div className="mx-4 my-4">
          <div className="backdrop-blur-md bg-[rgba(255,251,234,0.7)] border border-[rgba(253,230,138,0.6)] rounded-2xl shadow-[0_8px_32px_rgba(220,38,38,0.08)] p-3">
            <p className="font-bold uppercase mb-2" style={{ fontSize: '10px', color: '#92400E', letterSpacing: '0.08em' }}>
              💰 TỔNG TIỀN
            </p>

            {COMBO_BOOKS[quantity] && (
              <p className="font-bold mb-2" style={{ fontSize: '12px', color: '#4A1B0C', lineHeight: 1.45 }}>
                COMBO {quantity} cuốn{' '}
                {COMBO_BOOKS[quantity]
                  .filter((b) => !b.sectionTitle)
                  .map((b) => `"${b.title}"`)
                  .join(', ')}
              </p>
            )}

            {COMBO_BOOKS[quantity]?.find((b) => b.sectionTitle) && (
              <p
                className="font-semibold mb-2 px-2 py-1.5 rounded-md"
                style={{
                  fontSize: '12px',
                  color: '#92400E',
                  background: 'linear-gradient(90deg, rgba(220,38,38,0.08), rgba(247,127,0,0.08))',
                  border: '1px dashed #F77F00',
                  lineHeight: 1.45,
                }}
              >
                🎁 Quà Tặng Từ Nhà Sách: Cuốn{' '}
                <span className="font-extrabold" style={{ color: '#DC2626' }}>
                  {COMBO_BOOKS[quantity].find((b) => b.sectionTitle).title}
                </span>{' '}
                <span className="font-extrabold" style={{ color: '#16A34A' }}>0đ</span>
              </p>
            )}

            <div className="flex justify-between items-center">
              <span style={{ fontSize: '12px', color: '#4A1B0C' }}>Giá Ưu Đãi Chỉ Hôm Nay:</span>
              <span className="font-medium" style={{ fontSize: '12px', color: '#4A1B0C' }}>{fmt(priceBook)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span style={{ fontSize: '12px', color: '#4A1B0C' }}>Phí ship:</span>
              <span className="font-semibold flex items-center gap-1" style={{ fontSize: '12px', color: '#16A34A' }}>
                0đ
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="13" height="11" rx="1" />
                  <path d="M14 9h4l3 4v4h-7" />
                  <circle cx="5.5" cy="18.5" r="2" />
                  <circle cx="17.5" cy="18.5" r="2" />
                </svg>
                Freeship
              </span>
            </div>

            <div style={{ borderTop: '1px dashed #FDE68A', marginTop: '8px', paddingTop: '8px' }}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 text-sm">TỔNG:</span>
                <span
                  className="font-extrabold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent leading-none"
                  style={{ fontSize: '24px' }}
                >
                  {fmt(total)}
                </span>
              </div>
              {quantity >= 2 && (
                <p className="text-right font-medium mt-0.5" style={{ fontSize: '10px', color: '#16A34A' }}>
                  {quantity === 2 && 'Tiết kiệm so với mua lẻ: 158.000đ'}
                  {quantity === 3 && 'Tiết kiệm so với mua lẻ: 208.000đ'}
                  {quantity === 4 && 'Tiết kiệm so với mua lẻ: 378.000đ'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* NÚT ĐẶT HÀNG */}
        <div id="order-btn" className="mx-4 mb-2">
          <button
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 text-white font-extrabold active:scale-[0.98] transition-transform animate-pulse-zoom"
            style={{
              background: 'linear-gradient(90deg, #DC2626 0%, #F77F00 100%)',
              padding: '14px 0',
              borderRadius: '12px',
              fontSize: '16px',
              boxShadow: '0 6px 16px rgba(220,38,38,0.35)',
              border: 'none',
              opacity: status === 'submitting' ? 0.8 : 1,
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            }}
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                </svg>
                Đang gửi...
              </>
            ) : (
              '🛒 ĐẶT HÀNG NGAY'
            )}
          </button>
          <p className="text-center mt-2" style={{ fontSize: '10px', color: '#6B7280' }}>
            ✓ Thanh toán khi nhận hàng (COD) · Không trả trước
          </p>
        </div>

        {/* TRUST SIGNALS */}
        <div
          className="mx-4 mb-4 p-3"
          style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px' }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            {[1,2,3,4,5].map(s => <StarIcon key={s} />)}
            <span className="font-bold" style={{ fontSize: '11px', color: '#166534' }}>5.0 từ 11.534 phụ huynh</span>
          </div>
          <div className="flex flex-col gap-1">
            {[
              '✅ Sách thật 100% - NXB Văn Học',
              '✅ Phụ huynh được kiểm tra sách, yên tâm thì mới nhận hàng',
              '✅ Cam kết bảo mật thông tin',
            ].map(t => (
              <p key={t} style={{ fontSize: '10px', color: '#166534' }}>{t}</p>
            ))}
          </div>
        </div>

      </section>

      {/* MODAL SUCCESS */}
      {status === 'success' && successData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div
            className="bg-white w-full text-center"
            style={{
              borderRadius: '16px',
              padding: '32px 24px',
              maxWidth: '320px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              animation: 'popIn 0.25s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg, #16A34A, #22C55E)' }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-extrabold text-gray-900 mb-2" style={{ fontSize: '18px' }}>
              Đặt hàng thành công! 🎉
            </h3>
            <p className="font-mono text-sm text-gray-500 mb-1">Mã đơn: <strong className="text-gray-800">{successData.orderId}</strong></p>
            <p className="font-bold text-lg mb-3" style={{ color: '#DC2626' }}>
              {successData.total.toLocaleString('vi-VN')}đ
            </p>
            <div
              className="rounded-lg p-3 mb-4 text-left"
              style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
            >
              <p style={{ fontSize: '12px', color: '#166534' }}>
                🚚 Nhà Sách sẽ liên hệ anh/chị trong <strong>30 phút</strong> để xác nhận đơn và giao hàng trong 2–4 ngày.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStatus('idle')}
                className="flex-1 font-semibold py-2.5 rounded-xl border border-gray-200 text-gray-600"
                style={{ fontSize: '13px' }}
              >
                Đóng
              </button>
              <a
                href="tel:0339604426"
                className="flex-1 flex items-center justify-center font-bold py-2.5 rounded-xl text-white"
                style={{ background: 'linear-gradient(90deg, #DC2626 0%, #F77F00 100%)', fontSize: '13px' }}
              >
                Gọi Nhà Sách ngay
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ERROR */}
      {status === 'error' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div
            className="bg-white w-full text-center"
            style={{
              borderRadius: '16px',
              padding: '32px 24px',
              maxWidth: '320px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              animation: 'popIn 0.25s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: '#FEF2F2', border: '2px solid #FECACA' }}
            >
              <svg className="w-8 h-8" fill="none" stroke="#DC2626" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="font-extrabold text-gray-900 mb-2" style={{ fontSize: '16px' }}>
              Lỗi gửi đơn
            </h3>
            <p className="text-gray-500 mb-4" style={{ fontSize: '13px' }}>
              Vui lòng gọi <strong className="text-red-600">0339 604 426</strong> để đặt trực tiếp.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setStatus('idle')}
                className="flex-1 font-semibold py-2.5 rounded-xl border border-gray-200 text-gray-600"
                style={{ fontSize: '13px' }}
              >
                Đóng
              </button>
              <a
                href="tel:0339604426"
                className="flex-1 flex items-center justify-center font-bold py-2.5 rounded-xl text-white"
                style={{ background: 'linear-gradient(90deg, #DC2626 0%, #F77F00 100%)', fontSize: '13px' }}
              >
                Gọi ngay
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
