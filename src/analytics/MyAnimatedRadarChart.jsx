import React, { useState } from "react";

import { RadialChart } from "react-vis";

function MyAnimatedRadarChart(props) {
  const myData = [
    [
      { angle: 2, radius: 20, label: "Программирование" },
      { angle: 3, radius: 40, label: "Теория" },
      { angle: 6, radius: 30, label: "Навыки" },
    ],
    [
      { angle: 5, radius: 70, label: "Теория" },
      { angle: 5, radius: 40, label: "Навыки" },
      { angle: 5, radius: 70, label: "Программирование" },
    ],
    [
      { angle: 5, radius: 60, label: "Навыки" },
      { angle: 5, radius: 30, label: "Теория" },
      { angle: 6, radius: 50, label: "Программирование" },
    ],
    [
      { angle: 7, radius: 70, label: "Программирование" },
      { angle: 4, radius: 70, label: "Теория" },
      { angle: 5, radius: 50, label: "Навыки" },
    ],
    [
      { angle: 5, radius: 80, label: "Программирование" },
      { angle: 6, radius: 60, label: "Теория" },
      { angle: 5, radius: 40, label: "Навыки" },
    ],
  ];

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <h4 className="analyticsMain-header-title">Развитие сотрудника в разных сферах</h4>
      <RadialChart data={myData[props.activeUser]} showLabels={true} width={300} height={300} />
    </div>
      
    </>
  );
}

export default MyAnimatedRadarChart;
