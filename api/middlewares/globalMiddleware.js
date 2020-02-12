function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const time = new Date();

  console.log(`METHOD: ${method}, URL: ${url},   TIME: ${time}`);
  next();
}

module.exports = {
  logger
};
