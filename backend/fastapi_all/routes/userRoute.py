from fastapi import APIRouter, HTTPException
from models.user_table import UserTable, UserUpdateRequest, LoginRequest
from config.database import user_table
from bson import ObjectId
from schema.schemaUser import userFormat

user = APIRouter()

@user.post("/api/user/login/")
async def get_users(data: LoginRequest):
    user_data = user_table.find_one({"email": data.email, "password": data.password})
    if user_data:
        return {"message": "login success", "data": userFormat(user_data)} 
    else:
        raise HTTPException(status_code=404, detail="User not found")
    
@user.post("/api/user/register/")
async def create_user(user: UserTable):
    result = user_table.insert_one(dict(user))
    inserted_user = user_table.find_one({"_id": result.inserted_id})
    return {"message": "User has been created successfully", "user": userFormat(inserted_user)}

@user.put("/api/user/update/")
async def update_user(user: UserUpdateRequest):
    user_id = ObjectId(user.user_id)
    user_data = user_table.find_one({"_id": user_id})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    update_data = user.dict(exclude_unset=True, exclude={"user_id"})
    if "email" in update_data:
        existing_user = user_table.find_one({"email": update_data["email"], "_id": {"$ne": user_id}})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already in use")
    result = user_table.update_one({"_id": user_id}, {"$set": update_data})
    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="No changes made to the user")
    return {"message": "User has been updated successfully"}
