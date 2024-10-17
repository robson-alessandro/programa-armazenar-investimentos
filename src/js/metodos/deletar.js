//este arquivo guarda as funções para apagar os dados do banco de dados
const buscaDelete = document.querySelector('.busca_delete');
const listaParaDeletar = document.querySelector('.lista_delete');
const inputDelete = document.getElementById('input_delete');
let resultadoBusca;

export default function deleta() {
	// coleta o nome do investimento para fazer a busca dos dados
	buscaDelete.addEventListener('click', async () => {
		resultadoBusca = inputDelete.value;
		buscarDados(resultadoBusca);
	});
}

//recebe o nome do invetimento faz o chamado a api com o metodo get e recebe os dados e os coloca na pagina
async function buscarDados(resultadoBusca) {
	let movimentacoes;
	const opacaoDeletarTudo = document.createElement('li');

	await axios.get(`http://localhost:4567/delete/movimentacoes/${resultadoBusca}`).then(({ data }) => {
		movimentacoes = data;
	});

	let dividendos;
	await axios.get(`http://localhost:4567/delete/dividendos/${resultadoBusca}`).then(({ data }) => {
		dividendos = data;
	});

	opacaoDeletarTudo.innerHTML = `
        <p>para deletar todas as movimentações</p>
        <Button class= "btnDeletatudo" >apagar</Button>
    `;
	listaParaDeletar.appendChild(opacaoDeletarTudo);

	movimentacoes.forEach((element) => {
		let linha = document.createElement('li');
		linha.classList.add('linha');
		linha.innerHTML = `
        <p>nome: ${element.nome} tipo: ${element.tipo} valor: ${element.valor}</p>
        <button class="btnDeletaMovimentacao" value=${element.id_movimentacao}>apagar</button>
        `;
		listaParaDeletar.appendChild(linha);
	});

	dividendos.forEach((element) => {
		let linha = document.createElement('li');
		linha.classList.add('linha');
		linha.innerHTML = `
        <p>nome: ${element.nome}  tipo: dividendo  valor: ${element.valor}</p>
        <button class = "btnDeletaDividendo" value = ${element.id_dividendo}>apagar</button>
        `;
		listaParaDeletar.appendChild(linha);
	});

	const btnDeletatudo = document.querySelector('.btnDeletatudo');
	const btnDeletaMovimentacao = document.querySelectorAll('.btnDeletaMovimentacao');
	const btnDeletaDividendo = document.querySelectorAll('.btnDeletaDividendo');

	btnDeletatudo.addEventListener('click', () => {
		deletarTudo(resultadoBusca);
	});

	btnDeletaMovimentacao.forEach((botao) => {
		botao.addEventListener('click', () => {
			deleteDadosMovimentacao(botao.value);
		});
	});

	btnDeletaDividendo.forEach((botao) => {
		botao.addEventListener('click', () => {
			deleteDadosDividendos(botao.value);
		});
	});
}

//recebe o id da movimentação para ser deletada e faz o chamado a api com o metodo delete para deletar a movimentação
async function deleteDadosMovimentacao(id) {
	await axios.delete(`http://localhost:4567/delete/movimentacoes/${id}`).then(({ data }) => {
		console.log(data);
	});
	listaParaDeletar.innerText = '';
	buscarDados(resultadoBusca);
}

//recebe o id da movimentação para ser deletada e faz o chamado a api com o metodo delete para deletar a dividendo
async function deleteDadosDividendos(id) {
	await axios.delete(`http://localhost:4567/delete/dividendos/${id}`).then(({ data }) => {
		console.log(data);
	});
	listaParaDeletar.innerText = '';
	buscarDados(resultadoBusca);
}

// recebe o nome do investimento e deleta todos os dados do investimento de uma vez so
async function deletarTudo(nome) {
	await axios.delete(`http://localhost:4567/delete/tudo/${nome}`).then(({ data }) => {
		alert(data);
	});
	listaParaDeletar.innerText = '';
	buscarDados(resultadoBusca);
	inputDelete.value = '';
}
