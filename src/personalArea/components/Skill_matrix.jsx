import React, { useState } from "react";
import { useParams } from 'react-router-dom'

import CryptoJS from "crypto-js";

import "./Skill_matrix.sass";
import config from "../../config";

import MyButton from "../../utils/MyButton";
import MyTextField from "../../utils/MyTextField";
import MyAccordion from "../../utils/MyAccordion";
import myFetch from "../../utils/myFetch";
import Skill_box from "./Skill_box";

const matrixData = [
  {
    title: 'Теория',
    code: 'theory',
    content: [
      {
        id: 0, 
        name: "Структуры данных", 
        knowledgeLevel: ""
      },
      { 
        id: 1, 
        name: "Алгоритмы", 
        knowledgeLevel: "" 
      },
      {
        id: 2,
        name: "Системное программирование",
        knowledgeLevel: "",
      },
    ]
  },
  {
    title: 'Навыки',
    code: 'skills',
    content: [
      { 
        id: 0, 
        name: "Автоматизация build'ов", 
        knowledgeLevel: "" 
      },
      {
        id: 1,
        name: "Автоматизация тестирования",
        knowledgeLevel: "",
      },
    ]
  },
  {
    title: 'Программирование',
    code: 'programming',
    content: [
      { 
        id: 0, 
        name: "Декомпозиция задачи", 
        knowledgeLevel: "" 
      },
      { 
        id: 1, 
        name: "Декомпозиция системы", 
        knowledgeLevel: "" 
      },
      { 
        id: 2, 
        name: "Общение", 
        knowledgeLevel: "" 
      },
      {
        id: 3,
        name: "Организация кода в файле",
        knowledgeLevel: "",
      },
      {
        id: 4,
        name: "Организация кода между файлами",
        knowledgeLevel: "",
      },
      {
        id: 5,
        name: "Организация дерева исходников",
        knowledgeLevel: "",
      },
      {
        id: 6, 
        name: "Читабельность кода", 
        knowledgeLevel: "" 
      },
      {
        id: 7,
        name: "Безопасное программирование (defensive coding)",
        knowledgeLevel: "",
      },
      {
        id: 8, 
        name: "Обработка ошибок", 
        knowledgeLevel: "" 
      },
      {
        id: 9,
        name: "Среда программирования (IDE)",
        knowledgeLevel: "",
      },
      {
        id: 10, 
        name: "API", 
        knowledgeLevel: ""
      },
      { 
        id: 11, 
        name: "Фреймфорки", 
        knowledgeLevel: ""
      },
      { 
        id: 12, 
        name: "Требования", 
        knowledgeLevel: "" 
      },
      { 
        id: 13, 
        name: "Скрипты",
        knowledgeLevel: "" 
      },
      { 
        id: 14, 
        name: "Базы Данных", 
        knowledgeLevel: "" 
      },
    ]
  },
]



function Skill_matrix(props) {
  const [newMatrixData, setNewMatrixData] = useState(matrixData);
  const [isSending, setIsSending] = useState(false);

  const { personId } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!isSending) {
    setIsSending(true);
    if (personId) {
      const id = CryptoJS.AES.decrypt(personId.replace(/Por21Ld/g, '/'), 'rak').toString(CryptoJS.enc.Utf8);
      myFetch(`${config.userSkillMatrix}?id=${id}`, "GET").then((res) => {
        // console.log(res);
        setNewMatrixData(res);
      });
    } else {
      myFetch(`${config.userSkillMatrix}?id=${user._id}`, "GET").then((res) => {
        console.log(res);
        if (res.length) {
          setNewMatrixData(res);
        }
        
      });
    }
  }
  

  const saveMatrix = () => {
    myFetch(config.userSkillMatrix, "PUT", {
      id: user._id,
      new: {...user, skillMatrix: newMatrixData},
    }).then((res) => {
      if (res) {
        // console.log(res);
        localStorage.setItem("user", JSON.stringify(res));
      } else {
        console.log(res);
      }
    });
  };

  const setMatridData = (code, id, value)=> {

    let data = [...newMatrixData];

    for (let index = 0; index < data?.length; index++) {
      if (data[index].code === code) {
        for (let ind = 0; ind < data[index]?.content?.length; ind++) {
          const element = data[index]?.content[ind];
          if (element.id === id) {
            element.knowledgeLevel = value;
            break;
          }
        }
        break;
      }
    }

    setNewMatrixData(data);
  }

  return (
    <>
      <div className="skill_matrix">
        <div className="skill_matrix-content">
          <span className="skill_matrix-content-title">Матрица навыков</span>
          <div className="skill_matrix-content-data">

            {newMatrixData.map((el,ind)=>
             <MyAccordion key={ind} title={el.title}>
               <div className="skill_matrix-content-data-box">
               {el?.content?.map((element, index) => (
                  <Skill_box
                    key={index}
                    id={element.id}
                    name={element.name}
                    disabled={!!personId}
                    knowledgeLevel={element.knowledgeLevel}
                    setLevel={(value)=>setMatridData(el.code, element.id, value)}
                  ></Skill_box>
               ))}
               </div>
             </MyAccordion>
            )}
           
          </div>
          <div className="skill_matrix-content-footer">
            <MyButton
              click={saveMatrix}
              disabled={!!personId}
            >
              Сохранить
            </MyButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Skill_matrix;
