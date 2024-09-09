// Diagnosis.js
import React, { useState } from "react";
import "./RightDiagnosis.css";
import { ReactComponent as ArrowLeft } from '../assets/icons/arrow-left.svg';
import { ReactComponent as Send } from '../assets/icons/send.svg';
import { ReactComponent as Gpt } from '../assets/icons/gpt.svg';
import { ReactComponent as Db } from '../assets/icons/database.svg';
import { ReactComponent as ArrowRight } from '../assets/icons/arrow-right.svg';
import AcneDetection from "../components/AcneDetection";

export default function RightDiagnosis() {

    const [onOffRag, setOnOffRag] = useState(false);
    const [onOffMedicalDb, setOnOffMedicalDb] = useState(false);
    const [onOffChat, setOnOffChat] = useState(false);

    const toggleOnOffRag = () => {
        setOnOffRag(prevState => !prevState);
    };

    const toggleOnOffMedicalDb = () => {
        setOnOffMedicalDb(prevState => !prevState);
    };

    const toggleOnOffChat = () => {
        setOnOffChat(prevState => !prevState);
    };

    return (
        <div className="right-diagnosis">
            <div className={onOffChat ? "chatbox display-hidden box--shadow-btn" : "chatbox box--shadow-btn"} >
                <div className="chatbox__message">
                    <div className="chatbox__message--user">
                        <div className="message">
                            <p>Mụn đầu đen là gì? cách điều trị mụn đầu đen?</p>
                        </div>
                    </div>
                    <div className="chatbox__message--bot">
                        <div className="chatbox__message--bot-info">
                            <div className="chatbox__message--bot-avatar"></div>
                            <div className="chatbox__message--bot-name"><span>Glowypa</span></div>
                            <div className="chatbox__message--bot-tag">
                                <span>RAG</span>
                            </div>
                            <div className="chatbox__message--bot-tag">
                                <span>Medical DB</span>
                            </div>
                        </div>
                        <div className="chatbox__message--mes">
                            <p>Mụn đầu đen là một loại mụn phổ biến xuất hiện khi lỗ chân lông bị tắc nghẽn bởi dầu thừa và tế bào da chết. Dưới đây là một số cách cơ bản để điều trị mụn đầu đen:</p>
                            <h3>Điều Trị Mụn Đầu Đen</h3>
                            <ol>
                                <li>
                                    <strong>Làm sạch da:</strong> Sử dụng sữa rửa mặt nhẹ nhàng, không chứa dầu, để loại bỏ dầu thừa và bụi bẩn. Rửa mặt hai lần mỗi ngày để giữ cho lỗ chân lông thông thoáng.
                                </li>
                                <li>
                                    <strong>Tẩy tế bào chết:</strong> Sử dụng sản phẩm tẩy tế bào chết chứa axit salicylic hoặc axit glycolic để loại bỏ tế bào da chết và ngăn ngừa tắc nghẽn lỗ chân lông.
                                </li>
                                <li>
                                    <strong>Sử dụng sản phẩm chứa retinoid:</strong> Retinoid giúp làm sạch lỗ chân lông và thúc đẩy quá trình tái tạo da, giảm mụn đầu đen hiệu quả.
                                </li>
                                <li>
                                    <strong>Đắp mặt nạ đất sét:</strong> Mặt nạ đất sét có khả năng hấp thụ dầu thừa và làm sạch sâu lỗ chân lông, giúp giảm mụn đầu đen.
                                </li>
                                <li>
                                    <strong>Tránh nặn mụn:</strong> Nặn mụn có thể gây viêm nhiễm và để lại sẹo, vì vậy tốt nhất là nên tránh.
                                </li>
                                <li>
                                    <strong>Tham khảo ý kiến chuyên gia:</strong> Nếu tình trạng mụn đầu đen nghiêm trọng, bạn nên gặp bác sĩ da liễu để được tư vấn và điều trị phù hợp.
                                </li>
                            </ol>
                            <ul>
                                <li>
                                    <strong>Làm sạch da:</strong> Sử dụng sữa rửa mặt nhẹ nhàng, không chứa dầu, để loại bỏ dầu thừa và bụi bẩn. Rửa mặt hai lần mỗi ngày để giữ cho lỗ chân lông thông thoáng.
                                </li>
                                <li>
                                    <strong>Tẩy tế bào chết:</strong> Sử dụng sản phẩm tẩy tế bào chết chứa axit salicylic hoặc axit glycolic để loại bỏ tế bào da chết và ngăn ngừa tắc nghẽn lỗ chân lông.
                                </li>
                            </ul>
                            <p>Những phương pháp trên có thể giúp cải thiện tình trạng mụn đầu đen nếu được thực hiện đều đặn và đúng cách.</p>
                        </div>
                    </div>
                </div>
                <div className="chatbox__send">
                    <div className="chatbox__send--input">
                        <textarea className="chatbox__send--text-input" placeholder="Ask me anything about acne..." name="text-input" id="text-input"></textarea>
                    </div>
                    <div className="chatbox__send--func">
                        <div className='chatbox__send--advance'>
                            <div className='chatbox__send--rag chatbox__send--advance-position'>
                                <Gpt className="icon-advance" />
                                RAG
                                <div
                                    id={onOffRag ? 'on' : undefined}
                                    className='button-on-off'
                                    onClick={() => toggleOnOffRag()}
                                >
                                    <div
                                        id={onOffRag ? 'on-circle' : undefined}
                                        className='circle-on-off'
                                    ></div>
                                </div>
                            </div>
                            <div className='chatbox__send--db chatbox__send--advance-position'>
                                <Db className="icon-advance" />
                                Medical DB
                                <div id={onOffMedicalDb ? 'on' : undefined} onClick={() => toggleOnOffMedicalDb()}
                                    className='button-on-off'>
                                    <div id={onOffMedicalDb ? 'on-circle' : undefined}
                                        className='circle-on-off'></div>
                                </div>
                            </div>
                        </div>
                        <button className='chatbox__send--button'>
                            <Send className="icon--element" />
                        </button>
                    </div>
                </div>
            </div>
            {
                onOffChat ? (
                    <div className="button-close-open-chat button-close-open-chat__close">
                        <button className="chat-open__btn box--shadow-btn" onClick={() => toggleOnOffChat()}>
                            <ArrowRight className="icon--element-arrow" />
                        </button>
                    </div>
                ) : (
                    <div className="button-close-open-chat">
                        <button className="chat-close__btn box--shadow-btn" onClick={() => toggleOnOffChat()}>
                            <ArrowLeft className="icon--element-arrow" />
                        </button>
                    </div>
                )
            }
            <div className="acne-detection">
                <AcneDetection />
            </div>
        </div>
    );
};
