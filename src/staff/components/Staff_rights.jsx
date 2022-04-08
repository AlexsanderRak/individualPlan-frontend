import React, { useState } from "react";
import "./Staff_rights.sass";
import config from "../../config";

import MyButton from "../../utils/MyButton";
import MyTextField from "../../utils/MyTextField";
import myFetch from "../../utils/myFetch";

function Staff_rights(props) {
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginFetch = () => {
    myFetch(config.login, "POST", { login: login, pass: password }).then(
      (res) => {
        if (res?._id) {
          console.log(res);
          localStorage.setItem("user", JSON.stringify(res));
          window.location.pathname = "/chats";
        } else {
          console.log(res);
          setIsErrorLogin(true);
          setIsErrorPassword(true);
        }
      }
    );
  };

  return (
    <>
      <div className="Auth_registration">
        <MyTextField
          label="Наименование Фирмы"
          change={(e) => {
            setLogin(e.target.value);
            setIsErrorLogin(false);
            setIsErrorPassword(false);
          }}
          value={login}
          isError={isErrorLogin}
          errorText="Пожалуйста, введите корректный Наименование Фирмы"
        />
        <MyTextField
          label="ИНН Фирмы"
          change={(e) => {
            setPassword(e.target.value);
            setIsErrorPassword(false);
            setIsErrorLogin(false);
          }}
          value={password}
          isError={isErrorPassword}
          errorText="Пожалуйста, введите корректный ИНН Фирмы"
        />
        <MyTextField
          label="Колличество сотрудников"
          change={(e) => {
            setLogin(e.target.value);
            setIsErrorLogin(false);
            setIsErrorPassword(false);
          }}
          value={login}
          isError={isErrorLogin}
          errorText="Пожалуйста, введите корректный Колличество сотрудников"
        />
        <MyTextField
          label="Email"
          change={(e) => {
            setLogin(e.target.value);
            setIsErrorLogin(false);
            setIsErrorPassword(false);
          }}
          value={login}
          isError={isErrorLogin}
          errorText="Пожалуйста, введите корректный Email"
        />
      </div>

      <div className="Auth_registration-footer">
        <MyButton
          click={() => {
            loginFetch();
          }}
        >
          Регистрация
        </MyButton>
      </div>
    </>
  );
}

export default Staff_rights;
