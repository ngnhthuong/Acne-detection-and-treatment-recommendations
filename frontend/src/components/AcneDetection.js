// Diagnosis.js
import React, { useState } from "react";
import "./Acnedetection.css";
import AcneDetectionFuncRight from "./AcneDetectionFuncRight";
import AcneDetectionResultImg from "./AcneDetectionResultImg";
import AcneDetectionFuncHead from "./AcneDetectionFuncHead";
import UploadAndCropImageDialog from "./UploadAndCropImageDialog";

export default function RightDiagnosis() {
  const [sliderConfidence, setSliderConfidence] = useState(44);
  const [sliderOverlap, setSliderOverlap] = useState(44);
  const [selectedOptionModeUsed, setSelectedOptionModeUsed] = useState("all");
  const [imageUrl, setImageSrc] = useState(null);
  const [imageBase64ArrayPredict, setImageBase64ArrayPredict] = useState([]);
  const [isUploadAndCropImageDialogOpen, setUploadAndCropImageDialogOpen] =
    useState(false);
  const toggleUploadAndCropImageDialogOpen = () => {
    setUploadAndCropImageDialogOpen((prev) => !prev); // Toggle dialog visibility
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeSliderConfidence = (event) => {
    console.log(event.target.value);
    setSliderConfidence(event.target.value);
  };

  const carryOutPrediction = (imageData) => {
    setImageBase64ArrayPredict(imageData)
    console.log("Carry out prediction!", imageData);
  };

  const handleChangeSliderOverlap = (event) => {
    console.log(event.target.value);
    setSliderOverlap(event.target.value);
  };

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
            handleImageUpload={handleImageUpload}
            toggleUploadAndCropImageDialogOpen={
              toggleUploadAndCropImageDialogOpen
            }
            imageBase64ArrayPredict = {imageBase64ArrayPredict}
          />
        </div>
        <div className="acne__detection--result">
          <AcneDetectionResultImg
            selectedOptionModeUsed={selectedOptionModeUsed}
            sliderConfidence={sliderConfidence}
            sliderOverlap={sliderOverlap}
            imageUrl={imageUrl}
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
