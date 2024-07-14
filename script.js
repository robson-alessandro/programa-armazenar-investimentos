const tabelaInvestimentos = document.querySelector('.tabela_investimentos')
const botaoCadastro = document.querySelector('.botao_cadastro')
const botaoDelete = document.querySelector('.botao_delete')
const botaoAlterar = document.querySelector('.botao_alterar')
const painelCadastro = document.querySelector('.painel_cadastro')
const painelAlterar = document.querySelector('.painel_alterar')
const painelDelete = document.querySelector('.painel_delete')



//criar os objetos para armazenar os dados vindos dos formularios
const Investimento = {
    init:function(nome,tipo, dataCompra, totalDividendos, quantidade, totalInvestido){
        this.nome = nome
        this.tipo = tipo
        this.dataCompra = dataCompra
        this.totalDividendos = totalDividendos
        this.quantidade = quantidade
        this.totalInvestido = totalInvestido
    }
}

//recebe a data do banco de dados e retorna ela formatada
function formatarData(data){
    let novaData=data.split('T')
    novaData = ` ${novaData[0][8]+novaData[0][9]+'/'+novaData[0][5]+novaData[0][6]+'/'+novaData[0][0]+novaData[0][1]+novaData[0][2]+novaData[0][3]}`
    return novaData

}

//recebe o nome do investimento e a lista de investimentos, faz a soma de todos os dividendos e retorna o total
function somarValoresDividendos(nome,lista){
    let total = 0
    lista.forEach(element =>{
        
        if( element['nome'] == nome ){
            total += parseFloat(element['valor'])
        }
    })

    return total
}

//recebe o nome do investimento e a lista de investimentos, faz a soma de todas as quantidades investido e total aplicado e retorna uma lista com os dois valores
function pegarQuantidadeTotalInvestido(nome, lista){
    let totalInventimentos=0
    let totalQuantInvestimento=0
    let listaValores=[]

    lista.forEach(element=>{
        
        if( element['nome'] == nome ){
            if(element['tipo'] == 'compra'){
                totalInventimentos +=element['valor']
                totalQuantInvestimento += element['quantidade']
            }else{
                totalInventimentos -=element['valor']
                totalQuantInvestimento -= element['quantidade']
            }
        }
    })

    listaValores.push(totalQuantInvestimento)
    listaValores.push(totalInventimentos)
    
    return listaValores
}

// retorna os investimentos no banco de dados e os coloca em um tabela e apresenta eles no html(nome,tipo,data compra, valor dos dividendos, quantidade de cada investimento, valor total)
async function consultaSql(){
    
    let dadosInvestimento
    await axios.get('http://localhost:4567/movimentacao/investimentos').then(({data}) => dadosInvestimento=data)

    let dadosQuantidade
    await axios.get('http://localhost:4567/movimentacao/movimentacoes').then(({data})=> dadosQuantidade=data)

    let dadosDividendos 
    await axios.get('http://localhost:4567/movimentacao/dividendos').then(({data}) => dadosDividendos=data)

    dadosInvestimento.forEach(element => {
        let totalQuantTotalInvestido= pegarQuantidadeTotalInvestido(element['nome'],dadosQuantidade)

        let investimento = new Object(Investimento)
        investimento.init(element['nome'], element['tipo'], formatarData(element['data_compra']), somarValoresDividendos(element['nome'],dadosDividendos),
        totalQuantTotalInvestido[0], totalQuantTotalInvestido[1])

        let linha = document.createElement('tr')

        let coluna1 = document.createElement('td')
        coluna1.innerHTML= investimento.nome
        linha.appendChild(coluna1)

        let coluna2 = document.createElement('td')
        coluna2.innerHTML = investimento.tipo
        linha.appendChild(coluna2)

        let coluna3 = document.createElement('td')
        coluna3.innerHTML =  investimento.dataCompra
        linha.appendChild(coluna3)

        let coluna4 = document.createElement('td')
        coluna4.innerHTML = investimento.totalDividendos.toFixed(2)
        linha.appendChild(coluna4)

        let coluna5 = document.createElement('td')
        coluna5.innerHTML = investimento.quantidade
        linha.appendChild(coluna5)

        let coluna6 = document.createElement('td')
        coluna6.innerHTML = investimento.totalInvestido
        linha.appendChild(coluna6)

        let coluna7 = document.createElement('td')
        coluna7.innerHTML = (investimento.totalInvestido / investimento.quantidade).toFixed(2)
        linha.appendChild(coluna7)

        let coluna8 = document.createElement('td')
        let data1 = investimento.dataCompra.split("/")
        let dataDaCompra = new Date(data1[2],(data1[1]-1),data1[0])
        let dataAtual = new Date()
        let diferenca = dataAtual.getTime() - dataDaCompra.getTime()
        let mes = Math.floor(diferenca/(1000*60*60*24*30))
        coluna8.innerHTML = mes
        linha.appendChild(coluna8)

        let coluna9 = document.createElement('td')
        coluna9.innerHTML = `${((investimento.totalDividendos.toFixed(2)/investimento.totalInvestido) *100).toFixed(2)}%  `
        linha.appendChild(coluna9)
   
        tabelaInvestimentos.appendChild(linha)
    
    });
    
    
}

consultaSql()


// essas funções esconde os paineis de acordo com a escolha do usuario cadastro, delete, alterar
botaoDelete.addEventListener('click',()=>{
    painelCadastro.setAttribute('style','display:none')
    painelAlterar.setAttribute('style','display:none')
    painelDelete.removeAttribute('style')
})

botaoCadastro.addEventListener('click',()=>{
    painelCadastro.removeAttribute('style')
    painelAlterar.setAttribute('style','display:none')
    painelDelete.setAttribute('style','display:none')
})

botaoAlterar.addEventListener('click',()=>{
    painelAlterar.removeAttribute('style')
    painelCadastro.setAttribute('style','display:none')
    painelDelete.setAttribute('style','display:none')
})
