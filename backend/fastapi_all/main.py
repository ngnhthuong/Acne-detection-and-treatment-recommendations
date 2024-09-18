from fastapi import FastAPI
from routes.userRoute import user
from routes.feedbackRoute import feedback
from routes.architectureRoute import architecture
from routes.acneDetectionRoute import acneDetection
from fastapi.middleware.cors import CORSMiddleware

# Khởi tạo ứng dụng FastAPI
app = FastAPI()

# Cấu hình CORS
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:3001", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Bao gồm các router
app.include_router(user)
app.include_router(feedback)
app.include_router(architecture)
app.include_router(acneDetection)
