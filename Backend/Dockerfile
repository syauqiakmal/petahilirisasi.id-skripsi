FROM python:3.9-slim

# Set environment variables for non-interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies and GDAL
RUN apt-get update && apt-get install -y \
    wget gnupg2 lsb-release software-properties-common build-essential \
    gdal-bin libgdal-dev && \
    echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" | tee /etc/apt/sources.list.d/pgdg.list && \
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && \
    apt-get update && apt-get install -y \
    postgresql-14 \
    postgresql-14-postgis-3 \
    postgresql-14-postgis-3-scripts && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set GDAL_CONFIG environment variable
ENV GDAL_CONFIG=/usr/bin/gdal-config

# Set PATH for GDAL libraries
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

# Copy your backend code
WORKDIR /app
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the backend port
EXPOSE 8000

# Command to run the application
CMD ["python", "main.py"]
