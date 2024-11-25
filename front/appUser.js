//chamada da função createUser para associação ao evento de envio do formulário
document.getElementById("formulario-registro").addEventListener("submit", createUser);

document.addEventListener("DOMContentLoaded", getAllUsers);

document.addEventListener("DOMContentLoaded", getAllUsersTable);

document.addEventListener("DOMContentLoaded", getAllOrganizadorTable);



function createUser(event) {
  //previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
  event.preventDefault();

  //captura os valores dos campos do formulário
  const name = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;
  const data_nascimento = document.getElementById("data").value;

  //requisição HTTP para o enpoint de cadastro de usuario
  fetch("http://10.89.240.14:5000/api/v1/user", {
    //realiza uma chamada http para o servidor, neste caso a rota definida
    method: "POST",
    headers: {
      //A requisição será em formato JSON
      "Content-Type": "application/json",
    },
    //Trabsforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
    body: JSON.stringify({ name, cpf, email, data_nascimento, password }),
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
      alert(data.message);
      console.log(data.message);
      //exibe o log no terminal

      //reseta os campos do formulário após o sucesso dos cadastros
      document.getElementById("formulario-registro").reset();
    })
    .catch((error) => {
      //Captura qualquer erro que ocorra duarante o processo de requisição/resposta

      //Exibe um alerta (front) com o  erro processado
      alert("Erro no cadastro: " + error.message);

      console.error("Erro", error.message);
    });
}

function getAllUsers() {
  fetch("http://10.89.240.14:5000/api/v1/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const userList = document.getElementById("user-list");
      userList.innerHTML = ""; //limpa a lista existente
      data.users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Nome: ${user.name}, CPF: ${user.cpf}, Email: ${user.email}, Data de nascimento: ${user.data_nascimento}`;
        userList.appendChild(listItem);
      });
    })
    .catch((error) => {
      alert("Erro ao obter usuários" + error.message);
      console.error("Erro: ", error.message);
    });
}

function getAllUsersTable(){
  fetch("http://10.89.240.14:5000/api/v1/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const userList = document.getElementById("user-list-tabela");
      userList.innerHTML = ""; // limpa a lista antes de adicionar novos itens

      //Verifica se há usuarios retornados e os adiciona á tabela 
      data.users.forEach((usuario) => {
        //Cria uma nova linha 
        const tr = document.createElement("tr");

        //Cria celulas para nome, cpf e email
        const tdName = document.createElement("td");
        tdName.textContent = usuario.name;tr.appendChild(tdName);

        const tdCPF = document.createElement("td");
        tdCPF.textContent = usuario.cpf;tr.appendChild(tdCPF);

        const tdEmail = document.createElement("td");
        tdEmail.textContent = usuario.email;tr.appendChild(tdEmail);

        const tdData_nascimento = document.createElement("td");
        tdData_nascimento.textContent = usuario.data_nascimento;tr.appendChild(tdData_nascimento);

        //adiciona a linha á tabela
        userList.appendChild(tr);

        

      });
    })
    .catch((error) =>{
      alert("Erro ao obter usuários: " + error.message);
      console.error("Erro: ", error.message)
    })
}


function getAllOrganizadorTable(){
  fetch("http://10.89.240.14:5000/api/v1/organizador", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const organizadorList = document.getElementById("organizador-list-tabela");
      organizadorList.innerHTML = ""; // limpa a lista antes de adicionar novos itens

      //Verifica se há usuarios retornados e os adiciona á tabela 
      data.organizadores.forEach((organizadores) => {
        //Cria uma nova linha 
        const tr = document.createElement("tr");

        //Cria celulas para nome, cpf e email
        const tdNome = document.createElement("td");
        tdNome.textContent = organizadores.nome;tr.appendChild(tdNome);

        const tdTelefone = document.createElement("td");
        tdTelefone.textContent = organizadores.telefone;tr.appendChild(tdTelefone);

        const tdEmail = document.createElement("td");
        tdEmail.textContent = organizadores.email;tr.appendChild(tdEmail);

        const tdData_nascimento = document.createElement("td");
        tdData_nascimento.textContent = usuario.data_nascimento;tr.appendChild(tdData_nascimento);

        //adiciona a linha á tabela
        organizadorList.appendChild(tr);
      });
    })
    .catch((error) =>{
      alert("Erro ao obter usuários: " + error.message);
      console.error("Erro: ", error.message)
    })
}
