function getDadosInvestimentos(nome) {
	return axios.get(`http://localhost:4567/alterar/investimento/${nome}`).then((response) => {
		return response.data;
	});
}

function getDadosMovimentacao(nome) {
	return axios.get(`http://localhost:4567/alterar/movimentacoes/${nome}`).then((response) => {
		return response.data;
	});
}

function getDadosdividendos(nome) {
	return axios.get(`http://localhost:4567/alterar/dividendos/${nome}`).then((response) => {
		return response.data;
	});
}

export { getDadosInvestimentos, getDadosMovimentacao, getDadosdividendos };
