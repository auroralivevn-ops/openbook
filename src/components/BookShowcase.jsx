import sach1 from '../assets/sach-images/sach-1.png'
import sach2 from '../assets/sach-images/sach-2.png'
import sach3 from '../assets/sach-images/sach-3.png'
import sach4 from '../assets/sach-images/sach-4.png'
import sach5 from '../assets/sach-images/sach-5.png'
import sach6 from '../assets/sach-images/sach-6.png'
import sach7 from '../assets/sach-images/sach-7.png'
import { RevealItem } from '../hooks/RevealItem'

const BulbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5B700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 1 5 11.83V16H7v-2.17A7 7 0 0 1 12 2z" />
    <path d="M9 21h6M10 18h4" />
  </svg>
)

const LESSONS = [
  {
    n: '01', img: sach1,
    title: 'Phương pháp Pomodoro 25/5',
    story: 'Não bộ chỉ giữ tập trung tối đa 25 phút. Sau mốc đó hiệu quả tụt dốc nhanh chóng. Con ngồi học 2 tiếng liên tục thực ra chỉ thực sự tiếp thu được 30 phút đầu, còn lại là "ngồi cho đủ giờ".',
    apply: 'Đặt đồng hồ 25 phút học → 5 phút nghỉ ngắn. Lặp lại 4 lần thì nghỉ dài 15 phút. Con sẽ hoàn thành bài tập nhanh gấp đôi mà đầu vẫn nhẹ.',
  },
  {
    n: '02', img: sach2,
    title: 'Sơ đồ tư duy biến chữ thành hình',
    story: 'Não nhớ hình ảnh tốt hơn chữ gấp 60.000 lần. Khi con vẽ một sơ đồ tư duy với màu sắc và biểu tượng, kiến thức được lưu trong cả não trái và não phải cùng lúc.',
    apply: 'Đưa con cây bút màu và tờ A4. Yêu cầu con vẽ lại bài lịch sử dưới dạng cây nhánh với màu sắc khác nhau cho mỗi sự kiện. 5 phút sau hỏi lại — con sẽ kể vanh vách.',
  },
  {
    n: '03', img: sach3,
    title: 'Lặp lại ngắt quãng (Spaced Repetition)',
    story: 'Một thông tin mới sẽ bị quên 80% sau 24 giờ nếu không ôn lại. Nhưng nếu ôn đúng nhịp 1-3-7-14 ngày, kiến thức sẽ ở lại với con suốt đời mà không cần học nhồi.',
    apply: 'Sau khi học từ mới, ôn lại vào tối hôm sau, sau 3 ngày, sau 1 tuần, sau 2 tuần. Mỗi lần chỉ tốn 2 phút mà nhớ vĩnh viễn.',
  },
  {
    n: '04', img: sach4,
    title: 'Dạy lại để nhớ sâu',
    story: 'Khi con dạy lại một điều gì đó, con ghi nhớ 90% kiến thức. Khi chỉ nghe giảng, con chỉ nhớ 5%. Đây là tháp học tập của Edgar Dale, một quy luật đã được kiểm chứng 60 năm qua.',
    apply: 'Sau mỗi buổi học ở trường, yêu cầu con giảng lại bài cho cha mẹ trong 3 phút. Vai trò "thầy giáo nhỏ" giúp con khắc sâu kiến thức hơn ngồi học 1 tiếng.',
  },
  {
    n: '05', img: sach5,
    title: 'Liên tưởng hình ảnh kỳ lạ',
    story: 'Não bộ ghi nhớ những gì kỳ lạ, hài hước, kỳ quái dễ hơn 7 lần thông tin bình thường. Đây là bí mật của các nhà vô địch trí nhớ thế giới — họ không thông minh hơn, họ chỉ tưởng tượng buồn cười hơn.',
    apply: 'Để nhớ năm 1945 Việt Nam độc lập, hãy tưởng tượng 1 con voi mặc áo cờ đỏ sao vàng đứng trên 1.945 quả bóng bay. Nghe ngớ ngẩn nhưng nhớ cả đời.',
  },
  {
    n: '06', img: sach6,
    title: 'Tự tin — vũ khí bí mật của trí nhớ',
    story: 'Mỗi lần con nghe "sao học mãi không thuộc", niềm tin của con bị bào mòn dần. Sự thật là không ai "trí nhớ kém bẩm sinh" — chỉ có người chưa tìm đúng phương pháp, hoặc chưa tin vào bản thân. Khi não tin "mình có thể nhớ được", nó hoạt động tích cực hơn rõ rệt; ngược lại, càng tự ti thì càng học càng quên.',
    apply: 'Bỏ ngay câu "sao học mãi không nhớ". Thay bằng "lần này con đã nhớ được X điều rồi đó". Khen sự cố gắng thay vì kết quả. Cùng con thử nhiều cách học — vẽ, kể chuyện, hát thành bài — đến khi tìm được cách phù hợp nhất. Tuyệt đối không so sánh con với bạn khác.',
  },
  {
    n: '07', img: sach7,
    title: 'Sơ đồ tư duy — chiếc "máy nén" thông tin',
    story: 'Khi con học thuộc một danh sách dài (6 triều đại, 10 nguyên tố, 20 sự kiện...), não bộ rất nhanh "quá tải" và đoạn nào cũng nhớ mờ mờ. Sơ đồ tư duy là cách "nén" thông tin thành các Từ Khóa gắn với Hình Ảnh — não chỉ cần nhìn hình là từ khóa tự bật ra, kéo theo cả đoạn nội dung dài.',
    apply: 'Đưa con tờ A4. Vẽ một vòng tròn ở giữa với tên bài học, các nhánh tỏa ra như cây — mỗi nhánh chỉ 1–2 từ khóa kèm 1 hình minh họa (hoa sen, thanh gươm, con thuyền...). 5 phút vẽ thay vì 30 phút học vẹt, mà nhớ gấp 5 lần.',
  },
]

