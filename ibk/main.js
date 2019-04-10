//alert("Hallo Welt!");

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat1")
const laenge1 = div.getAttribute("data-long1")
const titel1 = div.getAttribute("data-title1")



//Karte initialisieren
let karte = L.map("map");

//Fügt kartenlayer von verschiedenen Quellen hinzu
const kartenLayer ={
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    subdomains : ["a","b","c"],
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains:["maps", "maps1", "maps2","maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains:["maps", "maps1", "maps2","maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains:["maps", "maps1", "maps2","maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains:["maps", "maps1", "maps2","maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains:["maps", "maps1", "maps2","maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains:["maps", "maps1", "maps2","maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains:["maps", "maps1", "maps2","maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
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
};

//setzt OSM als standard auswahl
kartenLayer.osm.addTo(karte)

//Auswahlmenü hinzufügen
L.control.layers({
    "Basemap": kartenLayer.geolandbasemap,
    "Basemap Grau": kartenLayer.bmapgrau,
    "Basemap Overlay": kartenLayer.bmapoverlay,
    "Basemap Gelände": kartenLayer.bmapgelaende,
    "Basemap HIDPI": kartenLayer.bmaphidpi,
    "Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "Openstreetmap": kartenLayer.osm,
    "Stamen Toner":kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor,
}).addTo(karte);


/*//setzt Kartenausschnitt 
karte.setView(
    [breite1,laenge1],
    13
);
*/

//setzt karte auf aktuelle Geolocation
karte.locate({
    setView: true,
    maxZoom: 16
});

//setzt Popup an der Stelle, wo die geolocation ist und setzt Kreis um Marker mit Genauigkei
karte.on("locationfound", function(event){
    console.log(event);
    L.marker([
        event.latitude, event.longitude
        ]).addTo(karte);

    L.circle([
        event.latitude, event.longitude], 
        {radius: event.accuracy/2
        }).addTo(karte);
})



//Plugin (Leaflet.fullscreen) CDN: erzeugt Fullscreen Button
karte.addControl(new L.Control.Fullscreen());


//Plugin (Leaflet Coordinates Control) css und js: zeigt Koordinatne bei Mausklick an
var coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function(e) {
	coords.setCoordinates(e);
});


//Plugin (leaflet-hash) CDN:Fügt Koordinaten zu HTML Link hinzu
var hash = new L.Hash(karte);

