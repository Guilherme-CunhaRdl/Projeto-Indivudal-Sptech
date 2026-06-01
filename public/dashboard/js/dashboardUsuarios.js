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

            for(let i = 0; i < dados.length; i++) {

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

                        <button class="btn_usuario editar" onclick ="abrirModal()">
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

function abrirModal() {
    modalEditar.style.display = "flex";
}

function fecharModal() {
    modalEditar.style.display = "none";
}
