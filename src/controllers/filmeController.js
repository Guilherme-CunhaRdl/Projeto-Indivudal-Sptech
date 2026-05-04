var filmeModel = require("../models/filmeModel");

function listar(req, res) {
    filmeModel.listar()
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarFilme(req, res) {
    var idFilme = req.params.id;

    filmeModel.buscarFilme(idFilme)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}



module.exports = {
    listar,
    buscarFilme
};