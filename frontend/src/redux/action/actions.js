import axios from "axios";

import { BASE_URL } from "../../configs/config";

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
  ACNE_DETECTION_DAILY_REQUEST_GET,
  ACNE_DETECTION_NOTIFICATION_SUCCESS_REQUEST,
  FETCH_USER_RESET,
  REGIS_USER_RESET,
  ACNE_DETECTION_DAILY_RESET,
  ACTIVE_DIALOG_SETTING,
  ACTIVE_DIALOG_RESET,
  CLOSE_DIALOG_SETTING,
  ACTIVE_DIALOG_UPLOAD_IMG,
  CLOSING_DIALOG_UPLOAD_IMG,

  CHATBOX_REQUESTION,
  CHATBOX_RESPONSE,
  CHATBOX_RESET,
  CHATBOX_RAG,
  CHATBOX_MEDICAL_DB,
  CHATBOX_FAILURE,
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
    console.log("dataRes", data);
    try {
      dispatch(fetchUserRequest());

      const res = await axios.post(`${BASE_URL}/api/user/login/`, data);
      const dataRes = res && res.data ? res.data : {};

      console.log("dataRes", dataRes);

      if (dataRes.token) {
        localStorage.setItem("authToken", dataRes.token);
        localStorage.setItem("userData", JSON.stringify(dataRes.data));
      }

      dispatch(fetchUserSuccess(dataRes));
    } catch (error) {
      console.error("Login error:", error);
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
  console.log("dataRRRR", dataRes);
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
export const fetchUserReset = () => {
  return {
    type: FETCH_USER_RESET,
  };
};

// regis user

export const regisUsers = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(regisUserRequest());
      const res = await axios.post(`${BASE_URL}/api/user/register/`, data);
      dispatch(regisUserSuccess());
    } catch (error) {
      const dataRes = error.response.data["detail"];
      console.log("error", error);
      dispatch(regisUserFailure(dataRes));
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

export const regisUserReset = () => {
  return {
    type: REGIS_USER_RESET,
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

      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${BASE_URL}/api/acne_detection_daily/${user_id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const dataRes = res && res.data ? res.data.data : null;
      console.log("dadaad---", dataRes);
      dispatch(detectionAcneDailySuccess(dataRes));
      dispatch(detectionAcneDailySuccessNoti());
      dispatch(closeDialogUploadImg())
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

      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        `${BASE_URL}/api/acne_detection_daily/deleteAndPut/${user_id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const dataRes = res && res.data ? res.data.data : null;
      dispatch(detectionAcneDailySuccess(dataRes));
      dispatch(detectionAcneDailySuccessNoti());
      dispatch(closeDialogUploadImg())
    } catch (error) {
      dispatch(detectionAcneDailyFailure(error));
      console.log("error", error);
    }
  };
};

export const getDetectionAcneDailyPut = (user_id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(detectionAcneDailyRequestGet());

      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${BASE_URL}/api/acne_detection_daily/${user_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const dataRes = res && res.data ? res.data.data : null;
      setTimeout(() => {
        dispatch(detectionAcneDailySuccess(dataRes));
      }, 2750);
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

export const detectionAcneDailyRequestGet = () => {
  return {
    type: ACNE_DETECTION_DAILY_REQUEST_GET,
  };
};

export const detectionAcneDailySuccess = (dataRes) => {
  return {
    type: ACNE_DETECTION_DAILY_SUCCESS,
    dataAcnePredictionDaily: dataRes,
  };
};

export const detectionAcneDailySuccessNoti = () => {
  return {
    type: ACNE_DETECTION_NOTIFICATION_SUCCESS_REQUEST,
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


// ACTIVE DIALOG
export const activeDialogSetting = () => {
  return {
    type: ACTIVE_DIALOG_SETTING,
  };
}

export const closeDialogSetting = () => {
  return {
    type: CLOSE_DIALOG_SETTING,
  };
}

export const activeDialogUploadImg = () => {
  return {
    type: ACTIVE_DIALOG_UPLOAD_IMG,
  };
}

export const closeDialogUploadImg = () => {
  return {
    type: CLOSING_DIALOG_UPLOAD_IMG,
  };
}



// chatbox
export const chatboxRequestUser = (data) => {
  return {
    type: CHATBOX_REQUESTION,
    payload: data
  };
};

export const chatboxRequestion = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(chatboxRequestUser(data));
      const token = localStorage.getItem("authToken");
      console.log("dataRes-----|", data);
      const res = await axios.post(
        `${BASE_URL}/api/chatbox/`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const dataRes = res && res.data ? res.data.chatbox : null;
      console.log("dadaad---", dataRes);
      dispatch(chatboxResponse(dataRes));
    } catch (error) {
      dispatch(chatboxFailure(error));
      console.log("error", error);
    }
  };
};



export const chatboxResponse = (data) => {
  return {
    type: CHATBOX_RESPONSE,
    payload: data
  };
};

export const chatboxReset = () => {
  return {
    type: CHATBOX_RESET,
  };
};

export const chatboxRag = () => {
  return {
    type: CHATBOX_RAG,
  };
};

export const chatboxMedicalDb = () => {
  return {
    type: CHATBOX_MEDICAL_DB,
  };
};

export const chatboxFailure = (error) => {
  return {
    type: CHATBOX_FAILURE,
    payload: error
  };
}