import React, { useState } from "react";
import "./Skill_box.sass";

import MySelect from "../../utils/MySelect";

export default function Skill_box(props) {

  return (
    <>
      <div className="skill_box">
        <span className="skill_box-name">{props.name}</span>
         <MySelect
          label="Уровень знания"
          value={props.knowledgeLevel}
          disabled={props.disabled}
          valueList={[
            { id: "0", title: "Хочу изучить" },
            { id: "1", title: "Intern" },
            { id: "2", title: "Junior" },
            { id: "3", title: "Middle" },
            { id: "4", title: "Senior" },
            { id: "5", title: "Expert" },
          ]}
          change={(e) => {
            props.setLevel(e.target.value);
          }}
        />
      </div>
    </>
  );
};