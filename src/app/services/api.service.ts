import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Appointment, CreateAppointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Appointment APIs
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`, {
      headers: this.getHeaders()
    });
  }

  createAppointment(appointment: CreateAppointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/appointments`, appointment, {
      headers: this.getHeaders()
    });
  }

  updateAppointment(id: string, appointment: Partial<Appointment>): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.baseUrl}/appointments/${id}`, appointment, {
      headers: this.getHeaders()
    });
  }

  deleteAppointment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/appointments/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Dashboard Stats APIs
  getAdminStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/admin`, {
      headers: this.getHeaders()
    });
  }

  getDoctorStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/doctor`, {
      headers: this.getHeaders()
    });
  }

  getPatientStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/patient`, {
      headers: this.getHeaders()
    });
  }

  getHelpdeskStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/helpdesk`, {
      headers: this.getHeaders()
    });
  }
}