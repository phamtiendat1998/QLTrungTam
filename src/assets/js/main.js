import $ from 'jquery';
// CSS
import '../css/animate.css';
// JS 
import './user/preload';
import './user/scrolltotop';
// Alert
import swal from 'sweetalert2';
import '../../../node_modules/sweetalert2/dist/sweetalert2.min.css';
// SCSS
import './../sass/main.scss';

// ----------------------------Import-------------------------------------
// ---- LocalStorage-----
import './../../app/controlers/localStorage';
import {
    CheckExistLocal
} from './../../app/controlers/localStorage';
import {
    getDataFromLocal
} from './../../app/controlers/localStorage';
import {
    SaveLocalStorage
} from './../../app/controlers/localStorage';
import {
    delDataFromLocal
} from './../../app/controlers/localStorage';
// UserService
import {
    UserSerVice
} from '../../app/services/userservice';
var userSV = new UserSerVice();
// CourseService
import {
    CourseService
} from '../../app/services/courseservice';
var courseSV = new CourseService();
// User
import {
    User
} from '../../app/models/user';
// Course
import {
    Course
}
from '../../app/models/course';
// User List
import {
    UserList
} from '../../app/models/userlist';
// Course List
import {
    CourseList
} from '../../app/models/courselist';
// --------------------------------End Import---------------------------------------
var userList = new UserList();
var userHocVienList = new UserList();
var courseList = new CourseList();
// --------------------------------Lấy Danh Sách----------------------------------
// Người dùng:
function LayUserList() {
    userSV.LayDanhSachNguoiDung()
        .done(function (result) {
            SaveLocalStorage(result, 'LocalUserList');
            taoPhanTrangUser(result);
        })
        .fail(function (error) {
            console.log(error);
        });
}
// Khóa Học
function LayCourseList() {
    courseSV.LayDanhSachKhoaHoc()
        .done(function (result) {
            SaveLocalStorage(result, 'LocalCourseList');
            taoPhanTrangKH(result);
        })
        .fail(function (error) {
            console.log(error);
        });
}
// --------------------------------Validation----------------------------------
// Thông Báo 
var contentThongBao = {
    tbTaiKhoan: "Vui lòng nhập tài khoản",
    tbValTaiKhoan: "Tài khoản đã được sử dụng",
    tbMatKhau: "Vui lòng nhập mật khẩu",
    tbValMatKhauCu: "Mật khẩu không chính xác",
    tbMatKhauMoi: "Vui lòng nhập mật khẩu mới",
    tbValMatKhauMoi: "Vui lòng nhập lại chính xác mật khẩu mới",
    tbHoTen: "Vui lòng nhập họ và tên",
    tbEmail: "Vui Lòng nhập email",
    tbValEmail: "Vui lòng nhập đúng email",
    tbSoDT: "Vui lòng nhập số điện thoại",
    tbValSoDT: "Vui lòng nhập đúng số điện thoại",
    tbLength: "Vui lòng nhập kí tự từ khoảng 3 đến 10",
};
// Reset Đăng Nhập
function resetDN() {
    $('#taikhoanDN').val("");
    $('#matkhauDN').val("");
}

function resetDK() {
    $('#taikhoanDK').val("");
    $('#matkhauDK').val("");
    $('#hotenDK').val("");
    $('#emailDK').val("");
    $('#sodtDK').val("");
}
// Reset Đổi Mật Khẩu
function resetDoiMatKhau() {
    $('#matkhauInfoCu').val("");
    $('#matkhauInfoMoi').val("");
    $('#matkhauInfoMoiRe').val("");
}
// --- Validation Đăng Nhập ----
function ktTaiKhoanDN(tkValue) {
    if (tkValue == "") {
        $('#tbTaiKhoanDN').css({
            'color': 'red',
            'margin-top': '-12px'
        }).html(contentThongBao.tbTaiKhoan).addClass('animated bounceIn');
    } else {
        $('#tbTaiKhoanDN').html('').removeClass('animated bounceIn');
    }
}

function ktMatKhauDN(mkValue) {
    if (mkValue == "") {
        $('#tbMatKhauDN').css({
            'color': 'red',
            'margin-top': '-12px'
        }).html(contentThongBao.tbTaiKhoan).addClass('animated bounceIn');

    } else {
        $('#tbMatKhauDN').html('').removeClass('animated bounceIn');
    }
}
// --- Validation Đăng Kí ----
function ktTaiKhoanDK(tkValue) {
    if (tkValue == "") {
        $('#tbTaiKhoanDK').css({
            'color': 'red',
            'margin-top': '-12px'
        }).html(contentThongBao.tbTaiKhoan).addClass('animated bounceIn');
    } else {
        $('#tbTaiKhoanDK').html('').removeClass('animated bounceIn');
    }
}

function ktMatKhauDK(matkhauValue) {
    if (matkhauValue == "") {
        $('#tbMatKhauDK').css({
            'color': 'red',
            'margin-top': '-12px'
        }).html(contentThongBao.tbMatKhau).addClass('animated bounceIn');
        return false;
    } else {
        $('#tbMatKhauDK').html('').removeClass('animated bounceIn');
        return true;
    }
}

function ktHoTenDK(hotenValue) {
    if (hotenValue == "") {
        $('#tbHoTenDK').css({
            'color': 'red',
            'margin-top': '-12px'
        }).html(contentThongBao.tbHoTen).addClass('animated bounceIn');
        return false;
    } else {
        $('#tbHoTenDK').html('').removeClass('animated bounceIn');
        return true;
    }
}

function ktEmailDK(emailValue) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (emailValue == "") {
        $('#tbEmailDK').css({
            'color': 'red',
            'margin-top': '-12px'
        }).html(contentThongBao.tbEmail).addClass('animated bounceIn');
    } else if (!filter.test(emailValue)) {
        $('#tbEmailDK').css({
            'color': 'red',
            'margin-top': '-12px'
        }).html(contentThongBao.tbValEmail).addClass('animated bounceIn');
    } else {
        $('#tbEmailDK').html('').removeClass('animated bounceIn');
    }
}

function ktSoDTDK(sodtValue) {
    var filter = /^[0-9-+]+$/;
    if (sodtValue == "") {
        $('#tbSoDTDK').css({
            'color': 'red',
            'margin-top': '-12px'
        }).html(contentThongBao.tbSoDT).addClass('animated bounceIn');
    } else if (!filter.test(sodtValue)) {
        $('#tbSoDTDK').css({
            'color': 'red',
            'margin-top': '-12px'
        }).html(contentThongBao.tbValSoDT).addClass('animated bounceIn');
    } else {
        $('#tbSoDTDK').html('').removeClass('animated bounceIn');
    }
}
// --- Valdation Edit Thông tin -----
function ktHoTenEdit(hotenValue) {
    if (hotenValue == "") {
        $('#editHoTenForm').addClass('has-danger');
        $('#tbEditHoTen').html(contentThongBao.tbHoTen).addClass('animated bounceIn');
    } else {
        $('#editHoTenForm').removeClass('has-danger');
        $('#tbEditHoTen').html('').removeClass('animated bounceIn');
    }
}

function ktEmailEdit(emailValue) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (emailValue == "") {
        $('#editEmailForm').addClass('has-danger');
        $('#tbEditEmail').html(contentThongBao.tbEmail).addClass('animated bounceIn');
    } else if (!filter.test(emailValue)) {
        $('#editEmailForm').addClass('has-danger');
        $('#tbEditEmail').html(contentThongBao.tbValEmail).addClass('animated bounceIn');
    } else {
        $('#editEmailForm').removeClass('has-danger');
        $('#tbEditEmail').html('').removeClass('animated bounceIn');
    }
}

function ktSoDTEdit(sodtValue) {
    var filter = /^[0-9-+]+$/;
    if (sodtValue == "") {
        $('#editSoDTForm').addClass('has-danger');
        $('#tbEditSoDT').html(contentThongBao.tbSoDT).addClass('animated bounceIn');
    } else if (!filter.test(sodtValue)) {
        $('#editSoDTForm').addClass('has-danger');
        $('#tbEditSoDT').html(contentThongBao.tbValSoDT).addClass('animated bounceIn');
    } else {
        $('#editSoDTForm').removeClass('has-danger');
        $('#tbEditSoDT').html('').removeClass('animated bounceIn');
    }
}

