(function( $ ) {
    'use strict';

    $( document ).ready(function() {
        if ( location.pathname == '/' ) {
            $.getJSON( 'https://mighty-everglades-82893.herokuapp.com/posts', function ( data ) {
                data.forEach( function ( element ) {
                    $( '#frontPagePosts' ).append( element.body );
                } );
            } );
        }
    } );

})( jQuery );