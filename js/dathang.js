// =====================================================
// ĐẶT HÀNG
// =====================================================

// =====================================================
// LẤY NGƯỜI DÙNG ĐANG ĐĂNG NHẬP
// =====================================================

const nguoiDungDangNhap =
  JSON.parse(localStorage.getItem("nguoiDungDangNhap")) || null;

// =====================================================
// XÁC ĐỊNH KEY GIỎ HÀNG
// =====================================================

// Nếu khách hàng đăng nhập:
//     gioHang_<id>
// Nếu chưa đăng nhập:
//     gioHang
let keyGioHang = "gioHang";

if (nguoiDungDangNhap && nguoiDungDangNhap.vaiTro === "khachhang") {
  keyGioHang = "gioHang_" + nguoiDungDangNhap.id;
}

// =====================================================
// LẤY GIỎ HÀNG
// =====================================================

let gioHang = JSON.parse(localStorage.getItem(keyGioHang)) || [];

// =====================================================
// LẤY CÁC PHẦN TỬ HTML
// =====================================================

const danhSachDatHang = document.getElementById("danhSachDatHang");

const tongTienDatHang = document.getElementById("tongTienDatHang");

const formDatHang = document.getElementById("formDatHang");

// =====================================================
// HIỂN THỊ SẢN PHẨM
// =====================================================

function hienThiDonHang() {
  danhSachDatHang.innerHTML = "";

  // Nếu giỏ hàng trống
  if (gioHang.length === 0) {
    danhSachDatHang.innerHTML = `

            <p>
                Giỏ hàng đang trống.
            </p>

            <a
                href="sanpham.html"
                class="product-button"
            >
                Xem sản phẩm
            </a>

        `;

    tongTienDatHang.textContent = "Tổng tiền: 0 VNĐ";

    return;
  }

  let tongTien = 0;

  // Hiển thị từng sản phẩm
  gioHang.forEach(function (sp) {
    const soLuong = Number(sp.quantity) || 1;

    const donGia = Number(sp.price) || 0;

    const thanhTien = donGia * soLuong;

    tongTien += thanhTien;

    danhSachDatHang.innerHTML += `

            <div
                style="
                    padding: 15px;
                    border-bottom: 1px solid #ddd;
                "
            >

                <h3>
                    ${sp.name}
                </h3>

                <p>
                    Danh mục:
                    ${sp.category}
                </p>

                <p>
                    Đơn giá:
                    ${donGia.toLocaleString("vi-VN")}
                    VNĐ
                </p>

                <p>
                    Số lượng:
                    ${soLuong}
                </p>

                <p>
                    Thành tiền:

                    <strong>
                        ${thanhTien.toLocaleString("vi-VN")}
                        VNĐ
                    </strong>

                </p>

            </div>

        `;
  });

  // Hiển thị tổng tiền
  tongTienDatHang.textContent =
    "Tổng tiền: " + tongTien.toLocaleString("vi-VN") + " VNĐ";
}

// =====================================================
// KIỂM TRA SỐ ĐIỆN THOẠI
// =====================================================

function kiemTraSoDienThoai(soDienThoai) {
  const so = soDienThoai.trim();

  const regex = /^(0|\+84)[0-9]{9,10}$/;

  return regex.test(so);
}

// =====================================================
// TẠO MÃ ĐƠN HÀNG
// =====================================================

function taoMaDonHang() {
  const thoiGian = Date.now();

  return "DH" + thoiGian;
}

// =====================================================
// XỬ LÝ ĐẶT HÀNG
// =====================================================

