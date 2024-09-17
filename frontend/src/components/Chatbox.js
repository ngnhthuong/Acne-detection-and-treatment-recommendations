import React, { useState } from "react";
import "./css/Chatbox.css";
import { ReactComponent as Send } from "../assets/icons/send.svg";
import { ReactComponent as Gpt } from "../assets/icons/gpt.svg";
import { ReactComponent as Db } from "../assets/icons/database.svg";
import { useSelector } from "react-redux";
import { ReactComponent as Advice } from "../assets/icons/advice_treatment.svg";
import { ReactComponent as Monitor } from "../assets/icons/monitor.svg";
import { ReactComponent as AcneDiagnosis } from "../assets/icons/acne_diagnosis.svg";

const Chatbox = () => {
  const user = useSelector((state) => state.user.user);
  const [onOffRag, setOnOffRag] = useState(false);
  const [onOffMedicalDb, setOnOffMedicalDb] = useState(false);

  const toggleOnOffRag = () => {
    setOnOffRag((prevState) => !prevState);
  };

  const toggleOnOffMedicalDb = () => {
    setOnOffMedicalDb((prevState) => !prevState);
  };
  return (
    <>
      <div className="chatbox__introduction">
        <div className="chatbox__say-hello ban--select">
          <span>
            👋 Hi, {user.first_name} {user.last_name}
          </span>
          <p>How Can I help you today ?</p>
        </div>
        <div className="chatbox__introduction-func">
          <div className="chatbox__introduction-func-item">
            <AcneDiagnosis
              className="icon--element"
              style={{ color: "orange" }}
            />
            <span className="ban--select">Acne Diagnosis</span>
          </div>
          <div className="chatbox__introduction-func-item">
            <Advice className="icon--element" />
            <span className="ban--select">Treatment Advice</span>
          </div>
          <div className="chatbox__introduction-func-item">
            <Monitor className="icon--element" style={{ color: "purple" }}/>
            <span className="ban--select" >Skin Health Monitor</span>
          </div>
        </div>
      </div>
      {/* {
        <div className="chatbox__message">
          <div className="chatbox__message--user">
            <div className="message">
              <p>Mụn đầu đen là gì? cách điều trị mụn đầu đen?</p>
            </div>
          </div>
          <div className="chatbox__message--bot">
            <div className="chatbox__message--bot-info">
              <div className="chatbox__message--bot-avatar"></div>
              <div className="chatbox__message--bot-name">
                <span>Glowypa</span>
              </div>
              <div className="chatbox__message--bot-tag">
                <span>RAG</span>
              </div>
              <div className="chatbox__message--bot-tag">
                <span>Medical DB</span>
              </div>
            </div>
            <div className="chatbox__message--mes">
              <p>
                Mụn đầu đen là một loại mụn phổ biến xuất hiện khi lỗ chân lông
                bị tắc nghẽn bởi dầu thừa và tế bào da chết. Dưới đây là một số
                cách cơ bản để điều trị mụn đầu đen:
              </p>
              <h3>Điều Trị Mụn Đầu Đen</h3>
              <ol>
                <li>
                  <strong>Làm sạch da:</strong> Sử dụng sữa rửa mặt nhẹ nhàng,
                  không chứa dầu, để loại bỏ dầu thừa và bụi bẩn. Rửa mặt hai
                  lần mỗi ngày để giữ cho lỗ chân lông thông thoáng.
                </li>
                <li>
                  <strong>Tẩy tế bào chết:</strong> Sử dụng sản phẩm tẩy tế bào
                  chết chứa axit salicylic hoặc axit glycolic để loại bỏ tế bào
                  da chết và ngăn ngừa tắc nghẽn lỗ chân lông.
                </li>
                <li>
                  <strong>Sử dụng sản phẩm chứa retinoid:</strong> Retinoid giúp
                  làm sạch lỗ chân lông và thúc đẩy quá trình tái tạo da, giảm
                  mụn đầu đen hiệu quả.
                </li>
                <li>
                  <strong>Đắp mặt nạ đất sét:</strong> Mặt nạ đất sét có khả
                  năng hấp thụ dầu thừa và làm sạch sâu lỗ chân lông, giúp giảm
                  mụn đầu đen.
                </li>
                <li>
                  <strong>Tránh nặn mụn:</strong> Nặn mụn có thể gây viêm nhiễm
                  và để lại sẹo, vì vậy tốt nhất là nên tránh.
                </li>
                <li>
                  <strong>Tham khảo ý kiến chuyên gia:</strong> Nếu tình trạng
                  mụn đầu đen nghiêm trọng, bạn nên gặp bác sĩ da liễu để được
                  tư vấn và điều trị phù hợp.
                </li>
              </ol>
              <ul>
                <li>
                  <strong>Làm sạch da:</strong> Sử dụng sữa rửa mặt nhẹ nhàng,
                  không chứa dầu, để loại bỏ dầu thừa và bụi bẩn. Rửa mặt hai
                  lần mỗi ngày để giữ cho lỗ chân lông thông thoáng.
                </li>
                <li>
                  <strong>Tẩy tế bào chết:</strong> Sử dụng sản phẩm tẩy tế bào
                  chết chứa axit salicylic hoặc axit glycolic để loại bỏ tế bào
                  da chết và ngăn ngừa tắc nghẽn lỗ chân lông.
                </li>
              </ul>
              <p>
                Những phương pháp trên có thể giúp cải thiện tình trạng mụn đầu
                đen nếu được thực hiện đều đặn và đúng cách.
              </p>
            </div>
          </div>
        </div>
      } */}
      <div className="chatbox__send">
        <div className="chatbox__send--input">
          <textarea
            className="chatbox__send--text-input"
            placeholder="Ask me anything about your skin ..."
            name="text-input"
            id="text-input"
          ></textarea>
        </div>
        <div className="chatbox__send--func">
          <div className="chatbox__send--advance">
            <div className="chatbox__send--rag chatbox__send--advance-position">
              <Gpt className="icon-advance" />
              RAG
              <div
                id={onOffRag ? "on" : undefined}
                className="button-on-off"
                onClick={() => toggleOnOffRag()}
              >
                <div
                  id={onOffRag ? "on-circle" : undefined}
                  className="circle-on-off"
                ></div>
              </div>
            </div>
            <div className="chatbox__send--db chatbox__send--advance-position">
              <Db className="icon-advance" />
              Medical DB
              <div
                id={onOffMedicalDb ? "on" : undefined}
                onClick={() => toggleOnOffMedicalDb()}
                className="button-on-off"
              >
                <div
                  id={onOffMedicalDb ? "on-circle" : undefined}
                  className="circle-on-off"
                ></div>
              </div>
            </div>
          </div>
          <button className="chatbox__send--button">
            <Send className="icon--element" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
