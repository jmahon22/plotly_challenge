// use D3 library to read in samples.json
function demographicInfo(sample){
    
// fetch the metadata using d3.json
    d3.json("data/samples.json").then((data) => {
        console.log(data);
               
    var metaData = data.metadata;
        console.log(metaData);
          
    // filter metadataID for results
    var metaDataID = metaData.filter(item => item.id == sample);
        console.log(metaDataID);    
  
    // store and select #sample-metadata using d3    
    var metaDataSelector = d3.select("#sample-metadata");
          
    // clear any existing metada
    metaDataSelector.html(""); 
  
    // add each key and value pair to metaDataSelector
    Object.entries(metaDataID[0]).forEach(([key, value]) => {
        metaDataSelector.append("p").text(`${key.toUpperCase()} : ${value}`);
    });
  
    });
};
  
// drop down menu
function DropDownMenu() {
    d3.json("data/samples.json").then((data) => {
        console.log(data);
  
    var metaDataID = data.metadata;
  
    // loop through IDs
    var metaDataIDs = metaDataID.map(item => item.id);
        console.log(metaDataIDs); 
  
    // store and select selDataset
    var results = d3.select("#selDataset");
  
    // add each value in drop down
    Object.entries(metaDataIDs).forEach(([key,value]) => {
        results.append("option").text(`${value}`);
    });
  
    return metaDataIDs;
  });
};
  

// //build charts
// function buildPlot(sample){
  
//     d3.json("data/samples.json").then((data) => {
//         samples = data.samples;
//         console.log(samples);
  
//     // filter samples
//     var results = samples.filter(item => item.id == sample)
  
//     // assign the 1st value to result
//     var result = results[0];
    
//     var sample_values = result.sample_values;
//         console.log(sample_values);

//     var otu_ids = result.otu_ids;
//         console.log(otu_ids);
    
//     var otu_labels = result.otu_labels;
//          console.log(otu_labels);
  
  
// //bar chart
//     var barchart = {
//         x: sample_values.slice(0,10).reverse(),
//         y: otu_ids.map(otu_ids => `OTU ${otu_ids}`).slice(0,10).reverse(),
//         text: otu_labels.slice(0,10).reverse(),
//         type: "bar",
//         orientation: "h",
//         marker: {
//             color: 'rgb(142,124,195)',
//         }
//     };
          
//     var data = [barchart];
  
//     var layout = {
//         title: '<b> Belly Button Bacteria </b> <br> Top 10 Samples </b>',
//         titlefont: {family: 'Arial, Helvetica, sans-serif'},
//         margin: {
//             l: 100,
//             r: 100,
//             t: 120,
//             b: 50
//         },
//         xaxis: {title:"Sample Values"},
//         width: 500,
//         height: 600
//     };
  
//     Plotly.newPlot("bar", data, layout);
  
  
// //bubble chart
//     var bubblechart = {
//         x: otu_ids,
//         y: sample_values,
//         text: otu_labels,
//         type: "scatter",
//         mode: 'markers',
//         marker: {
//             size: sample_values,
//             color: otu_ids, 
//             colorscale: "Rainbow"              
//         }
//     };
          
//     var data = [bubblechart];
  
//     var layout = {
//         title: "<b>Belly Button Bacteria</b> <br> Samples per OTU ID</b>",
//         titlefont: {family: 'Arial, Helvetica, sans-serif'},
//         margin: {
//             l: 100,
//             r: 100,
//             t: 120,
//             b: 50
//         },
//         xaxis: {title:"OTU ID"},
//         yaxis: {title:"Sample Values"},
//     };
  
//     Plotly.newPlot("bubble", data, layout);
  
//     });
  
// };
  
 
 
//  // Get new data each time a new ID is selected 
// function optionChanged(newValue){
  
//     demographicInfo(newValue);
//     buildPlot(newValue);
//     DropDownMenu(newValue);
// }
  

// // use first sample to build the initial html page Dashboard 
// function init(){
  
//     d3.json("data/samples.json").then((data) => {
//         console.log(data);
  
//         var firstSample = data.metadata.map(item => item.id);
//               console.log(firstSample[0]);
  
//           // Call other function in init to use the first sample to build initial plots, demographicInfo, menu option
//           DropDownMenu(firstSample[0]);
//           buildPlot(firstSample[0]);
//           demographicInfo(firstSample[0]);
//     });
// };
  
// // Initialize the Dashboard
// init();
