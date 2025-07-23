import sys
import os
from fastapi import FastAPI
from fastapi import UploadFile # allows to receive the eos.zip file thorugh React
from fastapi import Form # specify that mass comes from the input (and not querystring or JSON)
from fastapi.responses import JSONResponse # allows to personalize the error message
from fastapi.middleware.cors import CORSMiddleware # allows the frontend to made requests to the API

current_dir = os.path.dirname(os.path.abspath(__file__)) # Add directory for managing both local and production deploy
sys.path.append(current_dir)
from script import extract_radius

app= FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://eos-extractor-frontend.onrender.com",'http://localhost:3000'], 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"], 
)

@app.post("/get_radius")
async def get_radius(file: UploadFile, mass: float = Form(required=True)):
    try:
        radius = extract_radius(file.file, mass)
        return {"radius": round(float(radius), 2)}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})