# Contact Form Management API - Postman Collection Guide

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
- `message_id`: (auto-set after creation)

---

## 1. Public Contact Form Submission

### Submit Contact Message (No Auth Required)
```http
POST {{base_url}}/contact
Content-Type: multipart/form-data

name: John Smith
email: john@example.com
phone: +1234567890
category: freelance
company: Tech Solutions Inc.
budgetRange: $5000-$10000
deadline: 2024-12-31
subject: Web Development Project
message: I need a full-stack web application for my business...
attachment: [optional file upload]
```

**Expected Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+1234567890",
  "category": "freelance",
  "company": "Tech Solutions Inc.",
  "budgetRange": "$5000-$10000",
  "deadline": "2024-12-31T00:00:00.000Z",
  "subject": "Web Development Project",
  "message": "I need a full-stack web application for my business...",
  "attachment": "/uploads/contact/document.pdf",
  "status": "new",
  "isRead": false,
  "leadStatus": "none",
  "internalNotes": null,
  "adminReply": null,
  "repliedAt": null,
  "autoReplySent": false,
  "metadata": {
    "userAgent": "Mozilla/5.0...",
    "ip": "192.168.1.100",
    "referrer": "https://google.com",
    "source": "https://myportfolio.com"
  },
  "createdAt": "2024-02-21T04:50:00.000Z",
  "updatedAt": "2024-02-21T04:50:00.000Z"
}
```

---

## 2. Admin Contact Management

### Get All Messages (Admin)
```http
GET {{base_url}}/contact?page=1&limit=10&status=new&isRead=false
Authorization: Bearer {{jwt_token}}
```

**Query Parameters:**
- `status`: new | in_progress | replied | closed
- `leadStatus`: none | lead | qualified | converted
- `category`: job | freelance | partnership | question
- `isRead`: true | false
- `search`: Search in name, email, subject, message
- `startDate`: Filter messages from date
- `endDate`: Filter messages to date
- `sortBy`: createdAt, status, category
- `sortOrder`: ASC | DESC
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Expected Response:**
```json
{
  "messages": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "John Smith",
      "email": "john@example.com",
      "category": "freelance",
      "subject": "Web Development Project",
      "status": "new",
      "isRead": false,
      "leadStatus": "none",
      "createdAt": "2024-02-21T04:50:00.000Z"
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 10,
  "totalPages": 2
}
```

### Get Message Statistics (Admin)
```http
GET {{base_url}}/contact/statistics
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "total": 25,
  "unread": 8,
  "byStatus": {
    "new": 8,
    "in_progress": 5,
    "replied": 10,
    "closed": 2
  },
  "byCategory": {
    "freelance": 12,
    "job": 5,
    "partnership": 4,
    "question": 4
  },
  "byLeadStatus": {
    "none": 15,
    "lead": 7,
    "qualified": 2,
    "converted": 1
  },
  "recentMessages": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "John Smith",
      "subject": "Web Development Project",
      "createdAt": "2024-02-21T04:50:00.000Z"
    }
  ]
}
```

### Get Unread Count (Admin)
```http
GET {{base_url}}/contact/unread-count
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "count": 8
}
```

### Search Messages (Admin)
```http
GET {{base_url}}/contact/search?q=web%20development
Authorization: Bearer {{jwt_token}}
```

### Get Single Message (Admin)
```http
GET {{base_url}}/contact/{{message_id}}
Authorization: Bearer {{jwt_token}}
```

---

## 3. Message Status Management

### Mark as Read/Unread
```http
PATCH {{base_url}}/contact/{{message_id}}/mark-read
Authorization: Bearer {{jwt_token}}
```

```http
PATCH {{base_url}}/contact/{{message_id}}/mark-unread
Authorization: Bearer {{jwt_token}}
```

### Update Message Status (Admin)
```http
PATCH {{base_url}}/contact/{{message_id}}
Authorization: Bearer {{jwt_token}}
Content-Type: application/json

{
  "status": "in_progress",
  "internalNotes": "Client needs full-stack web application",
  "adminReply": "Thank you for your inquiry. I'll review your requirements and get back to you soon."
}
```

**Status Workflow:**
- `new` → `in_progress` → `replied` → `closed`

---

## 4. Lead Conversion

### Convert to Lead (Admin)
```http
PATCH {{base_url}}/contact/bulk/convert-to-lead
Authorization: Bearer {{jwt_token}}
Content-Type: application/json

{
  "messageIds": ["{{message_id}}", "another-id"],
  "leadNotes": "High-value client, needs full-stack development",
  "followUpDate": "2024-02-25T10:00:00.000Z"
}
```

**Expected Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "leadStatus": "lead",
    "status": "in_progress",
    "internalNotes": "High-value client, needs full-stack development"
  }
]
```

