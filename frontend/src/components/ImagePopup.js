function ImagePopup(props) {
  return (
    <div
      className={`popup popup_picture ${
        props.card.name && props.card.link && "popup_opened"
      }`}
    >
      <div className="popup__block">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="popup__capture">{props.card.name}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;
