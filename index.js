const { request, response } = require("express");
const express = require("express");
const req = require("express/lib/request");
const { status } = require("express/lib/response");
const app = express();
app.use(express.json());

//function funcaoInit () =>{ console.log()}

// esta e a porta do servido do api
const port = 3001;

app.listen(port,() => {
    console.log("servidor Teste iniciado")
});

const usuarios = [];
const produtos = [];

// aqui vemos os usuarios dentro do api 

app.get("/usuarios",(request,response) => {

    // esto e uma json e a mesma coisa que 
    // const meuUsuarios = { usuarios : usuarios}
    // na chaves so colocava {meuUsuarios}
    response.json({usuarios: usuarios})
});

//adicionamos os usuarios na api 

app.post("/usuarios",(request,response) => {
 
    // usamos para casatra o produto o mesmo esta api

    const dadosInPut = {
        nome: request.body.nome,
        codigo: request.body.codigo,
    }
    usuarios.push(dadosInPut)
    response.json({usuarios:usuarios})
});

// onde sera deletado os dados do cadastro

app.delete("/usuarios/:id",(request,response) => {

    // recebendo o id da requisicao
    const { id } = request.params;

    // utilizando o metodo splice para remover um item da posicao do array que foi recebido no parametro
    usuarios.splice(id,1);
   
    // retornando sucesso: 204 representa que deu tudo certo, porém nao tem nada para retornar
    return response.json({message:"O usuario da posição " + id + " foi deletado"}); 
});

// atualizar o usuario 

app.put('/usuarios/:id', (request,response) => {
    const {id} = request.params;
    const {nome, codigo} = request.body;

    const dadosInPut = {
        nome, 
        codigo
    }
  
    usuarios[id] = dadosInPut;
    return response.json({message:'O Usuario da posição '+ id + " foi atualizado"});
});


//============= PRODUTOS ======================


// vemos os produtos dentro da api 

app.get("/produtos",(request,response) => {

        response.json({produtos:produtos})
});

//adicionamos os produtos na api 

app.post("/produtos",(request,response) => {

    const produtosInPut = {
        iten : request.body.iten,
        Quantidades: request.body.Quantidades,
        }
    
    produtos.push(produtosInPut)
    response.json({produtos:produtos})
});

// Deletamos o produto do cadastro

app.delete("/produtos/:id",(request,response) =>{

    const {id} = request.params;

    produtos.splice(id,1)

    return response.json({message:"O Produto da posição " + id + " foi deletado"})
       
});

  // atualizamos o produto 

  app.put("/produtos/:id",(request,response) =>{
    
    const {id} = request.params;
        const produtosInPut = {
        iten: request.body.iten,
        Quantidades:request.body.Quantidades

    }
    produtos[id] = produtosInPut
    
    //return response.json(produtos);
    return response.json({message:'O produto da posição '+ id + " foi atualizado"})

  });

