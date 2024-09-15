import {
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,

} from "../action/types";

const INITIAL_STATE = {
  user: [],
  isLoggedIn: false,
  isLoading: false,
  isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state, isLoading: true, isError: false,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state, user: action.dataUser.data, isLoading: false, isError: false, isLoggedIn: true,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state, isError: true, isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
