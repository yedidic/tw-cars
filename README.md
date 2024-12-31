# TW Cars

## Overview

This project consists of a three-tier application using Docker Compose, including the following services:

1. **Database**: A Microsoft SQL Server instance running in a container.
2. **Backend Server**: A Node.js application serving as the API layer.
3. **Frontend Client**: A React-based application for the user interface.

## Features

- **Database**: SQL Server configured with Express edition.
- **Server**: API service built with Node.js, connects to the database and serves requests.
- **Client**: React application communicating with the server API.

## Prerequisites

Ensure the following are installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuration

### Environment Variables

Create a `.env` file in the root directory of the project to define environment-specific variables. Example:

```env
DB_PORT=1433
SA_PASSWORD=yourStrong!Password
SERVER_PORT=3000
FRONTEND_PORT=8080
```

### Folder Structure

- `./db`: Contains the database initialization and configuration files.
- `./server`: Contains the backend server code.
- `./client`: Contains the frontend React application code.

## Usage

### Building and Running the Project

1. **Build and Start the Containers**:

   ```bash
   docker-compose up --build
   ```

2. **Access the Services**:
   - Database: Exposed on the host machine via `DB_PORT` specified in `.env`.
   - Backend Server: Accessible at `http://localhost:3000`.
   - Frontend Client: Accessible at `http://localhost:8080`.

### Stopping the Services

To stop the running containers:

```bash
docker-compose down
```

## App Instructions

**Enter [http://localhost:8080](http://localhost:8080) to run the client**
### Retrieving a Token

**Enter your "user name"**
   in the input and submit. now you have a token on your app's context. You'll have to "log in" every time you refresh the application.

   **The only username allowed to retrieve a token at the moment is `cars`.**

   ![image](https://github.com/user-attachments/assets/03abe625-cad4-428d-9f70-a7aa87b60be0)



### Access the Table and Update Cells
   Now you're supposed to get the access to the table. you can easily click the cells and update their data, it'll be automatically reflected at the database.

   
   ![image](https://github.com/user-attachments/assets/bbee7e53-4b74-4fad-aff2-bee2633ab899)


Good Luck and Thank You!
