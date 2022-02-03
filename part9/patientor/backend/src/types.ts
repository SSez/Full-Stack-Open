export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type DiagnosisCodes = Array<Diagnosis['code']>;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: DiagnosisCodes;
}

enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
  criteria: string;
  date: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string
  entries: Entry[]
}

export type NewBaseEntry = Omit<BaseEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalHealthCareEntry = Omit<OccupationalHealthCareEntry, 'id'>;
export type NewHospitalEntry= Omit<HospitalEntry, 'id'>;
export type NewEntry = NewHealthCheckEntry | NewOccupationalHealthCareEntry | NewHospitalEntry;

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthCareEntry;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type PatientNew = Omit<Patient, 'id'>;