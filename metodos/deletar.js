//este arquivo guarda as funções para apagar os dados do banco de dados
const buscaDelete = document.querySelector('.busca_delete')
const listaParaDeletar = document.querySelector('.lista_delete')

buscaDelete.addEventListener('click',async()=>{
    let movimentacoes
    const resultadoBusca = document.getElementById('input_delete').value
    await axios.get(`http://localhost:4567/delete/movimentacoes/${resultadoBusca}`).then(({data})=>{movimentacoes=data})
    
    let dividendos
    await axios.get(`http://localhost:4567/delete/dividendos/${resultadoBusca}`).then(({data})=>{dividendos=data})
    
    movimentacoes.forEach(element => {
        let linha = document.createElement('li')
        linha.classList.add('linha_delete')
        linha.innerHTML=`
        <p>nome: ${element.nome} tipo: ${element.tipo} valor: ${element.valor}</p>
        <button>apagar</button>
        `
        listaParaDeletar.appendChild(linha)
       
    });
    
    dividendos.forEach((element)=>{
        let linha = document.createElement('li')
        linha.classList.add('linha_delete')
        linha.innerHTML=`
        <p>nome: ${element.nome}  tipo: dividendo  valor: ${element.valor}</p>
        <button>apagar</button>
        `
        listaParaDeletar.appendChild(linha)
        })
       
    })
    
async function deleteDados(id){
    await axios.delete(`http://localhost:4567/delete/:${id}`)
        
}