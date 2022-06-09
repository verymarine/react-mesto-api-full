import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Header from "./Header";
import * as auth from "../utils/auth";

function Register(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.email || values.password) {
      props.submitRegister(values.email, values.password);
      // auth
      //   .register(email, password)
      //   .then((res) => {
      //     if (res.email) {
      //       setToolTip(true);
      //       setToolTipStatus(true);
      //       history.push("/signin"); // если проверка пароля прошла успешно то мы редеректим на страницу авторизации
      //     }
      //   })
      //   .catch((err) => {
      //     console.log('HERE');
      //     setToolTip(true);
      //     setToolTipStatus(false);
      //     console.log("Error at register", err);
      //   });








      // auth
      //   .register(values.email, values.password)
      //   .then((res) => {
      //     if (res.data._id) {
      //       props.toolTipStatus(true);
      //       props.onToolTip(); // по дефолту значение тру
      //       history.push("/sign-in"); // если проверка пароля прошла успешно то мы редеректим на страницу авторизации
      //     }
      //   })
      //   .catch((err) => {
      //     props.toolTipStatus(false);
      //     props.onToolTip();
      //     console.log("Error at register", err);
      //   });
    }
  };

  return (
    <>
      <Header textAuth="Войти" linkHeader="signin" />
      <div className="register">
        <p className="register__title">Регистрация</p>
        <form onSubmit={handleSubmit} className="register__form">
          <input
            className="register__input"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            className="register__input"
            placeholder="Пароль"
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            // onSubmit={handleSubmit}
            className="register__button"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  );
}
export default withRouter(Register);
