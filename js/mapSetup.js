var map;
window.onload = function() {
  var options = {
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

  map = new google.maps.Map(document.getElementById("map"), options)
}
