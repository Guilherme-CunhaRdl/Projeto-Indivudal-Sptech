let coracaoCheio = false;
let queroAssistirAdicionado  = false;

// Faz uma requisição pra pagina
fetch("navbar.html")
    //Transforma esse negocio da resposta em HTML
    .then((res) => res.text())

    // ai quando ele chega ele insere no HTML
    .then((data) => {
        document.getElementById("navbar").innerHTML = data;
    });

function mudarCoracao() {
    let idFilme = sessionStorage.getItem("idFilme");
    let idUsuario = sessionStorage.ID_USUARIO;

    if (coracaoCheio == false) {
        fetch("/usuarios/favoritar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                idFilmeServer: idFilme,
            }),
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    coracao.innerHTML = `<i class="bi bi-heart-fill"></i>`;
                    txt_coracao.innerHTML = `Adicionado aos Favoritos`;
                    coracaoCheio = true;
                } else {
                    console.log("Erro ao favoritar");
                }
            })
            .catch(function (erro) {
                console.log(erro);
            });
    } else {

        fetch("/usuarios/removerFavoritar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idFilmeServer: idFilme,
                idUsuarioServer: idUsuario,
            }),
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    coracao.innerHTML = `<i class="bi bi-heart"></i>`;
                    txt_coracao.innerHTML = `Adicionar aos Favoritos`;
                    coracaoCheio = false;
                } else {
                    console.log("Erro ao Remover da lista");
                }
            })
            .catch(function (erro) {
                console.log(erro);
            });

    }
}

function addQueroAssistir() {
    let idFilme = sessionStorage.getItem("idFilme");
    let idUsuario = sessionStorage.ID_USUARIO;
    console.log(queroAssistirAdicionado)

    if (queroAssistirAdicionado == false) {
        console.log('Estou no IF')


        fetch("/usuarios/queroAssistir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idFilmeServer: idFilme,
                idUsuarioServer: idUsuario,
            }),
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    queroAssistir.innerHTML = `<i class="bi bi-bookmark-check"></i>`;
                    txt_queroAssistir.innerHTML = `Adicionado em Quero Assistir`;
                    queroAssistirAdicionado  = true;
                } else {
                    console.log("Erro ao adicionar a lista");
                }
            })
            .catch(function (erro) {
                console.log(erro);
            });
    } else {
        console.log('Estou no ELSE')

        fetch("/usuarios/removerQueroAssistir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idFilmeServer: idFilme,
                idUsuarioServer: idUsuario,
            }),
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    queroAssistir.innerHTML = `<i class="bi bi-bookmark-plus"></i>`;
                    txt_queroAssistir.innerHTML=`Adicionar em Quero Assistir`;
                    queroAssistirAdicionado  = false;
                } else {
                    console.log("Erro ao Remover da lista");
                }
            })
            .catch(function (erro) {
                console.log(erro);
            });

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

    fetch(`/filmes/buscarFilme/${idFilme}`)
        .then((res) => res.json())
        .then((filme) => {
            // como no select ta vindo varios JSON por conta do genero eu pego so o 1(que no caso tem o indice 0) pros dados base
            const dados = filme[0];

            // Aqui eu so to transoformando a data pro padrão do brasil e tirando a adicção de tempo que o node faz sozinho
            let data = new Date(dados.dataLancamento);
            let dataBR = data.toLocaleDateString("pt-BR");
            dataLancamentoFilme.innerHTML = dataBR;

            tituloFilme.innerHTML = dados.nomeFilme;

            qtdMinutosFilme.innerHTML = dados.qtdMinutos;
            imgFilme.innerHTML = `<img src="./assets/imgFilmes/${dados.bannerFilme}" class="img_banner" />`;
            descFilme.innerHTML = dados.descFilme;
            modalTitulo.innerHTML = dados.nomeFilme;
            nomeDiretor.innerHTML = dados.diretor;
            nomeRoteirista.innerHTML = dados.roteirista;
            imgPoster.innerHTML = `<img src="./assets/imgFilmes/${dados.imgFilme}" />`;

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

function verificarUsuario() {
    const idFilme = sessionStorage.getItem("idFilme");
    let idUsuario = sessionStorage.ID_USUARIO;

    // Verifica se ele ja add esse filme nos seus favoritos
    fetch("/filmes/verificarFavorito", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idFilmeServer: idFilme,
            idUsuarioServer: idUsuario,
        }),
    })
        .then((resposta) => resposta.json())
        .then((dados) => {
            if (dados.favoritado == true) {
                coracao.innerHTML = `<i class="bi bi-heart-fill"></i>`;
                txt_coracao.innerHTML = `Adicionado aos Favoritos`;
                coracaoCheio = true;
            } else {
                coracao.innerHTML = `<i class="bi bi-heart"></i>`;
                txt_coracao.innerHTML = `Adicionar aos Favoritos`;
                coracaoCheio = false;
            }
        });

    // Verifica se esse filme ja ta na lista daquele usuario
    fetch("/filmes/verificarAddLista", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idFilmeServer: idFilme,
            idUsuarioServer: idUsuario,
        }),
    })
        .then((resposta) => resposta.json())
        .then((dados) => {
            if (dados.adicionado == true) {
                queroAssistir.innerHTML = `<i class="bi bi-bookmark-check"></i>`;
                txt_queroAssistir.innerHTML = `Adicionado em Quero Assistir`;
                queroAssistirAdicionado = true;
            } else {
                queroAssistir.innerHTML = `<i class="bi bi-bookmark-plus"></i>`;
                txt_queroAssistir.innerHTML = `Adicionar em Quero Assistir`;
                queroAssistirAdicionado = false;
            }
        });
}

window.onload = () => {
    carregarFilme();
    verificarUsuario();
};
