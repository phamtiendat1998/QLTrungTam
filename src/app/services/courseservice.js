import $ from 'jquery';
export function CourseService() {
    // LẤY DANH SÁCH KHÓA HỌC
    this.LayDanhSachKhoaHoc = function () {
        var url = 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc';
        return $.ajax({
            type: "GET",
            url: url,
        });
    };
    // CHI TIẾT KHÓA HỌC
    this.ChiTietKhoaHoc = function (id) {
        var url = `http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/${id}`;
        return $.ajax({
            type: "GET",
            url: url,
        });
    };
    // GHI DANH KHÓA HỌC
    this.GhiDanhKhoaHoc = function (makhoahoc, taikhoan) {
        var model = JSON.stringify({
            MaKhoaHoc: makhoahoc,
            TaiKhoan: taikhoan
        });
        var url = 'http://sv.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc';
        return $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            dataType: "json",
            data: model,
        });
    }
    // THÊM KHÓA HỌC
    this.ThemKhoaHoc = function (khoaHoc) {
        var urlAPI = 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc';
        return $.ajax({
            type: 'POST',
            dataType: 'json',
            url: urlAPI,
            data: khoaHoc
        });
    };
    // CẬP NHẬT KHÓA HỌC
    this.CapNhatKhoaHoc = function (khoaHoc) {
        var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatKhoaHoc";
        var jsonKhoaHoc = JSON.stringify(khoaHoc);
        return $.ajax({
            type: 'PUT',
            url: urlAPI,
            contentType: "application/json",
            dataType: 'json',
            data: jsonKhoaHoc
        });
    };
    // XÓA KHÓA HỌC
    this.XoaKhoaHoc = function (id) {
        var urlAPI = `http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/${id}`;
        return $.ajax({
            type: 'DELETE',
            url: urlAPI
        });
    };
}