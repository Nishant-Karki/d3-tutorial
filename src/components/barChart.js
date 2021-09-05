import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function BarChart() {
  const canvas = useRef();
  useEffect(() => {
    const data = [2, 4, 2, 6, 8];
    drawBarChart(data);
  }, []);

  const drawBarChart = (data) => {
    const canvasHeight = 400;
    const canvasWidth = 600;
    const scale = 20;

    const svgCanvas = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("border", "1px solid black");

    svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", 40)
      .attr("height", (datapoint) => datapoint * 20)
      .attr("fill", "lightgreen")
      .attr("x", (data, iteration) => iteration * 45)
      .attr("y", (datapoint) => canvasHeight - datapoint * scale);

    svgCanvas
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("fill", "red")
      .attr("x", (datapoint, i) => i * 45 + 10)
      .attr("y", (datapoint, i) => canvasHeight - datapoint * scale)
      .text((datapoint) => datapoint);
  };

  return <div ref={canvas}></div>;
}

export default BarChart;
