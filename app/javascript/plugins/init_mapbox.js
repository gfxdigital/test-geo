import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


const mapElement = document.getElementById('map');
//FIND map id on DOM

//BUILD the map with API KEY and style from MAPBOX
const buildMap = () => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/apires89/cjsmd27yq61cu1fpflwa6jeiv'
  });
};

//GET Markers info from Map and add it to MAPBOX as MAPBOX MARKERs
const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
    //add info window
    //add custom marker
      const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.width = '25px';
      element.style.height = '25px';
    new mapboxgl.Marker(element)
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup) //add info window
      .addTo(map);
  });
};

//FIT Map to Markers

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};

//Make it all work together with markers and map build then export
const initMapbox = () => {
  if (mapElement) {
    const map = buildMap();
    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken }));
    const markers = JSON.parse(mapElement.dataset.markers);
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };
