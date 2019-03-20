//alert("Hallo Welt!");

const div= document.getElementById("map");
const breite = div.getAttribute("data-lat")
const laenge = div.getAttribute("data-long")
const titel = div.getAttribute("data-title")

// console.log("breite=",breite,"länge=",laenge,"titel=",titel,)

//Karte initialisieren

let karte = L.map("map");
//console.log(karte);
