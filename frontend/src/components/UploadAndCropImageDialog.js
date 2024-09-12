import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./UploadAndCropImageDialog.css";
import { ReactComponent as MultipleImg } from "../assets/icons/multiple.svg";
import { ReactComponent as CropImg } from "../assets/icons/crop.svg";
import { ReactComponent as UploadImg } from "../assets/icons/upload-img.svg";
import { ReactComponent as LockedImg } from "../assets/icons/locked.svg";
import { ReactComponent as MedicalImg } from "../assets/icons/medical.svg";

import ImgDiagnoisis from "./ImgDiagnoisis";

const UploadAndCropImage = ({ toggleUploadAndCropImageDialogOpen, carryOutPrediction, imageBase64ArrayPredict}) => {
  const [imageBase64Array, setImageBase64Array] = useState(imageBase64ArrayPredict);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [idImgDelete, setIdImgDelete] = useState([]);

  const cropperRef = useRef(null);
  const generateDateTimeId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        if (img.width < 640 || img.height < 640) {
          setUploadError("Image must be at least 640x640 pixels.");
          setSelectedImage(null);
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result);
            setUploadError(""); // Clear any previous error
          };
          reader.readAsDataURL(file);
        }
      };
      img.src = URL.createObjectURL(file);
      event.target.value = null; // Reset the file input
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    const croppedImage = cropper
      .getCroppedCanvas({
        width: 640,
        height: 640,
      })
      .toDataURL();
    let imgUpObject = {
        id_img: generateDateTimeId(),
        img: croppedImage,
    };
    setImageBase64Array((prevArray) => [...prevArray, imgUpObject]);
    setSelectedImage(null); // Reset selected image after cropping
  };

  const handleDeleteImage = (id_img) => {
    setIdImgDelete((prevArray) => [...prevArray, id_img]);
    setImageBase64Array((prevArray) => prevArray.filter((imgObj) => imgObj.id_img !== id_img));
  };
  

  const isUploadDisabled = imageBase64Array.length >= 4;

  useEffect(() => {
    console.log(imageBase64Array);
  }, [imageBase64Array]);

  return (
    <div className="background__dialog ">
      <div className="background__dialog--main box--shadow-btn">
        <div className="dialog__header">
          <div className="dialog__header--area dialog__header--title">
            Choose Image Diagnosis
          </div>
          <button
            className="cls__btn box--shadow-btn"
            onClick={toggleUploadAndCropImageDialogOpen}
          >
            <MultipleImg className="icon--element-mul" />
          </button>
        </div>
        <div className="dialog__body">
          <div className="dialog__body-func">
            <div
              className={`dialog__body--upload-img-btn ${
                isUploadDisabled ? "disabled" : ""
              }`}
              onClick={() =>
                !isUploadDisabled &&
                document.getElementById("upload-input").click()
              }
              style={{ cursor: isUploadDisabled ? "not-allowed" : "pointer" }}
            >
              {isUploadDisabled ? (
                <LockedImg className="icon--element-locked" />
              ) : (
                <UploadImg className="icon--element-unlocked" />
              )}

              <p>
                {isUploadDisabled
                  ? "Image limit reached"
                  : "Click upload image"}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none", width: "100%", height: "100%" }}
                id="upload-input"
                disabled={isUploadDisabled}
              />
            </div>
          </div>

          {uploadError && <p className="error-message">{uploadError}</p>}

          {selectedImage && (
            <>
              <div className="cropper-container">
                <Cropper
                  src={selectedImage}
                  style={{ height: 400, width: "100%" }}
                  aspectRatio={1}
                  guides={false}
                  ref={cropperRef}
                  viewMode={1}
                  dragMode="move"
                  cropBoxMovable={false}
                  cropBoxResizable={false}
                  toggleDragModeOnDblclick={false}
                  minCropBoxWidth={640}
                  minCropBoxHeight={640}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                />
              </div>
              <button onClick={handleCrop} className="crop-btn box--shadow-btn">
                <CropImg className="icon--element-crop" />
                <span>Crop Image</span>
              </button>
            </>
          )}

          <div className="list__img--diagnoises">
            <div className="list__diagnoises--img">
              {imageBase64Array.map((base64, index) => (
                <ImgDiagnoisis
                  key={index}
                  id_img={base64.id_img}
                  base64={base64.img}
                  onDelete={handleDeleteImage}
                />
              ))}
            </div>
          </div>
          <div className="save__img">
            <button className="dialog__img-save" onClick = {() => carryOutPrediction(imageBase64Array)}>
            <MedicalImg className="icon--element-med" />
              <span>Carry out diagnosis</span>
            </button>
          </div>
          <div className="img__diagnoises--recommend">
            <div className="img__diagnoises--rule--title">
              Recommended Images
            </div>
            <div className="img__diagnoises--rules--list">
              <div className="img__diagnoises--rule"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAndCropImage;
