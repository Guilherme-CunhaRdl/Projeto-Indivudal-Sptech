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
            email_usuario.innerHTML = dados.email;
            document.getElementById("img_usuario").src = dados.imgUsuario
                ? `./assets/imgUsuarios/${dados.imgUsuario}`
                : "./assets/mononokeIcon.jpg";

            document.getElementById("banner_usuario").src = dados.bannerUsuario
                ? `./assets/${dados.bannerUsuario}`
                : "./assets/ChihiroBanner.jpg";

                lista_usuario.innerHTML = dados.qtdQueroAssistir;
                favoritos_usuario.innerHTML = dados.favoritos;
                avaliacoes_usuario.innerHTML = dados.avaliacoes;
        });
}


function puxar5Filmes(){
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

window.onload = () => {
    puxarDados()
    puxar5Filmes();
};



