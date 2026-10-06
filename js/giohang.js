// =====================================================
// GIỎ HÀNG
// =====================================================

// =====================================================
// XÁC ĐỊNH NGƯỜI DÙNG ĐANG ĐĂNG NHẬP
// =====================================================

const nguoiDungDangNhap =
  JSON.parse(localStorage.getItem("nguoiDungDangNhap")) || null;

// =====================================================
// XÁC ĐỊNH KEY GIỎ HÀNG
// =====================================================
//
// Chưa đăng nhập:
//     gioHang
//
// Đã đăng nhập:
//     gioHang_ID
//
// Ví dụ:
//     gioHang_6
//     gioHang_7
// =====================================================

const keyGioHang = nguoiDungDangNhap
  ? "gioHang_" + nguoiDungDangNhap.id
  : "gioHang";

// =====================================================
// LẤY DỮ LIỆU GIỎ HÀNG
// =====================================================

let gioHang = JSON.parse(localStorage.getItem(keyGioHang)) || [];

// =====================================================
// LƯU GIỎ HÀNG
// =====================================================

function luuGioHang() {
  localStorage.setItem(keyGioHang, JSON.stringify(gioHang));
}

// =====================================================
// LẤY CÁC PHẦN TỬ HTML
// =====================================================

const danhSachGioHang = document.getElementById("danhSachGioHang");

const tongTienGioHang = document.getElementById("tongTienGioHang");

const soLuongGioHang = document.getElementById("soLuongGioHang");

const btnXoaTatCa = document.getElementById("btnXoaTatCa");

const btnDatHang = document.getElementById("btnDatHang");

// =====================================================
// HIỂN THỊ GIỎ HÀNG
// =====================================================

function hienThiGioHang() {
  danhSachGioHang.innerHTML = "";

  // =================================================
  // GIỎ HÀNG TRỐNG
  // =================================================

  if (gioHang.length === 0) {
    danhSachGioHang.innerHTML = `

      <div
        style="
          background: white;
          padding: 40px;
          text-align: center;
          border-radius: 10px;
        "
      >

        <h2>
          Giỏ hàng đang trống
        </h2>

        <p>
          Hãy chọn sản phẩm bạn muốn mua.
        </p>

        <br>

        <a
          href="sanpham.html"
          class="product-button"
        >
          Xem sản phẩm
        </a>

      </div>

    `;

    tongTienGioHang.textContent = "Tổng tiền: 0 VNĐ";

    soLuongGioHang.textContent = "Giỏ hàng đang trống";

    return;
  }

  // =================================================
  // HIỂN THỊ SẢN PHẨM
  // =================================================

  let tongTien = 0;

  let tongSoLuong = 0;

  gioHang.forEach(function (sp, index) {
    const thanhTien = Number(sp.price) * Number(sp.quantity);

    tongTien += thanhTien;

    tongSoLuong += Number(sp.quantity);

    danhSachGioHang.innerHTML += `

      <div
        style="
          background: white;
          padding: 20px;
          margin-bottom: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        "
      >

        <h2>
          ${sp.name}
        </h2>


        <p>

          <strong>
            Đơn giá:
          </strong>

          ${Number(sp.price).toLocaleString("vi-VN")}
          VNĐ

        </p>


        <p>

          <strong>
            Thành tiền:
          </strong>

          ${thanhTien.toLocaleString("vi-VN")}
          VNĐ

        </p>


        <!-- SỐ LƯỢNG -->

        <div
          style="
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 15px;
            flex-wrap: wrap;
          "
        >

          <strong>
            Số lượng:
          </strong>


          <button
            type="button"
            onclick="giamSoLuong(${index})"
          >
            −
          </button>


          <span
            style="
              min-width: 30px;
              text-align: center;
              font-weight: bold;
            "
          >
            ${sp.quantity}
          </span>


          <button
            type="button"
            onclick="tangSoLuong(${index})"
          >
            +
          </button>


          <button
            type="button"
            onclick="xoaSanPham(${index})"
            style="margin-left: 10px;"
          >
            Xóa
          </button>

        </div>

      </div>

    `;
  });

  // =================================================
  // CẬP NHẬT TỔNG
  // =================================================

  tongTienGioHang.textContent =
    "Tổng tiền: " + tongTien.toLocaleString("vi-VN") + " VNĐ";

  soLuongGioHang.textContent = "Có " + tongSoLuong + " sản phẩm trong giỏ hàng";
}

// =====================================================
// TĂNG SỐ LƯỢNG
// =====================================================

function tangSoLuong(index) {
  if (!gioHang[index]) {
    return;
  }

  gioHang[index].quantity = Number(gioHang[index].quantity) + 1;

  // LƯU NGAY
  luuGioHang();

  hienThiGioHang();
}

// =====================================================
// GIẢM SỐ LƯỢNG
// =====================================================

function giamSoLuong(index) {
  if (!gioHang[index]) {
    return;
  }

  if (Number(gioHang[index].quantity) > 1) {
    gioHang[index].quantity = Number(gioHang[index].quantity) - 1;
  } else {
    const xacNhan = confirm(
      "Sản phẩm chỉ còn 1 cái. Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?",
    );

    if (xacNhan) {
      gioHang.splice(index, 1);
    } else {
      return;
    }
  }

  // LƯU NGAY
  luuGioHang();

  hienThiGioHang();
}

// =====================================================
// XÓA MỘT SẢN PHẨM
// =====================================================

function xoaSanPham(index) {
  if (!gioHang[index]) {
    return;
  }

  const xacNhan = confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?");

  if (!xacNhan) {
    return;
  }

  gioHang.splice(index, 1);

  // LƯU NGAY
  luuGioHang();

  hienThiGioHang();
}

// =====================================================
// XÓA TẤT CẢ
// =====================================================

btnXoaTatCa.addEventListener("click", function () {
  if (gioHang.length === 0) {
    alert("Giỏ hàng đang trống.");

    return;
  }

  const xacNhan = confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?");

  if (!xacNhan) {
    return;
  }

  gioHang = [];

  // LƯU NGAY
  luuGioHang();

  hienThiGioHang();
});

// =====================================================
// ĐẶT HÀNG
// =====================================================

btnDatHang.addEventListener("click", function () {
  if (gioHang.length === 0) {
    alert("Giỏ hàng đang trống. Vui lòng chọn sản phẩm trước.");

    return;
  }

  // =================================================
  // KIỂM TRA ĐĂNG NHẬP
  // =================================================

  if (!nguoiDungDangNhap) {
    alert("Bạn cần đăng nhập trước khi tiến hành đặt hàng.");

    window.location.href = "dangnhap.html";

    return;
  }

  // =================================================
  // ĐÃ ĐĂNG NHẬP
  // =================================================

  window.location.href = "dathang.html";
});

// =====================================================
// HIỂN THỊ BAN ĐẦU
// =====================================================

hienThiGioHang();
