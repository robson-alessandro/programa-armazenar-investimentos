function cadastraInvestimento(investimento) {
	axios.post(`http://localhost:4567/movimentacao/primeira`, investimento).then(({ data }) => {
		alert(data);
	});
}

function cadastraMovimentacao(movimentacao) {
	axios.post(`http://localhost:4567/movimentacao`, movimentacao).then(({ data }) => alert(data));
}

function cadastraDividendo(dividendo) {
	axios.post(`http://localhost:4567/movimentacao/dividendo`, dividendo).then(({ data }) => alert(data));
}

export { cadastraInvestimento, cadastraMovimentacao, cadastraDividendo };
