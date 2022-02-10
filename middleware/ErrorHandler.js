const ErrorHandler = (err, req, res, next) => {
  console.log(err);
  let status
  let message

  switch (err.name) {
    case 'INVALID_CREDENTIALS':
      status = 400
      message = 'Invalid Email or Password'
      break;

    case 'NOT_FOUND':
      status = 404
      message = 'Not Found !'
      break;

    case 'FORBIDDEN_ACCESS':
    case 'JsonWebTokenError':
      status = 403 
      message = 'Forbidden Action'
      break;

    case 'MAX_COLS':
      status = 400
      message = 'Max Seat Column is 27'
      break;

    default:
      status = 500
      message = 'Internal Server Error'
  }

  res.status(status).json({
    message
  })
}

module.exports = ErrorHandler