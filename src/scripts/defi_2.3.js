// Étape d : Définition des labels (Années)
const labels = [
'2021-22',
'2022-23',
'2023-24',
'2024-25'
];

// Définition des données (Datasets pour Hommes et Femmes)
const data = {
labels: labels,
datasets: [
{
label: 'Les inscrits hommes à l\'UT2J en L2 MIASHS',
data: [90, 76, 85, 85],
borderColor: 'turquoise', // Vert émeraude (comme sur l'image)
backgroundColor: 'rgba(0, 150, 136, 0.2)',
borderWidth: 2,
tension: 0.1 // Rend la ligne légèrement moins "cassée"
},
{
label: 'Les inscrites femmes à l\'UT2J en L2 MIASHS',
data: [58, 44, 50, 45],
borderColor: 'rgb(76, 175, 80)', // Vert plus clair
backgroundColor: 'rgba(76, 175, 80, 0.2)',
borderWidth: 2,
tension: 0.1
}
]
};

// Configuration du graphique
const config = {
type: 'line', // On change 'bar' en 'line' pour avoir des courbes
data: data,
options: {
responsive: true,
scales: {
y: {
// On commence pas à zéro pour mieux voir les variations
min: 40,
max: 90
}
},
plugins: {
legend: {
position: 'top',
}
}
}
};

// Initialisation finale
const myChart = new Chart(
document.getElementById('monGraphiqueGenre'),
config
);
