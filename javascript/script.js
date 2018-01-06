(function( $ ) {
    'use strict';

    var jsonData = '';

    if ( top.location.pathname === '/' ) {
        $.getJSON( $( location ).attr( 'href' ) + 'posts/', function ( data ) {
            jsonData = data;
            $( '#loader' ).parent().hide();
            createDeck( jsonData );
        } ).fail( function() {
            $( '#loader' ).parent().hide();
            var element = {
                title: 'Sorry, we did not find anything..',
                body:  'Contact somebody if this keeps on happening..'
            };

            $( '#frontPagePosts' ).append( cardWithBody( element ) );
        } );
    }

    $( document ).ready(function() {
        $( '#frontPagePosts' ).on( 'click', '.card', function () {
            $( '#overlay-container' ).empty();
            var postId = $( this ).attr( 'data-id' );
            $( '#overlay' ).show();

            var element = {
                title: 'Fetching Data',
                body:  '<img src="imgs/loader.gif" alt="Loading..." id="loader">'
            };
            $( '#overlay-container' ).append( cardWithBody( element ) );

            $.getJSON( $(location).attr('href') + 'posts/' + postId, function ( data ) {
                $( '#overlay-container' ).empty();
                $( '#overlay-container' ).append( cardWithBody( data ) );
            } );
        } );

        $( '#overlay' ).click( function() {
            $( '#overlay-container' ).empty();
            $( this ).hide();
        } );

        $( '#search-field' ).keyup( function() {
            $( '#clear-search-field' ).removeClass( 'disabled' );
            $( '#frontPagePosts' ).empty();

            $( '#clear-search-field' ).click( function() {
                $( this ).addClass( 'disabled' );
                $( '#search-field' ).val( '' );
                $( '#frontPagePosts' ).empty();
                createDeck( jsonData );
            } );

            var input = $( this ).val().toLowerCase();

            if( input == '' ) {
                $( '#clear-search-field' ).addClass( 'disabled' );
            }

            jsonData.forEach( function ( element ) {
                if( element.title.toLowerCase().indexOf( input ) >= 0 ||
                    element.body.toLowerCase().indexOf( input )  >= 0 ) {
                    $( '#frontPagePosts' ).append( cardNoBody( element ) );
                }
            } );

            if( $( '#frontPagePosts' ).is(':empty') ) {
                var element = {
                    title: 'No results.',
                    body:  'Sorry, but we couldn\'t find anything matching the search string \"' + input + '\".'
                };
                $( '#frontPagePosts' ).append( cardWithBody( element ) );
            }
        } );
    } );
} )( jQuery );