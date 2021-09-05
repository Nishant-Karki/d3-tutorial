import React from "react";
import * as d3 from "d3";
import "./lineChart.css";

function LineChart() {
  const data = [
    { a: 1, b: 3 },
    { a: 2, b: 6 },
    { a: 3, b: 2 },
    { a: 4, b: 12 },
    { a: 5, b: 8 },
  ];
  const width = 500;
  const height = 350;
  const margin = 20;

  const h = height - 2 * margin;
  const w = width - 2 * margin;

  //number formatter
  const xFormat = d3.format(".2");

  //x scale
  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.a)) //domain : to extent from min to max of a [min,max]
    .range([margin, w]);

  //y scale
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.b)]) //domain : to extent from min to max of b starts from 0 [0,max]
    .range([h, margin]);

  //to draw curve line inside chart
  const line = d3
    .line()
    .x((d) => x(d.a))
    .y((d) => y(d.b))
    .curve(d3.curveCatmullRom.alpha(0.5));

  const xTicks = x.ticks(6).map((d) =>
    x(d) > margin && x(d) < w ? (
      <g transform={`translate(${x(d)},${h + margin})`}>
        <text>{xFormat(d)}</text>
        <line x1="0" x2="0" y1="0" y2="5" transform="translate(0,-20)" />
      </g>
    ) : null
  );
  const yTicks = y.ticks(5).map((d) =>
    y(d) > 10 && y(d) < h ? (
      <g transform={`translate(${margin},${y(d)})`}>
        <text x="-12" y="5">
          {xFormat(d)}
        </text>
        <line x1="0" x2="5" y1="0" y2="0" transform="translate(-5,0)" />
        <line
          className="gridline"
          x1="0"
          x2={w - margin}
          y1="0"
          y2="0"
          transform="translate(-5,0)"
        />
      </g>
    ) : null
  );
  return (
    <svg width={width} height={height}>
      <line className="axis" x1={margin} x2={w} y1={h} y2={h} />
      <line className="axis" x1={margin} x2={margin} y1={margin} y2={h} />
      <path d={line(data)} />
      <g className="axis-labels">{xTicks}</g>
      <g className="axis-labels">{yTicks}</g>
    </svg>
  );
}

export default LineChart;
