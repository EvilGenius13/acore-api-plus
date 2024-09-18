# Backend Dockerfile (backend/Dockerfile)

# Use a Node.js base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend port (adjust if using a different port)
EXPOSE 3001

# Start the backend server
CMD ["node", "app.js"]
