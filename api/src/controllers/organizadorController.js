let organizadores = [];
let OrgId = 1;

module.exports = class organizadorController{
  static async createOrganizador(req, res) {
    const { telefone, email, password, name } = req.body;

    if (!telefone || !email || !password || !name) {
      return res
      .status(400)
      .json({ error: "Todos os campos devem ser preenchidos" });
    } 
    
    else if (isNaN(telefone) || telefone.length !== 11) {
        return res
        .status(400)
        .json({error: "Telefone inválido. Deve conter exatamente 11 dígitos numéricos",});
    } 
    
    else if (!email.includes("@")) {
       return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }

    // Verifica se já existe um usuário com o mesmo CPF
    const existingOrganizador = organizadores.find((organizador) => organizador.email === email);
    if (existingOrganizador) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Cria e adiciona novo usuário
    const newOrganizador = { id_organizador: OrgId++, telefone, email, password, name };
    organizadores.push(newOrganizador);
    return res
    .status(201)
    .json({ message: "Usuário organizador criado com sucesso"});
}

static async getAllOrganizadores(req, res) {
  return res
    .status(200)
    .json({ message: "Obtendo todos os usuários", organizadores});
}

static async updateOrganizador(req, res) {
  //Desestrutura e recupera dados enviados via corpo de requisição
  const { id_organizador, telefone, email, password, name } = req.body;

  //Validar se os todos os campos foram preenchidos
  if (!telefone || !email || !password || !name) {
    return res
      .status(400)
      .json({ error: "Todos os campos devem ser preenchidos!!" });
  }

  //Procurar indice no Array "organizadores" pelo ID
  const organizadorIndex = organizadores.findIndex((organizador) => organizador.id_organizador == id_organizador);
  
  //Se o usuario não for encontrado userIdex = -1
  if (organizadorIndex == -1) {
    return res.status(400).json({ error: "Usuário não encontrado!!" });
  }

  //Atualiza os dados do usuario no Array "organizadores"
  organizadores[organizadorIndex] = { id_organizador, telefone, email, password, name };
  return res
    .status(200)
    .json({ message: "Usuário organizador atualizado!!", organizador: organizadores[organizadorIndex] });
  }

  //DELETE
  static async deleteOrganizador(req, res) {
    //Procurar indice no Array "organizadores" pelo ID
    const id_organizador = req.params.id_organizador;

    const OrgId = organizadores.findIndex((organizador) => organizador.id_organizador == id_organizador);

  
    if (OrgId == -1) {
      return res.status(400).json({ error: "Usuário não encontrado!!" });
    }

    //Removendo o usuário do Array 'organizadores'
    organizadores.splice(OrgId, 1);
    return res.status(200).json({ message: "Usuário organizador Apagado!!" });
  }
}
