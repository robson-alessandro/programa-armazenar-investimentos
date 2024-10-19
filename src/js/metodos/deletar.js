import { getDadosdividendos, getDadosMovimentacao } from '../../service/alterarBd/buscaDadosAlterar.js';
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
	let dividendos = await getDadosdividendos(resultadoBusca);
	dividendos = await getDadosdividendos(resultadoBusca);
	const movimentacoes = await getDadosMovimentacao(resultadoBusca);

	const opacaoDeletarTudo = document.createElement('li');
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

	criaBotoes();
}

function criaBotoes() {
	const btnDeletatudo = document.querySelector('.btnDeletatudo');
	const btnDeletaMovimentacao = document.querySelectorAll('.btnDeletaMovimentacao');
	const btnDeletaDividendo = document.querySelectorAll('.btnDeletaDividendo');

	btnDeletatudo.addEventListener('click', () => {
		deletarTudo(resultadoBusca);
	});

	btnDeletaMovimentacao.forEach((botao) => {
		botao.addEventListener('click', () => {
			let linha = botao.parentNode;
			deletaMovimentacao(botao.value, linha);
		});
	});

	btnDeletaDividendo.forEach((botao) => {
		botao.addEventListener('click', () => {
			let linha = botao.parentNode;
			deletaDividendo(botao.value, linha);
		});
	});
}

// recebe o nome do investimento e deleta todos os dados do investimento de uma vez so
function deletarTudo(nome) {
	deletatudo(nome);
	listaParaDeletar.innerText = '';
	buscarDados(resultadoBusca);
	inputDelete.value = '';
}
