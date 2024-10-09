//Acessa o objeto "document" que representa a pagina html

//const { application, response } = require("express");

//seleciona o elemrnto com o id indicado do formulário
document
  .getElementById("formulario-registro")

  //adiciona um ouvinte de evento (sumit) para capiturar o envio do formulário
  .addEventListener("submit", function (event) {
    //previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
    event.preventDefault();

    //captura os valores dos campos do formulário
    const name = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    //requisição HTTP para o enpoint de cadastro de usuario
    fetch("http://localhost:5000/api/v1/user", {
      //realiza uma chamada http para o servidor, neste caso a rota definida
      method: "POST",
      headers: {
        //A requisição será em formato JSON
        "Content-Type": "application/json",
      },
      //Trabsforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
      body: JSON.stringify({ name, cpf, email, password }),
    })
      .then((response) => {
        //tratamento da resposta do servidor / API
        if (response.ok) {
          //verifica se a resposta foi bem sucedida (status 2xx)
          return response.json();
        }
        //convertendo o erro em formato json
        return response.json().then((err) => {
          //mensagem retornada do servidor, acessada pela chave 'error'
          throw new Error(err.error);
        });
      }) //fechamento da then (response)
      .then((data) => {
        //executa a resposta de sucesso - retorna ao usuario final
        //exibe um alerta para o usuário final (front), com o nome do usuário que acabou de ser cadastrado
        alert("Usuário cadastrado com sucesso! " + data.user.name);

        //exibe o log no terminal
        console.log("Usuario criado", data.user);

        //reseta os campos do formulário após o sucesso dos cadastros
        document.getElementById("formulario-registro").reset();
      })
      .catch((error) => {
        //Captura qualquer erro que ocorra duarante o processo de requisição/resposta

        //Exibe um alerta (front) com o  erro processado
        alert("Erro no cadastro: " + error.message);

        console.error("Erro", error.message);
      });
});