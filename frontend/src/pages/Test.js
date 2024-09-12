// // Diagnosis.js
// import React from 'react';
// import './diagnosis.css';
// import MarkedCalendar from '../components/MarkedCalendar';
// import '../components/MarkedCalendar.css';
// import {store} from '../redux/store';
// import {increaseCount, decreaseCount} from '../redux/action';
// import { counterReducer } from '../redux/reducer';
// import {connect} from 'react-redux';

// function Test(props){
//   const handleIncrease = () => {
//     props.increaseCount()
//   };
//   const handleDecrease = () => {
//     props.decreaseCount()
//   };
//   return (
//     <div>
//       <h1>Redux turtorials</h1>
//       <h4>result: {props.count}</h4>
//       <button onClick={handleIncrease}>Increase</button>
//       <button onClick={handleDecrease}>Decreate</button>
//     </div>
//   );
// };

// function mapStateToProps(state){
//   return {
//     count: state.count
//   }
// }
// function mapDispatchToProps(dispatch){
//   return {
//     increaseCount: () => dispatch(increaseCount()),
//     decreaseCount: () => dispatch(decreaseCount())
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Test);


// import React, { useState, useEffect } from "react";
// import "./UploadAndCropImageDialog.css";
// import { ReactComponent as MultipleImg } from "../assets/icons/multiple.svg";
// import { ReactComponent as UploadImg } from "../assets/icons/upload-img.svg";
// import ImgDiagnoisis from "./ImgDiagnoisis";

// const UploadAndCropImage = () => {
//   const [imageBase64Array, setImageBase64Array] = useState([]);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         setImageBase64Array((prevArray) => [...prevArray, base64String]);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDeleteImage = (index) => {
//     setImageBase64Array((prevArray) => prevArray.filter((_, i) => i !== index));
//   };

//   useEffect(() => {
//     console.log(imageBase64Array);
//   }, [imageBase64Array]);

//   return (
//     <div className="background__dialog ">
//       <div className="background__dialog--main box--shadow-btn">
//         <div className="dialog__header">
//           <div className="dialog__header--area dialog__header--title">
//             Choose Image Diagnosis
//           </div>
//           <button className="cls__btn box--shadow-btn">
//             <MultipleImg className="icon--element-mul" />
//           </button>
//         </div>
//         <div className="dialog__body">
//           <div
//             className="dialog__body--upload-img-btn box--shadow-btn"
//             onClick={() => document.getElementById("upload-input").click()}
//             style={{ cursor: "pointer" }}
//           >
//             <UploadImg className="icon--element-arrow" />
//             <p>Click upload image</p>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               style={{ display: "none", width: "100%", height: "100%" }}
//               id="upload-input"
//             />
//           </div>
//           <div className="list__img--diagnoises">
//             <div className="list__diagnoises--img">
//               {imageBase64Array.map((base64, index) => (
//                 <ImgDiagnoisis
//                   key={index}
//                   index={index}
//                   base64={base64}
//                   onDelete={handleDeleteImage}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="img__diagnoises--recommend">
//             <div className="img__diagnoises--rule--title">
//               Recommended Images
//             </div>
//             <div className="img__diagnoises--rules--list">
//               <div className="img__diagnoises--rule"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadAndCropImage;
