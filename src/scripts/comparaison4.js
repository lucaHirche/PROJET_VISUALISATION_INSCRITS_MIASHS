const container = document.getElementById("data")

let Data = null
const xhr = new XMLHttpRequest()
const options = {
    method: "get",
    url: "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records/?limit=10&offset=0&select=*&where=etablissement_id_uai%3D%220311383K%22+AND+diplom%3D%222300031%22"
}

xhr.open(options.method, options.url)
xhr.onreadystatechange = (() => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        Data = JSON.parse(xhr.responseText).results
        const [miashs_l2, miashs_l1] = Data.filter(data => data.annee_universitaire === "2016-17")
        const effectif_miashs_l1 = {
            n_hommes : miashs_l1.hommes,
            n_femmes : miashs_l1.femmes
        }
        const effectif_miashs_l2 = {
            n_hommes : miashs_l2.hommes,
            n_femmes : miashs_l2.femmes
        }

        const data = {
            labels : ["Hommes", "Femmes"],
            datasets : [
                {
                    label : 'Licence 1',
                    data : Object.values(effectif_miashs_l1),
                    backgroundColor: [
                        '#4E79A7',
                        '#F28E8C'
                    ],
                    borderColor : [
                        '#2F4F6F',
                        '#C96C72'
                    ],
                    borderWidth : 2
                },
                {
                    label : 'Licence 2',
                    data : Object.values(effectif_miashs_l2),
                    backgroundColor: [
                        '#3B5BA5',
                        '#E07A9B'
                    ],
                    borderColor : [
                        '#2F4F6F',
                        '#C96C72'
                    ],
                    borderWidth : 2
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
                        text: "Effectifs Hommes/Femmes des inscrits en Licence 1 et 2 MIASHS de l'année académique 2016-17",
                        color : '#FFFFFF',
                        font : { size : 20}
                    }
                }
            }
        }

        const myChart = new Chart(container, config)
    }
})

xhr.send();
