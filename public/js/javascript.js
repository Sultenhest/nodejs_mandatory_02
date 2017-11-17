(function( $ ) {
    'use strict';

    $( document ).ready(function() {
        if ( location.pathname == '/' ) {
            $.getJSON( 'http://localhost:3000/posts', function ( data ) {
                data.forEach( function ( element ) {
                    $( '#frontPagePosts' ).append( element.body );
                } );
            } );
        }
    } );

})( jQuery );