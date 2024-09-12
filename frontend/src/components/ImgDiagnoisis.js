import React from "react";
import "./ImgDiagnoisis.css";
import { ReactComponent as MultipleImg } from "../assets/icons/multiple.svg";

const ImgDiagnoisis = ({ id_img, base64, onDelete, tag }) => {
  console.log("ID:", id_img, "Base64:", base64, "Tag:", tag);

  return (
    <div className="acne__detection--tool-image box--shadow-btn">
      {tag != 1 ? (
        <button
          className="delete-btn box--shadow-btn"
          onClick={() => onDelete(id_img)}
        >
          <MultipleImg className="icon--element-mul" />
        </button>
      ) : null}

      <div className="acne-image">
        {base64 ? (
          <img className="responsive-image" src={base64} alt="Diagnosis" />
        ) : null}
      </div>
    </div>
  );
};

export default ImgDiagnoisis;
