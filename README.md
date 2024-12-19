# Simple RESTful CRUD API 

This is the documentation for the Simple RESTful CRUD API. It demonstrates basic operations (Create, Read, Update, and Delete) on a resource in a database, following REST principles. The API uses HTTP methods (GET, POST, PUT, DELETE) to perform these operations and follows standard conventions for handling resources over HTTP.

---

## Endpoints

### POST /tasks 

**Description:** Creates a new task in the database. Both `name` and `description` are required fields.

#### Example Request

| Content-Type | Body |
| - | - |
| application/json | { "name": "Task 1.", "description": "Description 1." } |

#### Example Responses

| Status Code | Content-Type | Response |
| - | - | - |
| 201 | application/json | { "message": "Task successfully created.", "id": 1 } |
| 400 | application/json | { "message": "Name is required." } |
| 400 | application/json | { "message": "Description is required." } |
| 500 | application/json | { "message": "Internal server error." } |

### GET /tasks 

**Description:** Retrieves a list of all tasks in the database.

#### Example Responses

| Status Code | Content-Type | Response |
| - | - | - |
| 200 | application/json | [ { "id": 1, "name": "Task 1", "description": "Description of Task 1" } ] |
| 500 | application/json | { "message": "Internal server error." } |

### GET /tasks/:id 

**Description:** Retrieves a specific task from the database by its id.

#### Example Responses

| Status Code | Content-Type | Response |
| - | - | - |
| 200 | application/json | { "id": 1, "name": "Task 1", "description": "Description of Task 1" } |
| 400 | application/json | { "message": "Bad syntax. 'id' must be integer." }
| 404 | application/json | { "message": "Task not found" }
| 500 | application/json | { "message": "Internal server error." } |

### PUT /tasks/:id 

**Description:** Updates the `name` and `description` of a specific task in the database by its id.

#### Example Request

| Content-Type  | Body |
| - | - |
| application/json | { "name": "Updated Task", "description": "Updated Description" } |

#### Example Responses

| Status Code | Content-Type | Response |
| - | - | - |
| 200 | application/json | { "message": "Task successfully updated." } |
| 400 | application/json | { "message": "Bad syntax. 'id' must be integer." } |
| 400 | application/json | { "message": "Name is required." } |
| 400 | application/json | { "message": "Description is required." } |
| 404 | application/json | { "message": "Task not found." } |
| 500 | application/json | { "message": "Internal server error." } |

### DELETE /tasks/:id
**Description:** Deletes a specific task from the database by its id.

#### Example Responses

| Status Code | Content-Type | Response |
|-------------|--------------|----------|
| 200 | application/json | { "message": "Task successfully deleted." } |
| 400 | application/json | { "message": "Bad syntax. 'id' must be integer." } |
| 404 | application/json | { "message": "Task not found." } |
| 500 | application/json | { "message": "Internal server error." } |

## Notes
- Ensures that the database is properly initialized before using the API.
- Handles errors appropriately to avoid exposing sensitive server details.