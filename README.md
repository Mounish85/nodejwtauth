# 🔐 Node.js JWT Authentication API

A secure and production-ready **User Authentication REST API** built with **Node.js, Express.js, MongoDB, and JSON Web Tokens (JWT)**.

This project demonstrates how modern backend authentication works — from user registration and password hashing to JWT-based authorization and protected API routes.

---

## ✨ Features

* 👤 User Registration
* 🔑 Secure Login
* 🔐 JWT Authentication
* 🛡️ Protected Routes
* 🔒 Password Hashing with bcrypt
* 🚪 Logout Support
* 👮 Authentication Middleware
* 📧 Email-based user identity
* ⚡ RESTful API Architecture
* 🌍 CORS Configuration
* 🧱 Environment Variable Configuration
* ❌ Centralized Error Handling
* 📦 Modular Project Structure

---

## 🛠️ Tech Stack

| Technology    | Purpose                        |
| ------------- | ------------------------------ |
| 🟢 Node.js    | JavaScript Runtime             |
| 🚂 Express.js | Backend Framework              |
| 🍃 MongoDB    | Database                       |
| 🐻 Mongoose   | MongoDB ODM                    |
| 🔐 JWT        | Authentication & Authorization |
| 🔒 bcrypt     | Password Hashing               |
| 🌐 CORS       | Cross-Origin Resource Sharing  |
| ⚙️ dotenv     | Environment Configuration      |
| 📮 Postman    | API Testing                    |

---

# 🏗️ Project Architecture

```text
node-auth-jwt/
│
├── 📁 controllers/
│   └── authController.js
│
├── 📁 middleware/
│   └── authMiddleware.js
│
├── 📁 models/
│   └── User.js
│
├── 📁 routes/
│   └── authRoutes.js
│
├── 📁 config/
│   └── db.js
│
├── 📁 utils/
│   └── generateToken.js
│
├── 📄 .env
├── 📄 .gitignore
├── 📄 package.json
├── 📄 server.js
└── 📄 README.md
```

---

# 🔄 Authentication Flow

```text
                    ┌───────────────┐
                    │     Client    │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  Express API  │
                    └───────┬───────┘
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
        📝 Register                    🔑 Login
             │                             │
             ▼                             ▼
       Hash Password                 Verify Password
             │                             │
             └──────────────┬──────────────┘
                            ▼
                     Generate JWT
                            │
                            ▼
                  Return Authentication
                         Token
                            │
                            ▼
                 ┌────────────────────┐
                 │ Protected Endpoint │
                 └─────────┬──────────┘
                           │
                           ▼
                  Verify JWT Token
                           │
                    ┌──────┴──────┐
                    │             │
                 Valid          Invalid
                    │             │
                    ▼             ▼
                 Allow          Reject
                 Request        Request
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project:

```bash
cd node-auth-jwt
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_jwt_key

JWT_EXPIRES_IN=1d
```

> ⚠️ Never commit your `.env` file to GitHub.

Add it to `.gitignore`:

```gitignore
node_modules/
.env
```

---

# ▶️ Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The API will run on:

```text
http://localhost:5000
```

---

# 📡 API Endpoints

## 🔐 Authentication

### Register User

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Alex Morgan",
  "email": "morgan@example.com",
  "password": "Password@123"
}
```

### Response

```json
{
  "message": "User registered successfully"
}
```

---

## 🔑 Login

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "morgan@example.com",
  "password": "Password@123"
}
```

### Response

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

The returned JWT can then be used to access protected routes.

---

# 🛡️ Protected Routes

Protected endpoints require a valid JWT.

Include the token in the request header:

```http
Authorization: Bearer <JWT_TOKEN>
```

Example:

```http
GET /api/auth/profile
```

Header:

```text
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The authentication middleware:

```text
Request
   ↓
Extract JWT
   ↓
Verify JWT
   ↓
Valid?
 ┌─┴─┐
Yes  No
 ↓    ↓
Allow 401
 ↓
Controller
```

---

# 🔒 Password Security

Passwords are **never stored as plain text**.

During registration:

```text
User Password
      ↓
    bcrypt
      ↓
Hashed Password
      ↓
   MongoDB
```

During login:

