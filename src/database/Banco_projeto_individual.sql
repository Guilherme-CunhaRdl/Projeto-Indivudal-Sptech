CREATE DATABASE bibliotecahowl;

USE bibliotecahowl;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR(20),
email VARCHAR(150),
senha VARCHAR(255),
imgUsuario VARCHAR(200),
bannerUsuario VARCHAR(200),
dtCadastro
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


USE Bibliotecahowl;

INSERT INTO genero (nomeGenero) VALUES
('Aventura'),
('Fantasia'),
('Drama'),
('Família'),
('Animação'),
('Romance');

INSERT INTO filme 
(nomeFilme, descFilme, dataLancamento, qtdMinutos, imgFilme, bannerFilme, diretor, roteirista)
VALUES

('Nausicaä do Vale do Vento',
'Uma princesa guerreira tenta salvar o planeta de uma floresta tóxica.',
'1984-03-11',
117,
'nausicaa.jpg',
'nausicaa-banner.jpg',
'Hayao Miyazaki',
'Hayao Miyazaki'),

('O Castelo no Céu',
'Dois jovens procuram uma lendária cidade flutuante.',
'1986-08-02',
124,
'castelo-ceu.jpg',
'castelo-ceu-banner.jpg',
'Hayao Miyazaki',
'Hayao Miyazaki'),

('Túmulo dos Vagalumes',
'Dois irmãos lutam para sobreviver durante a Segunda Guerra Mundial.',
'1988-04-16',
89,
'tumulo-vagalumes.jpg',
'tumulo-vagalumes-banner.jpg',
'Isao Takahata',
'Isao Takahata'),

('Meu Amigo Totoro',
'Duas irmãs conhecem espíritos mágicos na floresta.',
'1988-04-16',
86,
'totoro.jpg',
'totoro-banner.jpg',
'Hayao Miyazaki',
'Hayao Miyazaki'),

('O Serviço de Entregas da Kiki',
'Uma jovem bruxa inicia sua vida independente em uma nova cidade.',
'1989-07-29',
103,
'kiki.jpg',
'kiki-banner.jpg',
'Hayao Miyazaki',
'Hayao Miyazaki'),

('Memórias de Ontem',
'Uma mulher relembra sua infância enquanto viaja pelo interior.',
'1991-07-20',
118,
'memorias-ontem.jpg',
'memorias-ontem-banner.jpg',
'Isao Takahata',
'Isao Takahata'),

('Porco Rosso: O Último Herói Romântico',
'Um piloto amaldiçoado vive aventuras nos céus da Itália.',
'1992-07-18',
94,
'porco-rosso.jpg',
'porco-rosso-banner.jpg',
'Hayao Miyazaki',
'Hayao Miyazaki'),

('Eu Posso Ouvir o Oceano',
'Dois jovens vivem conflitos emocionais durante a adolescência.',
'1993-05-05',
72,
'oceano.jpg',
'oceano-banner.jpg',
'Tomomi Mochizuki',
'Keiko Niwa'),

('PomPoko: A Grande Batalha dos Guaxinins',
'Guaxinins mágicos tentam proteger sua floresta da urbanização.',
'1994-07-16',
119,
'pompoko.jpg',
'pompoko-banner.jpg',
'Isao Takahata',
'Isao Takahata'),

('Sussurros do Coração',
'Uma garota encontra inspiração para seguir seus sonhos.',
'1995-07-15',
111,
'sussurros.jpg',
'sussurros-banner.jpg',
'Yoshifumi Kondo',
'Hayao Miyazaki'),

('Princesa Mononoke',
'Um príncipe se envolve em uma guerra entre humanos e espíritos.',
'1997-07-12',
134,
'mononoke.jpg',
'mononoke-banner.jpg',
'Hayao Miyazaki',
'Hayao Miyazaki'),

('Meus Vizinhos, os Yamadas',
'Uma divertida coletânea sobre o cotidiano de uma família japonesa.',
'1999-07-17',
104,
'yamadas.jpg',
'yamadas-banner.jpg',
'Isao Takahata',
'Isao Takahata'),

