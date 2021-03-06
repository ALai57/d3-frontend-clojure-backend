

// The endpoint to receive data from
var URL_BASE = window.location.origin + "/get_sample_dataset";
//http://127.0.0.1:3000

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



linefunction = d3.svg.line()
  	.x(function(d) {return x(+d.x); })
  	.y(function(d) {return y(+d.y); });

line = svg.append('svg:path')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');


// Return url to recieve data
function data_url() {
  return URL_BASE;
}


function make_days_graph() {
  update_data = data_url()

  d3.json(update_data, function(linedata) {
      console.log(linedata);
      console.log(linefunction);
      console.log(linefunction(linedata));

   line.transition()
     .duration(1000)
     .attr('d', linefunction(linedata) );

    });

}
