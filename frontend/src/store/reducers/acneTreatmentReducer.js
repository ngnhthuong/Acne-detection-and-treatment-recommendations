import { GET_ACNE_TREATMENT, GET_ACNE_TREATMENT_SUCCESS, GET_ACNE_TREATMENT_FAIL } from '../actions/types';
const initData = {
  isLoading: false,
  products: [],
  isFail: false,
  isSuccess: false,
};
const acneTreatmentReducer = (state = initData, action) => {
  switch (action.type) {
    case GET_ACNE_TREATMENT:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ACNE_TREATMENT_SUCCESS:
      return {
        ...state,
        products: [...action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case GET_ACNE_TREATMENT_FAIL:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isFail: true,
      };
    default:
      return state;
  }
};
 
export default acneTreatmentReducer