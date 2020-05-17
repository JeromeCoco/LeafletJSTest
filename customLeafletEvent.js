( function() {

	var app = {
        LeafletMap: function(mapElementID,mapSetViewCoordinates,accesToken,response) {
            // Initialize coordinates
            var mymap = L.map(mapElementID).setView(mapSetViewCoordinates, 13);

            // Add mapbox as tile image source
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+accesToken, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoiamVyb21jb2NvMSIsImEiOiJja2Fha3dvOXUwaDVpMnlydWd2MHgwNXhlIn0.2aU0z7Q2rX7dny0e9k7O1A'
            }).addTo(mymap);

            var pin_locations = Object.keys(response);
            for (var pin_location_item = 0; pin_location_item < pin_locations.length; pin_location_item++) {
                var location_item_key = pin_locations[pin_location_item],
                    pin_item = response[location_item_key],
                    pin_item_coordinates = pin_item[0],
                    pin_item_page_link = pin_item[1];

                // Add marker on map with alt attribute
                var marker = L.marker(pin_item_coordinates, {
                    alt: pin_item_page_link,
                }).addTo(mymap);
            }
        },
        initMarkerEvent: function() {
            // Select all markers
            var $marker = jQuery('.leaflet-pane.leaflet-marker-pane img');

            // Add event on each marker
            $marker.each(function() {
                jQuery(this).click(function() {
                    // Get alt attribute value
                    var page_redirect = jQuery(this).attr('alt');

                    // Redirect
                    window.open(page_redirect);
                })
            });
        }
	}
	
	jQuery(document).ready( function() {
        var mapElementID = 'map',
        mapView = [51.505, -0.09],
        access_token = 'pk.eyJ1IjoiamVyb21jb2NvMSIsImEiOiJja2Fha3dvOXUwaDVpMnlydWd2MHgwNXhlIn0.2aU0z7Q2rX7dny0e9k7O1A'; // Generate new access token on https://account.mapbox.com/access-tokens/

        // bogus JSON response
        var response = {
            location1: [
                [51.5, -0.09],
                'https://en.wikipedia.org/wiki/GKT_School_of_Medical_Education',
            ],
            location2: [
                [51.51, -0.09],
                'https://en.wikipedia.org/wiki/London',
            ],
        };

        // LeafletMap(mapElementID,mapSetViewCoordinates,accesToken,response)
        app.LeafletMap(mapElementID, mapView, access_token, response);

        app.initMarkerEvent();
	});
})();