window.onload = listarUsuarios;

function listarUsuarios() {
    fetch("/dashboard/listarUsuarios")
        .then((resposta) => resposta.json())

        .then((dados) => {
            divUsuarios.innerHTML = `
            
                <div class="div_caixaUsuarioTopo">

                    <div class="infoUsuarioPt1">
                        <h4 class="texto_topo">Usuario</h4>
                    </div>

                    <div class="infoUsuario">
                        <p class="texto_topo">Contato</p>
                        <p class="texto_topo">Função</p>
                    </div>

                    <div class="infoUsuario">
                        <p class="texto_topo">Ações</p>
                    </div>

                </div>
            `;

            for (let i = 0; i < dados.length; i++) {
                let usuario = dados[i];

                divUsuarios.innerHTML += `

                <div class="linha"></div>

                <div class="div_caixaUsuario">

                    <div class="infoUsuarioPt1">

                        <img
                            src="../assets/imgUsuarios/${usuario.imgUsuario}"
                            class="imgUsuario"
                        />

                        <h4>${usuario.nomeUsuario}</h4>

                    </div>

                    <div class="infoUsuario">

                        <p class="emailUsuario">
                            ${usuario.email}
                        </p>

                        <p class="funcaoUsuario">
                            ${usuario.cargo}
                        </p>

                    </div>

                    <div class="infoUsuario">

                        <button class="btn_usuario editar" onclick ="abrirModal(${usuario.idUsuario})">
                            <i class="bi bi-info-circle"></i>
                        </button>

                        <button 
                            class="btn_usuario apagar"
                            onclick="deletarUsuario(${usuario.idUsuario})"
                        >
                            <i class="bi bi-trash3"></i>
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

function abrirModal(idUsuario) {
    modalInfo.style.display = "flex";

    buscarDadosModal(idUsuario);
    buscarMediaDeAcertos(idUsuario);
}

function buscarDadosModal(idUsuario) {
    fetch(`/dashboard/buscarPerfil/${idUsuario}`)
        .then((res) => res.json())
        .then((dados) => {
            let usuario = dados[0];
            console.log(usuario);

            nomeUsuarioModal.innerHTML = usuario.nomeUsuario;

            img_usuarioInfo.src = `../assets/imgUsuarios/${usuario.imgUsuario}`;

            qtdFavoritos.innerHTML = usuario.favoritos;
            qtdLista.innerHTML = usuario.lista;
            qtdAvaliacoes.innerHTML = usuario.qtdAvaliacao;

            banner_usuarioInfo.src = usuario.bannerUsuario
                ? `../assets/imgUsuarios/${usuario.bannerUsuario}`
                : "../assets/BannerPadrao.png";
        });
}

function buscarMediaDeAcertos(idUsuario) {
    fetch(`/dashboard/buscarQuizzesUsuario/${idUsuario}`)
        .then((res) => res.json())
        .then((quizzes) => {
            let somaPorcentagem = 0;
            for (let i = 0; i < quizzes.length; i++) {
                somaPorcentagem +=
                    (quizzes[i].pontuacao / quizzes[i].totalPerguntas) * 100;
            }

            let media =
                quizzes.length > 0 ? somaPorcentagem / quizzes.length : 0;

            mediaQuiz.innerHTML = `${media.toFixed(1)}%`;
        });
}

function deletarUsuario(idUsuario) {

    let resposta = prompt('Você realmente deseja excluir esse usuario?(Digite "Sim" ou "Não")').toLowerCase()


    if(resposta == 'sim'){
        fetch(`/dashboard/DeletarUsuario/${idUsuario}`, {
            method: "POST"
        })
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (resultado) {
            console.log(resultado);
            window.location.reload();
        })
        .catch(function (erro) {
            console.log("Houve um erro ao deletar o usuário:", erro);
        });
    }else{
        return;
    }

}

function fecharModal() {
    modalInfo.style.display = "none";
}
