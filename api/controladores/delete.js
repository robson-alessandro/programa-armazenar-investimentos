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

function buscarDividendos(req,res){
    const nome = req.params.nome
    conennection.query('SELECT * FROM dividendos WHERE nome = ?',[nome], function (error,result,field){
        res.status(200).json(result)
    })
}

function deletarMovimentacao(req,res){
    const id = req.params.id
    conennection.query('DELETE FROM movimentacoes WHERE id_movimentacao = ?',[id],function(error,result){
        if(error){
            res.json('não foi possivel deletar')
        }else{
            res.status(200).json(result)
        }
    })
}
function deletarDividendo(req,res){
    const id = req.params.id
    conennection.query('DELETE FROM dividendos WHERE id_dividendo = ?',[id],function(error,result){
        if(error){
            res.json('não foi possivel deletar')
        }else{
            res.status(200).json(result)
        }
    })
}

function deletarTudo(req, res){
    const nome = req.params.nome
    conennection.query('DELETE FROM movimentacoes WHERE nome = ?',[nome],function(error,result){
        if(error){
            console.log(error)
        }
    })
    conennection.query('DELETE FROM dividendos WHERE nome = ?',[nome],function(error,result){
        if(error){
            console.log(error)
        }
    })
    conennection.query('DELETE FROM investimentos WHERE nome = ?',[nome],function(error,result){
        if(error){
            console.log(error)
        }else{
            res.status(200).json(`investimento ${nome} deletado com sucesso`)
        }
    })
}

module.exports={
    buscarMovimentacao,
    buscarDividendos,
    deletarMovimentacao,
    deletarDividendo,
    deletarTudo
}