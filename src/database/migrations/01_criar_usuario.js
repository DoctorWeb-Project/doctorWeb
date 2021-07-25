exports.up = function(Knex){
    return Knex.schema.createTable('usuario', function(table){
        table.string('cpf', 11).notNullable().primary();
        table.string('nome').notNullable();
        table.enu('sexo', ['M','F']).notNullable();
        table.string('rg', 14).notNullable();
        table.float('peso', 2, 5).notNullable();
        table.string('numero_sus', 15).notNullable();
        table.date('data_nascimento').notNullable();
    })
}

exports.down = function(Knex){
    return Knex.schema.dropTable('user');
}