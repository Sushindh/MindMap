from pydantic import BaseModel, EmailStr
from datetime import datetime


class Signup(BaseModel):
    username : str
    email : EmailStr
    password : str

class Signin(BaseModel):
    email: EmailStr
    password: str