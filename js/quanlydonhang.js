// =====================================================
// QUẢN LÝ ĐƠN HÀNG
// =====================================================

let danhSachDonHang = JSON.parse(localStorage.getItem("danhSachDonHang")) || [];

let sanPham = JSON.parse(localStorage.getItem("sanPham")) || [];

let tonKho = JSON.parse(localStorage.getItem("tonKho")) || {};

// =====================================================
// NGƯỜI DÙNG ĐANG ĐĂNG NHẬP
// =====================================================

const nguoiDungDangNhap =
  JSON.parse(localStorage.getItem("nguoiDungDangNhap")) || null;

// =====================================================
// KIỂM TRA QUYỀN
// =====================================================

function coQuyenQuanLyDonHang() {
  if (!nguoiDungDangNhap) {
    return false;
  }

  return (
    nguoiDungDangNhap.vaiTro === "admin" ||
    nguoiDungDangNhap.vaiTro === "nhanvien"
  );
}

// =====================================================
// LƯU DỮ LIỆU
// =====================================================

function luuDuLieu() {
  localStorage.setItem("danhSachDonHang", JSON.stringify(danhSachDonHang));

  localStorage.setItem("tonKho", JSON.stringify(tonKho));

  localStorage.setItem("sanPham", JSON.stringify(sanPham));
}

// =====================================================
// TÌM ĐƠN HÀNG
// =====================================================

function timDonHang(maDonHang) {
  return danhSachDonHang.find(function (donHang) {
    return String(donHang.id) === String(maDonHang);
  });
}

// =====================================================
// TÌM SẢN PHẨM
// =====================================================

function timSanPham(id) {
  return sanPham.find(function (sp) {
    return String(sp.id) === String(id);
  });
}

// =====================================================
// KHỞI TẠO TỒN KHO
// =====================================================

function khoiTaoTonKho() {
  sanPham.forEach(function (sp) {
    if (
      tonKho[sp.id] === undefined ||
      tonKho[sp.id] === null ||
      isNaN(Number(tonKho[sp.id]))
    ) {
      tonKho[sp.id] = 10;
    }
  });

  localStorage.setItem("tonKho", JSON.stringify(tonKho));
}

// =====================================================
// TRỪ KHO KHI ĐƠN ĐÃ GIAO
// =====================================================

function truKhoTheoDonHang(donHang) {
  if (!donHang) {
    return false;
  }

  // Đã trừ kho rồi thì không trừ lần nữa

  if (donHang.daTruKho === true) {
    return true;
  }

  // Kiểm tra tồn kho trước

  for (const item of donHang.sanPham) {
    const idSanPham = item.id;

    const soLuong = Number(item.quantity) || 0;

    const tonHienTai = Number(tonKho[idSanPham]) || 0;

    if (soLuong <= 0) {
      alert("Số lượng sản phẩm không hợp lệ: " + item.name);

      return false;
    }

    if (tonHienTai < soLuong) {
      alert(
        "Không đủ tồn kho cho sản phẩm: " +
          item.name +
          "\n" +
          "Tồn hiện tại: " +
          tonHienTai +
          "\n" +
          "Số lượng cần: " +
          soLuong,
      );

      return false;
    }
  }

  // Đủ hàng -> trừ kho

  donHang.sanPham.forEach(function (item) {
    const idSanPham = item.id;

    const soLuong = Number(item.quantity) || 0;

    tonKho[idSanPham] = (Number(tonKho[idSanPham]) || 0) - soLuong;
  });

  donHang.daTruKho = true;

  luuDuLieu();

  return true;
}

// =====================================================
// HOÀN KHO
// =====================================================

function hoanKhoTheoDonHang(donHang) {
  if (!donHang) {
    return;
  }

  // Chưa trừ kho thì không hoàn

  if (donHang.daTruKho !== true) {
    return;
  }

  donHang.sanPham.forEach(function (item) {
    const idSanPham = item.id;

    const soLuong = Number(item.quantity) || 0;

    tonKho[idSanPham] = (Number(tonKho[idSanPham]) || 0) + soLuong;
  });

  donHang.daTruKho = false;

  luuDuLieu();
}

