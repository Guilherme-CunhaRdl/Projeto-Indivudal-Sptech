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

function verificarFavorito(idFilme, idUsuario) {
    var instrucaoSql = `
    SELECT * FROM favorito WHERE fkUsuario = '${idUsuario}' AND fkFilme = '${idFilme}';
`;

    return database.executar(instrucaoSql);
}

function verificarAddLista(idFilme, idUsuario) {
    var instrucaoSql = `
    SELECT * FROM queroAssistir WHERE fkUsuario = '${idUsuario}' AND fkFilme = '${idFilme}';
`;

    return database.executar(instrucaoSql);
}

function enviarAvaliacao(idFilme, idUsuario, descAvaliacao, notaAvaliacao) {
    var instrucaoSql = `
    INSERT INTO avaliacao (fkFilme,fkUsuario,descAvaliacao,notaAvaliacao) VALUES ('${idFilme}','${idUsuario}','${descAvaliacao}','${notaAvaliacao}');
`;

    return database.executar(instrucaoSql);
}

function verificarAvaliacao(idFilme, idUsuario) {
    var instrucaoSql = `
    SELECT * FROM avaliacao WHERE fkUsuario = '${idUsuario}' AND fkFilme = '${idFilme}'
`;

    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    buscarFilme,
    verificarFavorito,
    verificarAddLista,
    enviarAvaliacao,
    verificarAvaliacao,
};
