var map = L.map('map', {
    minZoom: 7,
});
var osmUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, { attribution: osmAttrib }).addTo(map);
map.setView([45.733, 4.832], 7);



////////////////////////////////////////////////////
//////////////// ajout de la couche region ////////////////

function styleREG_ARA(feature) {
    return {
        fillColor: 'red',
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    }
};

var regionARA = L.geoJSON(region_ARA, {
    pointToLayer: function (feature, latlng) {
        return L.polygon(latlng, { icon: icon });
    },
    style: styleREG_ARA
}).addTo(map);

/////////////////////////////////////////////////////
//////////////// Couche departement ////////////////
/////////////////////////////////////////////////////
function styleDEP_ARA(feature) {
    return {
        fillColor: 'blue',
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.2
    }
};

var depARA = L.geoJSON(dep_ARA, {
    pointToLayer: function (feature, latlng) {
        return L.polygon(latlng, { icon: icon });
    },
    style: styleDEP_ARA
}).addTo(map);


///////////////////////////////////////////////////////////
//////////////// ajout de la couche tornade ////////////////
//////////////////////////////////////////////////////////

var icontornade = L.icon({
    iconUrl: 'toricon.png',
    iconSize: [15, 15],
    iconAnchor: [10, 10]
}
);

var tornades_ARA = L.geoJSON(tornades, {
    ointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: icon }).bindTooltip(tornades.feature.properties._date);
    },
}) .addTo(map);



/////////////////////////////////////////////////////
//////////////// panneau de contrôle ////////////////
/////////////////////////////////////////////////////

var mixed = {
    "région": regionARA, // BaseMaps
    "departement": depARA, 		// BaseMaps
    "Tornades" : tornades_ARA       // layers
};

L.control.layers(null, mixed).addTo(map);
