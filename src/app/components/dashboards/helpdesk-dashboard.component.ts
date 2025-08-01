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
  selector: 'app-helpdesk-dashboard',
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
        <h1>Helpdesk Dashboard</h1>
        <p>Welcome {{currentUser?.firstName}}, manage patient support and appointments.</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon tickets">support</mat-icon>
            <mat-card-title>Open Tickets</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.openTickets || 0}}</div>
            <div class="stat-change urgent">{{stats.urgentTickets || 0}} urgent</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon appointments">schedule</mat-icon>
            <mat-card-title>Appointments Today</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.todayAppointments || 0}}</div>
            <div class="stat-change">{{stats.pendingAppointments || 0}} pending confirmation</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon calls">phone</mat-icon>
            <mat-card-title>Calls Handled</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.callsHandled || 0}}</div>
            <div class="stat-change positive">+{{stats.callsIncrease || 0}} from yesterday</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar class="stat-icon satisfaction">sentiment_satisfied</mat-icon>
            <mat-card-title>Satisfaction Rate</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="stat-number">{{stats.satisfactionRate || 0}}%</div>
            <div class="stat-change positive">Excellent service</div>
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
            <button mat-raised-button color="primary" (click)="createTicket()">
              <mat-icon>add_circle</mat-icon>
              Create Ticket
            </button>
            <button mat-raised-button color="accent" (click)="scheduleAppointment()">
              <mat-icon>event_note</mat-icon>
              Schedule Appointment
            </button>
            <button mat-raised-button (click)="viewPatientInfo()">
              <mat-icon>person_search</mat-icon>
              Patient Lookup
            </button>
            <button mat-raised-button (click)="generateReport()">
              <mat-icon>assessment</mat-icon>
              Generate Report
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Support Tickets -->
      <mat-card class="tickets-section">
        <mat-card-header>
          <mat-card-title>Recent Support Tickets</mat-card-title>
          <mat-card-subtitle>Latest patient inquiries and support requests</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="ticketsDataSource" class="tickets-table">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>Ticket ID</th>
              <td mat-cell *matCellDef="let ticket">#{{ticket.id}}</td>
            </ng-container>

            <ng-container matColumnDef="patient">
              <th mat-header-cell *matHeaderCellDef>Patient</th>
              <td mat-cell *matCellDef="let ticket">{{ticket.patientName}}</td>
            </ng-container>

            <ng-container matColumnDef="subject">
              <th mat-header-cell *matHeaderCellDef>Subject</th>
              <td mat-cell *matCellDef="let ticket">{{ticket.subject}}</td>
            </ng-container>

            <ng-container matColumnDef="priority">
              <th mat-header-cell *matHeaderCellDef>Priority</th>
              <td mat-cell *matCellDef="let ticket">
                <mat-chip [class]="'priority-' + ticket.priority">
                  {{ticket.priority | titlecase}}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let ticket">
                <mat-chip [class]="'status-' + ticket.status">
                  {{ticket.status | titlecase}}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="created">
              <th mat-header-cell *matHeaderCellDef>Created</th>
              <td mat-cell *matCellDef="let ticket">{{ticket.createdAt | date:'short'}}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let ticket">
                <button mat-icon-button color="primary" (click)="viewTicket(ticket)">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button color="accent" (click)="respondToTicket(ticket)">
                  <mat-icon>reply</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <div *ngIf="tickets.length === 0" class="no-tickets">
            <mat-icon>support_agent</mat-icon>
            <p>No support tickets available</p>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Recent Activities -->
      <mat-card class="recent-activities">
        <mat-card-header>
          <mat-card-title>Recent Activities</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="activity-list">
            <div class="activity-item">
              <mat-icon class="activity-icon">phone</mat-icon>
              <div class="activity-content">
                <div class="activity-title">Answered patient call - Appointment inquiry</div>
                <div class="activity-time">15 minutes ago</div>
              </div>
              <mat-chip class="status-chip completed">Completed</mat-chip>
            </div>

            <div class="activity-item">
              <mat-icon class="activity-icon">event</mat-icon>
              <div class="activity-content">
                <div class="activity-title">Scheduled appointment for John Smith</div>
                <div class="activity-time">1 hour ago</div>
              </div>
              <mat-chip class="status-chip completed">Completed</mat-chip>
            </div>

            <div class="activity-item">
              <mat-icon class="activity-icon">support</mat-icon>
              <div class="activity-content">
                <div class="activity-title">Resolved ticket #1234 - Billing inquiry</div>
                <div class="activity-time">2 hours ago</div>
              </div>
              <mat-chip class="status-chip resolved">Resolved</mat-chip>
            </div>

            <div class="activity-item">
              <mat-icon class="activity-icon">email</mat-icon>
              <div class="activity-content">
                <div class="activity-title">Sent appointment confirmation email</div>
                <div class="activity-time">3 hours ago</div>
              </div>
              <mat-chip class="status-chip sent">Sent</mat-chip>
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

    .stat-icon.tickets { background: #f44336; }
    .stat-icon.appointments { background: #2196f3; }
    .stat-icon.calls { background: #4caf50; }
    .stat-icon.satisfaction { background: #ff9800; }

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

    .stat-change.urgent {
      color: #f44336;
      font-weight: 500;
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

    .tickets-section {
      margin-bottom: 32px;
    }

    .tickets-table {
      width: 100%;
    }

    .priority-high {
      background: #f44336;
      color: white;
    }

    .priority-medium {
      background: #ff9800;
      color: white;
    }

    .priority-low {
      background: #4caf50;
      color: white;
    }

    .status-open {
      background: #2196f3;
      color: white;
    }

    .status-in-progress {
      background: #ff9800;
      color: white;
    }

    .status-resolved {
      background: #4caf50;
      color: white;
    }

    .status-closed {
      background: #9e9e9e;
      color: white;
    }

    .no-tickets {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .no-tickets mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
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

    .status-chip.completed {
      background: #4caf50;
      color: white;
    }

    .status-chip.resolved {
      background: #2196f3;
      color: white;
    }

    .status-chip.sent {
      background: #ff9800;
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

      .tickets-table {
        overflow-x: auto;
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
export class HelpdeskDashboardComponent implements OnInit {
  currentUser: User | null = null;
  stats: any = {};
  tickets: any[] = [];
  ticketsDataSource = new MatTableDataSource(this.tickets);
  displayedColumns: string[] = ['id', 'patient', 'subject', 'priority', 'status', 'created', 'actions'];

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardStats();
    this.loadSupportTickets();
  }

  loadDashboardStats(): void {
    this.apiService.getHelpdeskStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (error) => {
        console.error('Error loading helpdesk stats:', error);
        // Set default stats for demo
        this.stats = {
          openTickets: 15,
          urgentTickets: 3,
          todayAppointments: 45,
          pendingAppointments: 8,
          callsHandled: 67,
          callsIncrease: 12,
          satisfactionRate: 94
        };
      }
    });
  }

  loadSupportTickets(): void {
    // Set demo tickets
    this.tickets = [
      {
        id: '1234',
        patientName: 'John Smith',
        subject: 'Appointment Rescheduling',
        priority: 'high',
        status: 'open',
        createdAt: new Date('2024-03-18T10:30:00')
      },
      {
        id: '1235',
        patientName: 'Sarah Johnson',
        subject: 'Billing Inquiry',
        priority: 'medium',
        status: 'in-progress',
        createdAt: new Date('2024-03-18T09:15:00')
      },
      {
        id: '1236',
        patientName: 'Mike Wilson',
        subject: 'Insurance Coverage',
        priority: 'low',
        status: 'resolved',
        createdAt: new Date('2024-03-17T14:45:00')
      }
    ];
    this.ticketsDataSource.data = this.tickets;
  }

  createTicket(): void {
    console.log('Create ticket clicked');
    // Navigate to ticket creation page
  }

  scheduleAppointment(): void {
    console.log('Schedule appointment clicked');
    // Navigate to appointment scheduling page
  }

  viewPatientInfo(): void {
    console.log('View patient info clicked');
    // Navigate to patient lookup page
  }

  generateReport(): void {
    console.log('Generate report clicked');
    // Generate helpdesk report
  }

  viewTicket(ticket: any): void {
    console.log('View ticket:', ticket);
    // Show ticket details
  }

  respondToTicket(ticket: any): void {
    console.log('Respond to ticket:', ticket);
    // Open response dialog
  }
}