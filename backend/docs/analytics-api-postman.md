# Analytics Dashboard API - Postman Collection Guide

## Base URL
```
{{base_url}} = http://localhost:3000/api
```

## Authentication
All admin endpoints require Bearer token authentication:
```
Authorization: Bearer {{jwt_token}}
```

## Environment Variables
- `base_url`: http://localhost:3000/api
- `jwt_token`: (auto-set after login)

---

## 1. Event Tracking (Public)

### Track Analytics Event
```http
POST {{base_url}}/analytics/track
Content-Type: application/json

{
  "eventType": "page_view",
  "page": "/projects",
  "resourceId": "project-uuid",
  "metadata": "{\"category\":\"frontend\"}"
}
```

**Event Types:**
- `page_view` - Page visit
- `project_view` - Project detail view
- `resume_download` - Resume download
- `testimonial_submit` - Testimonial submission
- `contact_submit` - Contact form submission
- `tech_stack_view` - Tech stack view
- `skill_filter` - Skill filter usage
- `project_filter` - Project filter usage
- `search_query` - Search query
- `theme_change` - Theme change
- `language_change` - Language change

---

## 2. Admin Analytics Dashboard

### Get Complete Analytics Dashboard
```http
GET {{base_url}}/analytics/dashboard
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "total": {
    "totalPageViews": 15420,
    "uniqueVisitors": 3420,
    "projectViews": 2150,
    "resumeDownloads": 450,
    "testimonialSubmissions": 85,
    "contactSubmissions": 120,
    "techStackViews": 890
  },
  "last30Days": {
    "totalPageViews": 3200,
    "uniqueVisitors": 890,
    "projectViews": 450,
    "resumeDownloads": 95,
    "testimonialSubmissions": 18,
    "contactSubmissions": 25,
    "techStackViews": 180
  },
  "last7Days": {
    "totalPageViews": 850,
    "uniqueVisitors": 240,
    "projectViews": 120,
    "resumeDownloads": 25,
    "testimonialSubmissions": 5,
    "contactSubmissions": 8,
    "techStackViews": 45
  },
  "yesterday": {
    "totalPageViews": 120,
    "uniqueVisitors": 35,
    "projectViews": 18,
    "resumeDownloads": 4,
    "testimonialSubmissions": 1,
    "contactSubmissions": 2,
    "techStackViews": 8
  },
  "today": {
    "totalPageViews": 85,
    "uniqueVisitors": 28,
    "projectViews": 12,
    "resumeDownloads": 3,
    "testimonialSubmissions": 0,
    "contactSubmissions": 1,
    "techStackViews": 5
  },
  "realTime": {
    "currentVisitors": 12,
    "last5MinutesActivity": {
      "totalPageViews": 8,
      "uniqueVisitors": 3,
      "projectViews": 2,
      "resumeDownloads": 1,
      "testimonialSubmissions": 0,
      "contactSubmissions": 0,
      "techStackViews": 1
    },
    "lastHourActivity": {
      "totalPageViews": 45,
      "uniqueVisitors": 15,
      "projectViews": 8,
      "resumeDownloads": 2,
      "testimonialSubmissions": 1,
      "contactSubmissions": 1,
      "techStackViews": 4
    }
  },
  "growth": {
    "visitors": 15,
    "pageViews": 12,
    "downloads": 20,
    "submissions": 8
  }
}
```

### Get Overview Statistics
```http
GET {{base_url}}/analytics/overview?period=7d
Authorization: Bearer {{jwt_token}}
```

**Query Parameters:**
- `period`: 1d, 7d, 30d, 90d, 1y
- `startDate`: Custom start date (ISO string)
- `endDate`: Custom end date (ISO string)

### Get Traffic Statistics
```http
GET {{base_url}}/analytics/traffic?period=7d
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "topPages": [
    { "/projects": 450 },
    { "/": 320 },
    { "/resume": 280 },
    { "/contact": 150 },
    { "/testimonials": 120 }
  ],
  "topReferrers": [
    { "google.com": 250 },
    { "linkedin.com": 180 },
    { "Direct": 150 },
    { "github.com": 90 }
  ],
  "devices": [
    { "desktop": 65 },
    { "mobile": 30 },
    { "tablet": 5 }
  ],
  "browsers": [
    { "chrome": 55 },
    { "safari": 25 },
    { "firefox": 15 },
    { "edge": 5 }
  ]
}
```

### Get Content Statistics
```http
GET {{base_url}}/analytics/content?period=7d
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "topProjects": [
    {
      "project-uuid": {
        "views": 85,
        "title": "E-commerce Platform"
      }
    },
    {
      "project-uuid2": {
        "views": 72,
        "title": "Portfolio Website"
      }
    }
  ]
}
```

### Get Engagement Statistics
```http
GET {{base_url}}/analytics/engagement?period=7d
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "testimonialSubmissions": 5,
  "contactSubmissions": 8,
  "resumeDownloads": 25,
  "themeChanges": 12,
  "languageChanges": 3,
  "totalEngagement": 38
}
```

### Get Technology Statistics
```http
GET {{base_url}}/analytics/technology?period=7d
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "topCategories": [
    { "frontend": 45 },
    { "backend": 32 },
    { "database": 18 },
    { "devops": 12 }
  ]
}
```

