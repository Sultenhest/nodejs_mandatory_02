const express        = require( 'express' ),
      //app            = express(),
      app      = express.Router(),
      cors           = require( 'cors' ),
      bodyParser     = require( 'body-parser' ),
      methodOverride = require( 'method-override' ),
      mongoClient    = require( 'mongodb' ).MongoClient,
      ObjectId       = require( 'mongodb' ).ObjectID,
      uri            = ( process.env.DB || require( '../util/mongourl.js' ) );

app.use( cors() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( methodOverride('_method') );

//Read all
app.get( '/', function ( req, res ) {
    mongoClient.connect(uri, function ( err, db ) {
        var posts = db.collection('posts');

        posts.find().toArray(function ( err, result ) {
            res.status( 200 );
            console.log( 'Returning all posts' );
            res.json( result );
        });

        db.close();
    });
});

//Read one
app.get( '/:id', function ( req, res ) {
    mongoClient.connect( uri, function ( err, db ) {
        var posts = db.collection( 'posts' );

        posts.findOne( { '_id' : ObjectId( req.params.id ) }, function ( err, result ) {
            res.status( 200 );
            console.log( 'Returning the post with id ' + ObjectId( req.params.id ) );
            res.json( result );
        });

        db.close();
    });
});

//Create
app.post( '/', function ( req, res ) {
    mongoClient.connect( uri, function ( err, db ) {
        var posts = db.collection( 'posts' );

        posts.insertOne(req.body, function ( err, result ) {
            res.status( 201 );
            console.log( 'Added a post' );
        });

        db.close();
    });

    res.redirect('/');
});

//Update
app.put( '/:id', function ( req, res ) {
    mongoClient.connect( uri, function ( err, db ) {
        var posts = db.collection( 'posts' );

        posts.updateOne( { '_id' : ObjectId( req.params.id ) }, { $set : req.body }, function( err, result ) {
            res.status( 200 );
            console.log( 'Updated the post with the id ' + ObjectId( req.params.id ) );
        });

        db.close();
    });

    res.redirect('/');
});

//Delete
app.delete( '/:id', function ( req, res ) {
    mongoClient.connect( uri, function ( err, db ) {
        var posts = db.collection( 'posts' );

        posts.deleteOne( { '_id' : ObjectId( req.params.id ) }, function ( err, result ) {
            res.status( 200 );
            console.log( 'Deleted the post with the id ' + ObjectId( req.params.id ) );
        });

        db.close();
    });

    res.redirect('/');
});

module.exports = app;