import altera from './metodos/alterar.js';
import cadastrar from './metodos/cadastrar.js';
import deleta from './metodos/deletar.js';
import consultaSql from './views/prencheHtmlInvestimentos.js';

const botaoCadastro = document.querySelector('.botao_cadastro');
const botaoDelete = document.querySelector('.botao_delete');
const botaoAlterar = document.querySelector('.botao_alterar');
const painelCadastro = document.querySelector('.painel_cadastro');
const painelAlterar = document.querySelector('.painel_alterar');
const painelDelete = document.querySelector('.painel_delete');

//chama a api para buscar os dados e os coloca no html
consultaSql();

// listas que iram receber os dados do banco de dados na função consultaSql
let dadosDividendos;

//recebe a data do banco de dados e retorna ela formatada
function formatarData(data) {
	let dataDividida = data.split('T');
	const exp = /-/g;
	const date = new Date(dataDividida[0].replace(exp, ','));
	const dataFormatada = new Intl.DateTimeFormat().format(date);
	return dataFormatada;
}

// essas funções esconde os paineis de acordo com a escolha do usuario cadastro, delete, alterar
botaoDelete.addEventListener('click', () => {
	painelCadastro.setAttribute('style', 'display:none');
	painelAlterar.setAttribute('style', 'display:none');
	painelDelete.removeAttribute('style');
	deleta();
});

botaoCadastro.addEventListener('click', () => {
	painelCadastro.removeAttribute('style');
	painelAlterar.setAttribute('style', 'display:none');
	painelDelete.setAttribute('style', 'display:none');
	cadastrar();
});

botaoAlterar.addEventListener('click', () => {
	painelAlterar.removeAttribute('style');
	painelCadastro.setAttribute('style', 'display:none');
	painelDelete.setAttribute('style', 'display:none');
	altera();
});
