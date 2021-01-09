// use D3 library to read in samples.json
function demographicInfo(){
    
    d3.json("/data/samples.json").then((data) => {
            console.log(data);
              
        var metaData = data.metadata;
            console.log(metaData);
        
        var metaDataID = metaData.map(item => item.id);
            console.log(metaDataID);    

        var metaDataSelector = d3.select("#sample-metadata");
        
        metaDataSelector.html(""); 

        Object.entries(metaData[0]).forEach(([key, value]) => {
            metaDataSelector.append("p").text(`${key.toUpperCase()} : ${value}`);
        });
    });
};

// drop down menu
function DropDownMenu() {
    d3.json("/data/samples.json").then((data) => {
        console.log(data);

    var metaDataID = data.metadata;

    var metaDataIDs = metaDataID.map(item => item.id);
        console.log(metaDataIDs); 
    
    var results = d3.select("#selDataset");

    Object.entries(metaDataIDs).forEach(([key,value]) => {
        results.append("option").text(`${value}`);
    });
});
};

// build charts
function buildPlot(sample){

    d3.json("data/samples.json").then((data) => {
        samples = data.samples;
        //console.log(samples);

        // filter samples
        var results = samples.filter(item => item.id == sample)

        // assign the 1st value to result 
        var result = results[0];
        
        var sample_values = result.sample_values;
            //console.log(sample_values);

        var otu_ids = result.otu_ids;
            //console.log(otu_ids);
    
        var otu_labels = result.otu_labels;
            //console.log(otu_labels);


// bar chart
        var barchart = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.map(otu_ids => `OTU ${otu_ids}`).slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
            marker: {
                color: 'rgb(142,124,195)',
                //color: otu_ids,
              }
          };
        
          var data = [barchart];

          var layout = {
            title: '<b> Belly Button Bacteria </b> <br> Top 10 Samples </b>',
            titlefont: {family: 'Arial, Helvetica, sans-serif'},
            margin: {
              l: 100,
              r: 100,
              t: 120,
              b: 50
            },
            xaxis: {title:"Sample Values"},
            width: 500,
            height: 600
          };

          Plotly.newPlot("bar", data, layout);

// // bubble chart
//           var bubblechart = {
//             x: otu_ids,
//             y: sample_values,
//             text: otu_labels,
//             type: "scatter",
//             mode: 'markers',
//             marker: {
//                     size: sample_values,
//                     color: otu_ids, 
//                     colorscale: "Rainbow"              
//             }
//           };
        
//           var data = [bubblechart];

//           var layout = {
//             title: "<b>Belly Button Bacteria</b> <br> Samples per OTU ID</b>",
//             titlefont: {family: 'Arial, Helvetica, sans-serif'},
//             margin: {
//                 l: 100,
//                 r: 100,
//                 t: 120,
//                 b: 50
//               },
//             xaxis: {title:"OTU ID"},
//             yaxis: {title:"Sample Values"},
//           };

//           Plotly.newPlot("bubble", data, layout);



 // fetch new data each time a new metadata ID is selected 
 function optionChanged(newValue){

    demographicInfo(newValue);
    buildPlot(newValue);
    //DropDownMenu(newValue);
 }

 // grab the first sample to build the initial html page dashboard 
 function init(){

    d3.json("data/samples.json").then((data) => {
        console.log(data);

        var firstSample = data.metadata.map(item => item.id);
            console.log(firstSample[0]);

        // Call other function in init to use the first sample to build initial plots, 
        // demographicInfo, menu option
        DropDownMenu(firstSample[0]);
        buildPlot(firstSample[0]);
        demographicInfo(firstSample[0]);
     });
};

// initialize dashboard
init();
