// Simple API test
const API_BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  try {
    console.log('Testing API connection...');
    
    // Test login
    console.log('1. Testing login...');
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@portfolio.com',
        password: 'password'
      })
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login successful:', loginData);
      
      // Test dashboard
      console.log('2. Testing dashboard...');
      const dashboardResponse = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
        headers: { 'Authorization': `Bearer ${loginData.token}` }
      });
      
      if (dashboardResponse.ok) {
        const dashboardData = await dashboardResponse.json();
        console.log('✅ Dashboard data:', dashboardData);
      } else {
        console.log('❌ Dashboard failed:', dashboardResponse.status);
      }
      
      // Test projects
      console.log('3. Testing projects...');
      const projectsResponse = await fetch(`${API_BASE_URL}/projects`, {
        headers: { 'Authorization': `Bearer ${loginData.token}` }
      });
      
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        console.log('✅ Projects data:', projectsData);
      } else {
        console.log('❌ Projects failed:', projectsResponse.status);
      }
      
    } else {
      console.log('❌ Login failed:', loginResponse.status);
      const errorData = await loginResponse.json();
      console.log('Error:', errorData);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPI();
