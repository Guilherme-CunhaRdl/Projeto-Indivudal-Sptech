var database = require("../database/config");

function listarAvaliacoes(idUsuario) {
    var instrucaoSql = `
    
        SELECT
            a.idAvaliacao,
            a.notaAvaliacao,
            a.descAvaliacao,
            f.nomeFilme,
            f.imgFilme
        FROM avaliacao a
        JOIN filme f
            ON a.fkFilme = f.idFilme
        WHERE a.fkUsuario = ${idUsuario}
        ORDER BY a.idAvaliacao DESC;
    
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

function listarLista(idUsuario) {
    var instrucaoSql = `
SELECT
    f.idFilme,
    f.nomeFilme,
    f.imgFilme,
    GROUP_CONCAT(g.nomeGenero SEPARATOR ' • ') AS generos
FROM queroAssistir q
JOIN filme f
    ON q.fkFilme = f.idFilme
JOIN filmeGenero fg
    ON fg.fkFilme = f.idFilme
JOIN genero g
    ON g.idGenero = fg.fkGenero
WHERE q.fkUsuario = ${idUsuario}
GROUP BY
    f.idFilme,
    f.nomeFilme,
    f.imgFilme;
    
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    listarAvaliacoes,
    listarLista,
};
