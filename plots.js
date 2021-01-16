
/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */

// Submit Button handler
function handleSubmit() {
  // @TODO: YOUR CODE HERE
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var stock = d3.select("#stockInput").node().value
  // clear the input value
  d3.select("#stockInput").node().value=''
  // Build the plot with the new stock
  buildPlot(stock);
}

function buildPlot(stock) {
  var apiKey = "-2JV8ivGwVxVapqcQYWa";
// var stock = "AMZN"
  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

  d3.json(url).then(function(data) {
    // Grab values from the response json object to build the plots
    var name = data.dataset.name;
    var stock = data.dataset.dataset_code;
    var startDate = data.dataset.start_date;
    var endDate = data.dataset.end_date;
    // Print the names of the columns
    console.log(data.dataset.column_names);
    // Print the data for each day
    console.log(data.dataset.data);
    // Use map() to build an array of the the dates
    var dates = data.dataset.data.map(row=>row[0])
    // Use map() to build an array of the closing prices
    var closingPrices = data.dataset.data.map(row=>row[4])

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };

    var trace2={
      type: "candlestick",
      name: "Candlestick Data",
      x: data.dataset.data.map(row=>row[0]),
      high: data.dataset.data.map(row=>row[2]),
      low: data.dataset.data.map(row=>row[3]),
      open:data.dataset.data.map(row=>row[1]),
      close: data.dataset.data.map(row=>row[4])
    }

    var data = [trace1, trace2];

    var layout = {
      title: `${stock} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
}

d3.select("#submit").on("click", handleSubmit);
// buildPlot();
// Add event listener for submit button
// @TODO: YOUR CODE HERE