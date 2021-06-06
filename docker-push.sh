#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t welearn-front-end .
docker images
docker tag welearn-front-end "$DOCKER_USERNAME"/welearn-front-end
docker push "$DOCKER_USERNAME"/welearn-front-end
 