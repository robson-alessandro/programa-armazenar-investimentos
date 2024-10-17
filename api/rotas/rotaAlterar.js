// este arquivo guarda as rotas responsaveis por alterar os dados do banco de dados

const {Router} = require('express')
const {buscarMovimentacoes, buscarDividendos, buscarInvestimento,alterarInvestimento, alterarDividendo, alterarMovimentacao} = require('../controladores/alterar')
const routerAlterar = Router()

routerAlterar.get("/investimento/:nome",buscarInvestimento)
routerAlterar.get("/movimentacoes/:nome",buscarMovimentacoes)
routerAlterar.get('/dividendos/:nome',buscarDividendos)
routerAlterar.put('/investimento/:nome',alterarInvestimento)
routerAlterar.put('/dividendo/:id',alterarDividendo)
routerAlterar.put('/movimentacao/:id',alterarMovimentacao)

module.exports = routerAlterar