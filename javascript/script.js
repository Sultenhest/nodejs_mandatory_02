(function( $ ) {
    'use strict';

    $( document ).ready(function() {

        $.getJSON( $(location).attr('href') + 'posts/', function ( data ) {
            $( '#loader' ).parent().hide();
            createDeck( data );
        } );

        function createDeck( data ) {
            data.forEach( function ( element ) {
                $( '#frontPagePosts' ).append( card( element ) );
            } );
        };

        function card( element ) {
            var html = '';
                html += '<div class="card">';
                    html += '<div class="card-header">';
                        html += '<h3>' + element.title + '</h3>';
                        html += '<p class="secondary">' + dateFromObjectId( element._id ) + '</p>';
                    html += '</div>';

                    html += '<div class="card-body">';
                        html += '<p>' + element.body + '</p>';
                    html += '</div>';
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
        }
    } );

})( jQuery );