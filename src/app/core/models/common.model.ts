// Common pagination interface
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  timestamp: Date;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  timestamp: Date;
  path: string;
  details?: any;
}

// Search and filter interfaces
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  pagination?: PaginationParams;
}

export interface FilterOption {
  label: string;
  value: any;
  count?: number;
}

// Form validation interfaces
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  touched: Record<keyof T, boolean>;
  dirty: Record<keyof T, boolean>;
  valid: boolean;
  submitting: boolean;
}

// Notification interfaces
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actions?: NotificationAction[];
  autoClose?: boolean;
  duration?: number;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  type?: 'primary' | 'secondary';
}

// File upload interfaces
export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface UploadProgress {
  fileId: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

// Department and specialization interfaces
export interface Department {
  id: string;
  name: string;
  description: string;
  headOfDepartment?: string; // Doctor ID
  location: string;
  contactNumber: string;
  email: string;
  services: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Specialization {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  isActive: boolean;
}

// Room and facility interfaces
export interface Room {
  id: string;
  number: string;
  type: RoomType;
  floor: number;
  capacity: number;
  facilities: string[];
  isAvailable: boolean;
  currentPatient?: string; // Patient ID
  assignedDoctor?: string; // Doctor ID
  dailyRate?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum RoomType {
  CONSULTATION = 'consultation',
  OPERATION = 'operation',
  ICU = 'icu',
  GENERAL_WARD = 'general_ward',
  PRIVATE_WARD = 'private_ward',
  EMERGENCY = 'emergency',
  LAB = 'lab',
  RADIOLOGY = 'radiology'
}

// Billing and payment interfaces
export interface Bill {
  id: string;
  patientId: string;
  appointmentId?: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: BillStatus;
  dueDate: Date;
  paidDate?: Date;
  paymentMethod?: PaymentMethod;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'consultation' | 'procedure' | 'medication' | 'room' | 'test' | 'other';
}

export enum BillStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  INSURANCE = 'insurance',
  CHEQUE = 'cheque'
}

// Medical record interfaces
export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  recordType: MedicalRecordType;
  title: string;
  content: string;
  attachments: FileUpload[];
  vitals?: VitalSigns;
  createdAt: Date;
  updatedAt: Date;
}

export enum MedicalRecordType {
  CONSULTATION_NOTES = 'consultation_notes',
  DIAGNOSIS = 'diagnosis',
  TREATMENT_PLAN = 'treatment_plan',
  LAB_RESULTS = 'lab_results',
  IMAGING_RESULTS = 'imaging_results',
  DISCHARGE_SUMMARY = 'discharge_summary',
  PROGRESS_NOTES = 'progress_notes'
}

export interface VitalSigns {
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  heartRate?: number;
  temperature?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number;
  height?: number;
  bmi?: number;
  recordedAt: Date;
}

// Dashboard and statistics interfaces
export interface DashboardStats {
  appointments: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    pending: number;
  };
  patients: {
    total: number;
    new: number;
    active: number;
  };
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
  };
  occupancy: {
    totalRooms: number;
    occupiedRooms: number;
    availableRooms: number;
    occupancyRate: number;
  };
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

// System configuration interfaces
export interface SystemConfig {
  hospitalName: string;
  hospitalLogo?: string;
  address: Address;
  contactInfo: ContactInfo;
  businessHours: BusinessHours;
  timezone: string;
  currency: string;
  language: string;
  features: FeatureFlags;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
  breaks?: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface FeatureFlags {
  enableAppointmentReminders: boolean;
  enableSmsNotifications: boolean;
  enableEmailNotifications: boolean;
  enableOnlinePayments: boolean;
  enableTelehealth: boolean;
  enableMobileApp: boolean;
  enableReports: boolean;
  enableInventoryManagement: boolean;
}

// Utility types
export type Status = 'active' | 'inactive' | 'pending' | 'suspended';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Gender = 'male' | 'female' | 'other';

// Address interface (if not already defined in user.model.ts)
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
  website?: string;
  fax?: string;
}

// Generic CRUD operations interface
export interface CrudOperations<T, CreateT = Partial<T>, UpdateT = Partial<T>> {
  getAll(params?: SearchParams): Promise<PaginatedResponse<T>>;
  getById(id: string): Promise<T>;
  create(data: CreateT): Promise<T>;
  update(id: string, data: UpdateT): Promise<T>;
  delete(id: string): Promise<void>;
}

// Event interfaces for real-time updates
export interface SystemEvent {
  id: string;
  type: string;
  data: any;
  timestamp: Date;
  userId?: string;
}

export interface SocketEvent {
  event: string;
  data: any;
  room?: string;
}

// Export all for convenience
export * from './user.model';
export * from './appointment.model';