### Get Geography Statistics
```http
GET {{base_url}}/analytics/geography?period=7d
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "topCountries": [
    { "United States": 450 },
    { "United Kingdom": 180 },
    { "Germany": 120 },
    { "France": 90 },
    { "Canada": 75 }
  ],
  "topCities": [
    { "New York": 120 },
    { "London": 90 },
    { "San Francisco": 75 },
    { "Berlin": 45 },
    { "Paris": 40 }
  ]
}
```

### Get Trends
```http
GET {{base_url}}/analytics/trends?period=30d
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
[
  {
    "date": "2024-02-01",
    "totalPageViews": 120,
    "uniqueVisitors": 35,
    "projectViews": 18,
    "resumeDownloads": 4,
    "testimonialSubmissions": 1,
    "contactSubmissions": 2,
    "techStackViews": 8
  },
  {
    "date": "2024-02-02",
    "totalPageViews": 135,
    "uniqueVisitors": 38,
    "projectViews": 22,
    "resumeDownloads": 5,
    "testimonialSubmissions": 0,
    "contactSubmissions": 1,
    "techStackViews": 10
  }
]
```

### Get Real-Time Statistics
```http
GET {{base_url}}/analytics/realtime
Authorization: Bearer {{jwt_token}}
```

**Expected Response:**
```json
{
  "currentVisitors": 12,
  "last5MinutesActivity": {
    "totalPageViews": 8,
    "uniqueVisitors": 3,
    "projectViews": 2,
    "resumeDownloads": 1,
    "testimonialSubmissions": 0,
    "contactSubmissions": 0,
    "techStackViews": 1
  },
  "lastHourActivity": {
    "totalPageViews": 45,
    "uniqueVisitors": 15,
    "projectViews": 8,
    "resumeDownloads": 2,
    "testimonialSubmissions": 1,
    "contactSubmissions": 1,
    "techStackViews": 4
  }
}
```

---

## 3. Frontend Integration Examples

### React Analytics Hook
```javascript
const useAnalytics = () => {
  const trackEvent = (eventType, page, resourceId, metadata) => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        page,
        resourceId,
        metadata: JSON.stringify(metadata)
      })
    });
  };

  const trackPageView = (page) => trackEvent('page_view', page);
  const trackProjectView = (projectId) => trackEvent('project_view', '/projects', projectId);
  const trackResumeDownload = () => trackEvent('resume_download', '/resume');
  const trackThemeChange = (theme) => trackEvent('theme_change', '/', null, { theme });

  return { trackPageView, trackProjectView, trackResumeDownload, trackThemeChange };
};
```

### Analytics Dashboard Component
```javascript
const AnalyticsDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch('/api/analytics/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setDashboardData(data);
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (!dashboardData) return <div>Loading...</div>;

  return (
    <div className="analytics-dashboard">
      <div className="overview-cards">
        <div className="card">
          <h3>Total Page Views</h3>
          <p>{dashboardData.total.totalPageViews.toLocaleString()}</p>
          <span className="growth">+{dashboardData.growth.pageViews}%</span>
        </div>
        <div className="card">
          <h3>Unique Visitors</h3>
          <p>{dashboardData.total.uniqueVisitors.toLocaleString()}</p>
          <span className="growth">+{dashboardData.growth.visitors}%</span>
        </div>
        <div className="card">
          <h3>Resume Downloads</h3>
          <p>{dashboardData.total.resumeDownloads}</p>
          <span className="growth">+{dashboardData.growth.downloads}%</span>
        </div>
        <div className="card">
          <h3>Current Visitors</h3>
          <p>{dashboardData.realTime.currentVisitors}</p>
          <span className="live">Live</span>
        </div>
      </div>

      <div className="charts-section">
        <TrafficChart data={dashboardData.traffic} />
        <EngagementChart data={dashboardData.engagement} />
        <GeographyChart data={dashboardData.geography} />
      </div>
    </div>
  );
};
```

### Page View Tracking
```javascript
// Track page views on route change
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTracker = () => {
  const location = useLocation();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
};
```

---

## 4. Expected Status Codes

- **201**: Event tracked successfully
- **200**: Request successful (get analytics)
- **400**: Bad request (invalid event type)
- **401**: Unauthorized (invalid/missing JWT)
- **500**: Internal server error

---

## 5. Analytics Features Summary

### **Tracked Events:**
- ✅ Page views with path tracking
- ✅ Project views with resource ID
- ✅ Resume downloads
- ✅ Testimonial submissions
- ✅ Contact form submissions
- ✅ Tech stack views
- ✅ Theme changes
- ✅ Language changes
- ✅ Search queries
- ✅ Filter usage

### **Dashboard Metrics:**
- ✅ Total page views and unique visitors
- ✅ Project and resume statistics
- ✅ Engagement metrics
- ✅ Traffic sources and referrers
- ✅ Device and browser breakdown
- ✅ Geographic distribution
- ✅ Real-time visitor tracking
- ✅ Growth calculations
- ✅ Trend analysis

### **Data Analysis:**
- ✅ Time-based filtering (1d, 7d, 30d, 90d, 1y)
- ✅ Custom date ranges
- ✅ Top pages and projects
- ✅ Popular content analysis
- ✅ User behavior patterns
- ✅ Conversion tracking

This complete Analytics Dashboard system provides comprehensive website statistics and metrics tracking! 🚀
