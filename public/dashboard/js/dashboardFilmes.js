window.onload = listarFilmes;

function listarFilmes() {
    fetch("/dashboard/listarFilmes")
        .then((resposta) => resposta.json())
        .then((dados) => {
            containerFilmes.innerHTML = "";

            for (let i = 0; i < dados.length; i++) {
                let filme = dados[i];

                let ano = filme.dataLancamento.split("-")[0];

                containerFilmes.innerHTML += `
                
                <div class="card_filme">

                    <img src="../assets/imgFilmes/${filme.imgFilme}" alt="">

                    <div class="texto_sobre">

                        <h3>${filme.nomeFilme}</h3>

                        <p>${ano} • ${filme.qtdMinutos} min</p>

                        <span>
                            <i class="bi bi-star-fill" style="color: #f0aa2e"></i>

                            ${filme.mediaAvaliacoes || "0.0"}
                        </span>

                        <button onclick="abrirModal(${filme.idFilme})">
                            Ver detalhes
                        </button>

                    </div>

                </div>
                `;
            }
        })
        .catch((erro) => {
            console.log(erro);
        });
}

function abrirModal(idFilme) {
    let idFilmeEscolhido = idFilme;
    console.log(idFilmeEscolhido);
    document.getElementById("modalFilme").style.display = "flex";
    document.body.style.overflow = "hidden";
    fetch(`/dashboard/puxarFilme/${idFilmeEscolhido}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
            let ano = dados[0].dataLancamento.split("-")[0];

            let generos = dados[0].generos.split(",");

            divGenerosFilmes.innerHTML = "";

            for (let i = 0; i < generos.length; i++) {
                divGenerosFilmes.innerHTML += `
        <span>${generos[i]}</span>
    `;
            }

            nomeFilme.innerHTML = dados[0].nomeFilme;
            descFilme.innerHTML = dados[0].descFilme;
            nomeDiretor.innerHTML = dados[0].diretor;
            nomeRoteirista.innerHTML = dados[0].roteirista;
            mediaAvaliacoesModal.innerHTML = `${dados[0].mediaAvaliacoes} (Avaliações)`;
            imgModal.src = `../assets/imgFilmes/${dados[0].imgFilme}`;
            dataFilme.innerHTML = ` ${ano} • ${dados[0].qtdMinutos} Min •`;
            buscarTaxaQuiz(dados[0].idFilme)
        })
        .catch((erro) => {
            console.log(erro);
        });
}

function fecharModal() {
    document.getElementById("modalFilme").style.display = "none";
    document.body.style.overflow = "auto";
}

function buscarTaxaQuiz(idFilme) {
    fetch(`/dashboard/taxaQuiz/${idFilme}`)
        .then(res => res.json())
        .then(dados => {

            let soma = 0;

            for(let i = 0; i < dados.length; i++) {

                soma +=
                    (dados[i].pontuacao /
                    dados[i].totalPerguntas) * 100;
            }

            let media = dados.length > 0
                ? soma / dados.length
                : 0;

            taxaQuiz.innerHTML =
                `${media.toFixed(1)}%`;
        });
}
