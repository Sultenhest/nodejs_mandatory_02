const mongoose    = require( 'mongoose' ),
      uri         = ( process.env.DB || require( './util/mongourl' ) );

mongoose.connect( uri );