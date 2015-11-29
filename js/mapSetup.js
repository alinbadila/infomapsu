var map;
var browserSupportFlag = new Boolean();
var query;
var initialLocation;
var lat;
var lng;

window.onload = function() {
  var mapOptions = {
    zoom:14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    draggableCursor: 'auto',
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    scaleControl: true
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  $(document).ready(function() {
    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            map.setCenter(initialLocation);
            query = "ST_DISTANCE('Coordonate', LATLNG(" + lat + "," + lng + "))";
        }, function () {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    // Browser doesn't support Geolocation
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }

    function handleNoGeolocation(errorFlag) {
        if (errorFlag == true) {
            alert("Geolocation service failed.");
            lat = 44.55;
            lng = 25.75;
            initialLocation = new google.maps.LatLng(lat, lng);
        } else {
            alert("Your browser doesn't support geolocation.");
            lat = 44.424911; //ISUBIF
            lng = 26.102528;
            initialLocation = new google.maps.LatLng(lat, lng);
        }
            map.setCenter(initialLocation);
            query = "\"ST_DISTANCE('Coordonate', LATLNG(" + lat + "," + lng + "))\"";
        }
  });

}
