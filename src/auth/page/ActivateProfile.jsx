import React, { useState } from "react";
import { useParams } from 'react-router-dom'

import CryptoJS from "crypto-js";

import "./ActivateProfile.sass";

import config from "../../config";

import MyButton from "../../utils/MyButton";
import MyTextField from "../../utils/MyTextField";
import myFetch from "../../utils/myFetch";
import MySelect from "../../utils/MySelect";

function ActivateProfile(props) {
  
  const { email } = useParams();
  const { pass } = useParams();

  const emailSending = CryptoJS.AES.decrypt(email.replace(/Por21Ld/g, '/'), 'rak').toString(CryptoJS.enc.Utf8);
  const passSending = CryptoJS.AES.decrypt(pass.replace(/Por21Ld/g, '/'), 'rak').toString(CryptoJS.enc.Utf8);

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const creatPass = ()=> {
    if (password !== repeatPassword) {
      setIsErrorPassword(true);
    } else {
      myFetch(config.activeProfile, 'POST', {email: emailSending, pass: passSending,  newPassword: password})
      .then((res) => {
        if(res?._id) {
          console.log(res);
          localStorage.setItem('user', JSON.stringify(res));
          window.location.pathname = '/chats';
        } else {
          console.log(res);
          setIsErrorPassword(true);
        }
      });
    }
  }

  return (
    <div className="auth_personal">
      <div className="auth_personal-content">
        <div className="auth_personal-content-form">
          <span className="auth_personal-content-form-header">
            Необходимо создать пароль
          </span>
          <div className="auth_personal-content-form-block">
            <MyTextField
              label="Email"
              placeholder="email@gmail.com"
              disabled= {true}
              value={emailSending}
              errorText="Пожалуйста, введите корректный Email"
            />
             <MyTextField
              label="Пароль"
              change={(e) => {
                setPassword(e.target.value);
                setIsErrorPassword(false);
              }}
              value={password}
              isError={isErrorPassword}
              errorText="Пароли не совпадают"
            />
            <MyTextField
              label="Повторите Пароль"
              change={(e) => {
                setRepeatPassword(e.target.value);
                setIsErrorPassword(false);
              }}
              value={repeatPassword}
              isError={isErrorPassword}
              errorText="Пароли не совпадают"
            />
          </div>

          <div className="auth_registration-footer">
            <MyButton
              click={() => {
                creatPass();
              }}
            >
              Активировать профиль
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivateProfile;
