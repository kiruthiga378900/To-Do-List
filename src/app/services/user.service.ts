import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/UpdateProfile/GetCurrentUser`);
  }

  updateProfile(user: User): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/UpdateProfile/UpdateProfile`, user);
  }

  getAllDoctors(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/Doctor/GetAllDoctors`);
  }

  getDoctorById(doctorId: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/Doctor/GetDoctorById/${doctorId}`);
  }

  getAllPatients(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/Patient/GetAllPatients`);
  }

  getPatientById(patientId: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/Patient/GetPatientById/${patientId}`);
  }

  getUsersByRole(role: UserRole): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/Admin/GetUsersByRole`, {
      params: { role }
    });
  }

  approveUser(userId: number): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/Admin/ApproveUser/${userId}`, {});
  }

  rejectUser(userId: number): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/Admin/RejectUser/${userId}`, {});
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/Admin/DeleteUser/${userId}`);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Login/ForgotPassword`, { email });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/UpdateProfile/ChangePassword`, {
      oldPassword,
      newPassword
    });
  }
}