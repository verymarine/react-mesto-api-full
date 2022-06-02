import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = ` ${
    isOwn ? "content__trashcan" : "content__trashcan_type_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ` ${
    !isLiked ? "content__liked" : "content__like" //
  }`;

  return (
    <article className="content__grid">
      <img
        className="content__image"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      <div className="content__info">
        <h2 className="content__title">{props.name}</h2>
        <div className="like__area">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="content__like-counter">{props.likes.length}</p>
        </div>
        <button
          className={cardDeleteButtonClassName}
          type="button"
          onClick={handleDeleteClick}
        ></button>
      </div>
    </article>
  );
};

export default Card;
