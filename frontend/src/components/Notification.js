import React, { useState, useEffect } from "react";
import "./Notification.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserReset, regisUserReset } from "../action/actions";

const Notification = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState("");
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const errorRegisMessage = useSelector((state) => state.userRegis.errorRegisMessage);

  const isSuccessRegis = useSelector((state) => state.userRegis.isSuccess);
  const isErrorRegis = useSelector((state) => state.userRegis.isError);
  const isErrorLogin = useSelector((state) => state.user.isError);
  const isLoginSuccess = useSelector((state) => state.user.isLoginSuccess);
  const isPredictedSuccess = useSelector(
    (state) => state.acnePredictionDaily.isPredictedSuccess
  );
  const isPredictedError = useSelector(
    (state) => state.acnePredictionDaily.isError
  );

  useEffect(() => {
    let timer;

    if (isSuccessRegis || isErrorRegis) {
      setNotification(
        isSuccessRegis
          ? "Chào mừng đến với Glowypa 🥰"
          : `Đăng ký thất bại: ${errorRegisMessage} 🙂‍↔️`
      );
      setType(isSuccessRegis ? "success" : "error");
      setShow(true);
      timer = setTimeout(() =>{ 
        setShow(false)
        dispatch(regisUserReset());
      }, 4000);
    }

    if (isPredictedSuccess || isPredictedError) {
      setNotification(
        isPredictedSuccess
          ? "Nhận diện mụn thành công 🥰"
          : "Phát hiện mụn thất bại 🙂‍↔️"
      );
      setType(isPredictedSuccess ? "success" : "error");
      setShow(true);
      timer = setTimeout(() => setShow(false), 4000);
    }

    if (isErrorLogin || isLoginSuccess) {
      console.log("isErrorLogin", isErrorLogin);
      setNotification(
        isLoginSuccess ? "Đăng nhập thành công 🥰" : "Đăng nhập thất bại 🙂‍↔️"
      );
      setType(isLoginSuccess ? "success" : "error");
      setShow(true);
      timer = setTimeout(() => {
        setShow(false);
        dispatch(fetchUserReset());
      }, 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [
    isSuccessRegis,
    isErrorRegis,
    isErrorLogin,
    isLoginSuccess,
    isPredictedSuccess,
    isPredictedError,
    dispatch,
  ]);

  return (
    <div className={`notification ${show ? "show" : ""} ${type}`}>
      {notification}
    </div>
  );
};

export default Notification;
