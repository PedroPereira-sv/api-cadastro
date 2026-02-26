 
 import express, { response } from 'express'
 import mongoose from 'mongoose'

 const app = express()
 // avisando ao express que as requisições serão no formato json
 app.use(express.json())           


//conectando ao banco de dados MongoDB Atlas
 mongoose.connect('mongodb+srv://dcpsilva59_db_user:gh7c2PETKwQI4lbL@cluster0.9zp5hbh.mongodb.net/Usuarios?appName=Cluster0')

 // se a conexão for bem sucedida, exibe a mensagem "Conectado ao banco de dados Mongo"
 .then( () => console.log("Conectado ao banco de dados Mongo"))

 // se houver um erro na conexão, exibe a mensagem "Erro ao conectar ao Mongo"
 .catch( () => console.log("Erro ao conectar ao Mongo"))

 //schema (esquema de dados) - o formato que os dados devem seguir para serem inseridos no banco de dados
  const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    idade: {type: Number, required: true}

// o timestamps coloca no banco automaticamente o dia e o horario que as informações forem criadas
  },{timestamps: true})

//criando o modelo de usuario
// ele recebe o nome do modelo (Usuario) e o schema (usuarioSchema) que define a estrutura dos dados
 const Usuario = mongoose.model('Usuario', usuarioSchema)

 // rota para listar os usuários
 app.get('/usuarios', async (request,response) => { 
    
   //usando o modelo Usuario para buscar todos os usuarios no banco de dados
    const usuarios = await Usuario.find()
    response.json(usuarios)                    
 })

 // criar novos usuarios
 app.post('/usuarios', async (request,response) =>{

 // criando um novo usuario usando o modelo Usuario e os dados enviados na requisição (request.body)
    const usuarioCriado = await Usuario.create(request.body) 
  
// enviando a resposta para o cliente com os dados do usuario criado
    response.json(usuarioCriado)
 })

 // iniciando o servidor na porta 3003
 app.listen(3003, () => {                        
    console.log("Servidor rodando na porta 3003") 
 });