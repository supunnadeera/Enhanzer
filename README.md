# Book Management System

A modern web application for managing a library collection, built with Angular (frontend) and ASP.NET Core (backend). This application demonstrates clean architecture patterns and follows best practices for both frameworks.

## Features

This application provides a complete book management system with the following capabilities:

- View all books in an organized, responsive table layout
- Add new books with form validation
- Edit existing book information
- Delete books with confirmation
- Real-time feedback through notifications
- Professional user interface using Angular Material
- RESTful API backend with proper error handling

## Prerequisites

Before running this application, ensure you have the following installed on your system:

- Node.js (v16 or later) - [Download](https://nodejs.org/)
- .NET SDK 7.0 or later - [Download](https://dotnet.microsoft.com/download)
- Angular CLI - Install globally using:
  ```bash
  npm install -g @angular/cli
  ```
- A modern code editor (Visual Studio Code recommended) - [Download](https://code.visualstudio.com/)

## Getting Started

Follow these steps to get the application running on your local machine:

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Restore the .NET packages:
   ```bash
   dotnet restore
   ```

3. Build the application:
   ```bash
   dotnet build
   ```

4. Run the backend server:
   ```bash
   dotnet run
   ```

The API will start running at `http://localhost:5081`. You can explore the API endpoints using Swagger UI at `http://localhost:5081/swagger`.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required npm packages:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   ng serve
   ```

The frontend application will be available at `http://localhost:4200`.

## Project Structure

### Backend Structure
```
backend/
├── Controllers/
│   └── BooksController.cs    # API endpoints
├── Models/
│   └── Book.cs              # Data models
├── Data/
│   └── BookDbContext.cs     # Database context
└── Program.cs               # Application configuration
```

### Frontend Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── book-list/      # Main book listing
│   │   │   ├── book-form/      # Add/Edit form
│   │   │   └── confirm-dialog/ # Delete confirmation
│   │   ├── models/
│   │   │   └── book.ts         # Book interface
│   │   └── services/
│   │       └── book.service.ts # API communication
│   └── styles.scss             # Global styles
```

## Development

### Backend Development
- The backend uses Entity Framework Core with an in-memory database for simplicity
- API endpoints follow RESTful conventions
- Proper error handling and validation are implemented
- CORS is configured to allow frontend communication

### Frontend Development
- Uses Angular Material for UI components
- Implements reactive forms with validation
- Follows Angular best practices and coding standards
- Includes error handling and user feedback
- Responsive design that works on all devices

## API Endpoints

The backend provides the following RESTful endpoints:

- GET /api/books - Retrieve all books
- GET /api/books/{id} - Retrieve a specific book
- POST /api/books - Create a new book
- PUT /api/books/{id} - Update an existing book
- DELETE /api/books/{id} - Delete a book
