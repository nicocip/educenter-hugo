window.marker = null;

function initialize() {
  var map;
  var latitude = $('#map_canvas').attr('data-latitude');
  var longitude = $('#map_canvas').attr('data-longitude');
  var mapMarker = $('#map_canvas').attr('data-marker');
  var mapMarkerName = $('#map_canvas').attr('data-marker-name');
  var tramelan = new google.maps.LatLng(latitude, longitude);
  var style = [{
      "featureType": "landscape",
      "stylers": [{
          "hue": "#FFAD00"
        },
        {
          "saturation": 50.2
        },
        {
          "lightness": -34.8
        },
        {
          "gamma": 1
        }
      ]
    },
    {
      "featureType": "road.highway",
      "stylers": [{
          "hue": "#FFAD00"
        },
        {
          "saturation": -19.8
        },
        {
          "lightness": -1.8
        },
        {
          "gamma": 1
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "stylers": [{
          "hue": "#FFAD00"
        },
        {
          "saturation": 72.4
        },
        {
          "lightness": -32.6
        },
        {
          "gamma": 1
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [{
          "hue": "#FFAD00"
        },
        {
          "saturation": 74.4
        },
        {
          "lightness": -18
        },
        {
          "gamma": 1
        }
      ]
    },
    {
      "featureType": "water",
      "stylers": [{
          "hue": "#00FFA6"
        },
        {
          "saturation": -63.2
        },
        {
          "lightness": 38
        },
        {
          "gamma": 1
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [{
          "hue": "#FFC300"
        },
        {
          "saturation": 54.2
        },
        {
          "lightness": -14.4
        },
        {
          "gamma": 1
        }
      ]
    }
  ];
  var mapOptions = {
    center: tramelan,
    mapTypeId: "OSM",
    backgroundColor: "#000",
    zoom: 15,
    panControl: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE
    }
  }
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  var mapType = new google.maps.ImageMapType({
    name: "OpenStreetMap",
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 18,
    getTileUrl: function(coord, zoom) {
        // "Wrap" x (longitude) at 180th meridian properly
        // NB: Don't touch coord.x: because coord param is by reference, and changing its x property breaks something in Google's lib
        var tilesPerGlobe = 1 << zoom;
        var x = coord.x % tilesPerGlobe;
        if (x < 0) {
            x = tilesPerGlobe+x;
        }
        // Wrap y (latitude) in a like manner if you want to enable vertical infinite scrolling

        return "https://tile.openstreetmap.org/" + zoom + "/" + x + "/" + coord.y + ".png";
    }
  });
  map.mapTypes.set('OSM', mapType);
  map.setMapTypeId('OSM');
  var marker_image = mapMarker;
  var pinIcon = new google.maps.MarkerImage(marker_image, null, null, null, new google.maps.Size(37, 55));
  marker = new google.maps.Marker({
    position: tramelan,
    map: map,
    icon: pinIcon,
    title: mapMarkerName
  });
}
var map = document.getElementById('map_canvas');
if (map != null) {
  google.maps.event.addDomListener(window, 'load', initialize);
}