# Demo Earthquake Management API with Apollo Server, Express, Next.js, and TypeScript

## Overview

This project is a monorepo containing a client and a server that manages a list of earthquakes using **TypeScript**, **Node.js (Express)**, **Apollo Server** (for GraphQL API), and **Next.js** (for the frontend). It allows users to fetch, add, update, and delete earthquake records, with initial data setup from a provided CSV file.

----------

## Project Structure

```
/root
  ├── /client      # Next.js frontend with Apollo Client, TypeScript
  ├── /server      # Node.js backend with Apollo Server, Express, TypeScript
  ├── .nvmrc
  ├── package.json # Root package.json with pnpm workspaces
  ├── pnpm-lock.yaml
  └── pnpm-workspace.yaml # pnpm workspace configuration

```

----------

## Requirements

-   **Node.js** (v20 or higher)
-   **pnpm** (v9 or higher) - for managing the monorepo and dependencies
-  **MongoDB Atlas** - for cloud-based MongoDB database

----------

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/MaksVeter/demo-earthquake-management.git
cd demo-earthquake-management

```

### 2. Install dependencies

Use `pnpm` to install dependencies for both client and server:

```bash
pnpm install

```

This will install the dependencies for both the `client` and `server` directories, using the root `pnpm` workspace.

----------

### 3. Set up MongoDB Atlas

1.  Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

2.  Create a cluster and set up a new database.

3.  Obtain the connection string from MongoDB Atlas. It will look something like this:

    bash


    `mongodb+srv://<username>:<password>@cluster0.mongodb.net/earthquake_db?retryWrites=true&w=majority`

### 4. Set up environment variables

#### Server Environment Variables (`server/.env`)

Create a `.env` file in the `server` folder with the following MongoDB Atlas configuration:

bash


`ATLAS_URI=mongodb+srv://<login>:<password>@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DB_NAME=testdb
COLLECTION=earthquakes`

Replace `<login>` and `<password>` with your MongoDB Atlas credentials.

#### Client Environment Variables (`client/.env`)

Create a `.env` file in the `client` folder with the following GraphQL server URL:

bash


`GRAPHQL_SERVER_URL=http://localhost:5050/graphql`

## Available Scripts

### In the root folder:

-   `pnpm run start:dev`: Runs both the client and server in development mode concurrently.
-   `pnpm run dev:client`: Starts the development server for the frontend (Next.js) client.
-   `pnpm run dev:server`: Starts the development server for the backend (Express, Apollo Server).
-   `pnpm run seed:server`: Runs database migrations and seeds initial data from a CSV file.

### In the **client** folder (Next.js):

-   `pnpm run dev`: Starts the Next.js development server with Turbopack for fast builds.
-   `pnpm run build`: Builds the production version of the Next.js app.
-   `pnpm run start`: Starts the Next.js app in production mode.
-   `pnpm run lint`: Runs linting on the Next.js project.
-   `pnpm run codegen`: Runs GraphQL code generation for type safety.

### In the **server** folder (Node.js/Express/Apollo Server):

-   `pnpm run compile`: Compiles TypeScript files to JavaScript (into the `dist` directory).
-   `pnpm run start`: Compiles the server and starts it with Node.js.
-   `pnpm run migrate:seed`: Runs migrations and seeds the database with initial data from the CSV.

----------

## Development

### Running the full application:

To run both the client and server in development mode concurrently:

```bash
pnpm run start:dev

```

This will start:

-   **Client**: The Next.js development server on `http://localhost:3000`.
-   **Server**: The Express API server with Apollo Server on `http://localhost:5050`.

### Seed the database with test data (optional):

1.  **Create a `.env` file** in the `server` folder with your database configuration (e.g., for PostgreSQL, MongoDB, etc.).
2.  Run the migration and seed script to initialize the database:

```bash
pnpm run seed:server

```

----------

## License

This project is licensed under the MIT License - see the [LICENSE](https://chatgpt.com/c/LICENSE) file for details.

----------

## Troubleshooting

-   **Error: `pnpm not found`**: Ensure that you have **pnpm** installed globally. You can install it with:

    ```bash
    npm install -g pnpm
    
    ```

-   **Error: `Database connection failed`**: Double-check your `.env` configuration and make sure your database is running.