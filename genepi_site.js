var map = L.map('map', {
    minZoom:7,
});
var osmUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, { attribution: osmAttrib }).addTo(map);
map.setView([45.733, 4.832], 7);
L.control.scale().addTo(map);

/*
var north = L.control({position: "bottomright"});
north.onAdd = function(map){
    var div = L.DomUtil.create("div","info legend");
    div.innerHTML = '<img src="tornado.png">';
    return div;
}
north.addTo(map;)
*/

//////////////////////////////////////////////
///////////TORNADES TIMELINE//////////////////
/////////////////////////////////////////////

var slider = L.timelineSliderControl({
    formatOutput: function (date) {
      return moment(date).format("DD-MM-YYYY");
    },
  });
map.addControl(slider);

var polygonTimeline = L.timeline(polygons);
  polygonTimeline.addTo(map);

polygonTimeline.bindTooltip("test");

var pointTimeline = L.timeline(tornades);
  pointTimeline.addTo(map);

slider.addTimelines(polygonTimeline, pointTimeline);

///////////////////////////////////////////////////////////
//////////////// ajout de la couche region ////////////////
//////////////////////////////////////////////////////////
/*
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
*/
/////////////////////////////////////////////////////
//////////////// Couche departement ////////////////
/////////////////////////////////////////////////////

function styleDEP_ARA(feature) {
    return {
        fillColor: 'red',
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

/////////////////////////////////////////////////////
//////////////// Style densi GASPAR ////////////////
/////////////////////////////////////////////////////

function getColor(p) {
    return   p > 40 ? '#b30000' :
                    p > 30 ? '#e34a33' :
                         p > 15 ? '#fc8d59' :
                             p > 8 ? '#fdbb84' :
                                p > 4 ? '#fdd49e' :
                                    p > 1 ? '#fef0d9' :
                                    '#f7f7f7';
}

function styleCOMDENSI_ARA(feature) {
    return {
        fillColor: getColor(feature.properties.Nombre_CATNAT),
        weight: 0.5,
        opacity: 0.4,
        color: 'black',
        dashArray: '10',
        fillOpacity: 1
    }
};

/////////////////////////////////////////////////////////
//////////////// Couche densi_GASPAR /////////////////////
////////////////////////////////////////////////////////

var densi_ARA = L.geoJSON(densi_gasp, {
    pointToLayer: function (feature, latlng) {
        return L.polygon(latlng, { icon: icon });
    },
    style: styleCOMDENSI_ARA, 
    onEachFeature: mouse_events,
}).addTo(map);


/////////////////////////////////////////////////////////////
//////////// ajout des légendes GASPAR //////////////////////
////////////////////////////////////////////////////////////


function mouse_events(feature, leaflet_object) {
    leaflet_object.on({
        mouseover: highstyle,
        mouseout: resetHighlight,
    });
}

function highstyle(event) {
    var gasp = event.target;
    gasp.bindTooltip(gasp.feature.properties.POPULATION);
    gasp.setStyle({
        weight: 5,
        color: '#4298f4',
        dashArray: '',
        fillOpacity: 0.5
    });
    gasp.bringToFront();
}

function resetHighlight(event) {
    densi_ARA.resetStyle(event.target);
}


/////////////////////////////////////////////////////
//////////////// Couche MVT terrain/////////////////////
/////////////////////////////////////////////////////
/*
var mvtterrain = L.geoJSON(mvt_terrain, {
    pointToLayer: function (feature, latlng) {
        return L.polygon(latlng, { icon: icon });
    },
}).addTo(map);
*/


/////////////////////////////////////////////////////
//////////////// panneau de contrôle ////////////////
/////////////////////////////////////////////////////

var mixed = {
    "departement": depARA, 		// BaseMaps
    "densigaspar" : densi_ARA, // layers
    //"time" : timeline // layers
    "timelinetor" : pointTimeline,
    "timelinegasp" : polygonTimeline,
};

L.control.layers(null, mixed).addTo(map);

