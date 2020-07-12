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
        let worldTotal

        let latitude = res.countryInfo.lat;
        let longitude = res.countryInfo.long;
        let flag = res.countryInfo.flag;
        let cases = res.cases;
        let activeCases = res.active;
        let country = res.country;
        let population = res.population;
        let totalDeath = res.deaths;
        let dailyCases = res.todayCases;
        let dailyDeath = res.todayDeaths;
        let toalRecovered = res.recovered;
        let dialyRecovered = res.todayRecovered;
        let critical = res.critical;
        let CasesPerOneMillion = res.casesPerOneMillion;
        let DeathsPerOneMillion = res.deathsPerOneMillion;
        let test = res.tests;
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
                maxWidth: 200,
                maxHeight:200
            })
            .setHTML('<h2>' + marker.properties.title + '</h2> <h3>' + marker.properties.description + '</h3>'))
            .addTo(map);
        })
        //tabel
        let table = document.querySelector('.country-data');
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);
        var cell11 = row.insertCell(10);
        var cell12 = row.insertCell(11);

        cell1.innerHTML = country;
        cell2.innerHTML = population;
        cell3.innerHTML = cases;
        cell4.innerHTML = activeCases;
        cell6.innerHTML = totalDeath;
        cell5.innerHTML = "+"+dailyCases;
        cell7.innerHTML = "+"+dailyDeath;
        cell9.innerHTML = toalRecovered;
        cell8.innerHTML = critical;
        cell10.innerHTML = CasesPerOneMillion;
        cell11.innerHTML = DeathsPerOneMillion;
        cell12.innerHTML = test;
        
      
        

        if(cell7.innerHTML != "+0"){
          cell7.style.backgroundColor = 'rgb(223, 65, 91)';
        }
        if(cell5.innerHTML != "+0"){
          cell5.style.backgroundColor = 'rgb(89, 235, 89)';
        }
    });  
});

let theme = document.querySelector("#theme");


function change(style){
  theme.href = style;
  localStorage.setItem('theme', style);
}
let getTheme = localStorage.getItem('theme');
if(getTheme === null){
  change('style.css');
}else{
  change(getTheme);
}
