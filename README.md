# Hospital Management System - Angular Frontend

A modern, responsive Angular frontend for a comprehensive Hospital Management and Appointment Scheduling System.

## 🏥 Features

### Core Functionality
- **Authentication & Authorization** - Role-based access control for different user types
- **Dashboard** - Comprehensive overview with statistics and quick actions
- **Appointment Management** - Schedule, reschedule, cancel, and manage appointments
- **Patient Management** - Complete patient records and medical history
- **Doctor Management** - Doctor profiles, schedules, and availability
- **Staff Management** - Hospital staff management and role assignment
- **Billing & Payments** - Invoice generation and payment tracking
- **Reports & Analytics** - Detailed reporting and data visualization
- **Real-time Notifications** - Live updates and notifications

### User Roles
- **Admin** - Full system access and management
- **Doctor** - Patient management, appointments, medical records
- **Nurse** - Patient care, appointment assistance
- **Receptionist** - Appointment scheduling, patient check-in
- **Patient** - View appointments, medical history, bills
- **Staff** - Department-specific access

## 🚀 Technology Stack

- **Framework**: Angular 17
- **UI Components**: Angular Material + PrimeNG
- **Styling**: SCSS with custom themes
- **State Management**: RxJS + Services
- **HTTP Client**: Angular HttpClient with interceptors
- **Charts**: Chart.js with ng2-charts
- **Real-time**: Socket.io
- **Authentication**: JWT with refresh tokens
- **Build Tool**: Angular CLI
- **Testing**: Jasmine + Karma

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                          # Core functionality
│   │   ├── guards/                     # Route guards
│   │   │   ├── auth.guard.ts
│   │   │   ├── role.guard.ts
│   │   │   └── no-auth.guard.ts
│   │   ├── interceptors/               # HTTP interceptors
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   │   └── loading.interceptor.ts
│   │   ├── services/                   # Core services
│   │   │   ├── auth.service.ts
│   │   │   ├── api.service.ts
│   │   │   ├── notification.service.ts
│   │   │   ├── loading.service.ts
│   │   │   └── theme.service.ts
│   │   ├── models/                     # Data models
│   │   │   ├── user.model.ts
│   │   │   ├── appointment.model.ts
│   │   │   └── common.model.ts
│   │   └── constants/                  # Application constants
│   │       ├── api-endpoints.ts
│   │       └── app-constants.ts
│   │
│   ├── shared/                         # Shared components and utilities
│   │   ├── components/                 # Reusable components
│   │   │   ├── confirmation-dialog/
│   │   │   ├── data-table/
│   │   │   ├── date-picker/
│   │   │   ├── file-upload/
│   │   │   ├── loading-spinner/
│   │   │   ├── user-profile/
│   │   │   ├── settings/
│   │   │   └── error-pages/
│   │   ├── directives/                 # Custom directives
│   │   ├── pipes/                      # Custom pipes
│   │   ├── validators/                 # Custom validators
│   │   └── utils/                      # Utility functions
│   │
│   ├── features/                       # Feature modules
│   │   ├── auth/                       # Authentication
│   │   │   ├── components/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── forgot-password/
│   │   │   │   └── reset-password/
│   │   │   ├── services/
│   │   │   └── auth.routes.ts
│   │   │
│   │   ├── dashboard/                  # Dashboard
│   │   │   ├── components/
│   │   │   │   ├── dashboard-overview/
│   │   │   │   ├── statistics-cards/
│   │   │   │   ├── recent-appointments/
│   │   │   │   └── quick-actions/
│   │   │   ├── services/
│   │   │   └── dashboard.routes.ts
│   │   │
│   │   ├── patients/                   # Patient Management
│   │   │   ├── components/
│   │   │   │   ├── patient-list/
│   │   │   │   ├── patient-detail/
│   │   │   │   ├── patient-form/
│   │   │   │   ├── medical-history/
│   │   │   │   └── patient-search/
│   │   │   ├── services/
│   │   │   └── patients.routes.ts
│   │   │
│   │   ├── doctors/                    # Doctor Management
│   │   │   ├── components/
│   │   │   │   ├── doctor-list/
│   │   │   │   ├── doctor-detail/
│   │   │   │   ├── doctor-form/
│   │   │   │   ├── doctor-schedule/
│   │   │   │   └── doctor-availability/
│   │   │   ├── services/
│   │   │   └── doctors.routes.ts
│   │   │
│   │   ├── appointments/               # Appointment Management
│   │   │   ├── components/
│   │   │   │   ├── appointment-list/
│   │   │   │   ├── appointment-form/
│   │   │   │   ├── appointment-calendar/
│   │   │   │   ├── appointment-detail/
│   │   │   │   └── time-slot-picker/
│   │   │   ├── services/
│   │   │   └── appointments.routes.ts
│   │   │
│   │   ├── staff/                      # Staff Management
│   │   │   ├── components/
│   │   │   │   ├── staff-list/
│   │   │   │   ├── staff-detail/
│   │   │   │   ├── staff-form/
│   │   │   │   └── staff-schedule/
│   │   │   ├── services/
│   │   │   └── staff.routes.ts
│   │   │
│   │   ├── admin/                      # Administration
│   │   │   ├── components/
│   │   │   │   ├── user-management/
│   │   │   │   ├── system-settings/
│   │   │   │   ├── department-management/
│   │   │   │   └── room-management/
│   │   │   ├── services/
│   │   │   └── admin.routes.ts
│   │   │
│   │   └── reports/                    # Reports & Analytics
│   │       ├── components/
│   │       │   ├── report-dashboard/
│   │       │   ├── appointment-reports/
│   │       │   ├── financial-reports/
│   │       │   └── patient-reports/
│   │       ├── services/
│   │       └── reports.routes.ts
│   │
│   ├── layout/                         # Layout components
│   │   ├── header/
│   │   │   ├── header.component.ts
│   │   │   ├── header.component.html
│   │   │   └── header.component.scss
│   │   ├── sidebar/
│   │   │   ├── sidebar.component.ts
│   │   │   ├── sidebar.component.html
│   │   │   └── sidebar.component.scss
│   │   └── footer/
│   │       ├── footer.component.ts
│   │       ├── footer.component.html
│   │       └── footer.component.scss
│   │
│   ├── app.component.ts                # Main app component
│   ├── app.routes.ts                   # App routing configuration
│   └── app.config.ts                   # App configuration
│
├── assets/                             # Static assets
│   ├── images/                         # Images and illustrations
│   ├── icons/                          # Icons and favicons
│   └── styles/                         # Additional stylesheets
│
├── environments/                       # Environment configurations
│   ├── environment.ts                  # Development environment
│   └── environment.prod.ts             # Production environment
│
├── index.html                          # Main HTML file
├── main.ts                             # Application bootstrap
└── styles.scss                         # Global styles
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm 8+
- Angular CLI 17+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hospital-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Update `src/environments/environment.ts` with your backend API URL:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api',
     socketUrl: 'http://localhost:3000',
     // ... other configurations
   };
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build for production with optimizations
- `npm run test` - Run unit tests
- `npm run e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Angular recommended rules
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Conventional Commits**: Commit message format

### Project Architecture

This project follows Angular best practices:

- **Feature-based structure** - Organized by business domain
- **Lazy loading** - Routes are lazy-loaded for optimal performance
- **Reactive patterns** - RxJS for state management and data flow
- **Dependency injection** - Proper service architecture
- **Type safety** - Comprehensive TypeScript interfaces
- **Responsive design** - Mobile-first approach

## 🔐 Authentication & Authorization

### Role-Based Access Control

The application implements role-based access control with the following roles:

- **Admin**: Full system access
- **Doctor**: Medical records, appointments, reports
- **Nurse**: Patient care, appointment assistance
- **Receptionist**: Appointment scheduling, patient check-in
- **Patient**: Personal appointments and medical history
- **Staff**: Department-specific functionality

### Security Features

- JWT-based authentication
- Automatic token refresh
- Route guards for protected pages
- Role-based navigation
- Session timeout handling
- HTTPS enforcement in production

## 🎨 UI/UX Features

### Design System

- **Material Design** - Consistent Google Material Design patterns
- **Custom Theming** - Hospital-specific color scheme
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Accessibility** - WCAG 2.1 AA compliance
- **Dark Mode** - Optional dark theme
- **Internationalization** - Multi-language support ready

### Key Components

- **Dashboard** - Role-specific overview with key metrics
- **Calendar** - Interactive appointment scheduling
- **Data Tables** - Sortable, filterable patient/appointment lists
- **Forms** - Comprehensive form validation
- **Charts** - Visual analytics and reporting
- **Notifications** - Real-time system notifications

## 📱 Progressive Web App (PWA)

The application is configured as a PWA with:

- **Service Worker** - Offline functionality
- **App Manifest** - Installable on mobile devices
- **Push Notifications** - Real-time updates
- **Offline Mode** - Basic functionality without internet

## 🧪 Testing

### Unit Testing
```bash
npm run test
```

### E2E Testing
```bash
npm run e2e
```

### Testing Strategy

- **Component Testing** - Isolated component behavior
- **Service Testing** - Business logic validation
- **Integration Testing** - Feature workflow testing
- **E2E Testing** - Complete user journeys

## 🚀 Deployment

### Production Build
```bash
npm run build:prod
```

### Environment Configuration

Configure production environment in `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourhospital.com/api',
  socketUrl: 'https://api.yourhospital.com',
  // ... other production configurations
};
```

### Deployment Options

- **Static Hosting** - Deploy to Netlify, Vercel, or AWS S3
- **Docker** - Containerized deployment
- **CDN** - Serve through CloudFlare or AWS CloudFront
- **CI/CD** - Automated deployment with GitHub Actions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow Angular style guide
- Write comprehensive tests
- Update documentation
- Use conventional commit messages
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Documentation**: Check the inline code documentation
- **Issues**: Create an issue on GitHub
- **Email**: [Your support email]
- **Wiki**: Check the project wiki for detailed guides

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## 🎯 Roadmap

- [ ] Telemedicine integration
- [ ] Mobile app companion
- [ ] AI-powered appointment scheduling
- [ ] Advanced analytics dashboard
- [ ] Integration with medical devices
- [ ] Multi-hospital support
- [ ] Advanced billing features

---

**Made with ❤️ for healthcare providers**