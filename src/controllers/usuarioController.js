var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var imgUsuario = req.file.filename;




    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha,imgUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function favoritar(req, res) {

    let idUsuario = req.body.idUsuarioServer;
    let idFilme = req.body.idFilmeServer;

    usuarioModel.favoritar(idUsuario, idFilme)
        .then(function (resultado) {
            res.status(200).send("Favoritado com sucesso");
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function queroAssistir(req,res){

    let idUsuario = req.body.idUsuarioServer;
    let idFilme = req.body.idFilmeServer;

    usuarioModel.queroAssistir(idUsuario,idFilme)
        .then(function (resultado){
            res.status(200).send("Adicionado a lista com sucesso")
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    

}

function RemoverFavoritar(req, res) {

    let idUsuario = req.body.idUsuarioServer;
    let idFilme = req.body.idFilmeServer;

    usuarioModel.RemoverFavoritar(idUsuario, idFilme)
        .then(function (resultado) {
            res.status(200).send("Removido Favoritado com sucesso");
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function RemoverQueroAssistir(req,res){

    let idUsuario = req.body.idUsuarioServer;
    let idFilme = req.body.idFilmeServer;

    usuarioModel.RemoverQueroAssistir(idUsuario,idFilme)
        .then(function (resultado){
            res.status(200).send("Removido da lista com sucesso")
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    

}

module.exports = {
    autenticar,
    cadastrar,
    favoritar,
    queroAssistir,
    RemoverQueroAssistir,
    RemoverFavoritar,
}