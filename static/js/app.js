// Data table
d3.json("api/cars").then((data) => {

    console.log(data)
  
    // $(document).ready(function() {
      $('#example').DataTable( {
        data: data['table'],
        columns: [
            { title: "Make" },
            { title: "Models" },
            
        ]
      } );
  
  })
  $(document).ready(function() {
  function init () {
    d3.json("api/cars").then((data) => {
        console.log(data)
        // $(document).ready(function() {
          $('#example').DataTable( {
            data: data['table'],
            columns: [
                { title: "Make" },
                { title: "Models" }
            ]
            } );
            //Everything with data has to be set in here
            let samples = data.table;
        //Define songs as a variable from table
  function getFirstColumn(table) {
    var firstColumn = [];
    for (var i = 0; i < table.length; i++) {
      if (table[i].length > 0) {
        firstColumn.push(table[i][0]);
      } else {
        firstColumn.push(null); // If first column is missing, push null
      }
    }
    return firstColumn;
  }
  // Logs the songs to console
  var songs = getFirstColumn(samples);
  console.log(songs);
        // Fill the dropdown menu with all the songs
        let dropdownMenu = d3.select("#makes");
        for (let i=0; i<samples.length; i++) {
            dropdownMenu.append("option").text(songs[i]).property("value", songs[i]);
        }
        first = songs[0];
        //Display the charts and panel with the first ID
    });
  }
  init()
  })