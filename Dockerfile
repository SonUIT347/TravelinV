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
# ENV REACT_APP_API_BASE_URL=http://20.24.161.68:3100
# ENV REACT_APP_API_BASE_URL_NODE=http://4.145.181.140:8800
# Command to run the application
CMD ["npm", "start"]