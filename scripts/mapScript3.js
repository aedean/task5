      var map, infoWindow, directionsService, directionsDisplay, service;
      var pos;
      function initMap() {
       directionsService = new google.maps.DirectionsService;
       directionsDisplay = new google.maps.DirectionsRenderer;
       var shrewsbury = {lat: 52.711178, lng: -2.756441};	  

        map = new google.maps.Map(document.getElementById('map'), {
          center: shrewsbury,
          zoom: 10
        });
        


        infoWindow = new google.maps.InfoWindow; //pop up window
        
//Markers
	      service = new google.maps.places.PlacesService(map);
	      service.nearbySearch({
	      		location: shrewsbury,
	      		radius: 500,
		      	type: ['petrol station']
	     		}, callback);
		 
          
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
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
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
