function deletatudo(nome) {
	axios.delete(`http://localhost:4567/delete/tudo/${nome}`).then(({ data }) => {
		alert(data);
	});
}

function deletaMovimentacao(id, linha) {
	axios
		.delete(`http://localhost:4567/delete/movimentacoes/${id}`)
		.then(({ data }) => {
			alert(data);
			linha.innerHTML = '';
		})
		.catch((error) => {
			console.log(error);
			alert(error.message);
		});
}
function deletaDividendo(id, linha) {
	axios
		.delete(`http://localhost:4567/delete/dividendos/${id}`)
		.then(({ data }) => {
			alert(data);
			linha.innerHTML = '';
		})
		.catch((error) => {
			console.log(error);
			alert(error.message);
		});
}

export { deletaDividendo, deletatudo, deletaMovimentacao };
