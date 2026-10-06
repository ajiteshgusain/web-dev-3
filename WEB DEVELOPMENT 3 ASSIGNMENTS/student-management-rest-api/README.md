# Student Management REST API

Lab Assignment 2 – Web Dev III (Node.js & Express Backend)

## Requirements covered
- Express server
- CRUD REST APIs
- Custom logger middleware
- Modular routing
- Error handling and HTTP status codes
- In-memory array/JSON data only
- Postman testing

## Project structure

```text
student-management-rest-api/
├── app.js
├── package.json
├── .gitignore
├── README.md
├── routes/
│   └── studentRoutes.js
├── middleware/
│   └── logger.js
└── data/
    └── students.js
```

## Run

```bash
npm install
npm start
```

Server: `http://localhost:3000`

## API endpoints

| Method | URL | Purpose |
|---|---|---|
| GET | /students | Get all students |
| GET | /students/:id | Get one student |
| POST | /students | Create a student |
| PUT | /students/:id | Update a student |
| DELETE | /students/:id | Delete a student |

## POST body

```json
{
  "name": "Neha",
  "course": "BTech"
}
```

## PUT body

```json
{
  "name": "Neha Sharma",
  "course": "BCA"
}
```

## Notes

Data is stored only in memory. Restarting the server resets the data to the values in `data/students.js`.