### Update Lead Status (Admin)
```http
PATCH {{base_url}}/contact/bulk/lead-status
Authorization: Bearer {{jwt_token}}
Content-Type: application/json

{
  "messageIds": ["{{message_id}}"],
  "leadStatus": "qualified",
  "internalNotes": "Client budget confirmed, ready to start"
}
```

**Lead Status Workflow:**
- `none` → `lead` → `qualified` → `converted`

---

## 5. Bulk Operations

### Bulk Update Status
```http
PATCH {{base_url}}/contact/bulk/status
Authorization: Bearer {{jwt_token}}
Content-Type: application/json

{
  "messageIds": ["{{message_id}}", "another-id"],
  "status": "closed",
  "internalNotes": "Bulk close completed projects"
}
```

### Bulk Delete
```http
DELETE {{base_url}}/contact/bulk/delete
Authorization: Bearer {{jwt_token}}
Content-Type: application/json

{
  "messageIds": ["{{message_id}}", "another-id"]
}
```

---

## 6. File Upload Support

### Upload Attachment with Message
```http
POST {{base_url}}/contact
Content-Type: multipart/form-data

name: John Smith
email: john@example.com
category: job
subject: Job Application
message: I'm applying for the full-stack developer position...
attachment: [select PDF/DOC file]
```

**Supported File Types:**
- PDF documents
- Word documents (.doc, .docx)
- Text files (.txt)
- Images (.jpg, .png, .gif)
- Maximum size: 10MB

---

## 7. Complete Testing Sequence

Execute in this order:

1. **Login** → Get JWT token
2. **Submit Contact Form** → Create message (public)
3. **Get Statistics** → Check unread count
4. **Get All Messages** → View inbox
5. **Mark as Read** → Update status
6. **Update Message** → Add admin reply
7. **Convert to Lead** → Change lead status
8. **Search Messages** → Test search functionality
9. **Bulk Operations** → Test bulk updates
10. **Delete Messages** → Clean up

---

## 8. Frontend Integration Examples

### React Contact Form Component
```javascript
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'freelance',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataObj
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', category: 'freelance', subject: '', message: '' });
      }
    } catch (error) {
      alert('Error sending message');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} required />
      <input name="email" type="email" value={formData.email} onChange={handleChange} required />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="freelance">Freelance</option>
        <option value="job">Job</option>
        <option value="partnership">Partnership</option>
        <option value="question">Question</option>
      </select>
      <input name="subject" value={formData.subject} onChange={handleChange} required />
      <textarea name="message" value={formData.message} onChange={handleChange} required />
      <button type="submit">Send Message</button>
    </form>
  );
};
```

### Admin Dashboard Component
```javascript
const AdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchMessages();
    fetchUnreadCount();
  }, []);

  const fetchMessages = async () => {
    const response = await fetch('/api/contact', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setMessages(data.messages);
  };

  const markAsRead = async (messageId) => {
    await fetch(`/api/contact/${messageId}/mark-read`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchMessages();
    fetchUnreadCount();
  };

  return (
    <div>
      <h2>Inbox ({unreadCount} unread)</h2>
      {messages.map(message => (
        <div key={message.id} className={message.isRead ? 'read' : 'unread'}>
          <h3>{message.subject}</h3>
          <p>From: {message.name} ({message.email})</p>
          <p>Category: {message.category}</p>
          <p>Status: {message.status}</p>
          <button onClick={() => markAsRead(message.id)}>
            Mark as Read
          </button>
        </div>
      ))}
    </div>
  );
};
```

---

## 9. Expected Status Codes

- **201**: Message created successfully
- **200**: Request successful (get, update, mark read/unread)
- **204**: Delete successful
- **400**: Bad request (validation errors)
- **401**: Unauthorized (invalid/missing JWT)
- **404**: Message not found
- **500**: Internal server error

---

## 10. CRM Features Summary

### **Public Features:**
- ✅ Contact form with categories
- ✅ Budget range and deadline options
- ✅ File attachment support
- ✅ Auto-reply confirmation

### **Admin Features:**
- ✅ View all messages with filtering
- ✅ Read/unread status management
- ✅ Status workflow (New → In Progress → Replied → Closed)
- ✅ Lead conversion system
- ✅ Internal notes and replies
- ✅ Bulk operations
- ✅ Search functionality
- ✅ Statistics dashboard
- ✅ Unread counter badge

This complete Contact Form Management system provides full CRM functionality with lead conversion capabilities! 🚀
