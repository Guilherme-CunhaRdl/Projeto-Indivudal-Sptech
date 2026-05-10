var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload')

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", upload.single("foto"), function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/favoritar", function (req, res) {
    usuarioController.favoritar(req, res);
});

router.post("/queroAssistir", function (req, res) {
    usuarioController.queroAssistir(req, res);
});

router.post("/removerFavoritar", function (req, res) {
    usuarioController.RemoverFavoritar(req, res);
});

router.post("/removerQueroAssistir", function (req, res) {
    usuarioController.RemoverQueroAssistir(req, res);
});




module.exports = router;
