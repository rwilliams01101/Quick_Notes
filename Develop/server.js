// import express from the node library
var express = require("express");
// import path fromt the node library
var path = require("path");
// import fs from the node library
var fs = require("fs");
// import db.json file into the server to reference
var noteDb = require("./db/db.json")
// console.log(noteDb);

// instantiate a new express app utilizing the express() method
var app = express();
// declare PORT number so local server can find the application
var PORT = 8080;

// middleware parses the request string and converts to a JSON object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create the get routes

// return the index.html file
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "public/index.html"));
    });
    // return the notes.html file
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "public/notes.html"));
    });
    // failsafe route
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "public/index.html"));
    });

//  create the API get routes
    // set up the notes API
    app.get("/api/notes", function (req,res) {
        // response needs to access the noteDB variable in order to send a response
        res.json(noteDb);
    })

// create the POST routes

    app.post("/api/notes", function(req, res) {
        noteDb.push(req.body);
        // add the new note the db.json file
        fs.readFile("/db/db.json", "utf-8", function (error){
        });
        fs.writeFile("/db/db.json", JSON.stringify(noteDb), function(error) {
            req.body
        });
        res.json(noteDb);
    });

    // create the DELETE routes
    
    // app.delete("/api/notes", function(req, res) {
    //     noteDb.pop();
    // })
    
    // start the server to listen
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });