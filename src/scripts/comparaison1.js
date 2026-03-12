const container = document.getElementById("data")

let Data = null
const xhr = new XMLHttpRequest()
const options = {
    method: "get",
    url: 'https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records/?limit=10&offset=0'

}


xhr.open(options.method, options.url)
xhr.onreadystatechange = (() => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        Data = JSON.parse(xhr.responseText);
        console.log(Data);
        Data.results.forEach(data => {
    }
});
xhr.send();