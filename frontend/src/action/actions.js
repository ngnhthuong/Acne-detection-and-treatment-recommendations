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
  ACNE_DETECTION_DAILY_ACTIVE_SHOW,
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
      const res = await axios.post(
        "http://localhost:8000/api/user/login/",
        data
      );
      const dataRes = res && res.data ? res.data : [];
      console.log("dataRes", dataRes);
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

export const fetchUserSuccess = (dataRes) => {
  return {
    type: FETCH_USER_SUCCESS,
    dataUser: dataRes,
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

export const regisUserSuccess = () => {
  return {
    type: REGIS_USER_SUCCESS,
  };
};

export const regisUserFailure = (error) => {
  return {
    type: REGIS_USER_FAILURE,
    payload: error,
  };
};

// detection skin daily

export const detectionAcneDaily = (data, user_id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(detectionAcneDailyRequest());
      const res = await axios.post(
        "http://localhost:8000/api/acne_detection_daily/" + user_id,
        data
      );
      const dataRes = res && res.data ? res.data.data : null;
      console.log('dadaad---',dataRes);
      dispatch(detectionAcneDailySuccess(dataRes));
    } catch (error) {
      dispatch(detectionAcneDailyFailure(error));
      console.log("error", error);
    }
  };
};

export const detectionAcneDailyPut = (data, user_id) => {
    return async (dispatch, getState) => {
      try {
        dispatch(detectionAcneDailyRequest());
        const res = await axios.put(
          "http://localhost:8000/api/acne_detection_daily/deleteAndPut/" + user_id,
          data
        );
        const dataRes = res && res.data ? res.data.data : null;
        dispatch(detectionAcneDailySuccess(dataRes));
      } catch (error) {
        dispatch(detectionAcneDailyFailure(error));
        console.log("error", error);
      }
    };
};

export const getDetectionAcneDailyPut = (user_id) => {
    return async (dispatch, getState) => {
      try {
        dispatch(detectionAcneDailyRequest());
        const res = await axios.get(
          "http://localhost:8000/api/acne_detection_daily/" + user_id
        );
        const dataRes = res && res.data ? res.data.data : null;
        dispatch(detectionAcneDailySuccess(dataRes));
      } catch (error) {
        dispatch(detectionAcneDailyFailure(error));
        console.log("error", error);
      }
    };
};

export const detectionAcneDailyRequest = () => {
  return {
    type: ACNE_DETECTION_DAILY_REQUEST,
  };
};

export const detectionAcneDailySuccess = (dataRes) => {
  return {
    type: ACNE_DETECTION_DAILY_SUCCESS,
    dataAcnePredictionDaily: dataRes,
  };
};

export const detectionAcneDailyFailure = (error) => {
  return {
    type: ACNE_DETECTION_DAILY_FAILURE,
    payload: error,
  };
};
// edit image crop
export const detectionAcneDailyCropEdit = (data) => {
  return {
    type: ACNE_DETECTION_DAILY_CROP_EDIT,
    dataCropEdit: data,
  };
};
// show image active
export const detectionAcneDailyActiveShow = (image_id) => {
  return {
    type: ACNE_DETECTION_DAILY_ACTIVE_SHOW,
    image_id_active: image_id,
  };
};
