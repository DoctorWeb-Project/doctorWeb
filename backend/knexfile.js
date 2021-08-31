// Update with your config settings.

const parse = require('pg-connection-string')
const pgConfig = parse(process.env.DATABASE_URL || '')
pgConfig.ssl = { rejectUnauthorized: false }



module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'doctorweb'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory : "./src/database/migrations"
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: pgConfig,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  }

};
