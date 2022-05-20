import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function PopupEditProfile(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      textButton="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <label className="popup__field">
          <input
            value={name || ''}
            onChange={handleChangeName}
            className="popup__input popup__input_type_name"
            placeholder="Имя"
            type="text"
            name="name"
            id="name-data"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error" id="name-data-error"></span>
        </label>
        <label className="popup__field">
          <input
            value={description || ''}
            onChange={handleChangeDescription}
            className="popup__input popup__input_type_job"
            placeholder="О себе"
            type="text"
            name="about"
            id="job-data"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__input-error" id="job-data-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default PopupEditProfile;
