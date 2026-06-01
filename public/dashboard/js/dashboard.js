window.onload = () => {
    buscarKPIs();
    buscarGraficoGenero();
    filmesMaisAvaliados();
    buscarGraficoFavoritos()
};
function buscarKPIs() {
    fetch("/dashboard/kpis")
        .then((resposta) => resposta.json())
        .then((dados) => {
            qtdFilmes.innerHTML = dados[0].totalFilmes;

            UsuariosRegistrados.innerHTML = dados[0].totalUsuarios;

            filmesFavoritados.innerHTML = dados[0].totalFavoritos;

            
        })
        .catch((erro) => {
            console.log(erro);
        });
}

function filmesMaisAvaliados() {
    fetch("/dashboard/filmesMaisAvaliados")
        .then((resposta) => resposta.json())
        .then((dados) => {
            for (let i = 0; i < dados.length; i++) {
                filmesAvaliados.innerHTML += `                                
                            <div class="div_filme">
                                    <div class="imgFilme">
                                        <h4>${i + 1} </h4>
                                        <img
                                            src="../assets/imgFilmes/${dados[i].imgFilme}"
                                            alt=""
                                        />
                                    </div>
                                    <div class="notaFilme">
                                        <span
                                            ><i class="bi bi-star-fill"></i>
                                            ${dados[i].media}</span
                                        >
                                    </div>
                                    <div class="qtdAvaliações">${
                                        dados[i].qtdAvaliacoes
                                    }</div>
                                </div>
`;
            }
        })
        .catch((erro) => {
            console.log(erro);
        });
}

function buscarGraficoGenero() {
    fetch("/dashboard/graficoGenero")
        .then((resposta) => resposta.json())
        .then((dados) => {
            let labels = [];
            let valores = [];

            for (let i = 0; i < dados.length; i++) {
                labels.push(dados[i].nomeGenero);
                valores.push(dados[i].totalFilmes);
            }

            const graf2 = document.getElementById("graficoGenero");

            new Chart(graf2, {
                type: "doughnut",

                data: {
                    labels: labels,

                    datasets: [
                        {
                            label: "Filmes por Gênero",

                            data: valores,

                            backgroundColor: [
                                "#6fb376",
                                "#553e8b",
                                "#4d98d9",
                                "#f0aa2e",
                                "#d95f5f",
                                "#8b5cf6",
                            ],

                            borderWidth: 0,
                            hoverOffset: 6,
                        },
                    ],
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    cutout: "72%",

                    plugins: {
                        legend: {
                            position: "bottom",

                            labels: {
                                color: "#d1d5db",
                                padding: 20,
                                usePointStyle: true,
                                pointStyle: "circle",

                                font: {
                                    size: 13,
                                },
                            },
                        },
                    },
                },
            });
        })
        .catch((erro) => {
            console.log(erro);
        });
}

function buscarGraficoFavoritos() {

    fetch("/dashboard/filmesFavoritados")
        .then((resposta) => resposta.json())
        .then((dados) => {

            let labels = [];
            let valores = [];

            for (let i = 0; i < dados.length; i++) {

                labels.push(dados[i].nomeFilme);
                valores.push(dados[i].totalFavoritos);
            }

            const ctx = document.getElementById("graficoAvaliacoes");

            new Chart(ctx, {

                type: "bar",

                data: {

                    labels: labels,

                    datasets: [{
                        label: "Favoritos",

                        data: valores,

                        borderRadius: 8,

                        backgroundColor: [
                            "#6fb376",
                            "#553e8b",
                            "#4d98d9",
                            "#f0aa2e",
                            "#d95f5f"
                        ]
                    }]
                },

                options: {

                    indexAxis: 'y',

                    responsive: true,
                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }
                    },

                    scales: {

                        x: {

                            ticks: {
                                color: "#9ca3af"
                            },

                            grid: {
                                color: "#1f2937"
                            }
                        },

                        y: {

                            ticks: {
                                color: "#d1d5db"
                            },

                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        })
        .catch((erro) => {
            console.log(erro);
        });
}