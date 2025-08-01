import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Core Services
import { AuthService } from '@core/services/auth.service';
import { ThemeService } from '@core/services/theme.service';
import { LoadingService } from '@core/services/loading.service';
import { NotificationService } from '@core/services/notification.service';

// Layout Components
import { HeaderComponent } from '@app/layout/header/header.component';
import { SidebarComponent } from '@app/layout/sidebar/sidebar.component';
import { FooterComponent } from '@app/layout/footer/footer.component';

// Material Modules
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatProgressBarModule,
    MatSidenavModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  template: `
    <div class="app-container" [class.dark-theme]="isDarkTheme">
      <!-- Loading Bar -->
      <mat-progress-bar 
        mode="indeterminate" 
        *ngIf="isLoading$ | async"
        class="loading-bar">
      </mat-progress-bar>

      <!-- Authentication Guard -->
      <ng-container *ngIf="isAuthenticated$ | async; else loginTemplate">
        <!-- Main Application Layout -->
        <mat-sidenav-container class="app-sidenav-container">
          <!-- Sidebar -->
          <mat-sidenav 
            #sidenav
            mode="side"
            opened="true"
            class="app-sidenav"
            [fixedInViewport]="true"
            [fixedTopGap]="64">
            <app-sidebar (menuToggle)="toggleSidebar()"></app-sidebar>
          </mat-sidenav>

          <!-- Main Content -->
          <mat-sidenav-content class="app-sidenav-content">
            <!-- Header -->
            <app-header 
              (menuToggle)="toggleSidebar()"
              (themeToggle)="toggleTheme()">
            </app-header>

            <!-- Page Content -->
            <main class="main-content">
              <router-outlet></router-outlet>
            </main>

            <!-- Footer -->
            <app-footer></app-footer>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </ng-container>

      <!-- Login Template -->
      <ng-template #loginTemplate>
        <div class="login-container">
          <router-outlet></router-outlet>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .loading-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .app-sidenav-container {
      flex: 1;
      display: flex;
    }

    .app-sidenav {
      width: var(--sidebar-width);
      background: var(--surface-color);
      border-right: 1px solid var(--border-color);
    }

    .app-sidenav-content {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .main-content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background: var(--background-color);
    }

    .login-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .dark-theme {
      --background-color: #121212;
      --surface-color: #1e1e1e;
      --text-primary: rgba(255, 255, 255, 0.87);
      --text-secondary: rgba(255, 255, 255, 0.6);
      --border-color: #333;
    }

    @media (max-width: 768px) {
      .app-sidenav {
        position: fixed;
        z-index: 100;
      }
      
      .main-content {
        padding: 8px;
      }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  isAuthenticated$ = this.authService.isAuthenticated$;
  isLoading$ = this.loadingService.loading$;
  isDarkTheme = false;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeApp();
    this.subscribeToThemeChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeApp(): void {
    // Initialize authentication
    this.authService.initializeAuth();
    
    // Check for saved theme preference
    this.themeService.initializeTheme();
  }

  private subscribeToThemeChanges(): void {
    this.themeService.isDarkTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        this.isDarkTheme = isDark;
      });
  }

  toggleSidebar(): void {
    // This will be handled by the sidenav component
    // Implementation depends on specific requirements
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}