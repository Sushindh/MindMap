from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers import signup, signin, checkMongo

app = FastAPI()
# FastAPIInstrumentor().instrument_app(app) 

ALLOWED_ORIGINS = [
    "https://mind-map-omega-beryl.vercel.app",              # production
    "https://mind-map-git-main-sushindh-as-projects.vercel.app",
    "https://mind-hsezjg47f-sushindh-as-projects.vercel.app", # preview (optional)
    "http://localhost:5173"                         # keep for local dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = ALLOWED_ORIGINS, # react front end
    allow_credentials = True, # authentication, cookies, header
    allow_methods = ["*"], #GET, PUT, POST, DELETE
    allow_headers = ["*"]
)

@app.get("/")
async def read_root():
    try:
        result = await checkMongo.check_Mongo()
        if "failed" in result["Status"].lower():
            raise Exception(result["detail"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    return {"msg": "Gemini API is up and running"}

app.include_router(signup.router)
app.include_router(signin.router)
app.include_router(checkMongo.router)
