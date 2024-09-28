import React, { useState, useEffect, useRef } from "react";
import "./css/Chatbox.css";
import { ReactComponent as Send } from "../assets/icons/send.svg";
import LoadingGifIcon from "../assets/loading/loading_plus_icon.gif";
import { ReactComponent as Gpt } from "../assets/icons/gpt.svg";
import { ReactComponent as RDetection } from "../assets/icons/result_detect.svg";
import { ReactComponent as Db } from "../assets/icons/database.svg";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Advice } from "../assets/icons/advice_treatment.svg";
import { ReactComponent as Monitor } from "../assets/icons/monitor.svg";
import { ReactComponent as AcneDiagnosis } from "../assets/icons/acne_diagnosis.svg";
import {
  chatboxRequestion,
  chatboxRag,
  chatboxMedicalDb,
} from "../redux/action/actions";

const Chatbox = () => {
  const dispatch = useDispatch();

  const predicted_images = useSelector(
    (state) => state.acnePredictionDaily.predicted_images
  );

  const chatMessages = useSelector((state) => state.adviceChatbox.chatMessage);
  const rag = useSelector((state) => state.adviceChatbox.rag);
  const db = useSelector((state) => state.adviceChatbox.medicaldb);
  const user = useSelector((state) => state.user.user);
  const loadingChat = useSelector((state) => state.adviceChatbox.loading);
  const [message, setMessage] = useState("");

  const toggleOnOffRag = () => {
    dispatch(chatboxRag());
  };

  const toggleOnOffMedicalDb = () => {
    dispatch(chatboxMedicalDb());
  };

  const sendChatMessage = (message) => {
    const newMessage = {
      user_id: user.id,
      role: "user",
      message: message,
      rag: rag,
      db: db,
      history_chat: chatMessages,
    };
    dispatch(chatboxRequestion(newMessage));
    console.log("Sending message:", newMessage);
  };

  const handleSendClick = () => {
    if (message.trim() !== "") {
      sendChatMessage(message);
      setMessage("");
      setIntervalUse(true);
    }
  };

  const handleKeyPress = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey &&
      !loadingChat
    ) {
      event.preventDefault();
      handleSendClick();
    }
  };

  const [loadingShow, setLoadingShow] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [intervalUse, setIntervalUse] = useState(false);

  // Ref for the last message
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (chatMessages.length > displayedMessages.length && intervalUse) {
      const newMessage = chatMessages[displayedMessages.length];
      if (newMessage && newMessage.role !== "user") {
        let index = 0;
        const contentArray = (newMessage.message || "")
          .split(/(<\/?[^>]+>)/g)
          .filter(Boolean);
        setLoadingShow(true);
        const intervalId = setInterval(() => {
          if (index < contentArray.length) {
            setDisplayedMessages((prev) => {
              const updatedMessages = [...prev];
              if (!updatedMessages[displayedMessages.length]) {
                updatedMessages.push("");
              }
              updatedMessages[displayedMessages.length] +=
                contentArray[index] || "";
              return updatedMessages;
            });
            index++;
          } else {
            setLoadingShow(false);
            clearInterval(intervalId);
          }
        }, 70);
      } else if (newMessage) {
        setDisplayedMessages([...displayedMessages, newMessage.message || ""]);
      }
    }
    console.log("chatMessages", chatMessages);
  }, [chatMessages, displayedMessages]);

  // Scroll to the last message when new messages are displayed
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayedMessages]);

  return (
    <>
      {chatMessages.length === 0 ? (
        <div className="chatbox__introduction">
          <div className="chatbox__say-hello ban--select">
            <span>
              👋 Hi, {user.first_name} {user.last_name}
            </span>
            <p>How Can I help you today?</p>
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
              <Monitor className="icon--element" style={{ color: "purple" }} />
              <span className="ban--select">Skin Health Monitor</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="chatbox__message">
          {chatMessages.map((chatItem, index) => (
            <div
              key={index}
              className={`chatbox__message--${chatItem.role}`}
              ref={index === chatMessages.length - 1 ? lastMessageRef : null}
            >
              {chatItem.role === "user" ? (
                <div className="message">
                  <p>{chatItem.message || ""}</p>
                </div>
              ) : (
                <div className="chatbox__message--bot">
                  <div className="chatbox__message--bot-info">
                    <div className="chatbox__message--bot-avatar"></div>
                    <div className="chatbox__message--bot-name">
                      <span>Glowypa</span>
                    </div>
                    {chatItem.rag && (
                      <div className="chatbox__message--bot-tag">
                        <span>Gemini v1.5 Pro</span>
                      </div>
                    )}
                    {chatItem.db && (
                      <div className="chatbox__message--bot-tag">
                        <span>Medical Recrod</span>
                      </div>
                    )}
                  </div>
                  <div
                    className="chatbox__message--mes"
                    dangerouslySetInnerHTML={{
                      __html: displayedMessages[index] || "",
                    }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="chatbox__send">
        <div className="chatbox__send--input">
          <textarea
            className="chatbox__send--text-input"
            placeholder="Ask me anything about your skin ..."
            name="text-input"
            id="text-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          ></textarea>
        </div>
        <div className="chatbox__send--func">
          <div className="chatbox__send--advance">
            <div className="chatbox__send--rag chatbox__send--advance-position">
              <Gpt className="icon-advance" />
              Gemini v1.5 Pro
              <div
                id={rag ? "on" : ""}
                className="button-on-off"
                onClick={toggleOnOffRag}
              >
                <div
                  id={rag ? "on-circle" : ""}
                  className="circle-on-off"
                ></div>
              </div>
            </div>
            <div className="chatbox__send--db chatbox__send--advance-position">
              <RDetection className="icon-advance" />
              Medical Recrod
              <div
                id={db ? "on" : ""}
                onClick={toggleOnOffMedicalDb}
                className="button-on-off"
              >
                <div id={db ? "on-circle" : ""} className="circle-on-off"></div>
              </div>
            </div>
          </div>
          <button
            className="chatbox__send--button"
            onClick={handleSendClick}
            aria-label="Send Message"
          >
            {loadingChat || loadingShow ? (
              <img
                src={LoadingGifIcon}
                className="icon-loading"
                alt="Loading"
              />
            ) : (
              <Send className="icon-send" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
