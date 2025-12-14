export type MotorBrand = 'Honda' | 'Mercury' | 'Tohatsu' | 'Suzuki' | 'Selva' | 'Yamaha';

export type ForfaitType = 'Premium' | 'Premium+' | 'Système de Refroidissement';

export interface MotorModel {
  brand: MotorBrand;
  power: number;
  model: string;
  price: {
    premium: number | null;
    premiumPlus: number | null;
  };
}

export interface ForfaitDetails {
  name: ForfaitType;
  items: string[];
  description: string;
  brand?: MotorBrand;
  longDescription?: string;
  frequency?: string;
  advantages?: string[];
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  message: string;
  boatBrand: string;
  boatModel: string;
  boatLength: string;
  boatWidth: string;
  motorBrand: MotorBrand | '';
  motorModel: string;
  motorPower: string;
  motorSerial: string;
  motorYear: string;
  motorHours: string;
  forfait: ForfaitType | '';
  requestQuote: boolean;
}

export interface AppointmentFormData {
  date: string;
  timeSlot: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  motorBrand: MotorBrand | '';
  motorModel: string;
  forfait: ForfaitType | '';
  notes: string;
}
