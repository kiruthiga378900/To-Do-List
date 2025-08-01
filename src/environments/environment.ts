export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  socketUrl: 'http://localhost:3000',
  version: '1.0.0',
  
  // Feature flags
  features: {
    enableNotifications: true,
    enableChat: true,
    enableReports: true,
    enablePayments: true,
    enableTelehealth: false
  },
  
  // API Configuration
  api: {
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
  },
  
  // Authentication Configuration
  auth: {
    tokenKey: 'hospital_auth_token',
    refreshTokenKey: 'hospital_refresh_token',
    tokenExpirationBuffer: 300000, // 5 minutes
    sessionTimeout: 3600000 // 1 hour
  },
  
  // Pagination Configuration
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100]
  },
  
  // Date and Time Configuration
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
  
  // File Upload Configuration
  fileUpload: {
    maxSize: 5242880, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'],
    endpoint: '/upload'
  },
  
  // Notification Configuration
  notifications: {
    duration: 5000,
    position: 'top-right'
  }
};