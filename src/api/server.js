const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// const officeSpaces = [
//   {
//     id: 1,
//     title: 'Akhils Old Apartment',
//     address: 'Aleksandra Janowskiego 02-341',
//     image: "https://images.pexels.com/photos/6177604/pexels-photo-6177604.jpeg?auto=compress&cs=tinysrgb&w=400",
//     features: "Chill room",
//     expanded_images: [
//       "https://images.pexels.com/photos/1231633/pexels-photo-1231633.jpeg?auto=compress&cs=tinysrgb&w=400",
//       "https://images.pexels.com/photos/5679718/pexels-photo-5679718.jpeg?auto=compress&cs=tinysrgb&w=400"
//     ],
//     description: "Located a 5-minute walk from St. Florian's Gate in Krakow, Tower",
//     price: 200,
//     taxInfo: "Includes taxes and fees"
//   },
//   {
//     id: 2,
//     title: 'We Work',
//     address: 'Aleksandra Janowskiego 02-341',
//     image: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=400",
//     features: "Meeting room",
//     price: 300,
//     expanded_images: [
//       "https://images.pexels.com/photos/1231633/pexels-photo-1231633.jpeg?auto=compress&cs=tinysrgb&w=400",
//       "https://images.pexels.com/photos/5679718/pexels-photo-5679718.jpeg?auto=compress&cs=tinysrgb&w=400"
//     ],
//     taxInfo: "Includes taxes and fees"
//   },
//   {
//     id: 3,
//     title: 'Chicken A Filet',
//     address: 'Aleksandra Janowskiego 02-341',
//     image: "https://images.pexels.com/photos/6414318/pexels-photo-6414318.jpeg?auto=compress&cs=tinysrgb&w=400",
//     features: "Meeting room",
//     expanded_images: [
//       "https://images.pexels.com/photos/1231633/pexels-photo-1231633.jpeg?auto=compress&cs=tinysrgb&w=400",
//       "https://images.pexels.com/photos/5679718/pexels-photo-5679718.jpeg?auto=compress&cs=tinysrgb&w=400"
//     ],
//     description: "A cozy space with a meeting room, suitable for small gatherings.",
//     price: 112,
//     taxInfo: "Includes taxes and fees"
//   },
//   {
//     id: 4,
//     title: 'Tech Hub',
//     address: 'Aleksandra Janowskiego 02-341',
//     image: "https://images.pexels.com/photos/7125135/pexels-photo-7125135.jpeg?auto=compress&cs=tinysrgb&w=400",
//     features: "Open workspace",
//     expanded_images: [
//       "https://images.pexels.com/photos/1231633/pexels-photo-1231633.jpeg?auto=compress&cs=tinysrgb&w=400",
//       "https://images.pexels.com/photos/5679718/pexels-photo-5679718.jpeg?auto=compress&cs=tinysrgb&w=400"
//     ],
//     description: "A high-tech hub with an open workspace for collaborative projects.",
//     price: 250,
//     taxInfo: "Includes taxes and fees"
//   },
//   { id: 5, title: 'Innovate Co-Working', address: 'Aleksandra Janowskiego 02-341', image: "https://images.pexels.com/photos/6153641/pexels-photo-6153641.jpeg?auto=compress&cs=tinysrgb&w=400",
//   features: "Private offices",
//   expanded_images: [
//     "https://images.pexels.com/photos/1231633/pexels-photo-1231633.jpeg?auto=compress&cs=tinysrgb&w=400",
//     "https://images.pexels.com/photos/5679718/pexels-photo-5679718.jpeg?auto=compress&cs=tinysrgb&w=400"
//   ],
//   description: "A high-tech hub with an open workspace for collaborative projects.",
//   price: 400,
//   taxInfo: "Includes taxes and fees"},
//   { id: 6, title: 'Silicon Valley Suites', address: 'Aleksandra Janowskiego 02-341', image: "https://images.pexels.com/photos/6835952/pexels-photo-6835952.jpeg?auto=compress&cs=tinysrgb&w=400",
//   features: "High-speed internet",
//   expanded_images: [
//     "https://images.pexels.com/photos/1231633/pexels-photo-1231633.jpeg?auto=compress&cs=tinysrgb&w=400",
//     "https://images.pexels.com/photos/5679718/pexels-photo-5679718.jpeg?auto=compress&cs=tinysrgb&w=400"
//   ],
//   description: "A high-tech hub with an open workspace for collaborative projects.",
//   price: 350,
//   taxInfo: "Includes taxes and fees"},
//   { id: 7, title: 'Green Oasis Offices', address: 'Aleksandra Janowskiego 02-341', image: "https://images.pexels.com/photos/6447395/pexels-photo-6447395.jpeg?auto=compress&cs=tinysrgb&w=400",
//   features: "Outdoor workspaces",
//   expanded_images: [
//     "https://images.pexels.com/photos/1231633/pexels-photo-1231633.jpeg?auto=compress&cs=tinysrgb&w=400",
//     "https://images.pexels.com/photos/5679718/pexels-photo-5679718.jpeg?auto=compress&cs=tinysrgb&w=400"
//   ],
//   description: "A high-tech hub with an open workspace for collaborative projects.",
//   price: 280,
//   taxInfo: "Includes taxes and fees"},
//   { id: 8, title: 'Skyline Co-Working', address: 'Aleksandra Janowskiego 02-341', image: "https://images.pexels.com/photos/4170646/pexels-photo-4170646.jpeg?auto=compress&cs=tinysrgb&w=400",
//   features: "Event spaces",
//   expanded_images: [
//     "https://images.pexels.com/photos/1231633/pexels-photo-1231633.jpeg?auto=compress&cs=tinysrgb&w=400",
//     "https://images.pexels.com/photos/5679718/pexels-photo-5679718.jpeg?auto=compress&cs=tinysrgb&w=400"
//   ],
//   description: "A high-tech hub with an open workspace for collaborative projects.",
//   price: 320,
//   taxInfo: "Includes taxes and fees"},
//   { id: 9, title: 'Serene Suites', address: 'Aleksandra Janowskiego 02-341', image: "https://images.pexels.com/photos/6355095/pexels-photo-6355095.jpeg?auto=compress&cs=tinysrgb&w=400",
//   features: "Wellness programs",
//   expanded_images: [
//     "https://images.pexels.com/photos/1231633/pexels-photo-1231633.jpeg?auto=compress&cs=tinysrgb&w=400",
//     "https://images.pexels.com/photos/5679718/pexels-photo-5679718.jpeg?auto=compress&cs=tinysrgb&w=400"
//   ],
//   description: "A high-tech hub with an open workspace for collaborative projects.",
//   price: 380,
//   taxInfo: "Includes taxes and fees"},
//   { id: 10, title: 'Urban Workspace', address: 'Aleksandra Janowskiego 02-341', image: "https://images.pexels.com/photos/5969406/pexels-photo-5969406.jpeg?auto=compress&cs=tinysrgb&w=400",
//   features: "24/7 access",
//   expanded_images: [
//     "https://images.pexels.com/photos/1231633/pexels-photo-1231633.jpeg?auto=compress&cs=tinysrgb&w=400",
//     "https://images.pexels.com/photos/5679718/pexels-photo-5679718.jpeg?auto=compress&cs=tinysrgb&w=400"
//   ],
//   description: "A high-tech hub with an open workspace for collaborative projects.",
//   price: 300,
//   taxInfo: "Includes taxes and fees"}
// ];

// const users = [
//   { id: 1, email: 'akhilajith@gmail.com', password: '122003' },
//   { id: 2, email: 'davidabraham@gmail.com', password: 'password' },

// ];

// Define a route for "/offices"
app.post('/offices', (req, res) => {
  const newOfficeSpace = req.body;
  
  // Assign a unique ID (for simplicity, incrementing from 1)
  newOfficeSpace.id = officeSpaces.length + 1;

  // Add the new office space to the array
  officeSpaces.push(newOfficeSpace);

  // Respond with the added office space
  res.status(201).json(newOfficeSpace);
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Officely API!')
});

// Define a route for "/offices"
app.get('/offices', (req, res) => {
  res.json(officeSpaces);
});

app.get('/users', (req, res) => {
  res.json(users);
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