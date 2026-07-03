import { RevealItem } from '../hooks/RevealItem'

const StarIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#F5B700">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

const Stars = ({ count = 5, size = 14 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <StarIcon key={i} size={size} />
    ))}
  </div>
)

const REVIEWS = [
  {
    id: 1, name: 'Mai Hương', loc: 'Hà Nội', date: '12/06/2026', pic: 'women/79',
    content: 'Mua cho con gái lớp 4. Đọc tới câu chuyện "Bữa cơm nguội của mẹ", bé khóc rồi chạy ôm mẹ. Từ hôm đó bé tự dọn bát cơm, không cần nhắc. Sách thay đổi con mình thật sự.',
    tag: 'Phụ huynh con lớp 4',
  },
  {
    id: 2, name: 'Trần Quang Trung', loc: 'TP HCM', date: '03/06/2026', pic: 'men/34',
    content: 'Mình mua 2 cuốn cho 2 bé. Cả nhà ngồi đọc cùng nhau buổi tối, đọc xong ai cũng im lặng rồi ôm nhau. Lâu lắm rồi gia đình mới có khoảnh khắc như vậy. Cảm ơn shop.',
    tag: 'Mua 2 cuốn',
  },
  {
    id: 3, name: 'Lê Thị Hằng', loc: 'Đà Nẵng', date: '28/05/2026', pic: 'women/44',
    content: 'Mình là giáo viên tiểu học. Đã đọc cho cả lớp nghe câu chuyện "Nếu con làm bố mẹ một ngày." Hôm đó cả lớp viết thư về nhà cảm ơn bố mẹ. Nhiều phụ huynh gọi cảm ơn cô.',
    tag: 'Giáo viên',
  },
  {
    id: 4, name: 'Phạm Lan Anh', loc: 'Cần Thơ', date: '22/05/2026', pic: 'women/63',
    content: 'Con trai lớp 6, tuổi dậy thì hay cãi bố mẹ. Đọc xong cuốn này, hôm sau con nói: "Con xin lỗi bố mẹ, con không biết bố mẹ vất vả như vậy." Mình khóc luôn.',
    tag: 'Phụ huynh con lớp 6',
  },
  {
    id: 5, name: 'Nguyễn Văn Phong', loc: 'Hải Phòng', date: '18/05/2026', pic: 'men/52',
    content: 'Ban đầu nghĩ sách cho trẻ con thôi. Nhưng đọc xong mình — ông bố 35 tuổi — cũng rơi nước mắt. Nhớ lại bố mẹ mình ngày xưa. Sách không chỉ cho trẻ, người lớn cũng nên đọc.',
    tag: 'Bố cũng xúc động',
  },
  {
    id: 6, name: 'Đặng Thanh Thủy', loc: 'Vinh', date: '15/05/2026', pic: 'women/31',
    content: 'Con gái ghét học, suốt ngày cáu gắt. Đọc câu chuyện mẹ nghỉ học từ lớp 9, bé im lặng rất lâu. Tuần sau bé tự giác ngồi vào bàn học, nói: "Con muốn học giỏi cho mẹ."',
    tag: 'Con tự giác học',
  },
  {
    id: 7, name: 'Hoàng Đức Sơn', loc: 'Buôn Ma Thuột', date: '10/05/2026', pic: 'men/75',
    content: 'Mua combo 4 cuốn tặng cháu. Cuốn "Nếu Con Làm Bố Mẹ Một Ngày" là cuốn hay nhất. In đẹp, giấy dày, minh họa dễ thương. Các cháu đọc đi đọc lại không chán.',
    tag: 'Mua tặng cháu',
  },
  {
    id: 8, name: 'Võ Thị Nga', loc: 'Quy Nhơn', date: '05/05/2026', pic: 'women/8',
    content: 'Giao hàng nhanh, đóng gói cẩn thận. Con đọc say mê, tối nào cũng đòi đọc 1 câu chuyện trước khi ngủ. Giờ con hay hỏi "Mẹ mệt không? Mẹ ăn cơm chưa?" — nghe mà thương.',
    tag: 'Giao siêu nhanh',
  },
  {
    id: 9, name: 'Trần Thu Hà', loc: 'Hà Tĩnh', date: '01/05/2026', pic: 'women/22',
    content: 'Câu chuyện "Bố cũng biết khóc" khiến cả nhà xúc động. Con trai mình ôm bố khóc nức nở, nói "Con thương bố." Bố thì cũng khóc theo. Cuốn sách chữa lành gia đình thật sự.',
    tag: 'Cả nhà xúc động',
  },
  {
    id: 10, name: 'Bùi Quốc Việt', loc: 'Bình Dương', date: '24/04/2026', pic: 'men/67',
    content: 'Mua cho con lớp 3 nhưng cả nhà đọc hết. Bà nội đọc xong cũng khóc. Sách viết chân thực, gần gũi, không giáo điều. 199K mà thay đổi được cả không khí gia đình, quá đáng đồng tiền.',
    tag: 'Cả nhà cùng đọc',
  },
]

export default function Reviews() {
  return (
    <section className="bg-[#FFFBF5] py-5 md:py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <RevealItem className="text-center mb-5">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#C8102E] mb-1">
            Phụ huynh nói gì
          </p>
          <h2
            className="font-medium text-[#1F1B16] leading-tight mb-1"
            style={{ fontSize: 'clamp(22px, 5.5vw, 28px)' }}
          >
            12.247 gia đình đã tin chọn
          </h2>
        </RevealItem>

        {/* Rating summary */}
        <RevealItem delay={100} className="mb-5">
          <div className="bg-[#FFF8E1] border border-[#FDE68A] rounded-xl p-4 flex justify-center items-center gap-6">
            <span
              className="font-medium text-[#C8102E] leading-none"
              style={{ fontSize: '48px' }}
            >
              5.0
            </span>
            <div>
              <Stars size={18} />
              <p className="text-xs text-[#6B5D54] mt-1.5">11.534 đánh giá · 12.247 lượt mua</p>
            </div>
          </div>
        </RevealItem>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {REVIEWS.map((r, i) => (
            <RevealItem key={r.id} delay={i * 80}>
              <div className="bg-white border border-[#FDE68A] rounded-xl p-4 hover:scale-[1.02] transition-transform duration-200 h-full flex flex-col">
                {/* Top row */}
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={`https://randomuser.me/api/portraits/${r.pic}.jpg`}
                    alt={r.name}
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1F1B16] leading-tight">{r.name}</p>
                    <p className="text-[11px] text-[#B4B2A9]">{r.loc} · {r.date}</p>
                  </div>
                  <span className="flex-shrink-0 bg-[#DCFCE7] text-[#166534] text-[10px] px-2 py-0.5 rounded-full font-medium">
                    ✓ Đã mua
                  </span>
                </div>

                {/* Stars */}
                <Stars count={5} size={14} />

                {/* Content */}
                <p className="text-[13px] text-[#6B5D54] leading-relaxed mt-2 mb-3 flex-1">
                  {r.content}
                </p>

                {/* Tag */}
                <span className="inline-block self-start bg-[#FFF8E1] text-[#854F0B] text-[11px] px-2 py-0.5 rounded-full">
                  {r.tag}
                </span>
              </div>
            </RevealItem>
          ))}
        </div>

      </div>
    </section>
  )
}
