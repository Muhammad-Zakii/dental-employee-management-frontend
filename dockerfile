# Stage 1: Build the frontend
FROM node:18 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine

# Copy the built files from the builder stage to NGINX's HTML folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
