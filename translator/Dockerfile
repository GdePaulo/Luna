# 1 
FROM python:3.7

# 2
# RUN pip install Flask gunicorn

# 3
COPY api/ /app
COPY code/ /app

COPY requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

# 4
ENV PORT 8080

# 5
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app