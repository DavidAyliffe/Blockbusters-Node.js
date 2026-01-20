## 🎬 Blockbusters API

A Node.js + Express REST API backed by a MySQL database, designed to support a Swift client application.  
The API provides full CRUD (Create, Read, Update, Delete) access to the Blockbusters database and is secured using JWT authentication.

---

## 🚀 Features

- RESTful API design
- MySQL database connection using `mysql2`
- JWT-based authentication
- Full CRUD for:
  - Films
  - Actors
  - Genres
  - Rentals
  - Customers
  - Movie–Actor relationships
- Environment-based configuration using `.env`
- Designed to be consumed by a Swift client app

---

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **MySQL**
- **mysql2**
- **jsonwebtoken (JWT)**
- **dotenv**
- **PM2** (optional, for production)

---

## 📁 Project Structure

```text
blockbusters-api/
├── server.js
├── db.js
├── .env
├── auth/
│   └── auth.js
├── middleware/
│   ├── authenticateToken.js
│   └── authorizeRole.js
├── routes/
│   └── *.js
├── controllers/
│   └── *.js
├── services/
│   └── *.js
└── package.json
```
## ⚙️ Installation

1️⃣ Clone the repository
```
git clone https://github.com/DavidAyliffe/Blockbusters-Node.js
cd blockbusters-api
```

2️⃣ Install dependencies
```text
npm install
npm install morgan
npm install bcrypt
npm install jsonwebtoken
npm install dotenv
```
## 🔐 Environment Variables
Create a .env file in the project root:
```text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=blockbusters
PORT=3000
JWT_SECRET=supersecretkey
```
⚠️ Never commit .env to version control.

## ▶️ Running the Server
Development
```text
node server.js
```

Production (recommended)
```
pm2 delete blockbusters-api
pm2 start server.js --name blockbusters-api
pm2 logs blockbusters-api
```
## 🔑 Authentication
```text
Login
POST /api/auth/login
Request body
{
  "email": "admin@example.com",
  "password": "password"
}

Response
{
  "token": "<JWT token>"
}
Include the token in all protected routes:

Authorization: Bearer <token>
```
## 📚 API Endpoints
```text
Actor
GET    /api/actors
GET    /api/actors/:id
POST   /api/actors
PUT    /api/actors/:id
DELETE /api/actors/:id

Customer
GET    /api/customers
GET    /api/customers/:id
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id

Film
GET    /api/film
GET    /api/film/:id
POST   /api/film
PUT    /api/film/:id
DELETE /api/film/:id

Payment
GET    /api/payment
GET    /api/payment/:id
POST   /api/payment
PUT    /api/payment/:id
DELETE /api/payment/:id

Rental
GET    /api/rentals
GET    /api/rentals/:id
POST   /api/rentals
PUT    /api/rentals/:id
DELETE /api/rentals/:id

Staff
GET    /api/staff
GET    /api/staff/:id
POST   /api/staff
PUT    /api/staff/:id
DELETE /api/staff/:id

Store
GET    /api/store
GET    /api/store/:id
POST   /api/store
PUT    /api/store/:id
DELETE /api/store/:id
```
## 🍎 Swift Client Notes
All endpoints return JSON
JWT must be stored securely (e.g. Keychain)
Dates are returned as ISO 8601 strings
IDs are integers matching MySQL primary keys

## 🧪 Testing
```
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student1@gmail.com","password":"password123"}'
```  
## 🧠 Design Principles
Explicit SQL (no generic “magic” CRUD)
Clear separation of:
 1. routes
 2. controllers
 3. services

Secure by default
Easy to extend for role-based permissions
Suitable for teaching REST and client–server architecture

## 🔧 Future Improvements
User accounts stored in MySQL
Password hashing with bcrypt
Role-based access control (staff / customer / admin)
Pagination & filtering
OpenAPI / Swagger documentation

## 📜 License
This project is intended for educational use.
