// https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function initMap() {
    var kea    = {
        lat: 55.70394599999999,
        lng: 12.53749300000004 };
    var map    = new google.maps.Map( document.getElementById( 'map' ), {
        zoom:   10,
        center: kea } );
    var marker = new google.maps.Marker( {
        position: kea,
        map:      map } );
}
function createDeck( data ) {
    data.forEach( function ( element ) {
        $( '#main-deck' ).append( cardNoBody( element ) );
    } );
};

function cardNoBody( element ) {
    var html = '<div class="card fadeInUp pointer clickable" data-id="' + element._id + '">';
            html += '<div class="card-header">';
                html += '<i class="fa fa-angle-right fa-3x" aria-hidden="true"></i>';
                html += '<h3>' + element.title + '</h3>';
                html += '<p class="secondary">' + dateFromObjectId( element._id ) + '</p>';
            html += '</div>';
        html += '</div>';
    return html;
};

function cardWithBody( element ) {
    var html = '<div class="card">';
        html += '<div class="card-header">';
            html += '<h3>' + element.title + '</h3>';
            if ( element._id != null ) {
                html += '<p class="secondary">' + dateFromObjectId( element._id ) + '</p>';
            }
        html += '</div>';

        html += '<div class="card-body">';
            html += '<p>' + element.body + '</p>';
        html += '</div>';

        if ( element._id != null ) {
            html += '<div class="card-footer">';
                html += '<a href="/form?id=' + element._id + '&type=update" class="btn btn-success">Edit</a>';
                html += '<a href="/form?id=' + element._id + '&type=delete" class="btn btn-danger">Delete</a>';
            html += '</div>';
        }
    html += '</div>';

    return html;
};

function dateFromObjectId( objectId ) {
    var dateObject = new Date( parseInt( objectId.substring( 0, 8 ), 16 ) * 1000 );
    var month = [ 'January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December' ];

    var str = month[ dateObject.getMonth() ] + ' ';
        str += dateObject.getDate() + ' ';
        str += dateObject.getFullYear() + ', ';
        str += addLeadingZero( dateObject.getHours() ) + ':';
        str += addLeadingZero( dateObject.getMinutes() ) + ':';
        str += addLeadingZero( dateObject.getSeconds() );

    return str;
};

function addLeadingZero( number ) {
    if( number.toString().length == 1 ) {
        number = '0' + number;
    }

    return number;
};
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
                             'body':  'Sorry, but we couldn\'t find anything matching the search string.<br>Press the <i class="fa fa-times" aria-hidden="true"></i> or type something else.' };

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

    $( '#main-deck' ).on( 'click', '.clickable', function () {
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

        jsonData.forEach( function ( element ) {
            if ( element.title.toLowerCase().indexOf( searchInput ) >= 0 ) {
                $( '#main-deck' ).append( cardNoBody( element ) );
            }
        } );

        if ( $( '#main-deck' ).is( ':empty' ) ) {
            $( '#main-deck' ).append( cardWithBody( noResultsElement ) );
        }

        $( '#clear-search-field' ).click( function() {
            $( this ).addClass( 'disabled' );
            $( '#search-field' ).val( '' );
            $( '#main-deck' ).empty();
            createDeck( jsonData );
        } );

        if ( searchInput == '' ) {
            $( '#clear-search-field' ).addClass( 'disabled' );
        }
    } );
} );