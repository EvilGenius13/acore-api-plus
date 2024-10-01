# Stage 1: Build the app
FROM node:21-alpine3.20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ARG VITE_REALM
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_REALM=${VITE_REALM}
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:1.25.2-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
