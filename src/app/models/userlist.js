export function UserList() {
    this.DSND = [];
    this.TimNguoiDung = function (taikhoan) {
        var searchUserList = new UserList();
        var searchName = taikhoan.trim().toLowerCase();
        for (var i = 0; i < this.DSND.length; i++) {
            if (this.DSND[i].TaiKhoan.trim().toLowerCase().search(searchName) !== -1) {
                searchUserList.DSND.push(this.DSND[i]);
            }
        }
        return searchUserList;
    };
    this.TimNguoiDungHocVien = function (taikhoan) {
        var searchUserList = new UserList();
        var searchName = taikhoan.trim().toLowerCase();
        for (var i = 0; i < this.DSND.length; i++) {
            if ((this.DSND[i].TaiKhoan.trim().toLowerCase().search(searchName) !== -1) && (this.DSND[i].MaLoaiNguoiDung === 'HV')) {
                searchUserList.DSND.push(this.DSND[i]);
            }
        }
        return searchUserList;
    };
}