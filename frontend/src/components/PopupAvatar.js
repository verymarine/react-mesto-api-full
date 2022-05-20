import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAvatar(props) {
  const avatarRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      textButton="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <label className="popup__field">
          <input
            ref={avatarRef}
            className="popup__input popup__input_type_avatar"
            placeholder="Ссылка на аватар"
            type="url"
            name="avatar"
            id="avatar-data"
            required
          />
          <span className="popup__input-error" id="avatar-data-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default PopupAvatar;
