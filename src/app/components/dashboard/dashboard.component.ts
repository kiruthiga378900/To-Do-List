import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  dashboardStats: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.loadDashboardData();
    });
  }

  loadDashboardData(): void {
    // Load different dashboard data based on user role
    if (this.currentUser) {
      switch (this.currentUser.role) {
        case UserRole.Admin:
          this.loadAdminDashboard();
          break;
        case UserRole.Doctor:
          this.loadDoctorDashboard();
          break;
        case UserRole.Patient:
          this.loadPatientDashboard();
          break;
        case UserRole.HelpDesk:
          this.loadHelpDeskDashboard();
          break;
      }
    }
  }

  private loadAdminDashboard(): void {
    this.dashboardStats = {
      totalUsers: 150,
      totalAppointments: 45,
      pendingApprovals: 8,
      totalRevenue: 25000
    };
  }

  private loadDoctorDashboard(): void {
    this.dashboardStats = {
      todayAppointments: 5,
      totalPatients: 120,
      completedAppointments: 45,
      pendingAppointments: 3
    };
  }

  private loadPatientDashboard(): void {
    this.dashboardStats = {
      upcomingAppointments: 2,
      completedAppointments: 15,
      totalPayments: 8,
      medicalRecords: 5
    };
  }

  private loadHelpDeskDashboard(): void {
    this.dashboardStats = {
      totalAppointments: 25,
      pendingAppointments: 3,
      completedAppointments: 22,
      totalPatients: 45
    };
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === UserRole.Admin;
  }

  get isDoctor(): boolean {
    return this.currentUser?.role === UserRole.Doctor;
  }

  get isPatient(): boolean {
    return this.currentUser?.role === UserRole.Patient;
  }

  get isHelpDesk(): boolean {
    return this.currentUser?.role === UserRole.HelpDesk;
  }
}