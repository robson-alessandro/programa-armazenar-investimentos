import { deletaDividendo, deletaMovimentacao, deletatudo } from '../../service/alterarBd/deletabanco.js';

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
	const opacaoDeletarTudo = document.createElement('li');
	let movimentacoes = [];

	await axios.get(`http://localhost:4567/delete/movimentacoes/${resultadoBusca}`).then(({ data }) => {
		movimentacoes = data;
	});

	let dividendos = [];
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
function deleteDadosMovimentacao(id) {
	deletaMovimentacao(id);
	listaParaDeletar.innerText = '';
	buscarDados(resultadoBusca);
}

//recebe o id da movimentação para ser deletada e faz o chamado a api com o metodo delete para deletar a dividendo
function deleteDadosDividendos(id) {
	deletaDividendo(id);
	listaParaDeletar.innerText = '';
	buscarDados(resultadoBusca);
}

// recebe o nome do investimento e deleta todos os dados do investimento de uma vez so
function deletarTudo(nome) {
	deletatudo(nome);
	listaParaDeletar.innerText = '';
	buscarDados(resultadoBusca);
	inputDelete.value = '';
}
