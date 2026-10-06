let danhSachYeuThich =
    JSON.parse(localStorage.getItem("yeuThich")) || [];

function hienThiYeuThich() {

    let khuVuc =
        document.getElementById("danhSachYeuThich");

    if (danhSachYeuThich.length === 0) {

        khuVuc.innerHTML =
            "<p>Bạn chưa có sản phẩm yêu thích.</p>";

        return;
    }

    khuVuc.innerHTML = "";

    danhSachYeuThich.forEach(function (sanPham, index) {

        khuVuc.innerHTML += `
            <div class="san-pham-yeu-thich">

                <h3>${sanPham.ten}</h3>

                <p>Giá: ${sanPham.gia}</p>

                <button onclick="xoaYeuThich(${index})">
                    Xóa khỏi yêu thích
                </button>

            </div>
        `;
    });
}


function xoaYeuThich(index) {

    danhSachYeuThich.splice(index, 1);

    localStorage.setItem(
        "yeuThich",
        JSON.stringify(danhSachYeuThich)
    );

    hienThiYeuThich();
}


hienThiYeuThich();