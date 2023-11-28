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

  let samples = data.table;
    // Fill the dropdown menu with all the models:
    let dropdownMenu = d3.select("#modelsDropdown");
    for (let i = 0; i < samples.length; i++) {
      dropdownMenu.append("option").text(secondValues[i]).property("value", secondValues[i]);
    }
    // Add an event listener to capture the user selection
  dropdownMenu.on("change", function () {
  // Get the selected model from the dropdown
  var selectedModel = d3.select(this).property("value");

  //Log or do something with the selected model
  console.log("Selected model:", selectedModel);
   // first = uniqueMakesArray[0];
    //Capture selected model
    //function captureSelectedModel() {
      // Get the selected make from the dropdown
      //var dropdown = document.getElementById("#modelsDropdown");
      //var selectedModel = dropdown.options[dropdown.selectedIndex].value;
      //console.log("Selected model:", selectedModel);
    
      // Call the function to compile second values using the selected make
      //compileSecondValues(selectedModel);
    })
    // Capture user input
    var yearInput = document.getElementById("year");
    var mileageInput = document.getElementById("mileage");

    // Event listener for user input changes
    yearInput.addEventListener("input", function () {
        var yearValue = this.value;
        console.log("Year: " + yearValue);
        // You can perform further actions with the year value here
    });

    mileageInput.addEventListener("input", function () {
        var mileageValue = this.value;
        console.log("Mileage: " + mileageValue);
        // You can perform further actions with the mileage value here
    });

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