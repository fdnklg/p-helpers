const fs = require('fs');
const d3 = require('d3');

const pathRoutedData = 'routed.json';
const pathGeojsondData = 'routed-geo.geojson'

const geojsonStruct = {
    "type": "FeatureCollection",
    "features": []
}

const feature = {
    "type": "Feature",
    "geometry": {
        "type": "LineString", // other types possible, such as: Point, Polygon e.g.
        "coordinates": []
    },
    "properties": {
        "providerId": null,
        "mode": null,
        "timestamp": null,
        "timestampEnd": null,
        "distance": null,
        "duration": null
    }
}

readFile = (path) => {
    return JSON.parse(fs.readFileSync(path))
}

writeFile = (path, data) => {
    fs.writeFileSync(path, data)
}

createGeoJson = (data) => {

    const geojsonStruct = {
        "type": "FeatureCollection",
        "features": []
    }

    data.forEach(trip => {
        const featureType = trip.mode == 'mode_accessible' ? 'Point' : 'LineString';

        let feature = {
            "type": "Feature",
            "geometry": {
                "type": featureType,
                "coordinates": []
            },
            "properties": {
                "providerId": null,
                "mode": null,
                "timestamp": null,
                "timestampEnd": null,
                "distance": null,
                "duration": null
            }
        }

        feature.geometry.coordinates = trip.wps;
        feature.properties.providerId = trip.providerId;
        feature.properties.mode = trip.mode;
        feature.properties.timestamp = trip.timeStamp;
        feature.properties.timestampEnd = trip.timeStampEnd;
        feature.properties.distance = trip.distance;
        feature.properties.duration = trip.duration;

        geojsonStruct.features.push(feature);
    })

    writeFile('./routed-geo.geojson', JSON.stringify(geojsonStruct));
    
}


// let data = readFile(pathRoutedData);
// createGeoJson(data);

let geojsonData = readFile(pathGeojsondData);
let filtered = geojsonData.features.filter((feature) => { return feature.properties.mode == 'mode_accessible' })
writeFile('./routed-accessible.geojson', JSON.stringify(filtered));
console.log(filtered)

