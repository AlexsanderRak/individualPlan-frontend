import React, { useState } from "react";
import MyTable from "../../utils/MyTable";
import "./Users.sass";

import myFetch from "../../utils/myFetch";
import config from "../../config";
import MyTableContol from "../../utils/MyTableContol";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MyButton from "../../utils/MyButton";
import MyTextField from "../../utils/MyTextField";
import MySelect from "../../utils/MySelect";

const getUsersFetch = (companyUid) => {
  return myFetch(`${config.user}?companyUid=${companyUid}`, "GET");
};

function Users(props) {
  const [users, setUsers] = useState([]);
  const [checking, setChecking] = useState([]);

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [hasError, setHasError] = useState(false);
  const [role, setRole] = useState('');
  const [sendCounter, setSendCounter] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  
  const getUsers = () => {
    getUsersFetch(user.companyUid).then((res) => {
      console.log(res);
      setUsers(res);
    });
  };

  const clearChecking = () => {
    setChecking([]);
  };

  if (!users.length && sendCounter < 1) {
    setSendCounter(sendCounter + 1);
    getUsers();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalType("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPatronymic("");
    setHasError(false);
    setRole("");
  };

  const clickAdd = () => {
    setModalType("add");
    handleClickOpen();
  };

  const addFetch = () => {
    myFetch(config.user, "POST", { email, firstName, lastName, patronymic, role, companyUid: user?.companyUid }).then(
      (res) => {
        if (res[0]?._id) {
          console.log(res);
          handleClose();
          getUsers();
        } else {
          console.log(res);
          setHasError(true);
        }
      }
    );
  };

  const clickEdit = () => {
    setModalType("edit");
    setEmail(users[checking[0]].email);
    setFirstName(users[checking[0]].lastName);
    setLastName(users[checking[0]].firstName);
    setPatronymic(users[checking[0]].patronymic);
    setRole(users[checking[0]].role);
    handleClickOpen();
  };

  const editFetch = () => {
    myFetch(config.user, "PUT", {
      id: users[checking[0]]._id,
      new: { email, lastName, firstName, patronymic, role },
    }).then((res) => {
      if (res.n > 0) {
        console.log(res);
        handleClose();
        getUsers();
      } else {
        console.log(res);
        setHasError(true);
      }
    });
  };

  const clickDelete = () => {
    console.log("clickDelete");
    setModalType("delete");
    handleClickOpen();
  };

  const deleteFetch = () => {
    myFetch(config.user, "DELETE", {
      id: users[checking[0]]._id,
    }).then((res) => {
      if (res.n > 0) {
        console.log(res);
        handleClose();
        clearChecking();
        getUsers();
      } else {
        console.log(res);
      }
    });
  };

  return (
    <div className="users">
      <div className="users-content">
        <div className="users-content-header">
          <MyTableContol
            checking={checking}
            isChecked={true}
            clickAdd={clickAdd}
            isActiveAdd={true}
            clickEdit={clickEdit}
            isActiveEdit={true}
            clickDelete={clickDelete}
            isActiveDelete={true}
          >
            <Dialog
              open={open}
              onClose={handleClose}
              className="tableContol-dialog"
            >
              <DialogTitle>
                {
                  {
                    add: "Добавление пользователя",
                    edit: "Редактирование пользователя",
                    delete: "Вы точно хотите удалить этого пользователя ?",
                  }[modalType]
                }
              </DialogTitle>

              <DialogContent>
                {modalType !== "delete" && (
                  <div>
                    <MyTextField
                      label={"Email"}
                      value={email}
                      change={(e) => {
                        setEmail(e.target.value);
                      }}
                      isError={hasError}
                      errorText={
                        "Пользователь с таким Email существует"
                      }
                    />
                     <MyTextField
                      label={"Фамилия"}
                      value={lastName}
                      change={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                    <MyTextField
                      label={"Имя"}
                      value={firstName}
                      change={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                    <MyTextField
                      label={"Отчество"}
                      value={patronymic}
                      change={(e) => {
                        setPatronymic(e.target.value);
                      }}
                    />
                    <MySelect
                      label={"Роль"}
                      value={role}
                      valueList= {[{id:'12', title: 'Менеджер'}, {id:'13', title: 'Сотрудник'}]}
                      change={(e) => {
                        setRole(e.target.value);
                      }}
                    />
                  </div>
                )}
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
                    edit: (
                      <>
                        <MyButton click={editFetch}>Редактировать</MyButton>
                        <MyButton click={handleClose}>Отмена</MyButton>
                      </>
                    ),
                    delete: (
                      <>
                        <MyButton click={deleteFetch}>Удалить</MyButton>
                        <MyButton click={handleClose}>Отмена</MyButton>
                      </>
                    ),
                  }[modalType]
                }
              </DialogActions>
            </Dialog>
          </MyTableContol>
        </div>
        <div className="users-content-table">
          <MyTable
            isChecked={true}
            headersName={[
            "Email", "Фамилия", 
            "Имя", "Отчество", "Дата рождения", "Роль",
            "Телефон", "Должность", "План развития",
            "Ментор", "Менеджер", "Статьи", "Сылка для активации пользователя",
            "Матрица навыков", "Дата активации профиля", "Дата последней активности",
          ]}
          // type = [number, string, date, role, phone, link, array]
            headers={[ 
            {name: "email", type: "string"},
            {name: "lastName", type: "string"},
            {name: "firstName", type: "string"},
            {name: "patronymic", type: "string"},
            {name: "dateBirth", type: "date"},
            {name: "role", type: "role"},
            {name: "phoneNumber", type: "phone"},
            {name: "position", type: "string"},
            {name: "activePlanUrl", type: "link"},
            {name: "mentor", type: "string"},
            {name: "manager", type: "string"},
            {name: "articles", type: "array"},
            {name: "activeProfileLink", type: "link"},
            {name: "skillMatrixUrl", type: "link"},
            {name: "dateActiveProfile", type: "date"},
            {name: "dateLastActive", type: "date"},
          ]}
            data={users}
            checking={checking}
            setChecking={setChecking}
          ></MyTable>
        </div>
      </div>
    </div>
  );
}

export default Users;
