FROM python:3.11-slim
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r mini-steam/requirements.txt
EXPOSE 8080
CMD ["python","mini-steam/server.py"]
