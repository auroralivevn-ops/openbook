import sach1 from '../assets/sach-images/1.webp'
import sach2 from '../assets/sach-images/2.webp'
import sach7 from '../assets/sach-images/7.webp'
import sach8 from '../assets/sach-images/8.webp'
import biaSach from '../assets/sach-images/bia-chuan.webp'
import { RevealItem } from '../hooks/RevealItem'

/* ── Icons ── */
const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

/* ── Câu chuyện minh họa ── */
const STORIES = [
  {
    n: '01', img: sach1,
    title: 'Bát Cơm Con Bỏ, Bữa Đói Mẹ Giấu',
    story: 'Con từng nghĩ một bát cơm là chuyện rất bình thường. Không thích thì bỏ, không ngon thì chê, thèm món khác thì đòi. Nhưng con không biết rằng, có những năm tháng để con được ăn no, mẹ đã từng giấu đi phần đói của mình. Có những bữa cơm đầy lên trong bát con, là nhờ cha mẹ âm thầm nhận về mình phần thiếu thốn.',
    lesson: 'Con ngộ ra rằng bữa cơm đủ đầy hôm nay không tự nhiên mà có. Phía sau mỗi hạt cơm là công sức, là mồ hôi, là những nhọc nhằn cha mẹ không kể. Từ nay, con muốn biết trân trọng hơn: không chê bai, không lãng phí, không xem tình thương trong bữa cơm nhà là điều hiển nhiên.',
  },
  {
    n: '02', img: sach2,
    title: 'Đừng Đợi Cha Mẹ Nằm Viện Mới Biết Thương',
    story: 'Con từng nghĩ cha mẹ lúc nào cũng khỏe. Mẹ vẫn dậy sớm nấu cơm, bố vẫn đi làm, vẫn sửa đồ, vẫn hỏi con học hành thế nào. Con quen với sự có mặt của cha mẹ đến mức quên mất rằng cha mẹ cũng biết đau, biết mệt, biết có những ngày gần như kiệt sức mà vẫn cố gắng vì con. Chỉ đến khi nhìn cha mẹ nằm trên giường bệnh, con mới hiểu: căn nhà này đã được chống đỡ bằng rất nhiều mỏi mệt âm thầm.',
    lesson: 'Con ngộ ra rằng thương cha mẹ không thể đợi đến lúc quá muộn. Không phải đợi cha mẹ ốm mới hỏi han, không phải đợi cha mẹ nằm viện mới biết lo. Từ hôm nay, con muốn dịu dàng hơn trong những ngày bình thường: biết phụ giúp, biết quan tâm, biết nói một lời thương trước khi những điều giản dị ấy trở thành điều con không còn kịp làm nữa.',
  },
  {
    n: '03', img: sach7,
    title: 'Trước Khi Làm Sai, Hãy Nghĩ Đến Cha Mẹ',
    story: 'Có những lỗi lầm con tưởng chỉ là chuyện của riêng mình. Một phút bốc đồng, một lần nghe theo bạn xấu, một việc làm sai tưởng như nhỏ… nhưng phía sau đó có thể là nước mắt của mẹ, là dáng cha lặng đi, là cả gia đình đau đớn vì con.',
    lesson: 'Con ngộ ra rằng trước khi làm sai, con không chỉ đang đánh mất chính mình, mà còn làm đau những người thương con nhất. Từ nay, con muốn biết dừng lại trước cám dỗ, biết nghĩ đến cha mẹ, và biết chịu trách nhiệm với cuộc đời mình.',
  },
  {
    n: '04', img: sach8,
    title: 'Đến Khi Không Còn Ai Nhắc Nữa, Con Mới Hiểu Đó Là Yêu Thương',
    story: 'Con từng thấy những lời nhắc của mẹ thật phiền: ăn cơm đi, mặc thêm áo vào, đừng thức khuya, đi đường cẩn thận. Con từng mong có một ngày không còn ai nhắc mình nữa. Nhưng đến khi căn nhà vắng đi một tiếng gọi quen thuộc, con mới hiểu: có những lời tưởng như cằn nhằn, thật ra là cách yêu thương ở lại bên con mỗi ngày.',
    lesson: 'Con ngộ ra rằng lời nhắc của cha mẹ không phải lúc nào cũng còn mãi. Từ nay, con muốn biết lắng nghe nhiều hơn, đáp lại dịu dàng hơn, và trân trọng những tiếng gọi thân quen khi vẫn còn có thể nghe thấy.',
  },
]

