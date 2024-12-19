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
    if (!name) {
        return res.status(400).json({ message: 'Bad syntax. Name is required.' });
    }
    if (!description) {
        return res.status(400).json({ message: 'Bad syntax. Description is required.' });
    }

    db.run('INSERT INTO tasks (name, description) VALUES (?, ?)', [name, description], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Internal server error.', error: err.message });
        }
        res.status(201).json({ message: 'Task created successfully.', id: this.lastID });
    });
});

// Getting all tasks (GET /tasks)
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error.', error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Get a single task by id (GET /tasks/:id)
app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;

    let num = parseFloat(id);
    if (!Number.isInteger(num)) {
        return res.status(400).json({ message: 'Bad syntax. \'id\' must be integer.' });
    }

    db.all('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error.', error: err.message });
        }
        if (row.length === 0) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json(row);
    });
});

// Update a task (PUT /tasks/:id)
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    let num = parseFloat(id);
    if (!Number.isInteger(num)) {
        return res.status(400).json({ message: 'Bad syntax. \'id\' must be integer.' });
    }
    if (!name) {
        return res.status(400).json({ message: 'Bad syntax. Name is required.' });
    }
    if (!description) {
        return res.status(400).json({ message: 'Bad syntax. Description is required.' });
    }

    db.run('UPDATE tasks SET name = ?, description = ? WHERE id = ?', [name, description, id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Internal server error.', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(201).json({ message: 'Task updated successfully.' });
    });
});

// Delete a single task by id (DELETE /tasks/:id)
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    let num = parseFloat(id);
    if (!Number.isInteger(num)) {
        return res.status(400).json({ message: 'Bad syntax. \'id\' must be integer.' });
    }

    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err, row) {
        if (err) {
            return res.status(500).json({ message: 'Internal server error.', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json({ message: 'Task deleted successfully.' });
    });
});

// Start the server.
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
});