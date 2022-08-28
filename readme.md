# Server

Run the service using Docker
To run the microservice first we need to create a docker image using the following command.

### To build image:
```
docker build -t image_name .
```

Then run the image by defining the container port.

### To run container from image:
```
docker run -d -p {local_port}:{container_port} --name container_name image_name
```
