

// The base endpoint to receive data from. See update_url()
var URL_BASE = "http://127.0.0.1:3000/get_sample_dataset";

var margin = {top: 20, right: 20, bottom: 100, left: 60};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;
var n_graphs = 1

d3.select("#input_day_form_submit").on("onclick", make_days_graph);

// Whitespace on either side of the bars in units of minutes
var binMargin = .1;

// Set up X and Y axis scales
var x = d3.scale.linear()
    .range([0,  width])
    .domain([0, 10]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var y = d3.scale.linear()
    .range([height, 0])
    .domain([0, 10]);
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


// Define charts
var i;
for (i = 0; i < n_graphs; i++) {

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "svg_" + i)
    .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
        .attr("id", "group_" + i);

    // x axis
    svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .text("X value")
          .attr("dy", "3em")
          .attr("text-align", "center")
          .attr("x", width / 2 - margin.right - margin.left);

    // y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("dy", "-2em")
        .text("Y value");

    // Title
    svg.append("text")
      .attr("id", "title_" + i)
      .text("Initializing...")
      .attr("x",x(120))
      .attr("y", y(0.9))
      .attr("font-size", "40px")
      .attr("font-weight", "bold")
      .style("text-anchor", "middle")
}



// Define area plots
var area_best_worst_05 = d3.svg.area()
	.x(function(d) {return x(d.hours_since_ba); })
  	.y0(function(d) { return y(+d.worst_05_percentile); })
  	.y1(function(d) { return y(+d.best_05_percentile); });

var area_best_worst_10 = d3.svg.area()
	.x(function(d) {return x(+d.hours_since_ba); })
  	.y0(function(d) { return y(+d.worst_10_percentile); })
  	.y1(function(d) { return y(+d.best_10_percentile); });


// Define daily lines
var daily_data1 = d3.svg.line()
	.x(function(d) {return x(+d.hours_since_ba); })
	.y(function(d) { return y(+d.day1); });

var daily_data2 = d3.svg.line()
	.x(function(d) {return x(+d.hours_since_ba); })
	.y(function(d) { return y(+d.day2); });

var daily_data3 = d3.svg.line()
	.x(function(d) {return x(+d.hours_since_ba); })
	.y(function(d) { return y(+d.day3); });

var daily_data4 = d3.svg.line()
	.x(function(d) {return x(+d.hours_since_ba); })
	.y(function(d) { return y(+d.day4); });

var daily_data5 = d3.svg.line()
	.x(function(d) {return x(+d.hours_since_ba); })
	.y(function(d) { return y(+d.day5); });

var daily_data6 = d3.svg.line()
	.x(function(d) {return x(+d.hours_since_ba); })
	.y(function(d) { return y(+d.day6); });

function plot_data() {
  return d3.svg.line()
  	.x(function(d) {return x(+d[0]); })
  	.y(function(d) {return y(+d[1]); });
}


// Return url to recieve data
function data_url() {
  return URL_BASE;
}


function make_days_graph() {
  update_data = data_url()

  d3.json(update_data, function(linedata) {
      // console.log(linedata);


      console.log(linedata[0])
      console.log(linedata[0][0]) // X
      console.log(linedata[0][1]) // Y

      // console.log(d3.select("#svg_0"))

      //Line graph
      // var line= d3.select("#svg_0").selectAll("line").attr("stroke", "blue")
      //             .attr("stroke-width", 2)
      //             .attr("fill", "none")
      //             .style("opacity", 0)
      //             .data(linedata[0])
      //             .enter()
      //             .append("line")
      //
      //
      // d3.select("#svg_0").append("path")
      //          .data(linedata[0])
      //          .attr("class", "line")
      //          .attr("d", plot_data);


      // line.transition()
      //   .duration(1000)
      //   .attr("d", plot_data(linedata[0]) )
        // .attr("d", daily_data1(linedata[thekey]));

    });
}
