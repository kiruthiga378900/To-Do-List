import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

// Core Services
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';

// Models
import { User } from '@core/models/user.model';
import { Notification } from '@core/models/common.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  template: `
    <mat-toolbar class="app-header" color="primary">
      <!-- Menu Toggle Button -->
      <button 
        mat-icon-button 
        (click)="toggleMenu()"
        matTooltip="Toggle Menu"
        class="menu-button">
        <mat-icon>menu</mat-icon>
      </button>

      <!-- App Title -->
      <h1 class="app-title">
        <span class="title-main">Hospital Management</span>
        <span class="title-sub">System</span>
      </h1>

      <div class="spacer"></div>

      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Notifications -->
        <button 
          mat-icon-button 
          [matMenuTriggerFor]="notificationMenu"
          matTooltip="Notifications"
          class="notification-button">
          <mat-icon [matBadge]="unreadCount$ | async" 
                    [matBadgeHidden]="(unreadCount$ | async) === 0"
                    matBadgeColor="warn">
            notifications
          </mat-icon>
        </button>

        <!-- Theme Toggle -->
        <button 
          mat-icon-button 
          (click)="toggleTheme()"
          matTooltip="Toggle Dark Mode"
          class="theme-button">
          <mat-icon>brightness_6</mat-icon>
        </button>

        <!-- User Menu -->
        <button 
          mat-button 
          [matMenuTriggerFor]="userMenu"
          class="user-button">
          <div class="user-info">
            <img 
              [src]="(currentUser$ | async)?.profilePicture || 'assets/images/default-avatar.png'"
              [alt]="(currentUser$ | async)?.firstName"
              class="user-avatar">
            <span class="user-name">
              {{ (currentUser$ | async)?.firstName }}
            </span>
          </div>
          <mat-icon>arrow_drop_down</mat-icon>
        </button>
      </div>

      <!-- Notification Menu -->
      <mat-menu #notificationMenu="matMenu" class="notification-menu">
        <div class="notification-header">
          <h3>Notifications</h3>
          <button mat-button color="primary" (click)="markAllAsRead()">
            Mark all as read
          </button>
        </div>
        
        <div class="notification-list" *ngIf="(notifications$ | async)?.length; else noNotifications">
          <button 
            mat-menu-item 
            *ngFor="let notification of notifications$ | async"
            [class.unread]="!notification.read"
            (click)="markAsRead(notification.id)">
            <div class="notification-content">
              <div class="notification-title">{{ notification.title }}</div>
              <div class="notification-message">{{ notification.message }}</div>
              <div class="notification-time">{{ notification.timestamp | date:'short' }}</div>
            </div>
          </button>
        </div>

        <ng-template #noNotifications>
          <div class="no-notifications">
            <mat-icon>notifications_none</mat-icon>
            <p>No notifications</p>
          </div>
        </ng-template>

        <div class="notification-footer">
          <button mat-button routerLink="/notifications">View All</button>
        </div>
      </mat-menu>

      <!-- User Menu -->
      <mat-menu #userMenu="matMenu" class="user-menu">
        <div class="user-menu-header">
          <img 
            [src]="(currentUser$ | async)?.profilePicture || 'assets/images/default-avatar.png'"
            [alt]="(currentUser$ | async)?.firstName"
            class="user-menu-avatar">
          <div class="user-menu-info">
            <div class="user-menu-name">
              {{ (currentUser$ | async)?.firstName }} {{ (currentUser$ | async)?.lastName }}
            </div>
            <div class="user-menu-role">{{ (currentUser$ | async)?.role | titlecase }}</div>
            <div class="user-menu-email">{{ (currentUser$ | async)?.email }}</div>
          </div>
        </div>

        <mat-divider></mat-divider>

        <button mat-menu-item routerLink="/profile">
          <mat-icon>person</mat-icon>
          <span>Profile</span>
        </button>

        <button mat-menu-item routerLink="/settings">
          <mat-icon>settings</mat-icon>
          <span>Settings</span>
        </button>

        <button mat-menu-item>
          <mat-icon>help</mat-icon>
          <span>Help & Support</span>
        </button>

        <mat-divider></mat-divider>

        <button mat-menu-item (click)="logout()" class="logout-button">
          <mat-icon>logout</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [`
    .app-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: var(--header-height);
      padding: 0 16px;
    }

    .menu-button {
      margin-right: 16px;
    }

    .app-title {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }

    .title-main {
      font-size: 18px;
    }

    .title-sub {
      font-size: 12px;
      opacity: 0.8;
    }

    .spacer {
      flex: 1;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      border-radius: 24px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .user-avatar,
    .user-menu-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-menu-avatar {
      width: 48px;
      height: 48px;
    }

    .user-name {
      font-weight: 500;
    }

    .notification-menu {
      width: 350px;
      max-height: 400px;
    }

    .notification-header {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
    }

    .notification-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }

    .notification-list {
      max-height: 250px;
      overflow-y: auto;
    }

    .notification-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px 0;
    }

    .notification-title {
      font-weight: 500;
      font-size: 14px;
    }

    .notification-message {
      font-size: 12px;
      opacity: 0.7;
      line-height: 1.3;
    }

    .notification-time {
      font-size: 11px;
      opacity: 0.5;
    }

    .unread {
      background-color: rgba(33, 150, 243, 0.1);
    }

    .no-notifications {
      padding: 32px;
      text-align: center;
      color: var(--text-secondary);
    }

    .no-notifications mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      opacity: 0.3;
    }

    .notification-footer {
      padding: 8px 16px;
      border-top: 1px solid var(--border-color);
      text-align: center;
    }

    .user-menu {
      width: 280px;
    }

    .user-menu-header {
      padding: 16px;
      display: flex;
      gap: 12px;
      border-bottom: 1px solid var(--border-color);
    }

    .user-menu-info {
      flex: 1;
    }

    .user-menu-name {
      font-weight: 500;
      font-size: 14px;
    }

    .user-menu-role {
      font-size: 12px;
      color: var(--primary-color);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .user-menu-email {
      font-size: 12px;
      opacity: 0.7;
    }

    .logout-button {
      color: var(--warn-color);
    }

    @media (max-width: 768px) {
      .app-title {
        display: none;
      }

      .user-name {
        display: none;
      }

      .notification-menu,
      .user-menu {
        width: 280px;
      }
    }

    @media (max-width: 480px) {
      .app-header {
        padding: 0 8px;
      }

      .header-actions {
        gap: 4px;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();

  currentUser$: Observable<User | null>;
  notifications$: Observable<Notification[]>;
  unreadCount$: Observable<number>;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.notifications$ = this.notificationService.notifications$;
    this.unreadCount$ = this.notificationService.unreadCount$;
  }

  ngOnInit(): void {
    // Load initial notifications
    this.notificationService.loadNotifications();
  }

  toggleMenu(): void {
    this.menuToggle.emit();
  }

  toggleTheme(): void {
    this.themeToggle.emit();
  }

  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId);
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }

  logout(): void {
    this.authService.logout();
  }
}