export default function BookShowcase() {
  return (
    <section className="bg-[#FFFBF5] py-5 md:py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <RevealItem className="text-center mb-5">
          <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#C8102E] mb-1">
            Mở thử cuốn sách
          </p>
          <h2
            className="font-medium text-[#1F1B16] leading-tight mb-1"
            style={{ fontSize: 'clamp(22px, 5.5vw, 28px)' }}
          >
            5 bài học áp dụng được ngay hôm nay
          </h2>
          <p className="text-[14px] text-[#6B5D54] max-w-sm mx-auto">
            Mỗi trang là một phương pháp con có thể dùng từ tối nay
          </p>
        </RevealItem>

        {/* Zigzag lessons */}
        <div className="flex flex-col gap-5">
          {LESSONS.map((lesson, i) => (
            <RevealItem key={lesson.n} delay={100}>
              <div
                className={`flex flex-col gap-6 items-center ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Ảnh */}
                <div className="w-full md:w-1/2 flex-shrink-0">
                  <img
                    src={lesson.img}
                    alt={lesson.title}
                    className="w-full h-auto rounded-2xl shadow-[0_8px_32px_rgba(245,183,0,0.18)] hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2">
                  <p className="text-xs font-medium uppercase tracking-widest text-[#C8102E] mb-2">
                    Bài học {lesson.n}
                  </p>
                  <h3 className="text-xl font-medium text-[#1F1B16] mb-3 leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-[#6B5D54] leading-relaxed mb-4">
                    {lesson.story}
                  </p>
                  {/* Apply box */}
                  <div className="bg-[#FFF8E1] border-l-4 border-[#F5B700] rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <BulbIcon />
                      <span className="text-xs font-medium text-[#854F0B] uppercase tracking-wider">
                        Áp dụng ngay
                      </span>
                    </div>
                    <p className="text-[13px] text-[#854F0B] leading-relaxed">
                      {lesson.apply}
                    </p>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>

      </div>
    </section>
  )
}
