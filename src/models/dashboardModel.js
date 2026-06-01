var database = require("../database/config");

function buscarKPIs() {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(*) FROM filme) AS totalFilmes,
            (SELECT COUNT(*) FROM usuario) AS totalUsuarios,
            (SELECT COUNT(*) FROM favorito) AS totalFavoritos;
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


function listarFilmes() {

    var instrucaoSql = `
        SELECT 
            f.idFilme,
            f.nomeFilme,
            f.qtdMinutos,
            f.dataLancamento,
            f.imgFilme,

            ROUND(AVG(a.notaAvaliacao),1) AS mediaAvaliacoes

        FROM filme f

        LEFT JOIN avaliacao a
            ON a.fkFilme = f.idFilme

        GROUP BY f.idFilme

        ORDER BY f.nomeFilme;
    `;

    return database.executar(instrucaoSql);
}

function puxarFilme(idFilme) {

    var instrucaoSql = `
        SELECT 
            f.idFilme,
            f.nomeFilme,
            f.descFilme,
            f.dataLancamento,
            f.qtdMinutos,
            f.imgFilme,
            f.bannerFilme,
            f.diretor,
            f.roteirista,

            GROUP_CONCAT(g.nomeGenero SEPARATOR ', ') AS generos,

            ROUND(AVG(a.notaAvaliacao),1) AS mediaAvaliacoes,

            COUNT(a.idAvaliacao) AS qtdAvaliacoes

        FROM filme f

        LEFT JOIN filmeGenero fg
            ON fg.fkFilme = f.idFilme

        LEFT JOIN genero g
            ON g.idGenero = fg.fkGenero

        LEFT JOIN avaliacao a
            ON a.fkFilme = f.idFilme

        WHERE f.idFilme = ${idFilme}

        GROUP BY f.idFilme;
    `;

    return database.executar(instrucaoSql);
}


function listarUsuarios() {

    var instrucaoSql = `
        SELECT 
            idUsuario,
            nomeUsuario,
            email,
            cargo,
            imgUsuario
        FROM usuario
        ORDER BY nomeUsuario;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKPIs,
    buscarGeneroFilmes,
    filmesMaisAvaliados,
    filmesMaisFavoritados,
    listarFilmes,
    puxarFilme,
    listarUsuarios
};
