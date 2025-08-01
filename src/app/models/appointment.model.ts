import { specialization } from './user.model';

export enum AppointmentStatus {
  Scheduled = 'Scheduled',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  Rescheduled = 'Rescheduled',
  NotAttended = 'NotAttended'
}

export interface Appointment {
  appointmentId?: number;
  appointmentDate: Date;
  appointmentStartTime?: string;
  appointmentEndTime?: string;
  appointmentStatus?: AppointmentStatus;
  filePath?: string;
  fileName?: string;
  mimeType?: string;
  patientId: number;
  patientName: string;
  doctorId?: number;
  doctorName?: string;
  specialization: specialization;
  isReminderSent?: boolean;
}

export interface AppointmentDto {
  appointmentDate: Date;
  appointmentStartTime?: string;
  appointmentEndTime?: string;
  patientId: number;
  patientName: string;
  doctorId?: number;
  doctorName?: string;
  specialization: specialization;
}

export interface RescheduledDto {
  appointmentId: number;
  newAppointmentDate: Date;
  newAppointmentStartTime?: string;
  newAppointmentEndTime?: string;
}

export interface DoctorAppointmentUpdateDto {
  appointmentStatus: AppointmentStatus;
  notes?: string;
}