/**
  Computer exercise for TNM093
  Course responsible: Alexander Bock
  Created by: Kahin Akram
  August 2020
 */
function sp(data) {
  
  var x_var = "Medelålder";
  var y_var = "Skattesats";

  var margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width  = $('div.sp-container').width(),
      height = $('div.sp-container').height();

  var sp_svg = d3.select("#sp")
    .append("svg")
    .attr('viewBox', '0 0 ' + (
      width + margin.left + margin.right)
      + ' ' + (height + margin.top + margin.bottom))
    .attr('width', '100%')
    .attr('height', height)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  //Tooltip
  var tooltip = d3.select("#sp").append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

 /**
  * 
  * Drawing the scatter Plot 
  * 
  */


  //Task 5.0.1  -- Create the x-axis
var x = d3.scaleLinear()
    .domain([d3.min(data, function(d){return +d[x_var]}), d3.max(data, function(d){return +d[x_var]})])
    .range([0, width]);
    



  //Task 5.0.2  -- Append the axes to the sp_svg
  sp_svg
  .append("g")
  .attr("transform", "translate(0 , "+ height +")")
  .call(d3.axisBottom(x));

  //Task 5.0.3  -- Create y-axis
  var y = d3.scaleLinear()
    .domain([d3.min(data, function(d){return +d[y_var]}), d3.max(data, function(d){return +d[y_var]})])
    .range([height, 0]);

  
  // Task 5.0.4 -- Append the axis to sp_svg
  sp_svg
  .append("g")
  .attr("transform", "translate(0, 0)")
  .call(d3.axisLeft(y));

  // Task 5.0.5 -- Append circles to sp_svg
  var myCircles = sp_svg
  .append("g")
  .selectAll("circle")
  .data(data)
  .enter()
  
  // Task 5.0.6 -- Add attributes to the circles
  .append("circle")
  .attr("cx", (data, function(d){return x(+d[x_var])}))
  .attr("cy", (data, function(d){return y(+d[y_var])}))
  .attr("r", 6)
  .style("opacity", "0.3")
  .style("fill", "darkturquoise");
    
  // Task 5.0.7 -- Call hovering function here
  hovering();
  
  /**NECESSARY FUNCTION. DO NOT TOUCH */
    
  this.selectDot = function(value) {
    //Call focusCircle
    focusCricle(value)
  }

  this.resetSelectDot = function (){
    d3.selectAll("circle")
      .style("fill", "darkturquoise")
      .style("opacity", '0.3')
      .attr('r', 6)
  }

  function hovering(){
    myCircles.on("mouseover", function (d){
      focusCricle(d.Region)
      pc.selectLine(d.Region)
      tooltip
        .style("opacity", 1)
        .html("Region: " + d.Region)
        .style("left", (d3.mouse(this)[0] + 30) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style("top", (d3.mouse(this)[1] - 40) + "px")

    })
      .on("mouseleave", function (d)
      {
        pc.resetSelectLine()
        d3.selectAll("circle")
          .style("fill", "darkturquoise")
          .style("opacity", '0.3')
          .attr('r', 6);
        tooltip
          .transition()
          .duration(50)
          .style("opacity", 0)
      })
  }

}

function focusCricle(circle){
  var d = d3.selectAll("circle");
  d.style("fill", function (d){
    return d.Region == circle ? "deeppink" : 'darkturquoise';
  })
  .style("opacity", function (d){
      return d.Region == circle ? "1.0" : '0.3';
  })
  .attr("r", function (d){
      return d.Region == circle ? 10 : 6;
  })
  .style("stroke-width", function (d){
      return d.Region == circle ? 1 : 0;
  })
}
/**END*/
