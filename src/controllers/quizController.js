var quizModel = require("../models/quizModel");

function buscarQuiz(req, res) {
    var idFilme = req.params.id;

    quizModel
        .buscarQuiz(idFilme)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarQuizFilme(req, res) {
    var idFilme = req.params.id;

    quizModel
        .buscarQuizFilme(idFilme)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function finalizarQuiz(req, res) {
    let fkUsuario = req.body.fkUsuario
    let fkQuiz = req.body.fkQuiz
    let pontuacao = req.body.pontuacao

    quizModel
        .finalizarQuiz(fkUsuario,fkQuiz,pontuacao)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).send(erro);
        });
}

module.exports = {
    buscarQuiz,
    buscarQuizFilme,
    finalizarQuiz,
};
