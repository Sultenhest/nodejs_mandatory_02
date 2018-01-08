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
app.get( '/form', function ( req, res ) {
    res.sendFile( path + 'posts/form.html' );
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