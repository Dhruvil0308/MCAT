from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import motor.motor_asyncio
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB config
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("MONGO_DB_NAME", "textor_db")
COLLECTION_NAME = os.getenv("MONGO_COLLECTION", "form_submissions")

# Connect to MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

app = FastAPI()

# CORS for frontend on localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic schema
class FormData(BaseModel):
    who: Optional[str]
    grade: Optional[str]
    child_name: Optional[str]
    help_type: Optional[List[str]]
    update_frequency: Optional[str]
    teaching_style: Optional[str]
    tone: Optional[str]
    usage_mode: Optional[str]
    due_timing: Optional[str]
    reminder_frequency: Optional[str]
    parent_phone: Optional[str]
    student_phone: Optional[str]

    student_grade: Optional[str]
    name: Optional[str]
    student_help_type: Optional[List[str]]
    response_style: Optional[str]
    student_tone: Optional[str]
    wants_reminders: Optional[str]
    reminder_time: Optional[str]
    student_phone_number: Optional[str]
    wants_parent: Optional[str]
    parent_phone_number: Optional[str]

@app.post("/submit")
async def submit_form(data: FormData):
    try:
        result = await collection.insert_one(data.dict())
        return {"message": "Form data saved successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
