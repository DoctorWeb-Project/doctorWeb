const express = require("express")
const consultationController = require("./controllers/consultationController")
const userController = require('./controllers/userController')
const { authenticateToken } = require("./services/auth")

const App = express()

App.use(express.json())

const routes = express.Router()

routes.post('/login', userController.login)

routes.post('/cadastro', userController.cadastro)

routes.put('/atualizarConta', authenticateToken ,userController.atualizar)

routes.delete('/deletarConta', authenticateToken ,userController.deletar)

routes.post('/criarConsulta', authenticateToken, consultationController.criarConsulta)

routes.delete('/deletarConsulta/:id', authenticateToken, consultationController.deletar)

routes.put('/atualizarConsulta/:id', authenticateToken, consultationController.atualizar)

routes.get('/minhasConsultas', authenticateToken, consultationController.listarConsultas)

App.use(routes)


App.listen(3333)
