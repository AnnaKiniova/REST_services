class UserError extends Error {
  constructor(statusCode, descr) {
    super();
    this.descr = descr;
    this.statusCode = statusCode;
  }
}

const handleError = (err, req, res) => {
  console.log('in handler');
  const { statusCode, descr } = err;
  res.status(statusCode).json({ statusCode, descr });
};
module.exports = { UserError, handleError };