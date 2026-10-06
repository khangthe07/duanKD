// =====================================================
// DỮ LIỆU SẢN PHẨM
// =====================================================

let sanPham = JSON.parse(localStorage.getItem("sanPham")) || [];

// =====================================================
// DANH SÁCH 32 SẢN PHẨM MẶC ĐỊNH
// =====================================================

const sanPhamMacDinh = [
  {
    id: 1,
    name: "Toyota Vios",
    category: "Ô tô",
    price: 520000000,
    status: "active",
    description: "Toyota Vios",
  },
  {
    id: 2,
    name: "Toyota Camry",
    category: "Ô tô",
    price: 1280000000,
    status: "active",
    description: "Toyota Camry",
  },
  {
    id: 3,
    name: "Honda City",
    category: "Ô tô",
    price: 589000000,
    status: "active",
    description: "Honda City",
  },
  {
    id: 4,
    name: "Honda CR-V",
    category: "Ô tô",
    price: 1099000000,
    status: "active",
    description: "Honda CR-V",
  },
  {
    id: 5,
    name: "Mazda CX-5",
    category: "Ô tô",
    price: 839000000,
    status: "active",
    description: "Mazda CX-5",
  },
  {
    id: 6,
    name: "Ford Ranger",
    category: "Ô tô",
    price: 669000000,
    status: "active",
    description: "Ford Ranger",
  },
  {
    id: 7,
    name: "Hyundai Santa Fe",
    category: "Ô tô",
    price: 1099000000,
    status: "active",
    description: "Hyundai Santa Fe",
  },
  {
    id: 8,
    name: "Mercedes-Benz GLC 300",
    category: "Ô tô",
    price: 2599000000,
    status: "active",
    description: "Mercedes-Benz GLC 300",
  },
  {
    id: 9,
    name: "Lexus LX 570",
    category: "Ô tô",
    price: 8500000000,
    status: "active",
    description: "Lexus LX 570",
  },
  {
    id: 10,
    name: "Lexus LX 600",
    category: "Ô tô",
    price: 8800000000,
    status: "active",
    description: "Lexus LX 600",
  },
  {
    id: 11,
    name: "Toyota Land Cruiser 300",
    category: "Ô tô",
    price: 4200000000,
    status: "active",
    description: "Toyota Land Cruiser 300",
  },

  {
    id: 12,
    name: "Honda Wave Alpha",
    category: "Xe máy",
    price: 18000000,
    status: "active",
    description: "Honda Wave Alpha",
  },
  {
    id: 13,
    name: "Honda Vision",
    category: "Xe máy",
    price: 32000000,
    status: "active",
    description: "Honda Vision",
  },
  {
    id: 14,
    name: "Honda Air Blade 160",
    category: "Xe máy",
    price: 58000000,
    status: "active",
    description: "Honda Air Blade 160",
  },
  {
    id: 15,
    name: "Yamaha Exciter 155",
    category: "Xe máy",
    price: 49000000,
    status: "active",
    description: "Yamaha Exciter 155",
  },
  {
    id: 16,
    name: "Yamaha Grande",
    category: "Xe máy",
    price: 47000000,
    status: "active",
    description: "Yamaha Grande",
  },
  {
    id: 17,
    name: "Yamaha NVX 155",
    category: "Xe máy",
    price: 55000000,
    status: "active",
    description: "Yamaha NVX 155",
  },
  {
    id: 18,
    name: "Honda Winner X",
    category: "Xe máy",
    price: 46000000,
    status: "active",
    description: "Honda Winner X",
  },

  {
    id: 19,
    name: "Giant Escape 3",
    category: "Xe đạp",
    price: 12500000,
    status: "active",
    description: "Giant Escape 3",
  },
  {
    id: 20,
    name: "Giant ATX 660",
    category: "Xe đạp",
    price: 14500000,
    status: "active",
    description: "Giant ATX 660",
  },
  {
    id: 21,
    name: "Trek Marlin 5",
    category: "Xe đạp",
    price: 18500000,
    status: "active",
    description: "Trek Marlin 5",
  },
  {
    id: 22,
    name: "Trek FX 2",
    category: "Xe đạp",
    price: 16500000,
    status: "active",
    description: "Trek FX 2",
  },
  {
    id: 23,
    name: "Trinx M136",
    category: "Xe đạp",
    price: 8500000,
    status: "active",
    description: "Trinx M136",
  },
  {
    id: 24,
    name: "Asama MTB",
    category: "Xe đạp",
    price: 7200000,
    status: "active",
    description: "Asama MTB",
  },
  {
    id: 25,
    name: "Galaxy ML200",
    category: "Xe đạp",
    price: 6800000,
    status: "active",
    description: "Galaxy ML200",
  },

  {
    id: 26,
    name: "Thuyền Kayak đơn",
    category: "Thuyền",
    price: 8500000,
    status: "active",
    description: "Thuyền Kayak đơn",
  },
  {
    id: 27,
    name: "Thuyền Kayak đôi",
    category: "Thuyền",
    price: 12500000,
    status: "active",
    description: "Thuyền Kayak đôi",
  },
  {
    id: 28,
    name: "Thuyền phao cao cấp",
    category: "Thuyền",
    price: 6500000,
    status: "active",
    description: "Thuyền phao cao cấp",
  },
  {
    id: 29,
    name: "Thuyền câu cá",
    category: "Thuyền",
    price: 18500000,
    status: "active",
    description: "Thuyền câu cá",
  },
  {
    id: 30,
    name: "Thuyền máy mini",
    category: "Thuyền",
    price: 45000000,
    status: "active",
    description: "Thuyền máy mini",
  },
  {
    id: 31,
    name: "Ca nô du lịch",
    category: "Thuyền",
    price: 185000000,
    status: "active",
    description: "Ca nô du lịch",
  },
  {
    id: 32,
    name: "Thuyền buồm mini",
    category: "Thuyền",
    price: 95000000,
    status: "active",
    description: "Thuyền buồm mini",
  },
];

