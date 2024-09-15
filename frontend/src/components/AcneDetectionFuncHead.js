import React, { useEffect } from "react";
import { ReactComponent as UploadImg } from "../assets/icons/upload-img.svg";
import { ReactComponent as MultipleImg } from "../assets/icons/multiple.svg";
import "./AcneDetectionFuncHead.css";
import ImgDiagnoisis from "./ImgDiagnoisis";
import { useSelector, useDispatch } from "react-redux";
const AcneDetectionFuncHead = ({
  toggleUploadAndCropImageDialogOpen,
  handleChangeSelectedImage,
}) => {
  const images = useSelector((state) => state.acnePredictionDaily.images);
  return (
    <>
      <div
        className="acne__detection--tool-input-image box--shadow-btn"
        onClick={toggleUploadAndCropImageDialogOpen}
        style={{ cursor: "pointer" }}
      >
        <UploadImg className="icon--element-arrow" />
        <p>Click upload image</p>
      </div>
      <div className="acne__detection--tool-image-tool-scroll">
        <div className="acne__detection--tool-images">
          {images.map((object, index) => (
            <ImgDiagnoisis
              key = {index}
              tag="1"
              image_id = {object.image_id}
              base64Image= {object.image_base64}
              handleChangeSelectedImage ={handleChangeSelectedImage}
           />
          ))}
          {Array.from({ length: 4 - images.length }, (_, index) => (
            <ImgDiagnoisis
              key={`empty-${index}`}
              tag="1" 
              id_img={null}
              base64Image= {null}
              onDelete={() => {}}
            />
          ))}
        </div>
      </div>
      <div className="acne__detection--tool-model-logo-mode">
        <div className="acne__detection--tool-model-logo"></div>
      </div>
    </>
  );
};

export default AcneDetectionFuncHead;