/* ── 5 lý do nên có sách trong nhà ── */
const REASONS = [
  {
    id: '01', icon: '💗', title: 'Chạm tim, không giáo điều',
    desc: 'Không lên lớp, không đạo lý khô khan — chỉ những câu chuyện đời thường khiến con tự nhìn lại mình',
    stat: 'Dễ đọc, dễ thấm',
    bg: '#FEF2F2', border: '#E74C3C', iconBg: '#FECACA', text: '#C0392B', highlight: false,
  },
  {
    id: '02', icon: '📱', title: 'Kéo con rời màn hình',
    desc: 'Một cuốn sách đủ sâu để con đặt điện thoại xuống và mở lại những cuộc trò chuyện trong nhà',
    stat: 'Bữa cơm ấm lại',
    bg: '#EEF5F9', border: '#1B4D7C', iconBg: '#D9EBF7', text: '#1B4D7C', highlight: false,
  },
  {
    id: '03', icon: '👨‍👩‍👧', title: 'Hợp cả nhà, mọi lứa tuổi',
    desc: 'Từ con tiểu học đến người lớn đều tìm thấy mình trong đó — một cuốn cả nhà chuyền tay nhau đọc',
    stat: 'Cả nhà cùng đọc',
    bg: '#FFF5E6', border: '#F77F00', iconBg: '#FFE8CC', text: '#F77F00', highlight: false,
  },
  {
    id: '04', icon: '🎁', title: 'Món quà ý nghĩa hơn vật chất',
    desc: 'Tặng con, tặng cha mẹ, tặng người thân — một món quà nói thay những điều ta ngại nói ra',
    stat: 'Quà tặng để đời',
    bg: '#F9F0FA', border: '#9333EA', iconBg: '#F0D9F5', text: '#9333EA', highlight: false,
  },
  {
    id: '05', icon: '⏳', title: 'Đọc một lần, thấm cả đời',
    desc: 'Không phải sách đọc rồi quên — đây là cuốn sách con sẽ giữ lại, đọc lại, và hiểu thêm theo năm tháng',
    stat: 'Giá trị theo thời gian',
    bg: '#FFF8E1', border: '#F5B700', iconBg: '#FFECB3', text: '#C8102E', highlight: true,
  },
]

/* ── Thẻ 1 lý do ── */
function ReasonCard({ r }) {
  return (
    <div
      className="relative h-full rounded-2xl p-3 hover:scale-[1.02] transition-transform duration-200"
      style={{ background: r.bg, border: `2px solid ${r.border}` }}
    >
      {r.highlight && (
        <span
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-white font-bold px-2 py-0.5 rounded-full"
          style={{ background: r.text, fontSize: '9px' }}
        >
          ★ Đáng giữ nhất
        </span>
      )}
      <div className="flex items-center justify-between mb-2">
        <div
          className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0"
          style={{ background: r.iconBg, fontSize: '16px' }}
        >
          {r.icon}
        </div>
        <span style={{ fontSize: '10px', color: r.text, fontWeight: 700 }}>{r.id}</span>
      </div>
      <p className="font-bold mb-1 leading-snug" style={{ fontSize: '12px', color: r.text }}>
        {r.title}
      </p>
      <p className="leading-relaxed mb-2.5" style={{ fontSize: '10.5px', color: '#6B5D54' }}>
        {r.desc}
      </p>
      <span
        className="inline-block px-2 py-0.5 rounded-full font-semibold"
        style={{ fontSize: '9px', background: r.iconBg, color: r.text }}
      >
        {r.stat}
      </span>
    </div>
  )
}

