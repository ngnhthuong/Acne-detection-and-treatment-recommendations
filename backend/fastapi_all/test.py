import requests 

req = requests.get('http://localhost:8000/api/acne_detection_daily/66e70912d5b19ebb87aa55bf', headers
                   = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhbjFAdmlhZHRnLmNvbSIsImV4cCI6MTcyNjQyMjE0NX0.M9xWoBrzFF-8ecFnNpSVAZZL0VJyZ7Ld6JcSgEH4Kf8'})
print(req.text)