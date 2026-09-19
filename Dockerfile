# Use Node.js 24 as the base image
FROM node:24

# Set the working directory inside the container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Tell Docker that the application uses port 3000
EXPOSE 3000

# Start the OrderFlow application
CMD ["node", "app.js"]
