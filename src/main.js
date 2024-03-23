function handleFileUpload() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];

    Papa.parse(file, {
        complete: function(results) {
            const data = results.data; // Processed CSV data
            displayDataOnMap(data);
        },
        header: true // Assumes the first row of your CSV are headers
    });
}

function displayDataOnMap(data) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2ZXlub3YiLCJhIjoiY2xrajh3ZXVhMDJyazNlbnRuYWZmZWwzaSJ9.hh5Hk6_pBV84NEUVNPvMXQ'; 
    var map = new mapboxgl.Map({
        container: 'map', // The ID of the map container
        style: 'mapbox://styles/mapbox/streets-v11', // The map style to use
        center: [-77.9447, 34.2257], // Center the map on Wilmington, NC
        zoom: 10 // Adjust zoom level based on your needs
    });

    var geocoder = new google.maps.Geocoder();
    var count = 0
    data.forEach(row => {
        if (row.ADDRESS && row['WEEKLY FEE']) {
            count += 1
            console.log(count)
            const address = row.ADDRESS;
            const color = row['WEEKLY FEE'] === '$0.00' ? 'grey' : 'red';
            geocoder.geocode({ 'address': address }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();

                    // Add the marker to the Mapbox map
                    new mapboxgl.Marker({ color: color })
                        .setLngLat([longitude, latitude])
                        .addTo(map);
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    });
}
