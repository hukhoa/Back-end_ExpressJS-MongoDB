/**
 * Class ApiError kế thừa class Error sẵn (Best Practice vì class Error nó là class built-in sẵn)
 * statusCode : Http Status code
 * message: Lỗi thông báo
 */

// Gọi tới hàm khởi tạo của class Error (class cha) để còn dùng this
class ApiError extends Error {
  constructor(statusCode, message) {
    // Thằng cha (Error) có property message rồi nên gọi nó luôn trong super cho gọn
    super(message)

    // Tên của cái custom Error - nếu không set thì mặc định nó sẽ kế thừa là "Error"
    this.name = 'ApiError'

    // Gán thêm http status code
    this.statusCode = statusCode

    // Hiện thị vị trí lỗi -> debug
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
