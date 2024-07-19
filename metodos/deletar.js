//este arquivo guarda as funções para apagar os dados do banco de dados
const buscaDelete = document.querySelector('.busca_delete')
const listaParaDeletar = document.querySelector('.lista_delete')
let resultadoBusca

buscaDelete.addEventListener('click',async()=>{
    resultadoBusca = document.getElementById('input_delete').value
    buscarDados(resultadoBusca)   
})
    
async function buscarDados(resultadoBusca){
    let movimentacoes
    await axios.get(`http://localhost:4567/delete/movimentacoes/${resultadoBusca}`).then(({data})=>{movimentacoes=data})
    
    let dividendos
    await axios.get(`http://localhost:4567/delete/dividendos/${resultadoBusca}`).then(({data})=>{dividendos=data})
    
    movimentacoes.forEach(element => {
        let linha = document.createElement('li')
        linha.classList.add('linha_delete')
        linha.innerHTML=`
        <p>nome: ${element.nome} tipo: ${element.tipo} valor: ${element.valor}</p>
        <button onClick='deleteDadosMovimentacao(${element.id_movimentacao})'>apagar</button>
        `
        listaParaDeletar.appendChild(linha)
    });
    
    dividendos.forEach((element)=>{
        let linha = document.createElement('li')
        linha.classList.add('linha_delete')
        linha.innerHTML=`
        <p>nome: ${element.nome}  tipo: dividendo  valor: ${element.valor}</p>
        <button onClick='deleteDadosDividendos(${element.id_dividendo})'>apagar</button>
        `
        listaParaDeletar.appendChild(linha)
        })
}
async function deleteDadosMovimentacao(id){
    await axios.delete(`http://localhost:4567/delete/movimentacoes/${id}`).then(({data})=>{console.log(data)})
    listaParaDeletar.innerText =''
    buscarDados(resultadoBusca)
        
}
async function deleteDadosDividendos(id){
    await axios.delete(`http://localhost:4567/delete/dividendos/${id}`).then(({data})=>{console.log(data)})
    listaParaDeletar.innerText = ''
    buscarDados(resultadoBusca)
        
}