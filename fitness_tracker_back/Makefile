# Variables
IMAGE_NAME = fitness_tracker_back-image

# Build Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run Docker container using docker-compose
start:
	docker-compose up -d

# Stop and remove Docker container using docker-compose
stop:
	docker-compose down

# Remove Docker image
clean:
	docker rmi $(IMAGE_NAME)

# Default target
.DEFAULT_GOAL := run
