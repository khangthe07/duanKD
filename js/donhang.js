
// =====================================================
// ĐƠN HÀNG
// =====================================================


// =====================================================
// LẤY NGƯỜI DÙNG ĐANG ĐĂNG NHẬP
// =====================================================

const nguoiDungDangNhap =
  JSON.parse(localStorage.getItem("nguoiDungDangNhap")) || null;


// =====================================================
// LẤY DANH SÁCH ĐƠN HÀNG
// =====================================================

const tatCaDonHang =
  JSON.parse(localStorage.getItem("danhSachDonHang")) || [];


// =====================================================
// KHU VỰC HIỂN THỊ
// =====================================================

const khuVucDonHang =
  document.getElementById("danhSachDonHang");


// =====================================================
// LỌC ĐƠN HÀNG THEO TÀI KHOẢN
// =====================================================

function layDanhSachDonHangHienThi() {

  // -------------------------------------------------
  // CHƯA ĐĂNG NHẬP
  // -------------------------------------------------

  if (!nguoiDungDangNhap) {
    return [];
  }


  // -------------------------------------------------
  // KHÁCH HÀNG
  // -------------------------------------------------
  // Chỉ xem được đơn hàng của chính mình

  if (nguoiDungDangNhap.vaiTro === "khachhang") {

    return tatCaDonHang.filter(function (donHang) {

      return String(donHang.taiKhoanId) ===
             String(nguoiDungDangNhap.id);

    });

  }


  // -------------------------------------------------
  // ADMIN / NHÂN VIÊN
  // -------------------------------------------------
  // Được xem toàn bộ đơn hàng

  if (
    nguoiDungDangNhap.vaiTro === "admin" ||
    nguoiDungDangNhap.vaiTro === "nhanvien"
  ) {

    return tatCaDonHang;

  }


  // -------------------------------------------------
  // VAI TRÒ KHÔNG HỢP LỆ
  // -------------------------------------------------

  return [];
}


// =====================================================
// HIỂN THỊ ĐƠN HÀNG
// =====================================================

