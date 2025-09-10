# ---- Build stage ----
FROM node:20-slim AS build
WORKDIR /app

# Install deps first for better caching
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
# If your app needs env at build-time, pass them as build args:
#   docker build --build-arg VITE_API_BASE_URL=https://api.example.com ...
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

# ---- Runtime (Nginx) ----
FROM nginx:alpine
# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
# Copy compiled assets
COPY --from=build /app/dist /usr/share/nginx/html
# Optional: tighter default Nginx config / caching can be added here
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
