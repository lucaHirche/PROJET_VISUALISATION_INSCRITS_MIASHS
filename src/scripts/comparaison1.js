const container = document.getElementById("data")

let Data = null
const xhr = new XMLHttpRequest()
const options = {
    method: "get",
    url: 'https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records/?group_by=annee_universitaire%2C+niveau_lib&limit=10&offset=0&order_by=annee_universitaire%2C+niveau_lib&select=annee_universitaire%2C+++niveau_lib%2C+++SUM%28femmes%29+as+femmes%2C+++SUM%28hommes%29+as+hommes%2C+++SUM%28effectif%29+as+effectif&where=annee_universitaire+IN+%28%222019-20%22%2C+%222020-21%22%29+++AND+diplom+%3D+%222300030%22+++AND+libelle_intitule_1+%3D+%22Informatique%22+++AND+niveau_lib+IN+%28%221%C3%A8re+ann%C3%A9e%22%2C+%222%C3%A8me+ann%C3%A9e%22%29'
}
xhr.open(options.method, options.url)

xhr.onreadystatechange = function () {

    if (xhr.readyState === 4 && xhr.status === 200) {
        let Data = JSON.parse(xhr.responseText);
        console.log(Data),
            Data = Data.results

        let annee = [];
        let hommes_effectif = []
        let femmes_effectif = []

        for (dt of Data) {
            annee.push(dt.annee_universitaire)
            hommes_effectif.push(dt.hommes)
            femmes_effectif.push(dt.femmes)
        }


        const data = {
            labels: annee,
            datasets: [
                {
                    label: 'Les inscrits en 1ère année et 2ème année à Paris Cité',
                    backgroundColor: 'rgb(86, 26, 129)',
                    borderColor: 'rgb(199, 0, 0)',
                    data: hommes_effectif,
                },
                {
                    label: 'Les inscrites en 1ère année et 2ème année à Paris Cité',
                    backgroundColor: 'rgb(199, 0, 152)',
                    borderColor: 'rgb(159, 199, 0)',
                    data: femmes_effectif
                }
            ]
        }

        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        }

        const myChart = new Chart(
            container,
            config
        )
    }
}



xhr.send();