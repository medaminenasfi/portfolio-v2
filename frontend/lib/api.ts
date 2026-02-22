// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// API Client with authentication
export class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('admin_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add authorization header if token exists
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
      mode: 'cors', // Explicitly set CORS mode
      credentials: 'omit', // Don't send credentials for cross-origin
    };

    try {
      console.log(`API Request: ${options.method || 'GET'} ${url}`);
      const response = await fetch(url, config);
      console.log(`API Response: ${response.status} ${response.statusText}`);
      
      // Handle 401 Unauthorized
      if (response.status === 401) {
        this.clearToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw new Error('Unauthorized - Please login again');
      }

      // Handle other HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        console.error('API Error:', errorMessage);
        console.error('Full error response:', errorData);
        console.error('Response status:', response.status);
        console.error('Response headers:', response.headers);
        throw new Error(errorMessage);
      }

      // Handle empty responses (like 204 No Content)
      const text = await response.text();
      if (!text) {
        return {} as T;
      }
      
      const data = JSON.parse(text);
      console.log('API Data:', data);
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error - Unable to connect to the server. Please check if the backend is running.');
      }
      
      throw error;
    }
  }

  // Auth endpoints
  async login(username: string, password: string) {
    const response = await this.request<{ 
      message: string; 
      username: string; 
      access_token: string;
    }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }
    );
    
    if (response.access_token) {
      this.setToken(response.access_token);
      return {
        success: true,
        token: response.access_token,
        user: { id: '1', username: response.username, role: 'admin' }
      };
    }
    
    return { success: false };
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Projects endpoints
  async getProjects(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/projects${query}`);
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`);
  }

  async createProject(projectData: any) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(id: string, projectData: any) {
    return this.request(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(projectData),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  async duplicateProject(id: string) {
    return this.request(`/projects/${id}/duplicate`, {
      method: 'POST',
    });
  }

  async bulkPublishProjects(projectIds: string[], publish: boolean) {
    return this.request('/projects/bulk/publish', {
      method: 'PATCH',
      body: JSON.stringify({ 
        projectIds, 
        status: publish ? 'published' : 'draft' 
      }),
    });
  }

  async bulkDeleteProjects(projectIds: string[]) {
    return this.request('/projects/bulk/delete', {
      method: 'DELETE',
      body: JSON.stringify({ projectIds }),
    });
  }

  async bulkFeatureProjects(projectIds: string[], featured: boolean) {
    return this.request('/projects/bulk/feature', {
      method: 'PATCH',
      body: JSON.stringify({ projectIds, featured }),
    });
  }

  async uploadProjectMedia(projectId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request(`/projects/${projectId}/media`, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async updateProjectMediaOrder(projectId: string, mediaOrders: { id: string; order: number }[]) {
    return this.request(`/projects/${projectId}/media/order`, {
      method: 'PATCH',
      body: JSON.stringify(mediaOrders),
    });
  }

  async deleteProjectMedia(mediaId: string) {
    return this.request(`/projects/media/${mediaId}`, {
      method: 'DELETE',
    });
  }

  async setProjectCoverImage(projectId: string, mediaId: string) {
    return this.request(`/projects/${projectId}/cover-image`, {
      method: 'PATCH',
      body: JSON.stringify({ mediaId }),
    });
  }

  // Testimonials endpoints
  async getTestimonials(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/testimonials${query}`);
  }

  async createTestimonial(data: any) {
    return this.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id: string, data: any) {
    return this.request(`/testimonials/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async approveTestimonial(id: string) {
    return this.request(`/testimonials/${id}/approve`, {
      method: 'PATCH',
    });
  }

  async rejectTestimonial(id: string, adminNotes?: string) {
    return this.request(`/testimonials/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ adminNotes }),
    });
  }

  async deleteTestimonial(id: string) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Resume endpoints
  async getResumes() {
    return this.request('/resume');
  }

  async uploadResume(file: File, metadata: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', metadata.title);
    formData.append('description', metadata.description);

    const url = `${this.baseURL}/resume/upload`;
    const headers: Record<string, string> = {};

    // Add authorization header if token exists
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    console.log('Upload attempt - File:', file.name, 'Size:', file.size, 'Type:', file.type);
    console.log('Upload URL:', url);
    console.log('Has token:', !!this.token);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers,
      mode: 'cors',
      credentials: 'omit',
    });

    console.log(`API Request: POST ${url}`);
    console.log(`API Response: ${response.status} ${response.statusText}`);

    // Handle 401 Unauthorized
    if (response.status === 401) {
      this.clearToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Unauthorized - Please login again');
    }

    // Handle other HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      console.error('API Error:', errorMessage);
      console.error('Full error response:', errorData);
      console.error('Response status:', response.status);
      throw new Error(errorMessage);
    }

    // Handle successful response
    const text = await response.text();
    if (!text) {
      return {} as any;
    }

    return JSON.parse(text);
  }

  async updateResume(id: string, metadata: any) {
    return this.request(`/resume/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(metadata),
    });
  }

  async deleteResume(id: string) {
    return this.request(`/resume/${id}`, {
      method: 'DELETE',
    });
  }

  // Resume Sections endpoints
  async getWorkExperience() {
    return this.request('/resume-sections/work-experience');
  }

  async getEducation() {
    return this.request('/resume-sections/education');
  }

  async getCertifications() {
    return this.request('/resume-sections/certifications');
  }

  async getLanguages() {
    return this.request('/resume-sections/languages');
  }

  async createWorkExperience(data: any) {
    return this.request('/resume-sections/work-experience', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateWorkExperience(id: string, data: any) {
    return this.request(`/resume-sections/work-experience/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteWorkExperience(id: string) {
    return this.request(`/resume-sections/work-experience/${id}`, {
      method: 'DELETE',
    });
  }

  // Tech Stack endpoints
  async getTechStack(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/tech-stack${query}`);
  }

  async createTechStack(data: any) {
    return this.request('/tech-stack', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTechStack(id: string, data: any) {
    return this.request(`/tech-stack/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteTechStack(id: string) {
    return this.request(`/tech-stack/${id}`, {
      method: 'DELETE',
    });
  }

  async uploadTechIcon(file: File) {
    const formData = new FormData();
    formData.append('icon', file);

    return this.request('/tech-stack/upload-icon', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  // Contact endpoints
  async getContactMessages(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/contact${query}`);
  }

  async updateContactMessage(id: string, data: any) {
    return this.request(`/contact/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteContactMessage(id: string) {
    return this.request(`/contact/${id}`, {
      method: 'DELETE',
    });
  }

  async getContactStats() {
    return this.request('/contact/stats');
  }

  async getUnreadCount() {
    return this.request('/contact/unread-count');
  }

  // Analytics endpoints
  async getDashboardStats() {
    return this.request('/analytics/dashboard');
  }

  async getOverviewStats(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/analytics/overview${query}`);
  }

  async getTrafficStats(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/analytics/traffic${query}`);
  }

  async getContentStats(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/analytics/content${query}`);
  }

  async getEngagementStats(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/analytics/engagement${query}`);
  }

  async getGeographyStats(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/analytics/geography${query}`);
  }

  async getTrends(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/analytics/trends${query}`);
  }

  async getRealTimeStats() {
    return this.request('/analytics/realtime');
  }

  async trackEvent(eventData: any) {
    return this.request('/analytics/track', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  // Public endpoints (no auth required)
  async getPublicProjects(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/public/projects${query}`);
  }

  async getPublicTestimonials() {
    return this.request('/public/testimonials');
  }

  async getCurrentResumeInfo() {
    try {
      const url = `${this.baseURL}/resume/current`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add authorization header if token exists
      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        headers,
        mode: 'cors',
        credentials: 'omit',
      });
      
      // Handle 404 specifically for no resume found
      if (response.status === 404) {
        return null;
      }
      
      // Handle other HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }
      
      // Handle successful response
      const text = await response.text();
      if (!text) {
        return null;
      }
      
      return JSON.parse(text);
    } catch (error) {
      // Handle any other errors
      if (error instanceof Error && error.message.includes('not found')) {
        return null;
      }
      throw error;
    }
  }

  async getPublicTechStack(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/public/tech-stack${query}`);
  }

  async getPublicResumeSections() {
    return this.request('/public/resume-sections');
  }

  // Skills endpoints
  async getSkills(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/resume-sections/skills${query}`);
  }

  async createSkill(skillData: any) {
    return this.request('/resume-sections/skills', {
      method: 'POST',
      body: JSON.stringify(skillData),
    });
  }

  async updateSkill(id: string, skillData: any) {
    return this.request(`/resume-sections/skills/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(skillData),
    });
  }

  async deleteSkill(id: string) {
    return this.request(`/resume-sections/skills/${id}`, {
      method: 'DELETE',
    });
  }

  async reorderSkills(reorderData: { ids: string[]; orderIndexes: number[] }) {
    return this.request('/resume-sections/skills/reorder', {
      method: 'PATCH',
      body: JSON.stringify(reorderData),
    });
  }

  async uploadSkillPhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}/resume-sections/skills/upload-photo`;
    const headers: Record<string, string> = {};

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers,
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response.json();
  }

  async submitContactForm(data: any) {
    return this.request('/public/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async submitTestimonial(data: any) {
    return this.request('/public/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Create and export API client instance
export const api = new ApiClient();

// Export types for TypeScript
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}
