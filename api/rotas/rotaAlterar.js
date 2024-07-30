// este arquivo guarda as rotas responsaveis por alterar os dados do banco de dados

const {Router} = require('express')
const {buscarMovimentacoes, buscarDividendos, alterarDividendo, alterarMovimentacao} = require('../controladores/alterar')
const routerAlterar = Router()

routerAlterar.get("/movimentacoes/:nome",buscarMovimentacoes)
routerAlterar.get('/dividendos/:nome',buscarDividendos)
routerAlterar.put('/dividendo/:id',alterarDividendo)
routerAlterar.put('/movimentacao/:id',alterarMovimentacao)

module.exports = routerAlterar