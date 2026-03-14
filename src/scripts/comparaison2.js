const container = document.getElementById("data")

let Data = null
const xhr = new XMLHttpRequest()

xhr.open("GET","https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records/?limit=10&offset=0&select=*&where=etablissement_lib%3D%22Universit%C3%A9+d%27Angers%22+AND+diplome_rgp%3D%22Licence%22+AND+sect_disciplinaire_lib%3D%22Sciences+juridiques%22+AND+etablissement_id_uai%3D%220490970N%22+AND+etablissement_id_uai_source%3D%220490970N%22+AND+diplom%3D%222300002%22")

xhr.onreadystatechange = function () {

  if (xhr.readyState === 4 && xhr.status === 200) {

    Data = JSON.parse(xhr.responseText).results
  Data = Data.sort((a, b) => a.annee_universitaire.localeCompare(b.annee_universitaire))
    console.log(Data)

    let annee_universitaire = []
    let effectif = []
    let hommes = []
    let femmes = []

    for (let i of Data) {
      annee_universitaire.push(i.annee_universitaire)
      effectif.push(i.effectif)
      hommes.push(i.hommes)
      femmes.push(i.femmes)
    }


    const data = {

      labels: annee_universitaire,
      datasets: [{
        label: "Effectifs",
        data: effectif,
        backgroundColor: [
          '#b2d8d8', '#fdfcf0', '#d1cfe2', '#9ebad9', '#a28497', 
                        '#e2cfc4', '#96abb1', '#c7d3d4', '#b4a7af', '#8fa3a6'
         
        ]                                                                                 
      }]

    }

    const config = {
      type: "polarArea",
      data: data,
       options: {
        plugins: {
            legend: {
                display: true,
              position: "left",
                labels: {
                    color: 'white',
                    font:{
                      size:20,
                      family: "Arial"
                    }
                }
            }
        }
    }
    }

    new Chart(container, config)

  }

}

xhr.send();
