import React, { useState } from "react";
import "./Auth.sass";
import Auth_login from "../components/Auth_login";
import Auth_registration from "../components/Auth_registration";


function Auth(props) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth">
      <div className="auth-content">
        <div className="auth-content-form">
          <span className="auth-content-form-header">
            Необходимо выполнить  {isLogin ? 'Вход' : 'Регистрацию'}
          </span>
          {isLogin ? 
            <Auth_login></Auth_login> 
            : 
            <Auth_registration></Auth_registration>
          }
          <span className="auth-content-form-footer" onClick={()=>setIsLogin(!isLogin)}> {isLogin ? 'Регистрация' : 'Вход'}</span>
        </div>
      </div>
    </div>
  );
}

export default Auth;
