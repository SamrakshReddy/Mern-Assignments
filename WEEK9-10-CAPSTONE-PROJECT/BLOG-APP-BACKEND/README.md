# Backend Development

## 1. Create Git Repository

Initialize a Git repository for version control using `git init`. Git helps in tracking project changes, maintaining version history, managing branches, and supporting collaboration between developers. It also makes deployment and rollback management easier during development.

---

## 2. Add `.gitignore` File

Create a `.gitignore` file to exclude unnecessary files and folders from being uploaded to the repository. Files like `node_modules`, build folders, and `.env` files should be ignored to keep the project clean, lightweight, and secure.

---

## 3. Create `.env` File for Environment Variables

Create a `.env` file to store sensitive configuration data such as database URLs, secret keys, API credentials, and port numbers. The `dotenv` package is used to read environment variables securely inside the application. This improves security and supports separate configurations for development and production environments.

---

## 4. Generate `package.json`

Generate the `package.json` file using `npm init -y`. This file stores project metadata, dependencies, scripts, version information, and configuration details. It helps manage external packages and ensures consistency across different development environments.

---

## 5. Create Express Application

Install and configure Express.js to create the backend server. Express simplifies server creation, routing, middleware handling, and API management. It provides a fast and minimal framework for building scalable RESTful backend applications using Node.js.

---

## 6. Connect to Database

Connect the backend application to MongoDB using Mongoose. Database connectivity allows the application to store and retrieve data such as users, articles, and authentication details. Mongoose simplifies MongoDB operations through schemas and models while providing validation and structured data management.

---

## 7. Add Middlewares

Add middleware functions for processing requests and responses within the application. Common middlewares include JSON body parsing, CORS handling, request logging, authentication verification, and centralized error handling. Middleware improves modularity, reusability, and clean request flow management.

---

## 8. Design Schemas and Create Models

Design schemas to define the structure, validation rules, and data types for database documents. Models are created using schemas and are used to interact with MongoDB collections. Proper schema design ensures consistent data storage, easier querying, and efficient database management.

---

## 9. Design REST APIs for All Resources

Design RESTful APIs for resources such as users, authors, and articles using HTTP methods like GET, POST, PUT, and DELETE. REST APIs enable communication between frontend and backend systems while supporting CRUD operations, authentication, and data management in a scalable and maintainable way.


# APIs Used

## User APIs
- Register user
- Login user
- Read all articles

## Author APIs
- Create article
- Update article
- Delete article
- Read own articles

---

# Axios

Axios is used for:
- Sending HTTP requests
- API integration
- Backend communication
- Sending authentication tokens

---

# React Hook Form

React Hook Form is used for:
- Form validation
- Better form handling
- Reducing re-rendering
- Improving performance

---

# Context API

Context API is used for:
- Global state management
- Sharing authentication data
- Avoiding prop drilling

---

# Future Enhancements

- Like and comment system
- Search functionality
- Pagination
- Dark mode
- Profile image upload
- Rich text editor
- Bookmark articles
---

# Run Complete Project

## Frontend

npm run dev

## Backend
npm run server