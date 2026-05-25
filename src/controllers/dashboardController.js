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

function listarFilmes(req, res) {

    dashboardModel.listarFilmes()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function puxarFilme(req, res) {
    var idFilme = req.params.id;


    dashboardModel.puxarFilme(idFilme)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarUsuarios(req, res) {

    dashboardModel.listarUsuarios()
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
    filmesMaisFavoritados,
    listarFilmes,
    puxarFilme,
    listarUsuarios
}