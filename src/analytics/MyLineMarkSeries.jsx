import React, { useState } from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
} from "react-vis";

function MyLineMarkSeries(props) {
  const data = [
    [
      { x: 1, y: 0 },
      { x: 2, y: 5 },
      { x: 3, y: 10 },
    ],
    [
      { x: 1, y: 0 },
      { x: 2, y: 6 },
      { x: 3, y: 8 },
      { x: 4, y: 10 },
      { x: 5, y: 16 },
    ],
    [
      { x: 1, y: 0 },
      { x: 2, y: 3 },
      { x: 3, y: 10 },
      { x: 4, y: 10 },
      { x: 5, y: 18 },
      { x: 6, y: 18 },
    ],
    [
      { x: 1, y: 1 },
      { x: 2, y: 3 },
      { x: 3, y: 6 },
      { x: 4, y: 8 },
      { x: 5, y: 10 },
      { x: 6, y: 12 },
    ],
    [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 2 },
      { x: 5, y: 3 },
      { x: 6, y: 4 },
    ],
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h4 className="analyticsMain-header-title">Успеваемость в изучении</h4>
        <XYPlot width={300} height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineMarkSeries
            // className="linemark-series-example"
            style={{
              strokeWidth: "3px",
            }}
            lineStyle={{ stroke: "red" }}
            markStyle={{ stroke: "yellow" }}
            color={"yellow"}
            data={data[props.activeUser]}
          />
          {/* <LineMarkSeries
            // className="linemark-series-example-2"
            curve={"curveMonotoneX"}
            lineStyle={{ stroke: "blue" }}
            markStyle={{ stroke: "yellow" }}
            color={"yellow"}
            data={[
              { x: 1, y: 11 },
              { x: 1.5, y: 29 },
              { x: 3, y: 7 },
            ]}
          /> */}
        </XYPlot>
      </div>
    </>
  );
}

export default MyLineMarkSeries;
