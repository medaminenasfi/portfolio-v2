# Projects Management API - Postman Collection

## Base URL
```
{{base_url}} = http://localhost:3000/api
```

## Authentication
All endpoints (except public ones) require Bearer token authentication:
```
Authorization: Bearer {{jwt_token}}
```

Alternative accepted headers:
```
Authorization: {{jwt_token}}
x-access-token: {{jwt_token}}
```

## 1. Authentication

### Login
```http
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

## 2. Projects CRUD Operations

### Create Project
```http
POST {{base_url}}/projects
Content-Type: application/json

{
  "title": "E-commerce Platform",
  "description": "A full-featured e-commerce platform built with modern technologies",
  "shortSummary": "Modern e-commerce solution with real-time inventory management",
  "problem": "Small businesses needed an affordable, scalable e-commerce solution",
  "solution": "Built a modular platform with customizable features and payment integrations",
  "role": "Full-stack Developer & Team Lead",
  "highlights": [
    "Real-time inventory management",
    "Multiple payment gateway integration",
    "Responsive design with mobile-first approach",
    "Admin dashboard with analytics",
    "SEO optimization",
    "Progressive Web App features"
  ],
  "results": "Increased client sales by 45%, reduced cart abandonment by 30%",
  "difficulty": "medium",
  "clientType": "freelance",
  "liveDemoUrl": "https://demo.example.com",
  "githubRepoUrl": "https://github.com/user/ecommerce-platform",
  "techStack": ["React", "Node.js", "MongoDB", "Stripe", "Docker"],
  "category": "full_stack",
  "status": "draft",
  "progressStatus": "completed",
  "isFeatured": true,
  "seoData": {
    "metaTitle": "E-commerce Platform - Modern Online Store Solution",
    "metaDescription": "A scalable e-commerce platform with real-time inventory and payment processing",
    "keywords": ["e-commerce", "online store", "react", "node.js"]
  }
}
```

### Get All Projects (with pagination and filtering)
```http
GET {{base_url}}/projects?page=1&limit=10&sortBy=createdAt&sortOrder=DESC
```

#### Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `search`: Search in title, description, shortSummary
- `category`: web | mobile | desktop | full_stack
- `status`: draft | published | archived
- `progressStatus`: completed | in_progress
- `difficulty`: simple | medium | hard
- `featured`: true | false
- `tech`: Filter by technology
- `sortBy`: createdAt | updatedAt | title | category
- `sortOrder`: ASC | DESC

### Search Projects Example
```http
GET {{base_url}}/projects?search=e-commerce&category=full_stack&status=published&featured=true
```

### Get Project by ID
```http
GET {{base_url}}/projects/{{project_id}}
```

### Update Project
```http
PATCH {{base_url}}/projects/{{project_id}}
Content-Type: application/json

{
  "title": "E-commerce Platform (Updated)",
  "status": "published",
  "isFeatured": true
}
```

### Delete Project
```http
DELETE {{base_url}}/projects/{{project_id}}
```

### Duplicate Project
```http
POST {{base_url}}/projects/{{project_id}}/duplicate
```

## 3. Bulk Operations

### Bulk Publish/Unpublish/Archive
```http
PATCH {{base_url}}/projects/bulk/publish
Content-Type: application/json

{
  "projectIds": ["{{project_id}}", "another-project-id"],
  "status": "published"
}
```

### Bulk Feature/Unfeature
```http
PATCH {{base_url}}/projects/bulk/feature
Content-Type: application/json

{
  "projectIds": ["{{project_id}}"],
  "isFeatured": true
}
```

### Bulk Delete
```http
DELETE {{base_url}}/projects/bulk/delete
Content-Type: application/json

{
  "projectIds": ["project-id-to-delete"]
}
```

## 4. Media Management

### Upload Project Image/Video
```http
POST {{base_url}}/projects/{{project_id}}/media
Content-Type: multipart/form-data

