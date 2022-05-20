import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddCard(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  },[ props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      textButton="Создать"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <label className="popup__field">
          <input
            value={name}
            onChange={handleChangeName}
            className="popup__input popup__input_type_place"
            placeholder="Название"
            type="text"
            name="name"
            id="place-data"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__input-error" id="place-data-error"></span>
        </label>
        <label className="popup__field">
          <input
            value={link}
            onChange={handleChangeLink}
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            type="url"
            name="link"
            id="url-data"
            required
          />
          <span className="popup__input-error" id="url-data-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default PopupAddCard;
