// Diagnosis.js
import React, { useState, useEffect } from "react";
import "./Acnedetection.css";
import AcneDetectionFuncRight from "./AcneDetectionFuncRight";
import AcneDetectionResultImg from "./AcneDetectionResultImg";
import AcneDetectionFuncHead from "./AcneDetectionFuncHead";
import UploadAndCropImageDialog from "./UploadAndCropImageDialog";
import { useSelector, useDispatch } from "react-redux";

export default function RightDiagnosis() {
  const images = useSelector((state) => state.acnePredictionDaily.images);

  const user = useSelector((state) => state.user.user);

  const [sliderConfidence, setSliderConfidence] = useState(44);
  const [sliderOverlap, setSliderOverlap] = useState(44);

  const [selectedOptionModeUsed, setSelectedOptionModeUsed] = useState("all");
  const [base64Image, setBase64Image] = useState("");

  const [imageBase64ArrayPredict, setImageBase64ArrayPredict] = useState([]);
  const [isUploadAndCropImageDialogOpen, setUploadAndCropImageDialogOpen] = useState(false);
  
  const toggleUploadAndCropImageDialogOpen = () => {
    setUploadAndCropImageDialogOpen((prev) => !prev); 
  };

  const handleChangeSliderConfidence = (event) => {
    console.log(event.target.value);
    setSliderConfidence(event.target.value);
  };

  const handleChangeSliderOverlap = (event) => {
    console.log(event.target.value);
    setSliderOverlap(event.target.value);
  };

  const handleChangeSelectedImage = (imgData) => {
    setBase64Image(imgData)
    console.log("Selected image data:", imgData);
  };

  const carryOutPrediction = (imageData, idImgDelete) => {
    setImageBase64ArrayPredict(imageData)
    console.log("Carry out prediction!--", imageData, idImgDelete);
  };

  useEffect(() => {
    if (imageBase64ArrayPredict.length === 0){
      setBase64Image("");
      return;
    };
    setBase64Image(imageBase64ArrayPredict[0]);
  }, [imageBase64ArrayPredict])

  useEffect(() => {
    console.log("user", user)
    console.log("images", images)
  })

  return (
    <>
      {isUploadAndCropImageDialogOpen && (
        <UploadAndCropImageDialog
          toggleUploadAndCropImageDialogOpen={
            toggleUploadAndCropImageDialogOpen
          }
          carryOutPrediction={carryOutPrediction}
          imageBase64ArrayPredict={imageBase64ArrayPredict}
        />
      )}
      <div className="acne__detection--split">
        <div className="acne__detection--tool">
          <AcneDetectionFuncHead
            toggleUploadAndCropImageDialogOpen={
              toggleUploadAndCropImageDialogOpen
            }
            imageBase64ArrayPredict = {imageBase64ArrayPredict}
            handleChangeSelectedImage = {handleChangeSelectedImage}
            base64Image = {base64Image}
          />
        </div>
        <div className="acne__detection--result">
          <AcneDetectionResultImg
            selectedOptionModeUsed={selectedOptionModeUsed}
            sliderConfidence={sliderConfidence}
            sliderOverlap={sliderOverlap}
            base64Image={base64Image}
          />
          <AcneDetectionFuncRight
            sliderConfidence={sliderConfidence}
            sliderOverlap={sliderOverlap}
            handleChangeSliderConfidence={handleChangeSliderConfidence}
            handleChangeSliderOverlap={handleChangeSliderOverlap}
          />
        </div>
      </div>
    </>
  );
}
