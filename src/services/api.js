const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

// Generic fetch wrapper with error handling
async function fetchApi(endpoint, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('REACT_APP_BACKEND_URL not set');
  }
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Services API
export const servicesApi = {
  getAll: () => fetchApi('/services'),
  getById: (id) => fetchApi(`/services/${id}`),
};

// Subscriptions API
export const subscriptionsApi = {
  getAll: () => fetchApi('/subscriptions'),
  getById: (id) => fetchApi(`/subscriptions/${id}`),
};

// Masters API
export const mastersApi = {
  getAll: () => fetchApi('/masters'),
  getById: (id) => fetchApi(`/masters/${id}`),
};

// Settings API
export const settingsApi = {
  get: () => fetchApi('/settings'),
  update: (data) => fetchApi('/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

export default {
  services: servicesApi,
  subscriptions: subscriptionsApi,
  masters: mastersApi,
  settings: settingsApi,
};
