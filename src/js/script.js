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
const botaoBuscaDetalhada = document.querySelector('.botao_busca_detalhada');

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

botaoBuscaDetalhada.addEventListener('click', () => {
	const painelDetalhado = document.querySelector('.painel_mostrar_dados_detalhados');
	const nomeInvestimento = document.getElementById('nome_busca_detalhada');
	let totalDividendos = 0;
	dadosDividendos.forEach((dividendo) => {
		let paragrafo = document.createElement('p');
		if (dividendo.nome == nomeInvestimento.value.toUpperCase()) {
			totalDividendos += parseFloat(dividendo.valor);
			paragrafo.innerHTML = `
            dividendo --- data:  ${formatarData(dividendo.data_dividendo)} --- valor: ${dividendo.valor}
            `;
			painelDetalhado.appendChild(paragrafo);
		}
	});
	let paragrafoTotal = document.createElement('p');
	paragrafoTotal.innerHTML = `
    total de dividendos recebidos: ${totalDividendos}
    `;
	painelDetalhado.appendChild(paragrafoTotal);
});

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
