import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import { RegisterRequest, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <div class="register-container">
      <div class="register-card">
        <mat-card>
          <mat-card-header>
            <div class="hospital-logo">
              <mat-icon>local_hospital</mat-icon>
            </div>
            <mat-card-title>Create Account</mat-card-title>
            <mat-card-subtitle>Join Hospital Management System</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
              
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>First Name</mat-label>
                  <input matInput 
                         formControlName="firstName" 
                         placeholder="Enter first name">
                  <mat-icon matSuffix>person</mat-icon>
                  <mat-error *ngIf="registerForm.get('firstName')?.hasError('required')">
                    First name is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Last Name</mat-label>
                  <input matInput 
                         formControlName="lastName" 
                         placeholder="Enter last name">
                  <mat-icon matSuffix>person</mat-icon>
                  <mat-error *ngIf="registerForm.get('lastName')?.hasError('required')">
                    Last name is required
                  </mat-error>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Email</mat-label>
                <input matInput 
                       type="email" 
                       formControlName="email" 
                       placeholder="Enter your email">
                <mat-icon matSuffix>email</mat-icon>
                <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Phone Number</mat-label>
                <input matInput 
                       type="tel" 
                       formControlName="phone" 
                       placeholder="Enter phone number">
                <mat-icon matSuffix>phone</mat-icon>
                <mat-error *ngIf="registerForm.get('phone')?.hasError('required')">
                  Phone number is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Role</mat-label>
                <mat-select formControlName="role">
                  <mat-option value="admin">Admin</mat-option>
                  <mat-option value="doctor">Doctor</mat-option>
                  <mat-option value="patient">Patient</mat-option>
                  <mat-option value="helpdesk">Helpdesk</mat-option>
                </mat-select>
                <mat-icon matSuffix>badge</mat-icon>
                <mat-error *ngIf="registerForm.get('role')?.hasError('required')">
                  Please select a role
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Password</mat-label>
                <input matInput 
                       [type]="hidePassword ? 'password' : 'text'" 
                       formControlName="password" 
                       placeholder="Enter password">
                <button mat-icon-button 
                        matSuffix 
                        type="button"
                        (click)="hidePassword = !hidePassword">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                  Password is required
                </mat-error>
                <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                  Password must be at least 6 characters
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Confirm Password</mat-label>
                <input matInput 
                       [type]="hideConfirmPassword ? 'password' : 'text'" 
                       formControlName="confirmPassword" 
                       placeholder="Confirm password">
                <button mat-icon-button 
                        matSuffix 
                        type="button"
                        (click)="hideConfirmPassword = !hideConfirmPassword">
                  <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">
                  Please confirm your password
                </mat-error>
                <mat-error *ngIf="registerForm.hasError('passwordMismatch')">
                  Passwords do not match
                </mat-error>
              </mat-form-field>

              <button mat-raised-button 
                      color="primary" 
                      type="submit" 
                      class="register-button full-width"
                      [disabled]="registerForm.invalid || isLoading">
                <mat-icon *ngIf="isLoading">hourglass_empty</mat-icon>
                {{isLoading ? 'Creating Account...' : 'Create Account'}}
              </button>
            </form>
          </mat-card-content>

          <mat-card-actions class="card-actions">
            <p>Already have an account? 
              <a routerLink="/login" class="login-link">Sign in here</a>
            </p>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
      padding: 20px;
    }

    .register-card {
      width: 100%;
      max-width: 500px;
    }

    mat-card {
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    mat-card-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .hospital-logo {
      margin: 0 auto 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #1976d2;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hospital-logo mat-icon {
      color: white;
      font-size: 30px;
      width: 30px;
      height: 30px;
    }

    mat-card-title {
      color: #333;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    mat-card-subtitle {
      color: #666;
      font-size: 14px;
    }

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-row {
      display: flex;
      gap: 15px;
    }

    .form-row mat-form-field {
      flex: 1;
    }

    .full-width {
      width: 100%;
    }

    .register-button {
      height: 48px;
      font-size: 16px;
      font-weight: 500;
      margin-top: 10px;
    }

    .card-actions {
      text-align: center;
      margin-top: 20px;
    }

    .card-actions p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    .login-link {
      color: #1976d2;
      text-decoration: none;
      font-weight: 500;
    }

    .login-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      .register-container {
        padding: 10px;
      }

      mat-card {
        padding: 20px;
      }

      .form-row {
        flex-direction: column;
        gap: 0;
      }

      mat-card-title {
        font-size: 20px;
      }
    }
  `]
})
export class RegistrationComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const userData: RegisterRequest = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        role: this.registerForm.value.role as UserRole,
        password: this.registerForm.value.password
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(
            error.error?.message || 'Registration failed. Please try again.', 
            'Close', 
            {
              duration: 5000,
              panelClass: ['error-snackbar']
            }
          );
        }
      });
    }
  }
}