('A Viagem de Chihiro',
'Uma garota entra em um mundo mágico para salvar seus pais.',
'2001-07-20',
125,
'chihiro.jpg',
'chihiro-banner.jpg',
'Hayao Miyazaki',
'Hayao Miyazaki'),

('O Reino dos Gatos',
'Uma jovem é levada ao misterioso reino dos gatos.',
'2002-07-19',
75,
'reino-gatos.jpg',
'reino-gatos-banner.jpg',
'Hiroyuki Morita',
'Reiko Yoshida'),

('O Castelo Animado',
'Uma jovem amaldiçoada encontra um poderoso mago.',
'2004-11-20',
119,
'castelo-animado.jpg',
'castelo-animado-banner.jpg',
'Hayao Miyazaki',
'Hayao Miyazaki'),

('Contos de Terramar',
'Um jovem príncipe enfrenta forças sombrias em um reino mágico.',
'2006-07-29',
115,
'terrmar.jpg',
'terrmar-banner.jpg',
'Goro Miyazaki',
'Goro Miyazaki'),

('Ponyo: Uma Amizade que Veio do Mar',
'Uma peixinha mágica deseja se tornar humana.',
'2008-07-19',
101,
'ponyo.jpg',
'ponyo-banner.jpg',
'Hayao Miyazaki',
'Hayao Miyazaki'),

('O Mundo dos Pequeninos',
'Pequenas pessoas vivem escondidas dentro de uma casa.',
'2010-07-17',
94,
'arrietty.jpg',
'arrietty-banner.jpg',
'Hiromasa Yonebayashi',
'Hayao Miyazaki'),

('Da Colina Kokuriko',
'Dois estudantes vivem um romance em Yokohama nos anos 60.',
'2011-07-16',
91,
'kokuriko.jpg',
'kokuriko-banner.jpg',
'Goro Miyazaki',
'Hayao Miyazaki'),

('Vidas ao Vento',
'A história do criador dos aviões de guerra japoneses.',
'2013-07-20',
126,
'vidas-vento.jpg',
'vidas-vento-banner.jpg',
'Hayao Miyazaki',
'Hayao Miyazaki'),

('O Conto da Princesa Kaguya',
'Uma menina misteriosa surge dentro de um bambu brilhante.',
'2013-11-23',
137,
'kaguya.jpg',
'kaguya-banner.jpg',
'Isao Takahata',
'Isao Takahata'),

('As Memórias de Marnie',
'Uma garota faz amizade com uma jovem misteriosa.',
'2014-07-19',
103,
'marnie.jpg',
'marnie-banner.jpg',
'Hiromasa Yonebayashi',
'Keiko Niwa'),

('A Tartaruga Vermelha',
'Um homem naufragado encontra uma tartaruga misteriosa.',
'2016-09-17',
80,
'tartaruga-vermelha.jpg',
'tartaruga-vermelha-banner.jpg',
'Michael Dudok de Wit',
'Michael Dudok de Wit'),

('Aya e a Bruxa',
'Uma garota órfã descobre um mundo de magia.',
'2020-12-30',
82,
'aya.jpg',
'aya-banner.jpg',
'Goro Miyazaki',
'Keiko Niwa'),

('O Menino e a Garça',
'Um garoto embarca em uma jornada fantástica após uma perda.',
'2023-07-14',
124,
'menino-garca.jpg',
'menino-garca-banner.jpg',
'Hayao Miyazaki',
'Hayao Miyazaki');

INSERT INTO filmeGenero (fkFilme, fkGenero) VALUES
(1,1),(1,2),
(2,1),(2,2),
(3,3),
(4,2),(4,4),
(5,2),(5,4),
(6,3),(6,6),
(7,1),(7,5),
(8,3),(8,6),
(9,2),(9,5),
(10,1),(10,2),
(11,5),
(12,1),(12,2),
(13,2),(13,4),
(14,2),(14,6),
(15,1),(15,2),
(16,2),(16,4),
(17,2),(17,4),
(18,6),(18,3),
(19,3),(19,6),
(20,2),(20,3),
(21,3),(21,2),
(22,3),
(23,2),(23,4),
(24,1),(24,2),
(25,2),(25,3);
