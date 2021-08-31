const connection = require('../database/connection')
const auth = require('../services/auth')

module.exports = {
    async login(request, response){

        const {cpf, senha} = request.body

        try {
            const unfilteredUser = await connection.raw(`SELECT nome FROM usuario WHERE cpf="${cpf}" AND senha="${senha}"`)
            console.log(unfilteredUser)

            if(!unfilteredUser[0][0]) return response.sendStatus(404)

            const user = unfilteredUser[0][0].nome
            

            const unfilteredUserRG = await connection.raw(`SELECT rg FROM usuario WHERE cpf="${cpf}"`)
            const userRG = unfilteredUserRG[0][0].rg

            const token = auth.generateAccessToken(userRG)

            return response.json({token, user})

        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }

    },

    async cadastro(request, response){
        const data = request.body
        console.log(request.body)
        try {
            await connection.raw(`INSERT INTO usuario VALUES('${data.cpf}', '${data.name}', '${data.sex}', '${data.rg}', ${data.weight},'${data.sus}', ${data.birthdate}, '${data.password}')`)
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
            if(!unfilteredCpf[0][0]) return response.sendStatus(404)

            const cpf = unfilteredCpf[0][0].cpf

            console.log("cpf: ",cpf)

            if(data.name)  await connection.raw(`UPDATE usuario SET nome="${data.name}" WHERE cpf="${cpf}" `)
            if(data.wieght)  await connection.raw(`UPDATE usuario SET peso=${data.weight} WHERE cpf="${cpf}"`)
            if(data.password)  await connection.raw(`UPDATE usuario SET senha="${data.password}" WHERE cpf="${cpf}"`)

            return response.sendStatus(204)

        } catch (error) {
            console.log(error)

            return response.sendStatus(500)
        }
    },

    async deletar(request, response){
        const userRG = request.user.rg

        try {
            const unfilteredCpf = await connection.raw(`SELECT cpf FROM usuario WHERE rg="${userRG}"`)
            const cpf = unfilteredCpf[0][0].cpf

            if(!cpf) return response.sendStatus(404)

            await connection.raw(`DELETE FROM usuario WHERE cpf="${cpf}"`) 

            return response.sendStatus(204)

        } catch (error) {
            console.log(error)

            return response.sendStatus(500)
        }
    }
}
