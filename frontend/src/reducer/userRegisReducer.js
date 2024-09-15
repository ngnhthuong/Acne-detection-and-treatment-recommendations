import {
    REGIS_USER_FAILURE, REGIS_USER_SUCCESS, REGIS_USER_REQUEST
  } from "../action/types";
  
  const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    isClose: false,
  };
  
  const userRegisReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case REGIS_USER_REQUEST:
        return {
          ...state, isLoading: true, isError: false,
        };
      case REGIS_USER_SUCCESS:
        return {
          ...state, isLoading: false, isError: false,
        };
      case REGIS_USER_FAILURE:
        return {
          ...state, isError: true, isLoading: false,
        };
      default:
        return state;
    }
  };
  
  
  
  export default userRegisReducer;
  