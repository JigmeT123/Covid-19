mapboxgl.accessToken = 'pk.eyJ1IjoiamlnbWUiLCJhIjoiY2tjOTM5a3EzMWhkMjJ5bWc0ZjRrazA4NyJ9.7gVQ-PWLYFWm7RSNcqj0gg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
    center: [0, 0], // starting position [lng, lat]
    minZoom: 1.2,
    zoom: 1,
    attributionControl: false // starting zoom
});

  var nav = new mapboxgl.NavigationControl({
    visualizePitch: true
  });
map.addControl(nav, 'top-left');

let url = "https://corona.lmao.ninja/v2/countries?&sort";

async function fetchCoronaData() {
    try {
        let response = await fetch(url);
        let json = await response.json();
        return json;
    } catch (error) {
        console.log('There is an error while catching the data');
    }
}
fetchCoronaData().then(result => {
    console.log(result);
    result.forEach(res => {
        let latitude = res.countryInfo.lat;
        let longitude = res.countryInfo.long;
        let flag = res.countryInfo.flag;
        let cases = res.cases;
        let activeCases = res.active;
        let country = res.country;
        //default marker;
        // var marker = new mapboxgl.Marker({     color: '#ff00ff',     size: 1 })
        // .setLngLat([ longitude, latitude])   .addTo(map)   .setPopup(new
        // mapboxgl.Popup({     closeOnMove: true   })   .setHTML(`<p>${country} has
        // ${activeCases} number of active cases</p>`));
        
        var geojson = {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [longitude, latitude]
              },
              properties: {
                title: country,
                description: `<br><img src="${flag}"> <br>Total Cases: ${cases} <br> active cases: ${activeCases}<br>`,
              }
            }]
          };
        
        geojson.features.forEach(marker =>{
            var el = document.createElement('div');
            el.className = 'marker';
            
        if(cases > 50000){
            el.style.backgroundColor = '#ff006f9f';
            el.style.border = '#ff006e'
        };
            new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ 
                offset: 25,
                maxWidth: 500,
                maxHeight: 500
            })
            .setHTML('<h2>' + marker.properties.title + '</h2> <h3>' + marker.properties.description + '</h3>'))
            .addTo(map);
        })
        
    });
    
});

