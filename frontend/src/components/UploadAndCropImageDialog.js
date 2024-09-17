import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./css/UploadAndCropImageDialog.css";
import { ReactComponent as MultipleImg } from "../assets/icons/multiple.svg";
import { ReactComponent as CropImg } from "../assets/icons/crop.svg";
import { ReactComponent as UploadImg } from "../assets/icons/upload-img.svg";
import { ReactComponent as LockedImg } from "../assets/icons/locked.svg";
import { ReactComponent as MedicalImg } from "../assets/icons/medical.svg";
import ZoomAcneImg from "../assets/icons/zoom_images.png";
import LimitedImg from "../assets/icons/limited_images.png";
import HighQualityImg from "../assets/icons/high_quality.png";

import ImgDiagnoisis from "./ImgDiagnoisis";
import LoadingTask from "./LoadingTask";
import { useSelector, useDispatch } from "react-redux";
import {
  detectionAcneDailyPut,
  detectionAcneDaily,
} from "../redux/action/actions";

const UploadAndCropImage = ({ toggleUploadAndCropImageDialogOpen }) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user.user.id);
  const id_daily_acne_detection = useSelector(
    (state) => state.acnePredictionDaily.id_daily_acne_detection
  );
  const images = useSelector((state) => state.acnePredictionDaily.images);
  const isLoading = useSelector((state) => state.acnePredictionDaily.isLoading);
  const [imageBase64Array, setImageBase64Array] = useState(images);
  const [imagePredict, setImagePredict] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [idImgDelete, setIdImgDelete] = useState([]);
  const [notificationEmpty, setNotificationEmpty] = useState(false);

  const cropperRef = useRef(null);
  const generateDateTimeId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
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
      image_id: generateDateTimeId(),
      image_base64: croppedImage,
    };
    setImageBase64Array((prevArray) => [...prevArray, imgUpObject]);
    setImagePredict((prevArray) => [...prevArray, imgUpObject]);
    setSelectedImage(null);
  };

  const handleDeleteImage = (id_img) => {
    setIdImgDelete((prevArray) => [...prevArray, id_img]);

    setImagePredict((prevArray) => {
      const newArray = prevArray.filter((imgObj) => imgObj.image_id !== id_img);
      return newArray;
    });

    setImageBase64Array((prevArray) => {
      const newArray = prevArray.filter((imgObj) => imgObj.image_id !== id_img);
      return newArray;
    });
    console.log("Delete image with id:", idImgDelete);
  };

  const isUploadDisabled = imageBase64Array.length >= 4;

  useEffect(() => {
    console.log(imageBase64Array);
  }, [imageBase64Array]);

  const handleDispatchImage = () => {
    if (id_daily_acne_detection == "") {
      if (imagePredict.length === 0) {
        setNotificationEmpty(true);
        setTimeout(() => {
          setNotificationEmpty(false);
        }, 3000);
        return;
      }
      dispatch(detectionAcneDaily(imagePredict, user_id));
    } else {
      if (imagePredict.length === 0 && idImgDelete.length === 0 || (images.length === 0 && imagePredict.length === 0)) {
        setNotificationEmpty(true);
        setTimeout(() => {
          setNotificationEmpty(false);
        }, 3000);
        return;
      }
      let data = {
        image_base64_list: imagePredict,
        img_id_remove_list: idImgDelete,
      };
      console.log("data", data);
      dispatch(detectionAcneDailyPut(data, user_id));
      setImagePredict([]);
    }
  };

  return (
    <div className="background__dialog ban--select">
      <div className="background__dialog--main box--shadow-btn">
        {isLoading && <LoadingTask />}
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
            {
              notificationEmpty && (
                <div className="notification__empty">
                  <p>Hãy thêm dữ liệu!</p>
                </div>
              )
            }
      
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
              {imageBase64Array.map((object, index) => (
                <ImgDiagnoisis
                  key={index}
                  image_id={object.image_id}
                  base64Image={object.image_base64}
                  onDelete={handleDeleteImage}
                />
              ))}
            </div>
          </div>

          <div className="save__img">
            <button
              className="dialog__img-save"
              onClick={() => {
                handleDispatchImage();
                setIdImgDelete([]);
              }}
            >
              <MedicalImg className="icon--element-med" />
              <span>Carry out diagnosis</span>
            </button>
          </div>

          <div className="img__diagnoises--recommend">
            <div className="img__diagnoises--rule--title">
              How to take a good image?
            </div>
            <div className="img__diagnoises--rules--list">
              <div className="img__diagnoises--rule">
                <div className="img__diagnoises--guild">
                  <img
                    className="img__diagnoises--icon"
                    src={HighQualityImg}
                    alt="limited_images"
                  />
                </div>
                <div className="img_diagnoises--text">
                  Đảm bảo rằng các ảnh tải lên có độ phân giải cao để tránh bị vỡ khi cắt ảnh và hỗ trợ quá
                  trình chuẩn đoán chính xác hơn.
                </div>
              </div>
              <div className="img__diagnoises--rule">
                <div className="img__diagnoises--guild">
                  <img
                    className="img__diagnoises--icon"
                    src={ZoomAcneImg}
                    alt="zoom_acne"
                  />
                </div>
                <div className="img_diagnoises--text">
                  Sử dụng chức năng phóng to ảnh để tránh việc vật thể mụn quá nhỏ. Điều này sẽ
                  cải thiện độ chính xác của quá trình chuẩn đoán.
                </div>
              </div>

              <div className="img__diagnoises--rule">
                <div className="img__diagnoises--guild">
                  <img
                    className="img__diagnoises--icon"
                    src={LimitedImg}
                    alt="limited_images"
                  />
                </div>
                <div className="img_diagnoises--text">
                  Bạn có thể tải lên tối thiểu 1 ảnh và tối đa 4 ảnh để chuẩn đoán mụn.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAndCropImage;
