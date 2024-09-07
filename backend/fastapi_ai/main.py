from fastapi import FastAPI, File, UploadFile, Request, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
import os
from acne_dev.acne_predict import acnePredictWithSahi, acnePredictWithYolo #import function for acne predict

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các nguồn gốc. Thay "*" bằng tên miền cụ thể để bảo mật hơn.
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức (GET, POST, v.v.)
    allow_headers=["*"],  # Cho phép tất cả các headers
)

UPLOAD_DIRECTORY = "uploaded_images"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)


@app.post("/upload-images/")
async def upload_images(files: list[UploadFile] = File(...)):
    file_paths = []
    for file in files:
        contents = await file.read()
        file_path = os.path.join(UPLOAD_DIRECTORY, f"uploaded_{file.filename}")
        with open(file_path, "wb") as f:
            f.write(contents)
        file_paths.append(file_path)
    return {"file_paths": file_paths}


@app.post("/acne-predict/")
async def upload_image(file: UploadFile = File(...), predict_func: str = Form(...)):
    try:
        contents = await file.read()
        file_path = os.path.join(UPLOAD_DIRECTORY, f"uploaded_{file.filename}")
        with open(file_path, "wb") as f:
            f.write(contents)
        if not os.path.exists(file_path):
            raise HTTPException(status_code=500, detail="File was not saved successfully.")
        if predict_func not in ['0', '1']:
            raise HTTPException(status_code=400, detail="Invalid predict_func value. Must be '0' or '1'.")
        if predict_func == '1':
            result = acnePredictWithSahi(file_path)
        else:
            result = acnePredictWithYolo(file_path)
        if result is None:
            raise HTTPException(status_code=500, detail="Prediction failed.")
        return result
    except Exception as e:
        print(f"Error in upload_image: {str(e)}")
        # Return a generic error message to the client
        raise HTTPException(status_code=500, detail="An error occurred during image processing.")
    finally:
        # Clean up: remove the uploaded file
        if os.path.exists(file_path):
            os.remove(file_path)
