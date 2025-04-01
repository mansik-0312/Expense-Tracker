# Use Nginx as the base image
FROM nginx:alpine

#Set a work directory
WORKDIR /usr/share/nginx/html

#Copy the files
COPY . . 

#export nginx port
EXPOSE 80

#Command
CMD ["nginx", "-g", "daemon off;"]