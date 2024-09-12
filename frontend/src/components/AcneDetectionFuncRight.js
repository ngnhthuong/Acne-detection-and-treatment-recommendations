import React, { useState } from "react";
import "./AcneDetectionFuncRight.css";

const AcneDetectionFuncRight = ({sliderConfidence, sliderOverlap, handleChangeSliderConfidence, handleChangeSliderOverlap}) => {
  const [selectedOptionModelUsed, setSelectedOptionModelUsed] = useState("");
  const [selectedOptionModeUsed, setSelectedOptionModeUsed] = useState("");
  const handleChangeSelecteModelUsed = (event) => {
    setSelectedOptionModelUsed(event.target.value);
  };
  const handleChangeSelecteModeUsed = (event) => {
    console.log(event.target.value);
    setSelectedOptionModeUsed(event.target.value);
  };
  return (
    <div className="acne__detection--tag box--shadow-btn">
      <div className="acne__detection--result-tag">
        <div className="acne__detection--tool-model-modes">
        <div className="acne__detection--tool-model-used">
            {/* <span>Model:</span> */}
            <select
              id="optionsModelUsed"
              value={selectedOptionModelUsed}
              onChange={handleChangeSelecteModelUsed}
              className="select__option box--shadow-btn"
            >
              <option value="" disabled>
                Select an model option
              </option>
              <option value="yolosahi">Yolo + Sahi</option>
              <option value="resnet">RestNet</option>
            </select>
          </div>

          <div className="acne__detection--tool-mode-used">
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
          <div className="labels">
            <div
              className="color-label box--shadow-btn"
              style={{ background: "orange" }}
            ></div>
            <div className="name-label">Blackhead</div>
          </div>
          <div className="labels">
            <div
              className="color-label box--shadow-btn"
              style={{ background: "red" }}
            ></div>
            <div className="name-label">Acne_scars</div>
          </div>
          <div className="labels">
            <div
              className="color-label box--shadow-btn"
              style={{ background: "green" }}
            ></div>
            <div className="name-label">Crystanlline</div>
          </div>
          <div className="labels">
            <div
              className="color-label box--shadow-btn"
              style={{ background: "green" }}
            ></div>
            <div className="name-label">sebo-crystan-conglo</div>
          </div>
          <div className="labels">
            <div
              className="color-label box--shadow-btn"
              style={{ background: "green" }}
            ></div>
            <div className="name-label">sebo-crystan-conglo</div>
          </div>
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
          <div className="acne__detection--summary-save  box--shadow-btn">
            <span className="acne__detection--save">Save</span>
          </div>
          {/* <div className="acne__detection--summary-update  box--shadow-btn">
                <span className="acne__detection--save">Update</span>
              </div> */}
        </div>
      </div>
    </div>
  );
};

export default AcneDetectionFuncRight;
