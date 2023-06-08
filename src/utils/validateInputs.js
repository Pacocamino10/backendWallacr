const { validationResult } = require('express-validator')

module.exports = function (req, res) {
  const { errors } = validationResult(req)

  if (errors.length)
    return res.status(400).send('Los datos recibidos son invalidos')
}
