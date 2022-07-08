const produtosJson = require("./produtos.json")

const express = require("express")
const cors = require("cors")


const app = express()
app.use(express.json())
app.use(cors())

const PORT = 8686


app.get("/produtos", (req, res)=>{

res.status(200).json(produtosJson)
})

app.get("/produtos/buscar/:id", (req, res)=>{

const idRequest = req.params.id
const produtoEncontrado = produtosJson.find(produto => produto.id == idRequest)
res.status(200).json(produtoEncontrado)
})

app.post("/produtos/cadastrar", (req, res)=>{

const bodyRequest = req.body
const novoProduto = {

    "id": (produtosJson.length)+1,
    "Produto": bodyRequest.Produto,
    "Marca": bodyRequest.Marca,
    "Valor": bodyRequest.Valor
    
}
produtosJson.push(novoProduto)

res.status(201).json(novoProduto)

})

app.delete("/produtos/deletar/:id",(req, res) => {
    const idRequest = req.params.id
    const produtoEncontrado = produtosJson.find(produto => produto.id == idRequest)

 
    const indice = produtosJson.indexOf(produtoEncontrado)

   
    produtosJson.splice(indice, 1)

    res.status(200).json([{
        "mensagem": "Produto deletado com sucesso",
        "ProdutoDeletado": produtoEncontrado,

    }])

})

app.put("/produtos/substituir/:id", (req, res) => {
    const idRequest = req.params.id
    const bodyRequest = req.body
    const produtoEncontrado = produtosJson.find(produto => produto.id == idRequest)

    const indice = produtosJson.indexOf(produtoEncontrado)


    bodyRequest.id = idRequest

    produtosJson.splice(indice, 1, bodyRequest)

    res.status(200).json([{
        "mensagem": "Dados do produto atualizado com sucesso",
        "dadosAtualizados": bodyRequest,
      produtosJson
    }])
})

app.patch("/produtos/updateValor/:id", (req, res)=>{
    const idRequest = req.params.id
    const novoProduto = req.body.Valor

    const produtoEncontrado = produtosJson.find(produto => produto.id == idRequest)


    produtoEncontrado.Valor = novoProduto

    res.status(200).json([{
        "mensagem": "Valor atualizado com sucesso",
    
    }])

})



app.listen(PORT, ()=>{

console.log(`O servidor está rodando na porta ${PORT}`)

})