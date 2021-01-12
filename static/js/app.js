// use D3 library to read in samples.json
// demographic info display
function demographicInfo(sample){

    d3.json("../samples.json").then((data) => {
        // console.log(data);
                
    var metaData = data.metadata;
        // console.log(metaData);
            
    // filter metadataID for results
    var metaDataID = metaData.filter(item => item.id == sample);
        // console.log(metaDataID);    

    // store and select #sample-metadata using d3    
    var metaDataCategories = d3.select("#sample-metadata");
            
    // clear existing metadata
    metaDataCategories.html(""); 

    // add each key and value pair to metaDataSelector
    Object.entries(metaDataID[0]).forEach(([key, value]) => {
        metaDataCategories.append("p").text(`${key.toUpperCase()} : ${value}`);
    });
  
    });
};
  
// drop down menu
function DropDownMenu() {
    d3.json("../samples.json").then((data) => {
        // console.log(data);
  
    var ID = data.metadata;
  
    // loop through IDs
    var metaDataIDs = ID.map(item => item.id);
        // console.log(metaDataIDs); 
  
    // store and select selDataset
    var results = d3.select("#selDataset");
  
    // add each value in drop down
    Object.entries(metaDataIDs).forEach(([key,value]) => {
        results.append("option").text(`${value}`);
    });
  
    return metaDataIDs;
  });
};
  

//build charts
function buildPlot(sample){
  
    d3.json("../samples.json").then((data) => {
        samples = data.samples;
        // console.log(samples);
  
    // filter samples
    var filter_samples = samples.filter(item => item.id == sample)
  
    // assign the 1st value to result
    var result = filter_samples[0];
    
    var sample_values = result.sample_values;
        // console.log(sample_values);

    var otu_ids = result.otu_ids;
        // console.log(otu_ids);
    
    var otu_labels = result.otu_labels;
        //  console.log(otu_labels);
  
  
    //BAR CHART
    var barchart = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.map(otu_ids => `OTU ${otu_ids}`).slice(0,10).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h",
        marker: {
            color: 'rgb(55, 166, 64)',
        }
    };
          
    var data = [barchart];
  
    var layout = {
        title: '<b> Belly Button Bacteria </b> <br> Top 10 Samples </b>',
        titlefont: {family: 'Times New Roman, Times, sans-serif'},
        margin: {
            l: 100,
            r: 100,
            t: 110,
            b: 60
        },
        xaxis: {title:"Sample Values"},
        width: 800,
        height: 700
    };
  
    Plotly.newPlot("bar", data, layout);
  
  
    //BUBBLE CHART
    var bubblechart = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        type: "scatter",
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids, 
            colorscale: "Rainbow"              
        }
    };
          
    var data = [bubblechart];
  
    var layout = {
        title: "<b>Belly Button Bacteria</b> <br> Samples per OTU ID</b>",
        titlefont: {family: 'Times New Roman, Times, sans-serif'},
        margin: {
            l: 100,
            r: 100,
            t: 150,
            b: 70
        },
        xaxis: {title:"OTU ID"},
        yaxis: {title:"Sample Values"},
    };
  
    Plotly.newPlot("bubble", data, layout);

    //GAUGE CHART
    d3.json("../samples.json").then((data1) => {
        var metaData = data1.metadata;
        // console.log(metaData);

    // filter metadataID for one or more results
        var metaDataID = metaData.filter(item => item.id === sample);
        // console.log(metaDataID[0].wfreq); 

        var gaugechart = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: metaDataID[0].wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs Per Week" },
            titlefont: {family: 'Times New Roman, Times, sans-serif'},
        
        
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          bar: {color: "maroon"},
          steps: [
            { range: [0, 1], color: 'rgb(127, 176, 130)'},
            { range: [1, 2], color: 'rgb(116, 179, 120)' },
            { range: [2, 3], color: 'rgb(103, 181, 108)' },
            { range: [3, 4], color: 'rgb(81, 166, 87)' },
            { range: [4, 5], color: 'rgb(59, 135, 65)' },
            { range: [5, 6], color: 'rgb(40, 102, 45)' },
            { range: [6, 7], color: 'rgb(28, 89, 33)' },
            { range: [7, 8], color: 'rgb(18, 79, 23)'  },
            { range: [8, 9], color: 'rgb(10, 69, 15)' },
            { range: [9, 10], color: 'rgb(4, 64, 9)' }
          ],
      
        },
        },
    ];
  
    var layout = { width: 700, 
                height: 500, 
                margin: { t: 0, b: 0 } 
                };

    Plotly.newPlot("gauge", gaugechart, layout);

    });
});
};
  
 
 // Get new data each time a new ID is selected 
function optionChanged(newValue){
  
    demographicInfo(newValue);
    buildPlot(newValue);
}
  

// use first sample to build the initial html page Dashboard 
function init(){
  
    d3.json("../samples.json").then((data) => {
        // console.log(data);
  
        var first_sample = data.metadata.map(item => item.id);
              console.log(first_sample[0]);
  
// call functions to use the first sample to build initial plots, demographic info, & dropdown menu
        demographicInfo(first_sample[0]);        
        DropDownMenu(first_sample[0]);
        buildPlot(first_sample[0]);
    });
};
  
// initialize dashboard
init();