// =====================================================
// CHUYỂN DỮ LIỆU CŨ SANG DỮ LIỆU CHUNG
// =====================================================

function chuanHoaTrangThai(status) {
  if (
    status === "active" ||
    status === "Đang bán" ||
    status === "dangban"
  ) {
    return "active";
  }

  return "inactive";
}

function dongBoDuLieuCu() {
  if (!Array.isArray(sanPham) || sanPham.length === 0) {
    sanPham = [...sanPhamMacDinh];
  } else {
    sanPhamMacDinh.forEach(function (spMacDinh) {
      const daTonTai = sanPham.some(function (sp) {
        return Number(sp.id) === Number(spMacDinh.id);
      });

      if (!daTonTai) {
        sanPham.push({
          ...spMacDinh
        });
      }
    });
  }

  // =================================================
  // LẤY DỮ LIỆU TỪ HỆ THỐNG QUẢN LÝ CŨ
  // =================================================

  const danhSachCu =
    JSON.parse(
      localStorage.getItem("danhSachSanPham")
    ) || [];

  danhSachCu.forEach(function (spCu) {
    const daTonTai = sanPham.some(function (sp) {
      return (
        sp.tenQuanLy === spCu.id ||
        sp.name === spCu.ten
      );
    });

    if (!daTonTai) {
      sanPham.push({
        id: "ql_" + spCu.id,
        tenQuanLy: spCu.id,
        name: spCu.ten,
        category: spCu.danhMuc,
        price: Number(spCu.gia),
        status:
          chuanHoaTrangThai(
            spCu.trangThai
          ),
        description:
          spCu.moTa ||
          "Chưa có mô tả.",
      });
    }
  });

  // =================================================
  // CHUẨN HÓA CÁC SẢN PHẨM ĐÃ CÓ
  // =================================================

  sanPham.forEach(function (sp) {
    sp.status =
      chuanHoaTrangThai(sp.status);

    sp.price =
      Number(sp.price) || 0;

    if (!sp.description) {
      sp.description =
        "Chưa có mô tả.";
    }
  });

  // =================================================
  // LƯU LẠI
  // =================================================

  localStorage.setItem(
    "sanPham",
    JSON.stringify(sanPham)
  );
}

// Chạy đồng bộ dữ liệu
dongBoDuLieuCu();

// =====================================================
// LẤY CÁC THÀNH PHẦN HTML
// =====================================================

const danhMuc =
  document.getElementById("danhMuc");

