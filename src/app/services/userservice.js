import $ from 'jquery';
export function UserSerVice() {
    // LẤY DANH SÁCH HỌC VIÊN
    this.LayThongTinHocVien = function () {
        var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachHocvien";
        return $.ajax({
            type: 'GET',
            dataType: 'json',
            url: urlAPI
        });
    };
    // LẤY THÔNG TIN GIÁO VỤ
    this.LayThongTinGiaoVu = function () {
        var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung";
        return $.ajax({
            type: 'GET',
            dataType: 'json',
            url: urlAPI
        });
    };
    // LẤY DANH SÁCH NGƯỜI DÙNG
    this.LayDanhSachNguoiDung = function () {
        var urlUserList = 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung';
        return $.ajax({
            type: "GET",
            url: urlUserList,
        });
    };
    // ĐĂNG NHẬP
    this.DangNhap = function (taikhoan, matkhau) {
        var urlDangNhap = `http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=${taikhoan}&matkhau=${matkhau}`;
        return $.ajax({
            type: "GET",
            url: urlDangNhap,
        });
    };
    // Đăng Kí
    this.DangKi = function (user) {
        var urlDangKi = 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung';
        return $.ajax({
            type: "POST",
            url: urlDangKi,
            datatype: "json",
            data: user,
        });
    };
    // CẬP NHẬT THÔNG TIN NGƯỜI DÙNG
    this.CapNhatThongTinNguoiDung = function (tk, mk, ht, email, sodt, mluser) {
        var urlCapNhatUser = 'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung';
        var capnhatuser = JSON.stringify({
            TaiKhoan: tk,
            MatKhau: mk,
            HoTen: ht,
            Email: email,
            SoDT: sodt,
            MaLoaiNguoiDung: mluser
        });
        return $.ajax({
            type: "PUT",
            url: urlCapNhatUser,
            contentType: "application/json",
            datatype: "json",
            data: capnhatuser,
        });
    };
    // LẤY DANH SÁCH KHÓA HỌC NGƯỜI DÙNG ĐÃ GHI DANH
    this.LayDanhSachKhoaHocCuaUser = function (taikhoan) {
        var urlCourseUser = `http://sv.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc?taikhoan=${taikhoan}`;
        return $.ajax({
            type: "GET",
            url: urlCourseUser,
        });
    };
    // XÓA NGƯỜI DÙNG
    this.XoaNguoiDung = function (id) {
        var urlAPI = `http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`;
        return $.ajax({
            type: 'DELETE',
            url: urlAPI
        });
    };

}