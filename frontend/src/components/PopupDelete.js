import PopupWithForm from "./PopupWithForm";

function PopupDeleteCard(props) {
  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      textButton="Да"
    ></PopupWithForm>
  );
}
export default PopupDeleteCard;
