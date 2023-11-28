
function captureSelectedMake() {
  var dropdown = document.getElementById("makes");
  var selectedMake = dropdown.options[dropdown.selectedIndex].value;
  console.log("Selected make:", selectedMake);

  // Make API call to get unique models for the selected make
  getUniqueModels(selectedMake);
}

function getUniqueModels(selectedMake) {
  // Make an API call to get models for the selected make
  // Replace 'YOUR_MODEL_API_ENDPOINT' with the actual API endpoint for models
  let modelsApiEndpoint = `YOUR_MODEL_API_ENDPOINT?make=${selectedMake}`;

  // Assuming you are using D3.js for API calls
  d3.json(modelsApiEndpoint).then((modelData) => {
    console.log("Unique Models for the Selected Make:", modelData);

    // Assuming 'modelsDropdown' is the ID of your models dropdown
    let modelDropdown = d3.select("#modelsDropdown");
    modelDropdown.selectAll("option").remove(); // Clear existing options

    // Fill the models dropdown with unique models
    for (let model of modelData) {
      modelDropdown.append("option").text(model).property("value", model);
    }
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
$(document).ready(function () {
  initializeDataTable();
});

init();