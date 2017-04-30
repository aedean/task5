      var map, infoWindow, directionsService, directionsDisplay, service;
      var pos;
      function initMap() {
       directionsService = new google.maps.DirectionsService;
       directionsDisplay = new google.maps.DirectionsRenderer;
       var shrewsbury = new google.maps.LatLng(52.711178, -2.756441);	  

        map = new google.maps.Map(document.getElementById('map'), {
          center: shrewsbury,
          zoom: 10
        });
	      
        directionsDisplay.setMap(map);

        infoWindow = new google.maps.InfoWindow; //pop up window
		  
//Get GEOLOCATION
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
			  calculateAndDisplayRoute(directionsService, directionsDisplay);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
	      		const placeRequest = {
			location: shrewsbury,
			radius: '500',
			query: 'petrol station'
		};
	      //check
		  console.log(map);
		  service = new google.maps.places.PlacesService(map);
                  service.textSearch(request, callback);
	  } //end of initmap function

      function callback(results, status) {
		  if(status == google.maps.places.PlaceServiceStatus.OK){
			  for (var i = 0; i < results.length; i++){
				  var place = results[i];
				  createMarker(results[i]);
			  }
		  }
	  }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
//route function
      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: pos,
          destination: {lat: 52.711178, lng: -2.756441},
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

console.log("here");