// =====================================================
// ĐỔI TRẠNG THÁI ĐƠN
// =====================================================

function doiTrangThai(maDonHang, trangThaiMoi) {
  // -------------------------------------------------
  // KIỂM TRA ĐĂNG NHẬP
  // -------------------------------------------------

  if (!nguoiDungDangNhap) {
    alert("Bạn chưa đăng nhập.");

    window.location.href = "dangnhap.html";

    return;
  }

  // -------------------------------------------------
  // KIỂM TRA QUYỀN ADMIN / NHÂN VIÊN
  // -------------------------------------------------

  if (!coQuyenQuanLyDonHang()) {
    alert("Bạn không có quyền xác nhận hoặc cập nhật đơn hàng.");

    return;
  }

  // -------------------------------------------------
  // TÌM ĐƠN
  // -------------------------------------------------

  const donHang = timDonHang(maDonHang);

  if (!donHang) {
    alert("Không tìm thấy đơn hàng: " + maDonHang);

    return;
  }

  const trangThaiCu = donHang.trangThai;

  // -------------------------------------------------
  // KHÔNG ĐỔI THÌ DỪNG
  // -------------------------------------------------

  if (trangThaiCu === trangThaiMoi) {
    return;
  }

  // -------------------------------------------------
  // KHÔNG CHO ĐỔI ĐƠN ĐÃ HỦY
  // -------------------------------------------------

  if (trangThaiCu === "Đã hủy") {
    alert("Đơn hàng đã hủy không thể tiếp tục xử lý.");

    return;
  }

  // =================================================
  // 1. CHỜ XÁC NHẬN -> ĐÃ XÁC NHẬN
  // =================================================

  if (trangThaiCu === "Chờ xác nhận" && trangThaiMoi === "Đã xác nhận") {
    donHang.trangThai = "Đã xác nhận";

    luuDuLieu();

    hienThiDonHang();

    alert("Đã xác nhận đơn hàng " + donHang.id);

    return;
  }

  // =================================================
  // 2. ĐÃ XÁC NHẬN -> ĐANG GIAO
  // =================================================

  if (trangThaiCu === "Đã xác nhận" && trangThaiMoi === "Đang giao") {
    donHang.trangThai = "Đang giao";

    luuDuLieu();

    hienThiDonHang();

    alert("Đơn hàng đã chuyển sang trạng thái Đang giao.");

    return;
  }

  // =================================================
  // 3. ĐANG GIAO -> ĐÃ GIAO
  // =================================================

  if (trangThaiCu === "Đang giao" && trangThaiMoi === "Đã giao") {
    const ketQua = truKhoTheoDonHang(donHang);

    if (!ketQua) {
      // Không đủ hàng -> giữ nguyên trạng thái

      hienThiDonHang();

      return;
    }

    donHang.trangThai = "Đã giao";

    luuDuLieu();

    hienThiDonHang();

    alert("Đơn hàng đã giao thành công.\n" + "Tồn kho đã được cập nhật.");

    return;
  }

  // =================================================
  // 4. ĐÃ GIAO -> ĐANG GIAO
  // =================================================

  if (trangThaiCu === "Đã giao" && trangThaiMoi === "Đang giao") {
    hoanKhoTheoDonHang(donHang);

    donHang.trangThai = "Đang giao";

    luuDuLieu();

    hienThiDonHang();

    alert(
      "Đơn hàng đã chuyển lại Đang giao.\n" +
        "Số lượng hàng đã được hoàn lại kho.",
    );

    return;
  }

  // =================================================
  // 5. ĐANG GIAO -> ĐÃ XÁC NHẬN
  // =================================================

  if (trangThaiCu === "Đang giao" && trangThaiMoi === "Đã xác nhận") {
    donHang.trangThai = "Đã xác nhận";

    luuDuLieu();

    hienThiDonHang();

    return;
  }

  // =================================================
  // 6. ĐÃ XÁC NHẬN -> CHỜ XÁC NHẬN
  // =================================================

  if (trangThaiCu === "Đã xác nhận" && trangThaiMoi === "Chờ xác nhận") {
    donHang.trangThai = "Chờ xác nhận";

    luuDuLieu();

    hienThiDonHang();

    return;
  }

  // =================================================
  // 7. TRƯỜNG HỢP KHÁC
  // =================================================

  donHang.trangThai = trangThaiMoi;

  luuDuLieu();

  hienThiDonHang();
}

