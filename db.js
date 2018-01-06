const mongoClient = require( 'mongodb' ).MongoClient,
      mongoose    = require( 'mongoose' ),
      uri         = ( process.env.DB || require( './util/mongourl' ) );

mongoClient.connect( uri );
mongoose.connect( uri );