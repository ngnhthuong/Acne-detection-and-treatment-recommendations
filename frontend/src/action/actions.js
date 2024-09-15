import axios from "axios";
import {
  INCREMENT,
  DECREMENT,
  DEVIDE,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  REGIS_USER_FAILURE,
  REGIS_USER_SUCCESS,
  REGIS_USER_REQUEST,
  ACNE_DETECTION_DAILY_REQUEST,
  ACNE_DETECTION_DAILY_SUCCESS,
  ACNE_DETECTION_DAILY_FAILURE,
  ACNE_DETECTION_DAILY_CROP_EDIT,
} from "./types";

export const increaseCounter = (data) => {
  return {
    type: INCREMENT,
    payload: { name: "Nguyen Van A", data: data },
  };
};

export const decreaseCounter = () => {
  return {
    type: DECREMENT,
  };
};

export const devideCounter = () => {
  return {
    type: DEVIDE,
  };
};

// login

export const FetchUsers = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchUserRequest());
      console.log("data", data);
      const res = await axios.post(
        "http://localhost:8000/api/user/login/",
        data
      );
      const dataRes = res && res.data ? res.data : [];
      dispatch(fetchUserSuccess(dataRes));
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };
};

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    dataUser: data,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

// regis user

export const regisUsers = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(regisUserRequest());
      const res = await axios.post(
        "http://localhost:8000/api/user/register/",
        data
      );
      dispatch(regisUserSuccess());
    } catch (error) {
      dispatch(regisUserFailure(error));
      console.log("error", error);
    }
  };
};

export const regisUserRequest = () => {
  return {
    type: REGIS_USER_REQUEST,
  };
};

export const regisUserSuccess = (data) => {
  return {
    type: REGIS_USER_SUCCESS,
    dataUser: data,
  };
};

export const regisUserFailure = (error) => {
  return {
    type: REGIS_USER_FAILURE,
    payload: error,
  };
};

// detection skin daily

export const detectionAcneDaily = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(regisUserRequest());
      const res = await axios.post(
        "http://localhost:8000/api/user/register/",
        data
      );
      dispatch(regisUserSuccess());
    } catch (error) {
      dispatch(regisUserFailure(error));
      console.log("error", error);
    }
  };
};

export const detectionAcneDailyRequest = () => {
  return {
    type: ACNE_DETECTION_DAILY_REQUEST,
  };
};

export const detectionAcneDailySuccess = (data) => {
  return {
    type: ACNE_DETECTION_DAILY_SUCCESS,
    dataAcnePredictionDaily: data,
  };
};

export const detectionAcneDailyFailure = (error) => {
  return {
    type: ACNE_DETECTION_DAILY_FAILURE,
    payload: error,
  };
};

export const detectionAcneDailyCropEdit = (data) => {
    return {
      type: ACNE_DETECTION_DAILY_CROP_EDIT,
      dataCropEdit: data,
    };
  };