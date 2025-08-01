import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  Appointment, 
  AppointmentDto, 
  RescheduledDto, 
  DoctorAppointmentUpdateDto,
  AppointmentStatus 
} from '../models/appointment.model';
import { specialization, ShiftTime } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getDoctorsList(specialization: specialization, shift: ShiftTime): Observable<any[]> {
    const params = new HttpParams()
      .set('specialization', specialization)
      .set('Shift', shift);
    
    return this.http.get<any[]>(`${environment.apiUrl}/Appointment/ListOfDoctors`, { params });
  }

  bookAppointment(appointmentDto: AppointmentDto, specialization: specialization, email: string, shift: ShiftTime): Observable<any> {
    const formData = new FormData();
    
    // Add appointment data to form data
    Object.keys(appointmentDto).forEach(key => {
      const value = appointmentDto[key as keyof AppointmentDto];
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const params = new HttpParams()
      .set('specialization', specialization)
      .set('Email', email)
      .set('shift', shift);

    return this.http.post<any>(`${environment.apiUrl}/Appointment/BookAppointment`, formData, { params });
  }

  rescheduleAppointment(rescheduleDto: RescheduledDto, email: string): Observable<any> {
    const formData = new FormData();
    
    Object.keys(rescheduleDto).forEach(key => {
      const value = rescheduleDto[key as keyof RescheduledDto];
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    return this.http.put<any>(`${environment.apiUrl}/Appointment/Reschedule`, formData, {
      params: { email }
    });
  }

  cancelAppointment(email: string): Observable<any> {
    const formData = new FormData();
    formData.append('Email', email);
    
    return this.http.put<any>(`${environment.apiUrl}/Appointment/Cancelled`, formData);
  }

  getAppointmentsForDoctor(email: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/Appointment/GetAppointmentsForDoctorId`, {
      params: { Email: email }
    });
  }

  getAppointmentsByPatientId(patientId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/Appointment/GetAppointmentsByPatientId`, {
      params: { PatId: patientId.toString() }
    });
  }

  updateAppointmentStatus(appointmentId: number, updateDto: DoctorAppointmentUpdateDto): Observable<any> {
    const formData = new FormData();
    formData.append('AppointmentId', appointmentId.toString());
    
    Object.keys(updateDto).forEach(key => {
      const value = updateDto[key as keyof DoctorAppointmentUpdateDto];
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    return this.http.put<any>(`${environment.apiUrl}/Appointment/UpdateAppointmentStatus-NotAttended-NotCompleted`, formData);
  }

  getPatientMedicalHistory(patientId: number): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/Appointment/GetPatientMedicalHistoriesById`, {
      params: { id: patientId.toString() },
      responseType: 'blob'
    });
  }

  getTodayAppointmentsForDoctor(doctorId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/Appointment/Today-AppointmentsForDoctor`, {
      params: { doctorId: doctorId.toString() }
    });
  }
}