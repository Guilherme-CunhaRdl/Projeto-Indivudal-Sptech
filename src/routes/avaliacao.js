var express = require("express");
var router = express.Router();
const upload = require("../config/configUpload");

var avaliacaoController = require("../controllers/avaliacaoController");

router.get("/listarAvaliacoes/:idUsuario", function(req, res) {
    avaliacaoController.listarAvaliacoes(req, res);
});

router.get("/listarLista/:idUsuario", function(req, res) {
    avaliacaoController.listarLista(req, res);
});





module.exports = router;