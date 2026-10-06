let sanPhamHienTai = null;

document.addEventListener("DOMContentLoaded", function () {

    const khuVucChiTiet =
        document.getElementById("chiTietSanPham");

    if (!khuVucChiTiet) {
        console.error("Không tìm thấy #chiTietSanPham");
        return;
    }


    // ================================
    // LẤY ID SẢN PHẨM TRÊN URL
    // ================================

    const params =
        new URLSearchParams(window.location.search);

    const id = params.get("id");


    if (!id) {

        khuVucChiTiet.innerHTML = `
            <div class="product">

                <h2>Không có mã sản phẩm</h2>

                <p>
                    Vui lòng chọn sản phẩm từ trang sản phẩm.
                </p>

                <br>

                <a
                    href="sanpham.html"
                    class="product-button"
                >
                    ← Quay lại sản phẩm
                </a>

            </div>
        `;

        return;
    }


    // ================================
    // LẤY DANH SÁCH SẢN PHẨM
    // ================================

    let danhSachSanPham = [];

    try {

        danhSachSanPham =
            JSON.parse(
                localStorage.getItem("sanPham")
            ) || [];

    } catch (error) {

        console.error(
            "Lỗi đọc dữ liệu sản phẩm:",
            error
        );

        khuVucChiTiet.innerHTML = `
            <div class="product">

                <h2>Không thể đọc dữ liệu sản phẩm</h2>

                <p>
                    Dữ liệu sản phẩm không hợp lệ.
                </p>

            </div>
        `;

        return;
    }


    // ================================
    // TÌM SẢN PHẨM
    // ================================

    sanPhamHienTai =
        danhSachSanPham.find(function (sp) {

            return String(sp.id) === String(id);

        });


    if (!sanPhamHienTai) {

        khuVucChiTiet.innerHTML = `
            <div class="product">

                <h2>Không tìm thấy sản phẩm</h2>

                <p>
                    Mã sản phẩm:
                    <strong>${id}</strong>
                </p>

                <br>

                <a
                    href="sanpham.html"
                    class="product-button"
                >
                    ← Quay lại sản phẩm
                </a>

            </div>
        `;

        return;
    }


    // ================================
    // THÔNG TIN SẢN PHẨM
    // ================================

    const ten =
        sanPhamHienTai.name || "Chưa có tên";

    const danhMuc =
        sanPhamHienTai.category || "Chưa có danh mục";

    const gia =
        Number(sanPhamHienTai.price) || 0;

    const moTa =
        sanPhamHienTai.description ||
        "Chưa có mô tả.";

    const trangThai =
        sanPhamHienTai.status === "active"
            ? "Đang bán"
            : "Ngừng bán";


    // ================================
    // HIỂN THỊ CHI TIẾT
    // ================================

    khuVucChiTiet.innerHTML = `

        <div class="product">

            <h2>${ten}</h2>

            <p>
                <strong>Mã sản phẩm:</strong>
                ${sanPhamHienTai.id}
            </p>

            <p>
                <strong>Danh mục:</strong>
                ${danhMuc}
            </p>

            <p>

                <strong>Giá:</strong>

                <span
                    style="
                        font-size: 24px;
                        font-weight: bold;
                    "
                >
                    ${gia.toLocaleString("vi-VN")}
                    VNĐ
                </span>

            </p>

            <p>
                <strong>Trạng thái:</strong>
                ${trangThai}
            </p>


            <div>

                <h3>Mô tả sản phẩm</h3>

                <p>
                    ${moTa}
                </p>

            </div>


            <br>


            <div
                style="
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                "
            >

                <button
                    type="button"
                    onclick="themVaoGioHang()"
                >
                    🛒 Thêm vào giỏ hàng
                </button>


                <a
                    href="danhgia.html?id=${encodeURIComponent(sanPhamHienTai.id)}"
                    class="product-button"
                >
                    ⭐ Đánh giá sản phẩm
                </a>


                <a
                    href="sanpham.html"
                    class="product-button"
                >
                    ← Quay lại sản phẩm
                </a>

            </div>

        </div>

    `;
});


// =====================================================
// THÊM VÀO GIỎ HÀNG
// =====================================================

