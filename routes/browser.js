// Import necessary modules
import express from 'express';
import { resolve } from 'path';

// Create an instance of the Express.js app
const app = express();

// Define the browserRoute
export const browserRoutes = (req, res, next) => {
  res.send(`<!doctype html>
<html lang="en">
  <head>
    <!-- Your HTML head content here -->
  </head>
  <body>
    <!-- Your HTML body content here -->
  </body>
</html>`);
};

// Define other routes and middleware as needed

// Set up routes
app.get('/', browserRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000/`);
});
