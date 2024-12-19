const express = require('express');
const sqlite3 = require('sqlite3').verbose();



// Set up SQLite database
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error('Error opening database: ', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create tasks table
db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
    );`);

// Initializing express app.
const app = express();

// Make app parse JSON requests
app.use(express.json());

// Create a task (POST /tasks)
app.post('/tasks', (req, res) => {
    const { name, description } = req.body;
    db.run('INSERT INTO tasks (name, description) VALUES (?, ?)', [name, description], function (err) {
        if (err) {
            return res.status(400).json({ message: 'Error creating task.', error: err.message });
        }
        res.status(201).json({ message: 'Task created successfully.', id: this.lastID });
    });
});

// Getting all tasks (GET /tasks)
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching tasks from database.', error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Get a single task by id (GET /tasks/:id)
app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.all('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching task from database.', error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json(row);
    });
});



// Start the server.
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});