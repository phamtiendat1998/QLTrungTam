// Lưu User vào LocalStorage
export function SaveLocalStorage(userLocal,localName) {
    var localObj = JSON.stringify(userLocal);
    localStorage.setItem(localName, localObj);
}

// Kiểm Tra xem trong LocalStorage có User Nào Không
export function CheckExistLocal(localName) {
    var localObj = localStorage.getItem(localName);
    if (localObj !== null) {
        return true;
    }
    return false;
}

// Lấy dữ liệu từ LocalStorage ra
export function getDataFromLocal(localName) {
    return JSON.parse(localStorage.getItem(localName));
}

// Xóa dữ liệu từ LocalStorage
export function delDataFromLocal(localName) {
    localStorage.removeItem(localName);
}