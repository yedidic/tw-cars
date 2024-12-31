# Use Node.js base image
FROM node:21-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the API port
EXPOSE ${PORT}

# Command to run the application
CMD ["npm", "run", "start"]
