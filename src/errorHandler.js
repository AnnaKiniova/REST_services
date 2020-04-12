class UserError extends Error {
  constructor(statusCode, description) {
    super();
    this.statusCode = statusCode;
    this.description = description;
  }
}

const handleError = (err, req, res) => {
  const { statusCode, description } = err;
  res.status(statusCode).json({ statusCode, description });
};
module.exports = { UserError, handleError };
