# Frontend Dockerfile (frontend/Dockerfile)

# Use a Node.js base image or use a static file server like nginx
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies (if using a bundler like Vite)
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Serve frontend (example: using live-server or Vite for dev, or copy to nginx for production)
EXPOSE 8080

# Serve the frontend files (replace live-server with Vite or another bundler if needed)
CMD ["npx", "live-server", ".", "--port=8080"]
