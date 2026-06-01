fetch("sideBar.html")
    .then((res) => res.text())
    .then((data) => {
        document.getElementById("sidebar").innerHTML = data;


        carregarDados();
    });

    function sair(){
        console.log('Sair')
        sessionStorage.clear();
        window.location = "../index.html";
    
    }