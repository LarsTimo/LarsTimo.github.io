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
                if (feature.properties.WG > 10) {
                    color = "orange"
                }
                if (feature.properties.WG > 20) {
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
    layerControl.addOverlay(windLayer, "Windrichtung")

    // Temperaturlayer hinzufügen
    const temperaturLayer = L.featureGroup();
    const temperaturPalette = [
        [-10, "#00008B"], // Farbe für Temperatur unter -10°
        [-5, "#4169E1"], // Farbe für Temperatur >= -10° und < -5°
        [0, "#87CEFA"], // Farbe für Temperatur >= -5° und < 0°
        [5, "#FF7F50"], // Farbe für Temperatur >= 0° und < 5°
        [10, "#FF4500"], // Farbe für Temperatur >= 5° und < 10°
        [99, "darkred"], // Farbe für Temperaturen > 10°
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.LT) {
                // Farbe des letzten Eintrags der Farbpalette als Standardfarbe setzen 
                let color = temperaturPalette[temperaturPalette.length - 1][1];

                // jeden Temperaturwert mit den Schwellen der Farbpalette vergleichen
                for (let i = 0; i < temperaturPalette.length; i++) {
                    //console.log(farbPalette[i],feature.properties.LT);
                    if (feature.properties.LT < temperaturPalette[i][0]) {
                        // der Temperaturwert ist kleiner als die Schwelle -> die entsprechende Farbe zuweisen
                        color = temperaturPalette[i][1];

                        // Überprüfung beenden, weil die Farbe bereits ermittelt ist
                        break;
                    } else {
                        // weiter zum nächsten Schwellenwert
                    }
                }
                // Marker mit Temperaturwert und Hintergrundfarbe zurückgeben
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="temperaturLabel" style="background-color:${color}">${feature.properties.LT}</div>`
                    })
                });
            }
        }
    }).addTo(temperaturLayer);
    layerControl.addOverlay(temperaturLayer, "Temperatur");
    temperaturLayer.addTo(karte);

    

    // Relative Feuchte
    const feuchteLayer = L.featureGroup();
    const feuchtePalette = [
        [30, "#F0EEF2"], 
        [40, "#DBDEDB"], 
        [50, "#C4C9C8"], 
        [60, "#BCBDBE"], 
        [70, "#ABA9D1"], 
        [80, "#9D95DE"], 
        [90, "#8B85EC"],
        [999,"#7677E4"],  
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.RH) {
                // Farbe des letzten Eintrags der Farbpalette als Standardfarbe setzen 
                let color = feuchtePalette[feuchtePalette.length - 1][1];

                // jeden Feuchtewert mit den Schwellen der Farbpalette vergleichen
                for (let i = 0; i < feuchtePalette.length; i++) {
                    //console.log(feuchtePalette[i],feature.properties.RH);
                    if (feature.properties.RH < feuchtePalette[i][0]) {
                        // der Feuchtewert ist kleiner als die Schwelle -> die entsprechende Farbe zuweisen
                        color = feuchtePalette[i][1];

                        // Überprüfung beenden, weil die Farbe bereits ermittelt ist
                        break;
                    } else {
                        // weiter zum nächsten Schwellenwert
                    }
                }
                // Marker mit Feuchtewert und Hintergrundfarbe zurückgeben
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="feuchteLabel" style="background-color:${color}">${feature.properties.RH}</div>`
                    })
                });
            }
        }
    }).addTo(feuchteLayer);
    layerControl.addOverlay(feuchteLayer, "Relative Feuchte");

    // Windgeschwindigkeit
    const windgeschLayer = L.featureGroup();
    const windgeschPalette = [
        [12.96, "#05B603"], 
        [20.37, "#14CA26"], 
        [29.63, "#76D675"], 
        [40.74, "#FED7D4"], 
        [51.86, "#FEB7B1"], 
        [62.97, "#FEA098"], 
        [75.93, "#FB817D"],
        [88.90,"#FF6361"],  
        [103.71,"#FF5D61"], 
        [118.53,"#FD463A"], 
        [999,"#FF200D"], 
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WG) {
                // Farbe des letzten Eintrags der Farbpalette als Standardfarbe setzen 
                let color = windgeschPalette[windgeschPalette.length - 1][1];

                // jeden Feuchtewert mit den Schwellen der Farbpalette vergleichen
                for (let i = 0; i < windgeschPalette.length; i++) {
                    //console.log(feuchtePalette[i],feature.properties.RH);
                    if (feature.properties.RH < windgeschPalette[i][0]) {
                        // der Feuchtewert ist kleiner als die Schwelle -> die entsprechende Farbe zuweisen
                        color = windgeschPalette[i][1];

                        // Überprüfung beenden, weil die Farbe bereits ermittelt ist
                        break;
                    } else {
                        // weiter zum nächsten Schwellenwert
                    }
                }
                // Marker mit Feuchtewert und Hintergrundfarbe zurückgeben
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="windgeschLabel" style="background-color:${color}">${feature.properties.WG}</div>`
                    })
                });
            }
        }
    }).addTo(windgeschLayer);
    layerControl.addOverlay(windgeschLayer, "Windgeschwindigkeit");





//Schneehöhe (eigner Farbverlauf)
const snowLayer = L.featureGroup();
const farbPalette = [
    [10, "#EEF5F7"],
    [20, "#DDEBEF"],
    [30, "#DDEBEF"],
    [50, "#BBD8DE"],
    [75, "#AACED6"],
    [100, "#99C4CE"],
    [150, "#88BAC6"],
    [200, "#77B0BD"],
    [250, "#66A6B5"],
    [300, "#559CAD"],
    [400, "#4492A5"],
    [9999, "#006B84"],

]
L.geoJson(stations, {
    pointToLayer: function (feature, latlng) {
        if (feature.properties.HS) {
            if (feature.properties.HS >= 0) {
                let color = "#FFFFFF";
                for (let i = 0; i < farbPalette.length; i++) {
                    
                    if (feature.properties.HS < farbPalette[i][0]) {
                        color = farbPalette[i][1];
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
layerControl.addOverlay(snowLayer, "Schneehöhe")
}




loadStations();