const div = document.getElementById("map");

//Karte initialisieren
let karte = L.map("map");

//Fügt kartenlayer von verschiedenen Quellen hinzu
const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
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
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
    }),
};

//setzt OSM als standard auswahl
kartenLayer.geolandbasemap.addTo(karte)

//Auswahlmenü hinzufügen
const layerControl = L.control.layers({
    "Basemap": kartenLayer.geolandbasemap,
    "Basemap Grau": kartenLayer.bmapgrau,
    "Basemap Overlay": kartenLayer.bmapoverlay,
    "Basemap Gelände": kartenLayer.bmapgelaende,
    "Basemap HIDPI": kartenLayer.bmaphidpi,
    "Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "Openstreetmap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor,
}).addTo(karte);


//setzt Kartenausschnitt 
karte.setView(
    [47.2672222, 11.392778],
    13
);



//console.log(AWS);
async function loadStations() {
    //holt Werte von der Webseite aws.openweb und ordnete sie der Variable respons zu
    const response = await fetch("https://aws.openweb.cc/stations");
    //Variable response wird in json umgewandelt und der variable stations zugeordnet
    const stations = await response.json();
    const awsTirol = L.featureGroup();
    //Variable wird automaitsch geladen und Popups eingebunden
    L.geoJson(stations)
        .bindPopup(function (layer) {
            //Erzeugt aus Datuminformation ein Datumsobjoekt. Das wird unten in lokales Am PC voreingestelltes Format umgewandelt
            const date = new Date(layer.feature.properties.date);
            return ` <h1> ${layer.feature.properties.name} </h1><br>
            Seehöhe: ${layer.feature.geometry.coordinates[2]}m <br>
            Temperatur: ${layer.feature.properties.LT} °C<br>
            Windgeschwindigkeit (kmh): ${layer.feature.properties.WG ? layer.feature.properties.WG : "keine Daten"} <br>
            Schneehöhe (in cm): ${layer.feature.properties.HS ? layer.feature.properties.HS : "keine Daten"} <br>
            Neuschnee (48h; in cm): ${layer.feature.properties.HSD48 ? layer.feature.properties.HSD48 : "keine Daten"} <br>
            Datum: ${date.toLocaleDateString("de-AT")} <br>
            Uhrzeit: ${date.toLocaleTimeString("de-AT")};

            <hr>
            <footer> Land Tirol - <a href="https://data.tirol.gv.at">data.tirol.gv.at</a></footer>`;
        })
        .addTo(awsTirol)
    //awsTirol.addTo(karte);
    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");

    //Windrichtung anzeigen
    const windLayer = L.featureGroup();
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = "black";
                if (feature.properties.WG >20){
                color = "orange"
                }
                if (feature.properties.WG >30){
                    color = "red"
                    }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style= "color: ${color}; transform:rotate(${feature.properties.WR}deg)" class="fas fa-arrow-up fa-4x"></i>`   
                    })

                });

            }
        }
    }).addTo(windLayer);
    layerControl.addOverlay (windLayer, "Windrichtung")

       //Schneehöhe
       const snowLayer = L.featureGroup();
       const farbPalette= [
            [50, "red"],
            [100, "white"]
       ]
       L.geoJson(stations, {
           pointToLayer: function (feature, latlng) {
               if (feature.properties.HS) {
                   if (feature.properties.HS >= 0) {
                    let color = "blue";
                       for (let i=0; i<farbPalette.length; i++){
                           console.log(farbPalette[i])
                           
                           if (feature.properties.HS < farbPalette[i][0]){
                               color = farbPalette [i][1];
                               break;
                           }
                        }
                        
                       
                            
                        return L.marker(latlng, {
                            icon: L.divIcon({
                                html: `<div class="schneeLabel" style= "background-color: ${color}"> ${feature.properties.HS}</div>`  
                            })
        
                        });
                    }
               }
           }
       }).addTo(snowLayer);
       layerControl.addOverlay (snowLayer, "Schneehöhe")
       snowLayer.addTo(karte)


    
    
}
loadStations();