# Backend API Documentation

## Overview
The MediShop Backend is a RESTful API built with Node.js, Express, and MongoDB. It handles authentication, medicine management, and order processing.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📝 Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /auth/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### 2. Login User
**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### 3. Get Current User
**Endpoint:** `GET /auth/me`

**Headers:** 
- Authorization: Bearer {token}

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "+91 9876543210",
    "city": "Delhi",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 💊 Medicines Endpoints

### 1. Get All Medicines (with Filters)
**Endpoint:** `GET /medicines`

**Query Parameters:**
- `search` - Search by name or description
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)

**Example:**
```
GET /medicines?search=aspirin&category=Pain%20Relief&minPrice=100&maxPrice=500&page=1
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Aspirin 500mg",
      "description": "Pain reliever",
      "category": "Pain Relief",
      "dosage": "500mg",
      "manufacturer": "PharmaCorp",
      "price": 120,
      "stock": 150,
      "rating": 4.5,
      "image": "https://example.com/image.jpg"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "pages": 3
  }
}
```

---

### 2. Get Single Medicine
**Endpoint:** `GET /medicines/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Aspirin 500mg",
    "description": "Effective pain reliever and anti-inflammatory",
    "category": "Pain Relief",
    "dosage": "500mg",
    "manufacturer": "PharmaCorp",
    "price": 120,
    "stock": 150,
    "sideEffects": ["Nausea", "Dizziness"],
    "warnings": ["Consult doctor if allergic"],
    "suitableFor": ["Headaches", "Body pain"],
    "rating": 4.5,
    "reviews": [
      {
        "user": "John D.",
        "comment": "Great product!",
        "rating": 5,
        "date": "2024-01-15T10:30:00.000Z"
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 3. Get All Categories
**Endpoint:** `GET /medicines/categories/all`

**Response:**
```json
{
  "success": true,
  "data": [
    "Pain Relief",
    "Diabetes",
    "Heart Care",
    "Cold & Cough",
    "Vitamins",
    "Skin Care",
    "Digestive",
    "Other"
  ]
}
```

---

### 4. Create Medicine (Admin Only)
**Endpoint:** `POST /medicines`

**Headers:** 
- Authorization: Bearer {admin_token}

**Request:**
```json
{
  "name": "New Medicine",
  "description": "Description of the medicine",
  "category": "Pain Relief",
  "dosage": "500mg",
  "manufacturer": "PharmaCorp",
  "price": 150,
  "stock": 100,
  "sideEffects": ["Nausea"],
  "warnings": ["Consult doctor"],
  "suitableFor": ["Headaches"],
  "image": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "New Medicine",
    ...
  }
}
```

---

### 5. Update Medicine (Admin Only)
**Endpoint:** `PUT /medicines/:id`

**Headers:** 
- Authorization: Bearer {admin_token}

**Request:**
```json
{
  "price": 200,
  "stock": 50
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Aspirin 500mg",
    "price": 200,
    "stock": 50,
    ...
  }
}
```

---

### 6. Delete Medicine (Admin Only)
**Endpoint:** `DELETE /medicines/:id`

**Headers:** 
- Authorization: Bearer {admin_token}

**Response:**
```json
{
  "success": true,
  "data": {},
  "message": "Medicine deleted successfully"
}
```

---

## 🛒 Orders Endpoints

### 1. Create Order
**Endpoint:** `POST /orders`

**Headers:** 
- Authorization: Bearer {user_token}

**Request:**
```json
{
  "medicines": [
    {
      "medicineId": "507f1f77bcf86cd799439011",
      "quantity": 2
    },
    {
      "medicineId": "507f1f77bcf86cd799439012",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Delhi",
    "postalCode": "110001",
    "country": "India"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "userId": "507f1f77bcf86cd799439011",
    "medicines": [
      {
        "medicineId": "507f1f77bcf86cd799439011",
        "name": "Aspirin 500mg",
        "price": 120,
        "quantity": 2
      }
    ],
    "totalPrice": 240,
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Delhi",
      "postalCode": "110001",
      "country": "India"
    },
    "status": "pending",
    "paymentStatus": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. Get User Orders
**Endpoint:** `GET /orders`

**Headers:** 
- Authorization: Bearer {user_token}

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "userId": "507f1f77bcf86cd799439011",
      "medicines": [...],
      "totalPrice": 240,
      "status": "shipped",
      "paymentStatus": "completed",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Get Single Order
**Endpoint:** `GET /orders/:id`

**Headers:** 
- Authorization: Bearer {user_token}

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    ...
  }
}
```

---

### 4. Update Order Status (Admin Only)
**Endpoint:** `PUT /orders/:id`

**Headers:** 
- Authorization: Bearer {admin_token}

**Request:**
```json
{
  "status": "shipped",
  "paymentStatus": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "shipped",
    "paymentStatus": "completed",
    ...
  }
}
```

---

### 5. Get All Orders (Admin Only)
**Endpoint:** `GET /orders/admin/all`

**Headers:** 
- Authorization: Bearer {admin_token}

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      ...
    }
  ]
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (Admin access required)
- `404` - Not Found
- `500` - Server Error

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Medicines
```bash
curl http://localhost:5000/api/medicines?category=Pain%20Relief&limit=5
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "medicines": [
      {"medicineId": "MEDICINE_ID", "quantity": 2}
    ],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Delhi",
      "postalCode": "110001",
      "country": "India"
    }
  }'
```

---

## Rate Limiting
Currently, no rate limiting is implemented. For production, consider adding rate limiting middleware.

## Pagination
- Default limit: 12 items per page
- Maximum limit: 100 items per page
- Page numbering starts from 1

## Response Format
All responses are in JSON format with the following structure:
```json
{
  "success": true/false,
  "data": {...},
  "message": "Optional message",
  "pagination": {...}
}
```

---

For more information, refer to the main README.md file.
