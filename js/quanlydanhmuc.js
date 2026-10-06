// ==========================================
// QUẢN LÝ DANH MỤC
// ==========================================

// Lấy dữ liệu danh mục từ LocalStorage
let danhMuc = JSON.parse(localStorage.getItem("danhMuc")) || [
  {
    id: 1,
    ten: "Ô tô",
    moTa: "Các loại ô tô",
  },
  {
    id: 2,
    ten: "Xe máy",
    moTa: "Các loại xe máy",
  },
  {
    id: 3,
    ten: "Xe đạp",
    moTa: "Các loại xe đạp",
  },
  {
    id: 4,
    ten: "Thuyền",
    moTa: "Các loại thuyền",
  },
];

// Nếu LocalStorage chưa có danh mục thì lưu dữ liệu mặc định
if (!localStorage.getItem("danhMuc")) {
  localStorage.setItem("danhMuc", JSON.stringify(danhMuc));
}

// ==========================================
// HIỂN THỊ DANH MỤC
// ==========================================

function hienThiDanhMuc(ds = danhMuc) {
  const tbody = document.getElementById("danhSachDanhMuc");

  if (!tbody) return;

  tbody.innerHTML = "";

  if (ds.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;">
          Không có danh mục nào.
        </td>
      </tr>
    `;
    return;
  }

  ds.forEach(function (item) {
    tbody.innerHTML += `
      <tr>
        <td>${item.id}</td>

        <td>${item.ten}</td>

        <td>${item.moTa || ""}</td>

        <td>
          <button
  class="btn-edit"
  onclick="suaDanhMuc(${item.id})"
>
  Sửa
</button>

<button
  onclick="xemChiTietDanhMuc(${item.id})"
>
  Chi tiết
</button>

<button
  class="btn-delete"
  onclick="xoaDanhMuc(${item.id})"
>
  Xóa
</button>
        </td>
      </tr>
    `;
  });
}

// ==========================================
// LƯU DANH MỤC
// ==========================================

function luuDanhMuc() {
  const id = document.getElementById("categoryId").value;
  const ten = document.getElementById("categoryName").value.trim();
  const moTa = document.getElementById("categoryDescription").value.trim();
  const thongBao = document.getElementById("thongBao");

  // Xóa thông báo cũ
  thongBao.textContent = "";
  thongBao.style.color = "";

  // Kiểm tra tên rỗng
  if (ten === "") {
    thongBao.textContent = "Vui lòng nhập tên danh mục!";
    thongBao.style.color = "red";
    document.getElementById("categoryName").focus();
    return;
  }

  // Kiểm tra tên quá dài
  if (ten.length > 100) {
    thongBao.textContent = "Tên danh mục không được vượt quá 100 ký tự!";
    thongBao.style.color = "red";
    document.getElementById("categoryName").focus();
    return;
  }

  // Kiểm tra mô tả quá dài
  if (moTa.length > 500) {
    thongBao.textContent = "Mô tả không được vượt quá 500 ký tự!";
    thongBao.style.color = "red";
    document.getElementById("categoryDescription").focus();
    return;
  }

  // Kiểm tra trùng tên danh mục
  const trungTen = danhMuc.some(function (item) {
    return (
      item.ten.toLowerCase() === ten.toLowerCase() &&
      item.id != id
    );
  });

  if (trungTen) {
    thongBao.textContent = "Tên danh mục đã tồn tại!";
    thongBao.style.color = "red";
    document.getElementById("categoryName").focus();
    return;
  }

  // TRƯỜNG HỢP SỬA
  if (id !== "") {
    const index = danhMuc.findIndex(function (item) {
      return item.id == id;
    });

    if (index !== -1) {
      danhMuc[index].ten = ten;
      danhMuc[index].moTa = moTa;
    }
  }

  // TRƯỜNG HỢP THÊM
  else {
    const idMoi =
      danhMuc.length > 0
        ? Math.max(...danhMuc.map((item) => Number(item.id))) + 1
        : 1;

    danhMuc.push({
      id: idMoi,
      ten: ten,
      moTa: moTa,
    });
  }

  // Lưu LocalStorage
  localStorage.setItem("danhMuc", JSON.stringify(danhMuc));

  // Hiển thị lại danh sách
  hienThiDanhMuc();

  // Xóa form
  lamMoi();

  // Thông báo thành công
  thongBao.textContent = "Lưu danh mục thành công!";
  thongBao.style.color = "green";
}
// ==========================================
// SỬA DANH MỤC
// ==========================================

function suaDanhMuc(id) {
  const item = danhMuc.find(function (item) {
    return item.id == id;
  });

  if (!item) {
    alert("Không tìm thấy danh mục!");
    return;
  }

  document.getElementById("categoryId").value = item.id;

  document.getElementById("categoryName").value = item.ten;

  document.getElementById("categoryDescription").value = item.moTa || "";

  // Cuộn lên đầu trang để chỉnh sửa
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ==========================================
// XÓA DANH MỤC
// ==========================================

function xoaDanhMuc(id) {
  const item = danhMuc.find(function (item) {
    return item.id == id;
  });

  if (!item) {
    alert("Không tìm thấy danh mục!");
    return;
  }

  // ==========================================
  // KIỂM TRA SẢN PHẨM ĐANG SỬ DỤNG DANH MỤC
  // ==========================================

  const sanPham = JSON.parse(localStorage.getItem("sanPham")) || [];

  const coSanPham = sanPham.some(function (sp) {
    return sp.category === item.ten;
  });

  if (coSanPham) {
    alert(
      `Không thể xóa danh mục "${item.ten}" vì đang có sản phẩm thuộc danh mục này!`,
    );
    return;
  }

  // Xác nhận xóa
  const xacNhan = confirm(`Bạn có chắc muốn xóa danh mục "${item.ten}" không?`);

  if (!xacNhan) {
    return;
  }

  // Xóa danh mục
  danhMuc = danhMuc.filter(function (item) {
    return item.id != id;
  });

  // Lưu LocalStorage
  localStorage.setItem("danhMuc", JSON.stringify(danhMuc));

  // Hiển thị lại
  function xemChiTietDanhMuc(id) {
  const item = danhMuc.find(function (item) {
    return item.id == id;
  });

  if (!item) {
    alert("Không tìm thấy danh mục!");
    return;
  }

  alert(
    "CHI TIẾT DANH MỤC\n\n" +
    "ID: " + item.id + "\n" +
    "Tên danh mục: " + item.ten + "\n" +
    "Mô tả: " + (item.moTa || "Chưa có mô tả")
  );
}
  hienThiDanhMuc();

  // Nếu đang sửa danh mục bị xóa
  if (document.getElementById("categoryId").value == id) {
    lamMoi();
  }

  alert("Xóa danh mục thành công!");
}

// ==========================================
// TÌM KIẾM DANH MỤC
// ==========================================

function timKiemDanhMuc() {
  const tuKhoa = document.getElementById("timKiem").value.toLowerCase().trim();

  const ketQua = danhMuc.filter(function (item) {
    return item.ten && item.ten.toLowerCase().includes(tuKhoa);
  });

  hienThiDanhMuc(ketQua);
}

// ==========================================
// LÀM MỚI FORM
// ==========================================

function lamMoi() {
  document.getElementById("categoryId").value = "";

  document.getElementById("categoryName").value = "";

  document.getElementById("categoryDescription").value = "";
}

// ==========================================
// CHẠY KHI MỞ TRANG
// ==========================================

hienThiDanhMuc();
