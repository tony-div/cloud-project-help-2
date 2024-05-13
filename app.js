// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Create an Express application
const app = express();

// Configure middleware
app.use(express.static('./static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  connectionLimit: 10,
  host: 'db', // Docker Compose service name
  user: 'root', // MySQL user
  password: 'root', // MySQL password
  database: 'students', // Database name
});

const connect = async () => {
    await connection;
}

connect();

// Define a route to fetch data from the database
app.get('/data', async(req, res) => {
  // Use the connection to query the database
  const [results] = await connection.promise().query(
    'SELECT * FROM `Students`'
  );
    res.json(results);
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
