import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Login/Login`, { email, password })
      .pipe(map(response => {
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      }));
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Registration/Register`, user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  hasRole(role: UserRole): boolean {
    const user = this.currentUserValue;
    return user ? user.role === role : false;
  }

  isAdmin(): boolean {
    return this.hasRole(UserRole.Admin);
  }

  isDoctor(): boolean {
    return this.hasRole(UserRole.Doctor);
  }

  isPatient(): boolean {
    return this.hasRole(UserRole.Patient);
  }

  isHelpDesk(): boolean {
    return this.hasRole(UserRole.HelpDesk);
  }

  getToken(): string | null {
    const user = this.currentUserValue;
    return user ? user.passwordHash : null;
  }
}