const timKiem =
  document.getElementById("timKiem");

const btnTimKiem =
  document.getElementById("btnTimKiem");

const ketQua =
  document.getElementById("ketQua");

const danhSachSanPham =
  document.querySelector(".products");

// =====================================================
// XÁC ĐỊNH MÃ DANH MỤC
// =====================================================

function layMaDanhMuc(category) {
  if (category === "Ô tô") {
    return "oto";
  }

  if (category === "Xe máy") {
    return "xemay";
  }

  if (category === "Xe đạp") {
    return "xedap";
  }

  if (category === "Thuyền") {
    return "thuyen";
  }

  return "";
}

// =====================================================
// THÊM SẢN PHẨM VÀO GIỎ HÀNG
// =====================================================

function themVaoGioHang(idSanPham) {

  // Xác định người dùng hiện tại
  const nguoiDungDangNhap =
    JSON.parse(
      localStorage.getItem("nguoiDungDangNhap")
    ) || null;

  // Xác định key giỏ hàng
  const keyGioHang = nguoiDungDangNhap
    ? "gioHang_" + nguoiDungDangNhap.id
    : "gioHang";

  // Lấy giỏ hàng hiện tại
  let gioHang =
    JSON.parse(
      localStorage.getItem(keyGioHang)
    ) || [];

  // Tìm sản phẩm
  const sanPhamCanThem =
    sanPham.find(function (sp) {
      return String(sp.id) ===
        String(idSanPham);
    });

  if (!sanPhamCanThem) {
    alert("Không tìm thấy sản phẩm.");
    return;
  }

  // Kiểm tra sản phẩm đã có trong giỏ chưa
  const viTri =
    gioHang.findIndex(function (sp) {
      return String(sp.id) ===
        String(sanPhamCanThem.id);
    });

  // Lấy thông tin khuyến mãi
  const km =
    layThongTinKhuyenMai(sanPhamCanThem);

  // Xác định giá bán
  const giaBan =
    km.dangKhuyenMai
      ? km.giaKhuyenMai
      : Number(sanPhamCanThem.price);

  // Nếu đã có sản phẩm
  if (viTri !== -1) {

    gioHang[viTri].quantity =
      Number(gioHang[viTri].quantity) + 1;

  } else {

    // Nếu chưa có thì thêm mới
    gioHang.push({
      id: sanPhamCanThem.id,
      name: sanPhamCanThem.name,
      price: giaBan,
      quantity: 1
    });
  }

  // Lưu giỏ hàng
  localStorage.setItem(
    keyGioHang,
    JSON.stringify(gioHang)
  );

  alert("🛒 Đã thêm sản phẩm vào giỏ hàng!");
}

// =====================================================
// THÊM SẢN PHẨM VÀO YÊU THÍCH
// =====================================================

function themYeuThich(idSanPham) {

  // Lấy danh sách yêu thích hiện tại
  let danhSachYeuThich =
    JSON.parse(
      localStorage.getItem("yeuThich")
    ) || [];

  // Tìm sản phẩm
  const sanPhamCanThem =
    sanPham.find(function (sp) {
      return String(sp.id) ===
        String(idSanPham);
    });

  // Không tìm thấy sản phẩm
  if (!sanPhamCanThem) {
    alert("Không tìm thấy sản phẩm.");
    return;
  }

  // Kiểm tra sản phẩm đã có chưa
  const daCo =
    danhSachYeuThich.some(function (sp) {
      return String(sp.id) ===
        String(sanPhamCanThem.id);
    });

  if (daCo) {
    alert(
      "Sản phẩm này đã có trong danh sách yêu thích."
    );

    return;
  }

  // Thêm sản phẩm
  danhSachYeuThich.push({
    id: sanPhamCanThem.id,

    ten: sanPhamCanThem.name,

    gia: Number(
      sanPhamCanThem.price
    ).toLocaleString("vi-VN") + " VNĐ"
  });

  // Lưu vào localStorage
  localStorage.setItem(
    "yeuThich",
    JSON.stringify(danhSachYeuThich)
  );

  alert(
    "❤️ Đã thêm sản phẩm vào yêu thích!"
  );
}

// =====================================================
// HIỂN THỊ SẢN PHẨM
// =====================================================

