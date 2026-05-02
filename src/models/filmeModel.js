var database = require("../database/config");

function listar() {
    var instrucaoSql = `
        SELECT * FROM filme;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};