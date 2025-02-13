﻿# WhatBytes-assignment
# **Project Management API**

A RESTful API for managing projects, tasks, and users in a simplified project management system. Built with **Express.js**, **PostgreSQL**, and **Prisma ORM**.

---

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Authentication Routes](#authentication-routes)
  - [User Routes](#user-routes)
  - [Project Routes](#project-routes)
  - [Task Routes](#task-routes)
- [Testing the API](#testing-the-api)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Additional Features](#additional-features)
- [License](#license)

---

## **Project Overview**

This API allows users to:

- Create and manage users.
- Create and manage projects.
- Add tasks to projects.
- Assign tasks to users.
- Update task statuses.
- Filter and search tasks.
- Authenticate and authorize users using JWT.

---

## **Features**

- **User Management**: Create, update, delete, and list users with unique email validation.
- **Project Management**: Create, update, delete, and list projects.
- **Task Management**: Add tasks to projects, assign tasks to users, update task statuses, and delete tasks.
- **Authentication**: Secure endpoints with JWT authentication.
- **Permissions**: Only authorized users (assigned users or project owners) can update or delete tasks/projects.
- **Filtering and Searching**: Filter tasks by status and assigned user.

---

## **Prerequisites**

- **Node.js** (v12 or higher)
- **npm** (v6 or higher)
- **PostgreSQL** (v10 or higher)
- **Git** (optional, for cloning the repository)

---

## **Installation**

### **1. Clone the Repository**

```bash
git clone https://github.com/gauravverma9795/WhatBytes-assignment
cd project-management-api
