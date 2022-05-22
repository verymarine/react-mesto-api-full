//
export const BASE_URL = 'https://api.verymarine.domain.nomoreparties.sbs';

//
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  })
  .catch((err) => console.log(err))
}

//
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`,{
    method: 'POST',
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return response.json();
  })
  // .then((data) => {

  // }
  .catch((err) => console.log(err))
}

//
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}` 
    }
  })
  .then(res => res.json())
  .then(data => data)
  .catch(err => console.log(err))
}
