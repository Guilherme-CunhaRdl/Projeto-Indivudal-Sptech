var database = require("../database/config");

function buscarQuiz(idFilme) {
    var instrucaoSql = `
SELECT idQuiz,nomeFilme,nomeQuiz,idPergunta,tituloPergunta,
idRespostaPergunta,descResposta,respostaVerdadeira 
FROM vwSelecionarQuiz WHERE idFilme = ${idFilme};
`;

    return database.executar(instrucaoSql).then((resultado) => {
        let perguntas = [];
        let idsPergunta = [];
        for (let i = 0; i < resultado.length; i++) {
            let pergunta = resultado[i];

            let posicaoPergunta = idsPergunta.indexOf(pergunta.idPergunta);

            if (posicaoPergunta == -1) {
                idsPergunta.push(pergunta.idPergunta);
                perguntas.push({
                    idQuiz: pergunta.idQuiz,
                    idPergunta: pergunta.idPergunta,
                    tituloPergunta: pergunta.tituloPergunta,
                    respostas: [
                        {
                            texto: pergunta.descResposta,
                            correta: pergunta.respostaVerdadeira,
                        },
                    ],
                });
            } else {
                perguntas[posicaoPergunta].respostas.push({
                    texto: pergunta.descResposta,
                    correta: pergunta.respostaVerdadeira,
                });
            }
        }

        return perguntas;
    });
}

function buscarQuizFilme(idFilme) {
    var instrucaoSql = `
    SELECT * FROM VwSelecionarFilmeQuiz WHERE idFilme = ${idFilme};
`;

    return database.executar(instrucaoSql);
}

function finalizarQuiz(fkUsuario, fkQuiz, pontuacao) {
    var instrucaoSql = `
        INSERT INTO QuizRespondido
        (quizRespondido, fkUsuario, fkQuiz, pontuacao)
        VALUES
        (true, ${fkUsuario}, ${fkQuiz}, ${pontuacao});
    `;

    return database.executar(instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarQuiz,
    buscarQuizFilme,
    finalizarQuiz,
};
