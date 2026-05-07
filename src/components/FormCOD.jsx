import { useState, useEffect, useRef } from 'react'
import biaSach from '../assets/sach-images/sach-1.png'
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

export default function FormCOD() {
  const [quantity, setQuantity] = useState(2)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState({ name: '', phone: '', address: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [successData, setSuccessData] = useState(null) // { orderId, total }
  const [errorMsg, setErrorMsg] = useState('')

  // Countdown timer
  const targetTimeRef = useRef(Date.now() + 12 * 60 * 60 * 1000)
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetTimeRef.current - Date.now())
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

  const priceBook = quantity === 1 ? 129000 : 258000
  const priceShip = quantity >= 2 ? 0 : 20000
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
              ✓ ĐÃ CÓ 1.247 PHỤ HUYNH ĐẶT MUA
            </span>
          </div>
          <h2 className="font-extrabold text-gray-900" style={{ fontSize: '18px' }}>🎁 Đặt hàng ngay hôm nay</h2>
          <p className="mt-1" style={{ fontSize: '12px', color: '#6B7280' }}>Điền thông tin để nhận sách trong 2–4 ngày</p>
        </div>

        {/* Card sản phẩm tóm tắt (glassmorphism) */}
        <div className="mx-4 mt-4 mb-4 backdrop-blur-md bg-white/60 border border-white/50 rounded-2xl shadow-[0_8px_32px_rgba(220,38,38,0.08)] p-3 flex gap-3 items-center">
          <img
            src={biaSach}
            alt="Học Ít Nhớ Nhiều"
            className="w-[60px] h-[80px] rounded-md shadow-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-gray-900">Học Ít Nhớ Nhiều</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Đạt Hoàng · NXB Tri Thức</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base font-extrabold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                129.000đ
              </span>
              <span className="text-[10px] text-gray-400 line-through">205.000đ</span>
            </div>
          </div>
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex-shrink-0">-37%</div>
        </div>

        {/* Countdown Timer */}
        <div className="mx-4 mb-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl px-4 py-3 shadow-[0_4px_12px_rgba(220,38,38,0.3)] flex items-center justify-between">
          <span className="text-white text-xs font-medium flex items-center gap-1.5">
            <span className="text-base">⏰</span>
            Ưu đãi -37% còn:
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

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setQuantity(1)}
              className={`text-center p-3 transition-all duration-150${quantity === 1 ? ' card-active-glow' : ''}`}
              style={{
                border: quantity === 1 ? '2px solid #DC2626' : '2px solid #E5E5E5',
                borderRadius: '12px',
                background: quantity === 1
                  ? 'linear-gradient(135deg, #FFFBEA 0%, #FEF2F2 100%)'
                  : 'white',
                boxShadow: quantity === 1 ? '0 4px 12px rgba(220,38,38,0.2)' : 'none',
                cursor: 'pointer',
              }}
            >
              <p style={{ fontSize: '11px', color: '#6B7280' }}>📚 1 CUỐN</p>
              <p className="font-extrabold leading-none mt-1" style={{ fontSize: '20px', color: '#DC2626' }}>129.000đ</p>
              <p className="mt-1 font-semibold" style={{ fontSize: '10px', color: '#16A34A' }}>Tiết kiệm 76K</p>
            </button>

            <button
              onClick={() => setQuantity(2)}
              className={`relative text-center p-3 transition-all duration-150${quantity === 2 ? ' card-active-glow' : ''}`}
              style={{
                border: '2px solid #DC2626',
                borderRadius: '12px',
                background: quantity === 2
                  ? 'linear-gradient(135deg, #FFFBEA 0%, #FEF2F2 100%)'
                  : 'white',
                boxShadow: quantity === 2 ? '0 4px 12px rgba(220,38,38,0.2)' : 'none',
                cursor: 'pointer',
              }}
            >
              <span
                className="absolute -top-2 right-2 text-white font-bold"
                style={{
                  background: 'linear-gradient(90deg, #DC2626, #F77F00)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '8px',
                }}
              >
                ⭐ TIẾT KIỆM
              </span>
              <p className="font-bold" style={{ fontSize: '11px', color: '#DC2626' }}>📚📚 2 CUỐN</p>
              <p
                className="font-extrabold leading-none mt-1 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
                style={{ fontSize: '20px' }}
              >
                258.000đ
              </p>
              <p className="mt-1 font-semibold" style={{ fontSize: '10px', color: '#16A34A' }}>✓ FREESHIP + Tặng 40K</p>
            </button>
          </div>

          <div
            className="mt-3 py-2 px-3 text-center"
            style={{ background: '#FEF3C7', border: '1px dashed #F5B700', borderRadius: '8px' }}
          >
            <p className="font-medium" style={{ fontSize: '11px', color: '#92400E' }}>
              💡 Mua 2 cuốn tiết kiệm 40K + miễn phí ship!
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

            <div className="flex justify-between items-center">
              <span style={{ fontSize: '12px', color: '#4A1B0C' }}>Sách x {quantity}:</span>
              <span className="font-medium" style={{ fontSize: '12px', color: '#4A1B0C' }}>{fmt(priceBook)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span style={{ fontSize: '12px', color: '#4A1B0C' }}>Phí ship:</span>
              {quantity >= 2
                ? <span className="font-semibold" style={{ fontSize: '12px', color: '#16A34A' }}>0đ ✓</span>
                : <span style={{ fontSize: '12px', color: '#6B7280' }}>{fmt(priceShip)}</span>
              }
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
                  Bạn tiết kiệm: 210.000đ
                </p>
              )}
            </div>
          </div>
        </div>

        {/* NÚT ĐẶT HÀNG */}
        <div className="mx-4 mb-2">
          <button
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 text-white font-extrabold active:scale-[0.98] transition-transform"
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
            <span className="font-bold" style={{ fontSize: '11px', color: '#166534' }}>5.0 từ 4.092 phụ huynh</span>
          </div>
          <div className="flex flex-col gap-1">
            {[
              '✅ Sách thật 100% - NXB Tri Thức',
              '✅ Đổi trả miễn phí trong 7 ngày',
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
                🚚 Shop sẽ liên hệ anh/chị trong <strong>30 phút</strong> để xác nhận đơn và giao hàng trong 2–4 ngày.
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
                href="tel:0932392195"
                className="flex-1 flex items-center justify-center font-bold py-2.5 rounded-xl text-white"
                style={{ background: 'linear-gradient(90deg, #DC2626 0%, #F77F00 100%)', fontSize: '13px' }}
              >
                Gọi shop ngay
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
              Vui lòng gọi <strong className="text-red-600">0932 392 195</strong> để đặt trực tiếp.
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
                href="tel:0932392195"
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
