//alert("Hallo Welt!");

const div= document.getElementById("map");
const lat = div.getAttribute("data-lat")
const long = div.getAttribute("data-long")
const title = div.getAttribute("data-title")

console.log(lat,long,title)