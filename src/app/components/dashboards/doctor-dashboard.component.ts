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
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-doctor-dashboard',
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
        <h1>Doctor Dashboard</h1>
        <p>Welcome Dr. {{currentUser?.firstName}}, here's your schedule for today.</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon today">today</mat-icon>
            <mat-card-title>Today's Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.todayAppointments || 0}}</div>
            <div class="stat-change">{{stats.nextAppointment || 'No upcoming'}}</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon patients">people</mat-icon>
            <mat-card-title>My Patients</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.totalPatients || 0}}</div>
            <div class="stat-change positive">{{stats.newPatients || 0}} new this week</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon completed">check_circle</mat-icon>
            <mat-card-title>Completed Today</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.completedToday || 0}}</div>
            <div class="stat-change">{{stats.pendingToday || 0}} remaining</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon emergency">emergency</mat-icon>
            <mat-card-title>Emergency Cases</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number urgent">{{stats.emergencyCases || 0}}</div>
            <div class="stat-change">Urgent attention needed</div>
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
            <button mat-raised-button color="primary" (click)="viewSchedule()">
              <mat-icon>schedule</mat-icon>
              View Schedule
            </button>
            <button mat-raised-button color="accent" (click)="addPrescription()">
              <mat-icon>note_add</mat-icon>
              Add Prescription
            </button>
            <button mat-raised-button (click)="viewPatients()">
              <mat-icon>people</mat-icon>
              My Patients
            </button>
            <button mat-raised-button (click)="emergencyAlert()">
              <mat-icon>emergency</mat-icon>
              Emergency Alert
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Today's Appointments -->
      <mat-card class="appointments-table">
        <mat-card-header>
          <mat-card-title>Today's Appointments</mat-card-title>
          <mat-card-subtitle>{{currentDate | date:'fullDate'}}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="appointmentsDataSource" class="appointments-table">
            <ng-container matColumnDef="time">
              <th mat-header-cell *matHeaderCellDef>Time</th>
              <td mat-cell *matCellDef="let appointment">{{appointment.time}}</td>
            </ng-container>

            <ng-container matColumnDef="patient">
              <th mat-header-cell *matHeaderCellDef>Patient</th>
              <td mat-cell *matCellDef="let appointment">{{appointment.patientName}}</td>
            </ng-container>

            <ng-container matColumnDef="reason">
              <th mat-header-cell *matHeaderCellDef>Reason</th>
              <td mat-cell *matCellDef="let appointment">{{appointment.reason}}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let appointment">
                <mat-chip [class]="'status-' + appointment.status">
                  {{appointment.status | titlecase}}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let appointment">
                <button mat-icon-button color="primary" (click)="startConsultation(appointment)">
                  <mat-icon>play_arrow</mat-icon>
                </button>
                <button mat-icon-button (click)="viewDetails(appointment)">
                  <mat-icon>visibility</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <div *ngIf="appointments.length === 0" class="no-appointments">
            <mat-icon>event_available</mat-icon>
            <p>No appointments scheduled for today</p>
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

    .stat-icon.today { background: #2196f3; }
    .stat-icon.patients { background: #4caf50; }
    .stat-icon.completed { background: #ff9800; }
    .stat-icon.emergency { background: #f44336; }

    .stat-number {
      font-size: 32px;
      font-weight: 600;
      color: #333;
      margin: 16px 0 8px 0;
    }

    .stat-number.urgent {
      color: #f44336;
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

    .appointments-table {
      margin-bottom: 32px;
    }

    .appointments-table table {
      width: 100%;
    }

    .status-scheduled {
      background: #2196f3;
      color: white;
    }

    .status-completed {
      background: #4caf50;
      color: white;
    }

    .status-cancelled {
      background: #f44336;
      color: white;
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

      .appointments-table {
        overflow-x: auto;
      }
    }
  `]
})
export class DoctorDashboardComponent implements OnInit {
  currentUser: User | null = null;
  stats: any = {};
  appointments: any[] = [];
  appointmentsDataSource = new MatTableDataSource(this.appointments);
  displayedColumns: string[] = ['time', 'patient', 'reason', 'status', 'actions'];
  currentDate = new Date();

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardStats();
    this.loadTodayAppointments();
  }

  loadDashboardStats(): void {
    this.apiService.getDoctorStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (error) => {
        console.error('Error loading doctor stats:', error);
        // Set default stats for demo
        this.stats = {
          todayAppointments: 8,
          nextAppointment: '10:30 AM',
          totalPatients: 156,
          newPatients: 5,
          completedToday: 3,
          pendingToday: 5,
          emergencyCases: 1
        };
      }
    });
  }

  loadTodayAppointments(): void {
    this.apiService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data.map(appointment => ({
          ...appointment,
          patientName: `Patient ${appointment.patientId.slice(-4)}`
        }));
        this.appointmentsDataSource.data = this.appointments;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        // Set demo appointments
        this.appointments = [
          {
            id: '1',
            time: '09:00 AM',
            patientName: 'John Smith',
            reason: 'Regular Checkup',
            status: 'scheduled'
          },
          {
            id: '2',
            time: '10:30 AM',
            patientName: 'Sarah Johnson',
            reason: 'Follow-up',
            status: 'completed'
          },
          {
            id: '3',
            time: '02:00 PM',
            patientName: 'Mike Wilson',
            reason: 'Consultation',
            status: 'scheduled'
          }
        ];
        this.appointmentsDataSource.data = this.appointments;
      }
    });
  }

  viewSchedule(): void {
    console.log('View schedule clicked');
    // Navigate to schedule page
  }

  addPrescription(): void {
    console.log('Add prescription clicked');
    // Navigate to prescription page
  }

  viewPatients(): void {
    console.log('View patients clicked');
    // Navigate to patients page
  }

  emergencyAlert(): void {
    console.log('Emergency alert clicked');
    // Trigger emergency alert
  }

  startConsultation(appointment: any): void {
    console.log('Start consultation for:', appointment);
    // Start consultation
  }

  viewDetails(appointment: any): void {
    console.log('View details for:', appointment);
    // Show appointment details
  }
}