// =====================================================
// HỦY ĐƠN
// =====================================================

function huyDonHang(maDonHang) {
  if (!coQuyenQuanLyDonHang()) {
    alert("Bạn không có quyền hủy đơn hàng.");

    return;
  }

  const donHang = timDonHang(maDonHang);

  if (!donHang) {
    alert("Không tìm thấy đơn hàng.");

    return;
  }

  if (donHang.trangThai === "Đã hủy") {
    alert("Đơn hàng này đã được hủy.");

    return;
  }

  const xacNhan = confirm(
    "Bạn có chắc muốn hủy đơn hàng " + donHang.id + " không?",
  );

  if (!xacNhan) {
    return;
  }

  // Nếu đã trừ kho -> hoàn lại

  if (donHang.daTruKho === true) {
    hoanKhoTheoDonHang(donHang);
  }

  donHang.trangThai = "Đã hủy";

  luuDuLieu();

  hienThiDonHang();

  alert("Đã hủy đơn hàng.");
}

// =====================================================
// HIỂN THỊ ĐƠN HÀNG
// =====================================================

function hienThiDonHang() {
  const khuVuc = document.getElementById("danhSachDonHang");

  if (!khuVuc) {
    return;
  }

  danhSachDonHang = JSON.parse(localStorage.getItem("danhSachDonHang")) || [];

  // -------------------------------------------------
  // SẮP XẾP MỚI NHẤT TRƯỚC
  // -------------------------------------------------

  const danhSach = [...danhSachDonHang].reverse();

  if (danhSach.length === 0) {
    khuVuc.innerHTML = `
            <p style="
                padding:20px;
                text-align:center;
            ">
                Chưa có đơn hàng.
            </p>
        `;

    return;
  }

  khuVuc.innerHTML = danhSach
    .map(function (donHang) {
      const danhSachSanPham = (donHang.sanPham || [])
        .map(function (item) {
          return `
                        <li>
                            ${item.name}
                            × ${item.quantity}
                            -
                            ${Number(item.thanhTien || 0).toLocaleString(
                              "vi-VN",
                            )}
                            VNĐ
                        </li>
                    `;
        })
        .join("");

      return `

                <div
                    class="don-hang-card"
                    style="
                        border:1px solid #ddd;
                        border-radius:10px;
                        padding:20px;
                        margin-bottom:20px;
                        background:#fff;
                    "
                >

                    <h3>
                        Đơn hàng: ${donHang.id}
                    </h3>

                    <p>
                        <strong>Ngày đặt:</strong>
                        ${donHang.ngayDat || ""}
                    </p>

                    <p>
                        <strong>Khách hàng:</strong>
                        ${donHang.khachHang?.hoTen || ""}
                    </p>

                    <p>
                        <strong>Số điện thoại:</strong>
                        ${donHang.khachHang?.soDienThoai || ""}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${donHang.khachHang?.email || ""}
                    </p>

                    <p>
                        <strong>Địa chỉ:</strong>
                        ${donHang.khachHang?.diaChi || ""}
                    </p>

                    <p>
                        <strong>Trạng thái:</strong>

                        <span style="
                            font-weight:bold;
                            margin-left:5px;
                        ">
                            ${donHang.trangThai || "Chờ xác nhận"}
                        </span>
                    </p>


                    <h4>
                        Sản phẩm
                    </h4>

                    <ul>
                        ${danhSachSanPham}
                    </ul>


                    <p>
                        <strong>Tổng tiền:</strong>

                        ${Number(donHang.tongTien || 0).toLocaleString("vi-VN")}
                        VNĐ
                    </p>


                    <p>
                        <strong>Thanh toán:</strong>
                        ${
                          donHang.phuongThucThanhToan === "cod"
                            ? "COD"
                            : "Chuyển khoản"
                        }
                    </p>


                    ${
                      donHang.ghiChu
                        ? `
                                <p>
                                    <strong>Ghi chú:</strong>
                                    ${donHang.ghiChu}
                                </p>
                            `
                        : ""
                    }


                    ${
                      donHang.daTruKho === true
                        ? `
                                <p style="
                                    color:green;
                                    font-weight:bold;
                                ">
                                    ✓ Hàng đã được trừ khỏi kho
                                </p>
                            `
                        : ""
                    }


                    <!-- ========================= -->
                    <!-- NÚT XỬ LÝ ĐƠN -->
                    <!-- ========================= -->

                    <div style="
                        display:flex;
                        flex-wrap:wrap;
                        gap:10px;
                        margin-top:15px;
                    ">

                        ${
                          donHang.trangThai === "Chờ xác nhận"
                            ? `
                                    <button
                                        type="button"
                                        onclick="doiTrangThai(
                                            '${donHang.id}',
                                            'Đã xác nhận'
                                        )"
                                    >
                                        ✓ Xác nhận đơn
                                    </button>
                                `
                            : ""
                        }


                        ${
                          donHang.trangThai === "Đã xác nhận"
                            ? `
                                    <button
                                        type="button"
                                        onclick="doiTrangThai(
                                            '${donHang.id}',
                                            'Đang giao'
                                        )"
                                    >
                                        🚚 Chuyển đang giao
                                    </button>
                                `
                            : ""
                        }


                        ${
                          donHang.trangThai === "Đang giao"
                            ? `
                                    <button
                                        type="button"
                                        onclick="doiTrangThai(
                                            '${donHang.id}',
                                            'Đã giao'
                                        )"
                                    >
                                        ✓ Đã giao
                                    </button>
                                `
                            : ""
                        }


                        ${
                          donHang.trangThai !== "Đã giao" &&
                          donHang.trangThai !== "Đã hủy"
                            ? `
                                    <button
                                        type="button"
                                        onclick="huyDonHang(
                                            '${donHang.id}'
                                        )"
                                        style="
                                            background:#dc2626;
                                            color:white;
                                        "
                                    >
                                        ✕ Hủy đơn
                                    </button>
                                `
                            : ""
                        }

                    </div>

                </div>

            `;
    })
    .join("");
}

