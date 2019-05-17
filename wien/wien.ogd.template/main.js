/* Wien OGD Beispiele */

let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    })
};

const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.bmapgrau.addTo(karte);

//Plugin fügt Fullscrenn Funktion hinzu
karte.addControl(new L.Control.Fullscreen());

karte.setView([48.208333, 16.373056], 12);

// die Implementierung der Karte startet hier

//Url für GeoJson Daten der Sehenswürdigkeiten (data.gv.at)
const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERPUNKTOGD&srsName=EPSG:4326&outputFormat=json"

//erzeugt Marker (Bild und Größe)
function makeMarker(feautre, latlng) {
    const bildIcon= L.icon({
                iconUrl: "http://www.data.wien.gv.at/icons/sehenswuerdigogd.svg",
                iconSize: [36, 36],
    });
    // Positioniert Marker und lädt zuvor erzeugten Marker(Bild und Größe)
    const marker = L.marker(latlng, {
            icon:bildIcon
    });
    //definiert en PopUp des Markers
    marker.bindPopup(`
        <h3>${feautre.properties.NAME}</h3>
        <p>${feautre.properties.BEMERKUNG}</p>
        <footer><a target="blank" href="${feautre.properties.WEITERE_INF}">Weblink</a></footer>

    `);
    return marker;
    }


async function loadSights(url) {
    const sightsClusterGruppe = L.markerClusterGroup();
    const response = await fetch(url);
    const sightsData = await response.json();
    const geoJson = L.geoJson(sightsData, {
        pointToLayer: makeMarker
        
    });
    //Plugin: Leaflet.markercluster. Clusterd Pins 
    sightsClusterGruppe.addLayer(geoJson)
    karte.addLayer(sightsClusterGruppe);
    //Fügt Auswahl hinzu ob Layeer angezeigt werden soll
    layerControl.addOverlay(sightsClusterGruppe, "Sehenswürdigkeiten");

    //Plugin: Leaflet Control Search.Fügt Suchfeld hinzu. Dabei wird GeoJson durchsucht
    const suchFeld = new L.Control.Search({
        layer: sightsClusterGruppe,
        propertyName: "NAME",
        zoom: 17,
        initial: false
    });
    
    suchFeld.addTo(karte)  //Alternativ: karte.addControl(suchFeld)
    
    
}
loadSights(url);

//Fügt Maßstab hinzu
const scale= L.control.scale({
    imperial: false,
    metric: true
    });
scale.addTo(karte);





//Url für GeoJson Daten der Spazierwege (data.gv.at)
const wege = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERLINIEOGD&srsName=EPSG:4326&outputFormat=json"

//erstellt Popup für Linien
function linienPopup(feature, layer){
    const popup =`
        <h3>${feature.properties.NAME}</h3>
        `;
        layer.bindPopup(popup)

}

async function loadWege (wege) {
    const antwort = await fetch(wege);
    const wegeData = await antwort.json();
    const wegeJson = L.geoJson(wegeData, {
        style: function () {
            return {
                color: "green"
            };
        },
        //öffnet oben erstelltes Linien-Popup
        onEachFeature: linienPopup
    });

        karte.addLayer(wegeJson);
        layerControl.addOverlay(wegeJson, "Spazierwege")

}
loadWege(wege);



// ###############WLAN###############################
//Url für GeoJson Daten der WLAN-Standorte (data.gv.at)
const wifi = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WLANWIENATOGD&srsName=EPSG:4326&outputFormat=json';

function makeWifi(feature, latlng) {
    const wifiIcon = L.icon({
        iconUrl: 'http://www.data.wien.gv.at/icons/wlanwienatogd.svg', //anderer Marker
        iconSize: [26, 26]
    });
    const wifiMarker = L.marker(latlng, {
        icon: wifiIcon
    });
    wifiMarker.bindPopup(`
        <h3>${feature.properties.NAME}</h3>
        <b> Adresse: </b> ${feature.properties.ADRESSE}        
        `); 
    return wifiMarker;
}

async function loadWifi(wifi) {
    const clusterGruppewifi = L.markerClusterGroup();
    const responsewifi = await fetch(wifi);
    const wifiData = await responsewifi.json();
    const geoJson = L.geoJson(wifiData, {
        pointToLayer: makeWifi
    });

    //Clustergruppe
    clusterGruppewifi.addLayer(geoJson);
    karte.addLayer(clusterGruppewifi);
    layerControl.addOverlay(clusterGruppewifi, "WLAN-Standorte");

    const suchFeld = new L.Control.Search({
        layer: clusterGruppewifi,
        propertyName: "NAME",
        zoom: 17,
        initial: false
    });
    
    
    suchFeld.addTo(karte)  //Alternativ: karte.addControl(suchFeld)
    karte.fitBounds(clusterGruppewifi.getBounds());

    new L.Control.MiniMap(
        L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        }), {
            zoomLevelOffset: -4,
            toggleDisplay: true
        }
    ).addTo(karte);

    
}



//Suchfeld Wifi
    // const suchFeldwifi = new L.Control.Search({
    //     layer: clusterGruppewifi,
    //     propertyName: "NAME",
    //     zoom: 17,
    //     initial: false,
    // });
    // karte.addControl(suchFeldwifi);


loadWifi(wifi);

    
   
     
    
