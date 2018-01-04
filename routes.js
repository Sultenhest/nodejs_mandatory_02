const express = require( 'express' ),
      app     = express.Router(), //express(),
      path    = __dirname + '/public/views/';

//Frontpage
app.get( '/', function ( req, res ) {
    res.sendFile( path + 'index.html' );
});

//About
app.get( '/about', function ( req, res ) {
    res.sendFile( path + 'about.html' );
});

//Contact
app.get( '/contact', function ( req, res ) {
    res.sendFile( path + 'contact.html' );
});

//Create Post
app.get( '/addpost', function ( req, res ) {
    res.sendFile( path + 'post/create.html' );
});

//Create Post
app.get( '/updatepost', function ( req, res ) {
    res.sendFile( path + 'post/update.html' );
});

//Delete Post
app.get( '/removepost', function ( req, res ) {
    res.sendFile( path + 'post/delete.html' );
});

//404
app.get( '/*', function ( req, res ) {
    res.sendFile( path + 'error.html' );
});

module.exports = app;