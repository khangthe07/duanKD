// =====================================================
// QUẢN LÝ KHO
// =====================================================

// =====================================================
// LẤY SẢN PHẨM
// =====================================================

let sanPham = JSON.parse(localStorage.getItem("sanPham")) || [];

// =====================================================
// LẤY TỒN KHO
// =====================================================

let tonKho = JSON.parse(localStorage.getItem("tonKho")) || {};

// =====================================================
// KHỞI TẠO TỒN KHO
// =====================================================

function khoiTaoTonKho() {
  let coThayDoi = false;

  sanPham.forEach(function (sp) {
    const id = String(sp.id);

    // Nếu sản phẩm chưa có tồn kho
    if (tonKho[id] === undefined) {
      tonKho[id] = 10;

      coThayDoi = true;
    }
  });

  if (coThayDoi) {
    localStorage.setItem("tonKho", JSON.stringify(tonKho));
  }
}

// Chạy khởi tạo
khoiTaoTonKho();

// =====================================================
// LẤY HTML
// =====================================================

const bangKho = document.getElementById("bangKho");

const thongKeKho = document.getElementById("thongKeKho");

// =====================================================
// LƯU KHO
// =====================================================

function luuTonKho() {
  localStorage.setItem("tonKho", JSON.stringify(tonKho));
}

// =====================================================
// NHẬP THÊM HÀNG
// =====================================================

function nhapThemHang(id) {
  const soLuong = prompt("Nhập số lượng muốn thêm:");

  if (soLuong === null) {
    return;
  }

  const soLuongThem = Number(soLuong);

  if (!Number.isInteger(soLuongThem) || soLuongThem <= 0) {
    alert("Số lượng phải là số nguyên lớn hơn 0.");

    return;
  }

  const idString = String(id);

  if (tonKho[idString] === undefined) {
    tonKho[idString] = 0;
  }

  tonKho[idString] += soLuongThem;

  luuTonKho();

  hienThiKho();

  alert("Đã nhập thêm " + soLuongThem + " sản phẩm.");
}

// =====================================================
// HIỂN THỊ KHO
// =====================================================

function hienThiKho() {
  bangKho.innerHTML = "";

  let tongSanPham = 0;

  let tongTonKho = 0;

  sanPham.forEach(function (sp) {
    const id = String(sp.id);

    const soLuong = Number(tonKho[id] || 0);

    tongSanPham++;

    tongTonKho += soLuong;

    let trangThai = "";

    let mau = "";

    if (sp.status !== "active") {
      trangThai = "Ngừng bán";

      mau = "#c0392b";
    } else if (soLuong === 0) {
      trangThai = "Hết hàng";

      mau = "#c0392b";
    } else if (soLuong <= 5) {
      trangThai = "Sắp hết";

      mau = "#f39c12";
    } else {
      trangThai = "Còn hàng";

      mau = "#27ae60";
    }

    bangKho.innerHTML += `

            <tr>

                <td
                    style="
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: center;
                    "
                >
                    ${sp.id}
                </td>


                <td
                    style="
                        border: 1px solid #ddd;
                        padding: 12px;
                    "
                >
                    <strong>
                        ${sp.name}
                    </strong>
                </td>


                <td
                    style="
                        border: 1px solid #ddd;
                        padding: 12px;
                    "
                >
                    ${sp.category}
                </td>


                <td
                    style="
                        border: 1px solid #ddd;
                        padding: 12px;
                    "
                >
                    ${Number(sp.price).toLocaleString("vi-VN")}
                    VNĐ
                </td>


                <td
                    style="
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: center;
                        font-weight: bold;
                        font-size: 18px;
                    "
                >
                    ${soLuong}
                </td>


                <td
                    style="
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: center;
                        color: ${mau};
                        font-weight: bold;
                    "
                >
                    ${trangThai}
                </td>


                <td
                    style="
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: center;
                    "
                >

                    <button
                        onclick="
                            nhapThemHang(
                                '${id}'
                            )
                        "
                        style="
                            padding: 8px 14px;
                            background: #27ae60;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        "
                    >
                        + Nhập hàng
                    </button>

                </td>

            </tr>

        `;
  });

  thongKeKho.textContent =
    "Có " + tongSanPham + " sản phẩm | Tổng số lượng tồn kho: " + tongTonKho;
}

// =====================================================
// HIỂN THỊ BAN ĐẦU
// =====================================================

hienThiKho();
