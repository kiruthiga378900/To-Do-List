import { Routes } from '@angular/router';

// Guards
import { AuthGuard } from '@core/guards/auth.guard';
import { RoleGuard } from '@core/guards/role.guard';
import { NoAuthGuard } from '@core/guards/no-auth.guard';

// Models
import { UserRole } from '@core/models/user.model';

export const routes: Routes = [
  // Authentication Routes (Publicly accessible)
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  
  // Dashboard (Protected - All authenticated users)
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  
  // Patient Management (Protected - Doctors, Nurses, Staff, Admin)
  {
    path: 'patients',
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      expectedRoles: [UserRole.DOCTOR, UserRole.NURSE, UserRole.STAFF, UserRole.ADMIN] 
    },
    loadChildren: () => import('./features/patients/patients.routes').then(m => m.patientsRoutes)
  },
  
  // Doctor Management (Protected - Admin, Staff)
  {
    path: 'doctors',
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      expectedRoles: [UserRole.ADMIN, UserRole.STAFF] 
    },
    loadChildren: () => import('./features/doctors/doctors.routes').then(m => m.doctorsRoutes)
  },
  
  // Appointment Management (Protected - All authenticated users)
  {
    path: 'appointments',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/appointments/appointments.routes').then(m => m.appointmentsRoutes)
  },
  
  // Staff Management (Protected - Admin only)
  {
    path: 'staff',
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      expectedRoles: [UserRole.ADMIN] 
    },
    loadChildren: () => import('./features/staff/staff.routes').then(m => m.staffRoutes)
  },
  
  // Administration (Protected - Admin only)
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      expectedRoles: [UserRole.ADMIN] 
    },
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)
  },
  
  // Reports (Protected - Doctors, Admin, Staff)
  {
    path: 'reports',
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      expectedRoles: [UserRole.DOCTOR, UserRole.ADMIN, UserRole.STAFF] 
    },
    loadChildren: () => import('./features/reports/reports.routes').then(m => m.reportsRoutes)
  },
  
  // Profile (Protected - All authenticated users)
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./shared/components/user-profile/user-profile.component').then(c => c.UserProfileComponent)
  },
  
  // Settings (Protected - All authenticated users)
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadComponent: () => import('./shared/components/settings/settings.component').then(c => c.SettingsComponent)
  },
  
  // Error Pages
  {
    path: 'error',
    loadChildren: () => import('./shared/components/error-pages/error-pages.routes').then(m => m.errorPagesRoutes)
  },
  
  // Redirects
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  
  // Wildcard route - must be last
  {
    path: '**',
    redirectTo: '/error/404'
  }
];