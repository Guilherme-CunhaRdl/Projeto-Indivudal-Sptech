let coracaoCheio = false;

// Faz uma requisição pra pagina
fetch("navbar.html")
    //Transforma esse negocio da resposta em HTML
    .then((res) => res.text())

    // ai quando ele chega ele insere no HTML
    .then((data) => {
        document.getElementById("navbar").innerHTML = data;
    });



function mudarCoracao() {
    if (coracaoCheio == false) {
        coracao.innerHTML = `<i class="bi bi-heart-fill"></i>`;
        coracaoCheio = true;
    } else {
        coracao.innerHTML = `<i class="bi bi-heart"></i>`;
        coracaoCheio = false;
    }
}

function abrirModal() {
    document.getElementById("modalNota").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function fecharModal() {
    document.getElementById("modalNota").style.display = "none";
    document.body.style.overflow = "auto";
}

function nota(notaNum) {
    if (notaNum == 1) {
        txt_avaliacao.innerHTML = `😭 Péssimo.`;
    } else if (notaNum == 2) {
        txt_avaliacao.innerHTML = `😞 Ruim.`;
    } else if (notaNum == 3) {
        txt_avaliacao.innerHTML = `🤨 Sem graça.`;
    } else if (notaNum == 4) {
        txt_avaliacao.innerHTML = `😔 Fraco.`;
    } else if (notaNum == 5) {
        txt_avaliacao.innerHTML = `🙂 Ok.`;
    } else if (notaNum == 6) {
        txt_avaliacao.innerHTML = `😊 Bom, mas poderia ser melhor.`;
    } else if (notaNum == 7) {
        txt_avaliacao.innerHTML = `😆 Otimo Filme.`;
    } else if (notaNum == 8) {
        txt_avaliacao.innerHTML = `😎 Muito Bom.`;
    } else if (notaNum == 9) {
        txt_avaliacao.innerHTML = `😀 Uma obra prima.`;
    } else if (notaNum == 10) {
        txt_avaliacao.innerHTML = `🍿🎥 Simplesmente Studio Ghibli.`;
    }
}

function carregarFilme() {
    const idFilme = sessionStorage.getItem("idFilme");

    fetch(`http://localhost:3333/filmes/buscarFilme/${idFilme}`)
    .then((res) => res.json())
    .then((filme) => {


        // como no select ta vindo varios JSON por conta do genero eu pego so o 1(que no caso tem o indice 0) pros dados base 
        const dados = filme[0];

        tituloFilme.innerHTML = dados.nomeFilme;
        dataLancamentoFilme.innerHTML = dados.dataLancamento;
        qtdMinutosFilme.innerHTML = dados.qtdMinutos;
        imgFilme.innerHTML = `<img src="./assets/${dados.bannerFilme}" class="img_banner" />`;
        descFilme.innerHTML = dados.descFilme;
        modalTitulo.innerHTML = dados.nomeFilme;
        nomeDiretor.innerHTML = dados.diretor;
        nomeRoteirista.innerHTML = dados.roteirista;
        imgPoster.innerHTML = `<img src="./assets/${dados.imgFilme}" />`;


        // ai aqui eu rodo todos os JSON pegando o generos e coloco em uma lista
        let generos = [];

        for (let i = 0; i < filme.length; i++) {
            if (filme[i].nomeGenero) {
                generos.push(filme[i].nomeGenero);
            }
        }
        // Esse .Join serve pra transformar uma lista em 1 linha so esse " • " e o que vai ficar no meio
        generoFilme.innerHTML = generos.join(" • ");
    });
}

window.onload = carregarFilme;
