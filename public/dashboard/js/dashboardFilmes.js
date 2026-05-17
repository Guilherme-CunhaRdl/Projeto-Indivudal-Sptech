

function carregarDados(){
    console.log("Chegou")
    let ativo = document.getElementById("dashboardFilmes")
    ativo.classList.add('ativo')
}


function abrirModal() {
    document.getElementById("modalFilme").style.display = "flex";
    document.body.style.overflow = "hidden";

}



function fecharModal() {
    document.getElementById("modalFilme").style.display = "none";
    document.body.style.overflow = "auto";
}

