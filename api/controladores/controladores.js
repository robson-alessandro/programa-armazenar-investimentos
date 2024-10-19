// cria a conexão com o banco de dados feito utilizando o mysql
const mysql = require('mysql2');
const conennection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'investimento',
});

// recebe os dados da movimentação da primeira compra e os salva na tabela de investimentos
function cadastrarPrimeiraCompra(req, res) {
	conennection.query('INSERT INTO investimentos VALUE (?,?,?)', [req.body.nome, req.body.tipo, req.body.data], (err) => {
		if (err) {
			res.json(err.message);
		} else {
			res.json('primeira compra salva com sucesso');
		}
	});
}

// recebe os dados de compra ou venda e os salva na tabela de movimentação
function cadastrarMovimentacao(req, res) {
	conennection.query('INSERT INTO movimentacoes (nome,data_movimentacao,quantidade,valor,tipo) VALUE (?,?,?,?,?)', [req.body.nome, req.body.data, req.body.quantidade, req.body.valor, req.body.tipoMovi], (err) => {
		if (err) {
			res.json(err.message);
		} else {
			res.json('movimentação salva com sucesso!');
		}
	});
}

//recebe os dados de dividendos e os salva na tabela de dividendos
function cadastrarDividendo(req, res) {
	conennection.query('INSERT INTO dividendos (nome,data_dividendo,valor) VALUES (?,?,?)', [req.body.nome, req.body.data, req.body.valor], (err) => {
		if (err) {
			res.json(err.message);
		} else {
			res.json('dividendo salvo com sucesso!');
		}
	});
}

// recebe como parametro o tipo(qual tabela ira buscar investimento, movimentação, dividendo) de movimentação que ira retornar o valor da tabela
function buscaBancoDados(req, res) {
	const tipo = req.params.tipo;
	const pedido = `SELECT * FROM ${tipo} ORDER BY nome`;
	conennection.query(pedido, function (error, result, field) {
		res.status(200).json(result);
	});
}

module.exports = {
	cadastrarPrimeiraCompra,
	cadastrarMovimentacao,
	cadastrarDividendo,
	buscaBancoDados,
};
