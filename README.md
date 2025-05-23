# 📦 Back-end_ExpressJS-MongoDB

Back-end Template sử dụng **ExpressJS** + **MongoDB** – cấu trúc rõ ràng, dễ mở rộng, phù hợp cho các dự án Node.js backend.

---

## 🛠️ Technology Stack

| Technology                                                                                                     | Description                    |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)     | JavaScript runtime for backend |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | Minimalist web framework       |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)       | NoSQL document database        |
| ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)       | API documentation and testing  |

## 📂 Project Structure

```
📁 Back-end_ExpressJS-MongoDB
│
├── 📁 node_modules/ # Thư mục chứa các package đã cài
│
├── 📁 src/ # Source code chính
│ ├── 📁 config/ # Cấu hình app, DB, environment, swagger
│ ├── 📁 controllers/ # Xử lý request, response
│ ├── 📁 middlewares/ # Middleware custom
│ ├── 📁 models/ # Định nghĩa schema MongoDB
│ ├── 📁 routes/ # Định nghĩa các route API
│ ├── 📁 services/ # Business logic
│ ├── 📁 utils/ # Các hàm tiện ích dùng chung
│ ├── 📁 validations/ # Validate dữ liệu đầu vào
│ └── 📄 server.js # Entry point chạy server
│
├── 📄 .babelrc # Cấu hình Babel
├── 📄 .env # Biến môi trường (bảo mật)
├── 📄 .env.example # Mẫu file `.env` để setup
├── 📄 .eslintrc.cjs # Cấu hình ESLint
├── 📄 .gitignore # File/folder không được push lên Git
├── 📄 .prettierrc # Cấu hình Prettier
├── 📄 jsconfig.json # Hỗ trợ alias path
├── 📄 LICENSE # Giấy phép mã nguồn
├── 📄 package.json # Thông tin dự án và dependencies
├── 📄 package-lock.json # Khóa version chính xác
├── 📄 settings.json # Cài đặt riêng cho môi trường dev
└── 📄 README.md # Tài liệu hướng dẫn sử dụng
```

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/hukhoa/Back-end_ExpressJS-MongoDB.git
```

2. Install dependencies:

```bash
npm i
```

or

```bash
# Khởi tạo project
npm init -y

# Cài dependencies chính
npm install express dotenv mongodb joi http-status-codes async-exit-hook

# Cài Babel runtime
npm install @babel/runtime

# Cài các dev dependencies
npm install -D @babel/core @babel/cli @babel/node @babel/preset-env @babel/plugin-transform-runtime @babel/eslint-parser babel-plugin-module-resolver eslint nodemon

# Cài swagger để tạo tài liệu API
npm install swagger-jsdoc swagger-ui-express

```

3. Set up database

🔹 Cách 1: MongoDB Local

- Cài đặt MongoDB tại: https://www.mongodb.com/try/download/community
- Sau khi cài, khởi động MongoDB trên cổng mặc định 27017.

```bash
MONGODB_URI='mongodb://localhost:27017'
DATABASE_NAME='your_local_db_name'
```

🔹 Cách 2: MongoDB Cloud (Atlas)

- Tạo tài khoản tại https://cloud.mongodb.com
- Tạo cluster → Database → User - Vào Connect > Connect your application để lấy URI kết nối.

```bash
MONGODB_URI='mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority'
DATABASE_NAME='your_cloud_db_name'
```

4. Config .env

```bash
AUTHOR=''
MONGODB_URI='mongodb://localhost:27017'
DATABASE_NAME='your_db_name'
HOST='localhost'
PORT='8080'
```

5. Run the application:

```bash
npm run dev
```

6. Server và Swagger UI

- Server sẽ chạy ở địa chỉ:

```bash
    http://localhost:8080/
```

- Swagger UI để xem tài liệu API truy cập tại:

```bash
    http://localhost:8080/api-docs/
```
