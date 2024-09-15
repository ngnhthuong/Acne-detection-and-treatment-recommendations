import React, { useState, useEffect } from "react";
import "./RegistrationDialog.css";
import { ReactComponent as MultipleImg } from "../assets/icons/multiple.svg";
import { useSelector, useDispatch } from "react-redux";

import {
  regisUsers,
  regisUserRequest,
  regisUserSuccess,
  regisUserFailure,
} from "../action/actions";
const RegistrationForm = ({handleChangeRegisOpen}) => {
  const dispatch = useDispatch();
  const regisLoading = useSelector((state) => state.userRegis.isLoading);
  const regisError = useSelector((state) => state.userRegis.isError);
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    gender: "",
    skin_type: "",
    location: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = formData
    console.log("Form submitted:", data);
    dispatch(regisUsers(data));
  };

  useEffect(() => {
    console.log("regisLoading", regisLoading);
    console.log("regisError", regisError);
  }, [regisLoading, regisError]);

  return (
    <div className="registration">
      <div className="registration__background">
        <button className="cls-btn-regis" onClick={handleChangeRegisOpen}>
          <MultipleImg className="icon--element-mul" />
        </button>
        <form onSubmit={handleSubmit} className="registration__form">
          <div className="title-sologan">
            <p className="title">Sign up</p>
            <p>Detect early, treat smart, care for skin for life</p>
          </div>
          <div className="name__form">
            <div className="gap--information">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-49"
                placeholder="First Name"
              />
            </div>
            <div className="gap--information">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-49"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="birthday-skin__form">
            <div className="gap--information birthday__form">
              <label className="block text-gray-700">Birth Date</label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
              />
            </div>

            <div className="gap--information skin-type__form">
              <label className="block text-gray-700">Skin Type</label>
              <select
                name="skin_type"
                value={formData.skin_type}
                onChange={handleChange}
                required
              >
                <option value="">Select your skin type</option>
                <option value="normal">Normal</option>
                <option value="oily">Oily</option>
                <option value="dry">Dry</option>
                <option value="combination">Combination</option>
                <option value="sensitive">Sensitive</option>
                <option value="acne-prone">Acne-Prone</option>
              </select>
            </div>
          </div>

          <div className="gap--information, location__form">
            <input
              type="text"
              name="location"
              placeholder="Your City, Country"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gap--information, email__form">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="gap--information, password__form">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register__btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
