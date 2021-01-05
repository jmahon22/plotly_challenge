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