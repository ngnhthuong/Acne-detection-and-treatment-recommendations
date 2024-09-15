import React, { useEffect, useState } from "react";
import "./Login.css";
import { ReactComponent as ViewOnImg } from "../assets/icons/view-on.svg";
import { ReactComponent as ViewOffImg } from "../assets/icons/view-off.svg";
import LogoImg from "../assets/logo/lowypa1.png";
import RegistrationDialog from "../components/RegistrationDialog";
import { useSelector, useDispatch } from "react-redux";
import { FetchUsers } from "../action/actions";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [regisOpen, setRegisOpen] = useState(false);

  const handleChangeRegisOpen = () => {
    setRegisOpen((prev) => !prev);
  };

  const handleViewPassword = () => {
    setViewPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    dispatch(FetchUsers(data));
  };
  useEffect(() => {
    if (isLoggedIn && user) {
      navigate("/diagnosis"); // Chuyển hướng đến /diagnosis
    }
  }, [isLoggedIn, user, navigate]);
  return (
    <>
      {regisOpen && (
        <RegistrationDialog handleChangeRegisOpen={handleChangeRegisOpen} />
      )}
      <div className="login__background">
        <div className="login__background--split">
          <div className="sologan__background">
            <img
              className="sologan__background--logo"
              src={LogoImg}
              alt="Logo"
            />
            <p className="title">Skin Diagnosis</p>
            <p className="sologan__background-p">
              Detect early, treat smart, care for skin for life
            </p>
          </div>
          <div className="form__login box--shadow-btn">
            <form onSubmit={handleSubmit} className="login">
              <p className="title">Login</p>
              <div className="login__email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                />
              </div>
              <div className="login__password">
                <input
                  type={viewPassword ? "text" : "password"} // Toggle between text and password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                {viewPassword ? (
                  <ViewOffImg
                    onClick={handleViewPassword}
                    className="icon--element-view"
                  />
                ) : (
                  <ViewOnImg
                    onClick={handleViewPassword}
                    className="icon--element-view"
                  />
                )}
              </div>
              <div className="forget__func">
                <span>Forget password?</span>
              </div>
              <button className="login__submit--btn" type="submit">
                Login
              </button>
            </form>
            <div className="hr__split"></div>
            <div className="login_func">
              <button
                className="login__submit--btn "
                onClick={handleChangeRegisOpen}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
