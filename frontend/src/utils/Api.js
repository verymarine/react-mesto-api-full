function response(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
}

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfo(jwt) {
    return fetch(`${this._url}/users/me`, {

    credentials: 'include',
      headers: this._headers,
      // authorization : jwt,
      // cookie: jwt,
    }).then(response);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {

    credentials: 'include',
      headers: this._headers,
    }).then(response);
  }

  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",

      credentials: 'include',
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(response);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",

      credentials: 'include',
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(response);
  }

  deleteCard(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: "DELETE",

      credentials: 'include',
      headers: this._headers,
    }).then(response);
  }

  putLike(dataId) {
    return fetch(`${this._url}/cards/${dataId}/likes`, {
      method: "PUT",

      credentials: 'include',
      headers: this._headers,
    }).then(response);
  }

  deleteLike(dataId) {
    return fetch(`${this._url}/cards/${dataId}/likes`, {
      method: "DELETE",

      credentials: 'include',
      headers: this._headers,
    }).then(response);
  }

  changeLikeCardStatus(dataId, isLiked) {
    return fetch(`${this._url}/cards/${dataId}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,

      credentials: 'include',
      headers: this._headers,
    }).then(response);
  }

  patchAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",

      credentials: 'include',
      headers: this._headers,

      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(response);
  }

  // postCards(data) {
  //   return fetch(`${this._url}/cards`, {
  //     method: 'POST',
  //     headers: this._headres,
  //     body: JSON.stringify({
  //       name: data.name,
  //       link: data.link
  //     })
  //   })
  //     .then(response)

  // }

  // getCard() {
  //   return fetch(`${this._url}/cards`, {
  //     headers: {
  //       authorization: `81162f22-64ce-4f78-ae05-3469a7d16e15`,
  //     },
  //   }).then((response) => { // result
  //     if (response.ok) {
  //       return response.json()
  //     } else {
  //       return Promise.reject(`ошибка ${response.status}`);
  //     }
  //   });
  // }

  // addMessage(data) {
  //   return fetch()
  // }
}

const api = new Api({
  url: 'https://api.verymarine.domain.nomoreparties.sbs',
  // url: 'http://localhost:3000',
  headers: {
    // authorization: localStorage.jwt,
    // "Cookie": ("token"),
    // "authorization": localStorage.jwt,
    "Content-Type": `application/json`,
  },
});

export default api;
