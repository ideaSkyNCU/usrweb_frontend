# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Quasar application
RUN npm run build

# Expose the port that your Quasar application will run on
EXPOSE 8080

# Command to run your Quasar application
CMD ["npm", "start"]