function themVaoGioHang() {

    if (!sanPhamHienTai) {

        alert("Không tìm thấy sản phẩm.");

        return;
    }


    if (sanPhamHienTai.status !== "active") {

        alert(
            "Sản phẩm này hiện đang ngừng bán."
        );

        return;
    }


    const nguoiDungDangNhap =
        JSON.parse(
            localStorage.getItem(
                "nguoiDungDangNhap"
            )
        ) || null;


    let keyGioHang = "gioHang";


    if (
        nguoiDungDangNhap &&
        nguoiDungDangNhap.vaiTro === "khachhang"
    ) {

        keyGioHang =
            "gioHang_" +
            nguoiDungDangNhap.id;
    }


    let gioHang = [];


    try {

        gioHang =
            JSON.parse(
                localStorage.getItem(
                    keyGioHang
                )
            ) || [];

    } catch (error) {

        console.error(
            "Lỗi đọc giỏ hàng:",
            error
        );

        gioHang = [];
    }


    const viTri =
        gioHang.findIndex(function (sp) {

            return String(sp.id) ===
                   String(sanPhamHienTai.id);

        });


    if (viTri !== -1) {

        const soLuongCu =
            Number(
                gioHang[viTri].quantity
            ) || 0;

        gioHang[viTri].quantity =
            soLuongCu + 1;

    } else {

        gioHang.push({

            id: sanPhamHienTai.id,

            name: sanPhamHienTai.name,

            category:
                sanPhamHienTai.category,

            price:
                Number(
                    sanPhamHienTai.price
                ) || 0,

            quantity: 1

        });
    }


    try {

        localStorage.setItem(
            keyGioHang,
            JSON.stringify(gioHang)
        );

    } catch (error) {

        console.error(
            "Lỗi lưu giỏ hàng:",
            error
        );

        alert(
            "Không thể lưu giỏ hàng."
        );

        return;
    }


    alert(
        "Đã thêm sản phẩm vào giỏ hàng!"
    );


    const xemGioHang =
        confirm(
            "Bạn có muốn xem giỏ hàng ngay không?"
        );


    if (xemGioHang) {

        window.location.href =
            "giohang.html";
    }
}
// =====================================================
// HIỂN THỊ ĐÁNH GIÁ TRÊN TRANG CHI TIẾT SẢN PHẨM
// =====================================================

function hienThiDanhGiaTrongChiTiet() {

    const params = new URLSearchParams(window.location.search);
    const sanPhamId = params.get("id");

    if (!sanPhamId) {
        return;
    }

    // Lấy danh sách đánh giá
    const danhSachDanhGia =
        JSON.parse(localStorage.getItem("danhSachDanhGia")) || [];

    // Chỉ lấy đánh giá của sản phẩm hiện tại
    const danhGiaSanPham =
        danhSachDanhGia.filter(function (danhGia) {

            return String(danhGia.sanPhamId) ===
                   String(sanPhamId);

        });


    // Tạo khu vực đánh giá
    const khuVucDanhGia =
        document.createElement("section");

    khuVucDanhGia.className = "danh-gia-chi-tiet";

    let noiDung = `
        <h2>⭐ Đánh giá của khách hàng</h2>
    `;


    // Nếu chưa có đánh giá
    if (danhGiaSanPham.length === 0) {

        noiDung += `
            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
        `;

    } else {

        // Hiển thị từng đánh giá
        danhGiaSanPham.forEach(function (danhGia) {

            let ngoiSao = "";

            for (let i = 1; i <= 5; i++) {

                if (i <= Number(danhGia.soSao)) {
                    ngoiSao += "⭐";
                } else {
                    ngoiSao += "☆";
                }

            }


            noiDung += `

                <div class="box-danh-gia">

                    <h3>
                        ${danhGia.tenKhachHang}
                    </h3>

                    <p>
                        ${ngoiSao}
                    </p>

                    <p>
                        ${danhGia.noiDung}
                    </p>

                    <small>
                        Ngày đánh giá:
                        ${danhGia.ngayDanhGia}
                    </small>

                </div>

            `;

        });

    }


    // Nút đi tới trang gửi đánh giá
    noiDung += `

        <a
            href="danhgia.html?id=${encodeURIComponent(sanPhamId)}"
            class="product-button"
        >
            ⭐ Viết đánh giá
        </a>

    `;


    khuVucDanhGia.innerHTML = noiDung;


    // Đưa khu vực đánh giá xuống cuối trang
    document.body.appendChild(khuVucDanhGia);
}


// Chạy khi trang tải xong
document.addEventListener(
    "DOMContentLoaded",
    hienThiDanhGiaTrongChiTiet
);