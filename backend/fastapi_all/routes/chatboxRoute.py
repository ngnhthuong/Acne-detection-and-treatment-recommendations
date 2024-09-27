from fastapi import APIRouter, HTTPException
from config.database import architecture_table
from bson import ObjectId
from schema.schemaArchitecture import architectureFormat, architecturesFormat
from datetime import datetime
from rag.ragWithDocs import mainChat
from models.chatbox_table import chatboxMessage
import os

chatbox = APIRouter()

@chatbox.post("/api/chatbox/")
async def create_chatbox(data: chatboxMessage):
    question = data.message
    response = mainChat(question)
    return {"message": "Chatbox has been created successfully", "chatbox": response}
