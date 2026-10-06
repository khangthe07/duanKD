let nguoiDungDangNhap =
JSON.parse(localStorage.getItem("nguoiDungDangNhap")) || null;

document.addEventListener("DOMContentLoaded", function () {


if (!nguoiDungDangNhap) {
    alert("Bạn cần đăng nhập để xem thông tin tài khoản.");
    window.location.href = "dangnhap.html";
    return;
}

document.getElementById("hoTen").value =
    nguoiDungDangNhap.hoTen || "";

document.getElementById("tenDangNhap").value =
    nguoiDungDangNhap.tenDangNhap || "";

document.getElementById("email").value =
    nguoiDungDangNhap.email || "";

document.getElementById("soDienThoai").value =
    nguoiDungDangNhap.soDienThoai || "";


});

function luuThongTin() {

const oHoTen =
    document.getElementById("hoTen");

const oEmail =
    document.getElementById("email");

const oSoDienThoai =
    document.getElementById("soDienThoai");

const thongBao =
    document.getElementById("thongBao");

const hoTen =
    oHoTen.value.trim();

const email =
    oEmail.value.trim();

const soDienThoai =
    oSoDienThoai.value.trim();


if (hoTen === "") {
    alert("Vui lòng nhập họ và tên.");
    oHoTen.focus();
    return;
}

if (email === "") {
    alert("Vui lòng nhập email.");
    oEmail.focus();
    return;
}

if (soDienThoai === "") {
    alert("Vui lòng nhập số điện thoại.");
    oSoDienThoai.focus();
    return;
}


// Cập nhật tài khoản đang đăng nhập

nguoiDungDangNhap.hoTen = hoTen;
nguoiDungDangNhap.email = email;
nguoiDungDangNhap.soDienThoai = soDienThoai;


localStorage.setItem(
    "nguoiDungDangNhap",
    JSON.stringify(nguoiDungDangNhap)
);


// Cập nhật tài khoản trong danh sách tài khoản

let danhSachTaiKhoan =
    JSON.parse(localStorage.getItem("taiKhoan")) || [];


const viTri =
    danhSachTaiKhoan.findIndex(function (taiKhoan) {

        return String(taiKhoan.id) ===
               String(nguoiDungDangNhap.id);

    });


if (viTri !== -1) {

    danhSachTaiKhoan[viTri].hoTen =
        hoTen;

    danhSachTaiKhoan[viTri].email =
        email;

    danhSachTaiKhoan[viTri].soDienThoai =
        soDienThoai;


    localStorage.setItem(
        "taiKhoan",
        JSON.stringify(danhSachTaiKhoan)
    );
}


thongBao.textContent =
    "Đã cập nhật thông tin tài khoản thành công.";

thongBao.style.color = "green";
thongBao.style.fontWeight = "bold";


}

function dangXuat() {


const xacNhan =
    confirm("Bạn có chắc muốn đăng xuất không?");


if (!xacNhan) {
    return;
}

 
localStorage.removeItem(
    "nguoiDungDangNhap"
);


alert("Đã đăng xuất.");

window.location.href =
    "dangnhap.html";


}
