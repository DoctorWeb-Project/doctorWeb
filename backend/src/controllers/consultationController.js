const connection = require('../database/connection')

module.exports ={

    async listarConsultas(request, response){
        const userRG = request.user.rg
        try {
            const unfilteredCpf = await connection.raw(`SELECT cpf FROM usuario WHERE rg='${userRG}'`)
            if(!unfilteredCpf[0][0]) return response.sendStatus(404)

            const cpf = unfilteredCpf[0][0].cpf
            
            const consultations = await connection.raw(`SELECT id, nome, YEAR(data) as ano, DATE_FORMAT(data,'%m') as mes , DATE_FORMAT(data,'%d') as dia, DATE_FORMAT(data,'%H') as hora, DATE_FORMAT(data,'%i') as minutos ,preco, paciente_cpf FROM consulta WHERE paciente_cpf=${cpf}`)
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
            const unfilteredCpf = await connection.raw(`SELECT cpf FROM usuario WHERE rg='${userRG}'`)
            if(!unfilteredCpf[0][0]) return response.sendStatus(404)

            const cpf = unfilteredCpf[0][0].cpf

            await connection.raw(`INSERT INTO consulta VALUES(default,'${data.name}','${data.date}', ${data.price}, '${cpf}')`)

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
            const unfilteredCpf = await connection.raw(`SELECT cpf FROM usuario WHERE rg='${userRG}'`)
            if(!unfilteredCpf[0][0]) return response.sendStatus(404)

            const cpf = unfilteredCpf[0][0].cpf

            const consultation = await connection.raw(`SELECT * FROM consulta WHERE id=${id}`)

            if(!consultation[0][0]) return response.sendStatus(404)

            if(data.date) await connection.raw(`UPDATE consulta SET data='${data.date}' WHERE id=${id} AND paciente_cpf=${cpf}`)
            if(data.name) await connection.raw(`UPDATE consulta SET nome='${data.name}' WHERE id=${id} AND paciente_cpf=${cpf}`)
            if(data.price) await connection.raw(`UPDATE consulta SET preco='${data.price}' WHERE id=${id} AND paciente_cpf=${cpf}`)

            return response.sendStatus(204)

        } catch (error) {
            console.log(error)

            return response.sendStatus(500)
        }

    },

    async deletar(request, response){
        const userRG = request.user.rg
        const id = request.params.id

        try {
            const unfilteredCpf = await connection.raw(`SELECT cpf FROM usuario WHERE rg='${userRG}'`)
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