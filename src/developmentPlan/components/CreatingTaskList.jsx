import React, { useState } from "react";
import MyTextField from "../../utils/MyTextField";
import MyIcons from "../../utils/MyIcons";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import CreatingTaskListItem from "./CreatingTaskListItem";
import MySelect from "../../utils/MySelect";

import "./CreatingTaskList.sass";

export default function CreatingTaskList(props) {
  const [type, setType] = useState('text');
  const types = [
    { id: 'text', title: "Текст" },
    { id: 'select', title: "Выбор статьи" },
  ];
  return (
    <div className="creatingTaskList">
      <div className="creatingTaskList-header">
        <div className="creatingTaskList-header-type">
          <MySelect
            label={"Выбор типа задачи"}
            value={type}
            valueList={types}
            change={(e) => {
              setType(e.target.value);
            }}
          />
        </div>
        <div className="creatingTaskList-header-field">
          {{
            'text': <MyTextField
            label="Задача"
            value={props.task}
            change={(e) => {
              props.setTask(e.target.value);
            }}
          />,
          'select': <MySelect
          label={"Выбор статьи"}
          value={props.task}
          valueList={props.decisionArray}
          change={(e) => {
            props.setTask(e.target.value);
          }}
        />

          }[type]}
        
        <MyIcons click={()=> props.addedTask(type)}>
          <AddBoxRoundedIcon />
        </MyIcons>
        </div>
        
      </div>
      <div className="creatingTaskList-content">
        <div className="creatingTaskList-content-list">
          <span className="creatingTaskList-content-list-title">
            Перечень задач:
          </span>
          {props.list.map((el, ind) => (
            <CreatingTaskListItem
              key={ind}
              index={ind}
              title={el.title}
              id={el.id}
              delete={props.onDeleteItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
