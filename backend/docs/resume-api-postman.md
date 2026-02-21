# Resume/CV Management API - Postman Collection Guide

## Base URL
```
{{base_url}} = http://localhost:3000/api
```

## Authentication
Admin endpoints require Bearer token authentication:
```
Authorization: Bearer {{jwt_token}}
```

## Environment Variables
- `base_url`: http://localhost:3000/api
- `jwt_token`: (auto-set after login)
- `resume_id`: (auto-set after upload)

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

## 2. Public Endpoints (No Auth Required)

### Get Current Resume Info
```http
GET {{base_url}}/resume/current
```

**Expected Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "filename": "resume-abc123.pdf",
  "originalName": "John_Doe_Resume_2024.pdf",
  "mimeType": "application/pdf",
  "size": 245760,
  "title": "John Doe - Full Stack Developer",
  "description": "Experienced full stack developer with 5+ years of expertise",
  "isActive": true,
  "createdAt": "2024-02-21T04:30:00.000Z",
  "updatedAt": "2024-02-21T04:30:00.000Z"
}
```

### Download Current Resume
```http
GET {{base_url}}/resume/download
```

**Response:** PDF file download (attachment)

### Preview Resume (Inline)
```http
GET {{base_url}}/resume/serve
```

**Response:** PDF file display (inline in browser)

---

## 3. Admin Operations (JWT Authentication Required)

### Upload New Resume
```http
POST {{base_url}}/resume/upload
Authorization: Bearer {{jwt_token}}
Content-Type: multipart/form-data

file: [select PDF file]
title: "John Doe - Senior Developer Resume 2024"
description: "Updated resume with latest projects and skills"
```

**Expected Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "filename": "abc123-def456.pdf",
  "originalName": "John_Doe_Resume_2024.pdf",
  "mimeType": "application/pdf",
  "size": 245760,
  "filePath": "/uploads/resume/abc123-def456.pdf",
  "title": "John Doe - Senior Developer Resume 2024",
  "description": "Updated resume with latest projects and skills",
  "isActive": true,
  "createdAt": "2024-02-21T04:30:00.000Z",
  "updatedAt": "2024-02-21T04:30:00.000Z"
}
```

**Tests Tab (Save resume ID):**
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.collectionVariables.set('resume_id', response.id);
    console.log('✅ Resume uploaded with ID:', response.id);
}
```

### Get All Resumes (Admin)
```http
GET {{base_url}}/resume
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "filename": "abc123-def456.pdf",
    "originalName": "John_Doe_Resume_2024.pdf",
    "mimeType": "application/pdf",
    "size": 245760,
    "title": "John Doe - Senior Developer Resume 2024",
    "description": "Updated resume with latest projects and skills",
    "isActive": true,
    "createdAt": "2024-02-21T04:30:00.000Z",
    "updatedAt": "2024-02-21T04:30:00.000Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "filename": "old-resume.pdf",
    "originalName": "John_Doe_Resume_2023.pdf",
    "mimeType": "application/pdf",
    "size": 204800,
    "title": "John Doe - Developer Resume 2023",
    "description": "Previous version of resume",
    "isActive": false,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Specific Resume Info (Admin)
```http
GET {{base_url}}/resume/{{resume_id}}
Authorization: Bearer {{jwt_token}}
```

### Download Specific Resume (Admin)
```http
GET {{base_url}}/resume/{{resume_id}}/download
Authorization: Bearer {{jwt_token}}
```

### Update Resume Metadata (Admin)
```http
PATCH {{base_url}}/resume/{{resume_id}}
Content-Type: application/json
Authorization: Bearer {{jwt_token}}

{
  "title": "Updated Resume Title",
  "description": "Updated description with more details",
  "isActive": true
}
```

### Delete Resume (Admin)
```http
DELETE {{base_url}}/resume/{{resume_id}}
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "message": "Resume deleted successfully"
}
```

---

## 4. File Upload Requirements

### Supported File Types
- ✅ PDF files only (.pdf)

### File Size Limits
- ✅ Maximum 10MB per file

### File Naming
- ✅ Automatic UUID generation for unique filenames
- ✅ Original filename preserved for downloads

### Storage Location
- ✅ Files stored in `/uploads/resume/` directory
- ✅ Automatic directory creation if not exists

---

## 5. Complete Testing Sequence

Execute in this order:

1. **Login** → Get JWT token
2. **Get Current Resume Info** → Check if any resume exists
3. **Upload New Resume** → Upload PDF file
4. **Get All Resumes** → Verify upload and see all versions
5. **Download Resume** → Test file download
6. **Preview Resume** → Test inline display
7. **Update Resume Metadata** → Test title/description changes
8. **Delete Old Resume** → Clean up old versions
9. **Public Access Test** → Verify public endpoints work without auth

---

## 6. Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "message": "Only PDF files are allowed"
}
```

**400 Bad Request:**
```json
{
  "message": "File size must be less than 10MB"
}
```

**401 Unauthorized:**
```json
{
  "message": "Unauthorized"
}
```

**404 Not Found:**
```json
{
  "message": "Resume not found"
}
```

**404 Not Found:**
```json
{
  "message": "Resume file not found on server"
}
```

---

## 7. Frontend Integration Examples

### React/JavaScript Download Button
```javascript
const downloadResume = async () => {
  try {
    const response = await fetch('{{base_url}}/resume/download');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Download failed:', error);
  }
};
```

### React/JavaScript Preview (iframe)
```javascript
const previewResume = () => {
  window.open('{{base_url}}/resume/serve', '_blank');
};
```

### React/JavaScript Upload (Admin)
```javascript
const uploadResume = async (file, title, description) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);

  try {
    const response = await fetch('{{base_url}}/resume/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      },
      body: formData
    });
    
    const result = await response.json();
    console.log('Upload successful:', result);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

---

## 8. Security Features

### File Validation
- ✅ PDF file type validation
- ✅ File size limits (10MB)
- ✅ Malicious file prevention

### Access Control
- ✅ Public download/preview endpoints
- ✅ Admin-only upload/delete operations
- ✅ JWT authentication for admin functions

### File Management
- ✅ Automatic old resume deactivation
- ✅ Unique filename generation
- ✅ Secure file storage

---

## 9. Expected Status Codes

- **201**: Resume uploaded successfully
- **200**: Request successful (get, update, download)
- **204**: Delete successful
- **400**: Bad request (invalid file, size too large)
- **401**: Unauthorized (invalid/missing JWT)
- **404**: Resume not found
- **500**: Internal server error

This complete resume management system provides secure PDF upload/download functionality with proper access control! 🚀
