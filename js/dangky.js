// ==========================================
// ĐĂNG KÝ TÀI KHOẢN KHÁCH HÀNG
// ==========================================

function dangKy(event) {
  event.preventDefault();

  const hoTen = document.getElementById("hoTen").value.trim();

  const soDienThoai = document.getElementById("soDienThoai").value.trim();

  const email = document.getElementById("email").value.trim();

  const tenDangNhap = document.getElementById("tenDangNhap").value.trim();

  const matKhau = document.getElementById("matKhau").value;

  const xacNhanMatKhau = document.getElementById("xacNhanMatKhau").value;

  const thongBao = document.getElementById("thongBao");

  // ==========================================
  // KIỂM TRA DỮ LIỆU
  // ==========================================

  if (hoTen === "") {
    thongBao.style.color = "#dc3545";

    thongBao.textContent = "Vui lòng nhập họ và tên!";

    return;
  }

  if (soDienThoai === "") {
    thongBao.style.color = "#dc3545";

    thongBao.textContent = "Vui lòng nhập số điện thoại!";

    return;
  }

  const regexSoDienThoai = /^[0-9]{9,11}$/;

  if (!regexSoDienThoai.test(soDienThoai)) {
    thongBao.style.color = "#dc3545";

    thongBao.textContent = "Số điện thoại phải gồm 9 đến 11 chữ số!";

    return;
  }

  if (email === "") {
    thongBao.style.color = "#dc3545";

    thongBao.textContent = "Vui lòng nhập email!";

    return;
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexEmail.test(email)) {
    thongBao.style.color = "#dc3545";

    thongBao.textContent = "Email không hợp lệ!";

    return;
  }

  if (tenDangNhap === "") {
    thongBao.style.color = "#dc3545";

    thongBao.textContent = "Vui lòng nhập tên đăng nhập!";

    return;
  }

  if (matKhau.length < 6) {
    thongBao.style.color = "#dc3545";

    thongBao.textContent = "Mật khẩu phải có ít nhất 6 ký tự!";

    return;
  }

  if (matKhau !== xacNhanMatKhau) {
    thongBao.style.color = "#dc3545";

    thongBao.textContent = "Mật khẩu xác nhận không khớp!";

    return;
  }

  // ==========================================
  // LẤY DANH SÁCH TÀI KHOẢN
  // ==========================================

  let danhSachTaiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];

  // ==========================================
  // KIỂM TRA TRÙNG TÊN ĐĂNG NHẬP
  // ==========================================

  const trungTenDangNhap = danhSachTaiKhoan.some(function (item) {
    return item.tenDangNhap.toLowerCase() === tenDangNhap.toLowerCase();
  });

  if (trungTenDangNhap) {
    thongBao.style.color = "#dc3545";

    thongBao.textContent = "Tên đăng nhập đã tồn tại!";

    return;
  }

  // ==========================================
  // KIỂM TRA TRÙNG EMAIL
  // ==========================================

  const trungEmail = danhSachTaiKhoan.some(function (item) {
    return item.email && item.email.toLowerCase() === email.toLowerCase();
  });

  if (trungEmail) {
    thongBao.style.color = "#dc3545";

    thongBao.textContent = "Email đã được sử dụng!";

    return;
  }

  // ==========================================
  // TẠO ID
  // ==========================================

  const idMoi =
    danhSachTaiKhoan.length > 0
      ? Math.max(...danhSachTaiKhoan.map((item) => Number(item.id))) + 1
      : 1;

  // ==========================================
  // TẠO TÀI KHOẢN KHÁCH HÀNG
  // ==========================================

  const taiKhoanMoi = {
    id: idMoi,

    tenDangNhap: tenDangNhap,

    matKhau: matKhau,

    hoTen: hoTen,

    soDienThoai: soDienThoai,

    email: email,

    vaiTro: "khachhang",
  };

  danhSachTaiKhoan.push(taiKhoanMoi);

  // ==========================================
  // LƯU TÀI KHOẢN
  // ==========================================

  localStorage.setItem("taiKhoan", JSON.stringify(danhSachTaiKhoan));

  // ==========================================
  // TẠO GIỎ HÀNG RIÊNG CHO KHÁCH
  // ==========================================

  const keyGioHang = "gioHang_" + taiKhoanMoi.id;

  localStorage.setItem(keyGioHang, JSON.stringify([]));

  // ==========================================
  // THÔNG BÁO
  // ==========================================

  thongBao.style.color = "#198754";

  thongBao.textContent =
    "Đăng ký thành công! Đang chuyển đến trang đăng nhập...";

  // ==========================================
  // CHUYỂN SANG ĐĂNG NHẬP
  // ==========================================

  setTimeout(function () {
    window.location.href = "dangnhap.html";
  }, 1000);
}
