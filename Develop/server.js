// import express from the node library
var express = require("express");
// import path fromt the node library
var path = require("path");
// import fs from the node library
var fs = require("fs");
// import db.json file into the server to reference
var json = require("./db/db.json")

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
    // return the notes.html file
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "public/index.html"));
    });

// create the POST routes

// create the DELETE routes

// start the server to listen
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});