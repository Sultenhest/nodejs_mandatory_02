const express     = require( 'express' ),
      bodyParser  = require('body-parser'),
      router      = express.Router(),
      MongoClient = require('mongodb').MongoClient,
      ObjectId    = require('mongodb').ObjectID,
      uri         = process.env.DB;

router.use( bodyParser.urlencoded( { extended: true } ) );

//Read all
router.get( '/', function ( req, res ) {
    MongoClient.connect(uri, function ( err, db ) {
        var posts = db.collection('posts');

        posts.find().toArray(function ( err, result ) {
            console.log( 'Returning all posts' );
            res.json( result );
        });

        db.close();
    });
});

//Read one
router.get( '/:id', function ( req, res ) {
    MongoClient.connect( uri, function ( err, db ) {
        var posts = db.collection( 'posts' );

        posts.findOne( { '_id' : ObjectId( req.params.id ) }, function ( err, result ) {
            console.log( 'Returning a posts' );
            res.json( result );
        });

        db.close();
    });
});

//Create
router.post( '/', function ( req, res ) {
    MongoClient.connect( uri, function ( err, db ) {
        var posts = db.collection( 'posts' );

        posts.insertOne(req.body, function ( err, result ) {
            res.status( 201 );
            console.log( 'Added a post' );
            res.json();
        });

        db.close();
    });
});

//Delete
router.delete( '/:id', function ( req, res ) {
    MongoClient.connect( uri, function ( err, db ) {
        var posts = db.collection( 'posts' );

        posts.deleteOne( { '_id' : ObjectId( req.params.id ) }, function ( err, result ) {
            res.status( 204 );
            console.log( 'Deleted the post' );
            res.json();
        });

        db.close();
    });
});

//Update
router.put( '/:id', function ( req, res ) {
    MongoClient.connect( uri, function ( err, db ) {
        var posts = db.collection( 'posts' );

        posts.updateOne( { '_id' : ObjectId( req.params.id ) }, { $set : req.body }, function( err, result ) {
            res.status( 204 );
            console.log( 'Updated the post' );
            res.json();
        });
        db.close();
    });
});

module.exports = router;