export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface CreateAppointment {
  patientId: string;
  doctorId: string;
  date: Date;
  time: string;
  reason: string;
}