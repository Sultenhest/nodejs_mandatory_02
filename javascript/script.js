$( function() {
    'use strict';

    var rootURL          = window.location.protocol + '//' + window.location.host,
        pathName         = top.location.pathname,
        jsonData         = '',
        apiFailElement   = { 'title': 'Sorry, we did not find anything..',
                             'body':  'Contact somebody if this keeps on happening..' },
        fetchingElement  = { 'title': 'Fetching Data',
                             'body':  '<img src="imgs/loader.gif" alt="Loading..." id="loader">' },
        noResultsElement = { 'title': 'No results.',
                             'body':  'Sorry, but we couldn\'t find anything matching the search string.<br>Press the X or type something else.' };

    if ( pathName === '/' ) {
        $.getJSON( rootURL + '/posts/', function ( data ) {
            jsonData = data;
            createDeck( jsonData );
        } ).fail( function() {
            $( '#main-deck' ).append( cardWithBody( apiFailElement ) );
        } ).always( function() {
            $( '#loader' ).parent().hide();
        } );
    } else if ( pathName === '/form' ) {
        var id   = getUrlParameter( 'id' ),
            type = getUrlParameter( 'type' );

        $( '#form' ).hide();

        if ( type === 'update' ) {
            $( '#form-header' ).prepend( 'Update ' );
            $( '#form' ).attr('action', '/posts/' + id + '?_method=put');
        } else if ( type === 'delete' ) {
            $( '#form-header' ).prepend( 'Delete ' );
            $( '#form' ).attr('action', '/posts/' + id + '?_method=delete');
        } else {
            $( '#form-header' ).prepend( 'Create ' );
            $( '#form' ).attr('action', '/posts');
        }

        if ( id != null ) {
            $.getJSON( rootURL + '/posts/' + id, function ( element ) {
                $( '#title' ).val( element.title );
                $( '#body' ).val( element.body );

                if ( type === 'update' ) {
                    $( '#submit' ).attr( 'value', 'Edit' );
                } else if ( type === 'delete' ) {
                    $( '#title, #body' ).prop( 'disabled', true );
                    $( '#submit' ).removeClass( 'btn-success' ).addClass( 'btn-danger' ).attr( 'value', 'Delete' );
                }
            } );
        }

        $( '#loader' ).hide();
        $( '#form' ).show();
    }

    $( '#main-deck' ).on( 'click', '.card', function () {
        var postId  = $( this ).attr( 'data-id' );

        $( '.modal' ).empty().append( cardWithBody( fetchingElement ) );
        $( '#modal-overlay' ).show();

        $.getJSON( rootURL + '/posts/' + postId, function ( data ) {
            $( '.modal' ).empty().append( cardWithBody( data ) );
        } );

        $( '.modal-close' ).click( function() {
            $( '#modal-overlay' ).hide();
        } );
    } );
    
    $( '#search-field' ).keyup( function() {
        var searchInput = $( this ).val().toLowerCase();

        $( '#clear-search-field' ).removeClass( 'disabled' );
        $( '#main-deck' ).empty();

        $( '#clear-search-field' ).click( function() {
            $( this ).addClass( 'disabled' );
            $( '#search-field' ).val( '' );
            $( '#main-deck' ).empty();
            createDeck( jsonData );
        } );

        if ( searchInput == '' ) {
            $( '#clear-search-field' ).addClass( 'disabled' );
        }

        jsonData.forEach( function ( element ) {
            if( element.title.toLowerCase().indexOf( searchInput ) >= 0 ||
                element.body.toLowerCase().indexOf( searchInput )  >= 0 ) {
                $( '#main-deck' ).append( cardNoBody( element ) );
            }
        } );

        if ( $( '#main-deck' ).is( ':empty' ) ) {
            $( '#main-deck' ).append( cardWithBody( noResultsElement ) );
        }
    } );
} );