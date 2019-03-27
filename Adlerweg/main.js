//alert("Hallo Welt!");

const div= document.getElementById("map");
const breite1 = div.getAttribute("data-lat1")
const laenge1 = div.getAttribute("data-long1")
const titel1 = div.getAttribute("data-title1")


const breite2 = div.getAttribute("data-lat2")
const laenge2 = div.getAttribute("data-long2")
const titel2 = div.getAttribute("data-title2")


//Karte initialisieren

let karte = L.map("map");


//auf ausschnitt zoomen
karte.setView(
    [breite1,laenge1],
    13
);
//openstreetmap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

//Positionsmarker1

let pin1= L.marker(
    [breite1,laenge1]
).addTo(karte);

//Positionsmarker2
let pin2= L.marker(
    [breite2,laenge2]
).addTo(karte);

//popup zum pin hängen
pin1.bindPopup(titel1).openPopup();
pin2.bindPopup(titel2).openPopup();
