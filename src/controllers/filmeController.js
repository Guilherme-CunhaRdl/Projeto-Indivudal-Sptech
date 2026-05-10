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

function verificarFavorito(req, res) {
    let idUsuario = req.body.idUsuarioServer;
    let idFilme = req.body.idFilmeServer;

    filmeModel.verificarFavorito(idFilme,idUsuario)
        .then(resultado => {
            if(resultado.length > 0){
                res.json({ favoritado: true }) 
            }else{
                res.json({ favoritado: false })
            }
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function verificarAddLista(req, res) {
    let idUsuario = req.body.idUsuarioServer;
    let idFilme = req.body.idFilmeServer;

    filmeModel.verificarAddLista(idFilme,idUsuario)
        .then(resultado => {
            if(resultado.length > 0){
                res.json({ adicionado: true }) 
            }else{
                res.json({ adicionado: false })
            }
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}





module.exports = {
    listar,
    buscarFilme,
    verificarFavorito,
    verificarAddLista,
};