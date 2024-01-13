const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const officeSpaces = [
  { id: 1, title: 'Akhils Old Appartment', address: 'Aleksandra Janowskiego 02-341', image: "https://images.pexels.com/photos/6177604/pexels-photo-6177604.jpeg?auto=compress&cs=tinysrgb&w=400",
    features: "Meeting room",
    price: "112 zl",
    taxInfo: "Includes taxes and fees"},
    { id: 2, title: 'We Work', address: 'Aleksandra Janowskiego 02-341', image: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=400",
    features: "Meeting room",
    price: "112 zl",
    taxInfo: "Includes taxes and fees"},
    { id: 3, title: 'Chicken-A-Filet', address: 'Aleksandra Janowskiego 02-341', image: "https://images.pexels.com/photos/6414318/pexels-photo-6414318.jpeg?auto=compress&cs=tinysrgb&w=400",
    features: "Meeting room",
    price: "112 zl",
    taxInfo: "Includes taxes and fees"}
];

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Officely API!')
});

// Define a route for "/offices"
app.get('/offices', (req, res) => {
  res.json(officeSpaces);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');
// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// // Database connection setup
// const db = mysql.createConnection({
//   host: 'your_database_host',
//   user: 'your_database_user',
//   password: 'your_database_password',
//   database: 'your_database_name',
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//   } else {
//     console.log('Connected to the database');
//   }
// });

// // Endpoint to get office spaces from the database
// app.get('/offices', (req, res) => {
//   // Query to select all rows from your officeSpaces table
//   const query = 'SELECT * FROM officeSpaces';

//   // Execute the query
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       // Send the retrieved data as the JSON response
//       res.json(results);
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });