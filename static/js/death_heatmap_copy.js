// code for creating a chloropleth of deaths by state

// PROBLEM: need to adjust death numbers by population
// PROBLEM: click events don't occur unless you open the console on the side and refresh the page?

// NOTE: I added DC, NYC, and Puerto Rico to the us-states.json file since the deaths dataset included it, it was not in the original file

// assigning the json paths to variables
    let stateBoundariesPath = `Data/data.json`
    // let deathPath = "Data/Updated_Deaths_Sheet.json"

    // declaring a global variable so that the event listener will work later
    var selectedButton;
    let choroplethLayer = null;
    // initializing the map
    let myMap = L.map("map", {
        center: [41.728983, -102.209124],
        zoom: 4
    });


    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    myMap.invalidateSize();

    // adding layers to display data for different years
    let year1 = new L.layerGroup();
    let year2 = new L.layerGroup();
    let year3 = new L.layerGroup();
    let year4 = new L.layerGroup();
    let overlayMaps = {
        "2020" : year1,
        "2021" : year2,
        "2022" : year3,
        "2023" : year4
    }
    // L.control.layers(overlayMaps).addTo(myMap);
    L.control.layers(overlayMaps, {}, {
        collapsed: false
      }).addTo(myMap);

Promise.all([
    fetch(stateBoundariesPath).then(response => response.json())
    ]).then(([responseJson]) => {
// WORKING WITH THE DATA
    // checking to see if the data got imported right
    // console.log(responseJson.features);
   
    // chloropleth layer
        
        let stateJson = responseJson.features;  // narrowing down to just responses for simplicity
    L.geoJson(stateJson).addTo(myMap);          // adding the polygon layer to the map
 
        console.log(stateJson);

        
        var radioButtons = document.querySelectorAll('input[class="leaflet-control-layers-selector"]'); // the html tag for the radio buttons, creates an array w each radio button inside
    radioButtons.forEach(radio => {
        radio.addEventListener('click', function () {
            selectedButton = this.nextElementSibling.textContent.trim(); // getting the name of the button
            choroplethMap(responseJson, selectedButton);
        })
    }); // this is the end of the addEventListener code fetch

    }).catch(error => console.error('Error fetching data:', error));  // this is the end of the promise.all

    myMap.invalidateSize();

// FUNCTIONS USED IN THE CODE ABOVE

// function for creating a choropleth map, to be used in the event listener
function choroplethMap(geojson, selectedButton) {
    // console.log()
    if (choroplethLayer) {
        myMap.removeLayer(choroplethLayer);
    }

    choroplethLayer = L.choropleth(geojson, {
        valueProperty: feature => (feature.properties[selectedButton]["COVID-19 (U071, Underlying Cause of Death)"] / feature.properties[selectedButton]["pop_est"]),
        scale: ["#ffffb2", "#b10026"],
        steps: 7,
        mode: 'q',
        style: {
            color: '#fff',
            weight: 2,
            fillOpacity: 0.8
        },
        onEachFeature: (feature, layer) => {    // changing the popup based on which button is selected
            layer.bindPopup(
                `<h1 style='text-align: center'> ${feature.properties.name}</h1>
                <table class="tg"><thead>
                    <tr>
                        <th class="tg-0lax"></th>
                        <th class="tg-0lax">Totals</th>
                        <th class="tg-0lax">% of All Causes</th>
                    </tr></thead>
                    <tbody>
                    <tr>
                        <td class="tg-0lax">All Causes</td>
                        <td class="tg-0lax">${feature.properties[selectedButton]["All Cause"]}</td>
                    </tr>
                    <tr>
                        <td class="tg-0lax">Natural Causes</td>
                        <td class="tg-0lax">${feature.properties[selectedButton]["Natural Cause"]}</td>
                        <td class="tg-0lax">${(feature.properties[selectedButton]["Natural Cause"] / feature.properties[selectedButton]["All Cause"] * 100).toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td class="tg-0lax">COVID-19 (U071, Multiple Cause of Death)</td>
                        <td class="tg-0lax">${feature.properties[selectedButton]["COVID-19 (U071, Multiple Cause of Death)"]}</td>
                        <td class="tg-0lax">${(feature.properties[selectedButton]["COVID-19 (U071, Multiple Cause of Death)"] / feature.properties[selectedButton]["All Cause"] * 100).toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td class="tg-0lax">COVID-19 (U071, Underlying Cause of Death)</td>
                        <td class="tg-0lax">${feature.properties[selectedButton]["COVID-19 (U071, Underlying Cause of Death)"]}</td>
                        <td class="tg-0lax">${(feature.properties[selectedButton]["COVID-19 (U071, Underlying Cause of Death)"] / feature.properties[selectedButton]["All Cause"] * 100).toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td class="tg-0lax">All Other Cause</td>
                        <td class="tg-0lax">${feature.properties[selectedButton]["All Other Cause"]}</td>
                        <td class="tg-0lax">${(feature.properties[selectedButton]["All Other Cause"] / feature.properties[selectedButton]["All Cause"] * 100).toFixed(2)}%</td>
                    </tr>
                    
                    </tbody>
                    </table>`
            )}
    }).addTo(myMap);
}


// function that converts string values to numbers
function toNumber(json) {
    // for every key that exists
    for (key in json["features"][0]["properties"]) {
        // replace the value of the key with a float, iterating over every index
        for (i = 0; i < json.features.length; i++) {
            if (key != "name") // NaN keys in geojson
            {
                json["features"][i]["properties"] = parseFloat(json[i][key]);
            }
        }
    }
}