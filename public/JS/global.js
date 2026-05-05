// Faz uma requisição pra pagina

fetch("navbar.html")
    //Transforma esse negocio da resposta em HTML
    .then((res) => res.text())

    // ai quando ele chega ele insere no HTML
    .then((data) => {
        
        document.getElementById("navbar").innerHTML = data;

        const loginUsuario = document.getElementById("loginUsuario");

        if (sessionStorage.ID_USUARIO) {
            loginUsuario.innerHTML = `            
            <button class="div_perfilUsuario Ativo" onclick="mudarPerfil()">
                    <img src="./assets/HakuIcon.webp" alt=""> 
                    <p>${sessionStorage.NOME_USUARIO}</p><i class="bi bi-list"></i>
                    </button>
        
                    <div class="div_menuAberto" id="menuAberto">
                        
                        <a href="">Perfil <i class="bi bi-person"></i></a>
                        <hr>
                        <a href="">Configurações <i class="bi bi-gear"></i></a>
                        <hr>
                        <a href="" onclick="sair()">Sair <i class="bi bi-box-arrow-right"></i></a>`;
        } else {
            loginUsuario.innerHTML = `            
                <div class="btn_login">
                        <a class="link login" href="login.html">LOGIN</a>
                    </div>`;
        }

        
    });

let menuAberto = false;


function mudarPerfil() {
    let menu = document.getElementById("menuAberto");
    if (menuAberto == false) {
        console.log("False");
        menu.style.display = "flex";
        menuAberto = true;
    } else {
        console.log("True");
        menu.style.display = "none";
        menuAberto = false;
    }


}

function sair(){
    console.log('Sair')
    sessionStorage.clear();
    window.location.reload()
}
