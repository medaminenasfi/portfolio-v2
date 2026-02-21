# Testimonials API - Postman Collection Guide

## Base URL
```
{{base_url}} = http://localhost:3000/api
```

## Authentication
All admin endpoints (except public ones) require Bearer token authentication:
```
Authorization: Bearer {{jwt_token}}
```

## Environment Variables
- `base_url`: http://localhost:3000/api
- `jwt_token`: (auto-set after login)
- `testimonial_id`: (auto-set after creation)

---

## 1. Authentication

### Login
```http
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "username": "amine",
  "password": "admin123"
}
```

**Tests Tab (Auto-save token):**
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.collectionVariables.set('jwt_token', response.access_token);
    console.log('✅ JWT Token saved');
}
```

---

## 2. Public Testimonial Submission (No Auth Required)

### Submit Testimonial
```http
POST {{base_url}}/testimonials
Content-Type: application/json

{
  "clientName": "John Smith",
  "company": "Tech Solutions Inc.",
  "position": "CEO",
  "email": "john@techsolutions.com",
  "rating": 5,
  "comment": "Amazing work! The project was delivered on time and exceeded our expectations. The attention to detail and communication throughout the process was outstanding."
}
```

**Expected Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "clientName": "John Smith",
  "company": "Tech Solutions Inc.",
  "position": "CEO",
  "email": "john@techsolutions.com",
  "rating": 5,
  "comment": "Amazing work! The project was delivered on time and exceeded our expectations. The attention to detail and communication throughout the process was outstanding.",
  "status": "pending",
  "createdAt": "2024-02-21T04:00:00.000Z",
  "updatedAt": "2024-02-21T04:00:00.000Z"
}
```

**Tests Tab (Save testimonial ID):**
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.collectionVariables.set('testimonial_id', response.id);
    console.log('✅ Testimonial created with ID:', response.id);
}
```

---

## 3. Admin CRUD Operations

### Get All Testimonials (Admin)
```http
GET {{base_url}}/testimonials?page=1&limit=10&status=pending
Authorization: Bearer {{jwt_token}}
```

**Query Parameters:**
- `status`: pending | approved | rejected
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `rating`: Filter by rating (1-5)
- `search`: Search in client name
- `sortBy`: createdAt | rating | clientName
- `sortOrder`: ASC | DESC

**Expected Response:**
```json
{
  "testimonials": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "clientName": "John Smith",
      "company": "Tech Solutions Inc.",
      "position": "CEO",
      "email": "john@techsolutions.com",
      "rating": 5,
      "comment": "Amazing work! The project was delivered on time...",
      "status": "pending",
      "adminNotes": null,
      "approvedAt": null,
      "rejectedAt": null,
      "createdAt": "2024-02-21T04:00:00.000Z",
      "updatedAt": "2024-02-21T04:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

### Get Single Testimonial (Admin)
```http
GET {{base_url}}/testimonials/{{testimonial_id}}
Authorization: Bearer {{jwt_token}}
```

### Update Testimonial (Admin)
```http
PATCH {{base_url}}/testimonials/{{testimonial_id}}
Content-Type: application/json
Authorization: Bearer {{jwt_token}}

{
  "clientName": "John Smith (Updated)",
  "company": "Tech Solutions Inc. (Updated)",
  "comment": "Amazing work! The project was delivered on time and exceeded our expectations. (Updated)"
}
```

### Approve Testimonial (Admin)
```http
PATCH {{base_url}}/testimonials/{{testimonial_id}}/approve
Content-Type: application/json
Authorization: Bearer {{jwt_token}}

{
  "adminNotes": "Approved for public display - excellent feedback"
}
```

**Expected Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "clientName": "John Smith",
  "status": "approved",
  "adminNotes": "Approved for public display - excellent feedback",
  "approvedAt": "2024-02-21T04:05:00.000Z",
  "updatedAt": "2024-02-21T04:05:00.000Z"
}
```

### Reject Testimonial (Admin)
```http
PATCH {{base_url}}/testimonials/{{testimonial_id}}/reject
Content-Type: application/json
Authorization: Bearer {{jwt_token}}

