# Hospital Management System - Angular Frontend

This is the Angular frontend for the Hospital Management Appointment System. It provides a modern, responsive user interface for managing hospital appointments, patients, doctors, and administrative tasks.

## 🏗️ Project Structure

```
hospital-management-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   ├── login.component.scss
│   │   │   │   │   └── login.module.ts
│   │   │   │   ├── register/
│   │   │   │   └── forgot-password/
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── user-management/
│   │   │   │   ├── reports/
│   │   │   │   └── settings/
│   │   │   ├── doctor/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── appointments/
│   │   │   │   ├── patients/
│   │   │   │   └── prescriptions/
│   │   │   ├── patient/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── appointments/
│   │   │   │   ├── medical-history/
│   │   │   │   └── payments/
│   │   │   ├── appointment/
│   │   │   │   ├── book-appointment/
│   │   │   │   ├── appointment-list/
│   │   │   │   ├── appointment-details/
│   │   │   │   └── reschedule/
│   │   │   ├── payment/
│   │   │   │   ├── payment-form/
│   │   │   │   ├── payment-history/
│   │   │   │   └── payment-status/
│   │   │   └── shared/
│   │   │       ├── header/
│   │   │       ├── footer/
│   │   │       ├── loading/
│   │   │       ├── error/
│   │   │       └── unauthorized/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── appointment.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── payment.service.ts
│   │   │   └── prescription.service.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   ├── appointment.model.ts
│   │   │   ├── payment.model.ts
│   │   │   └── prescription.model.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── role.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   ├── shared/
│   │   │   ├── pipes/
│   │   │   └── directives/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

## 🚀 Features

### Authentication & Authorization
- **Login/Logout**: Secure authentication with JWT tokens
- **Role-based Access Control**: Different interfaces for Admin, Doctor, Patient, and Help Desk
- **Password Reset**: Forgot password functionality
- **Profile Management**: Update user profiles and change passwords

### Appointment Management
- **Book Appointments**: Patients can book appointments with doctors
- **View Appointments**: List and filter appointments by date, status, doctor
- **Reschedule/Cancel**: Modify or cancel existing appointments
- **Appointment Status**: Track appointment status (Scheduled, Completed, Cancelled, etc.)

### Doctor Management
- **Doctor Dashboard**: Overview of appointments and patient information
- **Patient Records**: View patient medical history and details
- **Prescription Management**: Create and manage prescriptions
- **Schedule Management**: View and manage availability

### Patient Management
- **Patient Dashboard**: Overview of appointments and medical history
- **Medical Records**: View and download medical history
- **Payment History**: Track payment records
- **Appointment History**: View past and upcoming appointments

### Admin Features
- **User Management**: Approve/reject doctor registrations
- **System Reports**: Generate reports on appointments, payments, etc.
- **System Settings**: Configure system parameters
- **Dashboard Analytics**: Overview of system metrics

### Payment System
- **Payment Processing**: Multiple payment methods (Card, Cash, UPI, NetBanking)
- **Payment History**: Track all payment transactions
- **Payment Status**: Monitor payment status and confirmations

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 16
- **UI Library**: Angular Material
- **State Management**: RxJS with BehaviorSubject
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router with Lazy Loading
- **Forms**: Reactive Forms with Validation
- **Authentication**: JWT Token-based
- **Styling**: SCSS with Material Design

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hospital-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Update `src/environments/environment.ts` with your backend API URL
   - Update `src/environments/environment.prod.ts` for production

4. **Start development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔗 Backend Integration

This frontend is designed to work with the Hospital Management Appointment System backend:
- **API Base URL**: Configure in environment files
- **Authentication**: JWT token-based
- **CORS**: Ensure backend allows frontend domain
- **File Upload**: Supports medical record uploads

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Material Design**: Modern, accessible UI components
- **Dark/Light Theme**: Configurable theme support
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation feedback

## 🔒 Security Features

- **Route Guards**: Protect routes based on authentication and roles
- **HTTP Interceptors**: Automatically add authentication headers
- **Input Validation**: Client-side and server-side validation
- **XSS Protection**: Angular's built-in XSS protection
- **CSRF Protection**: Token-based CSRF protection

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured interface
- **Tablet**: Touch-optimized interface
- **Mobile**: Mobile-first design with touch gestures

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run e2e
```

## 📦 Build & Deployment

```bash
# Development build
npm run build

# Production build
npm run build --prod

# Serve production build
npm install -g http-server
http-server dist/hospital-management-frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core features
- **v1.1.0**: Added payment system
- **v1.2.0**: Enhanced admin features
- **v1.3.0**: Mobile responsiveness improvements

---

**Note**: This frontend is designed to work with the Hospital Management Appointment System backend. Make sure the backend is running and properly configured before using this frontend.
