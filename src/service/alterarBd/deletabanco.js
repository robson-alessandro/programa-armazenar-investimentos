function deletatudo(nome) {
	axios.delete(`http://localhost:4567/delete/tudo/${nome}`).then(({ data }) => {
		alert(data);
	});
}

function deletaMovimentacao(id) {
	axios.delete(`http://localhost:4567/delete/movimentacoes/${id}`).then(({ data }) => {
		console.log(data);
	});
}
function deletaDividendo(id) {
	axios.delete(`http://localhost:4567/delete/dividendos/${id}`).then(({ data }) => {
		console.log(data);
	});
}

export { deletaDividendo, deletatudo, deletaMovimentacao };