file: [image/video file]
```

#### Supported formats:
- Images: jpeg, jpg, png, gif, webp
- Videos: mp4, avi, mov
- Max file size: 50MB

### Update Media Order (Drag & Drop)
```http
PATCH {{base_url}}/projects/{{project_id}}/media/order
Content-Type: application/json

[
  {"id": "media-id-1", "order": 0},
  {"id": "media-id-2", "order": 1}
]
```

### Set Cover Image
```http
PATCH {{base_url}}/projects/{{project_id}}/cover-image
Content-Type: application/json

{
  "mediaId": "media-id-to-set-as-cover"
}
```

### Delete Media
```http
DELETE {{base_url}}/projects/media/{{media_id}}
```

## 5. Statistics & Analytics

### Get Project Statistics
```http
GET {{base_url}}/projects/statistics
```

#### Response:
```json
{
  "total": 25,
  "published": 18,
  "draft": 5,
  "archived": 2,
  "featured": 8,
  "completed": 20,
  "inProgress": 5,
  "byCategory": {
    "web": 10,
    "mobile": 8,
    "desktop": 3,
    "full_stack": 4
  },
  "byDifficulty": {
    "simple": 5,
    "medium": 15,
    "hard": 5
  }
}
```

## 6. Public Endpoints (No Authentication Required)

### Get All Published Projects
```http
GET {{base_url}}/public/projects
```

**Query Parameters (Optional):**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search in title and description
- `category`: Filter by category (web, mobile, desktop, full_stack)
- `sortBy`: Sort field (createdAt, updatedAt, title)
- `sortOrder`: Sort direction (ASC, DESC)

### Get Featured Projects
```http
GET {{base_url}}/public/projects/featured
```

**Query Parameters:** Same as above

### Get Projects by Category
```http
GET {{base_url}}/public/projects/by-category/{{category}}
```

**Path Parameters:**
- `category`: Project category (web, mobile, desktop, full_stack)

**Query Parameters:** Same as above

**Expected Response:**
```json
{
  "projects": [
    {
      "id": "uuid-here",
      "title": "E-commerce Platform",
      "description": "A comprehensive e-commerce solution...",
      "shortSummary": "Modern online store with payment processing",
      "category": "full_stack",
      "status": "published",
      "isFeatured": true,
      "techStack": ["React", "Node.js", "MongoDB"],
      "liveDemoUrl": "https://demo.example.com",
      "githubRepoUrl": "https://github.com/user/ecommerce",
      "createdAt": "2024-02-21T02:55:00.000Z",
      "media": []
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

## 7. Project Status Workflow

### Draft → Published
```http
PATCH {{base_url}}/projects/{{project_id}}
Content-Type: application/json

{
  "status": "published"
}
```

### Published → Archived
```http
PATCH {{base_url}}/projects/{{project_id}}
Content-Type: application/json

{
  "status": "archived"
}
```

### Scheduled Publishing
```http
PATCH {{base_url}}/projects/{{project_id}}
Content-Type: application/json

{
  "status": "draft",
  "scheduledPublishAt": "2024-12-31T23:59:59.000Z"
}
```

## 8. Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "property": "title",
      "constraints": {
        "isLength": "Title must be between 1 and 255 characters"
      }
    }
  ]
}
```

### 404 Not Found
```json
{
  "message": "Project with ID {{project_id}} not found"
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 500 Internal Server Error
```json
{
  "message": "Failed to create project"
}
```

## 9. Testing Tips

1. **First login** to get JWT token
2. **Create a project** to get a project ID
3. **Upload media** to test media management
4. **Test bulk operations** with multiple project IDs
5. **Check statistics** to verify data integrity
6. **Test public endpoints** without authentication

## 10. Postman Variables

Set these variables in Postman:
- `base_url`: http://localhost:3000
- `jwt_token`: Automatically set after login
- `project_id`: Automatically set after project creation
- `media_id`: Manually set after media upload

## 11. File Upload Testing

For testing file uploads:
1. Use Postman's form-data body type
2. Select file type for the 'file' key
3. Test with different image formats and sizes
4. Verify file appears in uploads/projects directory
