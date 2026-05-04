CREATE DATABASE bibliotecahowl;

USE bibliotecahowl;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR(20),
email VARCHAR(150),
senha VARCHAR(20),
imgUsuario VARCHAR(200),
bannerUsuario VARCHAR(200)
);

CREATE TABLE filme(
idFilme INT PRIMARY KEY AUTO_INCREMENT,
nomeFilme VARCHAR(100),
descFilme VARCHAR(250),
dataLancamento INT,
qtdMinutos INT,
imgFilme VARCHAR(255),
bannerFilme VARCHAR(255),
genero VARCHAR(100),
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

CREATE TABLE avaliacao(
idAvaliacao INT AUTO_INCREMENT,
notaAvaliacao INT,
CONSTRAINT chNota CHECK(notaAvaliacao >= 0 AND notaAvaliacao <=10),
descAvaliacao VARCHAR(300),
fkUsuario INT,
CONSTRAINT chFkUsuario FOREIGN KEY(fkUsuario) REFERENCES usuario(idUsuario),
fkFilme INT,
CONSTRAINT chFkFilme FOREIGN KEY(fkFilme) REFERENCES filme(idFilme),
CONSTRAINT chPkAvaliacao PRIMARY KEY(idAvaliacao,fkUsuario,fkFilme)
);

CREATE TABLE QueroAssitir(
idQueroAssitir INT AUTO_INCREMENT,
fkUsuario INT,
CONSTRAINT chFkUsuarioQueroAssitir FOREIGN KEY(fkUsuario) REFERENCES usuario(idUsuario),
fkFilme INT,
CONSTRAINT chFkFilmeQueroAssitir FOREIGN KEY(fkFilme) REFERENCES filme(idFilme),
CONSTRAINT chPkQueroAssitir PRIMARY KEY(idQueroAssitir,fkUsuario,fkFilme)
);

CREATE TABLE curtida(
idCurtida INT AUTO_INCREMENT,
fkUsuarioCurtiu INT,
CONSTRAINT chFkUsuarioCurtida FOREIGN KEY(fkUsuarioCurtiu) REFERENCES usuario(idUsuario),
fkAvaliacao INT,
CONSTRAINT chFkAvaliacaoCurtida FOREIGN KEY(fkAvaliacao) REFERENCES avaliacao(idAvaliacao),
CONSTRAINT chPkCurtida PRIMARY KEY(idCurtida,fkUsuarioCurtiu,fkAvaliacao)
);


CREATE TABLE Quiz(
idQuiz INT PRIMARY KEY AUTO_INCREMENT,
nomeQuiz VARCHAR(100),
fkFilme INT UNIQUE,
CONSTRAINT chFkFilmeQuiz FOREIGN KEY(fkFilme) REFERENCES filme(idFilme)
);

CREATE TABLE PerguntaQuiz(
idPergunta INT AUTO_INCREMENT,
tituloPergunta VARCHAR(150),
fkQuiz INT,
CONSTRAINT chfkQuiz FOREIGN KEY(fkQuiz) REFERENCES Quiz(idQuiz),
CONSTRAINT chPkQuiz PRIMARY KEY(idPergunta,fkQuiz)
);

CREATE TABLE RespostaPergunta(
idRespostaPergunta INT AUTO_INCREMENT,
descResposta VARCHAR(150),
RespostaVerdadeira BOOLEAN,
fkPerguntaQuiz INT,
CONSTRAINT chFkPerguntaQuiz  FOREIGN KEY(fkPerguntaQuiz) REFERENCES PerguntaQuiz(idPergunta),
CONSTRAINT chPkPerguntaQuiz PRIMARY KEY(idRespostaPergunta,fkPerguntaQuiz)
);



CREATE TABLE QuizRespondido(
idQuizRespondido INT AUTO_INCREMENT,
quizRespondido BOOLEAN,
fkUsuario INT,
CONSTRAINT chFkUsuarioQuizResp FOREIGN KEY(fkUsuario) REFERENCES usuario(idUsuario),
fkQuiz INT,
CONSTRAINT chfkQuizResp FOREIGN KEY(fkQuiz) REFERENCES Quiz(idQuiz),
CONSTRAINT chPkQuizRespondido PRIMARY KEY(idQuizRespondido,fkUsuario,fkQuiz)
);





INSERT INTO genero (nomeGenero) VALUES
('Fantasia'),
('Aventura'),
('Drama'),
('Romance'),
('Animação');


INSERT INTO filme 
(nomeFilme, descFilme, dataLancamento, qtdMinutos, imgFilme, bannerFilme, diretor, roteirista)
VALUES
('A Viagem de Chihiro', 'Uma garota entra em um mundo espiritual e precisa salvar seus pais.', 2001, 125, 'Princesa_Mononoke.webp', 'ChihiroBanner.jpg', 'Hayao Miyazaki', 'Hayao Miyazaki'),

('Meu Amigo Totoro', 'Duas irmãs encontram espíritos da floresta no interior do Japão.', 1988, 86, 'Princesa_Mononoke.webp', 'ChihiroBanner.jpg', 'Hayao Miyazaki', 'Hayao Miyazaki'),

('O Castelo Animado', 'Uma jovem é amaldiçoada e busca ajuda de um mago misterioso.', 2004, 119, 'Princesa_Mononoke.webp', 'ChihiroBanner.jpg', 'Hayao Miyazaki', 'Hayao Miyazaki'),

('Princesa Mononoke', 'Um príncipe se envolve em um conflito entre humanos e espíritos.', 1997, 134, 'Princesa_Mononoke.webp', 'ChihiroBanner.jpg', 'Hayao Miyazaki', 'Hayao Miyazaki'),

('O Serviço de Entregas da Kiki', 'Uma jovem bruxa começa seu próprio serviço de entregas.', 1989, 103, 'Princesa_Mononoke.webp', 'ChihiroBanner.jpg', 'Hayao Miyazaki', 'Hayao Miyazaki');



INSERT INTO filmeGenero VALUES
(1, 1), (1, 2), (1, 3), 
(2, 1), (2, 3), (2, 5), 
(3, 1), (3, 2), (3, 4),
(4, 1), (4, 2), (4, 3),
(5, 1), (5, 2), (5, 5);











