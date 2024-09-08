// Diagnosis.js
import React, { useState } from "react";
import BoundingBoxCanvas from "./BoundingBoxCanvas";
import "./Acnedetection.css";
import { ReactComponent as UploadImg } from '../assets/icons/upload-img.svg';
import { ReactComponent as MultipleImg } from '../assets/icons/multiple.svg';
import MarkedCalendar from './MarkedCalendar';
import './MarkedCalendar.css';

export default function RightDiagnosis() {
    const labelColors = {
        'acne_scars': '#FF5733',        // Bright Orange
        'comedone': '#2980B9',          // Bright Blue
        'conglobata': '#27AE60',        // Bright Green
        'crystanlline': '#F39C12',      // Bright Yellow
        'cystic': '#8E44AD',            // Bright Purple
        'flat_wart': '#E74C3C',         // Bright Red
        'folliculitis': '#2ECC71',      // Bright Lime
        'keloid': '#3498DB',            // Bright Sky Blue
        'milium': '#E67E22',            // Bright Orange
        'papule': '#1ABC9C',            // Bright Turquoise
        'pustule': '#D35400',           // Bright Dark Orange
        'sebo-crystan-conglo': '#9B59B6', // Bright Lavender
        'syringoma': '#C0392B',         // Bright Crimson
        'birthmark': '#F1C40F'          // Bright Gold
      };

    const boxes = [
        {
            "confidence": 0.1679595708847046,
            "class_name": "comedone",
            "x_min": 543.6298980712891,
            "x_max": 587.7713241577148,
            "y_max": 21.845985412597656,
            "y_min": 0.03001098707318306
        },
        {
            "confidence": 0.1434750258922577,
            "class_name": "comedone",
            "x_min": 229.4117832183838,
            "x_max": 255.3689308166504,
            "y_max": 296.95401763916016,
            "y_min": 269.81169509887695
        },
        {
            "confidence": 0.12053301185369492,
            "class_name": "comedone",
            "x_min": 589.8307037353516,
            "x_max": 619.7181854248047,
            "y_max": 242.2145004272461,
            "y_min": 216.39034461975098
        },
        {
            "confidence": 0.4378684163093567,
            "class_name": "keloid",
            "x_min": 521.187255859375,
            "x_max": 634.6356658935547,
            "y_max": 327.4259490966797,
            "y_min": 206.0
        },
        {
            "confidence": 0.2780153453350067,
            "class_name": "keloid",
            "x_min": 536.3634757995605,
            "x_max": 640.0,
            "y_max": 109.54583740234375,
            "y_min": 0.570483386516571
        },
        {
            "confidence": 0.1532740741968155,
            "class_name": "keloid",
            "x_min": 8.41326904296875,
            "x_max": 128.0,
            "y_max": 150.48487091064453,
            "y_min": 103.0
        },
        {
            "confidence": 0.6287621855735779,
            "class_name": "papule",
            "x_min": 234.58710289001465,
            "x_max": 271.42701721191406,
            "y_max": 542.9465217590332,
            "y_min": 494.95263671875
        },
        {
            "confidence": 0.17348864674568176,
            "class_name": "papule",
            "x_min": 409.0857162475586,
            "x_max": 436.935791015625,
            "y_max": 400.5304183959961,
            "y_min": 353.2762222290039
        },
        {
            "confidence": 0.1731548309326172,
            "class_name": "papule",
            "x_min": 204.6065444946289,
            "x_max": 231.0,
            "y_max": 255.18183135986328,
            "y_min": 218.87314796447754
        },
        {
            "confidence": 0.13701511919498444,
            "class_name": "pustule",
            "x_min": 330.2372989654541,
            "x_max": 365.6334762573242,
            "y_max": 477.02532958984375,
            "y_min": 434.2990779876709
        }
    ]

    const [sliderConfidence, setSliderConfidence] = useState(50); // Giá trị mặc định là 50
    const [sliderOverlap, setSliderOverlap] = useState(50); // Giá trị mặc định là 50
    const [selectedOptionModelUsed, setSelectedOptionModelUsed] = useState('');
    const [selectedOptionModeUsed, setSelectedOptionModeUsed] = useState('');

    const handleChangeSelecteModelUsed = (event) => {
        setSelectedOptionModelUsed(event.target.value);
    };
    const handleChangeSelecteModeUsed = (event) => {
        setSelectedOptionModeUsed(event.target.value);
    };
    const handleChangeSliderConfidence = (event) => {
        console.log(event.target.value);
        setSliderConfidence(event.target.value);
    };
    const handleChangeSliderOverlap = (event) => {
        console.log(event.target.value);
        setSliderOverlap(event.target.value);
    };

    const [imageUrl, setImageSrc] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
        console.log('hihii',imageUrl)
    };



    return (
        <div className="acne__detection--split">
            <div className="acne__detection--tool">
                <div className="acne__detection--tool-input-image box--shadow-btn" onClick={() => document.getElementById('upload-input').click()} style={{ cursor: 'pointer' }}>
                    <UploadImg className="icon--element" />
                    <p>Upload image here</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none', width: '100%', height: '100%' }}
                        id="upload-input"
                    />
                </div>
                <div className="acne__detection--tool-image-tool-scroll">
                    <div className="acne__detection--tool-images">
                        <div className="acne__detection--tool-image box--shadow-btn">
                            <button className="delete-btn box--shadow-btn">
                                <MultipleImg className="icon--element-mul" />
                            </button>
                            <div className="acne-image">
                                <MultipleImg className="icon--element-mul" />
                            </div>
                        </div>
                        <div className="acne__detection--tool-image box--shadow-btn">
                            <button className="delete-btn box--shadow-btn">
                                <MultipleImg className="icon--element-mul" />
                            </button>
                            <div className="acne-image">
                                <MultipleImg className="icon--element-mul" />
                            </div>                        </div>
                        <div className="acne__detection--tool-image box--shadow-btn">
                            <button className="delete-btn box--shadow-btn">
                                <MultipleImg className="icon--element-mul" />
                            </button>
                            <div className="acne-image">
                                <MultipleImg className="icon--element-mul" />
                            </div>                        </div>
                        <div className="acne__detection--tool-image box--shadow-btn">
                            <button className="delete-btn box--shadow-btn">
                                <MultipleImg className="icon--element-mul" />
                            </button>
                            <div className="acne-image">
                                <MultipleImg className="icon--element-mul" />
                            </div>                        </div>
                    </div>
                    <div className="acne__detection--tool-scrolls">
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
                </div>
                <div className="acne__detection--tool-model-logo-mode">
                    <div className="acne__detection--tool-model-logo"></div>
                </div>
            </div>
            <div className="acne__detection--result">
                <div className="acne__detection--result-image">
                    <div className="acne__detection--result-image-box">
                        {/* implement images */}
                        <BoundingBoxCanvas imageUrl={imageUrl} boxes={boxes} labelColors={labelColors} sliderConfidence = {sliderConfidence} overlapThreshold = {sliderOverlap}/>
                    </div>
                </div>
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
                                    <option value="" disabled>Select an model option</option>
                                    <option value="option1" >Yolo + Sahi</option>
                                    <option value="option2" >RestNet</option>
                                </select>
                            </div>
                            <div className="acne__detection--tool-mode-used">
                                {/* <span>Mode:</span> */}
                                <select
                                    id="optionsModelUsed"
                                    value={selectedOptionModeUsed}
                                    onChange={handleChangeSelecteModeUsed}
                                    className="select__option box--shadow-btn"
                                >
                                    <option value="" disabled>Select an mode option</option>
                                    <option value="option1" >Draw Labels</option>
                                    <option value="option2" >Draw Confidence</option>
                                </select>
                            </div>
                        </div>
                        <div className="calendar-setup">
                            <MarkedCalendar />
                        </div>
                        <div className="acne__detection--tag-labels box--shadow-btn">
                            <div className="labels">
                                <div className="color-label box--shadow-btn" style={{ background: "orange" }}></div>
                                <div className="name-label">Blackhead</div>
                            </div>
                            <div className="labels">
                                <div className="color-label box--shadow-btn" style={{ background: "red" }}></div>
                                <div className="name-label">Acne_scars</div>
                            </div>
                            <div className="labels">
                                <div className="color-label box--shadow-btn" style={{ background: "green" }}></div>
                                <div className="name-label">Crystanlline</div>
                            </div>
                            <div className="labels">
                                <div className="color-label box--shadow-btn" style={{ background: "green" }}></div>
                                <div className="name-label">sebo-crystan-conglo</div>
                            </div>
                            <div className="labels">
                                <div className="color-label box--shadow-btn" style={{ background: "green" }}></div>
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
                            {/* <div className="acne__detection--summary-save  box--shadow-btn">
                                <span className="acne__detection--save">Save</span>
                            </div> */}
                             <div className="acne__detection--summary-update  box--shadow-btn">
                                <span className="acne__detection--save">Update</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
