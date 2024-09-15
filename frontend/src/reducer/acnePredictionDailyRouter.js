import {
  ACNE_DETECTION_DAILY_REQUEST,
  ACNE_DETECTION_DAILY_SUCCESS,
  ACNE_DETECTION_DAILY_FAILURE,
  ACNE_DETECTION_DAILY_CROP_EDIT,
} from "../action/types";

const INITIAL_STATE = {
  id_daily_acne_detection: "",
  id_user: "",
  images: [],
  predicted_images: [],
  date: "",
};

const acnePredictionDailyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACNE_DETECTION_DAILY_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case ACNE_DETECTION_DAILY_SUCCESS:
      return {
        ...state,
        id_daily_acne_detection: action.dataAcnePredictionDaily.data.id,
        id_user: action.dataAcnePredictionDaily.data.id_user,
        images: action.dataAcnePredictionDaily.data.images,
        predicted_images: action.dataAcnePredictionDaily.data.predicted_images,
        date: action.dataAcnePredictionDaily.data.date,
        isLoading: false,
        isError: false,
        isLoggedIn: true,
      };
    case ACNE_DETECTION_DAILY_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case ACNE_DETECTION_DAILY_CROP_EDIT:
        console.log('hihii')
        return {
            ...state,
            images: action.dataCropEdit,
        };
    default:
      return state;
  }
};

export default acnePredictionDailyReducer;
