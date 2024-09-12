import { GET_ACNE_TREATMENT } from './types';

export const getAcneTreatment = (config) => {
  return {
    type: GET_ACNE_TREATMENT,
    payload: { config },
  };
}