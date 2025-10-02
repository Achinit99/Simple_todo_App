# Step 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./

# Copy the rest of the app
COPY . .

# Build the React app for production
RUN npm install

# Expose port 80
EXPOSE 3000

# Start Nginx
CMD ["npm", "start"]