// ---- Validation Đổi Mật Khẩu----
function ktMatKhauCu() {
    var matkhauCu = getDataFromLocal('MatKhauUser');
    var matkhauInfoCu = $('#matkhauInfoCu').val();
    if (matkhauInfoCu == "") {
        $('#editMatKhauCuForm').addClass('has-danger');
        $('#tbEditMatKhauCu').html(contentThongBao.tbMatKhau).addClass('animated bounceIn');
        return false;
    } else if (matkhauCu !== matkhauInfoCu) {
        $('#editMatKhauCuForm').addClass('has-danger');
        $('#tbEditMatKhauCu').html(contentThongBao.tbValMatKhauCu).addClass('animated bounceIn');
        return false;
    } else {
        $('#editMatKhauCuForm').removeClass('has-danger');
        $('#tbEditMatKhauCu').html('').removeClass('animated bounceIn');
        return true;
    }
}

function ktMatKhauMoi() {
    var matkhauInfoMoi = $('#matkhauInfoMoi').val();
    var matkhauInfoMoiRe = $('#matkhauInfoMoiRe').val();
    if (matkhauInfoMoi == "") {
        $('#editMatKhauMoiForm').addClass('has-danger');
        $('#tbEditMatKhauMoi').html(contentThongBao.tbMatKhauMoi).addClass('animated bounceIn');
        return false;
    } else if (matkhauInfoMoiRe == "") {
        $('#editMatKhauMoiFormRe').addClass('has-danger');
        $('#tbEditMatKhauMoiRe').html(contentThongBao.tbMatKhauMoi).addClass('animated bounceIn');
        return false;
    } else if (matkhauInfoMoi !== matkhauInfoMoiRe) {
        $('#editMatKhauMoiFormRe').addClass('has-danger');
        $('#tbEditMatKhauMoiRe').html(contentThongBao.tbValMatKhauMoi).addClass('animated bounceIn');
        return false;
    } else {
        $('#editMatKhauMoiForm').removeClass('has-danger');
        $('#tbEditMatKhauMoi').html('').removeClass('animated bounceIn');
        $('#editMatKhauMoiFormRe').removeClass('has-danger');
        $('#tbEditMatKhauMoiRe').html('').removeClass('animated bounceIn');
        return true;
    }
}
// Validation Của Admin--------------
//  Validation Người Dùng
var mangThongBaoDSND = [
    "Vui Lòng Nhập vào Tài Khoản người dùng !",
    "Vui lòng nhập Mật Khẩu của người dùng!",
    "Vui lòng nhập Họ Tên của người dùng !",
    "Vui lòng nhập Email của người dùng !",
    "Vui lòng nhập số điện thoại của người dùng !",
    "Vui lòng chọn loại người dùng !",
    "Vui lòng nhập kí tự từ khoảng 3 đến 10 !",
    "Vui lòng nhập đúng định dạng email !",
    "Vui lòng nhập số"
]
var minlengthND = 3;
var maxlengthKH = 15;

function getMyEle(ele) {
    return document.getElementById(ele);
}

function KiemTraNhapTaiKhoan() {
    var taiKhoan = getMyEle('TaiKhoan').value;
    var ThongBao = getMyEle('tbTaiKhoan');
    var ketqua = false;
    if (taiKhoan === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[0];
    } else if (taiKhoan.length < minlengthND || taiKhoan.length > maxlengthKH) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[6];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;

}

function KiemTraNhapMatKhau() {
    var matKhau = getMyEle('MatKhau').value;
    var ThongBao = getMyEle('tbMatKhau');
    var ketqua = false;
    if (matKhau === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[1];
    } else if (matKhau.length < minlengthND || matKhau.length > maxlengthKH) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[6];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;
}

