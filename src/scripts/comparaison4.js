const container = document.getElementById("data")

let Data = null
const xhr = new XMLHttpRequest()
const options = {
    method: "get",
    url: "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records/?limit=15&offset=15&refine=annee_universitaire%3A2024-25&refine=diplom%3A2300031&refine=diplome_rgp%3ALicence&refine=disciplines_selection%3ASciences+et+sciences+de+l%27ing%C3%A9nieur&refine=niveau_lib%3A2%C3%A8me+ann%C3%A9e&select=*"
}

xhr.open(options.method, options.url)
xhr.onreadystatechange = (() => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        Data = JSON.parse(xhr.responseText).results
        let labels = []
        let datasets = { hommes : [], femmes : [] }

        for (const eachData of Data) {
            labels.push(eachData.etablissement_actuel_lib)
            datasets.hommes.push(eachData.hommes)
            datasets.femmes.push(eachData.femmes)
        }

        const data = {
            labels : labels,
            datasets : [
                {
                    label: "Hommes",
                    data: datasets.hommes,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                },
                {
                    label: "Femmes",
                    data: datasets.femmes,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                }
            ]
        }

        const config = {
            type : 'bar',
            data : data,
            options : {
                scales : {
                    x : {
                        grid: {
                            color: "rgba(255,255,255)"
                        },
                        ticks: {
                            color: "#FFFFFF"
                        }
                    },
                    y : {
                        beginAtZero : true,
                        grid: {
                            color: "rgba(255,255,255)"
                        },
                        ticks: {
                            color: "#FFFFFF"
                        }
                    },
                },
                elements : {
                    borderColor : '#FFFFFF'
                },
                plugins: {
                    legend: {
                        labels: {
                            color: "#FFFFFF"
                        }
                    },
                    title : {
                        display: true,
                        text: "Effectifs Hommes/Femmes des inscrits en Licence 2 MIASHS de l'année académique 2024-25 toutes universités confondues.",
                        color : '#FFFFFF',
                        font : { size : 30}
                    }
                }
            }
        }

        const myChart = new Chart(container, config)
    }
})

xhr.send();
