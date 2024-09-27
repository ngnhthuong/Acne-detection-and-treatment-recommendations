from typing import Optional
from pydantic import BaseModel

class chatboxMessage(BaseModel):
    user_id: str
    message: str
    role: str
    