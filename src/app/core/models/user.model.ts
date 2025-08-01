export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  PATIENT = 'patient',
  STAFF = 'staff',
  RECEPTIONIST = 'receptionist'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  alternatePhone?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface BaseUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  gender: Gender;
  dateOfBirth: Date;
  address: Address;
  contactInfo: ContactInfo;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface Doctor extends BaseUser {
  role: UserRole.DOCTOR;
  licenseNumber: string;
  specialization: string[];
  department: string;
  consultationFee: number;
  experience: number; // in years
  education: string[];
  certifications: string[];
  availability: DoctorAvailability[];
  rating?: number;
  reviewCount?: number;
  bio?: string;
  languages: string[];
}

export interface DoctorAvailability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string;   // HH:MM format
  isAvailable: boolean;
}

export interface Patient extends BaseUser {
  role: UserRole.PATIENT;
  patientId: string;
  bloodGroup: string;
  allergies: string[];
  medicalHistory: MedicalHistory[];
  emergencyContact: EmergencyContact;
  insurance?: InsuranceInfo;
  preferredDoctor?: string; // Doctor ID
}

export interface MedicalHistory {
  id: string;
  condition: string;
  diagnosedDate: Date;
  status: 'active' | 'resolved' | 'chronic';
  notes?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  expiryDate: Date;
}

export interface Staff extends BaseUser {
  role: UserRole.STAFF | UserRole.NURSE | UserRole.RECEPTIONIST;
  employeeId: string;
  department: string;
  position: string;
  hireDate: Date;
  salary?: number;
  shift: 'morning' | 'afternoon' | 'night' | 'flexible';
  supervisor?: string; // Staff ID
}

export interface Admin extends BaseUser {
  role: UserRole.ADMIN;
  permissions: string[];
  lastPasswordChange: Date;
  twoFactorEnabled: boolean;
}

export type User = Doctor | Patient | Staff | Admin;

// Auth related interfaces
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Utility functions
export function getFullName(user: BaseUser): string {
  return `${user.firstName} ${user.lastName}`;
}

export function isDoctor(user: User): user is Doctor {
  return user.role === UserRole.DOCTOR;
}

export function isPatient(user: User): user is Patient {
  return user.role === UserRole.PATIENT;
}

export function isStaff(user: User): user is Staff {
  return [UserRole.STAFF, UserRole.NURSE, UserRole.RECEPTIONIST].includes(user.role);
}

export function isAdmin(user: User): user is Admin {
  return user.role === UserRole.ADMIN;
}

export function canAccessPatientData(user: User): boolean {
  return [UserRole.DOCTOR, UserRole.NURSE, UserRole.ADMIN].includes(user.role);
}

export function canManageAppointments(user: User): boolean {
  return [UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST, UserRole.ADMIN].includes(user.role);
}

export function canViewReports(user: User): boolean {
  return [UserRole.DOCTOR, UserRole.ADMIN].includes(user.role);
}