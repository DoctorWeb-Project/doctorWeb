const connection = require('../database/connection')

module.exports ={

    async listarConsultas(request, response){
        const userRG = request.user.rg
        try {
            const unfilteredCpf = await connection.raw(`SELECT cpf FROM usuario WHERE rg="${userRG}"`)
            if(!unfilteredCpf[0][0]) return response.sendStatus(404)

            const cpf = unfilteredCpf[0][0].cpf
            
            const consultations = await connection.raw(`SELECT * FROM consulta WHERE paciente_cpf=${cpf}`)
            return response.json(consultations[0])

        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }
    },

    async criarConsulta(request, response){
        const data = request.body
        const userRG = request.user.rg

        try {
            const unfilteredCpf = await connection.raw(`SELECT cpf FROM usuario WHERE rg="${userRG}"`)
            if(!unfilteredCpf[0][0]) return response.sendStatus(404)

            const cpf = unfilteredCpf[0][0].cpf

            await connection.raw(`INSERT INTO consulta VALUES(default, ${data.data}, ${data.preco}, "${cpf}")`)

            return response.sendStatus(201)

        } catch (error) {
            console.log(error)

            return response.sendStatus(500)
        }

    },

    async atualizar(request, response){
        const data = request.body
        const id = request.params.id
        const userRG = request.user.rg

        try {
            const unfilteredCpf = await connection.raw(`SELECT cpf FROM usuario WHERE rg="${userRG}"`)
            if(!unfilteredCpf[0][0]) return response.sendStatus(404)

            const cpf = unfilteredCpf[0][0].cpf

            const consultation = await connection.raw(`SELECT * FROM consulta WHERE id=${id}`)

            if(!consultation[0][0]) return response.sendStatus(404)

            if(data.data) await connection.raw(`UPDATE consulta SET data=${data.data} WHERE id=${id} AND paciente_cpf=${cpf}`)

            return response.sendStatus(204)

        } catch (error) {
            console.log(error)

            return response.sendStatus(500)
        }

    },

    async deletar(request, response){
        const userRG = request.user.rg
        const id = request.params.id
        console.log("id: ", id)

        try {
            const unfilteredCpf = await connection.raw(`SELECT cpf FROM usuario WHERE rg="${userRG}"`)
            if(!unfilteredCpf[0][0]) return response.sendStatus(404)

            const cpf = unfilteredCpf[0][0].cpf

            const unfilteredConsultation = await connection.raw(`SELECT * FROM consulta WHERE id=${id}`)

            if(!unfilteredConsultation[0][0]) return response.sendStatus(404)
           

            await connection.raw(`DELETE FROM consulta WHERE id=${id} AND paciente_cpf=${cpf} `)

            return response.sendStatus(204)

        } catch (error) {
            console.log(error)

            return response.sendStatus(500)
        }
    }
}