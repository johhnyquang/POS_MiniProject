# POS_MiniProject

## 1. Mô tả
Hệ thống bán hàng (POS) đơn giản gồm:
- Màn hình bán hàng (POS Screen)
- Màn hình hiển thị đơn hàng realtime

Backend sử dụng **ASP.NET Core + SignalR**  
Frontend sử dụng **React Function Component (Vite)**

---

## 2. Chức năng chính

### POS Screen
- Hiển thị danh sách sản phẩm
- Thêm sản phẩm vào giỏ hàng
- Tính tổng tiền
- Thanh toán
- Sau khi thanh toán:
  - Lưu đơn hàng
  - Push realtime đơn hàng qua SignalR
  - Clear giỏ hàng

### Realtime Screen
- Hiển thị danh sách đơn hàng
- Tự động cập nhật realtime (không reload)
- Mỗi đơn hàng gồm:
  - Mã đơn
  - Tổng tiền
  - Thời gian thanh toán

---

## 3. Tech Stack

### Backend
- ASP.NET Core Web API
- SignalR
- In-memory data (SeedData)

### Frontend
- React Function Component
- Vite
- SignalR client

### DevOps
- Docker
- HTTPS (Dev certificate)

---

## 4. Cấu trúc thư mục

```txt
root
 ├── backend
 │   ├── Controllers
 │   ├── Services
 │   ├── Hubs
 │   ├── Models
 │   ├── DTOs
 │   ├── Dockerfile
 │   └── POS_Backend.csproj
 ├── frontend
 │   ├── src
 │   │   ├── components
 │   │   ├── services
 │   │   └── App.jsx
 │   ├── Dockerfile
 │   └── package.json
 └── docker-compose.yml
```

---

## 5. Chạy Backend (Local – không Docker)
```bash
cd back_end\POS_Backend\POS_Backend
dotnet run --launch-profile https
```

---

## 6. Chạy Frontend (Local – không Docker)
```bash
cd front_end\POS_Frontend
npm install
npm run dev
```
