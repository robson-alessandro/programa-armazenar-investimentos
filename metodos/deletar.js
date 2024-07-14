//este arquivo guarda as funções para apagar os dados do banco de dados
const buscaDelete = document.querySelector('.busca_delete')

buscaDelete.addEventListener('click',async()=>{
    const resultadoBusca = document.getElementById('input_delete').value
    await axios.get(`http://localhost:4567/delete/${resultadoBusca}`).then(({data})=>{console.log(data)})

    
})

function deleteDados(){
    
}