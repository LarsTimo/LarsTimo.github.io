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


//auf ausschnitt zoomen
karte.setView(
    [47.2, 11.2],
    8
);
//openstreetmap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

//Positionsmarker1

let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);

//Positionsmarker2
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

//popup zum pin hängen
pin1.bindPopup(titel1).openPopup();
pin2.bindPopup(titel2).openPopup();




//Array mit Objekten erstellen
const adlerblicke = [
    {
        kunde: "Wilder Kaiser",
        standort: "Gruttenhütte",
        seehoehe: 1640,
        lat: 47.55564,
        long: 12.31861,
    },
    {
        kunde: "Bergbahn Scheffau",
        standort: "Brandstadl",
        seehoehe: 1640,
        lat: 47.4912,
        long: 12.248,
    },
    {
        kunde: "Lechtal Tourismus",
        standort: "Sonnalm Jöchelspitze",
        seehoehe: 1786,
        lat: 47.41028,
        long: 10.60083,
    }

];

//Schleife erstellt für jedes objekt des Array einen Pin mit passendem Popup
for (let blick of adlerblicke) {
    let blickpin = L.marker (
        [blick.lat, blick.long]
    ).addTo(karte);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
        <p>Höhe ${blick.seehoehe}m<p>
        <em>Kunde ${blick.kunde} </em>`
    );
}
