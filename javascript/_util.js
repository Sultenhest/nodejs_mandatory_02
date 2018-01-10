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

// https://developers.google.com/maps/documentation/javascript/adding-a-google-map
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