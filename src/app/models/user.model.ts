export enum UserRole {
  Patient = 'Patient',
  Doctor = 'Doctor',
  HelpDesk = 'HelpDesk',
  Admin = 'Admin'
}

export enum PatientGender {
  Female = 'Female',
  Male = 'Male',
  Others = 'Others'
}

export enum Relationship {
  Father = 'Father',
  Mother = 'Mother',
  Guardian = 'Guardian',
  Spouse = 'Spouse',
  Others = 'Others'
}

export enum Status {
  Online = 'Online',
  Busy = 'Busy',
  Offline = 'Offline',
  Not_Available = 'Not_Available'
}

export enum ShiftTime {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Night = 'Night',
  NotAllocated = 'NotAllocated'
}

export enum specialization {
  Cardiologist = 'Cardiologist',
  Dermatologist = 'Dermatologist',
  Neurologist = 'Neurologist',
  Orthopedic_Surgeon = 'Orthopedic_Surgeon',
  Pediatrician = 'Pediatrician',
  Psychiatrist = 'Psychiatrist',
  Ophthalmologist = 'Ophthalmologist',
  ENT_Specialist = 'ENT_Specialist',
  Gastroenterologist = 'Gastroenterologist',
  Urologist = 'Urologist',
  Endocrinologist = 'Endocrinologist',
  Oncologist = 'Oncologist'
}

export enum AppointmentType {
  Self = 'Self',
  HelpDesk = 'HelpDesk'
}

export enum AdminApproval {
  Pending = 'Pending',
  Approved = 'Approved',
  NotApproved = 'NotApproved'
}

export interface User {
  userId?: number;
  userName?: string;
  passwordHash?: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  email: string;
  phoneNumber?: string;
  role?: UserRole;
  createdAt?: Date;
  deletedAt?: Date;
  emergencyContactName?: string;
  emergencyContactRelationship?: Relationship;
  emergencyContactPhoneNumber?: string;
  dateOfBirth?: Date;
  gender?: PatientGender;
  specialization?: specialization;
  qualification?: string;
  experienceYears?: number;
  active_Status?: Status;
  consultant_fees?: number;
  languages?: string;
  shift?: ShiftTime;
  shiftStartTime?: string;
  shiftEndTime?: string;
  registeredBy?: AppointmentType;
  isApprovedByAdmin?: AdminApproval;
}