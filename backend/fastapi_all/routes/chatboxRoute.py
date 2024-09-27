from fastapi import APIRouter, HTTPException
from config.database import architecture_table
from bson import ObjectId
from schema.schemaArchitecture import architectureFormat, architecturesFormat
from datetime import datetime
from ai.rag.ragWithDocs import mainChat
from models.chatbox_table import ChatboxMessage
import os

chatbox = APIRouter()

@chatbox.post("/api/chatbox/")
async def create_chatbox(data: ChatboxMessage):
    question = data.message
    response = mainChat(question)
    answer = {
        "message": response,
        "role": "bot",
        "rag": data.rag,
        "medical_db": data.db,
    }
    return {"message": "Chatbox has been created successfully", "chatbox": answer}
