export enum MedicineType {
  none = 0,
  Paracetamol = 1,
  Ibuprofen = 2,
  Aspirin = 4,
  Naproxen = 8,
  Diclofenac = 16,
  Tramadol = 32,
  Morphine = 64,
  Codeine = 128,
  Amitriptyline = 256,
  Effervescent = 512,
  GelForm = 1024,
  SyrupForm = 2048,
  Inhaler = 4096,
  Suppository = 8192
}

export enum DosageType {
  None = 0,
  Mg_100 = 1,
  Mg_200 = 2,
  Mg_300 = 4,
  Mg_400 = 8,
  Mg_500 = 16,
  Mg_600 = 32,
  Mg_700 = 64,
  Mg_800 = 128,
  Mg_900 = 256,
  Mg_1000 = 512
}

export enum TabletScheduleTime {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Evening = 'Evening',
  Night = 'Night',
  AfterMeal = 'AfterMeal',
  BeforeMeal = 'BeforeMeal'
}

export interface Prescription {
  prescriptionId?: number;
  patientId: number;
  doctorId: number;
  prescriptionDate: Date;
  diagnosis?: string;
  notes?: string;
  nextVisitDate?: Date;
}

export interface PrescriptionMedicine {
  prescriptionMedicineId?: number;
  prescriptionId: number;
  medicineName: string;
  medicineType: MedicineType;
  dosageType: DosageType;
  tabletScheduleTime: TabletScheduleTime;
  duration: number;
  instructions?: string;
}