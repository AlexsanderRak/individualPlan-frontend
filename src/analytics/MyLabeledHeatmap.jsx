import React, { useState } from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  HeatmapSeries,
  LabelSeries,
  Hint,
} from "react-vis";

import { scaleLinear } from "d3-scale";

const xDomain = [
  "want",   // 0
  "Intern", // 1
  "Junior", // 2
  "Middle", // 3
  "Senior", // 4
  "Expert", // 5
];
const yDomain = [
  "Структуры данных",
  "Алгоритмы",
  "Системное программирование",
  "Автоматизация build-ов",
  "Автоматизация тестирования",
  "Декомпозиция задачи",
  "Декомпозиция системы",
  "Общение",
  "API",
  "Фреймфорки",
  "Требования",
  "Скрипты",
  "Базы Данных",
];

const data = [
  [
    { x: "Middle", y: "Структуры данных", color: 3 },
    { x: "Senior", y: "Алгоритмы", color: 4 },
    { x: "want", y: "Системное программирование", color: 0 },
    { x: "Intern", y: "Автоматизация build-ов", color: 1 },
    { x: "want", y: "Автоматизация тестирования", color: 0 },
    { x: "Junior", y: "Декомпозиция задачи", color: 2 },
    { x: "want", y: "Декомпозиция системы", color: 0 },
    { x: "Expert", y: "Общение", color: 5 },
    { x: "Senior", y: "API", color: 4 },
    { x: "Senior", y: "Фреймфорки", color: 4 },
    { x: "Junior", y: "Требования", color: 2 },
    { x: "Senior", y: "Скрипты", color: 4 },
    { x: "Junior", y: "Базы Данных", color: 2 },
  ],
  [
    { x: "Intern", y: "Структуры данных", color: 1 },
    { x: "Senior", y: "Алгоритмы", color: 4 },
    { x: "Expert", y: "Системное программирование", color: 5 },
    { x: "Intern", y: "Автоматизация build-ов", color: 1 },
    { x: "Middle", y: "Автоматизация тестирования", color: 3 },
    { x: "Junior", y: "Декомпозиция задачи", color: 2 },
    { x: "Senior", y: "Декомпозиция системы", color: 4 },
    { x: "Intern", y: "Общение", color: 1 },
    { x: "Senior", y: "API", color: 4 },
    { x: "Middle", y: "Фреймфорки", color: 3 },
    { x: "Junior", y: "Требования", color: 2 },
    { x: "Middle", y: "Скрипты", color: 3 },
    { x: "Intern", y: "Базы Данных", color: 1 },
  ],
  [
    { x: "Expert", y: "Структуры данных", color: 5 },
    { x: "want", y: "Алгоритмы", color: 0 },
    { x: "want", y: "Системное программирование", color: 0 },
    { x: "Intern", y: "Автоматизация build-ов", color: 1 },
    { x: "Middle", y: "Автоматизация тестирования", color: 3 },
    { x: "Junior", y: "Декомпозиция задачи", color: 2 },
    { x: "want", y: "Декомпозиция системы", color: 0 },
    { x: "Expert", y: "Общение", color: 5 },
    { x: "want", y: "API", color: 0 },
    { x: "Junior", y: "Фреймфорки", color: 2 },
    { x: "Middle", y: "Требования", color: 3 },
    { x: "want", y: "Скрипты", color: 0 },
    { x: "Expert", y: "Базы Данных", color: 5 },
  ],
  [
    { x: "Intern", y: "Структуры данных", color: 1 },
    { x: "Expert", y: "Алгоритмы", color: 5 },
    { x: "want", y: "Системное программирование", color: 0 },
    { x: "Intern", y: "Автоматизация build-ов", color: 1 },
    { x: "Middle", y: "Автоматизация тестирования", color: 3 },
    { x: "want", y: "Декомпозиция задачи", color: 0 },
    { x: "want", y: "Декомпозиция системы", color: 0 },
    { x: "Expert", y: "Общение", color: 5 },
    { x: "Senior", y: "API", color: 4 },
    { x: "Expert", y: "Фреймфорки", color: 5 },
    { x: "Middle", y: "Требования", color: 3 },
    { x: "Expert", y: "Скрипты", color: 5 },
    { x: "want", y: "Базы Данных", color: 0 },
  ],
  [
    { x: "Middle", y: "Структуры данных", color: 3 },
    { x: "want", y: "Алгоритмы", color: 0 },
    { x: "want", y: "Системное программирование", color: 0 },
    { x: "Expert", y: "Автоматизация build-ов", color: 5 },
    { x: "want", y: "Автоматизация тестирования", color: 0 },
    { x: "Junior", y: "Декомпозиция задачи", color: 2 },
    { x: "Middle", y: "Декомпозиция системы", color: 3 },
    { x: "want", y: "Общение", color: 0 },
    { x: "Junior", y: "API", color: 2 },
    { x: "want", y: "Фреймфорки", color: 0 },
    { x: "Middle", y: "Требования", color: 3 },
    { x: "Junior", y: "Скрипты", color: 2 },
    { x: "want", y: "Базы Данных", color: 0 },
  ],
];


function MyLabeledHeatmap(props) {
  const [value, setValue] = useState(false);

  const { min, max } = data[props.activeUser].reduce(
    (acc, row) => ({
      min: Math.min(acc.min, row.color),
      max: Math.max(acc.max, row.color),
    }),
    { min: Infinity, max: -Infinity }
  );

  const exampleColorScale = scaleLinear()
    .domain([min, (min + max) / 2, max])
    .range(["orange", "white", "cyan"]);


  return (
    <>
      <div
        style={{
          width: '100%',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h4 className="analyticsMain-header-title">
          Заполнение матрицы навыков
        </h4>
        <XYPlot
          xType="ordinal"
          xDomain={xDomain}
          yType="ordinal"
          yDomain={yDomain}
          margin={{ left: 250, right: 50, top: 30, bottom: 10 }}
          width={700}
          height={500}
        >
          <XAxis orientation="top" />
          <YAxis />
          <HeatmapSeries
            colorType="literal"
            getColor={(d) => exampleColorScale(d.color)}
            style={{
              stroke: "white",
              strokeWidth: "1px",
              rectStyle: {
                rx: 15,
                ry: 15,
              },
            }}
            className="heatmap-series-example"
            data={data[props.activeUser]}
            onValueMouseOver={(v) => setValue(v)}
            onSeriesMouseOut={(v) => setValue(false)}
          />
          <LabelSeries
            style={{ pointerEvents: "none" }}
            data={data[props.activeUser]}
            labelAnchorX="middle"
            labelAnchorY="baseline"
            getLabel={(d) => `${d.color}`}
          />
          {value !== false && <Hint value={value} />}
        </XYPlot>
      </div>
    </>
  );
}

export default MyLabeledHeatmap;
