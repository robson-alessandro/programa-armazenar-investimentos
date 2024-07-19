const { Router} = require('express')
const { buscarMovimentacao, buscarDividendos} = require('../controladores/delete')
const rotaDelete = Router()

rotaDelete.get("/movimentacoes/:nome",buscarMovimentacao)
rotaDelete.get("/dividendos/:nome",buscarDividendos)
rotaDelete.delete('/:id',)

module.exports= rotaDelete