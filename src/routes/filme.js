var express = require("express");
var router = express.Router();

var filmeController = require("../controllers/filmeController");

router.get("/listar", function (req, res) {
    filmeController.listar(req, res);
});

router.get("/buscarFilme/:id", function (req, res) {
    filmeController.buscarFilme(req, res);
});

module.exports = router;