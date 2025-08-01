import { Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login.component';
import { RegistrationComponent } from './components/auth/registration.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard.component';
import { DoctorDashboardComponent } from './components/dashboards/doctor-dashboard.component';
import { PatientDashboardComponent } from './components/dashboards/patient-dashboard.component';
import { HelpdeskDashboardComponent } from './components/dashboards/helpdesk-dashboard.component';

export const routes: Routes = [
  // Default route
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  
  // Authentication routes
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  
  // Dashboard routes for different roles
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'doctor-dashboard',
    component: DoctorDashboardComponent
  },
  {
    path: 'patient-dashboard',
    component: PatientDashboardComponent
  },
  {
    path: 'helpdesk-dashboard',
    component: HelpdeskDashboardComponent
  },
  
  // Wildcard route
  {
    path: '**',
    redirectTo: '/login'
  }
];