const { Router} = require("express")
const { cadastrarPrimeiraCompra, cadastrarMovimentacao, cadastrarDividendo, buscaBancoDados} = require("../controladores/controladores")

const router = Router()
// rotas para as movimentações que seram salvas

// faz o chamado para cadastrar a primeira compra do investimento na tabela de investimentos 
router.post("/primeira",cadastrarPrimeiraCompra)

// faz o chamado para cadastra a movimentação realizada de compra ou venda na tabela de movimentação
router.post("/",cadastrarMovimentacao)

// faz o chamado para cadastrar os dividendos
router.post("/dividendo",cadastrarDividendo)

// recebe o pedido e retorna os dados do banco de dados, recebe como parametro qual tabela ira fazer a busca pelo dado.
router.get('/:tipo',buscaBancoDados)

module.exports = router