// este arquivo guarda as funções que são responsaveis por alterar os dados nas tabelas movimentações e dividendos

const painelAlterar = document.querySelector('.painel_alterar')
const botaoBuscaAlterar = document.querySelector('.busca_alterar')
const inputAlterar = document.getElementById('input_alterar')
const listaAlterar = document.querySelector('.lista_alterar')

let resultadoBuscaAlterar 

//captura o nome da movimentação e faz o cahamado para a função para buscar os dados
botaoBuscaAlterar.addEventListener('click',async()=>{
    resultadoBuscaAlterar = inputAlterar.value
    buscarDadosAlterar(resultadoBuscaAlterar)
})

// recebe o nome da movimentação faz um cahmado a api com o metodo get e busca os dados e os apresenta no html
async function buscarDadosAlterar(nome){ 
    let movimentacoes 
    await axios.get(`http://localhost:4567/alterar/movimentacoes/${nome}`).then(({data})=>movimentacoes=data)
    let dividendos 
    await axios.get(`http://localhost:4567/alterar/dividendos/${nome}`).then(({data})=>dividendos=data)

    
    movimentacoes.forEach(elemento => {
        const linha = document.createElement('li')
        linha.classList.add('linha','linha_alterar')
        linha.innerHTML = `
        <p>nome: ${elemento.nome} - tipo: movimentação - valor: ${elemento.valor}</p>
        <button onclick='novaMovimentacao(${elemento.id_movimentacao},"${elemento.nome}")'>selecionar</button>
        `
        listaAlterar.appendChild(linha)
    });

    dividendos.forEach(elemento =>{
        const linha = document.createElement('li')
        linha.classList.add('linha','linha_alterar')
        linha.innerHTML=`
        <p>nome: ${elemento.nome}- tipo: dividendo- valor: ${elemento.valor}</p>
        <button onClick='novoDividendo(${elemento.id_dividendo},"${elemento.nome}")'>selecionar</button>
        `
        listaAlterar.appendChild(linha)
    })

}

// cria um formulario no html para receber os dados novos de dividendos para ser alterado
function novoDividendo(id,nome){
    const div = document.createElement('div')
    div.classList.add('alterar_dados', 'buscador')
    div.innerHTML=`
    <p>digite os novos dados do dividendo:${nome}</p>
    <input type=number id ="valor_alterar" placeholder="valor">
    <input type=date id="data_alterar">
    <button class="alterar">alterar</button>
    `
    painelAlterar.appendChild(div)

    const boataoParaAlterar = document.querySelector('.alterar')
    boataoParaAlterar.addEventListener('click',()=>{
        const valorAlterado = document.getElementById('valor_alterar')
        const dataAterada = document.getElementById('data_alterar')
        alterarDividendo(id,nome,valorAlterado.value,dataAterada.value)
    })
}

// cria um formulario no html para receber os dados novos da movimentação para ser alterado
function novaMovimentacao(id,nome){
    const div = document.createElement('div')
    div.classList.add('alterar_dados', 'buscador')
    div.innerHTML=`
    <p>digite os novos dados do movimentação:${nome}</p>
    <input type=number id ="valor_alterar" placeholder="valor">
    <input type=number id= "quantidade_alterar" placeholder="quantidade">
    <input type=date id="data_alterar">
    <button class="alterar">alterar</button>
    `
    painelAlterar.appendChild(div)

    const boataoParaAlterar = document.querySelector('.alterar')
    boataoParaAlterar.addEventListener('click',()=>{ 
        const valorAlterado = document.getElementById('valor_alterar')
        const quantidadeAlterada = document.getElementById('quantidade_alterar')
        const dataAterada = document.getElementById('data_alterar')
        alterarMovimentacao(id,nome,quantidadeAlterada.value,valorAlterado.value,dataAterada.value)
    })
}

// função para chamar a api como o metodo put e o envio dos novos dados para alterar os dividendos
async function alterarDividendo(id,nome,valor,data){
    const dividendo ={
        nome:nome,
        valor:valor,
        data:data
    }
    await axios.put(`http://localhost:4567/alterar/dividendo/${id}`,dividendo).then(({data})=> data.sqlMessage==undefined?alert(data):alert(data.sqlMessage))
    
}

// função para chamar a api como o metodo put e o envio dos novos dados para alterar a movimentação
async function alterarMovimentacao(id,nome,quantidade,valor,data){
    const movimentacao = {
        nome:nome,
        quantidade:quantidade,
        valor:valor,
        data:data
    }
    await axios.put(`http://localhost:4567/alterar/movimentacao/${id}`,movimentacao).then(({data})=> data.sqlMessage==undefined?alert(data):alert(data.sqlMessage))
    console.log(movimentacao)
}

