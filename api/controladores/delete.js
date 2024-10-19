// cria a conexão com o banco de dados feito utilizando o mysql
const mysql = require('mysql2');
const conennection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'investimento',
});

// faz a busca de dados sobre movimentação e os retorna para o frontend
function buscarMovimentacao(req, res) {
	const nome = req.params.nome;
	conennection.query('SELECT * FROM movimentacoes WHERE nome = ?', [nome], function (error, result, field) {
		res.status(200).json(result);
	});
}

// faz a busca de dados sobre dividendo e os retorna para o frontend
function buscarDividendos(req, res) {
	const nome = req.params.nome;
	conennection.query('SELECT * FROM dividendos WHERE nome = ?', [nome], function (error, result, field) {
		res.status(200).json(result);
	});
}

//recebe o id da moviementacao e faz o delete dela no banco de dados
function deletarMovimentacao(req, res) {
	const id = req.params.id;
	conennection.query('DELETE FROM movimentacoes WHERE id_movimentacao = ?', [id], function (err, result) {
		if (err) {
			res.status(500).json(err.message);
		} else {
			res.status(200).json('movimentação deletada com sucesso!!');
		}
	});
}

//recebe o id da dividendo e faz o delete dela no banco de dados
function deletarDividendo(req, res) {
	const id = req.params.id;
	conennection.query('DELETE FROM dividendos WHERE id_dividendo = ?', [id], function (err, result) {
		if (err) {
			res.status(500).json(err.message);
		} else {
			res.status(200).json('dividendo deletado com sucesso!!');
		}
	});
}

//recebe o nome do investimento como parametro e busca todas as movimentações, dividendos e investimento e deleta todos os dados com esse nome
function deletarTudo(req, res) {
	const nome = req.params.nome;
	conennection.query('DELETE FROM movimentacoes WHERE nome = ?', [nome], function (error, result) {
		if (error) {
			console.log(error);
		}
	});
	conennection.query('DELETE FROM dividendos WHERE nome = ?', [nome], function (error, result) {
		if (error) {
			console.log(error);
		}
	});
	conennection.query('DELETE FROM investimentos WHERE nome = ?', [nome], function (error, result) {
		if (error) {
			console.log(error);
		} else {
			res.status(200).json(`investimento ${nome} deletado com sucesso`);
		}
	});
}

module.exports = {
	buscarMovimentacao,
	buscarDividendos,
	deletarMovimentacao,
	deletarDividendo,
	deletarTudo,
};
