var express = require("express");
var router = express.Router();
const upload = require("../config/configUpload");

var dashboardController = require("../controllers/dashboardController");

router.get("/kpis", function (req, res) {
    dashboardController.buscarKPIs(req, res);
});

router.get("/graficoGenero", function (req, res) {
    dashboardController.buscarGeneroFilmes(req, res);
});

router.get("/filmesMaisAvaliados", function (req, res) {
    dashboardController.filmesMaisAvaliados(req, res);
});

router.get("/filmesFavoritados", function (req, res) {
    dashboardController.filmesMaisFavoritados(req, res);
});

router.get("/listarFilmes", function (req, res) {
    dashboardController.listarFilmes(req, res);
});

router.get("/puxarFilme/:id", function (req, res) {
    dashboardController.puxarFilme(req, res);
});

router.get("/listarUsuarios", function(req, res) {
    dashboardController.listarUsuarios(req, res);
});

module.exports = router;