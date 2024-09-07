from sahi import AutoDetectionModel
from sahi.utils.cv import read_image
from sahi.utils.file import download_from_url
from sahi.predict import get_prediction, get_sliced_prediction, predict
from sahi.prediction import visualize_object_predictions
from IPython.display import Image
from numpy import asarray
import cv2
import time
import cv2
import numpy as np
from datetime import datetime
import sys
import os
sys.path.append('/Users/nguyennhatthuong/Documents/ance_detection/acne_doctor-care_system-fastapi_ai/backend/fastapi_ai/ultralytics')
from ultralytics import YOLO
import torch


MODEL_PATH = '/Users/nguyennhatthuong/Documents/ance_detection/acne_doctor-care_system-fastapi_ai/backend/fastapi_ai/weight_acne/best_640img.pt'

detection_model = AutoDetectionModel.from_pretrained(
    model_type= "yolov8",
    model_path = MODEL_PATH,
    confidence_threshold=0.5,
    device="cuda:0"
)

def acnePredictWithYolo(file_path):
    result = get_prediction(file_path, detection_model)
    detections = result.object_prediction_list 
    boundingbox = []
    for detection in detections:
        bbox = detection.bbox 
        x_min = float(bbox.minx) 
        y_min = float(bbox.miny)  
        x_max = float(bbox.maxx) 
        y_max = float(bbox.maxy)  
        confidence = float(detection.score.value)  
        class_name = detection.category.name 
        boundingbox.append({
            'confidence': confidence,
            'class_name': class_name,
            'x_min': x_min,
            'x_max': x_max,
            'y_max': y_max,
            'y_min': y_min
        })    
    result.export_visuals("/Users/nguyennhatthuong/Documents/ance_detection/acne_doctor-care_system-fastapi_ai/backend/fastapi_ai/acne_predicted")
    return {'message': 'Acne predict using YoloV8', 'bounding-box': boundingbox}

def acnePredictWithSahi(file_path):
    print(file_path)
    result = get_sliced_prediction(
        file_path,  # Sử dụng file_path đã được truyền vào
        detection_model=detection_model,
        slice_height=128,
        slice_width=128,
        overlap_height_ratio=0.2,
        overlap_width_ratio=0.2
    )
    detections = result.object_prediction_list 
    boundingbox = []
    for detection in detections:
        bbox = detection.bbox 
        x_min = float(bbox.minx)  
        y_min = float(bbox.miny)  
        x_max = float(bbox.maxx) 
        y_max = float(bbox.maxy) 
        confidence = float(detection.score.value)  
        class_name = detection.category.name 
        boundingbox.append({
            'confidence': confidence,
            'class_name': class_name,
            'x_min': x_min,
            'x_max': x_max,
            'y_max': y_max,
            'y_min': y_min
        })    
    result.export_visuals("/Users/nguyennhatthuong/Documents/ance_detection/acne_doctor-care_system-fastapi_ai/backend/fastapi_ai/acne_predicted")
    return {'message': 'Acne predict using YoloV8 and SAHI', 'bounding-box': boundingbox}

# def acnePredictWithSahi(file_path):
    # print(file_path)
    # result = get_sliced_prediction(
    #     file_path,  # Sử dụng file_path đã được truyền vào
    #     detection_model=detection_model,
    #     slice_height=128,
    #     slice_width=128,
    #     overlap_height_ratio=0.2,  # Điều chỉnh tỷ lệ chồng lấn
    #     overlap_width_ratio=0.2,   # Điều chỉnh tỷ lệ chồng lấn
    # )
    # detections = result.object_prediction_list
    # boundingbox = []
    # boxes = []
    # scores = []
    # labels = []

    # for detection in detections:
    #     bbox = detection.bbox
    #     x_min = float(bbox.minx)
    #     y_min = float(bbox.miny)
    #     x_max = float(bbox.maxx)
    #     y_max = float(bbox.maxy)
    #     confidence = float(detection.score.value)
    #     class_name = detection.category.name

    #     # Tạo danh sách box, score và label để sử dụng cho NMS
    #     boxes.append([x_min, y_min, x_max, y_max])
    #     scores.append(confidence)
    #     labels.append(class_name)

    #     # Chuyển đổi sang tensor để sử dụng NMS của PyTorch
    #     boxes_tensor = torch.tensor(boxes)
    #     scores_tensor = torch.tensor(scores)

    #     # Áp dụng NMS
    #     nms_threshold = 0.2
    #     keep_indices = torch.ops.torchvision.nms(boxes_tensor, scores_tensor, nms_threshold)

    #     # Lọc các bounding boxes sau khi áp dụng NMS
    #     for idx in keep_indices:
    #         boundingbox.append({
    #             'confidence': scores[idx],
    #             'class_name': labels[idx],
    #             'x_min': boxes[idx][0],
    #             'y_min': boxes[idx][1],
    #             'x_max': boxes[idx][2],
    #             'y_max': boxes[idx][3]
    #         })

    # result.export_visuals("/home/nhatthuong/Documents/Thesis/code/backend/fastapi_ai/acne_predicted")
    # return {'message': 'Acne predict using YoloV8 and SAHI', 'bounding-box': boundingbox}