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

module.exports = {
    listar
};