import Papa from "papaparse";

/// Helper methods-

//Constants

const fileName = "restaurants.csv";

//Read the CSV located at fileName
//Convert it into an array of objects and return the array.
async function getData() {
  const response = await fetch(fileName);
  console.log(response);
  const reader = response.body.getReader();
  const result = await reader.read(); // raw array
  const decoder = new TextDecoder("utf-8");
  let csv = decoder.decode(result.value); // the csv text
  //Update the headers
  let csv_header = "";

  csv
    .split("\n")[0]
    .split(",")
    .map((col_name) => {
      csv_header += col_name.replace(/ /g, "_") + ",";
      return undefined;
    });
  let csv_new = csv_header + "\n" + csv.substring(csv.indexOf("\n")).trim();
  const results = Papa.parse(csv_new, { header: true }); // object with { data, errors, meta }
  const rows = results.data; // array of objects
  return rows;
}

// This Should be a pure function...
// Loops through the Array[objects] and returs a list of distinct Cuisnes available. 
function extractFilters(restos) {
  const cuisines = new Set();
  restos.map((resto) => {
    resto.Cuisines &&
      resto.Cuisines.split(",").map((cuisine) => {
        cuisines.add(cuisine.trim());
        return undefined;
      });
    return undefined;
  });

  var filters = [];
  let id_g = 1;
  cuisines.forEach((cuisine) => {
    id_g += 1;
    var ele = {
      id: id_g,
      btnName: cuisine,
      selected: false,
    };
    filters.push(ele);
  });

  return filters;
}

export { getData, extractFilters };
