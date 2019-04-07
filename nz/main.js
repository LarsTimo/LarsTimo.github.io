const div= document.getElementById("map");
const breite = div.getAttribute("data-lat")
const laenge = div.getAttribute("data-long")
const titel = div.getAttribute("data-title")


//Karte initialisieren
let karte = L.map("map");

//Fügt kartenlayer von verschiedenen Quellen hinzu
const kartenLayer ={
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    subdomains : ["a","b","c"],
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
    subdomains:["a","b","c"],
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png", {
        subdomains:["a","b","c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png", {
        subdomains:["a","b","c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
    }),
    nztopo: L.tileLayer("http://tiles-a.data-cdn.linz.govt.nz/services;key=26e1ba2e828741d08151eb750f2c4457/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png", {
        subdomains:["a","b","c"],
        attribution: '<a href="https://www.topomap.co.nz/">NZ Topo Map</a> images sourced from <a href="https://www.linz.govt.nz/">LINZ</a>. '
    }),
    nzaerial: L.tileLayer("http://tiles-a.data-cdn.linz.govt.nz/services;key=26e1ba2e828741d08151eb750f2c4457/tiles/v4/set=4702/EPSG:3857/{z}/{x}/{y}.png", {
        subdomains:["a","b","c"],
        attribution: '<a href="https://www.linz.govt.nz/data/licensing-and-using-data/attributing-elevation-or-aerial-imagery-data">Sourced from LINZ. CC BY 4.0</a>'
    }),
};

kartenLayer.osm.addTo(karte)

//Auswahlmenü hinzufügen
L.control.layers({
    "Openstreetmap": kartenLayer.osm,
    "Stamen Toner":kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor,
    "NZ Topo": kartenLayer.nztopo,
    "NZ Aerial": kartenLayer.nzaerial
}).addTo(karte);

karte.setView(
    [breite,laenge],
    13
);

//Plugin (Leaflet.fullscreen) CDN: erzeugt Fullscreen Button
karte.addControl(new L.Control.Fullscreen());


//Positionsmarker

let pin= L.marker(
    [breite,laenge]
).addTo(karte);

//popup zum pin hängen
pin.bindPopup(titel).openPopup();

//Plugin (Leaflet Coordinates Control) css und js: zeigt Koordinatne bei Mausklick an
var coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function(e) {
	coords.setCoordinates(e);
});