function hienThiSanPham() {

  const luaChon =
    danhMuc.value;

  const tuKhoa =
    timKiem.value
      .toLowerCase()
      .trim();

  danhSachSanPham.innerHTML = "";

  let soLuong = 0;

  sanPham.forEach(function (sp) {

    // ---------------------------------------------
    // Chỉ hiển thị sản phẩm đang bán
    // ---------------------------------------------

    if (sp.status !== "active") {
      return;
    }

    // ---------------------------------------------
    // Xác định danh mục
    // ---------------------------------------------

    const loai =
      layMaDanhMuc(sp.category);

    // ---------------------------------------------
    // Lọc danh mục
    // ---------------------------------------------

    const dungDanhMuc =
      luaChon === "tatca" ||
      loai === luaChon;

    // ---------------------------------------------
    // Lọc tìm kiếm
    // ---------------------------------------------

    const tenSanPham =
      String(sp.name || "")
        .toLowerCase();

    const dungTuKhoa =
      tenSanPham.includes(tuKhoa);

    // ---------------------------------------------
    // Nếu phù hợp thì hiển thị
    // ---------------------------------------------

    if (dungDanhMuc && dungTuKhoa) {

      danhSachSanPham.innerHTML += `

        <div
          class="product san-pham"
          data-loai="${loai}"
        >

          <div class="product-image">
            Ảnh ${sp.category}
          </div>

          <h3>
            ${sp.name}
          </h3>

          ${(function () {

            const km =
              layThongTinKhuyenMai(sp);

            if (km.dangKhuyenMai) {

              return `

                <div style="margin-top: 8px;">

                  <span
                    style="
                      text-decoration: line-through;
                      color: #777;
                      font-size: 14px;
                    "
                  >
                    ${Number(sp.price).toLocaleString("vi-VN")} VNĐ
                  </span>

                  <br>

                  <strong
                    style="
                      color: #d32f2f;
                      font-size: 18px;
                    "
                  >
                    ${km.giaKhuyenMai.toLocaleString("vi-VN")} VNĐ
                  </strong>

                  <br>

                  <span
                    style="
                      color: #d32f2f;
                      font-weight: bold;
                    "
                  >
                    🔥 Giảm ${km.phanTramGiam}%
                  </span>

                </div>

                <div
                  style="
                    margin-top: 8px;
                    padding: 7px;
                    background: #f8f9fa;
                    border-radius: 6px;
                    font-size: 13px;
                  "
                >

                  <strong>
                    Khuyến mãi:
                  </strong>

                  ${km.trangThai}

                  <br>

                  Thời gian:
                  ${dinhDangNgay(km.ngayBatDau)}
                  -
                  ${dinhDangNgay(km.ngayKetThuc)}

                </div>

              `;

            }

            return `

              <p>
                ${Number(sp.price).toLocaleString("vi-VN")} VNĐ
              </p>

            `;

          })()}

          <div
            style="
              display:flex;
              flex-wrap:wrap;
              gap:8px;
              justify-content:center;
              margin-top:10px;
            "
          >

            <a
              href="chitietsanpham.html?id=${encodeURIComponent(sp.id)}"
              class="product-button"
            >
              Xem chi tiết
            </a>

            <button
              type="button"
              onclick="themVaoGioHang('${String(sp.id).replace(/'/g, "\\'")}')"
            >
              🛒 Thêm vào giỏ
            </button>

            <button
              type="button"
              onclick="themYeuThich('${String(sp.id).replace(/'/g, "\\'")}')"
            >
              ❤️ Yêu thích
            </button>

          </div>

        </div>

      `;

      soLuong++;
    }
  });

  // =================================================
  // KHÔNG CÓ SẢN PHẨM
  // =================================================

  if (soLuong === 0) {

    danhSachSanPham.innerHTML = `

      <p
        style="
          grid-column: 1 / -1;
          text-align: center;
          padding: 30px;
          font-weight: bold;
        "
      >
        Không tìm thấy sản phẩm
      </p>

    `;
  }

  // =================================================
  // HIỂN THỊ SỐ LƯỢNG
  // =================================================

  ketQua.textContent =
    "Đang hiển thị " +
    soLuong +
    " sản phẩm";
}

// =====================================================
// LỌC THEO DANH MỤC
// =====================================================

danhMuc.addEventListener(
  "change",
  function () {
    hienThiSanPham();
  }
);

// =====================================================
// TÌM KIẾM
// =====================================================

btnTimKiem.addEventListener(
  "click",
  function () {
    hienThiSanPham();
  }
);

// =====================================================
// NHẤN ENTER ĐỂ TÌM KIẾM
// =====================================================

timKiem.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Enter") {
      hienThiSanPham();
    }

  }
);

// =====================================================
// KHUYẾN MÃI
// =====================================================

const khuyenMaiMacDinh = {

  // Toyota Vios
  1: {
    phanTramGiam: 10,
    ngayBatDau: "2026-10-01",
    ngayKetThuc: "2026-10-31"
  },

  // Honda Vision
  13: {
    phanTramGiam: 5,
    ngayBatDau: "2026-10-01",
    ngayKetThuc: "2026-10-31"
  },

  // Giant Escape 3
  19: {
    phanTramGiam: 15,
    ngayBatDau: "2026-10-01",
    ngayKetThuc: "2026-10-31"
  }

};

// =====================================================
// THÊM KHUYẾN MÃI VÀO SẢN PHẨM
// =====================================================

sanPham.forEach(function (sp) {

  if (
    !sp.khuyenMai &&
    khuyenMaiMacDinh[sp.id]
  ) {

    sp.khuyenMai = {
      ...khuyenMaiMacDinh[sp.id]
    };

  }

});

// Lưu lại dữ liệu
localStorage.setItem(
  "sanPham",
  JSON.stringify(sanPham)
);

// =====================================================
// LẤY THÔNG TIN KHUYẾN MÃI
// =====================================================

function layThongTinKhuyenMai(sp) {

  if (!sp.khuyenMai) {

    return {
      dangKhuyenMai: false,
      trangThai: "Không có khuyến mãi",
      giaKhuyenMai: Number(sp.price) || 0
    };

  }

  const phanTramGiam =
    Number(sp.khuyenMai.phanTramGiam) || 0;

  const ngayBatDau =
    sp.khuyenMai.ngayBatDau;

  const ngayKetThuc =
    sp.khuyenMai.ngayKetThuc;

  if (
    phanTramGiam <= 0 ||
    !ngayBatDau ||
    !ngayKetThuc
  ) {

    return {
      dangKhuyenMai: false,
      trangThai: "Khuyến mãi chưa thiết lập",
      giaKhuyenMai: Number(sp.price) || 0
    };

  }

  const homNay = new Date();

  homNay.setHours(
    0,
    0,
    0,
    0
  );

  const batDau = new Date(
    ngayBatDau + "T00:00:00"
  );

  const ketThuc = new Date(
    ngayKetThuc + "T23:59:59"
  );

  let trangThai = "";
  let dangKhuyenMai = false;

  if (homNay < batDau) {

    trangThai = "Sắp diễn ra";

  } else if (homNay > ketThuc) {

    trangThai = "Đã kết thúc";

  } else {

    trangThai = "Đang khuyến mãi";

    dangKhuyenMai = true;

  }

  const giaGoc =
    Number(sp.price) || 0;

  const giaKhuyenMai =
    dangKhuyenMai
      ? Math.round(
          giaGoc *
          (1 - phanTramGiam / 100)
        )
      : giaGoc;

  return {

    dangKhuyenMai:
      dangKhuyenMai,

    trangThai:
      trangThai,

    giaKhuyenMai:
      giaKhuyenMai,

    phanTramGiam:
      phanTramGiam,

    ngayBatDau:
      ngayBatDau,

    ngayKetThuc:
      ngayKetThuc

  };

}

// =====================================================
// ĐỊNH DẠNG NGÀY
// =====================================================

function dinhDangNgay(ngay) {

  if (!ngay) {
    return "";
  }

  const phan =
    ngay.split("-");

  if (phan.length !== 3) {
    return ngay;
  }

  return (
    phan[2] +
    "/" +
    phan[1] +
    "/" +
    phan[0]
  );

}

// =====================================================
// HIỂN THỊ BAN ĐẦU
// =====================================================

hienThiSanPham();