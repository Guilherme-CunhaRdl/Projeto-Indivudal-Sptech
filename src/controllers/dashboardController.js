var dashboardModel = require("../models/dashboardModel");

function buscarKPIs(req, res) {

    dashboardModel.buscarKPIs()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarGeneroFilmes(req, res) {

    dashboardModel.buscarGeneroFilmes()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function filmesMaisAvaliados(req, res) {

    dashboardModel.filmesMaisAvaliados()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function filmesMaisFavoritados(req, res) {

    dashboardModel.filmesMaisFavoritados()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarKPIs,
    buscarGeneroFilmes,
    filmesMaisAvaliados,
    filmesMaisFavoritados
}