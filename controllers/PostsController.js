const express        = require( 'express' ),
      router         = express.Router(),
      cors           = require( 'cors' ),
      bodyParser     = require( 'body-parser' ),
      methodOverride = require( 'method-override' ),
      Post           = require( '../models/Post' );

router.use( bodyParser.urlencoded( { extended: true } ) );
router.use( methodOverride( '_method' ) );

//Read all
router.get( '/', cors(), function ( req, res ) {
    Post.find( null, 'title', function ( err, posts ) {
        if ( err ) {
            console.log( 'There was a problem finding the posts.' );
            return res.status( 500 );
        }

        res.status( 200 );
        console.log( 'Returning all posts' );
        res.json( posts );
    } );
} );

//Read one
router.get( '/:id', function ( req, res ) {
    Post.findById( req.params.id, function ( err, post ) {
        if ( err ) {
            console.log( 'There was a problem finding the post.' );
            return res.status( 500 );
        }

        if ( !post ) {
            console.log( 'Could not find a post with the id ' + req.params.id );
            return res.status( 404 );
        }

        res.status( 200 );
        console.log( 'Returning the post with id ' + req.params.id );
        res.json( post );
    } );
} );

//Create
router.post('/', function ( req, res ) {
    Post.create( {
        title: req.body.title,
        body:  req.body.body
    }, function ( err, post ) {
        if ( err ) {
            console.log( 'There was a problem adding the post to the database.' );
            return res.status( 500 );
        }

        res.status( 201 );
        console.log( 'Added a post' );
    } );

    res.redirect( '/' );
} );

//Update
router.put( '/:id', function ( req, res ) { 
    Post.findByIdAndUpdate( req.params.id, req.body, { new: true }, function ( err, post ) {
        if ( err ) {
            console.log( 'There was a problem updating the post.' );
            return res.status( 500 );
        }
        
        if ( !post ) {
            console.log( 'Could not find a post with the id ' + req.params.id );
            return res.status( 404 );
        }

        res.status( 200 );
        console.log( 'Updated the post' );
    } );

    res.redirect( '/' );
} );

//Delete
router.delete( '/:id', function ( req, res ) {
    Post.findByIdAndRemove( req.params.id, function ( err, post ) {
        if ( err ) {
            console.log( 'There was a problem deleting the post.' );
            return res.status( 500 );
        }

        if ( !post ) {
            console.log( 'Could not find a post with the id ' + req.params.id );
            return res.status( 404 );
        }

        res.status( 200 );
        console.log( 'Deleted the post with the id ' + post._id );
    } );

    res.redirect( '/' );
} );

module.exports = router;