function hienThiDonHang() {

  // -------------------------------------------------
  // KIỂM TRA KHU VỰC HIỂN THỊ
  // -------------------------------------------------

  if (!khuVucDonHang) {

    console.error(
      "Không tìm thấy phần tử #danhSachDonHang"
    );

    return;
  }


  // -------------------------------------------------
  // XÓA NỘI DUNG CŨ
  // -------------------------------------------------

  khuVucDonHang.innerHTML = "";


  // ===================================================
  // KIỂM TRA ĐĂNG NHẬP
  // ===================================================

  if (!nguoiDungDangNhap) {

    khuVucDonHang.innerHTML = `

      <div
        style="
          background: white;
          padding: 40px;
          border-radius: 10px;
          text-align: center;
        "
      >

        <h2>
          Vui lòng đăng nhập
        </h2>

        <p>
          Bạn cần đăng nhập để xem đơn hàng.
        </p>

        <br>

        <a
          href="dangnhap.html"
          class="product-button"
        >
          Đăng nhập
        </a>

      </div>

    `;

    return;
  }


  // ===================================================
  // LẤY DANH SÁCH ĐƠN HÀNG ĐƯỢC PHÉP XEM
  // ===================================================

  const danhSachDonHang =
    layDanhSachDonHangHienThi();


  // ===================================================
  // KHÔNG CÓ ĐƠN HÀNG
  // ===================================================

  if (danhSachDonHang.length === 0) {

    khuVucDonHang.innerHTML = `

      <div
        style="
          background: white;
          padding: 40px;
          border-radius: 10px;
          text-align: center;
        "
      >

        <h2>
          Chưa có đơn hàng
        </h2>

        <p>
          Bạn chưa đặt đơn hàng nào.
        </p>

        <br>

        <a
          href="sanpham.html"
          class="product-button"
        >
          Mua sắm ngay
        </a>

      </div>

    `;

    return;
  }


  // ===================================================
  // HIỂN THỊ ĐƠN MỚI NHẤT TRƯỚC
  // ===================================================

  const danhSachMoiNhat =
    [...danhSachDonHang].reverse();


  // ===================================================
  // HIỂN THỊ TỪNG ĐƠN HÀNG
  // ===================================================

  danhSachMoiNhat.forEach(function (donHang) {

    let danhSachSanPhamHTML = "";


    // =================================================
    // HIỂN THỊ SẢN PHẨM TRONG ĐƠN
    // =================================================

    if (Array.isArray(donHang.sanPham)) {

      donHang.sanPham.forEach(function (sp) {

        const tenSanPham =
          sp.name || sp.ten || "Sản phẩm";

        const soLuong =
          Number(sp.quantity) || 0;

        const donGia =
          Number(sp.price) || 0;

        const thanhTien =
          Number(sp.thanhTien) ||
          soLuong * donGia;


        danhSachSanPhamHTML += `

          <div
            style="
              padding: 10px 0;
              border-bottom: 1px solid #ddd;
            "
          >

            <strong>
              ${tenSanPham}
            </strong>

            <br>

            Số lượng:
            ${soLuong}

            <br>

            Đơn giá:
            ${donGia.toLocaleString("vi-VN")}
            VNĐ

            <br>

            Thành tiền:
            ${thanhTien.toLocaleString("vi-VN")}
            VNĐ

          </div>

        `;

      });

    }


    // =================================================
    // XÁC ĐỊNH PHƯƠNG THỨC THANH TOÁN
    // =================================================

    let phuongThucThanhToan =
      "Không xác định";


    if (
      donHang.phuongThucThanhToan === "cod"
    ) {

      phuongThucThanhToan =
        "Thanh toán khi nhận hàng (COD)";

    } else if (
      donHang.phuongThucThanhToan === "chuyenKhoan"
    ) {

      phuongThucThanhToan =
        "Chuyển khoản ngân hàng";

    }


    // =================================================
    // THÔNG TIN KHÁCH HÀNG
    // =================================================

    const khachHang =
      donHang.khachHang || {};


    const hoTen =
      khachHang.hoTen ||
      "Chưa có thông tin";


    const soDienThoai =
      khachHang.soDienThoai ||
      "Chưa có thông tin";


    const email =
      khachHang.email ||
      "Chưa có thông tin";


    const diaChi =
      khachHang.diaChi ||
      "Chưa có thông tin";


    // =================================================
    // HIỂN THỊ GHI CHÚ
    // =================================================

    let ghiChuHTML = "";


    if (
      typeof donHang.ghiChu === "string" &&
      donHang.ghiChu.trim() !== ""
    ) {

      ghiChuHTML = `

        <p>

          <strong>
            Ghi chú:
          </strong>

          ${donHang.ghiChu}

        </p>

      `;

    }


    // =================================================
    // THÔNG TIN NGÀY ĐẶT
    // =================================================

    const ngayDat =
      donHang.ngayDat ||
      "Không xác định";


    // =================================================
    // THÔNG TIN TRẠNG THÁI
    // =================================================

    const trangThai =
      donHang.trangThai ||
      "Chờ xác nhận";


    // =================================================
    // TỔNG TIỀN
    // =================================================

    const tongTien =
      Number(donHang.tongTien) || 0;


    // =================================================
    // HIỂN THỊ ĐƠN HÀNG
    // =================================================

    khuVucDonHang.innerHTML += `

      <div
        style="
          background: white;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow:
            0 2px 8px
            rgba(0,0,0,0.08);
        "
      >

        <h2>
          Đơn hàng ${donHang.id || "Không xác định"}
        </h2>


        <p>

          <strong>
            Ngày đặt:
          </strong>

          ${ngayDat}

        </p>


        <p>

          <strong>
            Trạng thái:
          </strong>

          ${trangThai}

        </p>


        <hr>


        <h3>
          Thông tin khách hàng
        </h3>


        <p>

          Họ tên:
          ${hoTen}

        </p>


        <p>

          Số điện thoại:
          ${soDienThoai}

        </p>


        <p>

          Email:
          ${email}

        </p>


        <p>

          Địa chỉ:
          ${diaChi}

        </p>


        <hr>


        <h3>
          Sản phẩm
        </h3>


        ${
          danhSachSanPhamHTML ||
          "<p>Không có sản phẩm trong đơn hàng.</p>"
        }


        <h2
          style="
            margin-top: 20px;
          "
        >

          Tổng tiền:

          ${tongTien.toLocaleString("vi-VN")}

          VNĐ

        </h2>


        <p>

          <strong>
            Phương thức thanh toán:
          </strong>

          ${phuongThucThanhToan}

        </p>


        ${ghiChuHTML}

      </div>

    `;

  });

}


// =====================================================
// CHẠY
// =====================================================

hienThiDonHang();
