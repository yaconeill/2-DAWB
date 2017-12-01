var subjects = require('../json/EstructMovilidadesErasmusJSON');

















function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(52.5840664,31.0702264,14),
        zoom: 4,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}