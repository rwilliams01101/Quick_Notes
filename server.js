// declare dependencies for fs, path, express, db.json,
var fs = require('fs');
var path = require('path');
var express = require('express');

// set app equal to the express method
var app = express();

//  notesDB is an array of objects, intialized with the data in db.json
//  that holds the objects with titles and text of each note
var notesDB = require('./db/db.json');

// declare port(s) will run in port online OR run on localhost
var PORT = process.env.PORT || 8080;

// middleware, still magic, but something something parse url to request data from server side
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// still middleware (I think??), grants access to public folder and all contents
app.use(express.static('public'));

//  get routes

// root route / with callback function passing through request and response
app.get("/", function (req, res) {
  // takes response and uses method of express sendFile to direct to index.html (root)
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// notes route / with callback function passing through request and response
app.get("/notes", function (req, res) {
  // takes response and uses method of express sendFile to direct to notes.html
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


// api routes

// api/notes get route. will pull anything in notesDB array so it can be displayed client-side
app.get("/api/notes", function (req, res) {
    // takes the response in JSON format
    res.json(notesDB);
});

// api/notes post route.
app.post('/api/notes', function (req, res) {
    // will push user input (req.body) into the notesDB array at the end
    notesDB.push(req.body);

    // over-write db.json with the array containing the new note
    fs.writeFile('db/db.json', JSON.stringify(notesDB), function (err) {
        if (err) {
            throw error;
        }
    });
    // respond with the updated array to be rendered
    res.json(notesDB)
});

// api delete route

// using express method delete passing in /api/notes/:id <= this is a placeholder for the unique IDs on each note
app.delete('/api/notes/:id', function (req, res) {
    // the id for the note to be deleted is in req.params.id
    // use .splice() to remove the note from the array
    notesDB.splice(req.params.id, 1)
    //  over-write db.json again, this time without the note that was deleted
    fs.writeFile('db/db.json', JSON.stringify(notesDB), function (err) {
        if (err) {
            throw error;
        }
    })
    // a default response to the request, this is required
    res.json(true);
})

//  failsafe route. any route not covered in above will default to root
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// start the server to listen, console logs message and active port
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});