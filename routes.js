const express = require( 'express' ),
      router  = express.Router(),
      path    = __dirname + '/public/views/';

/********************
 * STATIC PAGES
 *******************/
router.get( '/', function ( req, res ) {
    res.sendFile( path + 'index.html' );
});

router.get( '/about', function ( req, res ) {
    res.sendFile( path + 'about.html' );
});

router.get( '/contact', function ( req, res ) {
    res.sendFile( path + 'contact.html' );
});

/********************
 * POST PAGE ROUTES
 *******************/
router.get( '/form', function ( req, res ) {
    res.sendFile( path + 'posts/form.html' );
});

/********************
 * ERROR ROUTES
 *******************/
router.get( '/*', function ( req, res ) {
    res.sendFile( path + 'error.html' );
});

router.get( '/*/*', function ( req, res ) {
    res.sendFile( path + 'error.html' );
});

module.exports = router;