```text
Entered Password
       ↓
     bcrypt
       ↓
Compare with Hash
       ↓
   Match?
   /    \
 Yes     No
 ↓       ↓
JWT     Reject
```

This protects users even if the database is compromised.

---

# 🎟️ JWT Authentication

After successful login, the server generates a JSON Web Token.

Conceptually:

```text
User Credentials
      ↓
 Authentication
      ↓
 Generate JWT
      ↓
 Return Token
      ↓
 Client Stores Token
      ↓
 Send Token with Requests
      ↓
 Server Verifies Token
```

A JWT typically contains:

```json
{
  "id": "user_id",
  "iat": 1234567890,
  "exp": 1234654290
}
```

The server uses the token to identify the authenticated user without requiring the user to log in for every request.

---

# 🧩 Middleware

Authentication middleware protects private routes.

Example:

```javascript
const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};
```

Then use it on protected routes:

```javascript
router.get("/profile", protect, getProfile);
```

---

# 🧪 Testing with Postman

You can test the API using **Postman**.

### Register

```text
POST
/api/auth/register
```

### Login

```text
POST
/api/auth/login
```

### Access Protected Route

```text
GET
/api/auth/profile
```

Add:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

# 📊 API Summary

| Method | Endpoint             | Authentication | Purpose           |
| ------ | -------------------- | -------------- | ----------------- |
| POST   | `/api/auth/register` | ❌              | Create account    |
| POST   | `/api/auth/login`    | ❌              | Authenticate user |
| GET    | `/api/auth/profile`  | ✅              | Get user profile  |
| POST   | `/api/auth/logout`   | ✅              | Logout user       |

> Update these routes if your implementation uses different endpoint names.

---

# 🛡️ Security Practices

This project follows several important backend security practices:

* 🔒 Passwords are hashed using bcrypt
* 🎟️ JWT secrets are stored in environment variables
* 🚫 `.env` is excluded from Git
* 🛡️ Protected routes use authentication middleware
* ❌ Invalid credentials are rejected
* ❌ Invalid or expired JWTs are rejected
* 🌐 CORS is configured for controlled frontend access
* 🔐 Sensitive configuration is not hardcoded

---

# ⚙️ Environment Variables

| Variable         | Description               |
| ---------------- | ------------------------- |
| `PORT`           | Server port               |
| `MONGO_URI`      | MongoDB connection string |
| `JWT_SECRET`     | Secret used to sign JWTs  |
| `JWT_EXPIRES_IN` | JWT expiration duration   |

---

# 📈 Future Improvements

The project can be extended with:

* 📧 Email verification
* 🔄 Refresh tokens
* 🔁 Forgot password
* 📩 Password reset emails
* 👮 Role-based authorization
* 🚫 Rate limiting
* 🛡️ Helmet security headers
* 📋 Request validation
* 🧪 Automated testing
* 🐳 Docker support
* ☁️ Cloud deployment
* 📊 Authentication logging

---

# 🎯 Learning Outcomes

By building this project, you learn:

* How REST APIs work
* How Express.js handles requests
* How middleware works
* How callbacks and asynchronous functions work
* How Promises and `async/await` are used
* How passwords should be securely stored
* How JWT authentication works
* How protected routes are implemented
* How MongoDB integrates with Node.js
* How environment variables protect secrets
* How frontend applications communicate with backend APIs

---

# 📁 Example Request Flow

```text
Frontend
   │
   │ POST /api/auth/login
   ▼
Express Router
   │
   ▼
Auth Controller
   │
   ├── Find User
   │
   ├── Compare Password
   │
   └── Generate JWT
   │
   ▼
MongoDB
   │
   ▼
JWT Token
   │
   ▼
Frontend
   │
   │ Authorization: Bearer <token>
   ▼
Protected Route
   │
   ▼
JWT Middleware
   │
   ├── Verify Token
   │
   └── Attach User
   │
   ▼
Controller
   │
   ▼
Response
```

---

# 🌟 Project Goal

The goal of this project is to build a **secure, scalable, and maintainable authentication backend** while understanding the fundamentals of modern Node.js authentication and authorization.

---

## 👨‍💻 Author

**Devireddy Mounish Reddy**

Built with ❤️ using **Node.js + Express.js + MongoDB + JWT**

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
