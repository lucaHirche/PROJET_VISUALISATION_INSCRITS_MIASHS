const container = document.getElementById("data");

let Data = null;
const xhr = new XMLHttpRequest();

const options = {
    method: "get",
    url: "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records/?limit=100&offset=0&select=*&where=diplome_rgp=%22Licence%22+AND+diplom=%222300028%22+AND+niveau_lib=%221%C3%A8re+ann%C3%A9e%22+AND+etablissement_type=%22Universit%C3%A9%22+AND+etablissement_lib+IN+(%22Universit%C3%A9+de+Nantes%22,%22Le+Mans+Universit%C3%A9%22)"
};

xhr.open(options.method, options.url);

xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {

        Data = JSON.parse(xhr.responseText).results;

        let labels = [...new Set(Data.map(d => d.annee_universitaire))];
        labels.sort();

        let nantesTotals = [];
        let lemansTotals = [];

        labels.forEach(annee => {
            const nantes = Data.find(d => d.annee_universitaire === annee && d.etablissement_lib.includes("Nantes"));
            const lemans = Data.find(d => d.annee_universitaire === annee && d.etablissement_lib.includes("Le Mans"));

            nantesTotals.push(nantes ? nantes.effectif_total : 0);
            lemansTotals.push(lemans ? lemans.effectif_total : 0);
        });

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: "Nantes",
                    data: nantesTotals,
                    backgroundColor: 'rgba(0,206,209,0.8)',
                    borderColor: 'rgb(0,206,209)',
                    borderWidth: 2
                },
                {
                    label: "Le Mans",
                    data: lemansTotals,
                    backgroundColor: 'rgba(255,165,0,0.8)',
                    borderColor: 'rgb(255,165,0)',
                    borderWidth: 2
                }
            ]
        };

        const config = {
            type: 'line',
            data: chartData,
            options: {

                responsive: true,

                plugins: {

                    title: {
                        display: true,
                        text: "Effectifs L1 langues étrangères Université du Mans / Université de Nantes",
                        color: "#FFFFFF",
                        font: { size: 26 }
                    },

                    legend: {
                        position: "bottom",
                        labels: { color: "#FFFFFF" }
                    },

                    tooltip: {

                        backgroundColor: "#222",
                        titleColor: "#fff",
                        bodyColor: "#FFA500",
                        borderColor: "#fff",
                        borderWidth: 1,

                        yAlign: "bottom",
                        xAlign: "left",

                        callbacks: {
                            label: function(context) {
                                return "Nombre inscrit est : " + context.raw
                            }
                        }
                    }
                },

                scales: {
                    x: {
                        grid: { color: "rgba(255,255,255,0.2)" },
                        ticks: { color: "#FFFFFF" },
                        title: {
                            display: true,
                            text: "Année universitaire",
                            color: "#FFFFFF"
                        }
                    },

                    y: {
                        beginAtZero: true,
                        grid: { color: "rgba(255,255,255,0.2)" },
                        ticks: { color: "#FFFFFF" },
                        title: {
                            display: true,
                            text: "Nombre d'étudiants",
                            color: "#FFFFFF"
                        }
                    }
                }
            }
        };

        const myChart = new Chart(container, config);
    }
};

xhr.send();