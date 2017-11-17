const express    = require( 'express' ),
      bodyParser = require( 'body-parser' ),
      router     = express.Router(),
      path       = __dirname + '/public/views/';

router.use( bodyParser.urlencoded( { extended: true } ) );

//Frontpage
router.get( '/', function ( req, res ) {
    res.sendFile( path + 'index.html' );
});

//404
router.get( '/*', function ( req, res ) {
    res.sendFile( path + 'error.html' );
});

module.exports = router;