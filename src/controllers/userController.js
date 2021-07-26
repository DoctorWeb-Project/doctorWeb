const connection = require('../database/connection')
const auth = require('../services/auth')

module.exports = {
    async login(request, response){

        const {cpf, senha} = request.body

        try {
            const unfilteredUser = await connection.raw(`SELECT nome FROM usuario WHERE cpf="${cpf}" AND senha="${senha}"`)
            const user = unfilteredUser[0][0].nome
            if(!user) return response.sendStatus(404)

            const unfilteredUserRG = await connection.raw(`SELECT rg FROM usuario WHERE cpf="${cpf}"`)
            const userRG = unfilteredUserRG[0][0].rg

            console.log("rg: ",userRG)
            console.log("usuario: ", user)

            const token = auth.generateAccessToken(userRG)

            return response.send(token)

        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }

    },

    async cadastro(request, response){
        const data = request.body
        console.log(request.body)
        try {
            await connection.raw(`INSERT INTO usuario VALUES("${data.cpf}", "${data.nome}", "${data.sexo}", "${data.rg}", ${data.peso},"${data.numero_sus}", ${data.data_nascimento}, "${data.senha}")`)
            return response.sendStatus(200)

        } catch (error) {
            console.log(error)
            return response.sendStatus(400)
        }

    },

    async atualizar(request, response){
        const data = request.body
        const userRG = request.user.rg

        try {
            const unfilteredCpf = await connection.raw(`SELECT cpf FROM usuario WHERE rg ="${userRG}"`)
            const cpf = unfilteredCpf[0][0].cpf

            console.log("array de cpf: ",cpf)

            if(cpf.length==0) return response.sendStatus(404)

            console.log("cpf: ",cpf)

            if(data.nome)  await connection.raw(`UPDATE usuario SET nome="${data.nome}" WHERE cpf="${cpf}" `)
            if(data.peso)  await connection.raw(`UPDATE usuario SET peso=${data.peso} WHERE cpf="${cpf}"`)
            if(data.senha)  await connection.raw(`UPDATE usuario SET senha="${data.senha}" WHERE cpf="${cpf}"`)

            return response.sendStatus(204)

        } catch (error) {
            console.log(error)

            return response.sendStatus(500)
        }
    }
}
