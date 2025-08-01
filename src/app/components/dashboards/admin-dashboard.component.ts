import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatChipsModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {{currentUser?.firstName}}! Manage your hospital system.</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon patients">people</mat-icon>
            <mat-card-title>Total Patients</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.totalPatients || 0}}</div>
            <div class="stat-change positive">+12 this week</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon doctors">medical_services</mat-icon>
            <mat-card-title>Total Doctors</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.totalDoctors || 0}}</div>
            <div class="stat-change positive">+2 this month</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon appointments">event</mat-icon>
            <mat-card-title>Today's Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.todayAppointments || 0}}</div>
            <div class="stat-change">{{stats.pendingAppointments || 0}} pending</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon revenue">attach_money</mat-icon>
            <mat-card-title>Monthly Revenue</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">$50,000</div>
            <div class="stat-change positive">+8.5% from last month</div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Quick Actions -->
      <mat-card class="quick-actions">
        <mat-card-header>
          <mat-card-title>Quick Actions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="action-buttons">
            <button mat-raised-button color="primary" (click)="addNewUser()">
              <mat-icon>person_add</mat-icon>
              Add New User
            </button>
            <button mat-raised-button color="accent" (click)="viewReports()">
              <mat-icon>analytics</mat-icon>
              View Reports
            </button>
            <button mat-raised-button (click)="manageSettings()">
              <mat-icon>settings</mat-icon>
              System Settings
            </button>
            <button mat-raised-button (click)="viewBackups()">
              <mat-icon>backup</mat-icon>
              Data Backups
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Recent Activities -->
      <mat-card class="recent-activities">
        <mat-card-header>
          <mat-card-title>Recent System Activities</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="activity-list">
            <div class="activity-item">
              <mat-icon class="activity-icon">person_add</mat-icon>
              <div class="activity-content">
                <div class="activity-title">New doctor registered</div>
                <div class="activity-time">2 hours ago</div>
              </div>
              <mat-chip class="status-chip new">New</mat-chip>
            </div>

            <div class="activity-item">
              <mat-icon class="activity-icon">event</mat-icon>
              <div class="activity-content">
                <div class="activity-title">25 appointments scheduled today</div>
                <div class="activity-time">4 hours ago</div>
              </div>
            </div>

            <div class="activity-item">
              <mat-icon class="activity-icon">warning</mat-icon>
              <div class="activity-content">
                <div class="activity-title">System backup completed</div>
                <div class="activity-time">6 hours ago</div>
              </div>
              <mat-chip class="status-chip success">Success</mat-chip>
            </div>

            <div class="activity-item">
              <mat-icon class="activity-icon">security</mat-icon>
              <div class="activity-content">
                <div class="activity-title">Security scan completed</div>
                <div class="activity-time">1 day ago</div>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 32px;
    }

    .dashboard-header h1 {
      font-size: 32px;
      color: #333;
      margin: 0 0 8px 0;
    }

    .dashboard-header p {
      color: #666;
      font-size: 16px;
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      text-align: center;
    }

    .stat-icon {
      width: 48px !important;
      height: 48px !important;
      border-radius: 50%;
      color: white;
      font-size: 24px;
    }

    .stat-icon.patients { background: #4caf50; }
    .stat-icon.doctors { background: #2196f3; }
    .stat-icon.appointments { background: #ff9800; }
    .stat-icon.revenue { background: #9c27b0; }

    .stat-number {
      font-size: 32px;
      font-weight: 600;
      color: #333;
      margin: 16px 0 8px 0;
    }

    .stat-change {
      font-size: 14px;
      color: #666;
    }

    .stat-change.positive {
      color: #4caf50;
    }

    .quick-actions {
      margin-bottom: 32px;
    }

    .action-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .action-buttons button {
      height: 56px;
      font-size: 14px;
    }

    .action-buttons mat-icon {
      margin-right: 8px;
    }

    .recent-activities {
      margin-bottom: 32px;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafafa;
    }

    .activity-icon {
      margin-right: 16px;
      color: #666;
    }

    .activity-content {
      flex: 1;
    }

    .activity-title {
      font-weight: 500;
      color: #333;
      margin-bottom: 4px;
    }

    .activity-time {
      font-size: 12px;
      color: #999;
    }

    .status-chip {
      margin-left: 16px;
    }

    .status-chip.new {
      background: #2196f3;
      color: white;
    }

    .status-chip.success {
      background: #4caf50;
      color: white;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 16px;
      }

      .stats-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .action-buttons {
        grid-template-columns: 1fr;
      }

      .activity-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .status-chip {
        margin-left: 0;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  currentUser: User | null = null;
  stats: any = {};

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.apiService.getAdminStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (error) => {
        console.error('Error loading admin stats:', error);
        // Set default stats for demo
        this.stats = {
          totalPatients: 1245,
          totalDoctors: 48,
          todayAppointments: 67,
          pendingAppointments: 12
        };
      }
    });
  }

  addNewUser(): void {
    console.log('Add new user clicked');
    // Navigate to user creation page
  }

  viewReports(): void {
    console.log('View reports clicked');
    // Navigate to reports page
  }

  manageSettings(): void {
    console.log('Manage settings clicked');
    // Navigate to settings page
  }

  viewBackups(): void {
    console.log('View backups clicked');
    // Navigate to backups page
  }
}