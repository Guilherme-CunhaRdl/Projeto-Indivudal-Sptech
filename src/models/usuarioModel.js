var database = require("../database/config");

function autenticar(email, senha) {
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
        email,
        senha
    );
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, email,imgUsuario FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, imgUsuario) {
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
        nome,
        email,
        senha
    );

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, email, senha,imgUsuario) VALUES ('${nome}', '${email}', '${senha}','${imgUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function favoritar(idUsuario, idFilme) {
    const instrucaoSql = `
        INSERT INTO favorito (fkUsuario, fkFilme)
        VALUES (${idUsuario}, ${idFilme});
    `;

    return database.executar(instrucaoSql);
}

function queroAssistir(idUsuario, idFilme) {
    const instrucaoSql = `
    INSERT INTO queroAssistir (fkUsuario,fkFilme) VALUES (${idUsuario},${idFilme});
    `;

    return database.executar(instrucaoSql);
}

function RemoverFavoritar(idUsuario, idFilme) {
    const instrucaoSql = `
    DELETE FROM favorito WHERE fkUsuario = '${idUsuario}' AND fkFilme = '${idFilme}';
    `;

    return database.executar(instrucaoSql);
}

function RemoverQueroAssistir(idUsuario, idFilme) {
    const instrucaoSql = `
    DELETE FROM queroAssistir WHERE fkUsuario = '${idUsuario}' AND fkFilme = '${idFilme}';
    `;

    return database.executar(instrucaoSql);
}


function puxarDados(idUsuario) {
    var instrucaoSql = `
SELECT
    u.nomeUsuario,
    u.email,
    u.imgUsuario,
    u.bannerUsuario,
    u.dtCadastro,
    COUNT(DISTINCT f.fkFilme) AS favoritos,
    COUNT(DISTINCT qa.fkFilme) AS qtdQueroAssistir,
    COUNT(DISTINCT a.idAvaliacao) AS avaliacoes
FROM usuario u
LEFT JOIN favorito f
    ON f.fkUsuario = u.idUsuario
LEFT JOIN avaliacao a
    ON a.fkUsuario = u.idUsuario
LEFT JOIN queroAssistir qa
	ON qa.fkUsuario = u.idUsuario
WHERE u.idUsuario = ${idUsuario}
GROUP BY u.idUsuario;;
`;
    return database.executar(instrucaoSql);
}


function puxar5Filmes(idUsuario){

    const instrucaoSql = `
    SELECT 
    f.idFilme,
    f.nomeFilme,
    f.imgFilme,
    f.bannerFilme,
    a.notaAvaliacao
FROM avaliacao a
JOIN filme f
    ON a.fkFilme = f.idFilme
WHERE a.fkUsuario = ${idUsuario}
ORDER BY a.notaAvaliacao DESC
LIMIT 5;
    `;

    return database.executar(instrucaoSql);

}



module.exports = {
    autenticar,
    cadastrar,
    favoritar,
    queroAssistir,
    RemoverQueroAssistir,
    RemoverFavoritar,
    puxarDados,
    puxar5Filmes
};
