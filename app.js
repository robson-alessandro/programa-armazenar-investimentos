const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
app.use(express.json());
const rota = require ('./rotas/rota')
const rotaDelete = require('./rotas/rotaDelete')
const port = 4567


//recebe o pedido do frontende e faz a busca da rota
app.use("/movimentacao",rota)

app.use("/delete",rotaDelete)


app.listen(port,()=>{
    console.log(` escutando a porta ${port} `)
    return ("passou")

})

