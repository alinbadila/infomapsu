var map;
var browserSupportFlag = false;
var query;
var initialLocation;
var lat;
var lng;

function showMap() {
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
	if (navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			map.setCenter(initialLocation);
			query = "ST_DISTANCE('Coordonate', LATLNG(" + lat + "," + lng + "))";
		}, function() {
			handleNoGeolocation(browserSupportFlag);
		});
	} else {
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}
/**
   Daca nu se poate stabili locatia, harta se centreaza pe sediul Detasamentului de Pompieri Medias
**/
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
		query = "\"ST_DISTANCE('Coordonate', LATLNG(" + lat + "," + lng + "))\"";
	}
}
$(document).ready(showMap());