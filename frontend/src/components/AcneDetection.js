// Diagnosis.js
import React, { useState } from "react";
import "./Acnedetection.css";
import { ReactComponent as UploadImg } from '../assets/icons/upload-img.svg';

export default function RightDiagnosis() {
    return (
        <div className="acne__detection--split">
            <div className="acne__detection--tool">
                <div className="acne__detection--tool-input-image">
                    <UploadImg className="icon--element" />
                    <p>Upload image here</p>
                </div>
                <div className="acne__detection--tool-image-tool-scroll">
                    <div></div>
                    <div></div>
                </div>
                <div className="acne__detection--tool-model-logo-mode">

                </div>
            </div>
            <div className="acne__detection--result">
                <div className="acne__detection--result-image"></div>
                <div className="acne__detection--tag"></div>
            </div>
        </div>
    );
};
