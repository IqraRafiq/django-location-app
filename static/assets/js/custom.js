// Initialize and add the map
function initAutocomplete() {
    console.log('hello');
    navigator.geolocation.getCurrentPosition(function(response) {
        //html ids
        console.log(response);
        var card = document.getElementById('pac-card');
        var input = document.getElementById('address');
        console.log(response.coords.latitude);
        var mapOptions = {
            center: new google.maps.LatLng(response.coords.latitude, response.coords.longitude),
            zoom: 8,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            fullscreenControl: false
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
        autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);


        var marker = new google.maps.Marker({ map: map, position: map.getCenter() });
        marker.bindTo('position', map, 'center');

        // here's working

        var infowindow = new google.maps.InfoWindow();
        autocomplete.addListener('place_changed', function() {
            infowindow.close();
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
                $('#pac-latlng').val(marker.getPosition().lat() + ',' + marker.getPosition().lng());
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17); // Why 17? Because it looks good.
            }

        });
        drag(map, marker);
    });

}








function drag(map, marker) {
    var geocoder = new google.maps.Geocoder();
    google.maps.event.addListener(map, 'dragend', function() {
        geocoder.geocode({
            'latLng': marker.getPosition()
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    $('#pac-latlng').val(marker.getPosition().lat() + ',' + marker.getPosition().lng());
                    $('#address').val(results[0].formatted_address);
                }
            }
        });
    });

}