import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Get MongoDB URL from env
MongoDB = os.getenv("MONGODB_URL")

if not MongoDB:
    raise ValueError("⚠️ MONGODB_URL not set in .env file")


client = AsyncIOMotorClient(MongoDB)
db = client['payment_db']
user_collect = db["users"]  
payment_collect = db['payments']