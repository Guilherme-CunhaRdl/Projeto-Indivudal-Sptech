var database = require("../database/config");

function listar() {
    var instrucaoSql = `
        SELECT * FROM filme;
    `;
    return database.executar(instrucaoSql);
}

function buscarFilme(idFilme) {
    var instrucaoSql = `
    SELECT 
        f.*, 
        g.nomeGenero
    FROM filme f
    LEFT JOIN filmeGenero fg ON fg.fkFilme = f.idFilme
    LEFT JOIN genero g ON g.idGenero = fg.fkGenero
    WHERE f.idFilme = ${idFilme};
`;
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    buscarFilme,
};
