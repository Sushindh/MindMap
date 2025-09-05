from fastapi import APIRouter
from database import client

router = APIRouter()

@router.get("/checkMongo")
async def check_Mongo():
    try:
        await client.admin.command("ping")
        return {"Status":"MongoDB connected successfully !!!"}
    except Exception as e:
        return {"Status":"Connection failed", "detail":str(e) }