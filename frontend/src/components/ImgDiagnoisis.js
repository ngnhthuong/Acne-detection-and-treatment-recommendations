// import React from "react";
// import "./ImgDiagnoisis.css";
// import { ReactComponent as MultipleImg } from "../assets/icons/multiple.svg";

// const ImgDiagnoisis = ({
//   base64,
//   id_img,
//   onDelete,
//   tag,
//   handleChangeSelectedImage,
//   base64Image,
// }) => {
//     let active_img_chosend = 0;
//     console.log(base64Image)
//     if(base64Image && base64Image != 0){
//         active_img_chosend = base64Image.id_image;
//     } else {
//         active_img_chosend = 0;
//     }
//   return (
//     <div
//       className="acne__detection--tool-image box--shadow-btn"
//       onClick={base64 != null && tag == 1 ? () => handleChangeSelectedImage(base64) : undefined}
//     >
//       {" "}
//       {tag != 1 ? (
//         <button
//           className="delete-btn box--shadow-btn"
//           onClick={() => onDelete(base64.id_img)}
//         >
//           <MultipleImg className="icon--element-mul" />
//         </button>
//       ) : null}
//       <div className={active_img_chosend == id_img ? "acne-image active-image" : "acne-image"}>
//         {base64 ? (
//           <img className="responsive-image" src={base64.image_base64} alt="Diagnosis" />
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default ImgDiagnoisis;

import React from "react";
import "./ImgDiagnoisis.css";
import { ReactComponent as MultipleImg } from "../assets/icons/multiple.svg";

const ImgDiagnoisis = ({
  onDelete,
  tag,
  handleChangeSelectedImage,
  image_id,
  base64Image,
}) => {
  return (
    <div className="acne__detection--tool-image box--shadow-btn">
      {tag != 1 ? (
        <button
          className="delete-btn box--shadow-btn"
          onClick={() => onDelete(image_id)}
        >
          <MultipleImg className="icon--element-mul" />
        </button>
      ) : null}
      {base64Image ? (
        <div className="acne-image active-image">
          <img className="responsive-image" src={base64Image} alt="Diagnosis" />
        </div>
      ) : (
        <div className="acne-image active-image"></div>
      )}
    </div>
  );
};

export default ImgDiagnoisis;
