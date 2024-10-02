# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set build-time environment variables
ARG VITE_API_URL
ARG VITE_REALM
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_REALM=${VITE_REALM}

# Build the frontend application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Set the command to start server
CMD ["npm", "run", "serve"]
