import { alteraDadosDividendos, alteraDadosInvestimento, alteraDadosMovimentacao } from '../../service/alterarBd/alteraBanco.js';
import { getDadosdividendos, getDadosInvestimentos, getDadosMovimentacao } from '../../service/alterarBd/buscaDadosAlterar.js';

// este arquivo guarda as funções que são responsaveis por alterar os dados nas tabelas movimentações e dividendos
const painelAlterar = document.querySelector('.painel_alterar');
const botaoBuscaAlterar = document.querySelector('.busca_alterar');
const inputAlterar = document.getElementById('input_alterar');
const listaAlterar = document.querySelector('.lista_alterar');

let resultadoBuscaAlterar;
export default function altera() {
	//captura o nome da movimentação e faz o chamado para a função para buscar os dados
	botaoBuscaAlterar.addEventListener('click', async () => {
		listaAlterar.innerHTML = '';
		resultadoBuscaAlterar = inputAlterar.value;
		buscarDadosAlterar(resultadoBuscaAlterar);
	});
}

// recebe o nome da movimentação e faz um chamado para a api com o metodo get e busca os dados e os apresenta no html
async function buscarDadosAlterar(nome) {
	let investimento = await getDadosInvestimentos(nome);

	let movimentacoes = await getDadosMovimentacao(nome);

	let dividendos = await getDadosdividendos(nome);

	const linhaInvestimento = document.createElement('li');
	linhaInvestimento.classList.add('linha', 'linha_alterar');
	linhaInvestimento.innerHTML = ` 
        <p>nome: ${investimento[0].nome} - investimento do tipo: ${investimento[0].tipo}</p>
        <button class="btnNovosDadosInvestimento" value = ${investimento[0].nome}>selecionar</button>
    `;
	listaAlterar.appendChild(linhaInvestimento);

	movimentacoes.forEach((elemento) => {
		const linha = document.createElement('li');
		linha.classList.add('linha', 'linha_alterar');
		linha.innerHTML = `
        <p>nome: ${elemento.nome} - tipo: movimentação - valor: ${elemento.valor}</p>
        <button class = "btnAtualizaMovimentacao" value = ${elemento.id_movimentacao} >selecionar</button>
        `;
		listaAlterar.appendChild(linha);
	});

	dividendos.forEach((elemento) => {
		const linha = document.createElement('li');
		linha.classList.add('linha', 'linha_alterar');
		linha.innerHTML = `
        <p>nome: ${elemento.nome}- tipo: dividendo- valor: ${elemento.valor}</p>
        <button class = "btnAlteraDividendo" value =${elemento.id_dividendo} >selecionar</button>
        `;
		listaAlterar.appendChild(linha);
	});

	const btnNovosDadosInvestimento = document.querySelector('.btnNovosDadosInvestimento');
	btnNovosDadosInvestimento.addEventListener('click', () => {
		novoInvestimento(btnNovosDadosInvestimento.value);
	});

	const listaBtnAtualizaMovimentacao = document.querySelectorAll('.btnAtualizaMovimentacao');
	listaBtnAtualizaMovimentacao.forEach((botao) => {
		botao.addEventListener('click', () => {
			novaMovimentacao(botao.value, nome);
		});
	});

	const listaBtnAlteraDividendo = document.querySelectorAll('.btnAlteraDividendo');
	listaBtnAlteraDividendo.forEach((botao) => {
		botao.addEventListener('click', () => {
			novoDividendo(botao.value, nome);
		});
	});
}

// cria um formulario no html para receber os dados novos de investimento para ser alterado
function novoInvestimento(nome) {
	const div = document.createElement('div');
	div.classList.add('alterar_dados', 'buscador');
	div.innerHTML = `
    <p> digite os novos dados do investimento ${nome}</p>
    <input type = text id= "novo_tipo" placeholder="tipo">
    <input type = date id="data_alterar">
    <button class="alterar">alterar</button>
    `;

	painelAlterar.appendChild(div);

	const boataoParaAlterar = document.querySelector('.alterar');
	boataoParaAlterar.addEventListener('click', () => {
		const tipoAlterado = document.getElementById('novo_tipo');
		const dataAterada = document.getElementById('data_alterar');

		// função para chamar a api como o metodo put e o envio dos novos dados para alterar os dados da tabela investimento
		alteraDadosInvestimento(nome, tipoAlterado.value, dataAterada.value);
	});
}

// cria um formulario no html para receber os dados novos de dividendos para ser alterado
function novoDividendo(id, nome) {
	const div = document.createElement('div');
	div.classList.add('alterar_dados', 'buscador');
	div.innerHTML = `
    <p>digite os novos dados do dividendo:${nome}</p>
    <input type=number id ="valor_alterar" placeholder="valor">
    <input type=date id="data_alterar">
    <button class="alterar">alterar</button>
    `;
	painelAlterar.appendChild(div);

	const boataoParaAlterar = document.querySelector('.alterar');
	boataoParaAlterar.addEventListener('click', () => {
		const valorAlterado = document.getElementById('valor_alterar');
		const dataAterada = document.getElementById('data_alterar');

		// função para chamar a api como o metodo put e o envio dos novos dados para alterar os dividendos
		alteraDadosDividendos(id, nome, valorAlterado.value, dataAterada.value);

		listaAlterar.innerHTML = '';
		inputAlterar.value = '';
		let ultimoElemento = painelAlterar.lastChild;
		painelAlterar.removeChild(ultimoElemento);
	});
}

// cria um formulario no html para receber os dados novos da movimentação para ser alterado
function novaMovimentacao(id, nome) {
	const div = document.createElement('div');
	div.classList.add('alterar_dados', 'buscador');
	div.innerHTML = `
    <p>digite os novos dados do movimentação:${nome}</p>
    <input type=number id ="valor_alterar" placeholder="valor" >
    <input type=number id= "quantidade_alterar" placeholder="quantidade">
    <input type=date id="data_alterar">
    <button class="alterar">alterar</button>
    `;
	painelAlterar.appendChild(div);

	const boataoParaAlterar = document.querySelector('.alterar');
	boataoParaAlterar.addEventListener('click', () => {
		const valorAlterado = document.getElementById('valor_alterar');
		const quantidadeAlterada = document.getElementById('quantidade_alterar');
		const dataAlterada = document.getElementById('data_alterar');

		// função para chamar a api como o metodo put e o envio dos novos dados para alterar a movimentação
		alteraDadosMovimentacao(id, nome, quantidadeAlterada.value, valorAlterado.value, dataAlterada.value);

		listaAlterar.innerHTML = '';
		inputAlterar.value = '';
		let ultimoElemento = painelAlterar.lastChild;
		painelAlterar.removeChild(ultimoElemento);
	});
}
