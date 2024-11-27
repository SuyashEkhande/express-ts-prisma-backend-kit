
# Typescript Express PostgreSQL Starter

A robust and scalable backend boilerplate built with TypeScript, Node.js, Express, PostgreSQL, Prisma, and Zod. This project demonstrates best practices in API development, including modular architecture, validation, authentication, and database integration. Perfect for rapidly prototyping secure and maintainable server-side applications.

## Features

- **TypeScript**: Strongly-typed language for enhanced development experience.
- **Express**: Fast and minimalist web framework for Node.js.
- **PostgreSQL**: Powerful, open-source relational database for data storage.
- **Prisma**: Type-safe ORM for seamless interaction with PostgreSQL.
- **Zod**: TypeScript-first schema validation library for input validation.
- **JWT Authentication**: Secure authentication system using JSON Web Tokens (JWT).
- **Modular Architecture**: Organized into Controllers, Services, Routes, Middlewares, Validators, and Types for clear separation of concerns.
- **Scalability**: Built to easily scale for production-ready applications.
  
## Tech Stack

- **Node.js** (Runtime)
- **Express** (Web Framework)
- **TypeScript** (Type Safety)
- **PostgreSQL** (Database)
- **Prisma** (ORM)
- **Zod** (Schema Validation)
- **JWT** (Authentication)

### Prerequisites 

Make sure you have the following installed on your system: 
- **Node.js** (version 14.x or higher) 
- **npm** (Node Package Manager) 
- **PostgreSQL** (or a PostgreSQL service like ElephantSQL, AWS RDS, etc.) 

## NPM Scripts

This project includes several npm scripts to help with development and management tasks. You can run them using `npm run <script-name>`.

### Scripts

- **`npm run test`**: Runs a test command (currently a placeholder, you can replace it with your test framework setup).
- **`npm run build`**: Compiles the TypeScript code using `npx tsc -b` (build command).
- **`npm run dev`**: Starts the development server using `nodemon` to automatically restart on file changes.
- **`npm run start`**: Starts the application by running the compiled JavaScript file from `src/index.ts`.
- **`npm run clean`**: Deletes the `dist` directory and all its contents (`rmdir /s /q dist`).
- **`npm run prisma:generate`**: Runs Prisma's code generation to sync your Prisma client with the database.
- **`npm run prisma:migrate`**: Applies database migrations using Prisma's `migrate dev` command for local development.

These scripts help streamline the development process and ensure smooth operation across different environments.


### Steps to Get Started 

1. Clone the repository: 
`git clone https://github.com/yourusername/typescript-express-postgres-starter.git` 
`cd typescript-express-postgres-starter`

2. Install the dependencies:
`npm install`

3. Set up the environment variables: 
	Copy the `.env.example` file to `.env` and adjust the variables as needed.

4. Set up the PostgreSQL database: 
	Make sure your PostgreSQL instance is running and update the connection string in the `.env` file.

5. Run Prisma migrations to set up the database schema & also generate client:
`npm run prisma:migrate`
`npm run prisma:generate`

6. Open your browser or use Postman to test the endpoints.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, create a new branch, and submit a pull request. Contributions are always welcome!



## Acknowledgements

A big thank you to the creators and maintainers of the following libraries and technologies used in this project:

- **[TypeScript](https://www.typescriptlang.org/)**: For providing strong typing and a better development experience.
- **[Node.js](https://nodejs.org/)**: For enabling scalable server-side JavaScript execution.
- **[Express](https://expressjs.com/)**: For making building APIs easy and fast.
- **[PostgreSQL](https://www.postgresql.org/)**: For providing a powerful relational database solution.
- **[Zod](https://github.com/colinhacks/zod)**: For simplifying schema validation in TypeScript.
- **[Prisma](https://www.prisma.io/)**: For ORM support and easier database management.

