import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UserRole } from './models/user.model';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Auth Routes
  { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./components/auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'forgot-password', loadChildren: () => import('./components/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  
  // Dashboard
  { 
    path: 'dashboard', 
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  
  // Appointment Routes
  { 
    path: 'appointments', 
    loadChildren: () => import('./components/appointment/appointment.module').then(m => m.AppointmentModule),
    canActivate: [AuthGuard]
  },
  
  // Doctor Routes
  { 
    path: 'doctors', 
    loadChildren: () => import('./components/doctor/doctor.module').then(m => m.DoctorModule),
    canActivate: [AuthGuard]
  },
  
  // Patient Routes
  { 
    path: 'patients', 
    loadChildren: () => import('./components/patient/patient.module').then(m => m.PatientModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.Admin, UserRole.Doctor, UserRole.HelpDesk] }
  },
  
  // Payment Routes
  { 
    path: 'payments', 
    loadChildren: () => import('./components/payment/payment.module').then(m => m.PaymentModule),
    canActivate: [AuthGuard]
  },
  
  // Admin Routes
  { 
    path: 'admin', 
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.Admin] }
  },
  
  // Profile Routes
  { 
    path: 'profile', 
    loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  
  // Error Routes
  { path: 'unauthorized', loadChildren: () => import('./components/shared/unauthorized/unauthorized.module').then(m => m.UnauthorizedModule) },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }