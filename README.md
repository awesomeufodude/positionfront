Here’s the full updated README with the new section about hexagonal architecture added:

---

# Article Nexus

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Steps to Install Dependencies](#steps-to-install-dependencies)
  - [Steps to Start the App in Development Mode](#steps-to-start-the-app-in-development-mode)
  - [Steps to Run Tests](#steps-to-run-tests)
    - [Running Jest Tests](#running-jest-tests-unit-and-integration-tests)
    - [Running Cypress Tests](#running-cypress-tests-end-to-end-tests)
- [Technical Decisions](#technical-decisions)
  - [Usage of Redux and React Query](#1-usage-of-redux-and-react-query)
  - [Project Organization](#2-project-organization)
  - [Authentication Handling](#3-authentication-handling)
  - [Favorites Handling](#4-favorites-handling)
  - [Article Ratings Handling](#5-article-ratings-handling)
  - [Hexagonal Architecture](#6-hexagonal-architecture)
- [Directory Structure](#directory-structure)
- [Scripts](#scripts)

---

## Overview

Article Nexus is a platform that allows users to create articles, update them, add ratings, mark articles as favorites, and more. It leverages powerful tools like React Query and Redux for state management. The project is designed to ensure high scalability, modularity, and maintainability, adhering to best practices like hexagonal architecture.

Deployed Backend urls: https://positionback-b7f5793f9d74.herokuapp.com
Deployed Frontend urls: https://positionfront.vercel.app

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher recommended)
- npm (v8 or higher) or yarn
- Deployed Backend urls (https://positionback-b7f5793f9d74.herokuapp.com) place this in .env file when running locally.

---

### Steps to Install Dependencies
1. Clone the repository:
   ```bash
   git clone https://github.com/awesomeufodude/positionfront.git
   cd positionfront
   ```
2. Install dependencies:
   ```bash
   npm install
   # OR
   yarn install
   ```

---

### Steps to Start the App in Development Mode
1. Run the development server:
   ```bash
   npm run dev
   # OR
   yarn dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

---

### Steps to Run Tests
#### Running Jest Tests (Unit and Integration Tests):
1. Run the tests:
   ```bash
   npm run test
   # OR
   yarn test
   ```

#### Running Cypress Tests (End-to-End Tests):
1. Start the app in development mode.
2. Open Cypress:
   ```bash
   npx cypress open
   # OR
   yarn cypress open
   ```
3. Select and run tests in the Cypress GUI.

---

## Technical Decisions

### 1. **Usage of Redux and React Query**
I used **both Redux and React Query** for different purposes:
- **React Query:**
  - Used for managing server state such as fetching, caching, and updating article data, ratings, and favorites.
  - Simplifies API integrations and provides built-in support for optimistic updates.
- **Redux:**
  - Handles client-side global state management, such as user preferences and authentication state.
  - Provides a single source of truth for app-wide client state.

By combining the strengths of both tools, we ensure efficient state management for server and client data.

---

### 2. **Project Organization**
I followed a **vertical slices architecture**:
- Features are organized by domain (e.g., `features/auth`, `features/articles`).
- Each feature directory contains all related components, hooks, and services.
- This improves maintainability and scalability by keeping related logic together.

---

### 3. **Authentication Handling**
- **Approach:**
  - Used JWT-based authentication with secure storage for storing tokens.
  - Authentication state is managed using Redux.
  - React Query handles fetching and caching user data post-login.

---

### 4. **Favorites Handling**
- **Approach:**
  - Favorites data is managed via React Query.
  - Optimistic updates are used for a seamless user experience.

---

### 5. **Article Ratings Handling**
- **Approach:**
  - Ratings are managed via React Query.
  - Server-side updates for ratings are done with debounced API calls to minimize server requests.

---

### 6. **Hexagonal Architecture (Explanation)**
To ensure the project is scalable and maintainable, **hexagonal architecture patterns** are encouraged. This architecture emphasizes the separation of concerns, ensuring that the core business logic is independent of external systems like databases or APIs.

#### Layers in Hexagonal Architecture:
1. **Domain** (Core Business Logic):
   - Represents the core functionality of the application.
   - Contains business rules and domain models.
   - Completely independent of external frameworks, databases, or UI.

2. **Application** (Use Cases):
   - Coordinates interactions between the domain and external systems.
   - Acts as a bridge between the domain and infrastructure layers.
   - Handles business workflows using domain logic.

3. **Adapters** (Infrastructure and Presentation):
   - Adapters connect the core application to external systems.
   - Examples: REST APIs, databases, or UI components.
   - Ensures that changes in infrastructure do not impact the core logic.

#### Benefits of Hexagonal Architecture:
- Promotes **modularity** and testability.
- Makes the application **easier to adapt** to changing requirements or technologies.
- Ensures **independence of the domain logic** from external frameworks or tools.

---

## Directory Structure
```
├── features/
│   ├── auth/              # Authentication logic
│   ├── articles/          # Articles and related functionality
│   ├── categories/        # Categories feature
├── components/            # Shared UI components        
├── public/                # Static assets
├── cypress/               # Cypress tests and configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

---

## Scripts
- `npm run dev` - Start the development server.
- `npm run build` - Build the app for production.
- `npm run start` - Run the production build.
- `npm run test` - Run unit and integration tests.

---