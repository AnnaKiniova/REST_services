class userError extends Error {
  constructor(statusCode, descr) {
    super();
    this.descr = descr;
    this.statusCode = statusCode;
  }
}

const handleError = (err, res) => {
  const { statusCode, descr } = err;
  res.status(statusCode).json({ statusCode, descr });
};
module.exports = { userError, handleError };
