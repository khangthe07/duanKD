// ==========================================
// QUẢN LÝ NHÀ CUNG CẤP
// ==========================================

// Lấy dữ liệu từ LocalStorage
let danhSachNhaCungCap = JSON.parse(localStorage.getItem("nhaCungCap")) || [
  {
    id: 1,
    ten: "Toyota Việt Nam",
    soDienThoai: "02812345678",
    email: "contact@toyota.vn",
    diaChi: "TP Hồ Chí Minh",
    moTa: "Nhà cung cấp ô tô Toyota",
  },
  {
    id: 2,
    ten: "Honda Việt Nam",
    soDienThoai: "02823456789",
    email: "contact@honda.vn",
    diaChi: "TP Hồ Chí Minh",
    moTa: "Nhà cung cấp xe máy và ô tô Honda",
  },
  {
    id: 3,
    ten: "Yamaha Việt Nam",
    soDienThoai: "02834567890",
    email: "contact@yamaha.vn",
    diaChi: "Hà Nội",
    moTa: "Nhà cung cấp xe máy Yamaha",
  },
  {
    id: 4,
    ten: "Giant Việt Nam",
    soDienThoai: "02845678901",
    email: "contact@giant.vn",
    diaChi: "TP Hồ Chí Minh",
    moTa: "Nhà cung cấp xe đạp",
  },
  {
    id: 5,
    ten: "Nhà cung cấp thuyền ABC",
    soDienThoai: "02856789012",
    email: "contact@abc.vn",
    diaChi: "Đà Nẵng",
    moTa: "Nhà cung cấp các loại thuyền",
  },
];

// Nếu chưa có dữ liệu thì lưu dữ liệu mặc định
if (!localStorage.getItem("nhaCungCap")) {
  localStorage.setItem("nhaCungCap", JSON.stringify(danhSachNhaCungCap));
}

// ==========================================
// HIỂN THỊ NHÀ CUNG CẤP
// ==========================================

function hienThiNhaCungCap(ds = danhSachNhaCungCap) {
  const tbody = document.getElementById("danhSachNhaCungCap");

  if (!tbody) return;

  tbody.innerHTML = "";

  if (ds.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center;">
          Không có nhà cung cấp nào.
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
        <td>${item.soDienThoai}</td>
        <td>${item.email}</td>
        <td>${item.diaChi}</td>
        <td>${item.moTa || ""}</td>
        <td>
          <button
  class="btn-edit"
  onclick="suaNhaCungCap(${item.id})"
>
  Sửa
</button>

<button onclick="xemChiTietNhaCungCap(${item.id})">
  Chi tiết
</button>

<button
  class="btn-delete"
  onclick="xoaNhaCungCap(${item.id})"
>
  Xóa
</button>
        </td>
      </tr>
    `;
  });
}

// ==========================================
// LƯU NHÀ CUNG CẤP
// ==========================================

function luuNhaCungCap() {
  const id = document.getElementById("supplierId").value.trim();
  const ten = document.getElementById("supplierName").value.trim();
  const soDienThoai = document.getElementById("supplierPhone").value.trim();
  const email = document.getElementById("supplierEmail").value.trim();
  const diaChi = document.getElementById("supplierAddress").value.trim();
  const moTa = document.getElementById("supplierDescription").value.trim();
  const thongBao = document.getElementById("thongBaoNhaCungCap");

  // Xóa thông báo cũ
  thongBao.textContent = "";
  thongBao.style.color = "";

  // Kiểm tra tên
  if (ten === "") {
    thongBao.textContent = "Vui lòng nhập tên nhà cung cấp!";
    thongBao.style.color = "red";
    document.getElementById("supplierName").focus();
    return;
  }

  if (ten.length > 100) {
    thongBao.textContent =
      "Tên nhà cung cấp không được vượt quá 100 ký tự!";
    thongBao.style.color = "red";
    document.getElementById("supplierName").focus();
    return;
  }

  // Kiểm tra số điện thoại
  if (soDienThoai === "") {
    thongBao.textContent = "Vui lòng nhập số điện thoại!";
    thongBao.style.color = "red";
    document.getElementById("supplierPhone").focus();
    return;
  }

  const regexSoDienThoai = /^[0-9]{9,11}$/;

  if (!regexSoDienThoai.test(soDienThoai)) {
    thongBao.textContent =
      "Số điện thoại phải gồm từ 9 đến 11 chữ số!";
    thongBao.style.color = "red";
    document.getElementById("supplierPhone").focus();
    return;
  }

  // Kiểm tra email nếu có nhập
  if (email !== "") {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
      thongBao.textContent = "Email không hợp lệ!";
      thongBao.style.color = "red";
      document.getElementById("supplierEmail").focus();
      return;
    }
  }

  // Kiểm tra địa chỉ
  if (diaChi === "") {
    thongBao.textContent = "Vui lòng nhập địa chỉ!";
    thongBao.style.color = "red";
    document.getElementById("supplierAddress").focus();
    return;
  }

  // Kiểm tra trùng tên
  const trungTen = danhSachNhaCungCap.some(function (item) {
    return (
      item.ten.toLowerCase() === ten.toLowerCase() &&
      String(item.id) !== String(id)
    );
  });

  if (trungTen) {
    thongBao.textContent = "Tên nhà cung cấp đã tồn tại!";
    thongBao.style.color = "red";
    document.getElementById("supplierName").focus();
    return;
  }

  // TRƯỜNG HỢP SỬA
  if (id !== "") {
    const index = danhSachNhaCungCap.findIndex(function (item) {
      return String(item.id) === String(id);
    });

    if (index === -1) {
      thongBao.textContent =
        "Không tìm thấy nhà cung cấp cần sửa!";
      thongBao.style.color = "red";
      return;
    }

    danhSachNhaCungCap[index].ten = ten;
    danhSachNhaCungCap[index].soDienThoai = soDienThoai;
    danhSachNhaCungCap[index].email = email;
    danhSachNhaCungCap[index].diaChi = diaChi;
    danhSachNhaCungCap[index].moTa = moTa;

    localStorage.setItem(
      "nhaCungCap",
      JSON.stringify(danhSachNhaCungCap)
    );

    hienThiNhaCungCap();
    lamMoiNhaCungCap();

    thongBao.textContent =
      "Cập nhật nhà cung cấp thành công!";
    thongBao.style.color = "green";

    return;
  }

  // TRƯỜNG HỢP THÊM
  const idMoi =
    danhSachNhaCungCap.length > 0
      ? Math.max(
          ...danhSachNhaCungCap.map(function (item) {
            return Number(item.id);
          })
        ) + 1
      : 1;

  danhSachNhaCungCap.push({
    id: idMoi,
    ten: ten,
    soDienThoai: soDienThoai,
    email: email,
    diaChi: diaChi,
    moTa: moTa,
  });

  localStorage.setItem(
    "nhaCungCap",
    JSON.stringify(danhSachNhaCungCap)
  );

  hienThiNhaCungCap();
  lamMoiNhaCungCap();

  thongBao.textContent =
    "Thêm nhà cung cấp thành công!";
  thongBao.style.color = "green";
}
// ==========================================
// SỬA NHÀ CUNG CẤP
// ==========================================

function suaNhaCungCap(id) {
  const item = danhSachNhaCungCap.find(function (item) {
    return String(item.id) === String(id);
  });

  if (!item) {
    alert("Không tìm thấy nhà cung cấp!");
    return;
  }

  document.getElementById("supplierId").value = item.id;
  document.getElementById("supplierName").value = item.ten;
  document.getElementById("supplierPhone").value = item.soDienThoai;
  document.getElementById("supplierEmail").value = item.email;
  document.getElementById("supplierAddress").value = item.diaChi;
  document.getElementById("supplierDescription").value = item.moTa || "";

  // Cuộn lên đầu trang
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ==========================================
// XÓA NHÀ CUNG CẤP
// ==========================================

function xoaNhaCungCap(id) {
  const item = danhSachNhaCungCap.find(function (item) {
    return String(item.id) === String(id);
  });

  if (!item) {
    alert("Không tìm thấy nhà cung cấp!");
    return;
  }

  const xacNhan = confirm(
    `Bạn có chắc muốn xóa nhà cung cấp "${item.ten}" không?`,
  );

  if (!xacNhan) {
    return;
  }

  danhSachNhaCungCap = danhSachNhaCungCap.filter(function (item) {
    return String(item.id) !== String(id);
  });

  localStorage.setItem("nhaCungCap", JSON.stringify(danhSachNhaCungCap));

  hienThiNhaCungCap();

  // Nếu đang sửa nhà cung cấp vừa xóa
  const supplierId = document.getElementById("supplierId").value;

  if (String(supplierId) === String(id)) {
    lamMoiNhaCungCap();
  }

  alert("Xóa nhà cung cấp thành công!");
}

// ==========================================
// TÌM KIẾM NHÀ CUNG CẤP
// ==========================================

function timKiemNhaCungCap() {
  const input = document.getElementById("timKiemNhaCungCap");

  if (!input) return;

  const tuKhoa = input.value.toLowerCase().trim();

  const ketQua = danhSachNhaCungCap.filter(function (item) {
    return (
      item.ten.toLowerCase().includes(tuKhoa) ||
      item.soDienThoai.toLowerCase().includes(tuKhoa) ||
      item.email.toLowerCase().includes(tuKhoa) ||
      item.diaChi.toLowerCase().includes(tuKhoa)
    );
  });

  hienThiNhaCungCap(ketQua);
}

// ==========================================
// LÀM MỚI FORM
// ==========================================

function lamMoiNhaCungCap() {
  document.getElementById("supplierId").value = "";
  document.getElementById("supplierName").value = "";
  document.getElementById("supplierPhone").value = "";
  document.getElementById("supplierEmail").value = "";
  document.getElementById("supplierAddress").value = "";
  document.getElementById("supplierDescription").value = "";
}

// ==========================================
// XEM CHI TIẾT NHÀ CUNG CẤP
// ==========================================

function xemChiTietNhaCungCap(id) {
  const item = danhSachNhaCungCap.find(function (item) {
    return String(item.id) === String(id);
  });

  if (!item) {
    alert("Không tìm thấy nhà cung cấp!");
    return;
  }

  alert(
    "CHI TIẾT NHÀ CUNG CẤP\n\n" +
    "ID: " + item.id + "\n" +
    "Tên: " + item.ten + "\n" +
    "Số điện thoại: " + item.soDienThoai + "\n" +
    "Email: " + (item.email || "Chưa có") + "\n" +
    "Địa chỉ: " + (item.diaChi || "Chưa có") + "\n" +
    "Mô tả: " + (item.moTa || "Chưa có")
  );
}

// ==========================================
// CHẠY KHI MỞ TRANG
// ==========================================

hienThiNhaCungCap();