var map, 
    infoWindow, 
    directionsService, 
    directionsDisplay, 
    service,
    pos;

function initMap() {
       directionsService = new google.maps.DirectionsService;
       directionsDisplay = new google.maps.DirectionsRenderer;	  
       
         var shrewsbury = {lat: 52.711178, lng: -2.756441};	

        map = new google.maps.Map(document.getElementById('map'), {
          center: shrewsbury,
          zoom: 15
        });

        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
		  	      service = new google.maps.places.PlacesService(map);
	              service.nearbySearch({
	      		  location: pos,
	      		  radius: 500,
		      	  type: ['petrol station']
	     		  }, callback);  
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
          var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: iconBase + 'parking_lot_maps.png'    
        });
          

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
