FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app/backend

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
