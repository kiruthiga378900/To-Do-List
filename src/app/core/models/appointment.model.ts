export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
  RESCHEDULED = 'rescheduled'
}

export enum AppointmentType {
  CONSULTATION = 'consultation',
  FOLLOW_UP = 'follow_up',
  EMERGENCY = 'emergency',
  ROUTINE_CHECKUP = 'routine_checkup',
  PROCEDURE = 'procedure',
  VACCINATION = 'vaccination',
  LAB_TEST = 'lab_test',
  IMAGING = 'imaging',
  THERAPY = 'therapy'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentDate: Date;
  startTime: string; // HH:MM format
  endTime: string;   // HH:MM format
  duration: number;  // in minutes
  type: AppointmentType;
  status: AppointmentStatus;
  priority: Priority;
  reason: string;
  symptoms?: string[];
  notes?: string;
  prescriptions?: Prescription[];
  diagnosis?: string;
  treatmentPlan?: string;
  followUpDate?: Date;
  roomNumber?: string;
  cost: number;
  paid: boolean;
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID who created the appointment
  cancelledAt?: Date;
  cancelledBy?: string;
  cancellationReason?: string;
}

export interface AppointmentSlot {
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  doctorId: string;
  roomNumber?: string;
}

export interface CreateAppointmentRequest {
  patientId: string;
  doctorId: string;
  appointmentDate: Date;
  startTime: string;
  duration?: number;
  type: AppointmentType;
  priority?: Priority;
  reason: string;
  symptoms?: string[];
  notes?: string;
}

export interface UpdateAppointmentRequest {
  appointmentDate?: Date;
  startTime?: string;
  duration?: number;
  type?: AppointmentType;
  priority?: Priority;
  reason?: string;
  symptoms?: string[];
  notes?: string;
  status?: AppointmentStatus;
  roomNumber?: string;
}

export interface RescheduleAppointmentRequest {
  appointmentId: string;
  newDate: Date;
  newStartTime: string;
  reason: string;
}

export interface CancelAppointmentRequest {
  appointmentId: string;
  reason: string;
  notifyPatient?: boolean;
}

// Prescription related interfaces
export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  medications: Medication[];
  instructions: string;
  issuedDate: Date;
  validUntil?: Date;
  status: 'active' | 'expired' | 'cancelled';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  sideEffects?: string[];
}

// Appointment search and filter interfaces
export interface AppointmentSearchCriteria {
  patientId?: string;
  doctorId?: string;
  status?: AppointmentStatus[];
  type?: AppointmentType[];
  priority?: Priority[];
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
}

export interface AppointmentCalendarView {
  date: Date;
  appointments: CalendarAppointment[];
}

export interface CalendarAppointment {
  id: string;
  patientName: string;
  doctorName: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  priority: Priority;
  roomNumber?: string;
}

// Statistics and reporting interfaces
export interface AppointmentStats {
  total: number;
  byStatus: Record<AppointmentStatus, number>;
  byType: Record<AppointmentType, number>;
  byPriority: Record<Priority, number>;
  averageDuration: number;
  noShowRate: number;
  cancellationRate: number;
}

export interface DoctorSchedule {
  doctorId: string;
  doctorName: string;
  date: Date;
  appointments: Appointment[];
  availableSlots: AppointmentSlot[];
  totalAppointments: number;
  revenue: number;
}

// Utility functions
export function getAppointmentDuration(appointment: Appointment): number {
  const start = new Date(`1970-01-01T${appointment.startTime}`);
  const end = new Date(`1970-01-01T${appointment.endTime}`);
  return (end.getTime() - start.getTime()) / (1000 * 60); // in minutes
}

export function isAppointmentToday(appointment: Appointment): boolean {
  const today = new Date();
  const appointmentDate = new Date(appointment.appointmentDate);
  return (
    appointmentDate.getDate() === today.getDate() &&
    appointmentDate.getMonth() === today.getMonth() &&
    appointmentDate.getFullYear() === today.getFullYear()
  );
}

export function isAppointmentUpcoming(appointment: Appointment): boolean {
  const now = new Date();
  const appointmentDateTime = new Date(
    `${appointment.appointmentDate.toISOString().split('T')[0]}T${appointment.startTime}`
  );
  return appointmentDateTime > now;
}

export function canCancelAppointment(appointment: Appointment): boolean {
  return [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED].includes(appointment.status);
}

export function canRescheduleAppointment(appointment: Appointment): boolean {
  return [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED].includes(appointment.status);
}

export function getAppointmentStatusColor(status: AppointmentStatus): string {
  const colorMap: Record<AppointmentStatus, string> = {
    [AppointmentStatus.SCHEDULED]: '#2196f3',
    [AppointmentStatus.CONFIRMED]: '#4caf50',
    [AppointmentStatus.IN_PROGRESS]: '#ff9800',
    [AppointmentStatus.COMPLETED]: '#4caf50',
    [AppointmentStatus.CANCELLED]: '#f44336',
    [AppointmentStatus.NO_SHOW]: '#9e9e9e',
    [AppointmentStatus.RESCHEDULED]: '#9c27b0'
  };
  return colorMap[status] || '#757575';
}

export function getPriorityColor(priority: Priority): string {
  const colorMap: Record<Priority, string> = {
    [Priority.LOW]: '#4caf50',
    [Priority.MEDIUM]: '#ff9800',
    [Priority.HIGH]: '#ff5722',
    [Priority.URGENT]: '#f44336'
  };
  return colorMap[priority] || '#757575';
}