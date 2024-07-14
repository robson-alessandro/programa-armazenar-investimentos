const { Router} = require('express')
const { buscarMovimentacao } = require('../controladores/delete')
const rotaDelete = Router()

rotaDelete.get("/:nome",buscarMovimentacao)

module.exports= rotaDelete