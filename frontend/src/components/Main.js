import api from "../utils/Api.js";
import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header.js";

function Main(props) {
  // подписать его на CurrentUserContext и получить значение контекста.
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        textAuth="Выйти"
        linkHeader="signin"
        exit={props.exit}
        status={props.status}
        // userEmail={props.userEmail}
        userEmail={props.userEmail}
      />
      <main className="main">
        <section className="profile">
          <div className="profile__block">
            <button
              className="profile__button-avatar"
              onClick={props.onEditAvatar}
              type="button"
            ></button>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фотография пользователя"
            />

            <div className="profile__info">
              <div className="profile__content">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button
                  className="profile__button"
                  type="button"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <p className="profile__job">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="content">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              link={card.link}
              name={card.name}
              likes={card.likes}
              owner={card.owner}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}
export default Main;