// =====================================================
// TÌM KIẾM ĐƠN HÀNG
// =====================================================

function timKiemDonHang() {
  const oTimKiem = document.getElementById("timKiem");

  if (!oTimKiem) {
    hienThiDonHang();

    return;
  }

  const tuKhoa = oTimKiem.value.trim().toLowerCase();

  const khuVuc = document.getElementById("danhSachDonHang");

  if (!khuVuc) {
    return;
  }

  const ketQua = [...danhSachDonHang].reverse().filter(function (donHang) {
    return (
      String(donHang.id || "")
        .toLowerCase()
        .includes(tuKhoa) ||
      String(donHang.khachHang?.hoTen || "")
        .toLowerCase()
        .includes(tuKhoa) ||
      String(donHang.khachHang?.soDienThoai || "")
        .toLowerCase()
        .includes(tuKhoa)
    );
  });

  if (ketQua.length === 0) {
    khuVuc.innerHTML = `
            <p>
                Không tìm thấy đơn hàng.
            </p>
        `;

    return;
  }

  // Tạm lọc dữ liệu rồi render

  const danhSachCu = danhSachDonHang;

  danhSachDonHang = ketQua;

  hienThiDonHang();

  danhSachDonHang = danhSachCu;
}

// =====================================================
// KHỞI TẠO
// =====================================================

khoiTaoTonKho();

hienThiDonHang();
