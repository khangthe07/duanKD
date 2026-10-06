// =====================================================
// ĐĂNG NHẬP
// =====================================================

// =====================================================
// LẤY FORM VÀ THÔNG BÁO
// =====================================================

const formDangNhap = document.getElementById("formDangNhap");

const thongBao = document.getElementById("thongBao");

// =====================================================
// LẤY DANH SÁCH TÀI KHOẢN
// =====================================================

let danhSachTaiKhoan = JSON.parse(localStorage.getItem("taiKhoan"));

// =====================================================
// NẾU CHƯA CÓ TÀI KHOẢN → TẠO TÀI KHOẢN MẪU
// =====================================================

if (!Array.isArray(danhSachTaiKhoan) || danhSachTaiKhoan.length === 0) {
  danhSachTaiKhoan = [
    {
      id: 1,

      tenDangNhap: "admin",

      matKhau: "123456",

      hoTen: "Quản trị viên",

      soDienThoai: "",

      email: "",

      vaiTro: "admin",
    },

    {
      id: 2,

      tenDangNhap: "nhanvien",

      matKhau: "123456",

      hoTen: "Nhân viên",

      soDienThoai: "",

      email: "",

      vaiTro: "nhanvien",
    },
  ];

  localStorage.setItem("taiKhoan", JSON.stringify(danhSachTaiKhoan));
}

// =====================================================
// HÀM GỘP GIỎ HÀNG CŨ VÀO GIỎ HÀNG TÀI KHOẢN
// =====================================================

function gopGioHang(gioHangCu, gioHangTaiKhoan) {
  const ketQua = Array.isArray(gioHangTaiKhoan) ? gioHangTaiKhoan : [];

  if (!Array.isArray(gioHangCu) || gioHangCu.length === 0) {
    return ketQua;
  }

  gioHangCu.forEach(function (spCu) {
    const viTri = ketQua.findIndex(function (sp) {
      return String(sp.id) === String(spCu.id);
    });

    // -----------------------------------------
    // SẢN PHẨM ĐÃ CÓ
    // -----------------------------------------

    if (viTri !== -1) {
      ketQua[viTri].quantity =
        (Number(ketQua[viTri].quantity) || 0) + (Number(spCu.quantity) || 0);
    }

    // -----------------------------------------
    // SẢN PHẨM CHƯA CÓ
    // -----------------------------------------
    else {
      ketQua.push({
        id: spCu.id,

        name: spCu.name,

        category: spCu.category,

        price: Number(spCu.price) || 0,

        quantity: Number(spCu.quantity) || 1,
      });
    }
  });

  return ketQua;
}

// =====================================================
// XỬ LÝ ĐĂNG NHẬP
// =====================================================

function dangNhap(event) {
  event.preventDefault();

  // =================================================
  // LẤY DỮ LIỆU FORM
  // =================================================

  const tenDangNhap = document.getElementById("tenDangNhap").value.trim();

  const matKhau = document.getElementById("matKhau").value;

  // =================================================
  // KIỂM TRA NHẬP ĐỦ
  // =================================================

  if (tenDangNhap === "" || matKhau === "") {
    thongBao.textContent = "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.";

    return;
  }

  // =================================================
  // TÌM TÀI KHOẢN
  // =================================================

  const taiKhoan = danhSachTaiKhoan.find(function (tk) {
    return (
      String(tk.tenDangNhap).toLowerCase() === tenDangNhap.toLowerCase() &&
      String(tk.matKhau) === String(matKhau)
    );
  });

  // =================================================
  // SAI TÀI KHOẢN / MẬT KHẨU
  // =================================================

  if (!taiKhoan) {
    thongBao.textContent = "Tên đăng nhập hoặc mật khẩu không đúng.";

    return;
  }

  // =================================================
  // LƯU NGƯỜI DÙNG ĐANG ĐĂNG NHẬP
  // =================================================

  const nguoiDungDangNhap = {
    id: taiKhoan.id,

    tenDangNhap: taiKhoan.tenDangNhap,

    hoTen: taiKhoan.hoTen,

    soDienThoai: taiKhoan.soDienThoai || "",

    email: taiKhoan.email || "",

    vaiTro: taiKhoan.vaiTro,
  };

  localStorage.setItem("nguoiDungDangNhap", JSON.stringify(nguoiDungDangNhap));

  // =================================================
  // NẾU LÀ KHÁCH HÀNG
  // =================================================

  if (taiKhoan.vaiTro === "khachhang") {
    // ---------------------------------------------
    // KEY GIỎ HÀNG RIÊNG
    // ---------------------------------------------

    const keyGioHang = "gioHang_" + taiKhoan.id;

    // ---------------------------------------------
    // LẤY GIỎ HÀNG CŨ CỦA KHÁCH
    // ---------------------------------------------

    let gioHangTaiKhoan = [];

    try {
      gioHangTaiKhoan = JSON.parse(localStorage.getItem(keyGioHang)) || [];
    } catch (error) {
      gioHangTaiKhoan = [];
    }

    // ---------------------------------------------
    // LẤY GIỎ HÀNG KHÁCH VÃNG LAI NẾU CÓ
    // ---------------------------------------------

    let gioHangCu = [];

    try {
      gioHangCu = JSON.parse(localStorage.getItem("gioHang")) || [];
    } catch (error) {
      gioHangCu = [];
    }

    // ---------------------------------------------
    // GỘP GIỎ HÀNG
    // ---------------------------------------------

    const gioHangMoi = gopGioHang(gioHangCu, gioHangTaiKhoan);

    // ---------------------------------------------
    // LƯU GIỎ HÀNG RIÊNG
    // ---------------------------------------------

    localStorage.setItem(keyGioHang, JSON.stringify(gioHangMoi));

    // ---------------------------------------------
    // XÓA GIỎ HÀNG CHUNG
    // ---------------------------------------------

    localStorage.removeItem("gioHang");
  }

  // =================================================
  // THÔNG BÁO
  // =================================================

  thongBao.textContent = "Đăng nhập thành công!";

  // =================================================
  // CHUYỂN VỀ TRANG CHỦ
  // =================================================
  //
  // dangnhap.html nằm trong:
  // pages/
  //
  // index.html nằm ở:
  // thư mục gốc
  //
  // Vì vậy phải dùng:
  // ../index.html
  // =================================================

  setTimeout(function () {
    window.location.href = "../index.html";
  }, 300);
}

// =====================================================
// GẮN SỰ KIỆN CHO FORM
// =====================================================

if (formDangNhap) {
  formDangNhap.addEventListener("submit", dangNhap);
}
