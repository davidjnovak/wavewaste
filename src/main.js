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
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // Map style
        zoom: 10 // Adjust based on your preference
    });

    data.forEach(row => {
        console.log(row)
        if (row.ADDRESS && row['WEEKLY FEE']) {
            const color = row['WEEKLY FEE'] === '$0' ? 'grey' : 'red';
            console.log(color)
            // Here you would geocode the address to get latitude and longitude
            // For demonstration, let's assume we have lat and lng variables

            new mapboxgl.Marker({ color: color })
                .setLngLat([lng, lat])
                .addTo(map);
        }
    });
}
 