export default function BookShowcase() {
  const scrollToForm = () => {
    window.dispatchEvent(new CustomEvent('openbook:selectQty', { detail: 1 }))
    setTimeout(() => {
      document.getElementById('order-btn')?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 50)
  }

  return (
    <>
      {/* ═══════════════════════════════════════
          SECTION 1: GIỚI THIỆU SÁCH
      ═══════════════════════════════════════ */}
      <section className="px-4 py-6" style={{ background: 'linear-gradient(180deg, #FFFBF5 0%, #FFF5F5 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <RevealItem className="text-center mb-5">
            <span
              className="inline-block text-white font-bold px-3 py-1 rounded-full mb-3"
              style={{ background: 'linear-gradient(90deg, #E74C3C, #C0392B)', fontSize: '10px', letterSpacing: '0.08em' }}
            >
              ❤️ CUỐN SÁCH DÀNH CHO CON
            </span>
            <h2
              className="font-bold text-[#1F1B16] leading-tight mb-3"
              style={{ fontSize: 'clamp(20px, 5.5vw, 26px)' }}
            >
              Có bao giờ con từng tự hỏi:<br />
              <span style={{ color: '#C0392B' }}>"Tại sao bố mẹ lại làm vậy?"</span>
            </h2>
            <p className="text-[13px] text-[#6B5D54] leading-relaxed max-w-sm mx-auto">
              Con chỉ thấy mẹ hay nhắc, bố hay nghiêm, những lần bị mắng, bị phạt, bị bắt học bài, dọn phòng, đi ngủ sớm…
            </p>
            <p className="text-[13px] text-[#6B5D54] leading-relaxed max-w-sm mx-auto mt-2">
              Nhưng phía sau đó là rất nhiều <strong style={{ color: '#C0392B' }}>nỗi lòng bố mẹ chưa từng nói ra.</strong>
            </p>
            <p className="text-[13px] text-[#6B5D54] leading-relaxed max-w-sm mx-auto mt-2">
              Cuốn sách này giúp con hiểu rằng: bố mẹ có thể chưa hoàn hảo, nhưng đã <strong style={{ color: '#C0392B' }}>thương con nhiều hơn con từng nghĩ.</strong>
            </p>
          </RevealItem>

          {/* Emotional quote block */}
          <RevealItem delay={100}>
            <div
              className="relative rounded-2xl p-5 text-center"
              style={{
                background: 'linear-gradient(135deg, #FFF0F0 0%, #FFEAEA 100%)',
                border: '1px solid rgba(231,76,60,0.15)',
              }}
            >
              <span style={{ fontSize: '32px', lineHeight: 1 }}>📖</span>
              <p
                className="font-medium leading-relaxed mt-3 italic"
                style={{ fontSize: '14px', color: '#7B341E' }}
              >
                "Nếu con được làm bố mẹ một ngày, con sẽ hiểu: bình yên của con được cha mẹ âm thầm giữ gìn bằng rất nhiều lo toan chưa từng nói ra."
              </p>
              <p className="mt-2" style={{ fontSize: '11px', color: '#B4B2A9' }}>
                — Trích "Nếu Con Làm Bố Mẹ Một Ngày"
              </p>
            </div>
          </RevealItem>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 1.5: GIỚI THIỆU SÁCH
      ═══════════════════════════════════════ */}
      <section className="px-4 py-6" style={{ background: 'linear-gradient(180deg, #FFF5F5 0%, #FFFBF5 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <RevealItem className="text-center mb-5">
            <span className="block text-[11px] font-medium uppercase tracking-[0.15em] text-[#C0392B] mb-1">
              Giới thiệu sách
            </span>
            <h2
              className="font-bold text-[#1F1B16] leading-tight mb-2"
              style={{ fontSize: 'clamp(20px, 5.5vw, 26px)' }}
            >
              Nếu Con Làm Bố Mẹ Một Ngày
            </h2>
            <p className="text-[13px] text-[#6B5D54] max-w-sm mx-auto">
              Một cuốn sách giúp con hiểu và trân trọng bố mẹ nhiều hơn
            </p>
          </RevealItem>

          <RevealItem delay={100}>
            <div className="flex gap-4 items-start">
              {/* Ảnh bìa sách */}
              <div className="flex-shrink-0" style={{ width: '38%', maxWidth: '170px' }}>
                <img
                  src={biaSach}
                  alt="Bìa sách Nếu Con Làm Bố Mẹ Một Ngày"
                  className="w-full h-auto rounded-2xl shadow-[0_8px_24px_rgba(231,76,60,0.15)]"
                  style={{ aspectRatio: '1054 / 1492' }}
                  loading="lazy"
                />
              </div>

              {/* Nội dung giới thiệu */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#6B5D54] leading-relaxed mb-3">
                  <strong style={{ color: '#C0392B' }}>"Nếu Con Làm Bố Mẹ Một Ngày"</strong> là tuyển tập những lát cắt rất đỗi đời thường về tình cha mẹ — con cái. Mỗi chương là một câu chuyện quen thuộc trong mỗi gia đình Việt, được kể qua một góc nhìn ngược: <em>nếu một ngày con được đặt vào vị trí của bố mẹ, con sẽ hiểu họ đã âm thầm gánh những gì.</em>
                </p>
                <p className="text-[13px] text-[#6B5D54] leading-relaxed">
                  Không giáo điều, không lên lớp — chỉ là những trang viết chạm thẳng vào trái tim, để con kịp nhận ra những yêu thương vẫn luôn ở đó, sau mỗi lời cằn nhằn và mỗi hy sinh lặng lẽ của cha mẹ.
                </p>
              </div>
            </div>
          </RevealItem>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2: THÔNG ĐIỆP CUỐN SÁCH
      ═══════════════════════════════════════ */}
      <section className="px-4 py-6 bg-[#FFFBF5]">
        <div className="max-w-3xl mx-auto">
          {/* Closing message */}
          <RevealItem>
            <div className="text-center py-4 px-3 rounded-xl" style={{ background: '#FFF8E1', border: '1px dashed #FDE68A' }}>
              <p className="text-[13px] font-medium" style={{ color: '#92400E' }}>
                📖 Cuốn sách không bắt con phải nghĩ rằng bố mẹ hoàn hảo.<br /><br />
                Cuốn sách chỉ mong con nhìn thấy: phía sau những điều con từng khó chịu, là rất nhiều <strong>lo lắng, hy sinh và tình thương</strong> mà bố mẹ chưa từng nói hết thành lời.
              </p>
            </div>
          </RevealItem>

          <RevealItem delay={100} className="mt-4">
            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: 'linear-gradient(135deg, #FFF0F0 0%, #FFEAEA 100%)',
                border: '1px solid rgba(231,76,60,0.12)',
              }}
            >
              <p className="text-[13px] text-[#4A1B0C] leading-relaxed">
                Có những lời bố mẹ rất muốn nói với con, nhưng lại khó nói trực tiếp.
              </p>
              <p className="text-[13px] text-[#4A1B0C] leading-relaxed mt-3 font-medium">
                Cuốn sách này <strong style={{ color: '#C0392B' }}>thay bố mẹ gửi đến con những nỗi lòng ấy</strong> — bằng những câu chuyện nhẹ nhàng, gần gũi, để con dễ lắng nghe hơn, dễ đặt mình vào vị trí của bố mẹ hơn.
              </p>
            </div>
          </RevealItem>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4: CÂU CHUYỆN MINH HOẠ
      ═══════════════════════════════════════ */}
      <section className="bg-[#FFFBF5] py-6 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <RevealItem className="text-center mb-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#C8102E] mb-1">
              Những lát cắt trong cuốn sách
            </p>
            <h2
              className="font-bold text-[#1F1B16] leading-tight mb-1"
              style={{ fontSize: 'clamp(18px, 5vw, 24px)' }}
            >
              Mỗi trang là một lần con soi lại mình
            </h2>
            <p className="text-[13px] text-[#6B5D54] max-w-sm mx-auto">
              Không phải lý thuyết đạo đức khô cứng. Sách dùng những cảnh rất quen để con tự thấy mình trong đó.
            </p>
          </RevealItem>

          {/* Stories — thẻ chương */}
          <div className="flex flex-col gap-6">
            {STORIES.map((story) => (
              <RevealItem key={story.n} delay={100}>
                <div
                  className="overflow-hidden rounded-3xl bg-white hover:-translate-y-0.5 transition-transform duration-300"
                  style={{
                    border: '1px solid rgba(231,76,60,0.12)',
                    boxShadow: '0 10px 30px rgba(231,76,60,0.10)',
                  }}
                >
                  {/* Ảnh banner + số chương nổi ở góc */}
                  <div className="relative">
                    <img
                      src={story.img}
                      alt={story.title}
                      className="w-full h-auto block"
                      style={{ aspectRatio: '2008 / 2835' }}
                      loading="lazy"
                    />
                    <div
                      className="absolute top-3 right-3 flex items-center justify-center rounded-full text-white font-extrabold"
                      style={{
                        width: '46px', height: '46px',
                        background: 'linear-gradient(135deg, #E74C3C, #C0392B)',
                        boxShadow: '0 4px 14px rgba(192,57,43,0.45)',
                        fontSize: '18px',
                        border: '2.5px solid rgba(255,255,255,0.9)',
                      }}
                    >
                      {story.n}
                    </div>
                  </div>

                  {/* Nội dung */}
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E] mb-1.5">
                      Câu chuyện {story.n}
                    </p>
                    <h3 className="text-[19px] font-bold text-[#1F1B16] mb-2.5 leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-[13px] text-[#6B5D54] leading-[1.75] mb-4">
                      {story.story}
                    </p>

                    {/* Box bài học cảm ngộ */}
                    <div
                      className="rounded-2xl p-4"
                      style={{
                        background: 'linear-gradient(135deg, #FFF0F0 0%, #FFEAEA 100%)',
                        border: '1px solid rgba(231,76,60,0.12)',
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <HeartIcon />
                        <span className="text-[10px] font-bold text-[#C0392B] uppercase tracking-wider">
                          Bài học cảm ngộ
                        </span>
                      </div>
                      <p className="text-[12.5px] text-[#7B341E] leading-relaxed italic">
                        {story.lesson}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>

          {/* CTA cuối section */}
          <RevealItem delay={200} className="mt-8">
            <div
              className="text-center rounded-2xl py-6 px-5"
              style={{
                background: 'linear-gradient(135deg, #FFF0F0 0%, #FFEAEA 100%)',
                border: '1px solid rgba(231,76,60,0.15)',
              }}
            >
              <p className="text-[14px] font-medium mb-1" style={{ color: '#C2410C' }}>
                Có những điều, đến khi hiểu ra thì đã muộn.
              </p>
              <p className="text-[15px] font-bold text-[#1F1B16] mb-4">
                Hãy để con hiểu cha mẹ <span style={{ color: '#DC2626' }}>khi vẫn còn kịp.</span>
              </p>
              <button
                onClick={scrollToForm}
                className="text-white font-bold hover:scale-105 active:scale-95 transition-transform duration-200"
                style={{
                  background: 'linear-gradient(90deg, #E74C3C, #C0392B)',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(231,76,60,0.3)',
                }}
              >
                📖 Đặt sách ngay · 199.000đ
              </button>
            </div>
          </RevealItem>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5: CON SẼ CẢM NGỘ GÌ (sau khi đọc)
      ═══════════════════════════════════════ */}
      <section className="px-4 py-5" style={{ background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFBF5 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <RevealItem className="text-center mb-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#16A34A] mb-1">
              Sau khi đọc xong
            </p>
            <h2
              className="font-bold text-[#1F1B16] leading-tight"
              style={{ fontSize: 'clamp(18px, 5vw, 24px)' }}
            >
              Con không chỉ hiểu bố mẹ hơn,<br />
              <span style={{ color: '#16A34A' }}>con sẽ muốn sống tốt hơn</span>
            </h2>
          </RevealItem>

          <RevealItem delay={100}>
            <div
              className="rounded-2xl bg-white overflow-hidden"
              style={{ border: '1px solid #BBF7D0', boxShadow: '0 2px 10px rgba(22,163,74,0.06)' }}
            >
              {[
                { icon: '👀', title: 'Nhìn thấy tình thương phía sau lời nhắc' },
                { icon: '💪', title: 'Tự giác hơn, không phải vì bị ép' },
                { icon: '💬', title: 'Bớt giận, bớt im lặng với bố mẹ' },
                { icon: '🏠', title: 'Biết trân trọng gia đình khi còn kịp' },
                { icon: '⭐', title: 'Muốn sống tốt hơn vì bản thân và vì bố mẹ' },
              ].map((item, i, arr) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-2.5"
                  style={i < arr.length - 1 ? { borderBottom: '1px solid #ECFDF5' } : undefined}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <p className="flex-1 font-medium text-[#1F1B16] leading-snug" style={{ fontSize: '13px' }}>
                    {item.title}
                  </p>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" fill="#DCFCE7" />
                    <path d="M8 12l3 3 5-6" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>
          </RevealItem>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6: 5 LÝ DO NÊN CÓ SÁCH TRONG NHÀ
      ═══════════════════════════════════════ */}
      <section className="px-4 py-6 bg-[#FFFBF5]">
        <div className="max-w-3xl mx-auto">
          <RevealItem className="text-center mb-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#C8102E] mb-1">
              Vì sao nên có trong nhà
            </p>
            <h2
              className="font-bold text-[#1F1B16] leading-tight mb-1"
              style={{ fontSize: 'clamp(18px, 5vw, 24px)' }}
            >
              5 lý do cuốn sách này đáng để trao tay
            </h2>
            <p className="text-[13px] text-[#6B5D54] max-w-sm mx-auto">
              Không chỉ là một cuốn sách — là một nhịp cầu cho cả gia đình
            </p>
          </RevealItem>

          {/* Hàng 1: 3 thẻ */}
          <div className="grid grid-cols-3 gap-2.5 mb-2.5">
            {REASONS.slice(0, 3).map((r, i) => (
              <RevealItem key={r.id} delay={i * 80}>
                <ReasonCard r={r} />
              </RevealItem>
            ))}
          </div>
          {/* Hàng 2: 2 thẻ */}
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            {REASONS.slice(3).map((r, i) => (
              <RevealItem key={r.id} delay={(i + 3) * 80}>
                <ReasonCard r={r} />
              </RevealItem>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
