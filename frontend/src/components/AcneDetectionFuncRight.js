import React, { useEffect, useState } from "react";
import "./AcneDetectionFuncRight.css";
import { useSelector, useDispatch } from "react-redux";
const AcneDetectionFuncRight = ({
  sliderConfidence,
  sliderOverlap,
  handleChangeSliderConfidence,
  handleChangeSliderOverlap,
  handleChangeSelecteModeUsed,
  selectedOptionModeUsed,
  handleChangeSelecteModelUsed,
  selectedOptionModelUsed,
  labelColors,
}) => {
  const predicted_images = useSelector(
    (state) => state.acnePredictionDaily.predicted_images
  );
  const image_active = useSelector(
    (state) => state.acnePredictionDaily.image_active
  );

  const images = useSelector((state) => state.acnePredictionDaily.images);

  const [labelList, setLabelList] = useState([]);

  useEffect(() => {
    console.log("predicted_images", predicted_images);
    predicted_images.map((item) => {
      if (
        item.image_id === image_active &&
        item.architecture_ai_name === selectedOptionModelUsed
      ) {
        const uniqueClassNames = [
          ...new Set(item.predicted.map((item) => item.class_name)),
        ];
        console.log("labelList", uniqueClassNames);
        setLabelList(uniqueClassNames);
      }
    });
    if (predicted_images.length === 0) {
      setLabelList([]);
    }
  }, [selectedOptionModelUsed, image_active, images]);

  return (
    <div className="acne__detection--tag box--shadow-btn">
      <div className="acne__detection--result-tag">
        <div className="acne__detection--tool-model-modes">
          <div className="acne__detection--tool-model-used">
            <div className="span__tag">Model Used:</div>
            <select
              id="optionsModelUsed"
              value={selectedOptionModelUsed}
              onChange={handleChangeSelecteModelUsed}
              className="select__option box--shadow-btn"
            >
              <option value="" disabled>
                Select an model option
              </option>
              <option value="YoloV8 with SAHI">YoloV8 with SAHI</option>
              <option value="YoloV8">YoloV8</option>
            </select>
          </div>

          <div className="acne__detection--tool-mode-used">
            <div className="span__tag">Mode Used:</div>
            <select
              id="optionsModelUsed"
              value={selectedOptionModeUsed}
              onChange={handleChangeSelecteModeUsed}
              className="select__option box--shadow-btn"
            >
              <option value="all" disabled>
                Select an mode option
              </option>
              <option value="drawall">Draw all</option>
              <option value="drawlabel">Draw Labels</option>
              <option value="drawconfidence">Draw Confidence</option>
            </select>
          </div>
          <div className="acne__detection--tool-scroll box--shadow-btn">
            <span>Confidence Threshold: {sliderConfidence}%</span>
            <div className="slider-container">
              <span>0%</span>
              <input
                type="range"
                min="1"
                max="100"
                value={sliderConfidence}
                onChange={handleChangeSliderConfidence}
                className="slider box--shadow-btn"
              />
              <span>100%</span>
            </div>
          </div>

          <div className="acne__detection--tool-scroll box--shadow-btn">
            <span>Overlap Threshold: {sliderOverlap}%</span>
            <div className="slider-container">
              <span>0%</span>
              <input
                type="range"
                min="1"
                max="100"
                value={sliderOverlap}
                onChange={handleChangeSliderOverlap}
                className="slider box--shadow-btn"
              />
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="acne__detection--tag-labels box--shadow-btn">
          {labelList &&
            labelList.map((item, index) => (
              <div className="labels" key={index}>
                <div
                  className="color-label box--shadow-btn"
                  style={{ background: labelColors[item] }}
                ></div>
                <div className="name-label">{item}</div>
              </div>
            ))}
        </div>
      </div>

      <div className="acne__detection--summary">
        <div className="acne__detection--summary-total box--shadow-btn">
          <span>Total acnes: 23</span>
        </div>
        <div className="acne__detection--summary-level-save-update">
          <div className="acne__detection--summary-level box--shadow-btn">
            <span>Skin level: 1</span>
          </div>
          {/* <div className="acne__detection--summary-save  box--shadow-btn">
            <span className="acne__detection--save">Save</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AcneDetectionFuncRight;
