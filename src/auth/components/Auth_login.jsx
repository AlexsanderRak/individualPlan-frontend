import React, { useState } from "react";
import "./Auth_login.sass";
import config from "../../config";

import MyButton from "../../utils/MyButton";
import MyTextField from "../../utils/MyTextField";
import myFetch from "../../utils/myFetch";

function Auth_login(props) {
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFetch = () => {
    myFetch(config.auth, "POST", { email: email, pass: password }).then(
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
      <div className="auth_login">
        <MyTextField
          label="Email"
          change={(e) => {
            setEmail(e.target.value);
            setIsErrorLogin(false);
            setIsErrorPassword(false);
          }}
          value={email}
          isError={isErrorLogin}
          errorText="Пожалуйста, введите корректный Email"
        />
        <MyTextField
          label="Пароль"
          type="password"
          change={(e) => {
            setPassword(e.target.value);
            setIsErrorPassword(false);
            setIsErrorLogin(false);
          }}
          value={password}
          isError={isErrorPassword}
          errorText="Пожалуйста, введите корректный Пароль"
        />
      </div>

      <div className="auth_login-footer">
        <MyButton
          click={() => {
            loginFetch();
          }}
        >
          Войти
        </MyButton>
      </div>
    </>
  );
}

export default Auth_login;
