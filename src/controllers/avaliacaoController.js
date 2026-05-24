var avaliacaoModel = require("../models/avaliacaoModel");


function listarAvaliacoes(req, res) {

    var idUsuario = req.params.idUsuario;

    avaliacaoModel.listarAvaliacoes(idUsuario)
        .then(function(resultado) {

            res.status(200).json(resultado);

        })
        .catch(function(erro) {

            console.log(erro);

            res.status(500).json(erro.sqlMessage);

        });
  
}

function listarLista(req, res) {

    var idUsuario = req.params.idUsuario;

    avaliacaoModel.listarLista(idUsuario)
        .then(function(resultado) {

            res.status(200).json(resultado);

        })
        .catch(function(erro) {

            console.log(erro);

            res.status(500).json(erro.sqlMessage);

        });
  
}

module.exports = {
    listarAvaliacoes,
    listarLista
}