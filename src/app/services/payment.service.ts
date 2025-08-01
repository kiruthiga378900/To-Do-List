import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Payment, PaymentMethod } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${environment.apiUrl}/Payment/CreatePayment`, payment);
  }

  getPaymentById(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(`${environment.apiUrl}/Payment/GetPaymentById/${paymentId}`);
  }

  getPaymentsByUserId(userId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.apiUrl}/Payment/GetPaymentsByUserId/${userId}`);
  }

  getPaymentsByAppointmentId(appointmentId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.apiUrl}/Payment/GetPaymentsByAppointmentId/${appointmentId}`);
  }

  updatePaymentStatus(paymentId: number, status: string): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/Payment/UpdatePaymentStatus/${paymentId}`, { status });
  }

  processPayment(payment: Payment): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Payment/ProcessPayment`, payment);
  }

  getPaymentMethods(): PaymentMethod[] {
    return Object.values(PaymentMethod);
  }
}