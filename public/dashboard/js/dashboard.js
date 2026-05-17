

function carregarDados(){
    console.log("Chegou")
    let ativo = document.getElementById("dashboard")
    ativo.classList.add('ativo')
}



const graf2 = document.getElementById("graficoGenero");

new Chart(graf2, {
    type: "doughnut",

    data: {
        labels: ["Ação", "Terror", "Drama", "Ficção", "Comédia"],

        datasets: [
            {
                label: "Filmes por Gênero",

                data: [42, 28, 35, 20, 17],

                backgroundColor: [
                    "#6fb376", 
                    "#553e8b",
                    "#4d98d9",
                    "#f0aa2e",
                    "#d95f5f", 
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


const graficoAvaliacoes = document.getElementById("graficoAvaliacoes");

new Chart(graficoAvaliacoes, {
    type: 'line',

    data: {
        labels: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun'
        ],

        datasets: [{
            label: 'Avaliações',

            data: [120, 190, 300, 250, 400, 520],

            borderColor: '#6fb376',

            backgroundColor: 'rgba(111, 179, 118, 0.15)',

            tension: 0.4,

            fill: true
        }]
    }
});