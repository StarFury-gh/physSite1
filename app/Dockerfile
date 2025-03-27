FROM python:alpine

WORKDIR /app

COPY . .

# RUN echo 123
# RUN python
# RUN source bin/venv/activate
RUN pip install fastapi uvicorn
RUN pip install async-lru

CMD ["python", "main.py"]
