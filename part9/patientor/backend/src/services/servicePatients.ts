import { Patient, PublicPatient, PatientNew, NewEntry } from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getAll = () : Array<PublicPatient> => {
  return patients.map(({ name, id, occupation, dateOfBirth, gender }) => { 
      return {
        name, id, occupation, dateOfBirth, gender
      };
  });
};

const findById = (id: string) : Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = (patient: PatientNew): PublicPatient => {
  const newPatient = {
    ...patient,
    id: uuid()
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( id: string, entry: NewEntry ) => {
  const patient = patients.find(p => p.id === id);
  if (patient) {
    const newEntry = {
      ...entry,
      id: uuid()
    };
    patient.entries  = patient.entries.concat(newEntry);
  }
  return patient;
};

export default {
  getAll,
  findById,
  addPatient,
  addEntry
};