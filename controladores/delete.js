// cria a conexão com o banco de dados feito utilizando o mysql
const mysql = require("mysql2")
const conennection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'investimento'
})

function buscarMovimentacao(req,res){
    const nome = req.params.nome
    conennection.query('SELECT * FROM movimentacoes WHERE nome = ?',[nome],function(error,result,field){
        res.status(200).json(result)
    })


}

module.exports={
    buscarMovimentacao
}