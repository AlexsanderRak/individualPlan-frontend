import React, { useState } from "react";
import MyTable from "../../utils/MyTable";
import "./Staff_position.sass";

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

const getUsersFetch = () => {
  return myFetch(config.user, "GET");
};

function Staff_position(props) {
  const [position, setPosition] = useState([]);
  const [checking, setChecking] = useState([]);

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [positionName, setPositionName] = useState("");
  const [hasError, setHasError] = useState(false);

  const getUsers = () => {
    getUsersFetch().then((res) => {
      console.log(res);
      setPosition(res);
    });
  };

  const clearChecking = () => {
    setChecking([]);
  };

  if (!position.length) {
    getUsers();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalType("");
    setPositionName("");
  };

  const clickAdd = () => {
    setModalType("add");
    handleClickOpen();
  };

  const addFetch = () => {
    // myFetch(config.user, "POST", { login, pass, firstName, middleName }).then(
    //   (res) => {
    //     if (res[0]?._id) {
    //       console.log(res);
    //       handleClose();
    //       getUsers();
    //     } else {
    //       console.log(res);
    //       setHasError(true);
    //     }
    //   }
    // );
  };

  const clickEdit = () => {
    setModalType("edit");
    setPositionName(position[checking[0]].positionName);
    handleClickOpen();
  };

  const editFetch = () => {
    // myFetch(config.user, "PUT", {
    //   id: position[checking[0]]._id,
    //   new: { login, pass, firstName, middleName, role },
    // }).then((res) => {
    //   if (res.n > 0) {
    //     console.log(res);
    //     handleClose();
    //     getUsers();
    //   } else {
    //     console.log(res);
    //     setHasError(true);
    //   }
    // });
  };

  const clickDelete = () => {
    console.log("clickDelete");
    setModalType("delete");
    handleClickOpen();
  };

  const deleteFetch = () => {
    // myFetch(config.user, "DELETE", {
    //   id: position[checking[0]]._id,
    // }).then((res) => {
    //   if (res.n > 0) {
    //     console.log(res);
    //     handleClose();
    //     clearChecking();
    //     getUsers();
    //   } else {
    //     console.log(res);
    //   }
    // });
  };

  return (
    <div className="staff_position">
      <div className="staff_position-content">
        <span className="staff_position-content-title">Управление Должностями</span>
        <div className="staff_position-content-header">
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
                    add: "Добавление Должности",
                    edit: "Редактирование Должности",
                    delete: "Вы точно хотите удалить эту Должность ?",
                  }[modalType]
                }
              </DialogTitle>

              <DialogContent>
                {modalType !== "delete" && (
                  <div>
                    <MyTextField
                      label={"Наименование должности"}
                      value={positionName}
                      change={(e) => {
                        setPositionName(e.target.value);
                      }}
                      isError={hasError}
                      errorText={
                        "Должность с таким названием уже существует"
                      }
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
        <div className="staff_position-content-table">
          <MyTable
            isChecked={true}
            headersName={["Наименование должности", "Количество сотрудников"]}
            
           // type = [number, string, date, role, phone, link, array]
            headers={[
              {name: "positionName", type: "string"},
              {name: "numberEmployees", type: "string"},
            ]}
            data={position}
            checking={checking}
            setChecking={setChecking}
          ></MyTable>
        </div>
      </div>
    </div>
  );
}

export default Staff_position;
