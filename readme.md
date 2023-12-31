# Backend API Server

This repository contains the implementation of a backend API server written in TypeScript and running in a Node.js environment. The server includes the following sample APIs:

## User

- **GET '/users'**: Retrieve a list of all users.
- **GET '/user/{id}'**: Retrieve a specific user by ID.
- **POST '/user'**: Create a new user.
- **PUT '/user/{id}'**: Update an existing user by ID.
- **PATCH '/user/{id}'**: Partially update an existing user by ID.
- **DELETE '/user/{id}'**: Delete a user by ID.
- **GET '/usersFilter?'**: Filter users based on a given filter.

## Post

- **GET '/posts'**: Retrieve a list of all posts.
- **GET '/post/{id}'**: Retrieve a specific post by ID.
- **POST '/post'**: Create a new post.
- **PUT '/post/{id}'**: Update an existing post by ID.
- **PATCH '/post/{id}'**: Partially update an existing post by ID.
- **DELETE '/post/{id}'**: Delete a post by ID.
- **GET '/postsFilter'**: Filter posts based on a given filter.

Listing nested resources:

- **GET '/users/:id/posts'**: One level of nested route is available.

Other:

- Integrated Prisma ORM for database functionalities.
- Dockerized the server with a Dockerfile.

The API documentation is provided in the Swagger specification.

Thank you for reviewing this submission.

Darin Kumarnsit
