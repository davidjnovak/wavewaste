import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";

export function handleFileUpload() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    const collectionRef = collection(db, "yourCollectionName"); // Define the collection reference

    Papa.parse(file, {
        complete: function(results) {
          const data = results.data; // Processed CSV data
          data.forEach(row => {
            addDoc(collectionRef, row)
              .then(docRef => console.log("Document written with ID:", docRef.id))
              .catch(error => console.error("Error adding document:", error));
          });
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
    data.forEach(row => {
        if (row.ADDRESS && row['WEEKLY FEE']) {
            const address = row.ADDRESS;
            const fee = row['WEEKLY FEE'];
            const pinSVG = fee === '$0' ? document.getElementById('grey-pin-svg').innerHTML : document.getElementById('red-pin-svg').innerHTML;

            // Create a custom marker element
            var el = document.createElement('div');
            el.innerHTML = pinSVG;
            // el.firstChild.setAttribute("style", "width: 24px; height: 24px;"); // Set size of SVG

            geocoder.geocode({ 'address': address }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();

                    // Add the marker to the Mapbox map
                    new mapboxgl.Marker(el)
                    .setLngLat([longitude, latitude])
                    .addTo(map);
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
        else {
            console.log("row missing data:")
            console.log(row)
        }
    });
}
