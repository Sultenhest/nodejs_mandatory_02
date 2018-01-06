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