//alert("Hallo Welt!");

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat1")
const laenge1 = div.getAttribute("data-long1")
const titel1 = div.getAttribute("data-title1")


const breite2 = div.getAttribute("data-lat2")
const laenge2 = div.getAttribute("data-long2")
const titel2 = div.getAttribute("data-title2")

//Karte initialisieren
let karte = L.map("map");

//openstreetmap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

//Grupper für Blicke erstellen
let blickeGruppe =L.featureGroup().addTo(karte);

//Positionsmarker1
let pin1 = L.marker(
    [breite1, laenge1]
).addTo(blickeGruppe);

//Positionsmarker2
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(blickeGruppe);

//popup zum pin hängen
pin1.bindPopup(titel1).openPopup();
pin2.bindPopup(titel2).openPopup();

//Schleife erstellt für jedes objekt des Array einen Pin mit passendem Popup
for (let blick of ADLERBLICKE) {
    let blickpin = L.marker (
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
        <p>Höhe ${blick.seehoehe}m<p>
        <em>Kunde ${blick.kunde} </em>`
    );
}
console.log(blickeGruppe.getBounds());
karte.fitBounds(blickeGruppe.getBounds())