function KiemTraNhapHoTen() {
    var hoTen = getMyEle('HoTen').value;
    var ThongBao = getMyEle('tbHoTen');
    var ketqua = false;
    if (hoTen === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[2];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;

}

function KiemTraNhapEmail() {
    var chkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = getMyEle('Email').value;
    var ThongBao = getMyEle('tbEmail');
    var ketqua = false;
    if (email === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[3];

    } else if (email.match(chkEmail)) {
        ThongBao.style.display = "none";
        ketqua = true;
    } else {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[7];
    }
    return ketqua;

}

function KiemTraLoaiNguoiDung() {
    var giaTri = getMyEle('MaLoaiNguoiDung');
    var tag = getMyEle('tbMaLoaiNguoiDung');
    if (giaTri.selectedIndex === -1) {
        tag.style.display = "block";
        tag.innerHTML = mangThongBaoDSND[5];
        return false;

    } else {
        tag.style.display = "none";
        return true;
    }
}

function KiemTraSoDienThoai() {
    var kitu = /^[0-9-+]+$/;
    var sdt = getMyEle('SoDT').value;
    var ThongBao = getMyEle('tbSoDT');
    var ketqua = false;
    if (sdt === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[4];
    } else if (!(kitu.test(sdt))) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[8];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;

}
$('body').delegate("#TaiKhoan", "blur", function () {
    var taiKhoan = getMyEle('TaiKhoan').value;
    var ThongBao = getMyEle('tbTaiKhoan');
    var ketqua = false;
    if (taiKhoan === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[0];
    } else if (taiKhoan.length < minlengthND || taiKhoan.length > maxlengthKH) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[6];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;
});
$('body').delegate("#MatKhau", "blur", function () {
    var matKhau = getMyEle('MatKhau').value;
    var ThongBao = getMyEle('tbMatKhau');
    var ketqua = false;
    if (matKhau === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[1];
    } else if (matKhau.length < minlengthND || matKhau.length > maxlengthKH) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[6];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;
});
$('body').delegate("#HoTen", "blur", function () {
    var hoTen = getMyEle('HoTen').value;
    var ThongBao = getMyEle('tbHoTen');
    var ketqua = false;
    if (hoTen === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[2];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;
});
$('body').delegate("#Email", "blur", function () {
    var chkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = getMyEle('Email').value;
    var ThongBao = getMyEle('tbEmail');
    var ketqua = false;
    if (email === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[3];
    } else if (email.match(chkEmail)) {
        ThongBao.style.display = "none";
        ketqua = true;
    } else {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[7];
    }
    return ketqua;
});
$('body').delegate("#SoDT", "blur", function () {
    var kitu = /^[0-9-+]+$/;
    var SDT = getMyEle('SoDT').value;
    var ThongBao = getMyEle('tbSoDT');
    var ketqua = false;
    if (SDT === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[4];
    } else if (!(kitu.test(SDT))) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSND[8];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;
});
$('body').delegate("#MaLoaiNguoiDung", "blur", function () {
    var giaTri = getMyEle('MaLoaiNguoiDung');
    var tag = getMyEle('tbMaLoaiNguoiDung');
    if (giaTri.selectedIndex === -1) {
        tag.style.display = "block";
        tag.innerHTML = mangThongBaoDSND[5];
        return false;

    } else {
        tag.style.display = "none";
        return true;
    }
});
// Validation Khóa Học
var mangThongBaoDSKH = [
    "Vui Lòng Nhập vào Mã Khóa Học !",
    "Vui lòng nhập vào Tên Khóa Học!",
    "Vui lòng nhập mô tả Khóa Học!",
    "Vui lòng nhập hình ảnh !",
    "Vui lòng nhập số lượt xem của Khóa Học !",
    "Vui lòng chọn loại người Tạo của Khóa học !",
    "Vui lòng nhập kí tự từ khoảng 3 đến 25 !",
    "Vui lòng nhập số"
]
var minlengthNDKH = 3;
var maxlengthKHKH = 25;

function KiemTraNhapMaKhoaHoc() {
    var maKhoaHoc = getMyEle('MaKhoaHoc').value;
    var ThongBao = getMyEle('tbMaKhoaHoc');
    var ketqua = false;
    if (maKhoaHoc === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[0];
    } else if (maKhoaHoc.length < minlengthNDKH || maKhoaHoc.length > maxlengthKHKH) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[6];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;

}

function KiemTraNhapTenKhoaHoc() {
    var tenKhoaHoc = getMyEle('TenKhoaHoc').value;
    var ThongBao = getMyEle('tbTenKhoaHoc');
    var ketqua = false;
    if (tenKhoaHoc === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[1];
    } else if (tenKhoaHoc.length < minlengthNDKH || tenKhoaHoc.length > maxlengthKHKH) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[6];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;

}

function KiemTraNhapMoTa() {
    var moTa = CKEDITOR.instances["MoTa"].getData();
    var ThongBao = getMyEle('tbMoTa');
    var ketqua = false;
    if (moTa === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[2];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;
}

function KiemTraNhapHinhAnh() {
    var hinhAnh = getMyEle('HinhAnh').value;
    var ThongBao = getMyEle('tbHinhAnh');
    var ketqua = false;
    if (hinhAnh === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[3];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;

}

function KiemTraSoLuotXem() {
    var kitu = /^[0-9-+]+$/;
    var luotXem = getMyEle('LuotXem').value;
    var ThongBao = getMyEle('tbLuotXem');
    var ketqua = false;
    if (luotXem === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[4];
    } else if (!(kitu.test(luotXem))) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[7];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;

}
$('body').delegate("#MaKhoaHoc", "blur", function () {
    var maKhoaHoc = getMyEle('MaKhoaHoc').value;
    var ThongBao = getMyEle('tbMaKhoaHoc');
    var ketqua = false;
    if (maKhoaHoc === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[0];
    } else if (maKhoaHoc.length < minlengthNDKH || maKhoaHoc.length > maxlengthKHKH) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[6];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;
});
$('body').delegate("#TenKhoaHoc", "blur", function () {
    var tenKhoaHoc = getMyEle('TenKhoaHoc').value;
    var ThongBao = getMyEle('tbTenKhoaHoc');
    var ketqua = false;
    if (tenKhoaHoc === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[1];
    } else if (tenKhoaHoc.length < minlengthNDKH || tenKhoaHoc.length > maxlengthKHKH) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[6];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;
});
$('body').delegate("#MoTa", "blur", function () {
    var moTa = CKEDITOR.instances["MoTa"].getData();
    console.log(moTa);
    var ThongBao = getMyEle('tbMoTa');
    var ketqua = false;
    if (moTa === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[2];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;
});
$('body').delegate("#HinhAnh", "blur", function () {
    var hinhAnh = getMyEle('HinhAnh').value;
    var ThongBao = getMyEle('tbHinhAnh');
    var ketqua = false;
    if (hinhAnh === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[3];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;
});
$('body').delegate("#LuotXem", "blur", function () {
    var kitu = /^[0-9-+]+$/;
    var luotXem = getMyEle('LuotXem').value;
    var ThongBao = getMyEle('tbLuotXem');
    var ketqua = false;
    if (luotXem === "") {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[4];
    } else if (!(kitu.test(luotXem))) {
        ThongBao.style.display = "block";
        ThongBao.innerHTML = mangThongBaoDSKH[7];
    } else {
        ThongBao.style.display = "none";
        ketqua = true;
    }
    return ketqua;
});
// ------------------------------Kiểm tra Local---------------------------------------- 
// - Có người dùng thì giữ đăng nhập
// - Không có thì hiện btn Đăng Nhập
function checkLoginUser() {
    if (CheckExistLocal('LocalUserObj')) {
        var localUser = getDataFromLocal('LocalUserObj');
        var btnUser = ` <div class="dropdown">
                        <a href="#" class="btn btn-danger btn-round dropdown-toggle animated fadeIn" data-toggle="dropdown">
                            ${localUser.HoTen}
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li class="dropdown-header">Xin Chào ...</li>
                            <a class="dropdown-item" href="profile.html">Trang Cá Nhân</a>
                            <a class="dropdown-item" href="#pk">Hòm Thư  <span class="label label-danger">15</span></a>
                            <a class="dropdown-item" id="outUser" href="#pk">Thoát</a>
                        </ul>
                    </div>`;
        $('.userDiv').html(btnUser);
    } else {
        var btnDNDK = `<button class="btn btn-danger btn-round animated fadeIn" data-toggle="modal" data-target="#modalForm">Đăng kí/Đăng nhập</button>`;
        $('.userDiv').html(btnDNDK);
    }
}

function checkLoginAdmin() {
    if (CheckExistLocal('LocalAdminObj')) {
        var localAdmin = getDataFromLocal('LocalAdminObj');
        $('#user-admin').html(localAdmin.HoTen);
    }
}
// ------------------------------Đăng Nhập---------------------------------------- 
// Lưu lại mật khẩu user để sử dụng
var matkhauUser;
$('#btnDangNhap').click(function () {
    var taikhoanVal = $('#taikhoanDN').val();
    var matkhauVal = $('#matkhauDN').val();
    ktTaiKhoanDN(taikhoanVal);
    ktMatKhauDN(matkhauVal);
    if (taikhoanVal !== "" && matkhauVal !== "") {
        userSV.DangNhap(taikhoanVal, matkhauVal)
            .done(function (result) {
                if (result == 'failed to login') {
                    swal({
                        type: 'error',
                        title: 'Sai thông tin',
                        text: 'Hãy chắc chắn rằng bạn nhập đúng chính xác',
                    })
                } else {
                    // Nếu Người Dùng là học viên
                    if (result[0].MaLoaiNguoiDung == "HV") {
                        const toast = swal.mixin({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        toast({
                            type: 'success',
                            title: 'Đăng nhập thành công'
                        });
                        matkhauUser = $('#matkhauDN').val();
                        SaveLocalStorage(matkhauUser, 'MatKhauUser');
                        SaveLocalStorage(result[0], 'LocalUserObj');
                        checkLoginUser();
                        resetDN();
                        $('.input').removeClass('input--filled');
                        setTimeout(() => {
                            window.location.href = "./../../app/Views/profile.html";
                        }, 1000);
                    } else {
                        // Nếu Người Dùng là giáo vụ
                        const toast = swal.mixin({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        toast({
                            type: 'success',
                            title: 'Đăng nhập thành công'
                        });
                        SaveLocalStorage(result[0], 'LocalAdminObj');
                        checkLoginAdmin();
                        resetDN();
                        $('.input').removeClass('input--filled');
                        setTimeout(() => {
                            window.location.href = "./../../app/Views/index-admin.html";
                        }, 1000);
                    }

                }
            })
            .fail(function (error) {
                console.log(error);
            })
    }
})
// ------------------------------Đăng Kí---------------------------------------- 
$('#btnDangKi').click(function () {
    var tkValue = $('#taikhoanDK').val();
    var matkhauValue = $('#matkhauDK').val();
    var hotenValue = $('#hotenDK').val();
    var emailValue = $('#emailDK').val();
    var sodtValue = $('#sodtDK').val();
    var mlndValue = "HV";
    // ---------------------
    ktTaiKhoanDK(tkValue);
    ktMatKhauDK(matkhauValue);
    ktHoTenDK(hotenValue);
    ktEmailDK(emailValue);
    ktSoDTDK(sodtValue);
    // ---------------------
    var tbTaiKhoanContent = $('#tbTaiKhoanDK').html();
    var tbMauKhauContent = $('#tbMatKhauDK').html();
    var tbHoTenContent = $('#tbHoTenDK').html();
    var tbEmailContent = $('#tbEmailDK').html();
    var tbSoDTContent = $('#tbSoDTDK').html();
    // --------------------
    if (tbTaiKhoanContent === '' && tbMauKhauContent === '' && tbHoTenContent === '' && tbEmailContent === '' && tbSoDTContent === '') {
        var userDK = new User(tkValue, matkhauValue, hotenValue, emailValue, sodtValue, mlndValue);
        userSV.DangKi(userDK)
            .done(function (result) {
                if (result == "tai khoan da ton tai !") {
                    swal({
                        type: 'error',
                        title: 'Khoan....',
                        text: 'Tài Khoản Nãy Đã Tồn Tại',
                    })
                } else {
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    toast({
                        type: 'success',
                        title: 'Đăng Kí Thành Công',
                    });
                    resetDK();
                    $('.input').removeClass('input--filled');
                }
            })
            .fail(function (error) {
                console.log(error);
            });
    }
});
// ------------------------------Btn Thoát---------------------------------------- 
// Vì tạo động nên:
// Thoát User
$('body').delegate('#outUser', 'click', function () {
    const toast = swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 1000
    });
    toast({
        type: 'success',
        title: 'Đã Thoát'
    });
    delDataFromLocal('LocalUserObj');
    checkLoginUser();
    setTimeout(() => {
        window.location.href = "./../../app/Views/index.html";
    }, 1000);
})
// Thoát Admin
$('#outAdmin').click(function () {
    const toast = swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 1000
    });
    toast({
        type: 'success',
        title: 'Đã Thoát'
    });
    delDataFromLocal('LocalAdminObj');
    setTimeout(() => {
        window.location.href = "./../../app/Views/index.html";
    }, 1000);
})

// ------------------------Trang Cá Nhân-----------------------------------
// Load Thông Tin
function loadThongTin() {
    var localUser = getDataFromLocal('LocalUserObj');
    if (localUser !== null) {
        // User
        $('#taikhoanInfo').val(localUser.TaiKhoan);
        $('#hotenInfo').val(localUser.HoTen);
        $('#userName').html(localUser.HoTen);
        $('#emailInfo').val(localUser.Email);
        $('#sodtInfo').val(localUser.SoDT);
        // Course
        userSV.LayDanhSachKhoaHocCuaUser(localUser.TaiKhoan)
            .done(function (result) {
                var courseUserContent = '';
                if (result == 'Did not find the course') {
                    courseUserContent = `   <div class="col-lg-12 text-center animated fadeInDown">
                                                <h3 class="text-danger">Chưa ghi danh khóa học nào</h3>
                                            </div>`;
                    $('#divKhoaHocCuaUser').html(courseUserContent);
                } else {
                    for (var i = 0; i < result.length; i++) {
                        courseUserContent += `  <div class="col-lg-6 text-center animated fadeInDown">
                                                    <div class="card" style="width: 80%;">
                                                        <div class="card-body text-left">
                                                            <h3 class="card-title text-center">${result[i].TenKhoaHoc}</h3>
                                                            <p>Người ghi danh:</p>
                                                            <span class="text-danger">${result[i].GiaoVu}</span>
                                                            <p>Ngày ghi danh:</p>
                                                            <span class="text-danger">${result[i].NgayGhiDanh}</span> 
                                                        </div>
                                                        <div class="card-footer text-right">
                                                            <button type="button" class="btn btn-danger btn-link">Học</button>
                                                        </div>
                                                    </div>
                                                </div>`;
                        $('#divKhoaHocCuaUser').html(courseUserContent);
                    }
                }
            })
            .fail(function (error) {
                console.log(error);
            })
    }
}
// Sửa Thông Tin
$('#btnEditInfo').click(function () {
    var localUser = getDataFromLocal('LocalUserObj');
    var hotenValue = $('#hotenInfo').val();
    var emailValue = $('#emailInfo').val();
    var sodtValue = $('#sodtInfo').val();
    // ----------------
    ktHoTenEdit(hotenValue);
    ktEmailEdit(emailValue);
    ktSoDTEdit(sodtValue);
    // ----------------
    var tbHoTenContent = $('#tbEditHoTen').html();
    var tbEmailContent = $('#tbEditEmail').html();
    var tbSoDTContent = $('#tbEditSoDT').html();
    // ----------------
    if (tbHoTenContent === "" && tbEmailContent === "" && tbSoDTContent === "") {
        var matkhau = getDataFromLocal('MatKhauUser');
        userSV.CapNhatThongTinNguoiDung(localUser.TaiKhoan, matkhau, hotenValue, emailValue, sodtValue, localUser.MaLoaiNguoiDung)
            .done(function (result) {
                const toast = swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 1000
                });
                toast({
                    type: 'success',
                    title: 'Sửa Thông Tin Thành Công'
                });
                delDataFromLocal('LocalUserObj');
                SaveLocalStorage(result, 'LocalUserObj');
                checkLoginUser();
                loadThongTin();
            })
            .fail(function (error) {
                console.log(error);
            });
    }
})
// Đổi mật khẩu
$('#btnEditPassword').click(function () {
    var localUser = getDataFromLocal('LocalUserObj');
    var matKhauMoi = $('#matkhauInfoMoi').val();
    if (ktMatKhauCu() && ktMatKhauMoi()) {
        userSV.CapNhatThongTinNguoiDung(localUser.TaiKhoan, matKhauMoi, localUser.HoTen, localUser.Email, localUser.SoDT, localUser.MaLoaiNguoiDung)
            .done(function (result) {
                const toast = swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 1000
                });
                toast({
                    type: 'success',
                    title: 'Đổi Mật Khẩu Thành Công'
                });
                delDataFromLocal('LocalUserObj');
                SaveLocalStorage(result, 'LocalUserObj');
                delDataFromLocal('MatKhauUser');
                SaveLocalStorage(matKhauMoi, 'MatKhauUser');
                checkLoginUser();
                loadThongTin();
                resetDoiMatKhau();
            })
            .fail(function (error) {
                console.log(error);
            });
    }
});
// ------------------------- Khóa Học ------------------------------
function LoadKhoaHocUser() {
    courseSV.LayDanhSachKhoaHoc()
        .done(function (result) {
            courseList.DSKH = result;
            loadKhoaHoc(courseList);
            loadKhoaHocWeb(courseList);
            loadKhoaHocMobile(courseList);
        })
        .fail(function (error) {
            console.log(error);
        })
}
// Load Row Khóa Học
function loadKhoaHoc(courseList) {
    var courseListContent = '';
    for (var i = 0; i < courseList.DSKH.length; i++) {
        courseListContent += `  <div class="col-xl-3 col-lg-4 col-md-6 mt-2 mb-2 wow fadeInUp" data-wow-duration="2s">
                                            <div class="card" style="width: 18rem;">
                                                <img class="card-img-top" src="${courseList.DSKH[i].HinhAnh}" height="200">
                                                <div class="card-body">
                                                    <h6 class="card-title">${courseList.DSKH[i].TenKhoaHoc}</h6>
                                                    <h6 class="card-subtitle mb-3 text-danger">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star-half-o"></i>
                                                    </h6>
                                                    <span>${courseList.DSKH[i].LuotXem} lượt xem</span>
                                                    <hr>
                                                    <button type="button" class="btn btn-outline-danger btn-sm btn-chitietkhoahoc" data-MaKhoaHoc="${courseList.DSKH[i].MaKhoaHoc}">Chi Tiết</button>
                                                </div>
                                            </div>
                                        </div>`;
        $('#divHienThiKhoaHoc').html(courseListContent);
    }
}

function loadKhoaHocWeb(courseList) {
    var courseListContent = '';
    for (var i = 0; i < courseList.DSKH.length; i++) {
        var searchName = 'front';
        if (courseList.DSKH[i].TenKhoaHoc.trim().toLowerCase().search(searchName.trim().toLowerCase()) !== -1) {
            courseListContent += `  <div class="col-xl-3 col-lg-4 col-md-6 mt-2 mb-2 wow fadeInUp" data-wow-duration="2s">
                                            <div class="card" style="width: 18rem;">
                                                <img class="card-img-top" src="${courseList.DSKH[i].HinhAnh}" height="200">
                                                <div class="card-body">
                                                    <h6 class="card-title">${courseList.DSKH[i].TenKhoaHoc}</h6>
                                                    <h6 class="card-subtitle mb-3 text-danger">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star-half-o"></i>
                                                    </h6>
                                                    <span>${courseList.DSKH[i].LuotXem} lượt xem</span>
                                                    <hr>
                                                    <button type="button" class="btn btn-outline-danger btn-sm btn-chitietkhoahoc" data-MaKhoaHoc="${courseList.DSKH[i].MaKhoaHoc}">Chi Tiết</button>
                                                </div>
                                            </div>
                                        </div>`;
            $('#divHienThiKhoaHocWeb').html(courseListContent);
        }
    }
}

function loadKhoaHocMobile(courseList) {
    var courseListContent = '';
    for (var i = 0; i < courseList.DSKH.length; i++) {
        var searchName = 'android';
        if (courseList.DSKH[i].TenKhoaHoc.trim().toLowerCase().search(searchName.trim().toLowerCase()) !== -1) {
            courseListContent += `  <div class="col-xl-3 col-lg-4 col-md-6 mt-2 mb-2 wow fadeInUp" data-wow-duration="2s">
                                            <div class="card" style="width: 18rem;">
                                                <img class="card-img-top" src="${courseList.DSKH[i].HinhAnh}" height="200">
                                                <div class="card-body">
                                                    <h6 class="card-title">${courseList.DSKH[i].TenKhoaHoc}</h6>
                                                    <h6 class="card-subtitle mb-3 text-danger">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star-half-o"></i>
                                                    </h6>
                                                    <span>${courseList.DSKH[i].LuotXem} lượt xem</span>
                                                    <hr>
                                                    <button type="button" class="btn btn-outline-danger btn-sm btn-chitietkhoahoc" data-MaKhoaHoc="${courseList.DSKH[i].MaKhoaHoc}">Chi Tiết</button>
                                                </div>
                                            </div>
                                        </div>`;
            $('#divHienThiKhoaHocMobile').html(courseListContent);
        }
    }
}
// Tìm Khóa Học
function TimKhoaHoc() {
    var inputTimKhoaHoc = $('#timkhoahoc').val();
    if (inputTimKhoaHoc == "") {
        loadKhoaHoc(courseList);
        loadKhoaHocWeb(courseList);
        loadKhoaHocMobile(courseList);
    } else {
        var searchcourseList = courseList.TimKhoaHoc(inputTimKhoaHoc);
        loadKhoaHoc(searchcourseList);
        loadKhoaHocWeb(searchcourseList);
        loadKhoaHocMobile(searchcourseList);
    }
}
$('#timkhoahoc').keyup(TimKhoaHoc);
// Chi Tiết Khóa Học
$('body').delegate('.btn-chitietkhoahoc', 'click', function () {
    var makhoahoc = $(this).attr('data-MaKhoaHoc');
    window.location.assign(`course-detail.html?${makhoahoc}`);
});

function ChiTietKhoaHoc() {
    var makhoahoc = window.location.search.substr(1, undefined);
    courseSV.ChiTietKhoaHoc(makhoahoc)
        .done(function (result) {
            $('#titleChiTietKhoaHoc').html(result.TenKhoaHoc);
            $('#imgChiTietKhoaHoc').attr('src', result.HinhAnh);
            $('#luotxemChiTietKhoaHoc').html(result.LuotXem);
            $('#nguoitaoChiTietKhoaHoc').html(result.NguoiTao);
            $('#motaChiTietKhoaHoc').html(result.MoTa);
        })
        .fail(function (error) {
            console.log(error);
        });
}
// --------------------------------ADMIN @@ ------------------------------------------------
// ----------- Danh Sách Người Dùng----------------
// Phân Trang User
var limit = 10;
window.hienthiTrang = hienthiTrang;

function hienthiTrang(tongSoTrang, trang) {
    var valSelectLoaiUser = $('.user-select-content').val();
    if (valSelectLoaiUser == 'hv') {
        userList.DSND = getDataFromLocal('LocalUserList');
        var DSHV = new UserList()
        for (var i = 0; i < userList.DSND.length; i++) {
            if (userList.DSND[i].MaLoaiNguoiDung == 'HV') {
                DSHV.AddUser(userList.DSND[i]);
            }
        }
        var mangRecord = new UserList();
        var vitriDau = (trang - 1) * limit;
        for (var i = vitriDau; i < vitriDau + 10 && i < DSHV.DSND.length; i++) {
            mangRecord.AddUser(DSHV.DSND[i]);
        }
        loadTableDanhSachNguoiDung(mangRecord.DSND);
        tongSoTrang = Math.floor(DSHV.DSND.length / 10) + 1;
        taoPag(tongSoTrang, trang);
        $('#trang-' + trang).addClass('active');
    } else if (valSelectLoaiUser == 'gv') {
        userList.DSND = getDataFromLocal('LocalUserList');
        var DSGV = new UserList()
        for (var i = 0; i < userList.DSND.length; i++) {
            if (userList.DSND[i].MaLoaiNguoiDung == 'GV') {
                DSGV.AddUser(userList.DSND[i]);
            }
        }
        var mangRecord = new UserList();
        var vitriDau = (trang - 1) * limit;
        for (var i = vitriDau; i < vitriDau + 10 && i < DSGV.DSND.length; i++) {
            mangRecord.AddUser(DSGV.DSND[i]);
        }
        loadTableDanhSachNguoiDung(mangRecord.DSND);
        tongSoTrang = Math.floor(DSGV.DSND.length / 10) + 1;
        taoPag(tongSoTrang, trang);
        $('#trang-' + trang).addClass('active');
    } else {
        userList.DSND = getDataFromLocal('LocalUserList');
        var mangRecord = new UserList();
        var vitriDau = (trang - 1) * limit;
        for (var i = vitriDau; i < vitriDau + 10 && i < userList.DSND.length; i++) {
            mangRecord.AddUser(userList.DSND[i]);
        }
        loadTableDanhSachNguoiDung(mangRecord.DSND);
        taoPag(tongSoTrang, trang);
        $('#trang-' + trang).addClass('active');
    }
}

function taoPhanTrangUser(userlist) {
    var demRecord = 0;
    for (var i = 0; i < userlist.length; i++) {
        demRecord++;
    }
    var tongSoTrang = Math.floor(demRecord / 10) + 1;
    hienthiTrang(tongSoTrang, 1);
}

function taoPag(tongSoTrang, trangHienTai) {
    var pagContent = '';
    var prev = (trangHienTai == 1) ? "disabled" : "";
    var next = (trangHienTai == tongSoTrang) ? "disabled" : "";
    if (tongSoTrang !== 1) {
        pagContent = `  <li class="page-item ${prev}" onclick="hienthiTrang(${tongSoTrang},${trangHienTai - 1})" ${prev}>
                            <a class="page-link ${prev}" href="#pkp" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>`;
        for (var i = 1; i <= tongSoTrang; i++) {
            pagContent += ` <li class="page-item" id="trang-${i}" onclick="hienthiTrang(${tongSoTrang},${i})">
                            <a class="page-link" href="#pkp">${i}</a>
                        </li>`;
        }
        pagContent += ` <li class="page-item ${next}" onclick="hienthiTrang(${tongSoTrang},${trangHienTai + 1})" ${next}>
                        <a class="page-link ${next}" href="#pkp" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>`;
    }
    $('#pagUser').html(pagContent);
}
// Bắt sự kiện change select
$('.user-select-content').change(function () {
    userList.DSND = getDataFromLocal('LocalUserList');
    taoPhanTrangUser(userList.DSND);
    $('#txtTuKhoa').val('');
})

// Tạo Table Người Dùng
function loadTableDanhSachNguoiDung(DSND) {
    var noiDung = '';
    for (var i = 0; i < DSND.length; i++) {
        var nguoiDung = DSND[i];
        noiDung +=
            `
            <tr class="trNguoiDung">
                <td><input class="ckbXoaND" type="checkbox" value="${nguoiDung.TaiKhoan}"/></td>
                <td class="TaiKhoan">${nguoiDung.TaiKhoan}</td>
                <td class="MatKhau">${nguoiDung.MatKhau}</td>
                <td class="HoTen">${nguoiDung.HoTen}</td>
                <td class="Email">${nguoiDung.Email}</td>
                <td class="SoDT ">${nguoiDung.SoDT}</td>
                <td class="MaLoaiNguoiDung">${nguoiDung.MaLoaiNguoiDung}</td>
                <td class="TenLoaiNguoiDung">${nguoiDung.TenLoaiNguoiDung}</td>
                <td><div class="dropdown dropleft">
                <button type="button" class="btn btn-primary btn-just-icon dropdown-toggle" data-toggle="dropdown">
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item btn btn-primary btnChinhSuaNguoiDung" TaiKhoan="${nguoiDung.TaiKhoan}"><i class="fa fa-edit" style="font-size:24px"></i></a>
                 <a class="dropdown-item btn btn-danger btnXoaNguoiDung" TaiKhoan="${nguoiDung.TaiKhoan}"><i class="fa fa-remove" style="font-size:24px"></i></a>
                </div>
              </div></td>
            </tr>
           `;
    }
    $('#tblDSND').html(noiDung);
};
// Load Người Dùng
function loadDanhSachNguoiDung() {
    LayUserList();
}
// Tìm Người Dùng
function TimNguoiDung() {
    var inputTimNguoiDung = $('#txtTuKhoa').val();
    var valSelectLoaiUser = $('.user-select-content').val();
    if (inputTimNguoiDung == "") {
        loadDanhSachNguoiDung();
        $('.pagination-user').css('display', 'block');
    } else {
        if (valSelectLoaiUser == 'hv') {
            var DSHV = new UserList();
            for (var i = 0; i < userList.DSND.length; i++) {
                if (userList.DSND[i].MaLoaiNguoiDung == 'HV') {
                    DSHV.AddUser(userList.DSND[i]);
                }
            }
            var searchuserList = DSHV.TimNguoiDung(inputTimNguoiDung);
            loadTableDanhSachNguoiDung(searchuserList.DSND);
        } else if (valSelectLoaiUser == 'gv') {
            var DSGV = new UserList();
            for (var i = 0; i < userList.DSND.length; i++) {
                if (userList.DSND[i].MaLoaiNguoiDung == 'GV') {
                    DSGV.AddUser(userList.DSND[i]);
                }
            }
            var searchuserList = DSGV.TimNguoiDung(inputTimNguoiDung);
            loadTableDanhSachNguoiDung(searchuserList.DSND);
        } else {
            var searchuserList = userList.TimNguoiDung(inputTimNguoiDung);
            loadTableDanhSachNguoiDung(searchuserList.DSND);
            $('.pagination-user').css('display', 'none');
        }
        $('.pagination-user').css('display', 'none');
    }
}
// Sự Kiện Tìm Người Dùng
$('#txtTuKhoa').keyup(TimNguoiDung);
// Sự Kiện Đóng Modal
$('body').delegate('#btnDongND', 'click', function () {
    $('#btnDongForm').trigger('click');
    $('.txtF').val("");
    $('.sp-thongbao').css('display', 'none');
})
// Thêm Người Dùng
$('#btnThemNguoiDung').click(OpenPopupModalNguoiDung);

function OpenPopupModalNguoiDung() {
    $('#TaiKhoan').removeAttr('readonly', true);
    $('.txtF').val("");
    var modalTilte = "Thêm Người Dùng";
    //tạo nội dung cho modal footer : dùng string template
    var modalFooter = `
        <button id="btnThemND" class="btn btn-success">Thêm Người Dùng</button>
        <button id="btnDongND" class="btn btn-danger">Close</button>
        `;
    $('.modal-title').html(modalTilte);
    $('.modal-footer').html(modalFooter);
    $('#btnPopupModal').trigger('click');
    // Đóng popup
    $('body').delegate("#btnThemND", "click", function () {
        if (KiemTraNhapTaiKhoan(), KiemTraNhapMatKhau(), KiemTraNhapHoTen(), KiemTraNhapEmail(), KiemTraSoDienThoai(), KiemTraLoaiNguoiDung()) {
            //lấy thông tin người dùng nhập vào
            var taiKhoan = $('#TaiKhoan').val();
            var matKhau = $('#MatKhau').val();
            var hoTen = $('#HoTen').val();
            var email = $('#Email').val();
            var soDT = $('#SoDT').val();
            var maLoaiNguoiDung = $('#MaLoaiNguoiDung').val();
            //khởi tạo đối tượng khóa học
            var nguoiDung = new User(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung);
            //gọi service để đẩy lên server
            userSV.DangKi(nguoiDung)
                .done(function (result) {
                    if (result == "tai khoan da ton tai !") {
                        swal({
                            type: 'error',
                            title: 'Khoan....',
                            text: 'Tài Khoản Nãy Đã Tồn Tại',
                        })
                    } else {
                        const toast = swal.mixin({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        toast({
                            type: 'success',
                            title: 'Thêm Người Dùng Thành Công'
                        });
                        loadDanhSachNguoiDung();
                        $('#btnDongForm').trigger('click');
                        $('#txtTuKhoa').val('');
                        $('.pagination-user').css('display', 'block');
                    }
                })
                .fail(function (error) {
                    console.log(error);
                });
        }
    });
}
//Đưa Thông Tin lên Modal Để Sửa
$('body').delegate(".btnChinhSuaNguoiDung", "click", function () {
    //CLear Input
    $('.txtF').val("");
    //Khóa Thuộc tính tài khoản
    $('#TaiKhoan').attr("readonly", true);
    var modalTilte = "Chỉnh Sửa Người Dùng";
    var modalFooter = `
        <button id="btnLuuNguoiDung" class="btn btn-success">Lưu Người Dùng</button>
        <button id="btnDongND" class="btn btn-danger">Close</button>
        `;
    $('.modal-title').html(modalTilte);
    $('.modal-footer').html(modalFooter);
    //load phần nội dung chỉnh sửa lên popup
    var trNguoiDung = $(this).closest(".trNguoiDung");
    var TaiKhoan = trNguoiDung.find(".TaiKhoan").html().trim();
    var MatKhau = trNguoiDung.find(".MatKhau").html().trim();
    var HoTen = trNguoiDung.find(".HoTen").html().trim();
    var Email = trNguoiDung.find(".Email").html().trim();
    var SoDT = trNguoiDung.find(".SoDT").html().trim();
    var MaLoaiNguoiDung = trNguoiDung.find(".MaLoaiNguoiDung").html().trim();
    $('#TaiKhoan').val(TaiKhoan);
    $('#MatKhau').val(MatKhau);
    $('#HoTen').val(HoTen);
    $('#Email').val(Email);
    $('#SoDT').val(SoDT);
    $('#MaLoaiNguoiDung').val(MaLoaiNguoiDung);
    //Gọi nút mở modal
    $('#btnPopupModal').trigger('click');

});
$('body').delegate("#btnLuuNguoiDung", "click", function () {
    if (KiemTraNhapTaiKhoan() && KiemTraNhapMatKhau() && KiemTraNhapHoTen() && KiemTraNhapEmail() && KiemTraSoDienThoai() && KiemTraLoaiNguoiDung()) {
        var TaiKhoan = $('#TaiKhoan').val();
        var MatKhau = $('#MatKhau').val();
        var HoTen = $('#HoTen').val();
        var Email = $("#Email").val();
        var SoDT = $("#SoDT").val();
        var MaLoaiNguoiDung = $("#MaLoaiNguoiDung").val();
        //Tạo đối tượng người dùng mới
        userSV.CapNhatThongTinNguoiDung(TaiKhoan, MatKhau, HoTen, Email, SoDT, MaLoaiNguoiDung)
            .done(function (result) {
                const toast = swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 2000
                });
                toast({
                    type: 'success',
                    title: 'Cập Nhật Thông Tin Thành Công'
                });
                loadDanhSachNguoiDung();
                $('#txtTuKhoa').val("");
                $('.pagination-user').css('display', 'block');
            }).fail(function (error) {
                swal({
                    type: 'error',
                    title: 'Cập Nhật Thất Bại',
                });
            });
        $('#TaiKhoan').attr("readonly", false);
        $('#btnDongForm').trigger('click');
    }
});
//Xóa Người Dùng
$('body').delegate("#btnXoaNguoiDung", "click", function () {
    $('.ckbXoaND').each(function () {
        if ($(this).is(':checked')) {
            var id = $(this).attr("value");
            userSV.XoaNguoiDung(id)
                .done(function (result) {
                    swal(
                        'Đã Xóa',
                        'Kiểm tra lại, nếu có người dùng nào không xóa được vì người dùng đó đã ghi danh khóa học',
                        'success'
                    )
                    loadDanhSachNguoiDung();
                    $('#txtTuKhoa').val("");
                    $('.pagination-user').css('display', 'block');
                })
                .fail(function (error) {
                    swal({
                        type: 'error',
                        title: 'Có người dùng đã được ghi danh khóa học nên không thể xóa',
                    });
                });
        } else {
            swal({
                type: 'error',
                title: 'Khoan....',
                text: 'Xin hãy check tài khoản muốn xóa',
            })
        }
    });
});
//Xóa 1 Người Dùng 
$('body').delegate(".btnXoaNguoiDung", "click", function () {
    var id = $(this).attr("TaiKhoan");
    userSV.XoaNguoiDung(id)
        .done(function (result) {
            swal(
                'Đã Xóa',
                'Bạn đã xóa thành công người dùng',
                'success'
            )
            loadDanhSachNguoiDung();
            $('#txtTuKhoa').val("");
            $('.pagination-user').css('display', 'block');
        })
        .fail(function (error) {
            swal({
                type: 'error',
                title: 'Có người dùng đã được ghi danh khóa học nên không thể xóa',
            });

        })
});
// -----------------Danh Sách Khóa Học ---------------------
// Phân Trang Khoa Hoc
var limit = 10;
window.hienthiTrangKH = hienthiTrangKH;

function hienthiTrangKH(tongSoTrang, trang) {
    courseList.DSKH = getDataFromLocal('LocalCourseList');
    var mangRecord = new CourseList();
    var vitriDau = (trang - 1) * limit;
    for (var i = vitriDau; i < vitriDau + 10 && i < courseList.DSKH.length; i++) {
        mangRecord.AddCourse(courseList.DSKH[i]);
    }
    loadTableDanhSachKhoaHoc(mangRecord.DSKH);
    taoPagKH(tongSoTrang, trang);
    $('#trang-' + trang).addClass('active');
}

function taoPhanTrangKH(courselist) {
    var demRecord = 0;
    for (var i = 0; i < courselist.length; i++) {
        demRecord++;
    }
    var tongSoTrang = Math.floor(demRecord / 10) + 1;
    hienthiTrangKH(tongSoTrang, 1);
}

function taoPagKH(tongSoTrang, trangHienTai) {
    var pagContent = '';
    var prev = (trangHienTai == 1) ? "disabled" : "";
    var next = (trangHienTai == tongSoTrang) ? "disabled" : "";
    if (tongSoTrang !== 1) {
        pagContent = `  <li class="page-item ${prev}" onclick="hienthiTrangKH(${tongSoTrang},${trangHienTai - 1})" ${prev}>
                            <a class="page-link ${prev}" href="#pkp" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>`;
        for (var i = 1; i <= tongSoTrang; i++) {
            pagContent += ` <li class="page-item" id="trang-${i}" onclick="hienthiTrangKH(${tongSoTrang},${i})">
                            <a class="page-link" href="#pkp">${i}</a>
                        </li>`;
        }
        pagContent += ` <li class="page-item ${next}" onclick="hienthiTrangKH(${tongSoTrang},${trangHienTai + 1})" ${next}>
                        <a class="page-link ${next}" href="#pkp" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>`;
    }
    $('#pagCourse').html(pagContent);
}
// Load Danh Sách Khóa Học
function loadDanhSachKhoaHoc() {
    LayCourseList();
}
// Load Table
function loadTableDanhSachKhoaHoc(courseList) {
    $('#tblDSKH').html("");
    var noiDung = '';
    for (var i = 0; i < courseList.length; i++) {
        var khoaHoc = courseList[i];
        noiDung +=
            `
            <tr class="trKhoaHoc">
                <td><input class="ckbXoaKH" type="checkbox" value="${khoaHoc.MaKhoaHoc}"/></td>
                <td class="MaKhoaHoc">${khoaHoc.MaKhoaHoc}</td>
                <td class="TenKhoaHoc">${khoaHoc.TenKhoaHoc}</td>
                <td class="MoTa">${khoaHoc.MoTa}</td>
                <td class="HinhAnh"><img src="${khoaHoc.HinhAnh}" width="100" height="50"/></td>
                <td class="LuotXem">${khoaHoc.LuotXem}</td>
                <td class="NguoiTao">${khoaHoc.NguoiTao}</td>
                <td><div class="dropdown dropleft">
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item btn btn-primary btnChinhSuaKH" MaKhoaHoc="${khoaHoc.MaKhoaHoc}"><i class="fa fa-edit" style="font-size:24px"></i></a>
                  <a class="dropdown-item btn btn-danger btnXoaKhoaHoc" MaKhoaHoc="${khoaHoc.MaKhoaHoc}"><i class="fa fa-remove" style="font-size:24px"></i></a>
                </div>
              </div></td> 
            </tr>
           `;
    }
    $('#tblDSKH').html(noiDung);
}
// Thêm Khóa Học
$('#btnThemKhoaHoc').click(OpenPopupModalKhoaHoc);

function OpenPopupModalKhoaHoc() {
    $('#MaKhoaHoc').removeAttr('readonly', true);
    $('.txtF').val("");
    var modalTilte = "Thêm Khóa Học";
    //tạo nội dung cho modal footer : dùng string template
    var modalFooter = `
        <button id="btnThemKH" class="btn btn-success">Thêm Khóa Học</button>
        <button id="btnDongKH" class="btn btn-danger">Close</button>
        `;
    $('.modal-title').html(modalTilte);
    $('.modal-footer').html(modalFooter);
    $('#btnPopupModal').trigger('click');
}
// Sự kiện đóng modal
$('body').delegate('#btnDongKH', 'click', function () {
    $('#btnDongForm').trigger('click');
    $('.txtF').val("");
    $('.sp-thongbao').css('display', 'none');
});
// Sự kiện thêm khóa học
$('body').delegate("#btnThemKH", "click", function () {
    if (KiemTraNhapMaKhoaHoc(), KiemTraNhapTenKhoaHoc(), KiemTraNhapMoTa(), KiemTraNhapHinhAnh(), KiemTraSoLuotXem()) {
        // Lấy thông ntin từ người dùng nhập vào
        var MaKhoaHoc = $('#MaKhoaHoc').val();
        var TenKhoaHoc = $('#TenKhoaHoc').val();
        var MoTa = CKEDITOR.instances["MoTa"].getData();
        var HinhAnh = $('#HinhAnh').val();
        var LuotXem = $('#LuotXem').val();
        var NguoiTao = getDataFromLocal('LocalAdminObj');
        // Khởi tạo đối tượng Course
        var newCourse = new Course(MaKhoaHoc, TenKhoaHoc, MoTa, HinhAnh, LuotXem, NguoiTao.TaiKhoan);
        courseSV.ThemKhoaHoc(newCourse)
            .done(function (result) {
                console.log(result);
                const toast = swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 2000
                });
                toast({
                    type: 'success',
                    title: 'Thêm Khóa Học Thành Công'
                });
                $('#btnDongForm').trigger('click');
                $('.txtF').val("");
                loadDanhSachKhoaHoc();
                $('#txtTuKhoaKH').val("");
                $('.pagination-course').css('display', 'block');
            })
            .fail(function (error) {
                console.log(error.statusText);
                if (error.statusText == 'Internal Server Error') {
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    toast({
                        type: 'success',
                        title: 'Thêm Khóa Học Thành Công'
                    });
                    $('#btnDongForm').trigger('click');
                    $('.txtF').val("");
                    loadDanhSachKhoaHoc();
                    $('#txtTuKhoaKH').val("");
                    $('.pagination-course').css('display', 'block');
                } else {
                    swal({
                        type: 'error',
                        title: 'Khoan....',
                        text: 'Khóa Học Này Đã Tồn Tại',
                    })
                }
            });
    }
});
// Chỉnh sửa khóa học--------
// Load thông tin lên modal để sửa
$('body').delegate(".btnChinhSuaKH", "click", function () {
    // Clear input
    $('.txtF').val("");
    // Khóa thuộc tính mã khóa học
    $('#MaKhoaHoc').attr("readonly", true);
    var modalTilte = "Chỉnh Sửa Khóa Học";
    var modalFooter = `
        <button id="btnLuuKH" class="btn btn-success">Lưu Khóa Học</button>
        <button id="btnDongKH" class="btn btn-danger">Close</button>
        `;
    $('.modal-title').html(modalTilte);
    $('.modal-footer').html(modalFooter);
    // Load phần nội dung chỉnh sửa lên popup
    var trKhoaHoc = $(this).closest(".trKhoaHoc");
    var MaKhoaHoc = trKhoaHoc.find(".MaKhoaHoc").html().trim();
    var TenKhoaHoc = trKhoaHoc.find(".TenKhoaHoc").html().trim();
    var MoTa = trKhoaHoc.find(".MoTa").html().trim();
    var HinhAnh = trKhoaHoc.find(".HinhAnh").find("img").attr("src");
    var LuotXem = trKhoaHoc.find(".LuotXem").html().trim();
    $('#MaKhoaHoc').val(MaKhoaHoc);
    $('#TenKhoaHoc').val(TenKhoaHoc);
    CKEDITOR.instances["MoTa"].setData(MoTa);
    $('#HinhAnh').val(HinhAnh);
    $('#LuotXem').val(LuotXem);
    // Gọi nút mở modal
    $('#btnPopupModal').trigger('click');
});
// Sự kiện Lưu thông tin đã edit
$('body').delegate("#btnLuuKH", "click", function () {
    if (KiemTraNhapMaKhoaHoc() && KiemTraNhapTenKhoaHoc() && KiemTraNhapMoTa() && KiemTraNhapHinhAnh() && KiemTraSoLuotXem()) {
        var MaKhoaHoc = $('#MaKhoaHoc').val();
        var TenKhoaHoc = $('#TenKhoaHoc').val();
        var MoTa = CKEDITOR.instances["MoTa"].getData(MoTa); // lấy giá trị từ editor
        var HinhAnh = $("#HinhAnh").val();
        var LuotXem = $("#LuotXem").val();
        var NguoiTao = getDataFromLocal('LocalAdminObj');
        //tạo đối tượng khóa học
        var khoaHoc = new Course(MaKhoaHoc, TenKhoaHoc, MoTa, HinhAnh, LuotXem, NguoiTao.TaiKhoan);
        courseSV.CapNhatKhoaHoc(khoaHoc)
            .done(function (result) {
                const toast = swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 2000
                });
                toast({
                    type: 'success',
                    title: 'Cập Nhật Thông Tin Thành Công'
                });
                loadDanhSachKhoaHoc();
                $('#MaKhoaHoc').attr("readonly", false);
                $('#btnDongForm').trigger('click');
                $('#txtTuKhoaKH').val("");
                $('.pagination-course').css('display', 'block');
            }).fail(function (error) {
                swal({
                    type: 'error',
                    title: 'Cập Nhật Thất Bại',
                });
                console.log(error);
            });
    }
});
// Xóa Khóa Học
$('body').delegate("#btnXoaKhoaHoc", "click", function () {
    $('.ckbXoaKH').each(function () {
        if ($(this).is(':checked')) {
            var makhoahoc = $(this).attr('value');
            courseSV.XoaKhoaHoc(makhoahoc)
                .done(function (result) {
                    swal(
                        'Đã Xóa',
                        'Kiểm tra lại, nếu có khóa học nào không xóa được vì khóa học đó đã ghi danh cho người dùng',
                        'success'
                    )
                    loadDanhSachKhoaHoc();
                    $('#txtTuKhoaKH').val("");
                    $('.pagination-course').css('display', 'block');
                })
                .fail(function (error) {
                    swal({
                        type: 'error',
                        title: 'Có khóa học đã ghi danh cho người dùng nên không thể xóa',
                    });
                })
        } else {
            swal({
                type: 'error',
                title: 'Khoan....',
                text: 'Xin hãy check khóa học muốn xóa',
            })
        }
    })
});
//Xóa 1 Khóa Học
$('body').delegate(".btnXoaKhoaHoc", "click", function () {
    var id = $(this).attr("MaKhoaHoc");
    courseSV.XoaKhoaHoc(id)
        .done(function (result) {
            swal(
                'Đã Xóa',
                'Kiểm tra lại, nếu có khóa học nào không xóa được vì khóa học đó đã ghi danh cho người dùng',
                'success'
            )
            loadDanhSachKhoaHoc();
            $('#txtTuKhoaKH').val("");
            $('.pagination-course').css('display', 'block');
        })
        .fail(function (error) {
            swal({
                type: 'error',
                title: 'Có khóa học đã ghi danh cho người dùng nên không thể xóa',
            });

        })
});
// Tìm khóa học
function TimKhoaHocAdmin() {
    var inputTimKhoaHoc = $('#txtTuKhoaKH').val();
    if (inputTimKhoaHoc == "") {
        loadDanhSachKhoaHoc();
        $('.pagination-course').css('display', 'block');
    } else {
        var searchcourseList = courseList.TimKhoaHocTheoMa(inputTimKhoaHoc);
        loadTableDanhSachKhoaHoc(searchcourseList.DSKH);
        $('.pagination-course').css('display', 'none');
    }
}
$('#txtTuKhoaKH').keyup(TimKhoaHocAdmin);
// --------------------------------Ghi Danh Khóa Học--------------------------------------------
function loadDanhSachHocVien() {
    userSV.LayThongTinHocVien()
        .done(function (DSND) {
            // load data table
            userHocVienList.DSND = DSND;
            loadTableDanhSachHocVien(userHocVienList);
            //console.log(DSKH);
        })
        .fail(function (error) {
            console.log(error);

        });
    courseSV.LayDanhSachKhoaHoc()
        .done(function (DSKH) {
            courseList.DSKH = DSKH;
            loadDanhSachKhoaHocDeGhiDanh(courseList);
        }).fail(function (error) {
            console.log(error);
        });
}
// Load dữ liệu lên table
function loadTableDanhSachHocVien(userlist) {
    var noiDung = '';
    for (var i = 0; i < userlist.DSND.length; i++) {
        var nguoiDung = userlist.DSND[i];
        noiDung +=
            `
            <tr class="trNguoiDung">
                <td class="TaiKhoan">${nguoiDung.TaiKhoan}</td>
                <td class="HoTen">${nguoiDung.HoTen}</td>
                <td class="Email">${nguoiDung.Email}</td>
                <td class="SoDT ">${nguoiDung.SoDT}</td>
                <td class="TenLoaiNguoiDung">${nguoiDung.TenLoaiNguoiDung}</td>
                <td><button class="btn btn-danger btnGhiDanhNguoiDung" data-TaiKhoan="${nguoiDung.TaiKhoan}"><i class="fa fa-check"></i></button></td>
            </tr>
           `;
    }
    $('#tblDSND-HV').html(noiDung);
};

