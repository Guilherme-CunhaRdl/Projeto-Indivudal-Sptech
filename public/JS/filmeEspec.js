let coracaoCheio = false;
let queroAssistirAdicionado = false;
let notaSelecionada = 0;
let usuarioLogado = false;

// Faz uma requisição pra pagina
fetch("navbar.html")
    //Transforma esse negocio da resposta em HTML
    .then((res) => res.text())

    // ai quando ele chega ele insere no HTML
    .then((data) => {
        document.getElementById("navbar").innerHTML = data;
    });

function mudarCoracao() {
    if (usuarioLogado == false) {
        alert("Faça Login para liberar");
        return;
    }

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
    if (usuarioLogado == false) {
        alert("Faça Login para liberar");
        return;
    }

    let idFilme = sessionStorage.getItem("idFilme");
    let idUsuario = sessionStorage.ID_USUARIO;
    console.log(queroAssistirAdicionado);

    if (queroAssistirAdicionado == false) {
        console.log("Estou no IF");

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
                    queroAssistirAdicionado = true;
                } else {
                    console.log("Erro ao adicionar a lista");
                }
            })
            .catch(function (erro) {
                console.log(erro);
            });
    } else {
        console.log("Estou no ELSE");

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
                    txt_queroAssistir.innerHTML = `Adicionar em Quero Assistir`;
                    queroAssistirAdicionado = false;
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
    if (usuarioLogado == false) {
        alert("Faça Login para liberar");
        return;
    }
    document.getElementById("modalNota").style.display = "flex";
    document.body.style.overflow = "hidden";
    document.getElementById("modalpt1").style.display = "flex";
    document.getElementById("modalpt2").style.display = "none";
}

function chamarpt2() {
    document.getElementById("modalpt1").style.display = "none";
    modalTitulo.innerHTML = "Escreva um pouco sobre o que achou ";
    document.getElementById("modalpt2").style.display = "flex";
    document.getElementById("btnModal").onclick = fecharModal;
}

function fecharModal() {
    let avalaicao = ipt_avaliacao.value;

    enviarAvaliacao(avalaicao);

    document.getElementById("modalNota").style.display = "none";
    document.getElementById("btnModal").onclick = chamarpt2;
    document.body.style.overflow = "auto";
    document.getElementById("modalpt1").style.display = "flex";
    document.getElementById("modalpt2").style.display = "none";
}

function nota(notaNum) {
    notaSelecionada = notaNum;

    if (notaSelecionada == 1) {
        txt_avaliacao.innerHTML = `😭 Péssimo.`;
    } else if (notaSelecionada == 2) {
        txt_avaliacao.innerHTML = `😞 Ruim.`;
    } else if (notaSelecionada == 3) {
        txt_avaliacao.innerHTML = `🤨 Sem graça.`;
    } else if (notaSelecionada == 4) {
        txt_avaliacao.innerHTML = `😔 Fraco.`;
    } else if (notaSelecionada == 5) {
        txt_avaliacao.innerHTML = `🙂 Ok.`;
    } else if (notaSelecionada == 6) {
        txt_avaliacao.innerHTML = `😊 Bom, mas poderia ser melhor.`;
    } else if (notaSelecionada == 7) {
        txt_avaliacao.innerHTML = `😆 Otimo Filme.`;
    } else if (notaSelecionada == 8) {
        txt_avaliacao.innerHTML = `😎 Muito Bom.`;
    } else if (notaSelecionada == 9) {
        txt_avaliacao.innerHTML = `😀 Uma obra prima.`;
    } else if (notaSelecionada == 10) {
        txt_avaliacao.innerHTML = `🍿🎥 Simplesmente Studio Ghibli.`;
    }
}

function enviarAvaliacao(avalaicao) {
    const idFilme = sessionStorage.getItem("idFilme");
    let idUsuario = sessionStorage.ID_USUARIO;

    if (notaSelecionada == 0) {
        alert("Por favor selecione uma nota valida");
    }

    fetch(`/filmes/enviarAvaliacao`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idFilmeServer: idFilme,
            idUsuarioServer: idUsuario,
            notaSelecionadaServer: notaSelecionada,
            avalaicaoServer: avalaicao,
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                alert("Avaliação Enviada com sucesso, muito obrigado");
            } else {
                console.log("Erro ao enviar a avaliação");
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
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

    let idUsuario = sessionStorage.ID_USUARIO;
    if (idUsuario) {
        usuarioLogado = true;
    }
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

    fetch("/filmes/verificarAvaliacao", {
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
            ipt_avaliacao.innerHTML = dados.descAvaliacao;
            nota(dados.notaAvaliacao)
        });
}

window.onload = () => {
    carregarFilme();
    verificarUsuario();
};
