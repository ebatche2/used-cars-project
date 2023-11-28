function captureSelectedMake() {
  // Get the dropdown element
  var dropdown = document.getElementById("makes");

  // Get the selected value
  var selectedMake = dropdown.options[dropdown.selectedIndex].value;

  // Display or use the selected value
  console.log("Selected make:", selectedMake);
}

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
  // Logs the unique makes to console
// Create a Set to store unique values from the first column
let uniqueMakes = new Set();

      // Loop through the 'table' and add the first column values to the Set
      for (let i = 0; i < samples.length; i++) {
           if (samples[i].length > 0) {
           uniqueMakes.add(samples[i][0]);
           }
          }

        // Convert the Set back to an array if needed
        let uniqueMakesArray = Array.from(uniqueMakes);

        // Print or process the unique makes from the first column
        console.log("Unique Makes from the First Column:", uniqueMakesArray);

        // Fill the dropdown menu with all the songs
        let dropdownMenu = d3.select("#makes");
        for (let i=0; i<samples.length; i++) {
            dropdownMenu.append("option").text(uniqueMakesArray[i]).property("value", uniqueMakesArray[i]);
        }
        first = uniqueMakesArray[0];
        //Display the charts and panel with the first ID
    });
  }


  init()
  })