function loadDanhSachKhoaHocDeGhiDanh(courseList) {
    var noiDung = '';
    for (var i = 0; i < courseList.DSKH.length; i++) {
        var khoaHoc = courseList.DSKH[i];
        noiDung +=
            `
              <option value='${khoaHoc.MaKhoaHoc}'>${khoaHoc.TenKhoaHoc}</option>
           `;
    }
    $('#KhoaHocGhiDanh').html(noiDung);
};
// Sự kiện đóng modal
$('body').delegate('#btnDongGhiDanh', 'click', function () {
    $('#btnDongForm').trigger('click');
});
//load lên popup chỉnh sửa
$('body').delegate(".btnGhiDanhNguoiDung", "click", function () {
    // Clear dữ liệu textbox
    $('.txtF').val("");
    // Khoa Thuộc tính ma khoa học
    $('#MaKhoaHoc').attr("readonly", true);
    var modalTilte = "Ghi Danh Khóa Học";
    var taiKhoan = $(this).attr("data-TaiKhoan");
    // Tạo nội dung cho modal footer : dùng string template
    var modalFooter = `
        <button id="btnLuuGhiDanh" data-taiKhoan=${taiKhoan} class="btn btn-success">Lưu Ghi Danh</button>
        <button id="btnDongGhiDanh" class="btn btn-danger">Close</button>
        `;
    $('.modal-title').html(modalTilte);
    $('.modal-footer').html(modalFooter);
    $('#btnPopupModal').trigger('click');
});
// Ghi Danh
$('body').delegate('#btnLuuGhiDanh', "click", function () {
    var taiKhoan = $(this).attr('data-taiKhoan');
    var maKhoaHoc = $('#KhoaHocGhiDanh').val();
    courseSV.GhiDanhKhoaHoc(maKhoaHoc, taiKhoan)
        .done(function (result) {
            const toast = swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000
            });
            toast({
                type: 'success',
                title: 'Ghi Danh Thành Công'
            });
        }).fail(function (error) {
            swal({
                type: 'error',
                title: 'Người Dùng đã ghi danh khóa học này',
            });
            console.log(error);
        });
});
// Tìm Học Viên
function TimNguoiDungHocVien() {
    var inputTimNguoiDung = $('#txtTuKhoaGhiDanh').val();
    if (inputTimNguoiDung == "") {
        loadDanhSachHocVien();
    } else {
        var searchuserList = userHocVienList.TimNguoiDungHocVien(inputTimNguoiDung);
        loadTableDanhSachHocVien(searchuserList);
    }
}
// Sự Kiện Tìm Học Viên
$('#txtTuKhoaGhiDanh').keyup(TimNguoiDungHocVien);
// --------------------------------Khi Trình Duyện Load Xong------------------------------------
$(document).ready(function () {
    // User
    checkLoginUser();
    checkLoginAdmin();
    LayUserList();
    // LayCourseList();
    loadThongTin();
    LoadKhoaHocUser();
    if ((window.location.pathname).search('course-detail.html') !== -1) {
        ChiTietKhoaHoc();
    } else if ((window.location.pathname).search('user-list.html') !== -1) {
        loadDanhSachNguoiDung();
    } else if ((window.location.pathname).search('course-list.html') !== -1) {
        loadDanhSachKhoaHoc();
    } else if ((window.location.pathname).search('ghidanh-user.html') !== -1) {
        loadDanhSachHocVien();
    }
});