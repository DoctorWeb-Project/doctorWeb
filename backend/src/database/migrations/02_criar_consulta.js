exports.up = function(Knex){
    return Knex.schema.createTable('consulta', function(table){
       table.increments().primary();
       table.string('nome').notNullable();
       table.datetime('data').notNullable();
       table.float('preco', 9, 2).notNullable();
       table.string('paciente_cpf', 11 ).notNullable();

       table.foreign('paciente_cpf').references('cpf').inTable('usuario');
    })
}

exports.down = function(Knex){
    return Knex.schema.dropTable('consulta');
}