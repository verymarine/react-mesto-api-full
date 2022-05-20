import React from 'react';
// import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...props}) => {
  return(
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="./sign-in"/>// поменять на /sign-in??, так же можно убрать сравнение с тру 
      }
    </Route>
  )
}

export default ProtectedRoute;