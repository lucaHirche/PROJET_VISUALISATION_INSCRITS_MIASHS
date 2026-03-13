
const labels = [
'2021-22',
'2022-23',
'2023-24',
'2024-25'
];


const data = {
labels: labels,
datasets: [
{
label: 'Les inscrits hommes à l\'UT2J en L2 MIASHS',
data: [90, 76, 85, 85],
borderColor: 'turquoise', 
backgroundColor: 'rgba(0, 150, 136, 0.2)',
borderWidth: 2,
tension: 0.1 
},
{
label: 'Les inscrites femmes à l\'UT2J en L2 MIASHS',
data: [58, 44, 50, 45],
borderColor: 'rgb(76, 175, 80)', 
backgroundColor: 'rgba(76, 175, 80, 0.2)',
borderWidth: 2,
tension: 0.1
}
]
};


const config = {
type: 'line', 
data: data,
options: {
responsive: true,
scales: {
y: {

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


const myChart = new Chart(
document.getElementById('monGraphiqueGenre'),
config
);
