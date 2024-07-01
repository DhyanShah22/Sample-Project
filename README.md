# MERN Application with Asynchronous Post Creation

This project is a full-stack MERN application designed to handle asynchronous post creation with a focus on scalability and efficiency. It uses RabbitMQ for queuing, Redis for caching, and MongoDB for storage. The backend is built with Node.js and TypeScript, ensuring type safety and better code maintainability. Authentication is implemented using JWT tokens.

## Features

- User registration and authentication with JWT.
- Asynchronous post creation using RabbitMQ.
- MongoDB for data storage.
- Redis for caching search results.
- Comprehensive API with endpoints for creating posts, fetching post counts, and searching posts.
- Well-documented code using TSDoc.

## Project Structure

```plaintext
├── src
│   ├── config
│   │   └── index.ts
│   ├── controllers
│   │   └── postController.ts
│   ├── middleware
│   │   └── authMiddleware.ts
│   ├── models
│   │   ├── postModel.ts
│   │   └── userModel.ts
│   ├── routes
│   │   ├── authRoutes.ts
│   │   └── postRoutes.ts
│   ├── services
│   │   └── postService.ts
│   ├── utils
│   │   ├── rabbitMQ.ts
│   │   └── redisCache.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md

Getting Started
Prerequisites

    Node.js
    npm
    MongoDB
    Redis
    RabbitMQ

Installation

    Clone the repository:

bash

git clone https://github.com/yourusername/mern-async-posts.git
cd mern-async-posts

    Install dependencies:

bash

npm install

    Create a .env file in the root directory and add your environment variables:

plaintext

PORT=3000
MONGO_URI=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
RABBITMQ_URI=amqp://localhost

    Start MongoDB, Redis, and RabbitMQ servers.

Running the Application

    Start the application:

bash

npm run dev

    The server will start on http://localhost:3000.

API Endpoints
1. Register User

URL: http://localhost:3000/auth/register

Method: POST

Headers:

    Content-Type: application/json

Body:

json

{
  "username": "your_username",
  "password": "your_password"
}

2. Login User

URL: http://localhost:3000/auth/login

Method: POST

Headers:

    Content-Type: application/json

Body:

json

{
  "username": "your_username",
  "password": "your_password"
}

Response:

json

{
  "token": "your_jwt_token"
}

3. Create Post

URL: http://localhost:3000/posts

Method: POST

Headers:

    Content-Type: application/json
    Authorization: Bearer <your_jwt_token>

Body:

json

{
  "title": "Sample Post Title",
  "message": "This is a sample post message.",
  "context": "General",
  "tags": ["sample", "post"],
  "location": "New York",
  "images": ["http://example.com/image1.jpg"],
  "externalLinks": ["http://example.com"],
  "numLikes": 0,
  "numBookmarks": 0,
  "numViews": 0
}

4. Get Post Count

URL: http://localhost:3000/posts/count

Method: GET

Headers:

    Authorization: Bearer <your_jwt_token>

5. Search Posts

URL: http://localhost:3000/posts/search?q=<search_query>

Method: GET

Headers:

    Authorization: Bearer <your_jwt_token>

Example: To search for posts with the term "sample":

bash

http://localhost:3000/posts/search?q=sample

Code Documentation

The code is documented using TSDoc. You can generate HTML documentation using a tool like typedoc.

    Install typedoc:

bash

npm install typedoc --save-dev

    Generate documentation:

bash

npx typedoc --out docs src

Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss changes.
License

This project is licensed under the MIT License.
Acknowledgments

    Node.js
    Express
    MongoDB
    Redis
    RabbitMQ
    TypeScript

vbnet


This README provides an overview of the project, installation steps, API endpoints, and additional information to help users get started with and contribute to the project.

