const d = new Date();
let year = d.getFullYear();
const labels = [year - 6, year - 5, year - 4, year - 3, year - 2, year - 1];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Jumlah Bencana per Tahun',
      data: [0, 10, 5, 2, 20, 30, 45],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(253, 147, 34)',
    },
  ]
};
const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    }
  },
};
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
