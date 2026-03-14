document.addEventListener("DOMContentLoaded", chargerDonnees);

function chargerDonnees() {
  const urlLor =
    "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records?limit=100&refine=etablissement_id_uai:0542493S&refine=diplom:5000027";

  const urlStras =
    "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records?limit=100&refine=etablissement_id_uai:0673021V&refine=diplom:5000027";

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        const donneesLor = JSON.parse(xhr.responseText);

        const xhr2 = new XMLHttpRequest();

        xhr2.onreadystatechange = function () {
          if (xhr2.readyState == 4 && xhr2.status == 200) {
              const donneesStras = JSON.parse(xhr2.responseText);
              afficherGraphique(donneesLor, donneesStras);
            
          }
        };

        xhr2.open("GET", urlStras);
        xhr2.send();
      }
    
  };

  xhr.open("GET", urlLor);
  xhr.send();
}


function afficherGraphique(donneesLor, donneesStras) {
    const effectifsTotauxLor = {};
    const effectifsTotauxStras = {};

// Lorraine (eviter les répétitions d'années)
for (const ligne of donneesLor.results) {
  const annee = ligne.annee_universitaire;

  if (effectifsTotauxLor[annee] == undefined) {
    effectifsTotauxLor[annee] = ligne.effectif;
  } else {
    effectifsTotauxLor[annee] = effectifsTotauxLor[annee] + ligne.effectif;
  }
}

// Strasbourg (eviter les répétitions d'années)
for (const ligne of donneesStras.results) {
  const annee = ligne.annee_universitaire;

  if (effectifsTotauxStras[annee] == undefined) {
    effectifsTotauxStras[annee] = ligne.effectif;
  } else {
    effectifsTotauxStras[annee] = effectifsTotauxStras[annee] + ligne.effectif;
  }
}

const annees = Object.keys(effectifsTotauxLor).sort();
const effectifsLor = annees.map(a => effectifsTotauxLor[a]);
const effectifsStras = annees.map(a => effectifsTotauxStras[a]);

  const canvas = document.getElementById("data");

  const config = {
    type: "line",
    data: {
      labels: annees,
      datasets: [
        {
          label: "Les inscrits à Université de Lorraine",
          data: effectifsLor,
          borderColor: "#5BC0EB",
          backgroundColor: "#5BC0EB",
          pointBackgroundColor: "#5BC0EB",
          pointBorderColor: "#5BC0EB",
          borderWidth: 3,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 7
        },
        {
          label: "Les inscrits à Université de Strasbourg",
          data: effectifsStras,
          borderColor: "#C084FC",
          backgroundColor: "#C084FC",
          pointBackgroundColor: "#C084FC",
          pointBorderColor: "#C084FC",
          borderWidth: 3,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 7
        }
      ]
    },
    options: {
  
      animation: {
        duration: 2000
      },
      scales: {
        x: {
            ticks: {
                  color: "#FFFFFF",
                  maxRotation: 30,
                  minRotation: 30
                }
              
        },
        y: {
          ticks: {
            color: "#FFFFFF"
          
          
        }
      }
    },
      plugins: {
        legend: {
          labels: {
            color: "#FFFFFF"
          }
        },
        title: {
          display: true,
          position: "bottom",
          text: "Évolution des effectifs des étudiants inscrit en biologie médicale à l'université de Strasbourg et de Lorraine  ",
          color: "#FFFFFF"
        },
        tooltip: {
            position: "nearest",
            xAlign: "left",
            yAlign: "bottom",
            backgroundColor: "#2B2B40",
            titleColor: "#FFFFFF",
            bodyColor: "#FFFFFF",
            borderColor: "#C084FC",
            borderWidth: 1,
            callbacks: {
                label: function(context) {
                  return "Le nombre inscrit est : " + context.raw;
                }
              }
        }
      }
    }
  };

  const myChart = new Chart(canvas, config);
}