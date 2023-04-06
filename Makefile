APP := extension-api
TAG := $(shell git rev-list --count HEAD)

# Default value
DOCKER_REGISTRY ?= jozhe15

# CI Pipeline
all: build push

all-m1: build-m1 push

build :
	docker build --pull -t ${DOCKER_REGISTRY}/${APP}:${TAG} .

build-m1 :
	docker build --platform linux/amd64 --pull -t ${DOCKER_REGISTRY}/${APP}:${TAG} .

push :
	docker push ${DOCKER_REGISTRY}/${APP}:${TAG}
