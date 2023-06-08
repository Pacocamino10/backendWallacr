module.exports = function (err, req, res, next) {
  console.log(err)

  res
    .status(500)
    .send(
      'Disculpe las molestias estámmos trabajando en solucionar el problema'
    )
}
