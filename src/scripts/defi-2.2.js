const labels=[
    '2021-22', 
    '2022-23', 
    '2023-24', 
    '2024-25' 
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Nombre de participants',
        data: [120, 150, 180, 200],
        backgroundColor: 'rgb(0,199,193)',
        borderColor:'rgb(0,199,193)',
        data:[148,120,135,130]
    }]
}

const config = {
  type: 'bar',
  data: data,
  options: {

  }
};



const myChart = new Chart(
  document.querySelector('canvas'),
  config
);