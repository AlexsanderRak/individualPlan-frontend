import React, { useState } from "react";
import { useParams } from 'react-router-dom'

import "./KnowledgeBaseCreate.sass";

import MyButton from "../../utils/MyButton";
import MyTextField from "../../utils/MyTextField";
import myFetch from "../../utils/myFetch";
import config from "../../config";
import CryptoJS from "crypto-js";

function KnowledgeBaseCreate(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hasError, setHasError] = useState(false);

  const username = JSON.parse(localStorage.getItem("user"));

  const [pageContent, setPageContent] = useState({});
  const [isSending, setIsSending] = useState(false);

  const { id } = useParams();

  if (id && !isSending) {
    setIsSending(true);
      const articleId = CryptoJS.AES.decrypt(id.replace(/Por21Ld/g, '/'), 'rak').toString(CryptoJS.enc.Utf8);
      myFetch(`${config.decisionGetOne}?id=${articleId}`, "GET").then((res) => {
        // console.log(res);
        setPageContent(res[0]);
        setTitle(res[0].name);
        setDescription(res[0].description);
      });
  }

  const addFetch = () => {
    myFetch(config.decision, "POST", { 
      name: title, 
      companyUid: username.companyUid,
      description, 
      creator: `${username.lastName} ${username.firstName} ${username.patronymic}`, 
      creatorId: username._id,
    }).then(
      (res) => {
        if (res.n > 0) {
          console.log(res);
          window.location.pathname = "/knowledgeBase/search";
        } else {
          console.log(res);
          setHasError(true);
        }
      }
    );
  };

  const updateFetch = () => {
    const newPageContent = {...pageContent};
    delete newPageContent._id;
    myFetch(config.decision, "PUT", {
      id: pageContent._id,
      new: { 
        ...newPageContent,
        name: title, 
        description, 
        editing: `${username.lastName} ${username.firstName} ${username.patronymic}`, 
        editingId: username._id,
        editingDate: new Date().toISOString(),
    }}).then(
      (res) => {
        if (res.n > 0) {
          console.log(res);
          window.location.pathname = "/knowledgeBase/search";
        } else {
          console.log(res);
          setHasError(true);
        }
      }
    );
  };

  return (
    <div className="knowledgeBaseCreate">
      <div className="knowledgeBaseCreate-content">
        <div className="knowledgeBaseCreate-content-form">
          <h3 className="knowledgeBaseCreate-content-form-title">
            {id ? 'Редактирование статьи' : 'Создание статьи'}
          </h3>
          <MyTextField
            label={"Заголовок Статьи"}
            value={title}
            change={(e) => {
              setTitle(e.target.value);
              setHasError(false);
            }}
              isError={hasError}
            errorText={"Статья с таким название уже существует"}
          />
          <MyTextField
            label={"Описание"}
            value={description}
            change={(e) => {
              setDescription(e.target.value);
            }}
            multiline={true}
            rows={16}
          />
          <div className="knowledgeBaseCreate-content-form-footer">
            <MyButton
              click={() => {
                id ? updateFetch() : addFetch();
              }}
            >
              {id ? 'Сохранить' : 'Создать'}
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBaseCreate;
