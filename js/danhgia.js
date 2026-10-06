// =====================================================
// ĐÁNH GIÁ SẢN PHẨM - THÀNH VIÊN 2
// =====================================================

// Lấy danh sách đánh giá đã lưu
let danhSachDanhGia =
    JSON.parse(localStorage.getItem("danhSachDanhGia")) || [];


// =====================================================
// LẤY SẢN PHẨM ĐANG ĐƯỢC ĐÁNH GIÁ
// =====================================================

const params = new URLSearchParams(window.location.search);
const sanPhamId = params.get("id");


// =====================================================
// LẤY THÔNG TIN NGƯỜI ĐANG ĐĂNG NHẬP
// =====================================================

const nguoiDungDangNhap =
    JSON.parse(localStorage.getItem("nguoiDungDangNhap")) || null;


// =====================================================
// KHI TRANG ĐƯỢC MỞ
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // Nếu đã đăng nhập thì tự điền tên khách hàng
    if (nguoiDungDangNhap) {

        const oTenKhachHang =
            document.getElementById("tenKhachHang");

        if (oTenKhachHang) {
            oTenKhachHang.value =
                nguoiDungDangNhap.hoTen ||
                nguoiDungDangNhap.tenDangNhap ||
                "";
        }
    }

    hienThiDanhGia();
});


// =====================================================
// GỬI ĐÁNH GIÁ
// =====================================================

function guiDanhGia() {

    const oTenKhachHang =
        document.getElementById("tenKhachHang");

    const oSoSao =
        document.getElementById("soSao");

    const oNoiDung =
        document.getElementById("noiDung");


    const tenKhachHang = oTenKhachHang.value.trim();
    const soSao = Number(oSoSao.value);
    const noiDung = oNoiDung.value.trim();


    // Kiểm tra tên
    if (tenKhachHang === "") {
        alert("Vui lòng nhập tên khách hàng.");
        oTenKhachHang.focus();
        return;
    }


    // Kiểm tra nội dung
    if (noiDung === "") {
        alert("Vui lòng nhập nội dung đánh giá.");
        oNoiDung.focus();
        return;
    }


    // Tạo đánh giá mới
    const danhGiaMoi = {

        id: Date.now(),

        sanPhamId: sanPhamId || "",

        taiKhoanId:
            nguoiDungDangNhap
                ? nguoiDungDangNhap.id
                : "",

        tenKhachHang: tenKhachHang,

        soSao: soSao,

        noiDung: noiDung,

        ngayDanhGia:
            new Date().toLocaleDateString("vi-VN")
    };


    // Thêm vào danh sách
    danhSachDanhGia.push(danhGiaMoi);


    // Lưu vào localStorage
    localStorage.setItem(
        "danhSachDanhGia",
        JSON.stringify(danhSachDanhGia)
    );


    // Thông báo
    alert("Đánh giá sản phẩm thành công!");


    // Xóa nội dung đánh giá
    oNoiDung.value = "";


    // Hiển thị lại danh sách
    hienThiDanhGia();
}


// =====================================================
// HIỂN THỊ DANH SÁCH ĐÁNH GIÁ
// =====================================================

function hienThiDanhGia() {

    const khuVuc =
        document.getElementById("danhSachDanhGia");


    // Không tìm thấy khu vực hiển thị
    if (!khuVuc) {
        return;
    }


    // Nếu trang có mã sản phẩm
    // thì chỉ hiển thị đánh giá của sản phẩm đó

    let danhSachHienThi = danhSachDanhGia;


    if (sanPhamId) {

        danhSachHienThi =
            danhSachDanhGia.filter(function (danhGia) {

                return String(danhGia.sanPhamId) ===
                       String(sanPhamId);

            });
    }


    // Không có đánh giá
    if (danhSachHienThi.length === 0) {

        khuVuc.innerHTML = `
            <p class="empty">
                Chưa có đánh giá nào.
            </p>
        `;

        return;
    }


    // Xóa nội dung cũ
    khuVuc.innerHTML = "";


    // Hiển thị từng đánh giá
    danhSachHienThi.forEach(function (danhGia) {

        let ngoiSao = "";

        for (let i = 1; i <= 5; i++) {

            if (i <= danhGia.soSao) {
                ngoiSao += "⭐";
            } else {
                ngoiSao += "☆";
            }
        }


        khuVuc.innerHTML += `

            <div class="box">

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