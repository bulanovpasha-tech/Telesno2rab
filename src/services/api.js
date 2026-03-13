const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';
const CRM_BASE_URL = process.env.REACT_APP_CRM_URL || '';

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

// CRM fetch — для данных из CRM (мастера, без авторизации)
async function fetchCrm(endpoint) {
  if (!CRM_BASE_URL) {
    throw new Error('REACT_APP_CRM_URL not set');
  }
  const url = `${CRM_BASE_URL}/api${endpoint}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`CRM API Error: ${response.status} ${response.statusText}`);
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

// Masters API — берёт данные из CRM (публичный эндпоинт)
export const mastersApi = {
  getAll: () => fetchCrm('/employees/public'),
  getById: (id) => fetchCrm(`/employees/public`).then(list => {
    const found = list.find(e => e.id === id);
    if (!found) throw new Error('Master not found');
    return found;
  }),
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
