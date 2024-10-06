const express = require('express');
const path = require('path');
const app = express();

// Route to serve home.html
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Start the server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const fs = require('fs');

// Route to serve user profile in JSON format
app.get('/profile', (req, res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading user file" });
        }
        res.json(JSON.parse(data));
    });
});

app.use(express.json()); // Middleware to parse JSON body

app.post('/login', (req, res) => {
   
   
    const { username, password } = req.body;

    // Read user data from user.json
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading user file" });
        }

        const user = JSON.parse(data);

        if (username !== user.username) {
            return res.json({ status: false, message: "User Name is invalid" });
        }

        if (password !== user.password) {
            return res.json({ status: false, message: "Password is invalid" });
        }

        return res.json({ status: true, message: "User Is valid" });
    });
});

app.get('/logout/:username', (req, res) => {
    const { username } = req.params;
    res.send(`<b>${username} successfully logged out.</b>`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error (optional)
    res.status(500).send('<h1>Server Error</h1>');
});

/*  express.Router() is a useful method used in a code above to provide  more  structure and modularity to routes for express apps.
   

express.Router() is the official tool  of the Express.js framework designed to the routing by grouping the routes into easily manageable chunks. It enables the vendors to cluster related routes and apply certain middleware to certain route clusters without interfering with other segment of the application.

Using Express.Router() provides several Benefits:
code Organization: There are more route files that effectively partition Different concerns of the code.
Reusability: Enable parts of the application to use, share and  declare the same route definition.
Middleware grouping: Middleware is generally used on specific all routes or all routes groups which are created in the  router to enhance maintainability.

*/

/* when it comes to implementing the error handling in Express.js, people mostly use middleware. You define an error-handling middleware that accepts four arguments: err,req,res, and next. This middleware is called in circumstance where there is an error in the route management proceess.   */