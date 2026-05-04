CREATE DATABASE bibliotecahowl;

USE bibliotecahowl;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR(20),
email VARCHAR(150),
senha VARCHAR(255),
imgUsuario VARCHAR(200),
bannerUsuario VARCHAR(200)
);

CREATE TABLE filme(
idFilme INT PRIMARY KEY AUTO_INCREMENT,
nomeFilme VARCHAR(100),
descFilme VARCHAR(250),
dataLancamento DATE,
qtdMinutos INT,
imgFilme VARCHAR(255),
bannerFilme VARCHAR(255),
diretor VARCHAR(100),
roteirista VARCHAR(100)
);

CREATE TABLE genero (
    idGenero INT PRIMARY KEY AUTO_INCREMENT,
    nomeGenero VARCHAR(50)
);

CREATE TABLE filmeGenero (
    fkFilme INT,
    fkGenero INT,
    PRIMARY KEY (fkFilme, fkGenero),
    FOREIGN KEY (fkFilme) REFERENCES filme(idFilme),
    FOREIGN KEY (fkGenero) REFERENCES genero(idGenero)
);

CREATE TABLE avaliacao (
    idAvaliacao INT PRIMARY KEY AUTO_INCREMENT,
    notaAvaliacao INT,
    descAvaliacao VARCHAR(300),
    fkUsuario INT,
    fkFilme INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkFilme) REFERENCES filme(idFilme),
    CONSTRAINT chk_nota CHECK (notaAvaliacao BETWEEN 0 AND 10)
);

CREATE TABLE queroAssistir (
    fkUsuario INT,
    fkFilme INT,
    PRIMARY KEY (fkUsuario, fkFilme),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkFilme) REFERENCES filme(idFilme)
);

CREATE TABLE curtida (
    fkUsuario INT,
    fkAvaliacao INT,
    PRIMARY KEY (fkUsuario, fkAvaliacao),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkAvaliacao) REFERENCES avaliacao(idAvaliacao)
);


CREATE TABLE Quiz(
idQuiz INT PRIMARY KEY AUTO_INCREMENT,
nomeQuiz VARCHAR(100),
fkFilme INT UNIQUE,
CONSTRAINT chFkFilmeQuiz FOREIGN KEY(fkFilme) REFERENCES filme(idFilme)
);

CREATE TABLE PerguntaQuiz(
idPergunta INT PRIMARY KEY AUTO_INCREMENT,
tituloPergunta VARCHAR(150),
fkQuiz INT,
FOREIGN KEY(fkQuiz) REFERENCES Quiz(idQuiz)
);

CREATE TABLE RespostaPergunta(
idRespostaPergunta INT PRIMARY KEY AUTO_INCREMENT,
descResposta VARCHAR(150),
respostaVerdadeira BOOLEAN,
fkPerguntaQuiz INT,
FOREIGN KEY(fkPerguntaQuiz) REFERENCES PerguntaQuiz(idPergunta)
);



CREATE TABLE QuizRespondido(
idQuizRespondido INT PRIMARY KEY AUTO_INCREMENT,
quizRespondido BOOLEAN,
fkUsuario INT,
fkQuiz INT,
pontuacao INT DEFAULT 0,
dataResposta DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(fkUsuario) REFERENCES usuario(idUsuario),
FOREIGN KEY(fkQuiz) REFERENCES Quiz(idQuiz)
);


