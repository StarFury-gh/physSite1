FROM python:alpine

WORKDIR /app

COPY . .

RUN pip install fastapi uvicorn SQLAlchemy

RUN python setting.py

CMD ["python", "main.py"]
