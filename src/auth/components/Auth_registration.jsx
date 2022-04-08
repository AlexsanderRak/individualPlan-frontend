import React, { useState } from "react";
import "./Auth_registration.sass";
import config from "../../config";

import MyButton from "../../utils/MyButton";
import MyTextField from "../../utils/MyTextField";
import myFetch from "../../utils/myFetch";
import MySelect from "../../utils/MySelect";

function Auth_registration(props) {
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [uNPFirms, setUNPFirms] = useState("");
  const [numberEmployees, setNumberEmployees] = useState('');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const registrationFetch = () => {
    const fullNameArr = fullName.split(' ');

    myFetch(config.regestration, "POST", { 
      companyName: companyName,
      uNPFirms: uNPFirms,
      numberEmployees: numberEmployees,
      fullName: fullName,
      lastName: fullNameArr[0],
      firstName: fullNameArr[1],
      patronymic: fullNameArr[2],
      email: email,
      pass: password,
      }).then(
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
      <div className="auth_registration">
        <MyTextField
          label="Наименование Фирмы"
          placeholder="ОАО 'Компания'"
          change={(e) => {
            setCompanyName(e.target.value);
            setIsErrorLogin(false);
            setIsErrorPassword(false);
          }}
          value={companyName}
          isError={isErrorLogin}
          errorText="Пожалуйста, введите корректное Наименование Фирмы"
        />
        <MyTextField
          label="УНП Фирмы"
          placeholder="123456789"
          change={(e) => {
            setUNPFirms(e.target.value);
            setIsErrorPassword(false);
            setIsErrorLogin(false);
          }}
          value={uNPFirms}
          isError={isErrorPassword}
          errorText="Пожалуйста, введите корректный УНП Фирмы"
        />
         <MySelect
          label="Количество сотрудников"
          value={numberEmployees}
          valueList={[
            { id: "1", title: "до 50 человек" },
            { id: "2", title: "до 100 человек" },
            { id: "3", title: "до 150 человек" },
            { id: "4", title: "до 250 человек" },
            { id: "5", title: "больше 300 человек" },
          ]}
          errorText="Пожалуйста, введите корректное Количество сотрудников"
          change={(e) => {
            setNumberEmployees(e.target.value);
          }}
        />
         <MyTextField
          label="ФИО"
          placeholder="Иванов Иван Иванович"
          change={(e) => {
            setFullName(e.target.value);
            setIsErrorPassword(false);
            setIsErrorLogin(false);
          }}
          value={fullName}
          isError={isErrorPassword}
          errorText="Пожалуйста, введите корректное ФИО"
        />
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
          change={(e) => {
            setPassword(e.target.value);
            setIsErrorLogin(false);
            setIsErrorPassword(false);
          }}
          value={password}
          isError={isErrorLogin}
          errorText="Пожалуйста, введите корректный Пароль"
        />
      </div>

      <div className="auth_registration-footer">
        <MyButton
          click={() => {
            registrationFetch();
          }}
        >
          Регистрация
        </MyButton>
      </div>
    </>
  );
}

export default Auth_registration;
