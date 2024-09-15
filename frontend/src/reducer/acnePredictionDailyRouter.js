import {
  ACNE_DETECTION_DAILY_REQUEST,
  ACNE_DETECTION_DAILY_SUCCESS,
  ACNE_DETECTION_DAILY_FAILURE,
  ACNE_DETECTION_DAILY_CROP_EDIT,
  ACNE_DETECTION_DAILY_ACTIVE_SHOW,
} from "../action/types";

const INITIAL_STATE = {
  id_daily_acne_detection: "",
  id_user: "",
  images: [],
  predicted_images: [],
  date: "",
  image_active: "",
  isLoading: false,
  isError: false,
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
        if (action.dataAcnePredictionDaily !== null) {
          return {
            ...state,
            id_daily_acne_detection: action.dataAcnePredictionDaily.id,
            id_user: action.dataAcnePredictionDaily.id_user,
            images: action.dataAcnePredictionDaily.images,
            predicted_images: action.dataAcnePredictionDaily.predicted_images,
            date: action.dataAcnePredictionDaily.date,
            image_active: action.dataAcnePredictionDaily.images[0]?.image_id || "", // Sử dụng optional chaining
            isLoading: false,
            isError: false,
          };
        } else {
          return {
            ...state,
            isLoading: false,
            isError: true,
          };
        }
        
      case ACNE_DETECTION_DAILY_FAILURE:
        return {
          ...state,
          isError: true,
          isLoading: false,
        };
        
      case ACNE_DETECTION_DAILY_CROP_EDIT:
        return {
          ...state,
          images: action.dataCropEdit,
          image_active: action.dataCropEdit.length > 0 ? action.dataCropEdit[0].image_id : "",
        };
        
      case ACNE_DETECTION_DAILY_ACTIVE_SHOW:
        console.log('action.image_id_active', action.image_id_active);
        return {
          ...state,
          image_active: action.image_id_active,
        };
        
      default:
        return state;
    }
  };
  
  export default acnePredictionDailyReducer;
  