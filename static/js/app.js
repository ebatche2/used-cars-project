function captureSelectedMake() {
  // Get the selected make from the dropdown
  var dropdown = document.getElementById("makes");
  var selectedMake = dropdown.options[dropdown.selectedIndex].value;
  console.log("Selected make:", selectedMake);

  // Call the function to compile second values using the selected make
  compileSecondValues(selectedMake);
}

function compileSecondValues(selectedMake) {
  // Replace "api/cars" with the actual API endpoint
  d3.json("api/cars").then((data) => {
    console.log(data);

    // Access the array using the 'table' property
    const dataArray = data.table;

    // Use filter to get arrays with a matching first value, then use map to extract the second values
    const secondValues = dataArray
      .filter((array) => array[0] === selectedMake)
      .map((array) => array[1]);

    // Log the compiled second values
    console.log(secondValues);
  });
}

// Rest of your code
d3.json("api/cars").then((data) => {
  console.log(data);

  $('#example').DataTable({
    data: data['table'],
    columns: [
      { title: "Make" },
      { title: "Models" }
    ]
  });
});

function init() {
  d3.json("api/cars").then((data) => {
    console.log(data);

    $('#example').DataTable({
      data: data['table'],
      columns: [
        { title: "Make" },
        { title: "Models" }
      ]
    });

    // Everything with data has to be set in here
    let samples = data.table;

    // Define songs as a variable from the table
    function getFirstColumn(table) {
      var firstColumn = [];
      for (var i = 0; i < table.length; i++) {
        if (table[i].length > 0) {
          firstColumn.push(table[i][0]);
        } else {
          firstColumn.push(null);
        }
      }
      return firstColumn;
    }

    // Logs the unique makes to console
    let uniqueMakes = new Set();

    for (let i = 0; i < samples.length; i++) {
      if (samples[i].length > 0) {
        uniqueMakes.add(samples[i][0]);
      }
    }

    let uniqueMakesArray = Array.from(uniqueMakes);

    console.log("Unique Makes from the First Column:", uniqueMakesArray);

    // Fill the dropdown menu with all the songs
    let dropdownMenu = d3.select("#makes");
    for (let i = 0; i < samples.length; i++) {
      dropdownMenu.append("option").text(uniqueMakesArray[i]).property("value", uniqueMakesArray[i]);
    }
    first = uniqueMakesArray[0];
  });
}

// Initialize DataTable and dropdown on document ready
//$(document).ready(function () {
//  initializeDataTable();
//});

init();