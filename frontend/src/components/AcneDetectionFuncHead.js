import React from "react";
import { ReactComponent as UploadImg } from "../assets/icons/upload-img.svg";
import { ReactComponent as MultipleImg } from "../assets/icons/multiple.svg";
import logoImg from "../assets/logo/logoWord.png";
import "./AcneDetectionFuncHead.css";
import ImgDiagnoisis from "./ImgDiagnoisis";

const AcneDetectionFuncHead = ({
  handleImageUpload,
  toggleUploadAndCropImageDialogOpen,
  imageBase64ArrayPredict,
}) => {
  const totalSlots = 4; // Fixed number of ImgDiagnoisis components
  const filledSlots = imageBase64ArrayPredict.length;
  const emptySlots = totalSlots - filledSlots;

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
          {/* Render filled slots with data */}
          {imageBase64ArrayPredict.map((base64, index) => (
            <ImgDiagnoisis
              key={base64.id_img}
              tag="1"
              id_img={base64.id_img}
              base64={base64.img}
              onDelete={handleImageUpload}
            />
          ))}
          {/* Render empty slots */}
          {Array.from({ length: emptySlots }, (_, index) => (
            <ImgDiagnoisis
              key={`empty-${index}`}
              tag="1" 
              id_img={null}
              base64={null} 
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
