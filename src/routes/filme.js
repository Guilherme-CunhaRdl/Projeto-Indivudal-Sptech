var express = require("express");
var router = express.Router();

var filmeController = require("../controllers/filmeController");

router.get("/listar", function (req, res) {
    filmeController.listar(req, res);
});

router.get("/buscarFilme/:id", function (req, res) {
    filmeController.buscarFilme(req, res);
});

router.post("/verificarFavorito", function (req, res) {
    filmeController.verificarFavorito(req, res);
});

router.post("/verificarAddLista", function (req, res) {
    filmeController.verificarAddLista(req, res);
});


module.exports = router;