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
    console.log(nome)
    res.send('tudo certo')

}

module.exports={
    buscarMovimentacao
}