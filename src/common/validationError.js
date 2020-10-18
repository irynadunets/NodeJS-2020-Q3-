const { INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND, getStatusText } = require('http-status-codes');

class ValidationError extends Error {
  constructor() {
    super();
    status = INTERNAL_SERVER_ERROR || BAD_REQUEST || NOT_FOUND;
    text = getStatusText(this.status);
    Error.captureStackTrace(this, ValidationError);
  }  
}

const notFound = NOT_FOUND;

module.exports = { notFound, ValidationError }
