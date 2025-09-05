from fastapi import APIRouter, HTTPException
from database import user_collect  
from schemas import Signin

router = APIRouter()

@router.post("/signin")
async def login_user(login: Signin):
    user = await user_collect.find_one({"email": login.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # NOTE: Passwords should be hashed in production — compare hash instead
    if user["password"] != login.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "user_id": str(user["_id"])}
