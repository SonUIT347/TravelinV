# Use a base image with Node.js pre-installed
FROM node:alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# RUN npm install --legacy-peer-deps

# Install dependencies
RUN npm install --force

# Copy the entire project files to the working directory
COPY . .

# Build the project
RUN npm run build

# Use NGINX base image
FROM nginx:alpine

# Copy the build files from the previous stage to NGINX directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]

ENV REACT_APP_API_BASE_URL=http://20.24.161.68:3100
ENV REACT_APP_API_BASE_URL_NODE=http://4.145.181.140:8800
