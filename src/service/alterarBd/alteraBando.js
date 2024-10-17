async function alteraDadosInvestimento(nome, tipo, data) {
	const investimento = {
		nome: nome,
		tipo: tipo,
		data: data,
	};
	await axios.put(`http://localhost:4567/alterar/investimento/${nome}`, investimento).then(({ data }) => (data.sqlMessage == undefined ? alert(data) : alert(data.sqlMessage)));
}

async function alteraDadosMovimentacao(id, nome, quantidade, valor, data) {
	const movimentacao = {
		nome: nome,
		quantidade: quantidade,
		valor: valor,
		data: data,
	};
	await axios.put(`http://localhost:4567/alterar/movimentacao/${id}`, movimentacao).then(({ data }) => (data.sqlMessage == undefined ? alert(data) : alert(data.sqlMessage)));
}

async function alteraDadosDividendos(id, nome, valor, data) {
	const dividendo = {
		nome: nome,
		valor: valor,
		data: data,
	};
	await axios.put(`http://localhost:4567/alterar/dividendo/${id}`, dividendo).then(({ data }) => (data.sqlMessage == undefined ? alert(data) : alert(data.sqlMessage)));
}

export { alteraDadosInvestimento, alteraDadosMovimentacao, alteraDadosDividendos };
