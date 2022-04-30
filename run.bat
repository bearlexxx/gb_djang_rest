@ECHO OFF

CALL .\venv\Scripts\activate.bat
cd library
python manage.py runserver
