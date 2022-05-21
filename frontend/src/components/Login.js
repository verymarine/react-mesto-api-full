import { errorMonitor } from "events";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth";
import Header from "./Header";

function Login({ onLogin, submitAuthorize, toolTipStatus, onToolTip }) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }
    submitAuthorize(values.email, values.password);
  };

  return (
    <>
      <Header textAuth="Регистрация" linkHeader="signup" />
      <div className="login">
        <p className="login__title">Вход</p>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            className="login__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            className="login__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={values.password}
            onChange={handleChange}
          />

          <button
            className="login__button"
            type="submit"
            onSubmit={handleSubmit}
          >
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default withRouter(Login);
