from fastapi import APIRouter, HTTPException
from config.database import architecture_table
from bson import ObjectId
from schema.schemaArchitecture import architectureFormat, architecturesFormat
from datetime import datetime
# from ai.rag.ragWithDocs import mainChat
from ai.rag.rag_llma import mainChat
from models.chatbox_table import ChatboxMessage
from config.database import acne_detection_table
from schema.schemaAcneDetection import acneDetectionFormat
import os
import re

chatbox = APIRouter()

def remove_html_tags(text):
    """
    Xóa tất cả các thẻ HTML từ một chuỗi.

    Args:
    text (str): Chuỗi chứa các thẻ HTML.

    Returns:
    str: Chuỗi đã được loại bỏ các thẻ HTML.
    """
    clean_text = re.sub(r'<.*?>', '', text)
    return clean_text

@chatbox.post("/api/chatbox/")
async def create_chatbox(data: ChatboxMessage):
    print(data)
    question = data.message
    chatHistoryCache = ""
    chatHistoryList = data.history_chat
    medical_db  = ""
    for chatHistory in chatHistoryList:
        if chatHistory["role"] == "user":
            chatHistoryCache += " " + "user: " + remove_html_tags(chatHistory["message"])
        elif chatHistory["role"] == "bot":
            chatHistoryCache += " " + "bot: " + remove_html_tags(chatHistory["message"])
    if data.db == True:
        medical_list = []
        medical_acne = set()
        total_acne = 0
        acne_treatment = acne_detection_table.find_one({
            "user_id": data.user_id,
        })
        if acne_treatment is not None:
            medical_list = acneDetectionFormat(acne_treatment)
            for medical in medical_list["predicted_images"]:
                if medical["architecture_ai_name"] == "YoloV8 with SAHI":
                    total_acne += medical["total_acnes"]
                    for result in medical["predicted"]:
                        medical_acne.add(result["class_name"])
        medical_db = (
            "Có tổng số lượng đốt mụn là: " + str(total_acne) + "\n"
            + "Các loại mụn đang bị là: " + ", ".join(medical_acne) + "\n"
        )
        print(medical_db)
                  
    response = mainChat(question, chatHistoryCache, medical_db)
    
    answer = {
        "message": response,
        "role": "bot",
        "rag": data.rag,
        "db": data.db,
    }
    return {"message": "Chatbox has been created successfully", "chatbox": answer}
