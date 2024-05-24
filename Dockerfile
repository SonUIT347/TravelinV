FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire project files to the working directory
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000
ENV REACT_APP_API_BASE_URL=http://travelinv-java-backend:3100
ENV REACT_APP_API_BASE_URL_NODE=http://travelinv-node-backend:8800
# Command to run the application
CMD ["npm", "start"]