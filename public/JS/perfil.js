function puxarDados() {
    let idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/usuarios/puxarDados/${idUsuario}`)
        .then((res) => res.json())
        .then((usuario) => {
            // como no select ta vindo varios JSON por conta do genero eu pego so o 1(que no caso tem o indice 0) pros dados base
            const dados = usuario[0];

            let data = new Date(dados.dtCadastro);
            let dataBR = data.toLocaleDateString("pt-BR");
            dtCad_usuario.innerHTML = dataBR;

            nome_Usuario.innerHTML = dados.nomeUsuario;

            ipt_nomeEditar.value = dados.nomeUsuario;

            email_usuario.innerHTML = dados.email;

            ipt_emailEditar.value = dados.email;

            ipt_senha.value = dados.senha;

            document.getElementById("img_usuario").src = dados.imgUsuario
                ? `./assets/imgUsuarios/${dados.imgUsuario}`
                : "./assets/mononokeIcon.jpg";

            document.getElementById("img_usuarioEditar").src = dados.imgUsuario
                ? `./assets/imgUsuarios/${dados.imgUsuario}`
                : "./assets/mononokeIcon.jpg";

            document.getElementById("banner_usuario").src = dados.bannerUsuario
                ? `./assets/imgUsuarios/${dados.bannerUsuario}`
                : "./assets/BannerPadrao.png";

            document.getElementById("banner_usuarioEditar").src =
                dados.bannerUsuario
                    ? `./assets/imgUsuarios/${dados.bannerUsuario}`
                    : "./assets/BannerPadrao.png";

            lista_usuario.innerHTML = dados.qtdQueroAssistir;
            favoritos_usuario.innerHTML = dados.favoritos;
            avaliacoes_usuario.innerHTML = dados.avaliacoes;
        });
}

function puxar5Filmes() {
    let idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/usuarios/puxar5Filmes/${idUsuario}`)
        .then((res) => res.json())
        .then((filmes) => {
            const container = document.querySelector(".div_filmes");
            container.innerHTML = "";

            filmes.forEach((filme) => {
                container.innerHTML += `
                        <div class="div_cardFilme">
                            <img src="./assets/imgFilmes/${filme.imgFilme}" alt="" />

                            <div>
                                <h3>${filme.nomeFilme}</h3>
                                <span>${filme.notaAvaliacao}/10 <i class="bi bi-star"></i> </span>
                            </div>
                        </div>
        `;
            });
        });
}

function abrirModal() {
    modalEditar.style.display = "flex";
}

function fecharModal() {
    modalEditar.style.display = "none";
}

function salvarPerfil() {
    let idUsuario = sessionStorage.ID_USUARIO;
    let nome = ipt_nomeEditar.value;
    let email = ipt_emailEditar.value;
    let senha = ipt_senha.value;

    var img = inputFoto.files[0];
    var banner = inputBanner.files[0];

    let formData = new FormData();

    formData.append("idUsuarioServer", idUsuario);
    formData.append("nomeServer", nome);
    formData.append("emailServer", email);
    formData.append("senhaServer", senha);
    formData.append("imgServer", img);
    formData.append("bannerServer", banner);

    fetch("/usuarios/editarPerfil", {
        method: "PUT",
        body: formData,
    }).then(() => {
        alert("Perfil atualizado");
        location.reload();
    });
}

function previewFoto() {
    var arquivo = inputFoto.files[0];

    if (arquivo) {
        var novaImagem = URL.createObjectURL(arquivo);

        img_usuarioEditar.src = novaImagem;
    }
}

function previewBanner() {
    var arquivo = inputBanner.files[0];

    if (arquivo) {
        var novaImagem = URL.createObjectURL(arquivo);

        banner_usuarioEditar.src = novaImagem;
    }
}

function abrirModalAvaliacoes() {
    modalAvaliacoes.style.display = "flex";
    puxarAvaliacoes();
}

function fecharModalAvaliacoes() {
    modalAvaliacoes.style.display = "none";
}


function abrirModalLista() {
    modalLista.style.display = "flex";
    puxarLista();
}

function fecharModalLista() {
    modalLista.style.display = "none";
}

function puxarAvaliacoes() {
    console.log('To aqui')
    let idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/avaliacao/listarAvaliacoes/${idUsuario}`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            containerAvaliacoes.innerHTML = "";

            for (let i = 0; i < dados.length; i++) {
                let registro = dados[i];

                containerAvaliacoes.innerHTML += `

                <div class="cardAvaliacao">

                    <img src="./assets/imgFilmes/${registro.imgFilme}">

                    <div class="infoAvaliacao">

                        <h2>${registro.nomeFilme}</h2>

                        <span>⭐ ${registro.notaAvaliacao}</span>

                        <p>${registro.descAvaliacao}</p>

                    </div>

                </div>

            `;
            }
        });
}


function puxarLista() {
    console.log('To aqui')
    let idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/avaliacao/listarLista/${idUsuario}`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            containerLista.innerHTML = "";

            for (let i = 0; i < dados.length; i++) {
                let registro = dados[i];

                containerLista.innerHTML += `

        <div class="cardFilme">

            <div class="div_imgFilme">

                <img src="./assets/imgFilmes/${registro.imgFilme}">

                <div class="overlayFilme">

                    <button class="btnRemover">
                        <i class="bi bi-bookmark-dash-fill"></i>
                        REMOVER
                    </button>

                </div>

            </div>

            <div class="infoFilme">

                <h2>${registro.nomeFilme}</h2>

                <span>
                    ${registro.generos}
                </span>

            </div>

        </div>

            `;
            }
        });
}

window.onload = () => {
    puxarDados();
    puxar5Filmes();
};
