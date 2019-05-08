
const div = document.getElementById("map");

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


//setzt Kartenausschnitt 
karte.setView(
    [47.2672222, 11.392778],
    13
);



//console.log(AWS);
const awsTirol=L.featureGroup();
L.geoJson(AWS)
    .bindPopup(function(layer){
        console.log("layer: ",layer);
        return `Name: ${layer.feature.properties.name} <br>
        Temperatur: ${layer.feature.properties.LT} °C<br>
        Schneehöhe: ${layer.feature.properties.HS} cm<br>
        Datum: ${layer.feature.properties.date}`;
    })
    .addTo(awsTirol)
awsTirol.addTo(karte);
karte.fitBounds(awsTirol.getBounds());

