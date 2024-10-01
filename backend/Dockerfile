# Backend Dockerfile (backend/Dockerfile)

# Use a Node.js base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Compile TypeScript code to JavaScript
RUN npm run build

# Expose the backend port
EXPOSE 3005

# Start the backend server
CMD ["node", "dist/app.js"]
