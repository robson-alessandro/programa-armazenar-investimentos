const { Router} = require('express')
const { buscarMovimentacao, buscarDividendos, deletarMovimentacao, deletarDividendo} = require('../controladores/delete')
const rotaDelete = Router()

rotaDelete.get("/movimentacoes/:nome",buscarMovimentacao)
rotaDelete.get("/dividendos/:nome",buscarDividendos)
rotaDelete.delete('/movimentacoes/:id',deletarMovimentacao)
rotaDelete.delete('/dividendos/:id',deletarDividendo)

module.exports= rotaDelete