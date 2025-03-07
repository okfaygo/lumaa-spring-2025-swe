# Full-Stack Coding Challenge
  - Salary Expectations per month (Mandatory): **$2000** 
  - Video Link: [Fogo's Full-Stack-Demo](https://drive.google.com/file/d/1DEUwA-1zcsBPl9oESfHqLaXVWN5zvZDn/view?usp=sharing)

## Overview

Create a “Task Management” application with **React + TypeScript** (frontend) (Frontend was mistakenly made with JavaScript), **Node.js** (or **Nest.js**) (backend), and **PostgreSQL** (database).

## Steps To Setup Database
  1. Install PostgreSQL from [https://www.postgresql.org/download/.](https://www.postgresql.org/download/.)
  2. Create database titled task_manager 
  3. The tables are taken care by the DB script 

## Setup .env file:
  1. Create .env file in /server/ (backend)
  2. It needs the following:
  
    - PORT= by default 5000, change if necessary
    - DB_URL=postgresql://postgres:password@localhost:5432/task_manager # Database URL
    - DB_USER=postgres # Database user
    - DB_PASSWORD=password # Database password
    - DB_NAME=task_manager # Database name
    - DB_HOST=localhost # Database host
    - DB_PORT=5432 # Database port
    - JWT_SECRET = long string of text

## How to run the backend:
  1. cd to server folder
  2. Ensure .env file is setup correctly
  3. npm install
  4. npm run dev
  5. That should start the backend on port 3000 (which means you're done)

## How to run the frontend:
  1. npm install
  2. npm run dev (or npm start)
  3. This should start up your website on your browser

  ## Evaluation Criteria

1. **Functionality**  
   - Does registration and login work correctly (with password hashing)? **YES**
   - Are tasks protected by authentication? **YES**
   - Does the tasks CRUD flow work end-to-end? **YES**

2. **Code Quality**  
   - Is the code structured logically and typed in TypeScript? **YES**
   - Are variable/function names descriptive? **YES**

3. **Clarity**  
   - Is the `README.md` (in your fork) clear and detailed about setup steps? **YES**
   - Easy to run and test? **YES**

4. **Maintainability**  
   - Organized logic (controllers/services, etc.) **YES**
   - Minimal hard-coded values **No hard-coded values besides the JWT**