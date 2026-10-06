// ========================================
// QUẢN LÝ SẢN PHẨM - DuAnKD
// ========================================

// Dùng chung dữ liệu với trang sanpham.js
let danhSachSanPham = JSON.parse(localStorage.getItem("sanPham")) || [];

// ========================================
// HIỂN THỊ DANH SÁCH SẢN PHẨM
// ========================================

function hienThiSanPham() {
  const tbody = document.getElementById("danhSachSanPham");
  const oTimKiem = document.getElementById("timKiem");

  const tuKhoa = oTimKiem ? oTimKiem.value.trim().toLowerCase() : "";

  tbody.innerHTML = "";

  // Lọc sản phẩm theo tên
  const danhSachLoc = danhSachSanPham.filter(function (sanPham) {
    return sanPham.name.toLowerCase().includes(tuKhoa);
  });

  // Không có sản phẩm
  if (danhSachLoc.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center;">
          Chưa có sản phẩm
        </td>
      </tr>
    `;

    return;
  }

  // Hiển thị từng sản phẩm
  danhSachLoc.forEach(function (sanPham) {
    const trangThai = sanPham.status === "active" ? "Đang bán" : "Ngừng bán";

    const mauTrangThai =
      sanPham.status === "active" ? "status-active" : "status-inactive";

    tbody.innerHTML += `
      <tr>

        <td>
          ${sanPham.id}
        </td>

        <td>
          ${sanPham.name}
        </td>

        <td>
          ${sanPham.category}
        </td>

        <td>
          ${Number(sanPham.price).toLocaleString("vi-VN")} đ
        </td>

        <td>
          <span class="${mauTrangThai}">
            ${trangThai}
          </span>
        </td>

        <td>

          <button
            class="btn-edit"
            onclick="suaSanPham(${sanPham.id})"
          >
            Sửa
          </button>

          <button
            class="btn-delete"
            onclick="xoaSanPham(${sanPham.id})"
          >
            Xóa
          </button>

        </td>

      </tr>
    `;
  });
}

// ========================================
// LƯU SẢN PHẨM
// ========================================

function luuSanPham() {
  const id = document.getElementById("productId").value;

  const ten = document.getElementById("productName").value.trim();

  const danhMuc = document.getElementById("category").value;

  const gia = document.getElementById("price").value;

  const trangThai = document.getElementById("status").value;

  const moTa = document.getElementById("description").value.trim();

  // ======================================
  // KIỂM TRA TÊN
  // ======================================

  if (ten === "") {
    alert("Vui lòng nhập tên sản phẩm!");

    document.getElementById("productName").focus();

    return;
  }

  // ======================================
  // KIỂM TRA GIÁ
  // ======================================

  if (gia === "" || Number(gia) < 0) {
    alert("Vui lòng nhập giá sản phẩm hợp lệ!");

    document.getElementById("price").focus();

    return;
  }

  // ======================================
  // TRƯỜNG HỢP SỬA
  // ======================================

  if (id !== "") {
    const viTri = danhSachSanPham.findIndex(function (sanPham) {
      return sanPham.id === Number(id);
    });

    if (viTri !== -1) {
      danhSachSanPham[viTri] = {
        id: Number(id),

        name: ten,

        category: danhMuc,

        price: Number(gia),

        status: trangThai,

        description: moTa,
      };

      // Lưu lại dữ liệu
      localStorage.setItem("sanPham", JSON.stringify(danhSachSanPham));

      alert("Cập nhật sản phẩm thành công!");

      lamMoiForm();

      hienThiSanPham();

      return;
    }
  }

  // ======================================
  // TRƯỜNG HỢP THÊM MỚI
  // ======================================

  let idMoi = 1;

  if (danhSachSanPham.length > 0) {
    const danhSachId = danhSachSanPham
      .map(function (sanPham) {
        return Number(sanPham.id);
      })
      .filter(function (id) {
        return !isNaN(id);
      });

    if (danhSachId.length > 0) {
      idMoi = Math.max(...danhSachId) + 1;
    }
  }

  const sanPhamMoi = {
    id: idMoi,

    name: ten,

    category: danhMuc,

    price: Number(gia),

    status: trangThai,

    description: moTa,
  };

  danhSachSanPham.push(sanPhamMoi);

  // Lưu vào LocalStorage dùng chung
  localStorage.setItem("sanPham", JSON.stringify(danhSachSanPham));

  alert("Thêm sản phẩm thành công!");

  // Xóa dữ liệu trong form
  lamMoiForm();

  // Cập nhật bảng
  hienThiSanPham();
}

// ========================================
// SỬA SẢN PHẨM
// ========================================

function suaSanPham(id) {
  const sanPham = danhSachSanPham.find(function (sp) {
    return sp.id === id;
  });

  if (!sanPham) {
    alert("Không tìm thấy sản phẩm!");

    return;
  }

  // Đưa dữ liệu lên form

  document.getElementById("productId").value = sanPham.id;

  document.getElementById("productName").value = sanPham.name;

  document.getElementById("category").value = sanPham.category;

  document.getElementById("price").value = sanPham.price;

  document.getElementById("status").value = sanPham.status;

  document.getElementById("description").value = sanPham.description;

  // Đổi tiêu đề form

  document.getElementById("tieuDeForm").innerText = "Sửa sản phẩm";

  // Cuộn lên đầu trang

  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
}

// ========================================
// XÓA SẢN PHẨM
// ========================================

function xoaSanPham(id) {
  const sanPham = danhSachSanPham.find(function (sp) {
    return sp.id === id;
  });

  if (!sanPham) {
    alert("Không tìm thấy sản phẩm!");

    return;
  }

  const xacNhan = confirm(
    `Bạn có chắc muốn xóa sản phẩm "${sanPham.name}" không?`,
  );

  if (!xacNhan) {
    return;
  }

  // Xóa sản phẩm

  danhSachSanPham = danhSachSanPham.filter(function (sp) {
    return sp.id !== id;
  });

  // Lưu lại LocalStorage

  localStorage.setItem("sanPham", JSON.stringify(danhSachSanPham));

  // Hiển thị lại

  hienThiSanPham();

  alert("Xóa sản phẩm thành công!");
}

// ========================================
// LÀM MỚI FORM
// ========================================

function lamMoiForm() {
  document.getElementById("productId").value = "";

  document.getElementById("productName").value = "";

  document.getElementById("category").value = "Ô tô";

  document.getElementById("price").value = "";

  document.getElementById("status").value = "active";

  document.getElementById("description").value = "";

  document.getElementById("tieuDeForm").innerText = "Thêm sản phẩm";
}

// ========================================
// TÌM KIẾM
// ========================================

const oTimKiem = document.getElementById("timKiem");

if (oTimKiem) {
  oTimKiem.addEventListener("input", function () {
    hienThiSanPham();
  });
}

// ========================================
// CHẠY KHI MỞ TRANG
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  hienThiSanPham();
});
