  
const knex = require('knex')

const dbEngine = process.env.DB_ENVIRONMENT || 'development'

const config = require('../../knexfile')[dbEngine]

const connection = knex(config)

module.exports = connection;