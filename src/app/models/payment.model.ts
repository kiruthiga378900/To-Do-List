export enum PaymentMethod {
  Card = 'Card',
  Cash = 'Cash',
  Upi = 'Upi',
  NetBanking = 'NetBanking'
}

export interface Payment {
  paymentId?: number;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  transactionId?: string;
  status?: string;
  userId: number;
  appointmentId?: number;
}