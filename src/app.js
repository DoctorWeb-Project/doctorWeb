const express = require("express")
const userController = require('./controllers/userController')
const { authenticateToken } = require("./services/auth")

const App = express()

App.use(express.json())

const routes = express.Router()

routes.post('/login', userController.login)

routes.post('/cadastro', userController.cadastro)

routes.put('/atualizarConta', authenticateToken ,userController.atualizar)

routes.get('/minhasConsultas', ()=>console.log("Suas consultas"))

App.use(routes)


App.listen(3333)
