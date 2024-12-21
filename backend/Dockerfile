
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./

# instalo dependencias
RUN pip install --no-cache-dir -r requirements.txt 

# establezco la variable de entorno Deploy para que se detecte en settings.py
ENV DEPLOY=true
COPY . .
RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

