mapboxgl.accessToken = 'pk.eyJ1IjoiZGVhdGhvb2siLCJhIjoiY2twbnU0c3VkMDV6eTJvbndvaDIzcDJyOCJ9.eMNa5szszsgUCiomHii1qg';

// geolocation API
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation(){
    setupMap([28.6139, 77.2090]);
}

function setupMap(center) {
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 14
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    });

    map.addControl(directions, 'top-left');

}