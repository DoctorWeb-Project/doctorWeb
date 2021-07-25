const express = require("express")

const App = express()

const routes = express.Router()

routes.get('/login', ()=>console.log("Faça login"))

routes.get('/cadastro', ()=>console.log("Tela de cadastro"))

routes.get('/minhasConsultas', ()=>console.log("Suas consultas"))

App.use(routes)

App.listen(3333)