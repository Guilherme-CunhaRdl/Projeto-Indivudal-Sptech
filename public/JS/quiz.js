let perguntas = [];
let perguntaAtual = 0;
let pontos = 0;

function iniciarQuiz() {
    document.querySelector(".quiz_banner").style.display = "none";
    document.querySelector(".quiz_perguntas").style.display = "flex";

    let idFilme = sessionStorage.getItem("idFilme");

    fetch(`/quiz/buscar/${idFilme}`)
        .then((res) => res.json())
        .then((dados) => {
            perguntas = dados;
            console.log(perguntas)
            mostrarPergunta();
        });
}

function mostrarPergunta() {
    tituloPergunta.innerHTML = perguntas[perguntaAtual].tituloPergunta;
    respostas = perguntas[perguntaAtual].respostas
    respostas.sort(() => Math.random() - 0.5);
    alternativas.innerHTML = "";
    for(let i = 0; i < respostas.length;i++){
        alternativas.innerHTML += `            
        <button class="alternativa" onclick="responder(${respostas[i].correta})">
                ${respostas[i].texto}
        </button>`
    }



}

function responder(respotaEscolhida){
    if(respotaEscolhida == 1){
        pontos++;
    }
    perguntaAtual++;

    if(perguntaAtual < perguntas.length){
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }

}

function finalizarQuiz(){

    console.log(perguntas[0].idQuiz)

    fetch("/quiz/finalizar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkUsuario: sessionStorage.ID_USUARIO,
            fkQuiz: perguntas[0].idQuiz,
            pontuacao: pontos
        })
    });

    document.querySelector(".quiz_card").innerHTML = `
        <h1>Quiz finalizado!</h1>
        <p>Você acertou ${pontos} de ${perguntas.length}</p>
                <a href="./filmes.html" class="alternativa">
              VOLTAR
        </a>
    `;

}

function carregarQuiz() {
    let idFilme = sessionStorage.getItem("idFilme");
    console.log(idFilme);

    fetch(`/quiz/buscarFilme/${idFilme}`)
        .then((res) => res.json())
        .then((dados) => {
            tituloQuiz.innerHTML = dados[0].nomeFilme;
            qtdPergunta.innerHTML = `${dados[0].qtdPerguntas} Perguntas`;
            capaFilme.innerHTML = `                        <img
                            src="./assets/imgFilmes/${dados[0].imgFilme}"
                            class="imgFilme"
                            alt=""
                        />`;

            quizBanner.style.backgroundImage = `url('./assets/imgFilmes/${dados[0].bannerFilme}')`;
        });
}

window.onload = carregarQuiz();
