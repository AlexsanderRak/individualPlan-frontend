import React, { useState } from "react";
import "./KnowledgeBaseSearch.sass";

import myFetch from "../../utils/myFetch";
import config from "../../config";
import MyTableContol from "../../utils/MyTableContol";
import MyTable from "../../utils/MyTable";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MyButton from "../../utils/MyButton";
import MyTextField from "../../utils/MyTextField";

const getDecisionFetch = (companyUid) => {
  return myFetch(`${config.decision}?companyUid=${companyUid}`, "GET");
};

const getDecisionSearchFetch = (data) => {
  return myFetch(config.decisionSearch, "POST", data);
};

function KnowledgeBaseSearch(props) {
  const [decision, setDecision] = useState([]);
  const [isSend, setIsSend] = useState(false);

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState("");
  const username = JSON.parse(localStorage.getItem("user"));

  const getDecision = () => {
    setIsSend(true);
    getDecisionFetch(username.companyUid).then((res) => {
      console.log(res);
      setDecision(res);
    });
  };

  const getDecisionSearch = () => {
    getDecisionSearchFetch({search, companyUid:username.companyUid}).then((res) => {
      console.log(res);
      setDecision(res);
    });
  };

  if (!isSend) {
    getDecision();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalType("");
    setName("");
    setDescription("");
    setHasError(false);
  };

  const clickAdd = () => {
    window.location.pathname = "/knowledgeBase/create";
    // setModalType("add");
    // handleClickOpen();
  };

  const addFetch = () => {
    myFetch(config.decision, "POST", { 
      name, 
      companyUid: username.companyUid,
      description, 
      creator: `${username.lastName} ${username.firstName} ${username.patronymic}`, 
      creatorId: username._id,
    }).then(
      (res) => {
        if (res.n > 0) {
          console.log(res);
          handleClose();
          getDecision();
        } else {
          console.log(res);
          setHasError(true);
        }
      }
    );
  };

  return (
    <div className="knowledgeBase">
      <div className="knowledgeBase-content">
        <div className="knowledgeBase-content-header">
          <MyTableContol
            isSearchable={true}
            search={search}
            setSearch={setSearch}
            searchClick={getDecisionSearch}
            clickAdd={clickAdd}
            isActiveAdd={true}
          >
            <Dialog
              open={open}
              onClose={handleClose}
              className="tableContol-dialog"
            >
              <DialogTitle>
                {
                  {
                    add: "Добавление решения",
                  }[modalType]
                }
              </DialogTitle>

              <DialogContent>
               
                  <div>
                    <MyTextField
                      label={"Название"}
                      value={name}
                      change={(e) => {
                        setName(e.target.value);
                        setHasError(false);
                      }}
                      isError={hasError}
                      errorText={
                        "Решение с таким название уже существует"
                      }
                    />
                    <MyTextField
                      label={"Описание"}
                      value={description}
                      change={(e) => {
                        setDescription(e.target.value);
                        setHasError(false);
                      }}
                    />
                  </div>
              </DialogContent>

              <DialogActions>
                {
                  {
                    add: (
                      <>
                        <MyButton click={addFetch}>Создать</MyButton>
                        <MyButton click={handleClose}>Отмена</MyButton>
                      </>
                    ),
                  }[modalType]
                }
              </DialogActions>
            </Dialog>
          </MyTableContol>
        </div>
        <div className="knowledgeBase-content-table">
          <MyTable
            isChecked={false}
            headersName={["Наименование", "Описание", "Создатель", "Дата", "Внёс изменения", "Дата изменений", "URL Статьи"]}
            
             // type = [number, string, date, role, phone, link, array]
            headers={[
              {name: "name", type: "string"},
              {name: "description", type: "string"},
              {name: "creator", type: "string"},
              {name: "creatingDate", type: "date"},
              {name: "editing", type: "string"},
              {name: "editingDate", type: "date"},
              {name: "articleUrl", type: "link"},
            ]}
            data={decision}
          ></MyTable>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBaseSearch;
