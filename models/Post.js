const mongoose = require( 'mongoose' ),
      schema   = mongoose.Schema;

var Post = new schema( {
    title: { type: String, required: true },
    body:  { type: String, required: true }
} );

mongoose.model( 'Post', Post );

module.exports = mongoose.model( 'Post' );