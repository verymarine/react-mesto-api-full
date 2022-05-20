function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form onSubmit={props.onSubmit} className="popup__form" name={props.name}>
          {props.children}
          <button
          className="popup__button"
          type="submit">
            {props.textButton}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