{
  "adminNotes": "Rejected - contains inappropriate content"
}
```

### Delete Testimonial (Admin)
```http
DELETE {{base_url}}/testimonials/{{testimonial_id}}
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "message": "Testimonial deleted successfully"
}
```

---

## 4. Bulk Operations (Admin)

### Bulk Update Status
```http
PATCH {{base_url}}/testimonials/bulk/status
Content-Type: application/json
Authorization: Bearer {{jwt_token}}

{
  "testimonialIds": ["{{testimonial_id}}", "another-id"],
  "status": "approved",
  "adminNotes": "Bulk approved for display"
}
```

### Bulk Delete
```http
DELETE {{base_url}}/testimonials/bulk/delete
Content-Type: application/json
Authorization: Bearer {{jwt_token}}

{
  "testimonialIds": ["{{testimonial_id}}", "another-id"]
}
```

---

## 5. Statistics (Admin)

### Get Testimonials Statistics
```http
GET {{base_url}}/testimonials/statistics
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "total": 25,
  "approved": 18,
  "pending": 5,
  "rejected": 2,
  "averageRating": 4.5,
  "ratingDistribution": {
    "1": 1,
    "2": 1,
    "3": 3,
    "4": 7,
    "5": 14
  }
}
```

---

## 6. Public Endpoints (No Auth Required)

### Get Approved Testimonials
```http
GET {{base_url}}/public/testimonials?limit=10
```

**Expected Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "clientName": "John Smith",
    "company": "Tech Solutions Inc.",
    "position": "CEO",
    "rating": 5,
    "comment": "Amazing work! The project was delivered on time and exceeded our expectations...",
    "approvedAt": "2024-02-21T04:05:00.000Z",
    "createdAt": "2024-02-21T04:00:00.000Z"
  }
]
```

---

## 7. Complete Testing Sequence

Execute in this order:

1. **Login** → Get JWT token
2. **Submit Testimonial** (Public) → Create testimonial
3. **Get All Testimonials** (Admin) → Verify creation
4. **Approve Testimonial** (Admin) → Make it public
5. **Get Statistics** (Admin) → Check data
6. **Get Approved Testimonials** (Public) → Verify public display
7. **Update Testimonial** (Admin) → Test editing
8. **Reject Testimonial** (Admin) → Test rejection
9. **Bulk Operations** (Admin) → Test batch actions
10. **Delete Testimonial** (Admin) → Clean up

---

## 8. Test Data Examples

### 5-Star Testimonial
```json
{
  "clientName": "Sarah Johnson",
  "company": "Digital Agency",
  "position": "Project Manager",
  "email": "sarah@digitalagency.com",
  "rating": 5,
  "comment": "Exceptional work! The team delivered beyond our expectations and the communication was perfect throughout the project."
}
```

### 4-Star Testimonial
```json
{
  "clientName": "Mike Chen",
  "company": "StartupCo",
  "position": "CTO",
  "rating": 4,
  "comment": "Great work overall. The project was delivered on time with high quality. Minor delays but communication was good."
}
```

### 3-Star Testimonial
```json
{
  "clientName": "Emily Davis",
  "company": "Retail Business",
  "rating": 3,
  "comment": "Good work but there were some challenges with timeline. The final result was satisfactory though."
}
```

---

## 9. Expected Status Codes

- **201**: Testimonial created successfully
- **200**: Request successful (get, update, approve, reject)
- **204**: Delete successful
- **400**: Bad request (validation errors)
- **401**: Unauthorized (invalid/missing JWT)
- **404**: Testimonial not found
- **500**: Internal server error

---

## 10. Common Testing Scenarios

### Testimonial Workflow
1. Client submits testimonial → Status: `pending`
2. Admin reviews → Status: `approved` or `rejected`
3. Approved testimonials appear on public endpoint
4. Rejected testimonials remain hidden

### Rating System
- Clients can rate 1-5 stars
- Average rating calculated from approved testimonials
- Rating distribution shows breakdown by star count

### Admin Features
- View all testimonials with filtering
- Edit testimonial content (fix typos)
- Add admin notes for rejections
- Bulk approve/reject/delete
- View comprehensive statistics

This complete system provides a professional testimonial management workflow with full CRUD operations! 🚀
