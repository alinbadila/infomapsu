var map;
var browserSupportFlag = false;
var query;
var initialLocation;
var lat;
var lng;

window.onload = function showMap() {
	var mapOptions = {
		zoom: 14,
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
    setupGeolocation();
    setupSearchBox();
}

/** Tests if browser supports geolocation and sets the initialLocation variable**/
function setupGeolocation() {
	if (navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			map.setCenter(initialLocation);
		}, function() {
			handleNoGeolocation(browserSupportFlag);
		});
	} else {
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}

    //Set default location to Detasamentului de Pompieri Medias if browser has no geolocation

	function handleNoGeolocation(errorFlag) {
		if (errorFlag == true) {
			alert("Geolocation service failed.");
			lat = 46.161629;
			lng = 24.350302;
			initialLocation = new google.maps.LatLng(lat, lng);
		} else {
			alert("Your browser doesn't support geolocation.");
			lat = 46.161629;
			lng = 24.350302;
			initialLocation = new google.maps.LatLng(lat, lng);
		}
		map.setCenter(initialLocation);
	}
}

function setupSearchBox() {
/** Autocomplete in search box**/
	//Get the id of the search box and setup autocomplete
	var searchBox = new google.maps.places.SearchBox(document.getElementById("pac-input"));
	// Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var place = searchBox.getPlaces()[0];
        if (!place.geometry) return;
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(14);
        }
    });
    $('.searchdiv').hide();
}
