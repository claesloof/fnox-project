import React from 'react';

const ErrorMessage = ({validated, visited, message}) => {
  return (
    (!validated && visited) ?
      <p style={{color: 'red'}}>{message}</p> : null
  )
}

export default ErrorMessage;
