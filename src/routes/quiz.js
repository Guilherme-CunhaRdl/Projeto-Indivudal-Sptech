var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");


router.get("/buscarFilme/:id", function (req, res) {
    quizController.buscarQuizFilme(req, res);
});

router.get("/buscar/:id", function (req, res) {
    quizController.buscarQuiz(req, res);
});


router.post("/finalizar", function (req, res) {
    quizController.finalizarQuiz(req, res);
});






module.exports = router;