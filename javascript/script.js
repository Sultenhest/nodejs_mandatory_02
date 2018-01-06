(function( $ ) {
    'use strict';

    var jsonData = '';

    $.getJSON( $(location).attr('href') + 'posts/', function ( data ) {
        jsonData = data;
        $( '#loader' ).parent().hide();
        createDeck( jsonData );
    } ).fail( function() {
        $( '#loader' ).parent().hide();
        var element = {
            title: 'Sorry, we did not find anything..',
            body:  'Contact somebody if this keeps on happening..'
        };

        $( '#frontPagePosts' ).append(  cardWithBody( element ) );
    } );

    function createDeck( data ) {
        data.forEach( function ( element ) {
            $( '#frontPagePosts' ).append( cardNoBody( element ) );
        } );
    };

    function cardNoBody( element) {
        var html = '<div class="card fadeInUp pointer" data-id="' + element._id + '">';
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
                if( element._id != null ) {
                    html += '<p class="secondary">' + dateFromObjectId( element._id ) + '</p>';
                }
            html += '</div>';

            html += '<div class="card-body">';
                html += '<p>' + element.body + '</p>';
            html += '</div>';

            if( element._id != null ) {
                html += '<div class="card-footer">';
                    html += '<a href="/updatepost?id=' + element._id + '" class="btn btn-success">Edit</a>';
                    html += '<a href="/removepost?id=' + element._id + '" class="btn btn-danger">Delete</a>';
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

    // https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
    var getUrlParameter = function getUrlParameter(sParam) {
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
    };

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
})( jQuery );