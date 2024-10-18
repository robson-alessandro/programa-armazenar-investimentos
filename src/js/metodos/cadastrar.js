import { cadastraDividendo, cadastraInvestimento, cadastraMovimentacao } from '../../service/alterarBd/cadastrobanco.js';

//este arquivo guarda as funções para fazer o cadastros das movimentações
const botaoCompra = document.querySelector('#botao_compra');
const botaoVenda = document.querySelector('#botao_venda');
const botaoDividendo = document.querySelector('#botao_dividendo');

//criar os objetos para armazenar os dados vindos dos formularios
const Compras = {
	init: function (nome, tipo, data, quantidade, valor, tipoMovi) {
		this.nome = nome;
		this.tipo = tipo;
		this.data = data;
		this.quantidade = quantidade;
		this.valor = valor;
		this.tipoMovi = tipoMovi;
	},
};

const Vendas = {
	init: function (nome, data, quantidade, valor, tipoMovi) {
		this.nome = nome;
		this.data = data;
		this.quantidade = quantidade;
		this.valor = valor;
		this.tipoMovi = tipoMovi;
	},
};

const Dividendos = {
	init: function (nome, data, valor) {
		this.nome = nome;
		this.data = data;
		this.valor = valor;
	},
};
export default function cadastrar() {
	// função para pegar os valores do formulario de compra
	botaoCompra.addEventListener('click', async (event) => {
		event.preventDefault();
		let tipoInvestimento;

		const nomeInvestimentoCompra = document.getElementById('nome_compra_investimento');
		const dataInvestimento = document.getElementById('data_compra_investimento');
		const quantidadeInvestimento = document.getElementById('quantidade_compra_investimento');
		const valorCompra = document.getElementById('valor_compra_investimento');
		const primeiraCompra = document.getElementById('primeira_compra');
		const botaoRadioAcao = document.getElementById('acao');
		const botaoRadioFundoInv = document.getElementById('fundo_imobiliario');

		if (botaoRadioAcao.checked) {
			tipoInvestimento = 'ação';
		}
		if (botaoRadioFundoInv.checked) {
			tipoInvestimento = 'fundo imobiliario';
		}

		const compra = new Object(Compras);
		compra.init(nomeInvestimentoCompra.value.toUpperCase(), tipoInvestimento, dataInvestimento.value, quantidadeInvestimento.value, valorCompra.value, 'compra');

		if (primeiraCompra.checked) {
			cadastraInvestimento(compra);
			cadastraMovimentacao(compra);
		} else {
			cadastraMovimentacao(compra);
		}
		nomeInvestimentoCompra.value = '';
		dataInvestimento.value = '';
		botaoRadioAcao.checked = false;
		botaoRadioFundoInv.checked = false;
		quantidadeInvestimento.value = '';
		valorCompra.value = '';
		primeiraCompra.checked = false;
		nomeInvestimentoCompra.focus();
	});

	// função para pegar os valores do formulario de venda
	botaoVenda.addEventListener('click', async (event) => {
		event.preventDefault();
		const nomeInvestimentoVenda = document.getElementById('nome_venda_investimento');
		const dataVenda = document.getElementById('data_venda_investimento');
		const quantidadeVenda = document.getElementById('quantidade_venda_investimento');
		const valorVenda = document.getElementById('valor_venda_investimento');

		const venda = new Object(Vendas);
		venda.init(nomeInvestimentoVenda.value.toUpperCase(), dataVenda.value, quantidadeVenda.value, valorVenda.value, 'venda');

		cadastraMovimentacao(venda);

		nomeInvestimentoVenda.value = '';
		dataVenda.value = '';
		quantidadeVenda.value = '';
		valorVenda.value = '';
		nomeInvestimentoVenda.focus();
	});

	// função para pegar os valores do formulario de dividendo
	botaoDividendo.addEventListener('click', async (evet) => {
		evet.preventDefault();

		const nomeInvestimentoDividendo = document.getElementById('nome_dividendo_investimento');
		const dataDividendo = document.getElementById('data_dividendo_investimento');
		const valorDividendo = document.getElementById('valor_dividendo_investimento');

		const dividendo = new Object(Dividendos);
		dividendo.init(nomeInvestimentoDividendo.value.toUpperCase(), dataDividendo.value, valorDividendo.value);
		cadastraDividendo(dividendo);

		nomeInvestimentoDividendo.value = '';
		dataDividendo.value = '';
		valorDividendo.value = '';
		nomeInvestimentoDividendo.focus();
	});
}
