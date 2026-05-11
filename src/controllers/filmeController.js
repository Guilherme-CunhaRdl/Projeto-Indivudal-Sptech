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


function enviarAvaliacao(req,res){

    let idUsuario = req.body.idUsuarioServer;
    let idFilme = req.body.idFilmeServer;
    let avalaicaoFilme = req.body.avalaicaoServer;
    let notaFilme = req.body.notaSelecionadaServer;

    filmeModel.enviarAvaliacao(idFilme,idUsuario,avalaicaoFilme,notaFilme)
        .then(function (resultado){
            res.status(200).send("Enviado avaliação com sucesso")
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}



function verificarAvaliacao(req, res) {
    let idUsuario = req.body.idUsuarioServer;
    let idFilme = req.body.idFilmeServer;

    filmeModel.verificarAvaliacao(idFilme,idUsuario)
        .then(resultado => {
            res.json()
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
    enviarAvaliacao,
    verificarAvaliacao,
};