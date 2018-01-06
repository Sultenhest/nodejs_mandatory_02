const express = require( 'express' ),
      app     = express.Router(),
      path    = __dirname + '/public/views/';

/********************
 * STATIC PAGES
 *******************/
app.get( '/', function ( req, res ) {
    res.sendFile( path + 'index.html' );
});

app.get( '/about', function ( req, res ) {
    res.sendFile( path + 'about.html' );
});

app.get( '/contact', function ( req, res ) {
    res.sendFile( path + 'contact.html' );
});

/********************
 * POST PAGE ROUTES
 *******************/
app.get( '/addpost', function ( req, res ) {
    res.sendFile( path + 'posts/create.html' );
});

app.get( '/updatepost', function ( req, res ) {
    res.sendFile( path + 'posts/update.html' );
});

app.get( '/removepost', function ( req, res ) {
    res.sendFile( path + 'posts/delete.html' );
});

/********************
 * ERROR ROUTES
 *******************/
 app.get( '/*', function ( req, res ) {
    res.sendFile( path + 'error.html' );
});

app.get( '/*/*', function ( req, res ) {
    res.sendFile( path + 'error.html' );
});

module.exports = app;