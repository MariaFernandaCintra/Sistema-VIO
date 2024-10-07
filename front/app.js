//Acessa o objeto "document" que representa a pagina html

const { application } = require("express");

//seleciona o elemrnto com o id indicado do formulário
document
    .getElementById("formulario-registro")

    //adiciona um ouvinte de evento (sumit) para capiturar o envio do formulário
    .addEventListener("submit", function(event){
        //previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página 
        event.preventDefault();

        //captura os valores dos campos do formulário
        const name = document.getElementById("nome");
        const cpf = document.getElementById("cpf");
        const email = document.getElementById("email");
        const password = document.getElementById("senha");

        //requisição HTTP para o enpoint de cadastro de usuario
        fetch("http://localhost:5000/api/v1/user",{
            //realiza uma chamada http para o servidor, neste caso a rota definida 
            method: "POST",
            headers:{
                //A requisição será em formato JSON  
                "Content-Type": application/json
            },
            //Trabsforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
            body: JSON.stringify({name, cpf, email, password}), 
        }) 

    });