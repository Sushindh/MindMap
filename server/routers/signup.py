from fastapi import APIRouter, HTTPException
from schemas import Signup
from database import user_collect

router = APIRouter()

@router.post("/signup")
async def signup_user(user: Signup):
    existing = await user_collect.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=409, detail="User already exists")
    
    user_dict = user.model_dump()
    result = await user_collect.insert_one(user_dict)

    if result.inserted_id:
        return {"message": "User registered successfully"}
    else:
        raise HTTPException(status_code=500, detail="Signup failed")
