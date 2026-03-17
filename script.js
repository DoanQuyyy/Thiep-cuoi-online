// --- 1. CẤU HÌNH NGÀY CƯỚI ---
// Định dạng: Năm, Tháng (0-11), Ngày, Giờ, Phút
// Thiết lập ngày cưới (Năm, Tháng-1, Ngày, Giờ, Phút)
// Chú ý: Tháng trong JS bắt đầu từ 0 (Tháng 11 thì ghi là 10)
const weddingDate = new Date("May 01, 2026 12:00:00").getTime();

// Cập nhật đếm ngược mỗi 1 giây
const x = setInterval(function() {

  // Lấy thời gian hiện tại
  const now = new Date().getTime();

  // Tính khoảng cách giữa hiện tại và ngày cưới
  const distance = weddingDate - now;

  // Tính toán số ngày, giờ, phút, giây
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Hiển thị kết quả vào các thẻ có ID tương ứng
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // Nếu thời gian đếm ngược kết thúc
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("days").innerHTML = "0";
    document.getElementById("hours").innerHTML = "0";
    document.getElementById("minutes").innerHTML = "0";
    document.getElementById("seconds").innerHTML = "0";
  }
}, 1000);

// --- 2. ĐIỀU KHIỂN NHẠC NỀN ---
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicBtn.innerText = "🔇";
    } else {
        music.play();
        musicBtn.innerText = "🎵";
    }
    isPlaying = !isPlaying;
}

// Cố gắng tự phát nhạc khi người dùng click bất kỳ đâu trên trang (do chính sách trình duyệt)
document.body.addEventListener('click', function() {
    if (!isPlaying) {
        // toggleMusic(); // Bỏ comment dòng này nếu muốn tự phát khi click
    }
}, { once: true });


// --- 3. XỬ LÝ FORM RSVP (Mẫu cơ bản) ---
document.getElementById('weddingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn trang tải lại
    const name = this.name.value;
    const attend = this.attend.value;
    
    alert(`Cảm ơn ${name}! Bạn đã chọn: ${attend}. (Đây là mẫu, form chưa thực sự gửi đi)`);
    // Tại đây bạn sẽ code thêm để gửi dữ liệu đến Google Sheets hoặc Email.
});
// Hàm kiểm tra và kích hoạt animation
function revealOnScroll() {
  // Tìm tất cả các phần tử có class reveal-left hoặc reveal-right
  const reveals = document.querySelectorAll(".reveal-left, .reveal-right");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    
    // Khoảng cách từ mép dưới màn hình lên để kích hoạt animation (150px)
    const elementVisible = 150; 

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      // (Tùy chọn) Bỏ class active nếu muốn animation chạy lại khi cuộn ngược lên
      // reveals[i].classList.remove("active");
    }
  }
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Kích hoạt khi 15% phần tử hiện diện trên màn hình
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Nếu bạn muốn animation chỉ chạy 1 lần duy nhất:
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Áp dụng cho tất cả các phần tử muốn có hiệu ứng
document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(".section, .reveal-left, .reveal-right ,.reveal-up,.reveal-down");
    targets.forEach(target => observer.observe(target));
});
function openWeddingCard() {
    const cover = document.getElementById('cover-page');
    cover.classList.add('hidden');
    
    // Tự động phát nhạc khi mở thiệp (nếu bạn muốn)
    const music = document.getElementById("bgMusic");
    if (music) {
        music.play();
        isPlaying = true;
        document.getElementById("musicBtn").innerText = "🎵";
    }

    // Kích hoạt animation của trang chính sau khi mở
    setTimeout(() => {
        revealOnScroll();
    }, 500);
}