var lat;
var lng;
var alt;

function showMap() {
    // Initialize the platform object:
    var platform = new H.service.Platform({
        'apikey': 'FfSS_ot0PjvWLuhFH2Ztlydyeg8RV6Km5gxPbodwP4Y'
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
        document.getElementById('mapContainer'),
        maptypes.vector.normal.map, {
            zoom: 13, //Adjust for more wide
            center: {
                lng: lng + 0.03, // Adjust the latitude to move the map right
                lat: lat - 0.03 // Adjust the latitude to move the map down
            }
        }
    );

    var iconSize = new H.math.Size(30, 30); // Set the desired width and height
    var icon = new H.map.Icon('img/Thor-icon.png', { size: iconSize });
    var marker = new H.map.Marker({
        lat: lat, lng: lng
    }, {icon: icon});


    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);

    // Request hospitals near the user's location
    var service = platform.getSearchService();
    service.discover({
        at: lat + ',' + lng,
        q: 'hospital',
        limit: 3
    }, showHospitals, handleError);

    function showHospitals(result) {
        var locations = result.items;
        console.log("Hospitals:", locations);  // Log the hospitals to the console

        locations.forEach(function (location) {
            // Marker for hospitals

            var hospitalIconSize = new H.math.Size(30, 30); // Set the desired width and height for the hospital icon
            var hospitalIcon = new H.map.Icon('img/Captain-America-icon.png', { size: hospitalIconSize });
            var hospitalMarker = new H.map.Marker({
                lat: location.position.lat,
                lng: location.position.lng
            }, {
                icon: hospitalIcon
            });
            map.addObject(hospitalMarker);
        });
    }

    function handleError(error) {
        console.error('Error fetching hospitals:', error);
    }
}

function getPosition() {
    console.info("getPosition()");
    try {
        if (navigator.geolocation !== null) {
            //for high accuracy
            var options = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 0
            };

            function onSuccess(position) {
                var coordinates = position.coords;
                lat = coordinates.latitude;
                lng = coordinates.longitude;
                alt = coordinates.altitude;

                function showPosition() {
                    console.info("latitude: " + lat);
                    console.info("longitude: " + lng);
                    console.info("altitude: " + alt);
                }

                showPosition();
                showMap();
            }

            function onFail(error) {
                var msg = "";
                try {
                    if (error) {
                        switch (error.code) {
                            case error.TIMEOUT:
                                msg = "TIMEOUT: " + error.message;
                                break;
                            case error.PERMISSION_DENIED:
                                msg = "PERMISSION DENIED: " + error.message;
                                break;
                            case error.POSITION_UNAVAILABLE:
                                msg = "POSITION UNAVAILABLE: " + error.message;
                                break;
                            default:
                                msg = "UNHANDLED MESSAGE CODE (" + error.code + "): " + error.message;
                                break;
                        }
                        console.error(msg);
                    }
                } catch (e) {
                    console.error("Exception (geolocationError): " + e);
                }
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onFail, options);
        } else {
            console.error("HTML5 geolocation is not supported.");
        }
    } catch (e) {
        console.error("exception (getPosition): " + e);
    }
}