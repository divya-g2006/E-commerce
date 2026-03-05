# Production-Ready Full-Stack MERN E-Commerce Application

A complete e-commerce application built with MongoDB, Express, React, and Node.js featuring user authentication, product management, cart functionality, and order processing.

## 🚀 Features

### User Features
- JWT-based authentication (Register/Login)
- Browse products with categories
- Add products to cart
- Update cart quantities
- Remove items from cart
- Place orders
- View order history

### Admin Features
- Add new products
- Edit existing products
- Delete products
- View all orders
- Update order status (Pending, Shipped, Delivered)
- Role-based access control

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📁 Project Structure

```
E-Commerce/
├── backend/
│   ├── config/
│   │   └── database.js           # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── productController.js  # Product CRUD
│   │   ├── cartController.js     # Cart operations
│   │   └── orderController.js    # Order management
│   ├── middleware/
│   │   └── auth.js               # Authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Product.js            # Product schema
│   │   ├── Cart.js               # Cart schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── products.js           # Product routes
│   │   ├── cart.js               # Cart routes
│   │   └── orders.js             # Order routes
│   ├── scripts/
│   │   └── seed.js               # Database seeding
│   ├── server.js                 # Main server file
│   └── package.json
└── project/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.tsx
    │   │   ├── ProductList.tsx
    │   │   ├── Cart.tsx
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── AdminPanel.tsx
    │   │   ├── ProtectedRoute.tsx
    │   │   └── AdminRoute.tsx
    │   ├── pages/
    │   │   ├── ProductDetails.tsx
    │   │   └── Orders.tsx
    │   ├── contexts/
    │   │   └── AuthContext.tsx
    │   ├── lib/
    │   │   └── api.ts
    │   └── App.tsx
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-Commerce
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment file for backend**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```
   This will create sample products and an admin user:
   - Admin Email: `admin@shop.com`
   - Admin Password: `admin123`

5. **Start the backend server**
   ```bash
   npm run dev
   ```

6. **Frontend Setup**
   ```bash
   cd ../project
   npm install
   ```

7. **Create environment file for frontend**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

8. **Start the frontend development server**
   ```bash
   npm run dev
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000 (root endpoint)

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders` - Get user orders
- `GET /api/orders/all` - Get all orders (admin only)
- `PUT /api/orders/:id` - Update order status (admin only)

## 🎨 UI Theme

- **Primary Color**: White (#FFFFFF)
- **Secondary Color**: Purple (#7C3AED)
- **Design**: Modern, Minimal, Elegant
- **Responsive**: Fully responsive design
- **Transitions**: Smooth animations and transitions

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based authorization (user/admin)
- Protected routes and API endpoints
- Input validation and sanitization
- CORS configuration

## 🛒 Default Admin Account

After seeding the database, you can login with:
- **Email**: admin@shop.com
- **Password**: admin123

## 📝 Notes

- The homepage UI is already completed and should not be modified
- The application uses MongoDB for data persistence
- All images are fetched from URLs (no local image storage)
- The cart is stored in the database and persists across sessions
- Order processing automatically updates product stock

## 🐛 Troubleshooting

1. **Database Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file

2. **CORS Issues**
   - Verify FRONTEND_URL in backend .env matches your frontend URL
   - Ensure both servers are running on correct ports

3. **Authentication Issues**
   - Check JWT_SECRET is set in backend .env
   - Verify tokens are being stored in localStorage

4. **Port Conflicts**
   - Backend defaults to port 5000
   - Frontend defaults to port 5173
   - Change ports in .env files if needed

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.
