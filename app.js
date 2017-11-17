const port    = (process.env.PORT || 3000),
      express = require( 'express' ),
      app     = express();

app.use( express.static( 'public' ) );

/********************
 * POSTS
 *******************/
var PostsController = require( './controllers/PostsController' );
app.use( '/posts', PostsController );

/********************
 * PAGE ROUTES
 *******************/
var routes = require( './routes.js' );
app.use( '/', routes );

app.listen( port, function () {
    console.log( 'Express server listening on port ' + port );
} );