formDatHang.addEventListener("submit", function (event) {
  event.preventDefault();

  // ---------------------------------------------
  // KIỂM TRA ĐĂNG NHẬP
  // ---------------------------------------------

  if (!nguoiDungDangNhap || nguoiDungDangNhap.vaiTro !== "khachhang") {
    alert("Vui lòng đăng nhập bằng tài khoản khách hàng trước khi đặt hàng.");

    window.location.href = "dangnhap.html";

    return;
  }

  // ---------------------------------------------
  // KIỂM TRA GIỎ HÀNG
  // ---------------------------------------------

  if (gioHang.length === 0) {
    alert("Giỏ hàng đang trống. Không thể đặt hàng.");

    window.location.href = "sanpham.html";

    return;
  }

  // ---------------------------------------------
  // LẤY THÔNG TIN
  // ---------------------------------------------

  const hoTen = document.getElementById("hoTen").value.trim();

  const soDienThoai = document.getElementById("soDienThoai").value.trim();

  const email = document.getElementById("email").value.trim();

  const diaChi = document.getElementById("diaChi").value.trim();

  const ghiChu = document.getElementById("ghiChu").value.trim();

  const phuongThucThanhToan = document.getElementById(
    "phuongThucThanhToan",
  ).value;

  // ---------------------------------------------
  // KIỂM TRA HỌ TÊN
  // ---------------------------------------------

  if (hoTen.length < 2) {
    alert("Vui lòng nhập họ và tên hợp lệ.");

    return;
  }

  // ---------------------------------------------
  // KIỂM TRA SỐ ĐIỆN THOẠI
  // ---------------------------------------------

  if (!kiemTraSoDienThoai(soDienThoai)) {
    alert("Số điện thoại không hợp lệ.");

    return;
  }

  // ---------------------------------------------
  // KIỂM TRA ĐỊA CHỈ
  // ---------------------------------------------

  if (diaChi.length < 5) {
    alert("Vui lòng nhập địa chỉ nhận hàng.");

    return;
  }

  // ---------------------------------------------
  // KIỂM TRA THANH TOÁN
  // ---------------------------------------------

  if (!phuongThucThanhToan) {
    alert("Vui lòng chọn phương thức thanh toán.");

    return;
  }

  // ---------------------------------------------
  // TÍNH TỔNG TIỀN
  // ---------------------------------------------

  let tongTien = 0;

  gioHang.forEach(function (sp) {
    const gia = Number(sp.price) || 0;

    const soLuong = Number(sp.quantity) || 0;

    tongTien += gia * soLuong;
  });

  // ---------------------------------------------
  // TẠO ĐƠN HÀNG
  // ---------------------------------------------

  const donHang = {
    id: taoMaDonHang(),

    ngayDat: new Date().toLocaleString("vi-VN"),

    khachHang: {
      hoTen: hoTen,

      soDienThoai: soDienThoai,

      email: email,

      diaChi: diaChi,
    },

    sanPham: gioHang.map(function (sp) {
      const gia = Number(sp.price) || 0;

      const soLuong = Number(sp.quantity) || 0;

      return {
        id: sp.id,

        name: sp.name,

        category: sp.category,

        price: gia,

        quantity: soLuong,

        thanhTien: gia * soLuong,
      };
    }),

    tongTien: tongTien,

    phuongThucThanhToan: phuongThucThanhToan,

    ghiChu: ghiChu,

    trangThai: "Chờ xác nhận",

    // Lưu ID tài khoản tạo đơn
    taiKhoanId: nguoiDungDangNhap.id,
  };

  // ---------------------------------------------
  // LẤY DANH SÁCH ĐƠN HÀNG CŨ
  // ---------------------------------------------

  let danhSachDonHang =
    JSON.parse(localStorage.getItem("danhSachDonHang")) || [];

  // ---------------------------------------------
  // THÊM ĐƠN HÀNG MỚI
  // ---------------------------------------------

  danhSachDonHang.push(donHang);

  // ---------------------------------------------
  // LƯU ĐƠN HÀNG
  // ---------------------------------------------

  localStorage.setItem("danhSachDonHang", JSON.stringify(danhSachDonHang));

  // ---------------------------------------------
  // CHỈ XÓA GIỎ HÀNG SAU KHI ĐẶT HÀNG THÀNH CÔNG
  // ---------------------------------------------

  localStorage.removeItem(keyGioHang);

  // ---------------------------------------------
  // THÔNG BÁO
  // ---------------------------------------------

  alert("Đặt hàng thành công!\n\n" + "Mã đơn hàng: " + donHang.id);

  // ---------------------------------------------
  // CHUYỂN SANG TRANG ĐƠN HÀNG
  // ---------------------------------------------

  window.location.href = "donhang.html";
});

// =====================================================
// HIỂN THỊ BAN ĐẦU
// =====================================================

hienThiDonHang();
