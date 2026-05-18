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
    id: 1, name: 'Mai Hương', loc: 'Hà Nội', date: '12/04/2026', imgId: 1,
    content: 'Con mình lớp 4 trước đây ghét học đến phát khóc. Đọc xong cuốn này 1 tuần, tự xung phong làm bài tập. Phương pháp Pomodoro 25 phút thay đổi mọi thứ. Cảm ơn shop giao nhanh trong 2 ngày.',
    tag: 'Phụ huynh con lớp 4',
  },
  {
    id: 2, name: 'Trần Quang Trung', loc: 'TP HCM', date: '03/04/2026', imgId: 11,
    content: 'Mình mua 2 cuốn cho 2 bé sinh đôi. Sách in màu rất đẹp, nội dung dễ hiểu. Đặc biệt phần sơ đồ tư duy 2 bé mê tít, rủ nhau vẽ suốt cuối tuần. Đáng đồng tiền.',
    tag: 'Mua 2 cuốn',
  },
  {
    id: 3, name: 'Lê Thị Hằng', loc: 'Đà Nẵng', date: '28/03/2026', imgId: 5,
    content: 'Mình là giáo viên tiểu học. Đã giới thiệu cuốn này cho cả lớp phụ huynh. Phương pháp "dạy lại để nhớ" áp dụng ngay được trong lớp học, các con thay nhau làm thầy cô.',
    tag: 'Giáo viên',
  },
  {
    id: 4, name: 'Phạm Lan Anh', loc: 'Cần Thơ', date: '22/03/2026', imgId: 9,
    content: 'Sách dày dặn, bìa cứng đẹp, đóng gói cẩn thận. Con học lớp 6 áp dụng phương pháp lặp lại ngắt quãng học từ mới tiếng Anh, 1 tuần thuộc 70 từ mà không thấy nặng nề.',
    tag: 'Phụ huynh con lớp 6',
  },
  {
    id: 5, name: 'Nguyễn Văn Phong', loc: 'Hải Phòng', date: '18/03/2026', imgId: 12,
    content: 'Ban đầu hơi nghi ngờ vì giá mềm quá. Nhận sách thì bất ngờ — chất lượng in ấn ngang sách 300k ở hiệu sách. Nội dung ngắn gọn, không lê thê. 5 sao xứng đáng.',
    tag: 'Khách lần đầu',
  },
  {
    id: 6, name: 'Đặng Thanh Thủy', loc: 'Vinh', date: '15/03/2026', imgId: 20,
    content: 'Con từ 6.5 lên 8.0 môn Toán chỉ trong 1 tháng. Mình cứ tưởng phải mua khóa học mấy triệu mới có hiệu quả như vậy. 179k đáng giá hơn nhiều khóa online.',
    tag: 'Tăng điểm rõ rệt',
  },
  {
    id: 7, name: 'Hoàng Đức Sơn', loc: 'Buôn Ma Thuột', date: '10/03/2026', imgId: 14,
    content: 'Đã đặt thêm 5 cuốn tặng các cháu trong họ. Phương pháp liên tưởng hình ảnh con áp dụng vào học lịch sử, nhớ năm tháng nhanh không tin nổi. Cô giáo khen suốt.',
    tag: 'Mua tặng nhiều',
  },
  {
    id: 8, name: 'Võ Thị Nga', loc: 'Quy Nhơn', date: '05/03/2026', imgId: 16,
    content: 'Đặt buổi tối, sáng hôm sau đã có hàng. Shipper tận tình. Sách bọc kỹ, không cong vênh. Con đọc say mê, không cần ép. Sẽ mua thêm cuốn nữa cho cháu.',
    tag: 'Giao siêu nhanh',
  },
  {
    id: 9, name: 'Trần Thu Hà', loc: 'Hà Tĩnh', date: '01/03/2026', imgId: 23,
    content: 'Sơ đồ tư duy là phương pháp mình tâm đắc nhất. Từ ngày con biết vẽ mind map, tự ôn bài không cần mẹ kèm nữa. Mẹ rảnh tay nấu cơm hơn nhiều ạ.',
    tag: 'Tự học hiệu quả',
  },
  {
    id: 10, name: 'Bùi Quốc Việt', loc: 'Bình Dương', date: '24/02/2026', imgId: 15,
    content: 'Con lớp 7 áp dụng được luôn. Đặc biệt phần dạy lại cho người khác — bé tự xin kèm em họ học bài, vừa giúp em vừa nhớ kỹ kiến thức. Một mũi tên trúng 2 đích.',
    tag: 'Phụ huynh con lớp 7',
  },
]

export default function Reviews() {
  return (
    <section className="bg-[#FFFBF5] py-5 md:py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <RevealItem className="text-center mb-5">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#C8102E] mb-1">
            Khách hàng nói gì
          </p>
          <h2
            className="font-medium text-[#1F1B16] leading-tight mb-1"
            style={{ fontSize: 'clamp(22px, 5.5vw, 28px)' }}
          >
            12.247 phụ huynh đã tin chọn
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
                    src={`https://i.pravatar.cc/100?img=${r.imgId}`}
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
