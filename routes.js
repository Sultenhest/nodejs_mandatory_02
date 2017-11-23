const express    = require( 'express' ),
      router     = express.Router(),
      path       = __dirname + '/public/views/';

//Frontpage
router.get( '/', function ( req, res ) {
    res.sendFile( path + 'index.html' );
});

//404
router.get( '/*', function ( req, res ) {
    res.sendFile( path + 'error.html' );
});

module.exports = router;