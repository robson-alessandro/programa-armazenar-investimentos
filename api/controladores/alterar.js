// esse arquivo faz a conexão com o banco de dados para alterar os dados
const mysql = require("mysql2")
const conennection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'investimento'
})

//busca os dados de movimentação para retornar ao frontend
function buscarMovimentacoes(req,res){
    const nome = req.params.nome
    conennection.query('SELECT * FROM movimentacoes WHERE nome = ?',[nome],function(error,result){
        res.json(result)
    })
}

//busca os dados de dividendo para retornar ao frontend
function buscarDividendos(req,res){
    const nome = req.params.nome
    conennection.query('SELECT * FROM dividendos WHERE nome = ?',[nome],function(error,result){
        res.json(result)
    })
}

//recebe os dados novo e os altera na tabela de dividendo
function alterarDividendo(req, res){
    const id =req.params.id
    conennection.query('UPDATE dividendos SET data_dividendo = ?, valor = ? WHERE id_dividendo = ?',[req.body.data,req.body.valor,id], function(error,result){
        if(error){
            res.json(error)
        }else{
            res.json('alterado com sucesso')
        }
    })
}

//recebe os dados novo e os altera na tabela de movimetação
function alterarMovimentacao(req,res){
    const id = req.params.id
    conennection.query('UPDATE movimentacoes SET data_movimentacao = ?, valor = ?, quantidade = ? WHERE id_movimentacao= ?',[req.body.data, req.body.valor, req.body.quantidade,id], function(error, result){
        if(error){
            res.json(error)
        }else{
            res.json('alterado com sucesso')
        }
    })
}

module.exports = {
    buscarMovimentacoes,
    buscarDividendos,
    alterarDividendo,
    alterarMovimentacao
}