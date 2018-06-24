export function CourseList() {
    this.DSKH = [];
    this.AddCourse = function (course) {
        this.DSKH.push(course);
    };
    // Tím Khóa Học theo tên
    this.TimKhoaHoc = function (tenkhoahoc) {
        var searchCourseList = new CourseList();
        var searchName = tenkhoahoc.trim().toLowerCase();
        for (var i = 0; i < this.DSKH.length; i++) {
            if (this.DSKH[i].TenKhoaHoc.trim().toLowerCase().search(searchName) !== -1) {
                searchCourseList.DSKH.push(this.DSKH[i]);
            }
        }
        return searchCourseList;
    }
    this.TimKhoaHocTheoMa = function (makhoahoc) {
        var searchCourseList = new CourseList();
        var searchId = makhoahoc.trim().toLowerCase();
        for (var i = 0; i < this.DSKH.length; i++) {
            if (this.DSKH[i].MaKhoaHoc.trim().toLowerCase().search(searchId) !== -1) {
                searchCourseList.DSKH.push(this.DSKH[i]);
            }
        }
        return searchCourseList;
    }
}