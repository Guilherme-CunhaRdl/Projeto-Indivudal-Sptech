var database = require("../database/config");

function buscarKPIs() {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(*) FROM filme) AS totalFilmes,
            (SELECT COUNT(*) FROM usuario) AS totalUsuarios,
            (SELECT COUNT(*) FROM favorito) AS totalFavoritos,
            (SELECT COUNT(*) FROM curtida) AS totalCurtidas;
    `;

    return database.executar(instrucaoSql);
}

function buscarGeneroFilmes() {
    var instrucaoSql = `
        SELECT 
            g.nomeGenero,
            COUNT(fg.fkFilme) AS totalFilmes
        FROM genero g
        JOIN filmeGenero fg
            ON fg.fkGenero = g.idGenero
        GROUP BY g.nomeGenero;
    `;

    return database.executar(instrucaoSql);
}

function filmesMaisAvaliados() {
    var instrucaoSql = `SELECT 
    f.nomeFilme,
    f.imgFilme,
    ROUND(AVG(a.notaAvaliacao),1) AS media,
    COUNT(a.idAvaliacao) AS qtdAvaliacoes
FROM avaliacao a
JOIN filme f 
    ON f.idFilme = a.fkFilme
GROUP BY f.idFilme
ORDER BY qtdAvaliacoes DESC
LIMIT 5;`;

    return database.executar(instrucaoSql);
}

function filmesMaisFavoritados() {

    var instrucaoSql = `
        SELECT 
            f.nomeFilme,
            COUNT(fav.fkFilme) AS totalFavoritos
        FROM favorito fav
        JOIN filme f
            ON f.idFilme = fav.fkFilme
        GROUP BY f.idFilme
        ORDER BY totalFavoritos DESC
        LIMIT 5;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKPIs,
    buscarGeneroFilmes,
    filmesMaisAvaliados,
    filmesMaisFavoritados
};
