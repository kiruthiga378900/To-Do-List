import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <h1>Patient Dashboard</h1>
        <p>Welcome {{currentUser?.firstName}}, manage your health appointments and records.</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon upcoming">schedule</mat-icon>
            <mat-card-title>Upcoming Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.upcomingAppointments || 0}}</div>
            <div class="stat-change">{{stats.nextAppointment || 'No upcoming'}}</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon completed">check_circle</mat-icon>
            <mat-card-title>Completed Visits</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.completedVisits || 0}}</div>
            <div class="stat-change">This year</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon prescriptions">medication</mat-icon>
            <mat-card-title>Active Prescriptions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.activePrescriptions || 0}}</div>
            <div class="stat-change">Current medications</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon reports">description</mat-icon>
            <mat-card-title>Lab Reports</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.labReports || 0}}</div>
            <div class="stat-change">{{stats.pendingReports || 0}} pending</div>
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
            <button mat-raised-button color="primary" (click)="bookAppointment()">
              <mat-icon>add_circle</mat-icon>
              Book Appointment
            </button>
            <button mat-raised-button color="accent" (click)="viewMedicalHistory()">
              <mat-icon>history</mat-icon>
              Medical History
            </button>
            <button mat-raised-button (click)="viewPrescriptions()">
              <mat-icon>medication</mat-icon>
              My Prescriptions
            </button>
            <button mat-raised-button (click)="downloadReports()">
              <mat-icon>download</mat-icon>
              Download Reports
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Upcoming Appointments -->
      <mat-card class="appointments-section">
        <mat-card-header>
          <mat-card-title>Your Upcoming Appointments</mat-card-title>
          <mat-card-subtitle>Next scheduled visits</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="appointments-grid" *ngIf="upcomingAppointments.length > 0; else noAppointments">
            <div class="appointment-card" *ngFor="let appointment of upcomingAppointments">
              <div class="appointment-date">
                <div class="date-day">{{appointment.date | date:'dd'}}</div>
                <div class="date-month">{{appointment.date | date:'MMM'}}</div>
              </div>
              <div class="appointment-details">
                <div class="appointment-doctor">Dr. {{appointment.doctorName}}</div>
                <div class="appointment-time">{{appointment.time}}</div>
                <div class="appointment-reason">{{appointment.reason}}</div>
              </div>
              <div class="appointment-actions">
                <button mat-icon-button color="primary" (click)="reschedule(appointment)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="cancel(appointment)">
                  <mat-icon>cancel</mat-icon>
                </button>
              </div>
            </div>
          </div>

          <ng-template #noAppointments>
            <div class="no-appointments">
              <mat-icon>event_available</mat-icon>
              <p>No upcoming appointments</p>
              <button mat-raised-button color="primary" (click)="bookAppointment()">
                Book Your First Appointment
              </button>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>

      <!-- Recent Activity -->
      <mat-card class="recent-activity">
        <mat-card-header>
          <mat-card-title>Recent Medical Activity</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="activity-timeline">
            <div class="activity-item">
              <div class="activity-icon">
                <mat-icon>medical_services</mat-icon>
              </div>
              <div class="activity-content">
                <div class="activity-title">Consultation with Dr. Smith</div>
                <div class="activity-date">March 15, 2024</div>
                <div class="activity-description">Regular checkup completed. Prescription updated.</div>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon">
                <mat-icon>biotech</mat-icon>
              </div>
              <div class="activity-content">
                <div class="activity-title">Lab Test Results Available</div>
                <div class="activity-date">March 10, 2024</div>
                <div class="activity-description">Blood work results are now available for download.</div>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon">
                <mat-icon>medication</mat-icon>
              </div>
              <div class="activity-content">
                <div class="activity-title">Prescription Refill</div>
                <div class="activity-date">March 5, 2024</div>
                <div class="activity-description">Medication refill processed and ready for pickup.</div>
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

    .stat-icon.upcoming { background: #2196f3; }
    .stat-icon.completed { background: #4caf50; }
    .stat-icon.prescriptions { background: #ff9800; }
    .stat-icon.reports { background: #9c27b0; }

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

    .appointments-section {
      margin-bottom: 32px;
    }

    .appointments-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .appointment-card {
      display: flex;
      align-items: center;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      background: #f9f9f9;
    }

    .appointment-date {
      text-align: center;
      margin-right: 24px;
      min-width: 60px;
    }

    .date-day {
      font-size: 24px;
      font-weight: 600;
      color: #1976d2;
    }

    .date-month {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
    }

    .appointment-details {
      flex: 1;
    }

    .appointment-doctor {
      font-weight: 500;
      font-size: 16px;
      color: #333;
      margin-bottom: 4px;
    }

    .appointment-time {
      color: #1976d2;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .appointment-reason {
      color: #666;
      font-size: 14px;
    }

    .appointment-actions {
      display: flex;
      gap: 8px;
    }

    .no-appointments {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .no-appointments mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .recent-activity {
      margin-bottom: 32px;
    }

    .activity-timeline {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #e3f2fd;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .activity-icon mat-icon {
      color: #1976d2;
      font-size: 20px;
    }

    .activity-content {
      flex: 1;
    }

    .activity-title {
      font-weight: 500;
      color: #333;
      margin-bottom: 4px;
    }

    .activity-date {
      font-size: 12px;
      color: #1976d2;
      margin-bottom: 8px;
    }

    .activity-description {
      font-size: 14px;
      color: #666;
      line-height: 1.4;
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

      .appointment-card {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .appointment-date {
        margin-right: 0;
      }

      .appointment-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  `]
})
export class PatientDashboardComponent implements OnInit {
  currentUser: User | null = null;
  stats: any = {};
  upcomingAppointments: any[] = [];

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardStats();
    this.loadUpcomingAppointments();
  }

  loadDashboardStats(): void {
    this.apiService.getPatientStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (error) => {
        console.error('Error loading patient stats:', error);
        // Set default stats for demo
        this.stats = {
          upcomingAppointments: 2,
          nextAppointment: 'March 20, 10:30 AM',
          completedVisits: 12,
          activePrescriptions: 3,
          labReports: 5,
          pendingReports: 1
        };
      }
    });
  }

  loadUpcomingAppointments(): void {
    // Set demo appointments
    this.upcomingAppointments = [
      {
        id: '1',
        date: new Date('2024-03-20'),
        time: '10:30 AM',
        doctorName: 'Smith',
        reason: 'Regular Checkup'
      },
      {
        id: '2',
        date: new Date('2024-03-25'),
        time: '02:00 PM',
        doctorName: 'Johnson',
        reason: 'Follow-up'
      }
    ];
  }

  bookAppointment(): void {
    console.log('Book appointment clicked');
    // Navigate to appointment booking page
  }

  viewMedicalHistory(): void {
    console.log('View medical history clicked');
    // Navigate to medical history page
  }

  viewPrescriptions(): void {
    console.log('View prescriptions clicked');
    // Navigate to prescriptions page
  }

  downloadReports(): void {
    console.log('Download reports clicked');
    // Download lab reports
  }

  reschedule(appointment: any): void {
    console.log('Reschedule appointment:', appointment);
    // Reschedule appointment
  }

  cancel(appointment: any): void {
    console.log('Cancel appointment:', appointment);
    // Cancel appointment
  }
}