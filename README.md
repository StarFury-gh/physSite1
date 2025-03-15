Запуск сервера (main.py -  backend)<br>
python3 -m venv venv
source venv/bin/activate
pip install fastapi <br>
pip install uvicorn <br>
`внутри папки с файлом main.py:`<br>
uvicorn main:app --reload
