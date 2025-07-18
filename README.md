# Employee CRUD Application

A full-stack web application for managing employees, built with **Angular** (frontend) and **.NET Core Web API** (backend, with SQLite). Supports full CRUD, search/filter, pagination, and Material UI.

---

## Project Structure

```
RentSaaSTask_AAM/
├── rentsaastask_aam.client/      # Angular frontend
│   ├── src/app/
│   │   ├── components/           # Employee list & form components
│   │   ├── services/             # Employee API service
│   │   └── ...
│   ├── angular.json
│   ├── package.json
│   └── ...
├── RentSaaSTask_AAM.Server/      # .NET Core backend
│   ├── Controllers/              # EmployeesController
│   ├── Models/                   # Employee model
│   │   └── Employee.cs
│   ├── Data/                     # EF Core context
│   │   └── EmployeeDbContext.cs
│   ├── appsettings.json          # SQLite connection
│   ├── Program.cs
│   └── ...
└── README.md
```

---

## Versions & Dependencies

### Backend (.NET Core)
- .NET 8.0+
- Microsoft.EntityFrameworkCore.Sqlite
- Microsoft.EntityFrameworkCore.Tools

### Frontend (Angular)
- Angular: 20.x
- @angular/material: 20.x
- @angular/cdk: 20.x
- @angular/cli: 20.x
- rxjs, zone.js, etc.

---

## Features
- Employee CRUD (Create, Read, Update, Delete)
- Search/filter employees
- Pagination (server-side, scalable)
- Angular Material UI (responsive, modern)
- Form validation & user feedback
- SQLite database (file-based, easy setup)

---

## Setup Instructions

### 1. Backend (.NET Core)

1. **Install dependencies:**
   ```sh
   cd RentSaaSTask_AAM/RentSaaSTask_AAM.Server
   dotnet restore
   ```
2. **Apply migrations & create DB:**
   ```sh
   dotnet ef database update
   ```
3. **Run the backend:**
   ```sh
   dotnet run
   ```
   The API will be available at: `https://localhost:7023/`

### 2. Frontend (Angular)

1. **Install dependencies:**
   ```sh
   cd RentSaaSTask_AAM/rentsaastask_aam.client
   npm install
   ```
2. **Run the frontend (with proxy to backend):**
   ```sh
   npm start
   ```
   The app will be available at: `https://localhost:4200/`

---

## API Endpoints

- `GET    /api/employees?page=1&pageSize=10`   — List employees (paginated)
- `GET    /api/employees/{id}`                 — Get employee by ID
- `POST   /api/employees`                      — Create new employee
- `PUT    /api/employees/{id}`                 — Update employee (id in URL and body)
- `DELETE /api/employees/{id}`                 — Delete employee

---

## Notes
- CORS is enabled for `https://localhost:4200` in the backend.
- Angular proxy is configured to forward `/api` calls to the backend.
- All Angular/Material packages must be on the same major version (20.x recommended).
- For development, use `npm start` (not `ng serve`) to enable the proxy.

---

## Task Coverage
- [x] Backend CRUD with SQLite
- [x] Frontend CRUD, search, validation
- [x] Angular Material UI
- [x] Pagination (server + client)
- [x] README with setup & usage

---

## Author
- Eng\ Ahmed Ayman Mansour

---

## License
MIT 